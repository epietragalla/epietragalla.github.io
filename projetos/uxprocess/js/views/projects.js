import { PROJECT_TEMPLATES } from '../catalog.js';
import { store } from '../store.js';
import { navigate } from '../router.js';
import { escapeHtml, openDialog, showSnackbar, renderAvatar } from '../ui.js';
import { enableReorderableList } from '../dnd.js';

let filterStatus = 'all';
let searchQuery = '';

export function renderProjectsView(container) {
  const { projects, people } = store.state;

  const filtered = projects.filter(p => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesQuery = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="typescale-headline-medium">Projetos de UX</h1>
        <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant);">
          Documente e acompanhe todas as etapas de descoberta à validação.
        </p>
      </div>
      <button type="button" class="btn btn-filled" id="new-project-btn">
        <span class="material-symbols-outlined">add</span>
        Novo Projeto
      </button>
    </div>

    <!-- Busca & Filter Chips -->
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 24px;">
      <div style="flex: 1; min-width: 240px;">
        <input type="search" id="proj-search" class="field-input" placeholder="Buscar projetos (atalho: /)..." value="${escapeHtml(searchQuery)}" aria-label="Buscar projetos">
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;" role="group" aria-label="Filtrar por status">
        <button type="button" class="chip ${filterStatus === 'all' ? 'selected' : ''}" data-filter="all">Todos (${projects.length})</button>
        <button type="button" class="chip ${filterStatus === 'active' ? 'selected' : ''}" data-filter="active">Ativos</button>
        <button type="button" class="chip ${filterStatus === 'archived' ? 'selected' : ''}" data-filter="archived">Arquivados</button>
      </div>
    </div>

    ${filtered.length === 0 ? `
      <div class="empty-state">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--md-sys-color-primary);">folder_open</span>
        <h2 class="typescale-title-large">Nenhum projeto encontrado</h2>
        <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant);">
          Crie seu primeiro projeto UX ou importe um arquivo JSON nas configurações.
        </p>
        <button type="button" class="btn btn-filled" id="empty-new-proj">Criar Projeto</button>
      </div>
    ` : `
      <div class="projects-grid" id="projects-grid">
        ${filtered.map((proj, idx) => {
          const progress = store.calcProjectProgress(proj);
          const owners = (proj.ownerIds || []).map(id => people.find(p => p.id === id)).filter(Boolean);
          const totalMethods = proj.stages.reduce((acc, st) => acc + st.methods.length, 0);

          return `
            <article class="card card-elevated draggable-card" tabindex="0" data-reorder-index="${idx}" style="border-top: 6px solid ${escapeHtml(proj.color)}; display: flex; flex-direction: column; justify-content: space-between; gap: 16px;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                  <span class="status-badge" data-status="${proj.status === 'active' ? 'in_progress' : ''}">
                    ${proj.status === 'active' ? 'Em andamento' : 'Arquivado'}
                  </span>
                  <div style="display: flex; align-items: center;">
                    <span class="icon-btn" data-drag-handle title="Arraste ou use Alt + Setas para reordenar" aria-label="Reordenar projeto" style="cursor: grab;">
                      <span class="material-symbols-outlined">drag_indicator</span>
                    </span>
                    <button type="button" class="icon-btn" data-archive-proj="${proj.id}" title="${proj.status === 'active' ? 'Arquivar projeto' : 'Reativar projeto'}" aria-label="${proj.status === 'active' ? 'Arquivar projeto' : 'Reativar projeto'}">
                      <span class="material-symbols-outlined">${proj.status === 'active' ? 'archive' : 'unarchive'}</span>
                    </button>
                    <button type="button" class="icon-btn" data-dup-proj="${proj.id}" title="Duplicar projeto" aria-label="Duplicar projeto">
                      <span class="material-symbols-outlined">content_copy</span>
                    </button>
                    <button type="button" class="icon-btn" data-del-proj="${proj.id}" title="Excluir projeto" aria-label="Excluir projeto">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>

                <h2 class="typescale-title-large" style="margin-bottom: 6px;">
                  <a href="#/projeto/${proj.id}/visao-geral" style="color: inherit; text-decoration: none;">${escapeHtml(proj.name)}</a>
                </h2>
                <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant);">
                  ${escapeHtml(proj.description || 'Sem descrição.')}
                </p>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <span class="typescale-label-medium">Progresso Geral (${totalMethods} métodos)</span>
                  <span class="typescale-label-large">${progress}%</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill" style="width: ${progress}%; background-color: ${escapeHtml(proj.color)};"></div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
                  <div style="display: flex; gap: 4px;">
                    ${owners.map(renderAvatar).join('') || '<span class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">Sem responsável</span>'}
                  </div>
                  <div style="display: flex; gap: 8px;">
                    <a href="#/projeto/${proj.id}/visao-geral" class="btn btn-outlined" style="padding: 0 14px;">Visão Geral</a>
                    <a href="#/projeto/${proj.id}/etapa/discover" class="btn btn-tonal" style="padding: 0 16px;">Etapas</a>
                  </div>
                </div>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    `}
  `;

  // Modal de Criação com Templates de Processo UX
  const openCreateModal = () => {
    openDialog({
      title: 'Novo Projeto de UX',
      confirmLabel: 'Criar Projeto',
      bodyHtml: `
        <div class="field-group">
          <label class="field-label" for="np-tpl">Template de Processo</label>
          <select id="np-tpl" class="field-select">
            ${PROJECT_TEMPLATES.map(t => `<option value="${t.id}">${escapeHtml(t.name)}</option>`).join('')}
          </select>
          <span class="field-supporting" id="np-tpl-desc">${escapeHtml(PROJECT_TEMPLATES[0].description)}</span>
        </div>
        <div class="field-group">
          <label class="field-label" for="np-name">Nome do Projeto *</label>
          <input type="text" id="np-name" class="field-input" required placeholder="Ex: Portal do Paciente">
        </div>
        <div class="field-group">
          <label class="field-label" for="np-desc">Objetivo / Descrição</label>
          <textarea id="np-desc" class="field-textarea" placeholder="Qual problema de negócio ou usuário este projeto resolve?"></textarea>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="field-group">
            <label class="field-label" for="np-color">Cor de identificação</label>
            <input type="color" id="np-color" class="field-input" value="#3D5AA9" style="padding: 4px;">
          </div>
          <div class="field-group">
            <label class="field-label" for="np-owner">Líder Responsável</label>
            <select id="np-owner" class="field-select">
              <option value="">Nenhum</option>
              ${people.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')}
            </select>
          </div>
        </div>
      `,
      onConfirm: (root) => {
        const name = root.querySelector('#np-name').value.trim();
        if (!name) return false;
        const id = store.createProjectFromTemplate({
          name,
          description: root.querySelector('#np-desc').value.trim(),
          color: root.querySelector('#np-color').value,
          ownerIds: root.querySelector('#np-owner').value ? [root.querySelector('#np-owner').value] : [],
          templateId: root.querySelector('#np-tpl').value
        });
        showSnackbar('Projeto criado!');
        navigate(`/projeto/${id}/visao-geral`);
      }
    });

    // Atualiza descrição dinâmica do template selecionado
    const tplSelect = document.getElementById('np-tpl');
    const tplDesc = document.getElementById('np-tpl-desc');
    tplSelect?.addEventListener('change', () => {
      const found = PROJECT_TEMPLATES.find(t => t.id === tplSelect.value);
      if (found && tplDesc) tplDesc.textContent = found.description;
    });
  };

  container.querySelector('#new-project-btn')?.addEventListener('click', openCreateModal);
  container.querySelector('#empty-new-proj')?.addEventListener('click', openCreateModal);

  container.querySelector('#proj-search')?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProjectsView(container);
    const inp = container.querySelector('#proj-search');
    inp.focus();
    inp.setSelectionRange(searchQuery.length, searchQuery.length);
  });

  container.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      filterStatus = btn.dataset.filter;
      renderProjectsView(container);
    });
  });

  container.querySelectorAll('[data-archive-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.archiveProj;
      const proj = projects.find(p => p.id === id);
      if (!proj) return;
      const nextStatus = proj.status === 'active' ? 'archived' : 'active';
      store.updateProject(id, { status: nextStatus });
      showSnackbar(nextStatus === 'archived' ? 'Projeto arquivado.' : 'Projeto reativado.');
    });
  });

  container.querySelectorAll('[data-dup-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      store.duplicateProject(btn.dataset.dupProj);
      showSnackbar('Projeto duplicado.');
    });
  });

  container.querySelectorAll('[data-del-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.delProj;
      store.deleteProject(id);
      showSnackbar('Projeto excluído.', 'Desfazer', () => store.undo());
    });
  });

  const grid = container.querySelector('#projects-grid');
  if (grid && filterStatus === 'all' && !searchQuery) {
    enableReorderableList(grid, {
      itemLabel: 'Projeto',
      onReorder: (from, to) => store.reorderProjects(from, to)
    });
  }
}