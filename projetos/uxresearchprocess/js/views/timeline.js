(function() {
  let selectedSpiralCycle = null;

  window.UXR.renderTimelineView = function(container, route) {
    const { store, STAGE_ORDER, STAGES_CATALOG, esc, icon, statusLabelPt, navigate } = window.UXR;
    const project = store.getProject(route.params.projectId);
    if (!project) return;
    const people = store.getState().people;
    const activeCycle = store.getCycle(project, selectedSpiralCycle || project.activeCycleNumber || 1);

    const cycles = project.cycles.slice(-4);
    const polar = (cx, cy, r, deg) => {
      const rad = ((deg - 90) * Math.PI) / 180;
      return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    };
    const arcPath = (cx, cy, r, s, e) => {
      const start = polar(cx, cy, r, e);
      const end = polar(cx, cy, r, s);
      return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${r} ${r} 0 0 0 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
    };
    const quads = [{ key: 'discover', s: 4, e: 86, a: 45 }, { key: 'explore', s: 94, e: 176, a: 135 }, { key: 'test', s: 184, e: 266, a: 225 }, { key: 'listen', s: 274, e: 356, a: 315 }];

    const ringsSvg = cycles.map((c, idx) => {
      const r = 64 + idx * 34;
      const isFocus = c.number === activeCycle.number;
      return quads.map(q => {
        const m = store.calcStageMetrics(c.stages.find(st => st.key === q.key));
        const lp = polar(200, 200, r, q.a);
        return `<g class="spiral-arc" data-spiral-nav="${c.number}:${q.key}" style="opacity:${isFocus ? 1 : 0.45};"><path d="${arcPath(200, 200, r, q.s, q.e)}" fill="none" stroke="var(--stage-${q.key})" stroke-width="${isFocus ? 22 : 14}" stroke-linecap="round" />${isFocus ? `<text x="${lp.x.toFixed(1)}" y="${lp.y.toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="var(--stage-${q.key}-on)" font-size="10" font-weight="700">${m.percent}%</text>` : ''}</g>`;
      }).join('');
    }).join('');

    container.innerHTML = `
      <div class="page-header">
        <div><h1 class="headline-medium">Timeline & Espiral de Ciclos</h1><p class="body-medium text-variant">O fim de um ciclo é o começo do próximo.</p></div>
        <a href="#/projeto/${esc(project.id)}/roadmap" class="btn btn-tonal">${icon('view_timeline')}<span>Abrir Roadmap</span></a>
      </div>
      <div class="spiral-layout" style="margin-bottom:var(--md-sys-space-6);">
        <section class="spiral-card">
          <svg viewBox="0 0 400 400" class="spiral-svg">${ringsSvg}<circle cx="200" cy="200" r="36" fill="var(--md-sys-color-primary-container)" /><text x="200" y="200" text-anchor="middle" dominant-baseline="central" fill="var(--md-sys-color-on-primary-container)" font-size="11" font-weight="700">Ciclo ${activeCycle.number}</text></svg>
          <div class="chip-group" style="margin-top:12px;">${project.cycles.map(c => `<button type="button" class="chip" data-spiral-cycle="${c.number}" aria-pressed="${c.number === activeCycle.number}">${esc(c.name)} (${store.calcCycleProgress(c)}%)</button>`).join('')}</div>
        </section>
        <section class="card card-elevated stack-v">
          <h2 class="headline-small">${esc(activeCycle.name)} — ${store.calcCycleProgress(activeCycle)}% concluído</h2>
          ${STAGE_ORDER.map(key => {
            const m = store.calcStageMetrics(activeCycle.stages.find(s => s.key === key));
            return `<div class="card card-outlined" style="padding:12px;"><div class="stack-h" style="justify-content:space-between;margin-bottom:4px;"><strong>${esc(STAGES_CATALOG[key].name)}</strong><span>${m.percent}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${m.percent}%;"></div></div></div>`;
          }).join('')}
        </section>
      </div>
      <section class="stack-v">
        ${STAGE_ORDER.map(key => {
          const st = activeCycle.stages.find(s => s.key === key);
          return `<article class="card card-elevated stack-v"><div class="stack-h" style="justify-content:space-between;"><span class="badge stage-banner" data-stage="${key}">${esc(STAGES_CATALOG[key].name)}</span><a href="#/projeto/${esc(project.id)}/ciclo/${activeCycle.number}/etapa/${key}" class="btn btn-tonal btn-sm">Gerenciar etapa</a></div>${st.methods.length ? `<div class="m3-table-wrapper"><table class="m3-table"><thead><tr><th>Método</th><th>Responsável</th><th>Período</th><th>Status</th></tr></thead><tbody>${st.methods.map(m => `<tr><td>${esc(m.title)}</td><td>${esc(people.find(p => p.id === m.responsibleIds?.[0])?.name || '—')}</td><td>${esc(m.startDate)} → ${esc(m.endDate)}</td><td>${statusLabelPt(m.status)}</td></tr>`).join('')}</tbody></table></div>` : `<p class="body-small text-variant">Nenhum método adicionado.</p>`}</article>`;
        }).join('')}
      </section>
    `;

    container.querySelectorAll('[data-spiral-cycle]').forEach(b => b.addEventListener('click', () => { selectedSpiralCycle = Number(b.dataset.spiralCycle); window.UXR.renderTimelineView(container, route); }));
    container.querySelectorAll('[data-spiral-nav]').forEach(el => el.addEventListener('click', () => { const [c, k] = el.dataset.spiralNav.split(':'); navigate(`/projeto/${project.id}/ciclo/${c}/etapa/${k}`); }));
  };
})();
