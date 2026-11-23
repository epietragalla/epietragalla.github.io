import { getStageMeta } from '../catalog.js';
import { store } from '../store.js';
import { escapeHtml } from '../ui.js';
import { renderMethodWorkspace } from '../methods/engine.js';

let currentTab = 'executar';

export function renderMethodView(container, project, stageKey, methodId) {
  const meta = getStageMeta(stageKey);
  const stage = project.stages.find(s => s.key === stageKey);
  const method = stage?.methods.find(m => m.id === methodId);
  const { people } = store.state;

  if (!method) {
    container.innerHTML = `<div class="empty-state"><p>Método não encontrado.</p><a href="#/projeto/${project.id}/etapa/${stageKey}" class="btn btn-filled">Voltar para Etapa</a></div>`;
    return;
  }

  method.evidences = method.evidences || [];

  container.innerHTML = `
    <section class="card card-elevated" style="border-top: 6px solid ${meta.tokens.accent}; margin-bottom: 20px;">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <a href="#/projeto/${project.id}/etapa/${stageKey}" class="btn btn-text" style="padding: 0 8px; min-height: 36px;">
              <span class="material-symbols-outlined">arrow_back</span> ${meta.nameEn}
            </a>
            <span class="typescale-label-medium" style="color: var(--md-sys-color-on-surface-variant);">• ${escapeHtml(method.group)}</span>
          </div>
          <h1 class="typescale-headline-small">${escapeHtml(method.titlePt)}</h1>
          <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant);">${escapeHtml(method.titleEn)}</p>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end;">
          <div class="field-group" style="margin-bottom: 0; min-width: 150px;">
            <label class="field-label" for="ws-status">Status</label>
            <select id="ws-status" class="field-select">
              <option value="todo" ${method.status === 'todo' ? 'selected' : ''}>A fazer</option>
              <option value="in_progress" ${method.status === 'in_progress' ? 'selected' : ''}>Em andamento</option>
              <option value="review" ${method.status === 'review' ? 'selected' : ''}>Em revisão</option>
              <option value="done" ${method.status === 'done' ? 'selected' : ''}>Concluído</option>
            </select>
          </div>

          <div class="field-group" style="margin-bottom: 0; min-width: 170px;">
            <label class="field-label" for="ws-resp">Responsável</label>
            <select id="ws-resp" class="field-select">
              <option value="">Sem responsável</option>
              ${people.map(p => `<option value="${p.id}" ${method.responsibleIds[0] === p.id ? 'selected' : ''}>${escapeHtml(p.name)}</option>`).join('')}
            </select>
          </div>

          <div class="field-group" style="margin-bottom: 0; width: 130px;">
            <label class="field-label" for="ws-prog">Progresso (${method.progress}%)</label>
            <input type="range" id="ws-prog" min="0" max="100" step="5" value="${method.progress}" style="height: 48px; width: 100\%; accent-color: ${meta.tokens.accent};">
          </div>
        </div>
      </div>

      <div class="progress-track">
        <div class="progress-fill" style="width: ${method.progress}\%; background-color:${meta.tokens.accent};"></div>
      </div>
    </section>

    <!-- Abas Padrão do Motor de Métodos -->
    <div class="tabs-bar" role="tablist" aria-label="Seções do método">
      <button type="button" role="tab" class="tab-btn ${currentTab === 'planejar' ? 'active' : ''}" aria-selected="${currentTab === 'planejar'}" data-tab="planejar">
        <span class="material-symbols-outlined">event_note</span> Planejar
      </button>
      <button type="button" role="tab" class="tab-btn ${currentTab === 'executar' ? 'active' : ''}" aria-selected="${currentTab === 'executar'}" data-tab="executar">
        <span class="material-symbols-outlined">build</span> Executar (Ferramenta)
      </button>
      <button type="button" role="tab" class="tab-btn ${currentTab === 'achados' ? 'active' : ''}" aria-selected="${currentTab === 'achados'}" data-tab="achados">
        <span class="material-symbols-outlined">lightbulb</span> Achados (${method.findings.length})
      </button>
      <button type="button" role="tab" class="tab-btn ${currentTab === 'evidencias' ? 'active' : ''}" aria-selected="${currentTab === 'evidencias'}" data-tab="evidencias">
        <span class="material-symbols-outlined">attach_file</span> Evidências (${method.evidences.length})
      </button>
      <button type="button" role="tab" class="tab-btn ${currentTab === 'conclusao' ? 'active' : ''}" aria-selected="${currentTab === 'conclusao'}" data-tab="conclusao">
        <span class="material-symbols-outlined">flag</span> Conclusão
      </button>
    </div>

    <div id="method-blocks-host"></div>
  `;

  container.querySelector('#ws-status').addEventListener('change', (e) => {
    store.updateMethod(project.id, stageKey, method.id, m => {
      m.status = e.target.value;
      if (m.status === 'done') m.progress = 100;
      if (m.status === 'todo') m.progress = 0;
    });
  });

  container.querySelector('#ws-resp').addEventListener('change', (e) => {
    store.updateMethod(project.id, stageKey, method.id, m => {
      m.responsibleIds = e.target.value ? [e.target.value] : [];
    });
  });

  container.querySelector('#ws-prog').addEventListener('change', (e) => {
    const val = Number(e.target.value);
    store.updateMethod(project.id, stageKey, method.id, m => {
      m.progress = val;
      if (val === 100) m.status = 'done';
      else if (val > 0 && m.status === 'todo') m.status = 'in_progress';
    });
  });

  container.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTab = btn.dataset.tab;
      renderMethodView(container, project, stageKey, methodId);
    });
  });

  renderMethodWorkspace(container.querySelector('#method-blocks-host'), project, stageKey, method, currentTab);
}