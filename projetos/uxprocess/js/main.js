import { UX_CATALOG, getStageMeta } from './catalog.js';
import { store } from './store.js';
import { parseRoute, navigate } from './router.js';
import { escapeHtml, showSnackbar, openDialog } from './ui.js';
import { renderProjectsView } from './views/projects.js';
import { renderOverviewView } from './views/overview.js';
import { renderStageView } from './views/stage.js';
import { renderMethodView } from './views/method.js';
import { renderTimelineView } from './views/timeline.js';
import { renderRoadmapView } from './views/roadmap.js';
import { renderTeamView } from './views/team.js';
import { renderLibraryView } from './views/library.js';
import { renderSettingsView } from './views/settings.js';

function openCommandPalette() {
  const { projects } = store.state;
  const allItems = [
    { label: 'Ir para Projetos', sub: 'Navegação', href: '#/projetos' },
    { label: 'Ir para Equipe & Responsáveis', sub: 'Navegação', href: '#/equipe' },
    { label: 'Ir para Biblioteca de Métodos UX', sub: 'Guia', href: '#/biblioteca' },
    { label: 'Ir para Configurações & Backup JSON', sub: 'Sistema', href: '#/configuracoes' },
    ...projects.map(p => ({
      label: `Projeto: ${p.name}`,
      sub: 'Visão Geral',
      href: `#/projeto/${p.id}/visao-geral`
    })),
    ...projects.flatMap(p =>
      p.stages.flatMap(st =>
        st.methods.map(m => ({
          label: `Método: ${m.titlePt}`,
          sub: `${p.name} • ${st.key.toUpperCase()}`,
          href: `#/projeto/${p.id}/etapa/${st.key}/metodo/${m.id}`
        }))
      )
    )
  ];

  openDialog({
    title: 'Paleta de Comandos & Busca Global (Ctrl+K)',
    confirmLabel: null,
    cancelLabel: 'Fechar',
    bodyHtml: `
      <input type="search" id="cmd-input" class="field-input" placeholder="Digite o nome de um projeto, método ou tela..." autofocus>
      <div id="cmd-results" style="margin-top: 12px; max-height: 300px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;"></div>
    `
  });

  const root = document.getElementById('modal-root');
  const input = root.querySelector('#cmd-input');
  const results = root.querySelector('#cmd-results');

  const renderResults = (q = '') => {
    const filtered = allItems
      .filter(it =>
        it.label.toLowerCase().includes(q.toLowerCase()) ||
        it.sub.toLowerCase().includes(q.toLowerCase())
      )
      .slice(0, 12);

    results.innerHTML =
      filtered
        .map(
          it => `
        <a href="${it.href}" class="card card-outlined" style="padding: 10px 14px; text-decoration: none; color: inherit; display: flex; justify-content: space-between; align-items: center;">
          <strong>${escapeHtml(it.label)}</strong>
          <span class="typescale-label-small" style="color: var(--md-sys-color-primary);">${escapeHtml(it.sub)}</span>
        </a>
      `
        )
        .join('') || '<p class="typescale-body-medium">Nenhum resultado encontrado.</p>';

    results.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        root.hidden = true;
        root.innerHTML = '';
      })
    );
  };

  renderResults('');
  input.focus();
  input.addEventListener('input', e => renderResults(e.target.value));
}

function renderNavigation(route) {
  const activeProjId = route.projectId || store.state.projects[0]?.id;
  const navItems = [
    { id: 'projects', label: 'Projetos', icon: 'folder_special', href: '#/projetos', active: route.view === 'projects' },
    ...(activeProjId
      ? [
          {
            id: 'overview',
            label: 'Visão Geral',
            icon: 'dashboard',
            href: `#/projeto/${activeProjId}/visao-geral`,
            active: route.view === 'overview'
          },
          {
            id: 'stages',
            label: 'Etapas UX',
            icon: 'linear_scale',
            href: `#/projeto/${activeProjId}/etapa/${route.stageKey || 'discover'}`,
            active: route.view === 'stage' || route.view === 'method'
          },
          {
            id: 'roadmap',
            label: 'Roadmap',
            icon: 'view_timeline',
            href: `#/projeto/${activeProjId}/roadmap`,
            active: route.view === 'roadmap' || route.view === 'timeline'
          }
        ]
      : []),
    { id: 'team', label: 'Equipe', icon: 'group', href: '#/equipe', active: route.view === 'team' },
    { id: 'library', label: 'Biblioteca', icon: 'menu_book', href: '#/biblioteca', active: route.view === 'library' }
  ];

  // Sidebar (Rail no Medium / Drawer no Expanded)
  const sidebar = document.getElementById('nav-sidebar');
  sidebar.innerHTML = `
    <div class="nav-brand">
      <span class="material-symbols-outlined icon-filled" style="color: var(--md-sys-color-primary); font-size: 32px;">design_services</span>
      <div class="nav-brand-text">
        <div class="typescale-title-medium" style="font-weight: 700;">UX Flow</div>
        <div class="typescale-label-small" style="color: var(--md-sys-color-on-surface-variant);">M3 UX Process Manager</div>
      </div>
    </div>
    ${navItems
      .map(
        item => `
      <a href="${item.href}" class="nav-item ${item.active ? 'active' : ''}" aria-current="${item.active ? 'page' : 'false'}">
        <div class="nav-item-icon-wrap">
          <span class="material-symbols-outlined ${item.active ? 'icon-filled' : ''}">${item.icon}</span>
        </div>
        <span>${item.label}</span>
      </a>
    `
      )
      .join('')}
    <a href="#/configuracoes" class="nav-item ${route.view === 'settings' ? 'active' : ''}" style="margin-top: auto;" aria-current="${route.view === 'settings' ? 'page' : 'false'}">
      <div class="nav-item-icon-wrap">
        <span class="material-symbols-outlined ${route.view === 'settings' ? 'icon-filled' : ''}">settings</span>
      </div>
      <span>Dados & JSON</span>
    </a>
  `;

  // Bottom NavigationBar (Compact < 600px — máximo 5 destinos)
  const bottomBar = document.getElementById('nav-bottom-bar');
  bottomBar.innerHTML = navItems
    .slice(0, 5)
    .map(
      item => `
    <a href="${item.href}" class="nav-bottom-item ${item.active ? 'active' : ''}" aria-current="${item.active ? 'page' : 'false'}">
      <div class="nav-bottom-pill">
        <span class="material-symbols-outlined ${item.active ? 'icon-filled' : ''}">${item.icon}</span>
      </div>
      <span>${item.label}</span>
    </a>
  `
    )
    .join('');
}

function renderTopAppBar(route, project) {
  const topBar = document.getElementById('top-app-bar');
  const isDark = store.getTheme() === 'dark';

  let breadcrumbHtml = `<a href="#/projetos" class="breadcrumb-item ${route.view === 'projects' ? 'active' : ''}">Projetos</a>`;

  if (project && ['overview', 'stage', 'method', 'timeline', 'roadmap'].includes(route.view)) {
    breadcrumbHtml += `
      <span class="material-symbols-outlined" style="font-size: 18px; color: var(--md-sys-color-outline);">chevron_right</span>
      <a href="#/projeto/${project.id}/visao-geral" class="breadcrumb-item ${route.view === 'overview' ? 'active' : ''}">${escapeHtml(project.name)}</a>
    `;
    if (route.view === 'stage' || route.view === 'method') {
      const stMeta = getStageMeta(route.stageKey);
      breadcrumbHtml += `
        <span class="material-symbols-outlined" style="font-size: 18px; color: var(--md-sys-color-outline);">chevron_right</span>
        <a href="#/projeto/${project.id}/etapa/${route.stageKey}" class="breadcrumb-item ${route.view === 'stage' ? 'active' : ''}" style="color: ${stMeta.tokens.accent};">${stMeta.nameEn}</a>
      `;
    } else if (route.view === 'timeline') {
      breadcrumbHtml += `<span class="material-symbols-outlined" style="font-size: 18px;">chevron_right</span><span class="breadcrumb-item active">Timeline Completa</span>`;
    } else if (route.view === 'roadmap') {
      breadcrumbHtml += `<span class="material-symbols-outlined" style="font-size: 18px;">chevron_right</span><span class="breadcrumb-item active">Roadmap</span>`;
    }
  } else if (route.view === 'team') {
    breadcrumbHtml += `<span class="material-symbols-outlined" style="font-size: 18px;">chevron_right</span><span class="breadcrumb-item active">Equipe</span>`;
  } else if (route.view === 'library') {
    breadcrumbHtml += `<span class="material-symbols-outlined" style="font-size: 18px;">chevron_right</span><span class="breadcrumb-item active">Biblioteca</span>`;
  } else if (route.view === 'settings') {
    breadcrumbHtml += `<span class="material-symbols-outlined" style="font-size: 18px;">chevron_right</span><span class="breadcrumb-item active">Configurações</span>`;
  }

  topBar.innerHTML = `
    <div class="top-app-bar-left">
      <nav class="breadcrumb" aria-label="Caminho de navegação">${breadcrumbHtml}</nav>
    </div>
    <div class="top-app-bar-actions">
      <span class="typescale-label-small" style="color: var(--md-sys-color-on-surface-variant); margin-right: 4px; display: none;" id="saved-indicator">
        Salvo às ${escapeHtml(store.state.lastSavedAt || '')}
      </span>
      <button type="button" class="icon-btn" id="cmd-palette-btn" title="Busca Global / Comandos (Ctrl+K)" aria-label="Abrir paleta de comandos">
        <span class="material-symbols-outlined">search</span>
      </button>
      <a href="#/configuracoes" class="icon-btn" title="Exportar/Importar JSON" aria-label="Configurações e JSON">
        <span class="material-symbols-outlined">database</span>
      </a>
      <button type="button" class="icon-btn" id="undo-btn" title="Desfazer (Ctrl+Z)" aria-label="Desfazer última ação">
        <span class="material-symbols-outlined">undo</span>
      </button>
      <!-- Toggle de Tema SOMENTE ÍCONE conforme regra M3 -->
      <button type="button" class="icon-btn" id="theme-toggle-btn" aria-label="${isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'}">
        <span class="material-symbols-outlined">${isDark ? 'light_mode' : 'dark_mode'}</span>
      </button>
    </div>
  `;

  if (window.innerWidth >= 840 && store.state.lastSavedAt) {
    const ind = document.getElementById('saved-indicator');
    if (ind) ind.style.display = 'inline';
  }

  document.getElementById('cmd-palette-btn').addEventListener('click', openCommandPalette);
  document.getElementById('theme-toggle-btn').addEventListener('click', () => store.toggleTheme());
  document.getElementById('undo-btn').addEventListener('click', () => {
    if (store.undo()) showSnackbar('Ação desfeita.');
    else showSnackbar('Nada para desfazer.');
  });
}

function renderStickyTimeline(route, project) {
  const container = document.getElementById('project-sticky-timeline');
  const inProject = project && ['overview', 'stage', 'method', 'timeline', 'roadmap'].includes(route.view);

  if (!inProject) {
    container.hidden = true;
    container.innerHTML = '';
    return;
  }

  container.hidden = false;
  container.innerHTML = `
    <div style="max-width: 1280px; margin: 0 auto;">
      <!-- Sub-navegação rápida do projeto -->
      <div style="display: flex; gap: 6px; margin-bottom: 10px; overflow-x: auto;">
        <a href="#/projeto/${project.id}/visao-geral" class="subnav-pill ${route.view === 'overview' ? 'active' : ''}" style="min-height: 36px; padding: 0 12px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">dashboard</span> Visão Geral
        </a>
        <a href="#/projeto/${project.id}/timeline" class="subnav-pill ${route.view === 'timeline' ? 'active' : ''}" style="min-height: 36px; padding: 0 12px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">timeline</span> Timeline Completa
        </a>
        <a href="#/projeto/${project.id}/roadmap" class="subnav-pill ${route.view === 'roadmap' ? 'active' : ''}" style="min-height: 36px; padding: 0 12px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">view_timeline</span> Roadmap (Gantt / Kanban)
        </a>
      </div>

      <!-- Barra Horizontal Fixa das 5 Etapas -->
      <div class="sticky-timeline-track" role="navigation" aria-label="Etapas do processo UX">
        ${UX_CATALOG.map(meta => {
          const st = project.stages.find(s => s.key === meta.key);
          const pct = store.calcStageProgress(st);
          const doneCount = st.methods.filter(m => m.status === 'done').length;
          const totalCount = st.methods.length;
          const isCurrent = (route.view === 'stage' || route.view === 'method') && route.stageKey === meta.key;

          return `
            <a href="#/projeto/${project.id}/etapa/${meta.key}"
               class="stage-pill ${isCurrent ? 'active' : ''}"
               style="--stage-accent: ${meta.tokens.accent}; --stage-container: ${meta.tokens.container}; --stage-on-container: ${meta.tokens.onContainer};"
               aria-current="${isCurrent ? 'step' : 'false'}">
              <div class="stage-pill-header">
                <span style="display: inline-flex; align-items: center; gap: 6px; font-weight: 700; font-size: 13px;">
                  <span class="material-symbols-outlined" style="font-size: 18px; color: ${meta.tokens.accent};">${meta.icon}</span>
                  ${meta.nameEn}
                </span>
                <span class="typescale-label-medium">${pct}%</span>
              </div>
              <div class="progress-track" style="height: 6px;">
                <div class="progress-fill" style="width: ${pct}%; background-color: ${meta.tokens.accent};"></div>
              </div>
              <div class="typescale-label-small" style="opacity: 0.85;">
                ${totalCount === 0 ? '0% — adicione métodos' : `${doneCount}/${totalCount} métodos`}
              </div>
            </a>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderApp() {
  const route = parseRoute();
  const project = route.projectId ? store.state.projects.find(p => p.id === route.projectId) : null;

  renderNavigation(route);
  renderTopAppBar(route, project);
  renderStickyTimeline(route, project);

  const main = document.getElementById('main-content');

  if (route.view === 'projects') return renderProjectsView(main);
  if (route.view === 'team') return renderTeamView(main);
  if (route.view === 'library') return renderLibraryView(main);
  if (route.view === 'settings') return renderSettingsView(main);

  if (!project) {
    navigate('/projetos');
    return;
  }

  if (route.view === 'overview') return renderOverviewView(main, project);
  if (route.view === 'timeline') return renderTimelineView(main, project);
  if (route.view === 'roadmap') return renderRoadmapView(main, project);
  if (route.view === 'stage') return renderStageView(main, project, route.stageKey);
  if (route.view === 'method') return renderMethodView(main, project, route.stageKey, route.methodId);
}

// Atalhos globais de teclado
window.addEventListener('keydown', e => {
  const tag = document.activeElement?.tagName;
  const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCommandPalette();
    return;
  }

  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !isTyping) {
    e.preventDefault();
    if (store.undo()) showSnackbar('Ação desfeita.');
    return;
  }

  if (e.key === '/' && !isTyping) {
    const searchEl = document.querySelector('input[type="search"]');
    if (searchEl) {
      e.preventDefault();
      searchEl.focus();
    } else {
      e.preventDefault();
      openCommandPalette();
    }
  }
});

window.addEventListener('hashchange', renderApp);
store.subscribe(renderApp);
renderApp();