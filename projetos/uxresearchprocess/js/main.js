(function() {
  const {
    store, parseHash, navigate, STAGES_CATALOG, findCatalogMethod,
    PROJECT_TEMPLATES, createProject, createMethodInstance,
    esc, icon, showSnackbar, renderProjectStickyBar,
    renderProjectsView, renderOverviewView, renderPlanView,
    renderStageView, renderMethodView, renderTimelineView,
    renderRoadmapView, renderInsightsView, renderParticipantsView,
    renderLibraryView, renderReportsView, renderTeamView, renderSettingsView
  } = window.UXR;

  function renderNavigation(route) {
    const sideNav = document.getElementById('nav-drawer-rail');
    const bottomNav = document.getElementById('nav-bottom-bar');
    const { projectId } = route.params;
    const project = projectId ? store.getProject(projectId) : null;
    const activeCycleNum = route.params.cycleNumber || project?.activeCycleNumber || 1;

    const primaryDestinations = [
      { href: '#/projetos', label: 'Projetos', iconName: 'folder_special', active: route.view === 'projects' },
      ...(project ? [
        { href: `#/projeto/${project.id}`, label: 'Visão geral', iconName: 'dashboard', active: route.view === 'overview' },
        { href: `#/projeto/${project.id}/ciclo/${activeCycleNum}/etapa/discover`, label: 'Etapas', iconName: 'science', active: route.view === 'stage' || route.view === 'method' },
        { href: `#/projeto/${project.id}/timeline`, label: 'Timeline', iconName: 'donut_large', active: route.view === 'timeline' },
        { href: `#/projeto/${project.id}/roadmap`, label: 'Roadmap', iconName: 'view_timeline', active: route.view === 'roadmap' },
        { href: `#/projeto/${project.id}/insights`, label: 'Insights', iconName: 'lightbulb', active: route.view === 'insights' },
        { href: `#/projeto/${project.id}/participantes`, label: 'Participantes', iconName: 'group', active: route.view === 'participants' },
        { href: `#/projeto/${project.id}/relatorios`, label: 'Relatório', iconName: 'summarize', active: route.view === 'reports' }
      ] : []),
      { href: '#/biblioteca', label: 'Biblioteca', iconName: 'menu_book', active: route.view === 'library' },
      { href: '#/equipe', label: 'Equipe', iconName: 'badge', active: route.view === 'team' },
      { href: '#/configuracoes', label: 'Backup', iconName: 'settings', active: route.view === 'settings' }
    ];

    if (bottomNav) {
      bottomNav.innerHTML = primaryDestinations.slice(0, 5).map(item => `
        <a href="${esc(item.href)}" class="nav-item" ${item.active ? 'aria-current="page"' : ''}>
          <span class="nav-indicator">${icon(item.iconName, item.active)}</span>
          <span>${esc(item.label)}</span>
        </a>
      `).join('');
    }
    if (sideNav) {
      sideNav.innerHTML = `
        <div class="nav-brand">${icon('hub', true)}<span class="title-medium">UXR Cycle Studio</span></div>
        ${primaryDestinations.map(item => `
          <a href="${esc(item.href)}" class="nav-item" ${item.active ? 'aria-current="page"' : ''}>
            <span class="nav-indicator">${icon(item.iconName, item.active)}</span>
            <span>${esc(item.label)}</span>
          </a>
        `).join('')}
      `;
    }
  }

  function renderTopAppBar(route) {
    const bar = document.getElementById('top-app-bar');
    if (!bar) return;
    const state = store.getState();
    const isDark = state.theme === 'dark';
    const { projectId, cycleNumber, stageKey, methodId } = route.params;
    const project = projectId ? store.getProject(projectId) : null;

    let breadcrumbHtml = `<a href="#/projetos" class="breadcrumb-link">Projetos</a>`;
    if (project) {
      breadcrumbHtml += `<span aria-hidden="true">/</span><a href="#/projeto/${esc(project.id)}" class="breadcrumb-link">${esc(project.name)}</a>`;
      if (route.view === 'plan') breadcrumbHtml += `<span aria-hidden="true">/</span><span class="breadcrumb-current">Plano</span>`;
      else if (route.view === 'timeline') breadcrumbHtml += `<span aria-hidden="true">/</span><span class="breadcrumb-current">Timeline & Espiral</span>`;
      else if (route.view === 'roadmap') breadcrumbHtml += `<span aria-hidden="true">/</span><span class="breadcrumb-current">Roadmap</span>`;
      else if (route.view === 'insights') breadcrumbHtml += `<span aria-hidden="true">/</span><span class="breadcrumb-current">Insights</span>`;
      else if (route.view === 'participants') breadcrumbHtml += `<span aria-hidden="true">/</span><span class="breadcrumb-current">Participantes</span>`;
      else if (route.view === 'reports') breadcrumbHtml += `<span aria-hidden="true">/</span><span class="breadcrumb-current">Relatório</span>`;
      else if (stageKey) {
        const cat = STAGES_CATALOG[stageKey];
        breadcrumbHtml += `<span aria-hidden="true">/</span><span class="breadcrumb-current">Ciclo ${cycleNumber}</span>`;
        breadcrumbHtml += `<span aria-hidden="true">/</span><a href="#/projeto/${esc(project.id)}/ciclo/${cycleNumber}/etapa/${esc(stageKey)}" class="breadcrumb-link">${esc(cat?.name || stageKey)}</a>`;
        if (methodId) {
          const method = store.getCycle(project, cycleNumber)?.stages.find(s => s.key === stageKey)?.methods.find(m => m.id === methodId);
          if (method) breadcrumbHtml += `<span aria-hidden="true">/</span><span class="breadcrumb-current">${esc(method.title.split(' (')[0])}</span>`;
        }
      }
    } else if (route.view === 'library') breadcrumbHtml += `<span aria-hidden="true">/</span><span class="breadcrumb-current">Biblioteca NN/g</span>`;
    else if (route.view === 'team') breadcrumbHtml += `<span aria-hidden="true">/</span><span class="breadcrumb-current">Equipe</span>`;
    else if (route.view === 'settings') breadcrumbHtml += `<span aria-hidden="true">/</span><span class="breadcrumb-current">Configurações & JSON</span>`;

    bar.innerHTML = `
      <div class="top-app-bar-left"><nav class="breadcrumb-nav">${breadcrumbHtml}</nav></div>
      <div class="top-app-bar-right">
        ${store.lastSavedAt ? `<span class="save-status-badge">${icon('cloud_done')}<span>Salvo às ${esc(store.lastSavedAt)}</span></span>` : ''}
        <button type="button" class="icon-btn" id="btn-cmd-palette" aria-label="Paleta de comandos (Ctrl+K)" title="Paleta de comandos (Ctrl+K)">${icon('search')}</button>
        <button type="button" class="icon-btn" id="btn-theme-toggle" aria-label="${isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'}">${icon(isDark ? 'light_mode' : 'dark_mode')}</button>
      </div>
    `;
    document.getElementById('btn-cmd-palette')?.addEventListener('click', openCommandPalette);
    document.getElementById('btn-theme-toggle')?.addEventListener('click', () => store.toggleTheme());
  }

  function renderApp() {
    const route = parseHash();
    const main = document.getElementById('main-content');
    renderNavigation(route);
    renderTopAppBar(route);
    renderProjectStickyBar(route);
    if (!main) return;

    switch (route.view) {
      case 'projects': renderProjectsView(main); break;
      case 'overview': renderOverviewView(main, route); break;
      case 'plan': renderPlanView(main, route); break;
      case 'stage': renderStageView(main, route); break;
      case 'method': renderMethodView(main, route); break;
      case 'timeline': renderTimelineView(main, route); break;
      case 'roadmap': renderRoadmapView(main, route); break;
      case 'insights': renderInsightsView(main, route); break;
      case 'participants': renderParticipantsView(main, route); break;
      case 'library': renderLibraryView(main); break;
      case 'reports': renderReportsView(main, route); break;
      case 'team': renderTeamView(main); break;
      case 'settings': renderSettingsView(main); break;
      default: renderProjectsView(main);
    }
  }

  function openCommandPalette() {
    const root = document.getElementById('dialog-root');
    if (!root) return;
    const route = parseHash();
    const project = route.params.projectId ? store.getProject(route.params.projectId) : store.getState().projects[0];
    const commands = [
      { label: 'Ir para Projetos', hint: 'Navegação', action: () => navigate('/projetos') },
      { label: 'Abrir Biblioteca de Métodos NN/g', hint: 'Guia', action: () => navigate('/biblioteca') },
      { label: 'Gerenciar Equipe', hint: 'Equipe', action: () => navigate('/equipe') },
      { label: 'Exportar / Importar JSON', hint: 'Dados', action: () => navigate('/configuracoes') },
      ...(project ? [
        { label: `${project.name}: Visão Geral`, hint: 'Projeto', action: () => navigate(`/projeto/${project.id}`) },
        { label: `${project.name}: Timeline & Espiral`, hint: 'Projeto', action: () => navigate(`/projeto/${project.id}/timeline`) },
        { label: `${project.name}: Roadmap`, hint: 'Projeto', action: () => navigate(`/projeto/${project.id}/roadmap`) },
        { label: `${project.name}: Insights`, hint: 'Projeto', action: () => navigate(`/projeto/${project.id}/insights`) },
        { label: `${project.name}: Participantes`, hint: 'Projeto', action: () => navigate(`/projeto/${project.id}/participantes`) },
        { label: `${project.name}: Relatório`, hint: 'Projeto', action: () => navigate(`/projeto/${project.id}/relatorios`) }
      ] : []),
      ...PROJECT_TEMPLATES.map(tpl => ({
        label: `Criar via template: ${tpl.name}`,
        hint: 'Template NN/g',
        action: () => {
          const created = createProject({ name: tpl.name, description: tpl.description, constraints: tpl.constraints });
          Object.entries(tpl.stagesSetup).forEach(([stageKey, methodIds]) => {
            const st = created.cycles[0].stages.find(s => s.key === stageKey);
            methodIds.forEach(mId => { const cat = findCatalogMethod(mId); if (cat && st) st.methods.push(createMethodInstance({ catalogItem: cat })); });
          });
          store.mutate(draft => draft.projects.unshift(created));
          showSnackbar(`Projeto criado: "${tpl.name}".`);
          navigate(`/projeto/${created.id}`);
        }
      }))
    ];

    root.hidden = false;
    root.innerHTML = `<div class="cmd-palette-card" role="dialog" aria-modal="true"><input id="cmd-input" type="search" class="field-input" placeholder="Comando, rota ou template..." /><div class="cmd-list" id="cmd-results"></div></div>`;
    const close = () => { root.hidden = true; root.innerHTML = ''; };
    const listEl = root.querySelector('#cmd-results');
    const inp = root.querySelector('#cmd-input');
    const renderCmds = (q = '') => {
      const filtered = commands.filter(c => c.label.toLowerCase().includes(q.toLowerCase()));
      listEl.innerHTML = filtered.map((c, idx) => `<button type="button" class="cmd-item" data-cmd-idx="${idx}"><span>${esc(c.label)}</span><span class="badge badge-neutral">${esc(c.hint)}</span></button>`).join('');
      listEl.querySelectorAll('[data-cmd-idx]').forEach(btn => btn.addEventListener('click', () => { const chosen = filtered[Number(btn.dataset.cmdIdx)]; close(); chosen?.action(); }));
    };
    renderCmds();
    inp.focus();
    inp.addEventListener('input', () => renderCmds(inp.value));
    root.addEventListener('click', (e) => { if (e.target === root) close(); }, { once: true });
    inp.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  window.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName;
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCommandPalette(); }
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !isTyping) { if (store.undo()) { e.preventDefault(); showSnackbar('Desfeito.'); } }
    else if (e.key === '/' && !isTyping) { const s = document.querySelector('input[type="search"]'); if (s) { e.preventDefault(); s.focus(); } }
  });

  window.addEventListener('hashchange', renderApp);
  store.subscribe(renderApp);
  renderApp();
})();
