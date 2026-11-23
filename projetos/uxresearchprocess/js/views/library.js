(function() {
  let libStage = 'all';
  let libSearch = '';

  window.UXR.renderLibraryView = function(container) {
    const { STAGE_ORDER, STAGES_CATALOG, esc } = window.UXR;
    const allMethods = STAGE_ORDER.flatMap(k => STAGES_CATALOG[k].methods.map(m => ({ ...m, stageKey: k, stageName: STAGES_CATALOG[k].name })));
    const filtered = allMethods.filter(m => (libStage === 'all' || m.stageKey === libStage) && (!libSearch || m.namePt.toLowerCase().includes(libSearch.toLowerCase()) || m.nameEn.toLowerCase().includes(libSearch.toLowerCase())));

    container.innerHTML = `
      <div class="page-header"><div><h1 class="headline-medium">Biblioteca & Guia de Métodos NN/g</h1><p class="body-medium text-variant">Catálogo completo das 4 etapas e dados de adoção do survey NN/g.</p></div></div>
      <div class="stack-h" style="justify-content:space-between;margin-bottom:16px;">
        <input id="lib-search" type="search" class="field-input" style="max-width:400px;" placeholder="Buscar método..." value="${esc(libSearch)}" />
        <div class="chip-group">
          <button type="button" class="chip" data-ls="all" aria-pressed="${libStage === 'all'}">Todos (${allMethods.length})</button>
          ${STAGE_ORDER.map(k => `<button type="button" class="chip" data-ls="${k}" aria-pressed="${libStage === k}">${esc(STAGES_CATALOG[k].name)}</button>`).join('')}
        </div>
      </div>
      <div class="grid-cards">${filtered.map(m => `
        <article class="card card-outlined stack-v">
          <div class="stack-h" style="justify-content:space-between;"><span class="badge stage-banner" data-stage="${esc(m.stageKey)}">${esc(m.stageName)}</span>${m.popular ? `<span class="badge badge-popular">Mais usado</span>` : ''}</div>
          <div><h2 class="title-large">${esc(m.namePt)}</h2><p class="body-small text-variant">${esc(m.nameEn)}</p></div>
          <p class="body-medium">${esc(m.shortDesc)}</p>
          ${m.usagePercent ? `<div><div class="stack-h" style="justify-content:space-between;"><span class="label-small">Survey NN/g</span><span class="label-medium">${m.usagePercent}%</span></div><div class="survey-bar-track"><div class="survey-bar-fill" style="width:${m.usagePercent}%;"></div></div></div>` : ''}
        </article>
      `).join('')}</div>
    `;

    document.getElementById('lib-search')?.addEventListener('input', (e) => { libSearch = e.target.value; window.UXR.renderLibraryView(container); document.getElementById('lib-search')?.focus(); });
    container.querySelectorAll('[data-ls]').forEach(b => b.addEventListener('click', () => { libStage = b.dataset.ls; window.UXR.renderLibraryView(container); }));
  };
})();
