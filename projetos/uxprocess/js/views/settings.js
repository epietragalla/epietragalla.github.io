import { store } from '../store.js';
import { escapeHtml, openDialog, showSnackbar } from '../ui.js';

export function renderSettingsView(container) {
  const { projects, lastSavedAt } = store.state;

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="typescale-headline-medium">Configurações & Dados (JSON)</h1>
        <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant);">
          Armazenamento local ativo • Último salvamento automático: <strong>${escapeHtml(lastSavedAt || 'agora')}</strong>
        </p>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
      <!-- Exportar JSON -->
      <section class="card card-elevated">
        <h2 class="typescale-title-large" style="margin-bottom: 8px;">Exportar Backup JSON</h2>
        <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant); margin-bottom: 16px;">
          Baixe um arquivo portátil contendo seus projetos, etapas, métodos, achados e equipe.
        </p>
        <div class="field-group">
          <label class="field-label" for="exp-scope">Escopo da exportação</label>
          <select id="exp-scope" class="field-select">
            <option value="all">Todos os projetos (${projects.length})</option>
            ${projects.map(p => `<option value="${p.id}">Apenas: ${escapeHtml(p.name)}</option>`).join('')}
          </select>
        </div>
        <button type="button" class="btn btn-filled" id="export-json-btn">
          <span class="material-symbols-outlined">download</span>
          Baixar JSON
        </button>
      </section>

      <!-- Importar JSON -->
      <section class="card card-elevated">
        <h2 class="typescale-title-large" style="margin-bottom: 8px;">Importar JSON</h2>
        <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant); margin-bottom: 16px;">
          Restaure ou mescle projetos exportados anteriormente com validação de schema.
        </p>
        <div class="field-group">
          <label class="field-label" for="imp-mode">Modo de importação</label>
          <select id="imp-mode" class="field-select">
            <option value="merge">Mesclar (atualiza IDs iguais e adiciona novos)</option>
            <option value="as_new">Importar como novos projetos</option>
            <option value="replace">Substituir todos os projetos atuais</option>
          </select>
        </div>
        <input type="file" id="imp-file" accept=".json,application/json" class="field-input" style="padding: 8px;">
      </section>

      <!-- Reset -->
      <section class="card card-outlined" style="border-color: var(--md-sys-color-error);">
        <h2 class="typescale-title-large" style="color: var(--md-sys-color-error); margin-bottom: 8px;">Zona de Restauração</h2>
        <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant); margin-bottom: 16px;">
          Restaura o estado inicial de demonstração e apaga os dados locais deste navegador.
        </p>
        <button type="button" class="btn btn-outlined" id="reset-data-btn" style="color: var(--md-sys-color-error); border-color: var(--md-sys-color-error);">
          Restaurar Dados Padrão
        </button>
      </section>
    </div>
  `;

  container.querySelector('#export-json-btn').addEventListener('click', () => {
    const scope = container.querySelector('#exp-scope').value;
    const json = store.exportJSON(scope === 'all' ? null : scope);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ux-flow-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showSnackbar('Arquivo JSON exportado.');
  });

  container.querySelector('#imp-file').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const mode = container.querySelector('#imp-mode').value;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        store.importJSON(parsed, mode);
        showSnackbar(`Importação concluída (${parsed.projects?.length || 0} projeto(s)).`);
      } catch (err) {
        showSnackbar(`Erro na importação: ${err.message}`);
      }
    };
    reader.readAsText(file);
  });

  container.querySelector('#reset-data-btn').addEventListener('click', () => {
    openDialog({
      title: 'Restaurar dados padrão?',
      danger: true,
      confirmLabel: 'Sim, restaurar',
      bodyHtml: '<p class="typescale-body-large">Todos os projetos atuais salvos neste navegador serão substituídos pelo projeto de exemplo.</p>',
      onConfirm: () => {
        store.resetAll();
        showSnackbar('Dados restaurados.');
      }
    });
  });
}