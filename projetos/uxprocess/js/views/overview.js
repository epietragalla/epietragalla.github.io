import { UX_CATALOG, getStageMeta } from '../catalog.js';
import { store } from '../store.js';
import { escapeHtml, renderAvatar, openDialog, showSnackbar } from '../ui.js';

export function renderOverviewView(container, project) {
  const { people } = store.state;
  const overallProgress = store.calcProjectProgress(project);
  const allMethods = project.stages.flatMap(st => st.methods.map(m => ({ ...m, stageKey: st.key })));
  const doneMethods = allMethods.filter(m => m.status === 'done');
  const promotedInsights = allMethods.flatMap(m =>
    (m.findings || [])
      .filter(f => f.promotedToInsight)
      .map(f => ({ ...f, methodTitle: m.titlePt, stageKey: m.stageKey }))
  );

  // Próximo passo inteligente sugerido
  const firstIncompleteStage = UX_CATALOG.find(meta => {
    const st = project.stages.find(s => s.key === meta.key);
    return store.calcStageProgress(st) < 100;
  }) || UX_CATALOG[0];

  const firstStageObj = project.stages.find(s => s.key === firstIncompleteStage.key);
  const suggestionText = firstStageObj.methods.length === 0
    ? `A etapa ${firstIncompleteStage.nameEn} ainda não tem métodos selecionados. Adicione métodos do catálogo para começar.`
    : `Continue trabalhando em ${firstIncompleteStage.nameEn}: há ${firstStageObj.methods.filter(m => m.status !== 'done').length} método(s) pendente(s).`;

  container.innerHTML = `
    <div class="page-header">
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <span style="width: 16px; height: 16px; border-radius: 50%; background: ${escapeHtml(project.color)}; display: inline-block;"></span>
          <span class="typescale-label-large" style="color: var(--md-sys-color-on-surface-variant);">VISÃO GERAL DO PROJETO</span>
        </div>
        <h1 class="typescale-headline-medium">${escapeHtml(project.name)}</h1>
        <p class="typescale-body-large" style="color: var(--md-sys-color-on-surface-variant); max-width: 72ch; margin-top: 4px;">
          ${escapeHtml(project.description || 'Sem objetivo cadastrado.')}
        </p>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button type="button" class="btn btn-outlined" id="export-csv-btn">
          <span class="material-symbols-outlined">table_view</span> CSV Roadmap
        </button>
        <button type="button" class="btn btn-outlined" id="print-report-btn">
          <span class="material-symbols-outlined">picture_as_pdf</span> Relatório PDF
        </button>
        <button type="button" class="btn btn-tonal" id="present-mode-btn">
          <span class="material-symbols-outlined">slideshow</span> Apresentar
        </button>
        <button type="button" class="btn btn-outlined" id="edit-proj-meta-btn">
          <span class="material-symbols-outlined">edit</span> Editar
        </button>
      </div>
    </div>

    <!-- Banner de Próximo Passo Sugerido -->
    <div class="card card-filled" style="background-color: var(--md-sys-color-primary-container); color: var(--md-sys-color-on-primary-container); margin-bottom: 24px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="material-symbols-outlined icon-filled" style="font-size: 28px;">tips_and_updates</span>
        <div>
          <div class="typescale-title-small">Próximo passo recomendado</div>
          <div class="typescale-body-medium">${escapeHtml(suggestionText)}</div>
        </div>
      </div>
      <a href="#/projeto/${project.id}/etapa/${firstIncompleteStage.key}" class="btn btn-filled">Ir para ${firstIncompleteStage.nameEn}</a>
    </div>

    <!-- KPIs Rápidos -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; margin-bottom: 24px;">
      <div class="card card-elevated">
        <span class="typescale-label-medium" style="color: var(--md-sys-color-on-surface-variant);">Progresso Geral</span>
        <div class="typescale-display-small" style="margin: 6px 0;">${overallProgress}%</div>
        <div class="progress-track"><div class="progress-fill" style="width: ${overallProgress}%;"></div></div>
      </div>

      <div class="card card-elevated">
        <span class="typescale-label-medium" style="color: var(--md-sys-color-on-surface-variant);">Métodos Concluídos</span>
        <div class="typescale-display-small" style="margin: 6px 0;">${doneMethods.length}/${allMethods.length}</div>
        <span class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">Distribuídos nas 5 etapas</span>
      </div>

      <div class="card card-elevated">
        <span class="typescale-label-medium" style="color: var(--md-sys-color-on-surface-variant);">Insights Promovidos</span>
        <div class="typescale-display-small" style="margin: 6px 0;">${promotedInsights.length}</div>
        <span class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">Descobertas validadas</span>
      </div>

      <div class="card card-elevated">
        <span class="typescale-label-medium" style="color: var(--md-sys-color-on-surface-variant);">Equipe Alocada</span>
        <div style="display: flex; gap: 6px; margin: 12px 0;">
          ${(project.ownerIds || []).map(id => renderAvatar(people.find(p => p.id === id))).join('') || '<span class="typescale-body-medium">Nenhum líder</span>'}
        </div>
        <a href="#/equipe" class="typescale-label-medium" style="color: var(--md-sys-color-primary);">Gerenciar equipe →</a>
      </div>
    </div>

    <!-- Progresso Detalhado por Etapa & Insights Recentes -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 20px;">
      <section class="card card-outlined">
        <h2 class="typescale-title-large" style="margin-bottom: 16px;">Saúde por Etapa do Processo</h2>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${UX_CATALOG.map(meta => {
            const st = project.stages.find(s => s.key === meta.key);
            const pct = store.calcStageProgress(st);
            const resp = people.find(p => p.id === st.responsibleIds[0]);
            return `
              <div style="padding: 12px; border-radius: 12px; background: var(--md-sys-color-surface-container-low);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <a href="#/projeto/${project.id}/etapa/${meta.key}" style="font-weight: 700; color: ${meta.tokens.accent}; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                    <span class="material-symbols-outlined" style="font-size: 18px;">${meta.icon}</span>
                    ${meta.nameEn} (${meta.namePt})
                  </a>
                  <span class="typescale-label-large">${pct}%</span>
                </div>
                <div class="progress-track" style="margin-bottom: 6px;">
                  <div class="progress-fill" style="width: ${pct}%; background-color: ${meta.tokens.accent};"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--md-sys-color-on-surface-variant);">
                  <span>${st.methods.length} método(s)</span>
                  <span>Resp: ${resp ? escapeHtml(resp.name) : 'Não definido'}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <section class="card card-outlined">
        <h2 class="typescale-title-large" style="margin-bottom: 16px;">Insights Promovidos (Da Pesquisa à Decisão)</h2>
        ${promotedInsights.length === 0 ? `
          <div class="empty-state">
            <span class="material-symbols-outlined">lightbulb</span>
            <p class="typescale-body-medium">Nenhum achado foi promovido a insight ainda. Abra um método e clique em "Promover a Insight".</p>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${promotedInsights.map(ins => {
              const stMeta = getStageMeta(ins.stageKey);
              return `
                <div style="padding: 12px; border-radius: 12px; border-left: 4px solid ${stMeta.tokens.accent}; background: var(--md-sys-color-surface-container-low);">
                  <div class="typescale-label-small" style="color: ${stMeta.tokens.accent}; font-weight: 700;">${stMeta.nameEn} • ${escapeHtml(ins.methodTitle)}</div>
                  <div class="typescale-title-small" style="margin: 4px 0;">${escapeHtml(ins.title)}</div>
                  <p class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">${escapeHtml(ins.description)}</p>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </section>
    </div>
  `;

  // Relatório Imprimível / PDF
  container.querySelector('#print-report-btn').addEventListener('click', () => {
    window.print();
  });

  // Exportar CSV do Roadmap
  container.querySelector('#export-csv-btn').addEventListener('click', () => {
    const csv = store.exportRoadmapCSV(project);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roadmap-${project.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showSnackbar('Roadmap exportado em CSV.');
  });

  // Modo Apresentação para Stakeholders
  container.querySelector('#present-mode-btn').addEventListener('click', () => {
    let slideIdx = 0;
    const renderSlide = (root) => {
      const meta = UX_CATALOG[slideIdx];
      const st = project.stages.find(s => s.key === meta.key);
      const pct = store.calcStageProgress(st);
      const insights = st.methods.flatMap(m => (m.findings || []).filter(f => f.promotedToInsight));

      root.querySelector('#dialog-title').textContent = `[${slideIdx + 1}/5] ${meta.nameEn} (${meta.namePt}) — ${pct}%`;
      root.querySelector('#dialog-body').innerHTML = `
        <div style="padding: 16px; border-radius: 12px; background: ${meta.tokens.container}; color: ${meta.tokens.onContainer}; margin-bottom: 16px;">
          <strong>Objetivo:</strong> ${escapeHtml(meta.objective)}
        </div>
        <p class="typescale-title-small" style="margin-bottom: 8px;">Métodos aplicados (${st.methods.length}):</p>
        <ul style="padding-left: 20px; margin-bottom: 16px;">
          ${st.methods.map(m => `<li>${escapeHtml(m.titlePt)} (${m.progress}%)</li>`).join('') || '<li>Nenhum método nesta etapa.</li>'}
        </ul>
        <p class="typescale-title-small" style="margin-bottom: 8px;">Insights-chave (${insights.length}):</p>
        <ul style="padding-left: 20px;">
          ${insights.map(i => `<li><strong>${escapeHtml(i.title)}:</strong> ${escapeHtml(i.description)}</li>`).join('') || '<li>Nenhum insight promovido.</li>'}
        </ul>
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
          <button type="button" class="btn btn-outlined" id="slide-prev" ${slideIdx === 0 ? 'disabled' : ''}>← Anterior</button>
          <button type="button" class="btn btn-filled" id="slide-next" ${slideIdx === 4 ? 'disabled' : ''}>Próxima Etapa →</button>
        </div>
      `;

      root.querySelector('#slide-prev')?.addEventListener('click', () => {
        slideIdx--;
        renderSlide(root);
      });
      root.querySelector('#slide-next')?.addEventListener('click', () => {
        slideIdx++;
        renderSlide(root);
      });
    };

    openDialog({
      title: 'Modo Apresentação',
      confirmLabel: null,
      cancelLabel: 'Fechar Apresentação',
      bodyHtml: '<div id="slide-host"></div>'
    });
    renderSlide(document.getElementById('modal-root'));
  });

  // Editar Metadados do Projeto
  container.querySelector('#edit-proj-meta-btn').addEventListener('click', () => {
    openDialog({
      title: 'Editar Metadados do Projeto',
      confirmLabel: 'Salvar',
      bodyHtml: `
        <div class="field-group">
          <label class="field-label" for="ep-name">Nome *</label>
          <input type="text" id="ep-name" class="field-input" value="${escapeHtml(project.name)}">
        </div>
        <div class="field-group">
          <label class="field-label" for="ep-desc">Descrição / Objetivo</label>
          <textarea id="ep-desc" class="field-textarea">${escapeHtml(project.description || '')}</textarea>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="field-group">
            <label class="field-label" for="ep-start">Início</label>
            <input type="date" id="ep-start" class="field-input" value="${escapeHtml(project.startDate || '')}">
          </div>
          <div class="field-group">
            <label class="field-label" for="ep-end">Prazo Final</label>
            <input type="date" id="ep-end" class="field-input" value="${escapeHtml(project.endDate || '')}">
          </div>
        </div>
      `,
      onConfirm: (root) => {
        const name = root.querySelector('#ep-name').value.trim();
        if (!name) return false;
        store.updateProject(project.id, {
          name,
          description: root.querySelector('#ep-desc').value.trim(),
          startDate: root.querySelector('#ep-start').value,
          endDate: root.querySelector('#ep-end').value
        });
        showSnackbar('Projeto atualizado.');
      }
    });
  });
}