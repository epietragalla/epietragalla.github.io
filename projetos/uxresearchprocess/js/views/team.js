window.UXR = window.UXR || {};

window.UXR.renderTeamView = function(container) {
  const { store, uid, esc, icon, showSnackbar } = window.UXR;
  const state = store.getState();
  container.innerHTML = `
    <div class="page-header"><div><h1 class="headline-medium">Equipe e Responsáveis</h1></div></div>
    <form id="team-add-form" class="card card-elevated stack-v" style="margin-bottom:24px;">
      <div class="grid-cards">
        <input id="per-name" class="field-input" required placeholder="Nome completo *" />
        <input id="per-role" class="field-input" required placeholder="Papel / Especialidade *" />
        <input id="per-email" type="email" class="field-input" placeholder="E-mail (opcional)" />
      </div>
      <div><button type="submit" class="btn btn-filled">${icon('person_add')}<span>Adicionar membro</span></button></div>
    </form>
    <div class="grid-cards">${state.people.map(person => `<article class="card card-outlined stack-v"><div class="stack-h" style="justify-content:space-between;"><div><h3 class="title-medium">${esc(person.name)}</h3><p class="body-small text-variant">${esc(person.role)}</p></div><button type="button" class="icon-btn" data-del-person="${esc(person.id)}">${icon('delete')}</button></div></article>`).join('')}</div>
  `;
  document.getElementById('team-add-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    store.mutate(draft => draft.people.push({ id: uid('per'), name: document.getElementById('per-name').value.trim(), role: document.getElementById('per-role').value.trim(), email: document.getElementById('per-email').value.trim(), color: 'primary' }));
    showSnackbar('Membro adicionado.');
  });
  container.querySelectorAll('[data-del-person]').forEach(b => b.addEventListener('click', () => store.mutate(draft => { draft.people = draft.people.filter(p => p.id !== b.dataset.delPerson); })));
};
