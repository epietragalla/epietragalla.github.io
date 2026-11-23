import { store } from '../store.js';
import { escapeHtml, renderAvatar, showSnackbar } from '../ui.js';

export function renderTeamView(container) {
  const { people, projects } = store.state;

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="typescale-headline-medium">Equipe & Responsáveis</h1>
        <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant);">Cadastre membros e acompanhe a alocação nos projetos e métodos.</p>
      </div>
    </div>

    <form id="add-person-form" class="card card-elevated" style="margin-bottom: 24px;">
      <h2 class="typescale-title-medium" style="margin-bottom: 12px;">Adicionar Membro</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; align-items: end;">
        <div class="field-group" style="margin-bottom: 0;">
          <label class="field-label" for="per-name">Nome completo *</label>
          <input type="text" id="per-name" class="field-input" required placeholder="Ex: Mariana Costa">
        </div>
        <div class="field-group" style="margin-bottom: 0;">
          <label class="field-label" for="per-role">Papel / Especialidade</label>
          <input type="text" id="per-role" class="field-input" placeholder="Ex: UX Researcher">
        </div>
        <div class="field-group" style="margin-bottom: 0;">
          <label class="field-label" for="per-email">E-mail (opcional)</label>
          <input type="email" id="per-email" class="field-input" placeholder="mariana@empresa.com">
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <input type="color" id="per-color" class="field-input" value="#6E42A8" style="width: 56px; padding: 4px;" aria-label="Cor do avatar">
          <button type="submit" class="btn btn-filled" style="flex: 1;">Adicionar</button>
        </div>
      </div>
    </form>

    <div class="projects-grid">
      ${people.map(person => {
        let assignedMethods = 0;
        projects.forEach(p => p.stages.forEach(st => st.methods.forEach(m => {
          if (m.responsibleIds.includes(person.id)) assignedMethods++;
        })));

        return `
          <article class="card card-outlined" style="display: flex; justify-content: space-between; align-items: center; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              ${renderAvatar(person)}
              <div>
                <h3 class="typescale-title-medium">${escapeHtml(person.name)}</h3>
                <p class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">${escapeHtml(person.role)} ${person.email ? `• ${escapeHtml(person.email)}` : ''}</p>
                <span class="typescale-label-small" style="color: var(--md-sys-color-primary);">${assignedMethods} método(s) atribuído(s)</span>
              </div>
            </div>
            <button type="button" class="icon-btn" data-del-person="${person.id}" aria-label="Remover membro">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </article>
        `;
      }).join('')}
    </div>
  `;

  container.querySelector('#add-person-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = container.querySelector('#per-name').value.trim();
    if (!name) return;
    store.addPerson({
      name,
      role: container.querySelector('#per-role').value.trim(),
      email: container.querySelector('#per-email').value.trim(),
      color: container.querySelector('#per-color').value
    });
    showSnackbar(`${name} adicionado(a) à equipe.`);
  });

  container.querySelectorAll('[data-del-person]').forEach(btn => {
    btn.addEventListener('click', () => {
      store.removePerson(btn.dataset.delPerson);
      showSnackbar('Membro removido.', 'Desfazer', () => store.undo());
    });
  });
}