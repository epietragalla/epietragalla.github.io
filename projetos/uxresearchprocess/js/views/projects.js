(function() {
  let searchTerm = '';
  let statusFilter = 'active';

  window.UXR.renderProjectsView = function(container) {
    const { store, createProject, uid, esc, icon, openDialog, showSnackbar, enableSortableList, navigate } = window.UXR;
    const state = store.getState();

    const filtered = state.projects.filter(p => {
      const matchesStatus = statusFilter === 'all' ? true : p.status === statusFilter;
      const q = searchTerm.toLowerCase();
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.researchQuestions.some(rq => rq.toLowerCase().includes(q));
      return matchesStatus && matchesQuery;
    });

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="headline-medium">Projetos de UX Research</h1>
          <p class="body-medium text-variant">Planeje, execute e documente ciclos iterativos baseados no framework NN/g.</p>
        </div>
        <button type="button" class="fab-extended" id="btn-new-project">${icon('add')}<span>Novo Projeto</span></button>
      </div>
      <div class="nng-principle-banner" style="margin-bottom: var(--md-sys-space-6);">
        ${icon('tips_and_updates')}
        <div><strong>Princípio NN/g:</strong> O ciclo Discover → Explore → Test → Listen não é uma lista rígida em ordem fixa — é um cardápio de opções recomendadas. Comece pela etapa em que seu produto está agora e aprenda mais a cada ciclo.</div>
      </div>
      <div class="stack-h" style="justify-content: space-between; margin-bottom: var(--md-sys-space-4);">
        <div class="field" style="flex:1;min-width:240px;max-width:420px;">
          <input id="project-search" type="search" class="field-input" placeholder="Buscar por nome ou pergunta de pesquisa..." value="${esc(searchTerm)}" />
        </div>
        <div class="chip-group">
          <button type="button" class="chip" data-filter="active" aria-pressed="${statusFilter === 'active'}">Ativos</button>
          <button type="button" class="chip" data-filter="archived" aria-pressed="${statusFilter === 'archived'}">Arquivados</button>
          <button type="button" class="chip" data-filter="all" aria-pressed="${statusFilter === 'all'}">Todos</button>
        </div>
      </div>
      ${filtered.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">${icon('folder_open')}</div>
          <h2 class="title-large">Nenhum projeto encontrado</h2>
          <button type="button" class="btn btn-filled" id="btn-empty-create">Criar projeto</button>
        </div>
      ` : `
        <div class="grid-cards" id="projects-grid">
          ${filtered.map((proj, index) => {
            const activeCycle = store.getCycle(proj, proj.activeCycleNumber);
            const progress = store.calcCycleProgress(activeCycle);
            const owners = (proj.ownerIds || []).map(id => state.people.find(per => per.id === id)).filter(Boolean);
            return `
              <article class="card card-elevated stack-v" data-drag-index="${index}">
                <div class="stack-h" style="justify-content:space-between;align-items:flex-start;">
                  <div class="stack-h" style="gap:8px;">
                    <button type="button" class="icon-btn" data-drag-handle aria-label="Arrastar ${esc(proj.name)}">${icon('drag_indicator')}</button>
                    <span class="badge badge-neutral">${esc(activeCycle.name)} (${proj.cycles.length} ${proj.cycles.length > 1 ? 'ciclos' : 'ciclo'})</span>
                  </div>
                  <div class="stack-h" style="gap:4px;">
                    <button type="button" class="icon-btn" data-move-up="${index}" ${index === 0 ? 'disabled' : ''}>${icon('keyboard_arrow_up')}</button>
                    <button type="button" class="icon-btn" data-move-down="${index}" ${index === filtered.length - 1 ? 'disabled' : ''}>${icon('keyboard_arrow_down')}</button>
                    <button type="button" class="icon-btn" data-duplicate="${esc(proj.id)}" title="Duplicar">${icon('content_copy')}</button>
                    <button type="button" class="icon-btn" data-archive="${esc(proj.id)}" title="Arquivar">${icon(proj.status === 'archived' ? 'unarchive' : 'archive')}</button>
                    <button type="button" class="icon-btn" data-delete="${esc(proj.id)}" title="Excluir">${icon('delete')}</button>
                  </div>
                </div>
                <div>
                  <h2 class="title-large" style="margin-bottom:4px;"><a href="#/projeto/${esc(proj.id)}" style="color:inherit;text-decoration:none;">${esc(proj.name)}</a></h2>
                  <p class="body-medium text-variant">${esc(proj.researchQuestions[0] || proj.description || 'Sem pergunta principal.')}</p>
                </div>
                <div>
                  <div class="stack-h" style="justify-content:space-between;margin-bottom:4px;"><span class="label-medium text-variant">Progresso do ${esc(activeCycle.name)}</span><span class="label-large">${progress}%</span></div>
                  <div class="progress-track"><div class="progress-fill" style="width:${progress}%;"></div></div>
                </div>
                <div class="work-item-footer">
                  <div class="stack-h" style="gap:4px;">${owners.length > 0 ? owners.map(o => `<span class="avatar" title="${esc(o.name)}">${esc(o.name.slice(0, 2).toUpperCase())}</span>`).join('') : `<span class="body-small text-variant">Sem responsável</span>`}</div>
                  <a href="#/projeto/${esc(proj.id)}" class="btn btn-tonal btn-sm"><span>Abrir ciclo</span>${icon('arrow_forward')}</a>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      `}
    `;

    const openCreateModal = () => {
      const people = store.getState().people;
      openDialog({
        title: 'Novo Projeto de UX Research',
        confirmLabel: 'Criar projeto',
        bodyHtml: `
          <div class="stack-v">
            <div class="field"><label for="new-prj-name" class="field-label">Nome do projeto *</label><input id="new-prj-name" class="field-input" required /></div>
            <div class="field"><label for="new-prj-rq" class="field-label">Pergunta de pesquisa principal</label><input id="new-prj-rq" class="field-input" /></div>
            <div class="field"><label for="new-prj-desc" class="field-label">Contexto e objetivo</label><textarea id="new-prj-desc" class="field-textarea"></textarea></div>
            ${people.length > 0 ? `<div class="field"><label for="new-prj-owner" class="field-label">Responsável principal</label><select id="new-prj-owner" class="field-select"><option value="">Selecionar depois</option>${people.map(p => `<option value="${esc(p.id)}">${esc(p.name)}</option>`).join('')}</select></div>` : ''}
          </div>
        `,
        onConfirm: (dialogEl) => {
          const nameInput = dialogEl.querySelector('#new-prj-name');
          if (!nameInput.value.trim()) { nameInput.focus(); return false; }
          const rq = dialogEl.querySelector('#new-prj-rq').value.trim();
          const desc = dialogEl.querySelector('#new-prj-desc').value.trim();
          const ownerId = dialogEl.querySelector('#new-prj-owner')?.value || '';
          const created = createProject({ name: nameInput.value, description: desc, researchQuestions: rq ? [rq] : [], ownerIds: ownerId ? [ownerId] : [] });
          store.mutate(draft => { draft.projects.unshift(created); });
          showSnackbar(`Projeto "${created.name}" criado.`);
          navigate(`/projeto/${created.id}`);
          return true;
        }
      });
    };

    document.getElementById('btn-new-project')?.addEventListener('click', openCreateModal);
    document.getElementById('btn-empty-create')?.addEventListener('click', openCreateModal);
    document.getElementById('project-search')?.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      window.UXR.renderProjectsView(container);
      const inp = document.getElementById('project-search');
      inp?.focus();
    });
    container.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => { statusFilter = btn.dataset.filter; window.UXR.renderProjectsView(container); }));

    const reorderProjects = (fromIdx, toIdx) => {
      const fromId = filtered[fromIdx]?.id;
      const toId = filtered[toIdx]?.id;
      if (!fromId || !toId) return;
      store.mutate(draft => {
        const realFrom = draft.projects.findIndex(p => p.id === fromId);
        const realTo = draft.projects.findIndex(p => p.id === toId);
        const [moved] = draft.projects.splice(realFrom, 1);
        draft.projects.splice(realTo, 0, moved);
      });
    };
    enableSortableList(document.getElementById('projects-grid'), reorderProjects);
    container.querySelectorAll('[data-move-up]').forEach(btn => btn.addEventListener('click', () => { const i = Number(btn.dataset.moveUp); if (i > 0) reorderProjects(i, i - 1); }));
    container.querySelectorAll('[data-move-down]').forEach(btn => btn.addEventListener('click', () => { const i = Number(btn.dataset.moveDown); if (i < filtered.length - 1) reorderProjects(i, i + 1); }));
    container.querySelectorAll('[data-duplicate]').forEach(btn => btn.addEventListener('click', () => {
      store.mutate(draft => {
        const orig = draft.projects.find(p => p.id === btn.dataset.duplicate);
        if (!orig) return;
        const copy = JSON.parse(JSON.stringify(orig));
        copy.id = uid('prj');
        copy.name = `${orig.name} (Cópia)`;
        draft.projects.unshift(copy);
      });
      showSnackbar('Projeto duplicado.');
    }));
    container.querySelectorAll('[data-archive]').forEach(btn => btn.addEventListener('click', () => {
      store.mutate(draft => { const proj = draft.projects.find(p => p.id === btn.dataset.archive); if (proj) proj.status = proj.status === 'archived' ? 'active' : 'archived'; });
    }));
    container.querySelectorAll('[data-delete]').forEach(btn => btn.addEventListener('click', () => {
      const id = btn.dataset.delete;
      store.mutate(draft => { draft.projects = draft.projects.filter(p => p.id !== id); });
      showSnackbar('Projeto excluído.', { actionLabel: 'Desfazer', onAction: () => store.undo() });
    }));
  };
})();
