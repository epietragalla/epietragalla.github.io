import { UX_CATALOG } from '../catalog.js';
import { store } from '../store.js';
import { escapeHtml, renderAvatar } from '../ui.js';

export function renderTimelineView(container, project) {
  const { people } = store.state;
  const overall = store.calcProjectProgress(project);

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="typescale-headline-medium">Timeline Completa do Processo UX</h1>
        <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant);">
          Visão cronológica expandida das 5 etapas e seus métodos • Conclusão total: <strong>${overall}%</strong>
        </p>
      </div>
      <a href="#/projeto/${project.id}/roadmap" class="btn btn-tonal">
        <span class="material-symbols-outlined">view_kanban</span> Ver no Roadmap
      </a>
    </div>

    <div style="margin-top: 24px;">
      ${UX_CATALOG.map((meta, index) => {
        const stage = project.stages.find(s => s.key === meta.key);
        const pct = store.calcStageProgress(stage);
        const stageResp = people.find(p => p.id === stage.responsibleIds[0]);

        return `
          <section class="timeline-stage-block" style="--stage-accent: ${meta.tokens.accent}; --stage-on-accent: ${meta.tokens.onAccent};">
            <div class="timeline-stage-node">${index + 1}</div>

            <div class="card card-elevated" style="margin-bottom: 16px;">
              <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="material-symbols-outlined icon-filled" style="color: ${meta.tokens.accent};">${meta.icon}</span>
                    <h2 class="typescale-title-large">${meta.nameEn} <span style="font-weight: 400; opacity: 0.8;">(${meta.namePt})</span></h2>
                  </div>
                  <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant);">${escapeHtml(meta.objective)}</p>
                </div>

                <div style="display: flex; align-items: center; gap: 12px;">
                  ${stageResp ? `<div style="display: flex; align-items: center; gap: 6px;">${renderAvatar(stageResp)} <span class="typescale-body-small">${escapeHtml(stageResp.name)}</span></div>` : ''}
                  <span class="status-badge" style="background: ${meta.tokens.container}; color: ${meta.tokens.onContainer}; font-weight: 700;">${pct}%</span>
                  <a href="#/projeto/${project.id}/etapa/${meta.key}" class="btn btn-outlined">Gerenciar Etapa</a>
                </div>
              </div>

              <div class="progress-track" style="margin-bottom: 16px;">
                <div class="progress-fill" style="width: ${pct}%; background-color: ${meta.tokens.accent};"></div>
              </div>

              ${stage.methods.length === 0 ? `
                <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant); font-style: italic;">
                  0% — Nenhum método adicionado a esta etapa ainda.
                </p>
              ` : `
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${stage.methods.map(m => {
                    const mResp = people.find(p => p.id === m.responsibleIds[0]);
                    const statusText = m.status === 'done' ? 'Concluído' : m.status === 'in_progress' ? 'Em andamento' : m.status === 'review' ? 'Em revisão' : 'A fazer';
                    return `
                      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 14px; border-radius: 10px; background: var(--md-sys-color-surface-container-low); border: 1px solid var(--md-sys-color-outline-variant);">
                        <div style="min-width: 220px; flex: 1;">
                          <a href="#/projeto/${project.id}/etapa/${meta.key}/metodo/${m.id}" class="typescale-title-small" style="color: var(--md-sys-color-on-surface); text-decoration: none;">
                            ${escapeHtml(m.titlePt)}
                          </a>
                          <div class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">
                            ${escapeHtml(m.group)} • Peso ${m.weight || 1} ${(m.startDate || m.endDate) ? `• ${m.startDate || '?'} → ${m.endDate || '?'}` : ''}
                          </div>
                        </div>

                        <div style="display: flex; align-items: center; gap: 12px;">
                          ${mResp ? renderAvatar(mResp) : ''}
                          <span class="status-badge" data-status="${m.status}">${statusText}</span>
                          <span class="typescale-label-large" style="min-width: 44px; text-align: right;">${m.progress}%</span>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              `}
            </div>
          </section>
        `;
      }).join('')}
    </div>
  `;
}