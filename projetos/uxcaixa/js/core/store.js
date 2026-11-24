/**
 * Store centralizada com localStorage, autosave com debounce,
 * dados compartilhados ("Informações") e importação/exportação JSON versionada.
 */

import { showSnackbar } from './ui.js';

export const SCHEMA_VERSION = 1;
const STORAGE_KEY = 'superapp_fase21_usabilidade_v1';

/**
 * Clona profundamente valores serializáveis
 */
export function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

export class DocumentStore {
  /**
   * @param {Array} schemas - Lista de schemas registrados
   */
  constructor(schemas) {
    this.schemas = schemas;
    this.listeners = new Set();
    this.saveTimeout = null;
    this.state = this.loadInitialState();
  }

  /**
   * Constrói o estado inicial padrão a partir dos schemas registrados
   */
  buildDefaultState() {
    const firstShared = this.schemas[0]?.sharedDefault || {};
    const documents = {};

    for (const schema of this.schemas) {
      documents[schema.id] = {
        fields: deepClone(schema.defaultFields)
      };
    }

    return {
      schemaVersion: SCHEMA_VERSION,
      project: {
        name: firstShared.nomeProjeto || 'SuperAPP Fase 21'
      },
      shared: deepClone(firstShared),
      documents,
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Carrega do localStorage ou inicializa com os valores padrão
   */
  loadInitialState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return this.buildDefaultState();

      const parsed = JSON.parse(raw);
      if (this.validateStateShape(parsed).valid) {
        return this.mergeWithDefaults(parsed);
      }
    } catch {
      // Se corrompido, retorna padrão
    }
    return this.buildDefaultState();
  }

  /**
   * Garante retrocompatibilidade caso novos schemas sejam adicionados futuramente
   */
  mergeWithDefaults(incoming) {
    const base = this.buildDefaultState();
    base.schemaVersion = incoming.schemaVersion;
    base.project = { ...base.project, ...(incoming.project || {}) };
    base.shared = { ...base.shared, ...(incoming.shared || {}) };
    base.updatedAt = incoming.updatedAt || new Date().toISOString();

    for (const schema of this.schemas) {
      if (incoming.documents?.[schema.id]?.fields) {
        base.documents[schema.id].fields = {
          ...base.documents[schema.id].fields,
          ...deepClone(incoming.documents[schema.id].fields)
        };
      }
    }
    return base;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(eventType = 'update') {
    for (const listener of this.listeners) {
      listener(this.state, eventType);
    }
  }

  getState() {
    return this.state;
  }

  getSharedFields() {
    return this.state.shared;
  }

  getDocumentFields(docId) {
    return this.state.documents[docId]?.fields || {};
  }

  /**
   * Atualiza um campo do bloco compartilhado "Informações"
   */
  updateSharedField(key, value) {
    this.state.shared[key] = value;
    if (key === 'nomeProjeto' && typeof value === 'string' && value.trim()) {
      this.state.project.name = value.trim();
    }
    this.scheduleAutosave();
    this.notify('shared-change');
  }

  /**
   * Atualiza um campo específico de um documento
   */
  updateDocumentField(docId, key, value) {
    if (!this.state.documents[docId]) return;
    this.state.documents[docId].fields[key] = value;
    this.scheduleAutosave();
  }

  /**
   * Agenda persistência no localStorage com debounce de 600ms
   */
  scheduleAutosave() {
    const indicator = document.getElementById('save-status-indicator');
    if (indicator) {
      indicator.textContent = 'Salvando...';
    }

    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      this.persistNow(true);
    }, 600);
  }

  persistNow(showToast = false) {
    this.state.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      const indicator = document.getElementById('save-status-indicator');
      if (indicator) {
        indicator.textContent = 'Salvo';
      }
      if (showToast) {
        showSnackbar('Salvo');
      }
    } catch {
      showSnackbar('Erro ao salvar localmente');
    }
  }

  /**
   * Restaura um documento específico (e seus campos compartilhados) ao padrão original
   */
  restoreDocument(docId) {
    const schema = this.schemas.find((s) => s.id === docId);
    if (!schema) return;

    this.state.documents[docId] = {
      fields: deepClone(schema.defaultFields)
    };
    if (schema.sharedDefault) {
      this.state.shared = deepClone(schema.sharedDefault);
      this.state.project.name = this.state.shared.nomeProjeto || 'SuperAPP Fase 21';
    }

    this.persistNow(false);
    this.notify('restore');
    showSnackbar('Documento restaurado para o conteúdo original');
  }

  /**
   * Gera string JSON formatada para download
   */
  exportToJsonString() {
    this.state.updatedAt = new Date().toISOString();
    return JSON.stringify(this.state, null, 2);
  }

  /**
   * Valida estrutura e versão do schema de um arquivo JSON importado
   */
  validateStateShape(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return { valid: false, error: 'O arquivo não contém um objeto JSON válido.' };
    }
    if (typeof data.schemaVersion !== 'number') {
      return { valid: false, error: 'Campo "schemaVersion" ausente ou inválido.' };
    }
    if (data.schemaVersion !== SCHEMA_VERSION) {
      return {
        valid: false,
        error: `Versão de schema incompatível (recebida: ${data.schemaVersion}, esperada: ${SCHEMA_VERSION}).`
      };
    }
    if (!data.documents || typeof data.documents !== 'object') {
      return { valid: false, error: 'Estrutura "documents" ausente no arquivo.' };
    }
    const hasKnownDoc = this.schemas.some((s) => data.documents[s.id]?.fields);
    if (!hasKnownDoc) {
      return { valid: false, error: 'Nenhum documento reconhecido foi encontrado no arquivo.' };
    }
    return { valid: true };
  }

  /**
   * Sobrescreve estado atual com dados importados validados
   */
  importState(data) {
    this.state = this.mergeWithDefaults(data);
    this.persistNow(false);
    this.notify('import');
    showSnackbar('Dados importados com sucesso');
  }
}