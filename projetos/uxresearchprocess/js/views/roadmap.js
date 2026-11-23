(function() {
  let roadmapMode = 'gantt';
  let ganttZoom = 'week';

  window.UXR.renderRoadmapView = function(container, route) {
    const { store, STAGES_CATALOG, STAGE_ORDER, addDaysIso, createRoadmapItem, esc, icon, openDialog, showSnackbar, statusLabelPt } = window.UXR;
    const project = store.getProject(route.params.projectId);
    if (!project) return;
    const people = store.getState().people;
    const items = store.getUnifiedRoadmapItems(project);
    const alerts = store.getRoadmapAlerts(project);

    container.innerHTML = `
      <div class="page-header">
        <div><h1 class="headline-medium">Roadmap de Pesquisa</h1><p class="body-medium text-variant">Fonte única de dados sincronizada com etapas, métodos e timeline.</p></div>
        <div class="stack-h">
          <div class="segmented-group">
            <button type="button" class="segmented-btn" data-rm-mode="gantt" aria-pressed="${roadmapMode === 'gantt'}">${icon('view_timeline')}<span>Gantt</span></button>
            <button type="button" class="segmented-btn" data-rm-mode="kanban" aria-pressed="${roadmapMode === 'kanban'}">${icon('view_kanban')}<span>Kanban</span></button>
            <button type="button" class="segmented-btn" data-rm-mode="list" aria-pressed="${roadmapMode === 'list'}">${icon('table_rows')}<span>Lista</span></button>
          </div>
          <button type="button" class="btn btn-filled" id="btn-add-milestone">${icon('flag')}<span>Novo Marco</span></button>
        </div>
      </div>
      ${alerts.length ? `<div class="alert-strip" style="margin-bottom:16px;">${icon('warning')}<strong>Alertas (${alerts.length}):</strong>${alerts.slice(0, 3).map(a => `<span class="alert-pill">${esc(a.label)}</span>`).join('')}</div>` : ''}
      <div id="roadmap-viewport">${roadmapMode === 'gantt' ? renderGantt() : roadmapMode === 'kanban' ? renderKanban() : renderList()}</div>
    `;

    function renderGantt() {
      if (!items.length) return `<div class="empty-state"><h2 class="title-large">Nenhum item no roadmap</h2></div>`;
      const todayIso = new Date().toISOString().slice(0, 10);
      const dates = items.flatMap(i => [i.startDate, i.endDate]).filter(Boolean).concat([todayIso]).sort();
      const minDate = addDaysIso(dates[0], -3);
      const totalDays = ganttZoom === 'week' ? 21 : 45;
      const minTime = new Date(`${minDate}T12:00:00`).getTime();
      const dayMs = 86400000;
      const ticks = Array.from({ length: totalDays + 1 }, (_, d) => addDaysIso(minDate, d).slice(5));
      return `
        <div class="gantt-shell"><div class="gantt-scroll-area"><div class="gantt-grid">
          <div class="gantt-header-row"><div class="gantt-task-col-header">Item / Etapa</div><div class="gantt-dates-header">${ticks.map(t => `<div class="gantt-tick">${t}</div>`).join('')}</div></div>
          ${items.map(item => {
            const startOff = Math.max(0, Math.round((new Date(`${item.startDate}T12:00:00`).getTime() - minTime) / dayMs));
            const dur = Math.max(1, Math.round((new Date(`${item.endDate}T12:00:00`).getTime() - new Date(`${item.startDate}T12:00:00`).getTime()) / dayMs) + 1);
            const leftPct = (startOff / totalDays) * 100;
            const widthPct = Math.min(100 - leftPct, (dur / totalDays) * 100);
            return `
              <div class="gantt-row">
                <div class="gantt-task-cell">
                  <div style="min-width:0;"><div class="body-medium" style="font-weight:500;overflow:hidden;text-overflow:ellipsis;">${esc(item.title.split(' (')[0])}</div><div class="body-small text-variant">${item.startDate.slice(5)} a ${item.endDate.slice(5)}</div></div>
                  <div class="stack-h" style="gap:2px;"><button type="button" class="icon-btn" data-nudge="${esc(item.id)}:-1">${icon('chevron_left')}</button><button type="button" class="icon-btn" data-nudge="${esc(item.id)}:1">${icon('chevron_right')}</button></div>
                </div>
                <div class="gantt-lane"><div class="gantt-bar" data-stage="${item.isMilestone ? 'milestone' : item.stageKey}" style="left:${leftPct}%;width:max(36px,${widthPct}%);"><span>${esc(item.title.split(' (')[0])} (${item.progress}%)</span></div></div>
              </div>
            `;
          }).join('')}
        </div></div></div>
      `;
    }

    function renderKanban() {
      const cols = [{ key: 'todo', title: 'A fazer' }, { key: 'doing', title: 'Em andamento' }, { key: 'review', title: 'Em revisão' }, { key: 'done', title: 'Concluído' }];
      return `<div class="kanban-board">${cols.map(c => `<section class="kanban-column"><div class="kanban-col-header"><h2 class="title-medium">${c.title}</h2></div>${items.filter(i => i.status === c.key).map(i => `<article class="kanban-card"><strong>${esc(i.title.split(' (')[0])}</strong><select class="field-select" data-kmove="${esc(i.id)}">${cols.map(o => `<option value="${o.key}" ${o.key === i.status ? 'selected' : ''}>${o.title}</option>`).join('')}</select></article>`).join('')}</section>`).join('')}</div>`;
    }

    function renderList() {
      return `<div class="m3-table-wrapper"><table class="m3-table"><thead><tr><th>Item</th><th>Início</th><th>Término</th><th>Status</th></tr></thead><tbody>${items.map(i => `<tr><td><strong>${esc(i.title.split(' (')[0])}</strong></td><td><input type="date" class="field-input" data-lstart="${esc(i.id)}" value="${esc(i.startDate)}" /></td><td><input type="date" class="field-input" data-lend="${esc(i.id)}" value="${esc(i.endDate)}" /></td><td>${statusLabelPt(i.status)}</td></tr>`).join('')}</tbody></table></div>`;
    }

    container.querySelectorAll('[data-rm-mode]').forEach(b => b.addEventListener('click', () => { roadmapMode = b.dataset.rmMode; window.UXR.renderRoadmapView(container, route); }));
    container.querySelectorAll('[data-nudge]').forEach(b => b.addEventListener('click', () => { const [id, d] = b.dataset.nudge.split(':'); const it = items.find(x => x.id === id); if (it) store.updateRoadmapItem(project.id, id, { startDate: addDaysIso(it.startDate, Number(d)), endDate: addDaysIso(it.endDate, Number(d)) }); }));
    container.querySelectorAll('[data-kmove]').forEach(s => s.addEventListener('change', () => store.updateRoadmapItem(project.id, s.dataset.kmove, { status: s.value })));
    container.querySelectorAll('[data-lstart]').forEach(i => i.addEventListener('change', () => store.updateRoadmapItem(project.id, i.dataset.lstart, { startDate: i.value })));
    container.querySelectorAll('[data-lend]').forEach(i => i.addEventListener('change', () => store.updateRoadmapItem(project.id, i.dataset.lend, { endDate: i.value })));
    document.getElementById('btn-add-milestone')?.addEventListener('click', () => {
      const today = new Date().toISOString().slice(0, 10);
      openDialog({
        title: 'Novo Marco',
        bodyHtml: `<div class="stack-v"><input id="rm-title" class="field-input" placeholder="Título do marco *" /><input id="rm-start" type="date" class="field-input" value="${today}" /></div>`,
        onConfirm: (dlg) => {
          const t = dlg.querySelector('#rm-title').value.trim();
          if (!t) return false;
          store.mutate(draft => { const p = draft.projects.find(x => x.id === project.id); p.customRoadmapItems.push(createRoadmapItem({ title: t, isMilestone: true, startDate: dlg.querySelector('#rm-start').value })); });
          showSnackbar('Marco adicionado.');
        }
      });
    });
  };
})();
