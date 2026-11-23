window.UXR = window.UXR || {};

window.UXR.renderOverviewView = function(container, route) {
  const { store, STAGE_ORDER, STAGES_CATALOG, esc, icon } = window.UXR;
  const project = store.getProject(route.params.projectId);
  if (!project) { container.innerHTML = `<p>Projeto não encontrado. <a href="#/projetos">Voltar</a>.</p>`; return; }

  const state = store.getState();
  const activeCycle = store.getCycle(project, project.activeCycleNumber);
  const owners = (project.ownerIds || []).map(id => state.people.find(p => p.id === id)).filter(Boolean);

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="headline-medium">${esc(project.name)}</h1>
        <p class="body-large text-variant">${esc(project.description || '')}</p>
      </div>
      <div class="stack-h">
        <a href="#/projeto/${esc(project.id)}/plano" class="btn btn-outlined">${icon('assignment')}<span>Plano de Pesquisa</span></a>
        <a href="#/projeto/${esc(project.id)}/ciclo/${activeCycle.number}/etapa/discover" class="btn btn-filled">${icon('play_arrow')}<span>Trabalhar no ${esc(activeCycle.name)}</span></a>
      </div>
    </div>
    <div class="grid-cards" style="margin-bottom: var(--md-sys-space-6);">
      <section class="card card-elevated stack-v">
        <h2 class="title-medium">Perguntas de Pesquisa (${project.researchQuestions.length})</h2>
        ${project.researchQuestions.length === 0 ? `<p class="body-medium text-variant">Nenhuma pergunta cadastrada.</p>` : `<ul style="padding-left:20px;">${project.researchQuestions.map(q => `<li>${esc(q)}</li>`).join('')}</ul>`}
      </section>
      <section class="card card-elevated stack-v">
        <h2 class="title-medium">Hipóteses a Validar (${project.hypotheses.length})</h2>
        ${project.hypotheses.length === 0 ? `<p class="body-medium text-variant">Nenhuma hipótese cadastrada.</p>` : `<ul style="padding-left:20px;">${project.hypotheses.map(h => `<li>${esc(h)}</li>`).join('')}</ul>`}
      </section>
      <section class="card card-elevated stack-v">
        <h2 class="title-medium">Equipe & Restrições</h2>
        <div class="stack-h">${owners.length > 0 ? owners.map(o => `<span class="badge badge-neutral">${esc(o.name)} (${esc(o.role)})</span>`).join('') : `<span class="body-medium text-variant">Sem responsáveis definidos</span>`}</div>
        <p class="body-small text-variant"><strong>Prazo:</strong> ${esc(project.constraints?.time || 'Não definido')} • <strong>Maturidade:</strong> ${esc(project.constraints?.systemMaturity || 'Não definida')}</p>
      </section>
    </div>
    <section class="card card-outlined stack-v" style="margin-bottom: var(--md-sys-space-6);">
      <h2 class="title-large">Progresso por Etapa — ${esc(activeCycle.name)}</h2>
      <div class="grid-cards">
        ${STAGE_ORDER.map(key => {
          const cat = STAGES_CATALOG[key];
          const st = activeCycle.stages.find(s => s.key === key);
          const m = store.calcStageMetrics(st);
          const findingsCount = st.methods.reduce((acc, item) => acc + (item.findings?.length || 0), 0);
          return `
            <div class="card card-filled stack-v">
              <div class="stack-h" style="justify-content:space-between;"><span class="title-medium">${esc(cat.name)} (${esc(cat.ptName)})</span><span class="label-large">${m.percent}%</span></div>
              <div class="progress-track"><div class="progress-fill" style="width:${m.percent}%;"></div></div>
              <p class="body-small text-variant">${m.methodsDone}/${m.methodsTotal} métodos • ${m.activitiesDone}/${m.activitiesTotal} atividades • ${findingsCount} achados</p>
              <a href="#/projeto/${esc(project.id)}/ciclo/${activeCycle.number}/etapa/${key}" class="btn btn-text btn-sm" style="align-self:flex-start;"><span>Abrir etapa</span>${icon('arrow_forward')}</a>
            </div>
          `;
        }).join('')}
      </div>
    </section>
    <section class="card card-outlined stack-v">
      <h2 class="title-large">Comparativo entre Ciclos (${project.cycles.length})</h2>
      <div class="m3-table-wrapper">
        <table class="m3-table">
          <thead><tr><th>Ciclo</th><th>Progresso</th><th>Métodos Usados</th><th>Achados</th><th>Ação</th></tr></thead>
          <tbody>
            ${project.cycles.map(c => {
              const allMethods = c.stages.flatMap(s => s.methods);
              const totalFindings = allMethods.reduce((sum, m) => sum + (m.findings?.length || 0), 0);
              return `<tr><td><strong>${esc(c.name)}</strong></td><td>${store.calcCycleProgress(c)}%</td><td>${allMethods.length ? esc(allMethods.map(m => m.title.split(' (')[0]).join(', ')) : 'Nenhum'}</td><td>${totalFindings}</td><td><a href="#/projeto/${esc(project.id)}/ciclo/${c.number}/etapa/discover" class="btn btn-text btn-sm">Explorar</a></td></tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
};
