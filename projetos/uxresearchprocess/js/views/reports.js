window.UXR = window.UXR || {};

window.UXR.renderReportsView = function(container, route) {
  const { store, STAGE_ORDER, STAGES_CATALOG, esc, icon } = window.UXR;
  const project = store.getProject(route.params.projectId);
  if (!project) return;
  const activeCycle = store.getCycle(project, project.activeCycleNumber);
  const allFindings = project.cycles.flatMap(c => c.stages.flatMap(s => s.methods.flatMap(m => (m.findings || []).map(f => ({ ...f, cycleName: c.name, methodTitle: m.title.split(' (')[0] })))));

  container.innerHTML = `
    <div class="page-header no-print">
      <div><h1 class="headline-medium">Relatório Executivo (Readout)</h1></div>
      <button type="button" class="btn btn-filled" id="btn-print-report">${icon('print')}<span>Imprimir / Salvar PDF</span></button>
    </div>
    <article class="stack-v">
      <section class="card card-elevated stack-v"><span class="label-medium text-variant">UX RESEARCH READOUT • ${esc(activeCycle.name)}</span><h2 class="headline-medium">${esc(project.name)}</h2><p class="body-large">${esc(project.description || '')}</p></section>
      <section class="card card-outlined stack-v"><h3 class="title-large">Principais Achados (${allFindings.length})</h3>${allFindings.map(f => `<div class="card card-filled"><strong>${esc(f.title)}</strong><p class="body-medium">${esc(f.description || '')}</p></div>`).join('')}</section>
    </article>
  `;
  document.getElementById('btn-print-report')?.addEventListener('click', () => window.print());
};
