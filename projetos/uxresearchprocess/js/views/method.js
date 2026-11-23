(function() {
  let currentMethodTab = 'plan';

  window.UXR.renderMethodView = function(container, route) {
    const { store, findCatalogMethod, STAGES_CATALOG, uid, esc, icon, showSnackbar, renderSpecializedMethodWorkspace, bindSpecializedTemplateEvents } = window.UXR;
    const { projectId, cycleNumber, stageKey, methodId } = route.params;
    const project = store.getProject(projectId);
    if (!project) return;
    const cycle = store.getCycle(project, cycleNumber);
    const stage = cycle.stages.find(s => s.key === stageKey);
    const method = stage?.methods.find(m => m.id === methodId);
    if (!method) { container.innerHTML = `<p>Método não encontrado.</p>`; return; }

    const catalogInfo = method.catalogId ? findCatalogMethod(method.catalogId) : null;
    const people = store.getState().people;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <div class="stack-h" style="margin-bottom:4px;">
            <a href="#/projeto/${esc(projectId)}/ciclo/${cycleNumber}/etapa/${esc(stageKey)}" class="btn btn-text btn-sm">${icon('arrow_back')}<span>${esc(STAGES_CATALOG[stageKey]?.name || stageKey)}</span></a>
            <span class="badge badge-neutral">${esc(cycle.name)}</span>
          </div>
          <h1 class="headline-medium">${esc(method.title)}</h1>
        </div>
        <div class="stack-h">
          <div class="field"><label for="m-status" class="field-label">Status</label><select id="m-status" class="field-select"><option value="todo" ${method.status === 'todo' ? 'selected' : ''}>A fazer</option><option value="doing" ${method.status === 'doing' ? 'selected' : ''}>Em andamento</option><option value="review" ${method.status === 'review' ? 'selected' : ''}>Em revisão</option><option value="done" ${method.status === 'done' ? 'selected' : ''}>Concluído</option></select></div>
          <div class="field"><label for="m-progress" class="field-label">Progresso (%)</label><input id="m-progress" type="number" min="0" max="100" step="5" class="field-input" style="width:110px;" value="${store.calcMethodProgress(method)}" /></div>
          <div class="field"><label for="m-owner" class="field-label">Responsável</label><select id="m-owner" class="field-select"><option value="">Sem responsável</option>${people.map(p => `<option value="${esc(p.id)}" ${method.responsibleIds[0] === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}</select></div>
        </div>
      </div>

      ${catalogInfo ? `<details class="card card-filled" style="margin-bottom:var(--md-sys-space-6);"><summary class="title-small" style="cursor:pointer;">Guia NN/g para este método</summary><div class="grid-cards" style="margin-top:12px;"><div><strong>O que é:</strong> <p class="body-medium text-variant">${esc(catalogInfo.guide.what)}</p></div><div><strong>Quando usar:</strong> <p class="body-medium text-variant">${esc(catalogInfo.guide.when)}</p></div><div><strong>Como fazer:</strong> <p class="body-medium text-variant">${esc(catalogInfo.guide.how)}</p></div><div><strong>Erros comuns:</strong> <p class="body-medium text-variant">${esc(catalogInfo.guide.pitfalls)}</p></div></div></details>` : ''}

      <div class="tabs-bar" role="tablist" style="margin-bottom:var(--md-sys-space-6);">
        <button type="button" role="tab" class="tab-btn" data-mtab="plan" aria-selected="${currentMethodTab === 'plan'}">Planejar</button>
        <button type="button" role="tab" class="tab-btn" data-mtab="execute" aria-selected="${currentMethodTab === 'execute'}">Executar</button>
        <button type="button" role="tab" class="tab-btn" data-mtab="findings" aria-selected="${currentMethodTab === 'findings'}">Achados (${method.findings.length})</button>
        <button type="button" role="tab" class="tab-btn" data-mtab="evidences" aria-selected="${currentMethodTab === 'evidences'}">Evidências (${method.evidences.length})</button>
        <button type="button" role="tab" class="tab-btn" data-mtab="conclusion" aria-selected="${currentMethodTab === 'conclusion'}">Conclusão</button>
      </div>
      <div id="method-tab-content">${renderTab()}</div>
    `;

    function renderTab() {
      if (currentMethodTab === 'plan') {
        const plan = method.blocks.plan;
        return `<div class="stack-v"><section class="card card-elevated stack-v"><h2 class="title-large">Planejamento</h2><div class="field"><label class="field-label">Objetivo</label><textarea id="mp-obj" class="field-textarea">${esc(plan.objective)}</textarea></div><div class="field"><label class="field-label">Perguntas de pesquisa</label><textarea id="mp-rq" class="field-textarea">${esc(plan.researchQuestions)}</textarea></div><div class="field"><label class="field-label">Participantes / Fontes</label><input id="mp-part" class="field-input" value="${esc(plan.participantsSource)}" /></div><div class="field"><label class="field-label">Roteiro / Instrumento</label><textarea id="mp-script" class="field-textarea">${esc(plan.script)}</textarea></div><div><button type="button" class="btn btn-filled" id="btn-save-plan-block">Salvar planejamento</button></div></section></div>`;
      }
      if (currentMethodTab === 'execute') {
        const exec = method.blocks.execute;
        const specHtml = catalogInfo?.templateKey ? renderSpecializedMethodWorkspace(method, catalogInfo.templateKey) : '';
        return `<div class="stack-v">${specHtml}<section class="card card-outlined stack-v"><h2 class="title-medium">Notas de Campo</h2><textarea id="me-notes" class="field-textarea">${esc(exec.notes)}</textarea><div><button type="button" class="btn btn-filled" id="btn-save-exec-notes">Salvar notas</button></div></section></div>`;
      }
      if (currentMethodTab === 'findings') {
        return `<div class="stack-v"><section class="card card-elevated stack-v"><h2 class="title-large">Novo Achado</h2><div class="field"><label class="field-label">Título *</label><input id="fnd-title" class="field-input" /></div><div class="field"><label class="field-label">Descrição</label><textarea id="fnd-desc" class="field-textarea"></textarea></div><div class="stack-h"><select id="fnd-sev" class="field-select"><option value="high">Alta</option><option value="medium" selected>Média</option><option value="low">Baixa</option></select><select id="fnd-conf" class="field-select"><option value="high">Confiança Alta</option><option value="medium" selected>Confiança Média</option><option value="low">Confiança Baixa</option></select><input id="fnd-tags" class="field-input" placeholder="tags..." /></div><div><button type="button" class="btn btn-filled" id="btn-add-finding">Adicionar achado</button></div></section>${method.findings.map(f => `<article class="card card-outlined stack-v"><div class="stack-h" style="justify-content:space-between;"><span class="badge badge-popular">Severidade: ${esc(f.severity)}</span><button type="button" class="icon-btn" data-del-finding="${esc(f.id)}">${icon('delete')}</button></div><h3 class="title-medium">${esc(f.title)}</h3><p class="body-medium text-variant">${esc(f.description)}</p></article>`).join('')}</div>`;
      }
      if (currentMethodTab === 'evidences') {
        return `<div class="stack-v"><section class="card card-elevated stack-v"><h2 class="title-large">Nova Evidência</h2><input id="ev-title" class="field-input" placeholder="Título *" /><input id="ev-url" class="field-input" placeholder="URL..." /><textarea id="ev-quote" class="field-textarea" placeholder="Citação..."></textarea><div><button type="button" class="btn btn-filled" id="btn-add-evidence">Adicionar</button></div></section>${method.evidences.map(ev => `<article class="card card-outlined stack-v"><strong>${esc(ev.title)}</strong>${ev.quote ? `<blockquote>${esc(ev.quote)}</blockquote>` : ''}</article>`).join('')}</div>`;
      }
      const conc = method.blocks.conclusion;
      return `<section class="card card-elevated stack-v"><h2 class="title-large">Conclusão</h2><textarea id="mc-sum" class="field-textarea" placeholder="Resumo...">${esc(conc.summary)}</textarea><textarea id="mc-rec" class="field-textarea" placeholder="Recomendações...">${esc(conc.recommendations)}</textarea><textarea id="mc-next" class="field-textarea" placeholder="Próximos passos...">${esc(conc.nextSteps)}</textarea><div><button type="button" class="btn btn-filled" id="btn-save-conclusion">Salvar conclusão</button></div></section>`;
    }

    const updateMethod = (fn) => store.mutate(draft => { const m = draft.projects.find(p => p.id === projectId)?.cycles.find(c => c.number === cycle.number)?.stages.find(s => s.key === stageKey)?.methods.find(item => item.id === methodId); if (m) fn(m); });
    document.getElementById('m-status')?.addEventListener('change', (e) => updateMethod(m => { m.status = e.target.value; if (m.status === 'done') m.progress = 100; }));
    document.getElementById('m-progress')?.addEventListener('change', (e) => updateMethod(m => { m.progress = Math.max(0, Math.min(100, Number(e.target.value) || 0)); }));
    document.getElementById('m-owner')?.addEventListener('change', (e) => updateMethod(m => { m.responsibleIds = e.target.value ? [e.target.value] : []; }));
    container.querySelectorAll('[data-mtab]').forEach(b => b.addEventListener('click', () => { currentMethodTab = b.dataset.mtab; window.UXR.renderMethodView(container, route); }));
    document.getElementById('btn-save-plan-block')?.addEventListener('click', () => { updateMethod(m => { m.blocks.plan.objective = document.getElementById('mp-obj').value; m.blocks.plan.researchQuestions = document.getElementById('mp-rq').value; m.blocks.plan.participantsSource = document.getElementById('mp-part').value; m.blocks.plan.script = document.getElementById('mp-script').value; }); showSnackbar('Salvo.'); });
    document.getElementById('btn-save-exec-notes')?.addEventListener('click', () => { updateMethod(m => { m.blocks.execute.notes = document.getElementById('me-notes').value; }); showSnackbar('Salvo.'); });
    document.getElementById('btn-add-finding')?.addEventListener('click', () => { const t = document.getElementById('fnd-title').value.trim(); if (!t) return; updateMethod(m => m.findings.unshift({ id: uid('fnd'), title: t, description: document.getElementById('fnd-desc').value.trim(), severity: document.getElementById('fnd-sev').value, confidence: document.getElementById('fnd-conf').value, tags: document.getElementById('fnd-tags').value.split(',').map(x => x.trim()).filter(Boolean) })); });
    container.querySelectorAll('[data-del-finding]').forEach(b => b.addEventListener('click', () => updateMethod(m => { m.findings = m.findings.filter(f => f.id !== b.dataset.delFinding); })));
    document.getElementById('btn-add-evidence')?.addEventListener('click', () => { const t = document.getElementById('ev-title').value.trim(); if (!t) return; updateMethod(m => m.evidences.unshift({ id: uid('evd'), title: t, url: document.getElementById('ev-url').value.trim(), quote: document.getElementById('ev-quote').value.trim() })); });
    document.getElementById('btn-save-conclusion')?.addEventListener('click', () => { updateMethod(m => { m.blocks.conclusion.summary = document.getElementById('mc-sum').value; m.blocks.conclusion.recommendations = document.getElementById('mc-rec').value; m.blocks.conclusion.nextSteps = document.getElementById('mc-next').value; }); showSnackbar('Salvo.'); });
    bindSpecializedTemplateEvents(container, updateMethod);
  };
})();
