window.UXR = window.UXR || {};

window.UXR.renderProjectStickyBar = function(route) {
  const { store, STAGE_ORDER, STAGES_CATALOG, esc, icon, openDialog, showSnackbar, navigate } = window.UXR;
  const bar = document.getElementById('project-sticky-bar');
  if (!bar) return;

  const { projectId } = route.params;
  if (!projectId) { bar.hidden = true; bar.innerHTML = ''; return; }
  const project = store.getProject(projectId);
  if (!project) { bar.hidden = true; return; }

  const cycleNumber = route.params.cycleNumber || project.activeCycleNumber || 1;
  const activeCycle = store.getCycle(project, cycleNumber);
  const currentStageKey = route.params.stageKey || '';
  const cycleOverall = store.calcCycleProgress(activeCycle);

  bar.hidden = false;
  bar.innerHTML = `
    <div class="sticky-timeline-wrapper">
      <div class="cycle-controls">
        <select id="cycle-selector" class="field-select" style="min-height:48px;padding-block:8px;width:auto;" aria-label="Ciclo do projeto">
          ${project.cycles.map(c => `<option value="${c.number}" ${c.number === activeCycle.number ? 'selected' : ''}>${esc(c.name)} (${store.calcCycleProgress(c)}%)</option>`).join('')}
        </select>
        <button type="button" class="btn btn-tonal btn-sm" id="btn-new-cycle">${icon('autorenew')}<span>Novo ciclo</span></button>
        <span class="badge badge-neutral">Ciclo: <strong>${cycleOverall}%</strong></span>
      </div>
      <nav class="stages-stepper" aria-label="Etapas do ciclo NN/g">
        ${STAGE_ORDER.map((key, idx) => {
          const cat = STAGES_CATALOG[key];
          const stData = activeCycle.stages.find(s => s.key === key);
          const metrics = store.calcStageMetrics(stData);
          const isCurrent = currentStageKey === key;
          const totalItems = metrics.methodsTotal + metrics.activitiesTotal;
          const doneItems = metrics.methodsDone + metrics.activitiesDone;
          return `
            <a href="#/projeto/${esc(project.id)}/ciclo/${activeCycle.number}/etapa/${key}" class="stage-pill" data-stage="${key}" ${isCurrent ? 'aria-current="step"' : ''}>
              <div class="stage-ring" style="background:var(--stage-${key}-container);color:var(--stage-${key}-on-container);">${metrics.percent}%</div>
              <div style="min-width:0;flex:1;">
                <div class="title-small">${esc(cat.name)}</div>
                <div class="body-small" style="opacity:0.85;">${metrics.isEmpty ? '0% — adicione métodos' : `${doneItems}/${totalItems} itens`}</div>
              </div>
            </a>
            ${idx < STAGE_ORDER.length - 1 ? `<span class="stage-arrow" aria-hidden="true">${icon('arrow_forward')}</span>` : `<span class="stage-arrow" aria-hidden="true">${icon('replay')}</span>`}
          `;
        }).join('')}
      </nav>
    </div>
  `;

  document.getElementById('cycle-selector')?.addEventListener('change', (e) => {
    const nextNum = Number(e.target.value);
    store.mutate(draft => { const p = draft.projects.find(item => item.id === project.id); if (p) p.activeCycleNumber = nextNum; }, { recordUndo: false });
    if (route.view === 'stage' || route.view === 'method') navigate(`/projeto/${project.id}/ciclo/${nextNum}/etapa/${route.params.stageKey}`);
    else navigate(`/projeto/${project.id}`);
  });

  document.getElementById('btn-new-cycle')?.addEventListener('click', () => {
    openDialog({
      title: 'Iniciar novo ciclo de iteração',
      confirmLabel: 'Criar ciclo',
      bodyHtml: `
        <p class="body-medium text-variant" style="margin-bottom:16px;">O fim de um ciclo é o começo do próximo.</p>
        <div class="stack-v">
          <label style="display:flex;align-items:center;gap:12px;min-height:48px;"><input type="radio" name="cycle-mode" value="empty" checked /><span><strong>Começar vazio</strong> (recomendado para alternar métodos)</span></label>
          <label style="display:flex;align-items:center;gap:12px;min-height:48px;"><input type="radio" name="cycle-mode" value="copy" /><span><strong>Copiar estrutura do ciclo anterior</strong></span></label>
        </div>
      `,
      onConfirm: (dialogEl) => {
        const mode = dialogEl.querySelector('input[name="cycle-mode"]:checked')?.value || 'empty';
        const nextNum = store.startNewCycle(project.id, { copyStructure: mode === 'copy' });
        showSnackbar(`Ciclo ${nextNum} iniciado!`);
        navigate(`/projeto/${project.id}/ciclo/${nextNum}/etapa/discover`);
      }
    });
  });
};
