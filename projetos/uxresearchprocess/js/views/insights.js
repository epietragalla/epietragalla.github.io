window.UXR = window.UXR || {};

window.UXR.renderInsightsView = function(container, route) {
  const { store, STAGES_CATALOG, uid, esc, icon, openDialog, showSnackbar } = window.UXR;
  const project = store.getProject(route.params.projectId);
  if (!project) return;

  const allFindings = [];
  project.cycles.forEach(c => c.stages.forEach(s => s.methods.forEach(m => (m.findings || []).forEach(f => allFindings.push({ ...f, cycleName: c.name, stageKey: s.key, methodTitle: m.title.split(' (')[0] })))));
  const themes = project.themes || [];
  const recommendations = project.recommendations || [];

  container.innerHTML = `
    <div class="page-header">
      <div><h1 class="headline-medium">Repositório de Insights & Rastreabilidade</h1><p class="body-medium text-variant">Da evidência bruta à recomendação priorizada.</p></div>
      <div class="stack-h">
        <button type="button" class="btn btn-tonal" id="btn-new-theme">${icon('workspaces')}<span>Novo Tema</span></button>
        <button type="button" class="btn btn-filled" id="btn-new-rec">${icon('recommend')}<span>Nova Recomendação</span></button>
      </div>
    </div>
    <section class="card card-elevated stack-v" style="margin-bottom:24px;">
      <h2 class="title-large">Rastreabilidade: Da Pesquisa à Decisão</h2>
      <div class="trace-chain">
        <div class="trace-node"><div class="trace-node-header">1. Achados</div><p class="headline-small">${allFindings.length}</p></div>
        <div class="trace-node"><div class="trace-node-header">2. Temas</div><p class="headline-small">${themes.length}</p></div>
        <div class="trace-node"><div class="trace-node-header">3. Recomendações</div><p class="headline-small">${recommendations.length}</p></div>
      </div>
    </section>
    <section class="stack-v" style="margin-bottom:24px;">
      <h2 class="title-large">Achados Consolidados (${allFindings.length})</h2>
      ${allFindings.map(f => `<article class="card card-outlined stack-v"><div class="stack-h"><span class="badge stage-banner" data-stage="${esc(f.stageKey)}">${esc(STAGES_CATALOG[f.stageKey]?.name || f.stageKey)}</span><span class="badge badge-popular">Severidade: ${esc(f.severity)}</span></div><h3 class="title-medium">${esc(f.title)}</h3><p class="body-medium text-variant">${esc(f.description || '')}</p></article>`).join('')}
    </section>
    <section class="card card-elevated stack-v">
      <h2 class="title-large">Recomendações (${recommendations.length})</h2>
      <div class="m3-table-wrapper"><table class="m3-table"><thead><tr><th>Recomendação</th><th>Prioridade</th><th>Responsável</th></tr></thead><tbody>${recommendations.map(r => `<tr><td><strong>${esc(r.title)}</strong></td><td>${esc(r.priority)}</td><td>${esc(r.owner || '—')}</td></tr>`).join('')}</tbody></table></div>
    </section>
  `;

  document.getElementById('btn-new-theme')?.addEventListener('click', () => openDialog({ title: 'Novo Tema', bodyHtml: `<input id="thm-t" class="field-input" placeholder="Título do tema *" />`, onConfirm: (d) => { const t = d.querySelector('#thm-t').value.trim(); if (!t) return false; store.mutate(draft => { draft.projects.find(x => x.id === project.id).themes.push({ id: uid('thm'), title: t }); }); } }));
  document.getElementById('btn-new-rec')?.addEventListener('click', () => openDialog({ title: 'Nova Recomendação', bodyHtml: `<div class="stack-v"><input id="rec-t" class="field-input" placeholder="Recomendação *" /><input id="rec-o" class="field-input" placeholder="Responsável" /></div>`, onConfirm: (d) => { const t = d.querySelector('#rec-t').value.trim(); if (!t) return false; store.mutate(draft => { draft.projects.find(x => x.id === project.id).recommendations.push({ id: uid('rec'), title: t, priority: 'Alta', owner: d.querySelector('#rec-o').value.trim() }); }); showSnackbar('Recomendação salva.'); } }));
};
