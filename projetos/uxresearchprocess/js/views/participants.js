window.UXR = window.UXR || {};

window.UXR.renderParticipantsView = function(container, route) {
  const { store, uid, esc, icon, showSnackbar } = window.UXR;
  const project = store.getProject(route.params.projectId);
  if (!project) return;
  const participants = (store.getState().participants || []).filter(p => !p.projectId || p.projectId === project.id || p.futurePool);

  container.innerHTML = `
    <div class="page-header"><div><h1 class="headline-medium">Participantes & Recrutamento</h1><p class="body-medium text-variant">Controle de consentimento LGPD, incentivos e pool futuro.</p></div></div>
    <form id="pt-form" class="card card-elevated stack-v" style="margin-bottom:24px;">
      <div class="grid-cards">
        <input id="pt-name" class="field-input" placeholder="Nome / Código *" required />
        <input id="pt-profile" class="field-input" placeholder="Perfil / Segmento *" required />
        <input id="pt-a11y" class="field-input" value="Nenhuma" placeholder="Acessibilidade" />
        <input id="pt-inc" class="field-input" placeholder="Incentivo" />
      </div>
      <div class="stack-h" style="justify-content:space-between;">
        <label style="display:flex;align-items:center;gap:8px;min-height:48px;"><input type="checkbox" id="pt-consent" /><span>Consentimento LGPD assinado</span></label>
        <button type="submit" class="btn btn-filled">${icon('person_add')}<span>Cadastrar participante</span></button>
      </div>
    </form>
    <div class="m3-table-wrapper"><table class="m3-table"><thead><tr><th>Participante</th><th>Perfil</th><th>Acessibilidade</th><th>LGPD</th><th>Status</th></tr></thead><tbody>${participants.map(pt => `<tr><td><strong>${esc(pt.name)}</strong></td><td>${esc(pt.profile)}</td><td>${esc(pt.accessibilityNeed || 'Nenhuma')}</td><td>${pt.consent ? 'Sim' : 'Pendente'}</td><td>${esc(pt.status)}</td></tr>`).join('')}</tbody></table></div>
  `;

  document.getElementById('pt-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    store.mutate(draft => { draft.participants.unshift({ id: uid('prt'), projectId: project.id, name: document.getElementById('pt-name').value.trim(), profile: document.getElementById('pt-profile').value.trim(), accessibilityNeed: document.getElementById('pt-a11y').value.trim(), incentive: document.getElementById('pt-inc').value.trim(), consent: document.getElementById('pt-consent').checked, status: 'recruited', futurePool: true }); });
    showSnackbar('Participante cadastrado.');
  });
};
