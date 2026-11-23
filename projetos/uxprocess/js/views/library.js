import { UX_CATALOG, METHOD_GUIDES } from '../catalog.js';
import { escapeHtml } from '../ui.js';

let selectedStage = 'all';
let libSearch = '';

export function renderLibraryView(container) {
  const stagesToRender = selectedStage === 'all'
    ? UX_CATALOG
    : UX_CATALOG.filter(s => s.key === selectedStage);

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="typescale-headline-medium">Biblioteca & Guia de Métodos UX</h1>
        <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant);">
          Referência prática com passo a passo, entregáveis típicos, duração e armadilhas comuns de cada etapa.
        </p>
      </div>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 24px;">
      <input type="search" id="lib-search" class="field-input" style="flex: 1; min-width: 240px;" placeholder="Buscar método (ex: Crazy 8, SUS, Persona, Heurística)..." value="${escapeHtml(libSearch)}">
      <div style="display: flex; gap: 6px; flex-wrap: wrap;">
        <button type="button" class="chip ${selectedStage === 'all' ? 'selected' : ''}" data-lib-stage="all">Todas as Etapas</button>
        ${UX_CATALOG.map(s => `
          <button type="button" class="chip ${selectedStage === s.key ? 'selected' : ''}" data-lib-stage="${s.key}">${s.nameEn}</button>
        `).join('')}
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 28px;">
      ${stagesToRender.map(stage => {
        const guide = METHOD_GUIDES[stage.key];
        const matchingGroups = stage.groups.map(g => ({
          ...g,
          methods: g.methods.filter(m =>
            !libSearch ||
            m.titlePt.toLowerCase().includes(libSearch.toLowerCase()) ||
            m.titleEn.toLowerCase().includes(libSearch.toLowerCase())
          )
        })).filter(g => g.methods.length > 0);

        if (libSearch && matchingGroups.length === 0) return '';

        return `
          <section class="card card-elevated" style="border-top: 6px solid ${stage.tokens.accent};">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
              <span class="material-symbols-outlined icon-filled" style="color: ${stage.tokens.accent}; font-size: 28px;">${stage.icon}</span>
              <h2 class="typescale-headline-small">${stage.nameEn} (${stage.namePt})</h2>
            </div>
            <p class="typescale-body-large" style="margin-bottom: 16px;"><strong>Objetivo:</strong> ${escapeHtml(stage.objective)}</p>

            <!-- Guia Prático da Etapa -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; padding: 16px; border-radius: 12px; background: var(--md-sys-color-surface-container-low); margin-bottom: 20px;">
              <div>
                <div class="typescale-label-large" style="color: ${stage.tokens.accent};">Quando usar</div>
                <p class="typescale-body-small" style="margin-top: 4px;">${escapeHtml(guide.when)}</p>
              </div>
              <div>
                <div class="typescale-label-large" style="color: ${stage.tokens.accent};">Entregáveis & Duração</div>
                <p class="typescale-body-small" style="margin-top: 4px;">${escapeHtml(guide.deliverables)} <strong>(${escapeHtml(guide.duration)})</strong></p>
              </div>
              <div>
                <div class="typescale-label-large" style="color: var(--md-sys-color-error);">Erro comum a evitar</div>
                <p class="typescale-body-small" style="margin-top: 4px;">${escapeHtml(guide.pitfalls)}</p>
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 class="typescale-title-small" style="margin-bottom: 8px;">Passo a passo recomendado:</h3>
              <ol style="padding-left: 20px; display: flex; flex-direction: column; gap: 4px;" class="typescale-body-medium">
                ${guide.steps.map(st => `<li>${escapeHtml(st)}</li>`).join('')}
              </ol>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
              ${matchingGroups.map(g => `
                <div class="card card-outlined" style="padding: 14px;">
                  <h4 class="typescale-title-small" style="color: ${stage.tokens.accent}; margin-bottom: 8px;">Grupo: ${escapeHtml(g.name)}</h4>
                  <ul style="padding-left: 18px; display: flex; flex-direction: column; gap: 6px;" class="typescale-body-medium">
                    ${g.methods.map(m => `<li><strong>${escapeHtml(m.titlePt)}</strong> <span style="opacity: 0.75;">(${escapeHtml(m.titleEn)})</span></li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </section>
        `;
      }).join('')}
    </div>
  `;

  container.querySelector('#lib-search').addEventListener('input', e => {
    libSearch = e.target.value;
    renderLibraryView(container);
    const inp = container.querySelector('#lib-search');
    inp.focus();
    inp.setSelectionRange(libSearch.length, libSearch.length);
  });

  container.querySelectorAll('[data-lib-stage]').forEach(btn => btn.addEventListener('click', () => {
    selectedStage = btn.dataset.libStage;
    renderLibraryView(container);
  }));
}