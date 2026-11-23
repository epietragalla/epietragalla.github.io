import { store } from '../store.js';
import { generateId } from '../schema.js';
import { escapeHtml, showSnackbar } from '../ui.js';
import { renderDiscoverTemplate } from './templates/discover.js';
import { renderDefineTemplate } from './templates/define.js';
import { renderIdeateTemplate } from './templates/ideate.js';
import { renderPrototypeEvaluateTemplate } from './templates/prototype_evaluate.js';

export function renderMethodWorkspace(container, project, stageKey, method, activeTab) {
  if (activeTab === 'planejar') {
    renderPlanTab(container, project, stageKey, method);
    return;
  }
  if (activeTab === 'achados') {
    renderFindingsTab(container, project, stageKey, method);
    return;
  }
  if (activeTab === 'evidencias') {
    renderEvidencesTab(container, project, stageKey, method);
    return;
  }
  if (activeTab === 'conclusao') {
    renderConclusionTab(container, project, stageKey, method);
    return;
  }

  // Aba EXECUTAR: Renderiza o Template Específico + Blocos Genéricos de Apoio
  container.innerHTML = `
    <div id="specialized-template-host" style="margin-bottom: 24px;"></div>
    <details class="card card-outlined" open>
      <summary class="typescale-title-medium" style="cursor: pointer; min-height: 40px; display: flex; align-items: center; gap: 8px;">
        <span class="material-symbols-outlined">widgets</span>
        Blocos Complementares (Checklist de Execução, Tabela & Notas Livres)
      </summary>
      <div id="generic-blocks-host" style="margin-top: 16px;"></div>
    </details>
  `;

  const specHost = container.querySelector('#specialized-template-host');
  let hasSpecialized = false;

  if (stageKey === 'discover') {
    hasSpecialized = renderDiscoverTemplate(specHost, project, stageKey, method);
  } else if (stageKey === 'define') {
    hasSpecialized = renderDefineTemplate(specHost, project, stageKey, method);
  } else if (stageKey === 'ideate') {
    hasSpecialized = renderIdeateTemplate(specHost, project, stageKey, method);
  } else if (stageKey === 'prototype' || stageKey === 'evaluate') {
    hasSpecialized = renderPrototypeEvaluateTemplate(specHost, project, stageKey, method);
  }

  if (!hasSpecialized) {
    specHost.remove();
  }

  renderGenericBlocks(container.querySelector('#generic-blocks-host'), project, stageKey, method);
}

function renderPlanTab(container, project, stageKey, method) {
  container.innerHTML = `
    <div class="card card-outlined">
      <h3 class="typescale-title-medium" style="margin-bottom: 12px;">Objetivo & Escopo do Método</h3>
      <div class="field-group">
        <label class="field-label" for="met-obj">Qual pergunta este método precisa responder?</label>
        <textarea id="met-obj" class="field-textarea" placeholder="Descreva o objetivo prático e o público-alvo...">${escapeHtml(method.objective || '')}</textarea>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
        <div class="field-group">
          <label class="field-label" for="met-start">Data de início</label>
          <input type="date" id="met-start" class="field-input" value="${escapeHtml(method.startDate || '')}">
        </div>
        <div class="field-group">
          <label class="field-label" for="met-end">Data de entrega</label>
          <input type="date" id="met-end" class="field-input" value="${escapeHtml(method.endDate || '')}">
        </div>
        <div class="field-group">
          <label class="field-label" for="met-weight">Peso na etapa (1 a 5)</label>
          <input type="number" min="1" max="5" id="met-weight" class="field-input" value="${method.weight || 1}">
        </div>
      </div>
    </div>
  `;

  container.querySelector('#met-obj').addEventListener('change', e => store.updateMethod(project.id, stageKey, method.id, m => { m.objective = e.target.value; }));
  container.querySelector('#met-start').addEventListener('change', e => store.updateMethod(project.id, stageKey, method.id, m => { m.startDate = e.target.value; }));
  container.querySelector('#met-end').addEventListener('change', e => store.updateMethod(project.id, stageKey, method.id, m => { m.endDate = e.target.value; }));
  container.querySelector('#met-weight').addEventListener('change', e => store.updateMethod(project.id, stageKey, method.id, m => { m.weight = Math.max(1, Number(e.target.value) || 1); }));
}

function renderEvidencesTab(container, project, stageKey, method) {
  const evidences = method.evidences || [];
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <form id="add-ev-form" class="card card-elevated">
        <h3 class="typescale-title-medium" style="margin-bottom: 12px;">Anexar Evidência (Link Externo ou Print/Imagem)</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
          <div class="field-group">
            <label class="field-label" for="ev-title">Título da evidência *</label>
            <input type="text" id="ev-title" class="field-input" required placeholder="Ex: Gravação Entrevista P03 / Link Figma">
          </div>
          <div class="field-group">
            <label class="field-label" for="ev-url">URL / Link (Figma, Drive, Miro, etc.)</label>
            <input type="url" id="ev-url" class="field-input" placeholder="https://...">
          </div>
        </div>
        <div class="field-group">
          <label class="field-label" for="ev-img">Ou envie uma imagem/captura (máx. 800KB para manter JSON leve)</label>
          <input type="file" id="ev-img" accept="image/*" class="field-input" style="padding: 8px;">
        </div>
        <button type="submit" class="btn btn-filled">Adicionar Evidência</button>
      </form>

      <div class="projects-grid">
        ${evidences.map((ev, idx) => `
          <article class="card card-outlined" style="display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
            <div>
              <h4 class="typescale-title-medium" style="margin-bottom: 6px;">${escapeHtml(ev.title)}</h4>
              ${ev.imageData ? `<img src="${ev.imageData}" alt="${escapeHtml(ev.title)}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">` : ''}
              ${ev.url ? `<a href="${escapeHtml(ev.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-tonal" style="width: 100%;">Abrir Link Externo</a>` : ''}
            </div>
            <button type="button" class="btn btn-text" data-del-ev="${idx}" style="color: var(--md-sys-color-error);">Remover Evidência</button>
          </article>
        `).join('') || '<div class="empty-state"><span class="material-symbols-outlined">perm_media</span><p>Nenhuma evidência anexada ainda.</p></div>'}
      </div>
    </div>
  `;

  container.querySelector('#add-ev-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = container.querySelector('#ev-title').value.trim();
    const url = container.querySelector('#ev-url').value.trim();
    const file = container.querySelector('#ev-img').files?.[0];
    if (!title) return;

    const saveEvidence = (imageData = null) => {
      store.updateMethod(project.id, stageKey, method.id, m => {
        m.evidences = m.evidences || [];
        m.evidences.unshift({ id: generateId('ev'), title, url, imageData, createdAt: new Date().toISOString() });
      });
      showSnackbar('Evidência salva.');
    };

    if (file) {
      if (file.size > 850 * 1024) {
        showSnackbar('Imagem excede 800KB. Reduza o tamanho ou use um link.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => saveEvidence(reader.result);
      reader.readAsDataURL(file);
    } else {
      saveEvidence(null);
    }
  });

  container.querySelectorAll('[data-del-ev]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.delEv);
      store.updateMethod(project.id, stageKey, method.id, m => { m.evidences.splice(idx, 1); });
    });
  });
}

function renderFindingsTab(container, project, stageKey, method) {
  const findings = method.findings || [];
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <form id="add-finding-form" class="card card-elevated">
        <h3 class="typescale-title-medium" style="margin-bottom: 12px;">Registrar Novo Achado / Insight</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
          <div class="field-group">
            <label class="field-label" for="fnd-title">Título do achado *</label>
            <input type="text" id="fnd-title" class="field-input" required placeholder="Ex: Usuários não entendem a taxa...">
          </div>
          <div class="field-group">
            <label class="field-label" for="fnd-sev">Severidade / Impacto</label>
            <select id="fnd-sev" class="field-select">
              <option value="low">Baixo</option>
              <option value="medium" selected>Médio</option>
              <option value="high">Alto / Crítico</option>
            </select>
          </div>
        </div>
        <div class="field-group">
          <label class="field-label" for="fnd-desc">Descrição e evidência observada</label>
          <textarea id="fnd-desc" class="field-textarea" placeholder="Detalhe o que aconteceu e por que isso importa..."></textarea>
        </div>
        <button type="submit" class="btn btn-filled">Salvar Achado</button>
      </form>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${findings.map((f, idx) => `
          <article class="card card-outlined" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                <span class="status-badge" data-status="${f.severity === 'high' ? 'done' : 'in_progress'}">Impacto: ${f.severity.toUpperCase()}</span>
                ${f.promotedToInsight ? `<span class="status-badge" style="background: var(--ux-stage-define-container); color: var(--ux-stage-define-on-container);">★ Insight Promovido</span>` : ''}
              </div>
              <h4 class="typescale-title-medium">${escapeHtml(f.title)}</h4>
              <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant); margin-top: 4px;">${escapeHtml(f.description)}</p>
            </div>
            <div style="display: flex; gap: 4px;">
              <button type="button" class="btn btn-tonal" data-promote-fnd="${idx}">${f.promotedToInsight ? 'Promovido' : 'Promover a Insight'}</button>
              <button type="button" class="icon-btn" data-del-fnd="${idx}" aria-label="Excluir achado"><span class="material-symbols-outlined">delete</span></button>
            </div>
          </article>
        `).join('') || '<div class="empty-state"><span class="material-symbols-outlined">lightbulb</span><p>Nenhum achado registrado neste método.</p></div>'}
      </div>
    </div>
  `;

  container.querySelector('#add-finding-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = container.querySelector('#fnd-title').value.trim();
    const severity = container.querySelector('#fnd-sev').value;
    const description = container.querySelector('#fnd-desc').value.trim();
    if (!title) return;
    store.updateMethod(project.id, stageKey, method.id, m => {
      m.findings.unshift({ id: generateId('fnd'), title, severity, description, tags: [], promotedToInsight: false });
    });
    showSnackbar('Achado registrado.');
  });

  container.querySelectorAll('[data-promote-fnd]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.promoteFnd);
      store.updateMethod(project.id, stageKey, method.id, m => {
        m.findings[idx].promotedToInsight = !m.findings[idx].promotedToInsight;
      });
      showSnackbar('Insight atualizado.');
    });
  });

  container.querySelectorAll('[data-del-fnd]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.delFnd);
      store.updateMethod(project.id, stageKey, method.id, m => { m.findings.splice(idx, 1); });
    });
  });
}

function renderConclusionTab(container, project, stageKey, method) {
  container.innerHTML = `
    <div class="card card-outlined">
      <h3 class="typescale-title-medium" style="margin-bottom: 12px;">Conclusão & Próximos Passos</h3>
      <textarea id="met-conclusion" class="field-textarea" style="min-height: 160px;" placeholder="Resuma as decisões tomadas a partir deste método...">${escapeHtml(method.conclusion || '')}</textarea>
    </div>
  `;
  container.querySelector('#met-conclusion').addEventListener('change', (e) => {
    store.updateMethod(project.id, stageKey, method.id, m => { m.conclusion = e.target.value; });
  });
}

export function renderGenericBlocks(container, project, stageKey, method) {
  const checklist = method.blocks.checklist || [];
  const table = method.blocks.table || { headers: ['Item', 'Detalhe', 'Status'], rows: [] };

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <section>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h4 class="typescale-title-small">Checklist de Execução</h4>
          <span class="typescale-label-medium">${checklist.filter(i => i.done).length}/${checklist.length}</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px;">
          ${checklist.map((item, idx) => `
            <div style="display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 4px 8px; border-radius: 8px; background: var(--md-sys-color-surface-container-low);">
              <input type="checkbox" id="chk_${item.id}" data-chk-idx="${idx}" ${item.done ? 'checked' : ''} style="width: 18px; height: 18px;">
              <label for="chk_${item.id}" style="flex: 1; text-decoration: ${item.done ? 'line-through' : 'none'};">${escapeHtml(item.text)}</label>
              <button type="button" class="icon-btn" data-del-chk="${idx}" aria-label="Remover"><span class="material-symbols-outlined">delete</span></button>
            </div>
          `).join('')}
        </div>
        <form id="add-chk-form" style="display: flex; gap: 8px;">
          <input type="text" id="new-chk-input" class="field-input" placeholder="Nova tarefa..." required>
          <button type="submit" class="btn btn-tonal">Adicionar</button>
        </form>
      </section>

      <section>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h4 class="typescale-title-small">Tabela Editável</h4>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="btn btn-outlined" id="add-col-btn">+ Coluna</button>
            <button type="button" class="btn btn-tonal" id="add-row-btn">+ Linha</button>
          </div>
        </div>
        <div class="m3-table-wrap">
          <table class="m3-table">
            <thead>
              <tr>
                ${table.headers.map((h, cIdx) => `<th><input type="text" data-th-idx="${cIdx}" value="${escapeHtml(h)}"></th>`).join('')}
                <th style="width: 48px;"></th>
              </tr>
            </thead>
            <tbody>
              ${table.rows.map((row, rIdx) => `
                <tr>
                  ${table.headers.map((_, cIdx) => `<td><input type="text" data-cell="${rIdx}:${cIdx}" value="${escapeHtml(row[cIdx] || '')}"></td>`).join('')}
                  <td><button type="button" class="icon-btn" data-del-row="${rIdx}"><span class="material-symbols-outlined">close</span></button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h4 class="typescale-title-small" style="margin-bottom: 8px;">Notas de Campo</h4>
        <textarea id="met-notes" class="field-textarea" placeholder="Observações gerais...">${escapeHtml(method.blocks.notes || '')}</textarea>
      </section>
    </div>
  `;

  container.querySelector('#add-chk-form').addEventListener('submit', e => {
    e.preventDefault();
    const val = container.querySelector('#new-chk-input').value.trim();
    if (!val) return;
    store.updateMethod(project.id, stageKey, method.id, m => { m.blocks.checklist.push({ id: generateId('chk'), text: val, done: false }); });
  });

  container.querySelectorAll('[data-chk-idx]').forEach(cb => cb.addEventListener('change', () => {
    const idx = Number(cb.dataset.chkIdx);
    store.updateMethod(project.id, stageKey, method.id, m => {
      m.blocks.checklist[idx].done = cb.checked;
      const done = m.blocks.checklist.filter(c => c.done).length;
      m.progress = Math.round((done / m.blocks.checklist.length) * 100);
    });
  }));

  container.querySelectorAll('[data-del-chk]').forEach(btn => btn.addEventListener('click', () => {
    store.updateMethod(project.id, stageKey, method.id, m => { m.blocks.checklist.splice(Number(btn.dataset.delChk), 1); });
  }));

  container.querySelector('#add-row-btn').addEventListener('click', () => {
    store.updateMethod(project.id, stageKey, method.id, m => { m.blocks.table.rows.push(new Array(m.blocks.table.headers.length).fill('')); });
  });

  container.querySelector('#add-col-btn').addEventListener('click', () => {
    store.updateMethod(project.id, stageKey, method.id, m => {
      m.blocks.table.headers.push(`Col ${m.blocks.table.headers.length + 1}`);
      m.blocks.table.rows.forEach(r => r.push(''));
    });
  });

  container.querySelectorAll('[data-th-idx]').forEach(inp => inp.addEventListener('change', () => {
    store.updateMethod(project.id, stageKey, method.id, m => { m.blocks.table.headers[Number(inp.dataset.thIdx)] = inp.value; });
  }));

  container.querySelectorAll('[data-cell]').forEach(inp => inp.addEventListener('change', () => {
    const [r, c] = inp.dataset.cell.split(':').map(Number);
    store.updateMethod(project.id, stageKey, method.id, m => { m.blocks.table.rows[r][c] = inp.value; });
  }));

  container.querySelectorAll('[data-del-row]').forEach(btn => btn.addEventListener('click', () => {
    store.updateMethod(project.id, stageKey, method.id, m => { m.blocks.table.rows.splice(Number(btn.dataset.delRow), 1); });
  }));

  container.querySelector('#met-notes').addEventListener('change', e => {
    store.updateMethod(project.id, stageKey, method.id, m => { m.blocks.notes = e.target.value; });
  });
}