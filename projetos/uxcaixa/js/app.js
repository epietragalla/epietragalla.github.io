/**
 * Bootstrap da Aplicação
 */

import { REGISTERED_SCHEMAS, getSchemaById } from './schemas/index.js';
import { DocumentStore } from './core/store.js';
import { DocumentRenderer } from './core/renderer.js';
import { initTheme } from './core/theme.js';
import { initRouter } from './core/router.js';
import { openConfirmDialog, showSnackbar, el } from './core/ui.js';

let activeDocId = REGISTERED_SCHEMAS[0].id;

function bootstrap() {
  initTheme();

  const store = new DocumentStore(REGISTERED_SCHEMAS);
  const mountNode = document.getElementById('document-mount');
  const renderer = new DocumentRenderer(mountNode, store);

  const sidebarNav = document.getElementById('sidebar-nav-list');
  const bottomNav = document.getElementById('bottom-nav-list');

  // Renderiza itens de navegação (Drawer/Rail + Bottom NavigationBar)
  const renderNavigation = () => {
    sidebarNav.innerHTML = '';
    bottomNav.innerHTML = '';

    for (const schema of REGISTERED_SCHEMAS) {
      const isCurrent = schema.id === activeDocId;

      // Item lateral (Rail & Drawer)
      const sideLink = el(
        'a',
        {
          href: `#/${schema.id}`,
          className: 'nav-side-item',
          'aria-current': isCurrent ? 'page' : undefined
        },
        [
          el('span', { className: 'nav-side-item__pill' }, [
            el('span', {
              className: 'material-symbols-outlined',
              'aria-hidden': 'true',
              textContent: schema.icon
            })
          ]),
          el('span', { className: 'nav-side-item__label', textContent: schema.title })
        ]
      );
      sidebarNav.append(sideLink);

      // Item inferior (Compact NavigationBar)
      const bottomLink = el(
        'a',
        {
          href: `#/${schema.id}`,
          className: 'nav-bottom-item',
          'aria-current': isCurrent ? 'page' : undefined
        },
        [
          el('span', { className: 'nav-bottom-item__indicator' }, [
            el('span', {
              className: 'material-symbols-outlined',
              'aria-hidden': 'true',
              textContent: schema.icon
            })
          ]),
          el('span', { className: 'nav-bottom-item__label', textContent: schema.shortTitle })
        ]
      );
      bottomNav.append(bottomLink);
    }
  };

  // Atualiza cabeçalho do projeto e do documento ativo
  const updateHeaders = () => {
    const schema = getSchemaById(activeDocId);
    const projectName = store.getSharedFields().nomeProjeto || 'SuperAPP Fase 21';

    const appTitle = document.getElementById('app-project-title');
    const bannerProject = document.getElementById('doc-banner-project');
    const bannerTitle = document.getElementById('doc-banner-title');

    if (appTitle) appTitle.textContent = projectName;
    if (bannerProject) bannerProject.textContent = projectName;
    if (bannerTitle) bannerTitle.textContent = schema.title;
    document.title = `${schema.title} — ${projectName}`;
  };

  const renderActiveDocument = () => {
    const schema = getSchemaById(activeDocId);
    updateHeaders();
    renderNavigation();
    renderer.render(schema);
  };

  // Reage a alterações compartilhadas (nome do projeto), restauração ou importação
  store.subscribe((_, eventType) => {
    updateHeaders();
    if (eventType === 'restore' || eventType === 'import') {
      renderActiveDocument();
    }
  });

  // Roteamento por hash
  initRouter(
    REGISTERED_SCHEMAS.map((s) => s.id),
    REGISTERED_SCHEMAS[0].id,
    (docId) => {
      activeDocId = docId;
      renderActiveDocument();
    }
  );

  // Ação: Restaurar original do documento atual
  document.getElementById('btn-restore-doc')?.addEventListener('click', async () => {
    const schema = getSchemaById(activeDocId);
    const confirmed = await openConfirmDialog({
      title: 'Restaurar documento',
      description: `Deseja restaurar "${schema.title}" para o conteúdo original? As alterações atuais deste documento serão substituídas.`,
      icon: 'restart_alt',
      confirmLabel: 'Restaurar',
      cancelLabel: 'Cancelar'
    });
    if (confirmed) {
      store.restoreDocument(activeDocId);
    }
  });

  // Ação: Imprimir documento
  document.getElementById('btn-print-doc')?.addEventListener('click', () => {
    window.print();
  });

  // Ação: Exportar JSON
  document.getElementById('btn-export-json')?.addEventListener('click', () => {
    const jsonString = store.exportToJsonString();
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'superapp-fase-21-documentacao.json';
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showSnackbar('Arquivo JSON exportado');
  });

  // Ação: Importar JSON
  const fileInput = document.getElementById('input-import-file');
  document.getElementById('btn-import-json')?.addEventListener('click', () => {
    fileInput.value = '';
    fileInput.click();
  });

  fileInput?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const validation = store.validateStateShape(parsed);

      if (!validation.valid) {
        showSnackbar(`Arquivo inválido: ${validation.error}`, 4500);
        return;
      }

      const confirmed = await openConfirmDialog({
        title: 'Importar dados',
        description:
          'A importação irá sobrescrever todos os dados atuais dos três documentos salvos neste navegador. Deseja continuar?',
        icon: 'upload_file',
        confirmLabel: 'Sobrescrever e importar',
        cancelLabel: 'Cancelar'
      });

      if (confirmed) {
        store.importState(parsed);
      }
    } catch {
      showSnackbar('Não foi possível ler o arquivo JSON selecionado.', 4000);
    }
  });
}

document.addEventListener('DOMContentLoaded', bootstrap);