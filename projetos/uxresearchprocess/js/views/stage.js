(function() {
  let activeTab = 'methods';

  window.UXR.renderStageView = function(container, route) {
    const { store, getStageCatalog, createMethodInstance, createActivityInstance, esc, icon, openSheet, showSnackbar, statusLabelPt, enableSortableList } = window.UXR;
    const { projectId, cycleNumber, stageKey } = route.params;
    const project = store.getProject(projectId);
    if (!project) return;
    const cycle = store.getCycle(project, cycleNumber);
    const stage = cycle.stages.find(s => s.key === stageKey);
    if (!stage) return;

    const catalog = getStageCatalog(stageKey);
    const metrics = store.calcStageMetrics(stage);
    const people = store.getState().people;

    container.innerHTML = `
      <section class="card stage-banner stack-v" data-stage="${stageKey}" style="margin-bottom: var(--md-sys-space-6);">
        <div class="stack-h" style="justify-content:space-between;align-items:flex-start;">
          <div><span class="label-medium">${esc(cycle.name)} • Etapa NN/g</span><h1 class="headline-medium">${esc(catalog.name)} (${esc(catalog.ptName)})</h1></div>
          <div class="stack-h">
            <select id="stage-owner" class="field-select" style="min-height:48px;padding-block:8px;width:auto;" aria-label="Responsável pela etapa">
              <option value="">Responsável da etapa...</option>
              ${people.map(p => `<option value="${esc(p.id)}" ${stage.responsibleIds[0] === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
            </select>
            <button type="button" class="btn btn-filled" id="btn-open-catalog">${icon('add')}<span>Adicionar ${activeTab === 'methods' ? 'método' : 'atividade'}</span></button>
          </div>
        </div>
        <p class="body-large">${esc(catalog.objective)}</p>
        <div>
          <div class="stack-h" style="justify-content:space-between;margin-bottom:4px;"><span class="label-medium">Conclusão da etapa</span><span class="label-large">${metrics.percent}%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:${metrics.percent}%;"></div></div>
        </div>
      </section>

      <div class="tabs-bar" role="tablist" style="margin-bottom: var(--md-sys-space-4);">
        <button type="button" role="tab" class="tab-btn" data-tab="methods" aria-selected="${activeTab === 'methods'}">${icon('science')}<span>Métodos (${stage.methods.length})</span></button>
        <button type="button" role="tab" class="tab-btn" data-tab="activities" aria-selected="${activeTab === 'activities'}">${icon('checklist')}<span>Atividades contínuas (${stage.activities.length})</span></button>
      </div>

      <div id="stage-tab-panel">
        ${activeTab === 'methods' ? renderMethods() : renderActivities()}
      </div>
    `;

    function renderMethods() {
      if (stage.methods.length === 0) return `<div class="empty-state"><h2 class="title-large">Nenhum método adicionado</h2><button type="button" class="btn btn-filled" id="btn-empty-add">Escolher métodos do catálogo</button></div>`;
      return `<div class="stack-v" id="stage-sortable-list">${stage.methods.map((m, idx) => {
        const prog = store.calcMethodProgress(m);
        return `
          <article class="card card-elevated work-item-card" data-drag-index="${idx}">
            <div class="work-item-header">
              <div class="stack-h" style="align-items:flex-start;">
                <button type="button" class="icon-btn" data-drag-handle>${icon('drag_indicator')}</button>
                <div>
                  <div class="stack-h" style="gap:8px;margin-bottom:4px;"><span class="badge badge-neutral">${statusLabelPt(m.status)}</span>${m.variant ? `<span class="badge badge-popular">Variante: ${esc(m.variant)}</span>` : ''}<span class="badge badge-neutral">${m.findings?.length || 0} achados</span></div>
                  <h2 class="title-large"><a href="#/projeto/${esc(project.id)}/ciclo/${cycle.number}/etapa/${stage.key}/metodo/${esc(m.id)}" style="color:inherit;text-decoration:none;">${esc(m.title)}</a></h2>
                </div>
              </div>
              <div class="stack-h" style="gap:4px;">
                <button type="button" class="icon-btn" data-move-item-up="${idx}" ${idx === 0 ? 'disabled' : ''}>${icon('keyboard_arrow_up')}</button>
                <button type="button" class="icon-btn" data-move-item-down="${idx}" ${idx === stage.methods.length - 1 ? 'disabled' : ''}>${icon('keyboard_arrow_down')}</button>
                <button type="button" class="icon-btn" data-remove-method="${esc(m.id)}">${icon('delete')}</button>
              </div>
            </div>
            <div><div class="progress-track"><div class="progress-fill" style="width:${prog}%;"></div></div></div>
            <div class="work-item-footer">
              <div class="stack-h">
                <select class="field-select" style="min-height:48px;padding-block:6px;width:auto;" data-method-status="${esc(m.id)}">
                  <option value="todo" ${m.status === 'todo' ? 'selected' : ''}>A fazer</option>
                  <option value="doing" ${m.status === 'doing' ? 'selected' : ''}>Em andamento</option>
                  <option value="review" ${m.status === 'review' ? 'selected' : ''}>Em revisão</option>
                  <option value="done" ${m.status === 'done' ? 'selected' : ''}>Concluído</option>
                </select>
                <select class="field-select" style="min-height:48px;padding-block:6px;width:auto;" data-method-owner="${esc(m.id)}">
                  <option value="">Sem responsável</option>
                  ${people.map(p => `<option value="${esc(p.id)}" ${m.responsibleIds[0] === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
                </select>
              </div>
              <a href="#/projeto/${esc(project.id)}/ciclo/${cycle.number}/etapa/${stage.key}/metodo/${esc(m.id)}" class="btn btn-tonal btn-sm"><span>Abrir workspace</span>${icon('open_in_new')}</a>
            </div>
          </article>
        `;
      }).join('')}</div>`;
    }

    function renderActivities() {
      if (stage.activities.length === 0) return `<div class="empty-state"><h2 class="title-large">Nenhuma atividade adicionada</h2><button type="button" class="btn btn-filled" id="btn-empty-add">Adicionar atividades</button></div>`;
      return `<div class="stack-v" id="stage-sortable-list">${stage.activities.map((act, idx) => {
        const prog = store.calcActivityProgress(act);
        return `
          <article class="card card-outlined work-item-card" data-drag-index="${idx}">
            <div class="work-item-header">
              <div class="stack-h"><button type="button" class="icon-btn" data-drag-handle>${icon('drag_indicator')}</button><div><h2 class="title-medium">${esc(act.title)}</h2><p class="body-small text-variant">${esc(act.notes)}</p></div></div>
              <div class="stack-h"><span class="badge badge-neutral">${prog}%</span><button type="button" class="icon-btn" data-remove-activity="${esc(act.id)}">${icon('delete')}</button></div>
            </div>
            <div class="stack-v" style="gap:4px;">
              ${act.checklist.map(chk => `<label style="display:flex;align-items:center;gap:12px;min-height:48px;"><input type="checkbox" data-act-chk="${esc(act.id)}:${esc(chk.id)}" ${chk.done ? 'checked' : ''} /><span>${esc(chk.text)}</span></label>`).join('')}
            </div>
            <div class="work-item-footer">
              <select class="field-select" style="min-height:48px;padding-block:6px;width:auto;" data-act-owner="${esc(act.id)}">
                <option value="">Sem responsável</option>
                ${people.map(p => `<option value="${esc(p.id)}" ${act.responsibleIds[0] === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
              </select>
              <button type="button" class="btn btn-text btn-sm" data-act-done="${esc(act.id)}">${icon(act.status === 'done' ? 'check_circle' : 'radio_button_unchecked')}<span>${act.status === 'done' ? 'Concluída' : 'Marcar como concluída'}</span></button>
            </div>
          </article>
        `;
      }).join('')}</div>`;
    }

    const openCatalog = () => {
      let query = '';
      let onlyPopular = false;
      openSheet({
        title: activeTab === 'methods' ? `Adicionar Método — ${catalog.name}` : `Adicionar Atividade — ${catalog.name}`,
        subtitle: 'Escolha do catálogo NN/g ou crie um item personalizado.',
        bodyHtml: `
          <div class="stack-v">
            <div class="stack-h">
              <input id="cat-search" type="search" class="field-input" style="flex:1;" placeholder="Buscar..." />
              ${activeTab === 'methods' ? `<button type="button" class="chip" id="cat-popular-chip" aria-pressed="false">${icon('star')}<span>Mais usados</span></button>` : ''}
            </div>
            <div class="card card-filled stack-v">
              <span class="label-large">Criar item personalizado</span>
              <div class="stack-h"><input id="custom-item-title" class="field-input" style="flex:1;" placeholder="Nome..." /><button type="button" class="btn btn-tonal" id="btn-add-custom">Adicionar</button></div>
            </div>
            <div id="catalog-items-list" class="stack-v"></div>
          </div>
        `,
        onMount: (sheetRoot) => {
          const listContainer = sheetRoot.querySelector('#catalog-items-list');
          const renderList = () => {
            const source = activeTab === 'methods' ? catalog.methods : catalog.activities;
            const filtered = source.filter(item => (!onlyPopular || item.popular) && (!query || item.namePt.toLowerCase().includes(query.toLowerCase()) || item.nameEn.toLowerCase().includes(query.toLowerCase())));
            listContainer.innerHTML = filtered.map(item => `
              <div class="card card-outlined stack-v">
                <div>
                  ${item.popular ? `<span class="badge badge-popular">Mais usado ${item.usagePercent ? `(${item.usagePercent}%)` : ''}</span>` : ''}
                  <h3 class="title-medium" style="margin-top:4px;">${esc(item.namePt)}</h3>
                  <p class="body-small text-variant">${esc(item.nameEn)}</p>
                </div>
                <p class="body-medium">${esc(item.shortDesc)}</p>
                ${item.variants ? `<div class="stack-h">${item.variants.map(v => `<button type="button" class="btn btn-tonal btn-sm" data-add-cat="${esc(item.id)}" data-variant="${esc(v.id)}">${icon('add')}<span>${esc(v.label)}</span></button>`).join('')}</div>` : `<div><button type="button" class="btn btn-filled btn-sm" data-add-cat="${esc(item.id)}">${icon('add')}<span>Adicionar</span></button></div>`}
              </div>
            `).join('');
            listContainer.querySelectorAll('[data-add-cat]').forEach(btn => btn.addEventListener('click', () => {
              const sourceItem = (activeTab === 'methods' ? catalog.methods : catalog.activities).find(x => x.id === btn.dataset.addCat);
              store.mutate(draft => {
                const st = draft.projects.find(p => p.id === project.id)?.cycles.find(c => c.number === cycle.number)?.stages.find(s => s.key === stage.key);
                if (activeTab === 'methods') st.methods.push(createMethodInstance({ catalogItem: sourceItem, variant: btn.dataset.variant || '' }));
                else st.activities.push(createActivityInstance({ catalogItem: sourceItem }));
              });
              showSnackbar(`"${sourceItem.namePt}" adicionado!`);
            }));
          };
          renderList();
          sheetRoot.querySelector('#cat-search')?.addEventListener('input', (e) => { query = e.target.value; renderList(); });
          sheetRoot.querySelector('#cat-popular-chip')?.addEventListener('click', (e) => { onlyPopular = !onlyPopular; e.currentTarget.setAttribute('aria-pressed', String(onlyPopular)); renderList(); });
          sheetRoot.querySelector('#btn-add-custom')?.addEventListener('click', () => {
            const inp = sheetRoot.querySelector('#custom-item-title');
            if (!inp.value.trim()) return;
            store.mutate(draft => {
              const st = draft.projects.find(p => p.id === project.id)?.cycles.find(c => c.number === cycle.number)?.stages.find(s => s.key === stage.key);
              if (activeTab === 'methods') st.methods.push(createMethodInstance({ title: inp.value.trim() }));
              else st.activities.push(createActivityInstance({ title: inp.value.trim() }));
            });
            inp.value = '';
          });
        }
      });
    };

    document.getElementById('stage-owner')?.addEventListener('change', (e) => store.mutate(draft => { const st = draft.projects.find(p => p.id === project.id)?.cycles.find(c => c.number === cycle.number)?.stages.find(s => s.key === stageKey); if (st) st.responsibleIds = e.target.value ? [e.target.value] : []; }));
    container.querySelectorAll('[data-tab]').forEach(t => t.addEventListener('click', () => { activeTab = t.dataset.tab; window.UXR.renderStageView(container, route); }));
    document.getElementById('btn-open-catalog')?.addEventListener('click', openCatalog);
    document.getElementById('btn-empty-add')?.addEventListener('click', openCatalog);

    const listKey = activeTab === 'methods' ? 'methods' : 'activities';
    const reorder = (from, to) => store.mutate(draft => { const st = draft.projects.find(p => p.id === project.id)?.cycles.find(c => c.number === cycle.number)?.stages.find(s => s.key === stage.key); const [moved] = st[listKey].splice(from, 1); st[listKey].splice(to, 0, moved); });
    enableSortableList(document.getElementById('stage-sortable-list'), reorder);
    container.querySelectorAll('[data-move-item-up]').forEach(b => b.addEventListener('click', () => { const i = Number(b.dataset.moveItemUp); if (i > 0) reorder(i, i - 1); }));
    container.querySelectorAll('[data-move-item-down]').forEach(b => b.addEventListener('click', () => { const i = Number(b.dataset.moveItemDown); if (i < stage[listKey].length - 1) reorder(i, i + 1); }));
    container.querySelectorAll('[data-method-status]').forEach(s => s.addEventListener('change', () => store.mutate(draft => { const m = draft.projects.find(p => p.id === project.id)?.cycles.find(c => c.number === cycle.number)?.stages.find(st => st.key === stage.key)?.methods.find(x => x.id === s.dataset.methodStatus); if (m) { m.status = s.value; if (s.value === 'done') m.progress = 100; } })));
    container.querySelectorAll('[data-method-owner]').forEach(s => s.addEventListener('change', () => store.mutate(draft => { const m = draft.projects.find(p => p.id === project.id)?.cycles.find(c => c.number === cycle.number)?.stages.find(st => st.key === stage.key)?.methods.find(x => x.id === s.dataset.methodOwner); if (m) m.responsibleIds = s.value ? [s.value] : []; })));
    container.querySelectorAll('[data-remove-method]').forEach(b => b.addEventListener('click', () => store.mutate(draft => { const st = draft.projects.find(p => p.id === project.id)?.cycles.find(c => c.number === cycle.number)?.stages.find(s => s.key === stage.key); st.methods = st.methods.filter(m => m.id !== b.dataset.removeMethod); })));
    container.querySelectorAll('[data-act-chk]').forEach(box => box.addEventListener('change', () => { const [actId, chkId] = box.dataset.actChk.split(':'); store.mutate(draft => { const act = draft.projects.find(p => p.id === project.id)?.cycles.find(c => c.number === cycle.number)?.stages.find(s => s.key === stage.key)?.activities.find(a => a.id === actId); const item = act?.checklist.find(c => c.id === chkId); if (item) { item.done = box.checked; act.status = act.checklist.every(c => c.done) ? 'done' : 'doing'; } }); }));
    container.querySelectorAll('[data-act-done]').forEach(b => b.addEventListener('click', () => store.mutate(draft => { const act = draft.projects.find(p => p.id === project.id)?.cycles.find(c => c.number === cycle.number)?.stages.find(s => s.key === stage.key)?.activities.find(a => a.id === b.dataset.actDone); if (act) act.status = act.status === 'done' ? 'doing' : 'done'; })));
    container.querySelectorAll('[data-act-owner]').forEach(s => s.addEventListener('change', () => store.mutate(draft => { const act = draft.projects.find(p => p.id === project.id)?.cycles.find(c => c.number === cycle.number)?.stages.find(st => st.key === stage.key)?.activities.find(a => a.id === s.dataset.actOwner); if (act) act.responsibleIds = s.value ? [s.value] : []; })));
    container.querySelectorAll('[data-remove-activity]').forEach(b => b.addEventListener('click', () => store.mutate(draft => { const st = draft.projects.find(p => p.id === project.id)?.cycles.find(c => c.number === cycle.number)?.stages.find(s => s.key === stage.key); st.activities = st.activities.filter(a => a.id !== b.dataset.removeActivity); })));
  };
})();
