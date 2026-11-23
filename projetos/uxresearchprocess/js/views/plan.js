window.UXR = window.UXR || {};

window.UXR.renderPlanView = function(container, route) {
  const { store, esc, icon, showSnackbar } = window.UXR;
  const project = store.getProject(route.params.projectId);
  if (!project) return;

  container.innerHTML = `
    <div class="page-header">
      <div><h1 class="headline-medium">Plano de Pesquisa</h1><p class="body-medium text-variant">Defina perguntas, hipóteses e restrições que orientam a escolha dos métodos.</p></div>
      <a href="#/projeto/${esc(project.id)}" class="btn btn-outlined">${icon('arrow_back')}<span>Voltar</span></a>
    </div>
    <form id="plan-form" class="stack-v">
      <section class="card card-elevated stack-v">
        <h2 class="title-large">1. Contexto e Escopo</h2>
        <div class="field"><label for="plan-name" class="field-label">Nome do projeto</label><input id="plan-name" class="field-input" value="${esc(project.name)}" required /></div>
        <div class="field"><label for="plan-desc" class="field-label">Descrição e objetivos</label><textarea id="plan-desc" class="field-textarea">${esc(project.description)}</textarea></div>
      </section>
      <section class="card card-elevated stack-v">
        <h2 class="title-large">2. Perguntas de Pesquisa & Hipóteses</h2>
        <div class="field"><label for="plan-questions" class="field-label">Perguntas de pesquisa (uma por linha)</label><textarea id="plan-questions" class="field-textarea">${esc(project.researchQuestions.join('\n'))}</textarea></div>
        <div class="field"><label for="plan-hypotheses" class="field-label">Hipóteses (uma por linha)</label><textarea id="plan-hypotheses" class="field-textarea">${esc(project.hypotheses.join('\n'))}</textarea></div>
      </section>
      <section class="card card-elevated stack-v">
        <h2 class="title-large">3. Restrições do Projeto</h2>
        <div class="grid-cards">
          <div class="field"><label for="plan-time" class="field-label">Prazo</label><input id="plan-time" class="field-input" value="${esc(project.constraints?.time || '')}" /></div>
          <div class="field"><label for="plan-budget" class="field-label">Orçamento</label><input id="plan-budget" class="field-input" value="${esc(project.constraints?.budget || '')}" /></div>
          <div class="field"><label for="plan-maturity" class="field-label">Maturidade</label><select id="plan-maturity" class="field-select">${['Ideia / Produto novo (0 a 1)', 'Protótipo / MVP inicial', 'Produto existente em produção', 'Sistema legado em redesign'].map(opt => `<option value="${esc(opt)}" ${project.constraints?.systemMaturity === opt ? 'selected' : ''}>${esc(opt)}</option>`).join('')}</select></div>
          <div class="field"><label for="plan-type" class="field-label">Tipo de produto</label><input id="plan-type" class="field-input" value="${esc(project.constraints?.productType || '')}" /></div>
        </div>
      </section>
      <div class="stack-h" style="justify-content:flex-end;"><button type="submit" class="btn btn-filled">${icon('save')}<span>Salvar plano</span></button></div>
    </form>
  `;

  document.getElementById('plan-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    store.mutate(draft => {
      const p = draft.projects.find(item => item.id === project.id);
      if (!p) return;
      p.name = document.getElementById('plan-name').value.trim() || p.name;
      p.description = document.getElementById('plan-desc').value.trim();
      p.researchQuestions = document.getElementById('plan-questions').value.split('\n').map(s => s.trim()).filter(Boolean);
      p.hypotheses = document.getElementById('plan-hypotheses').value.split('\n').map(s => s.trim()).filter(Boolean);
      p.constraints = { time: document.getElementById('plan-time').value.trim(), budget: document.getElementById('plan-budget').value.trim(), systemMaturity: document.getElementById('plan-maturity').value, productType: document.getElementById('plan-type').value.trim() };
    });
    showSnackbar('Plano de pesquisa atualizado.');
  });
};
