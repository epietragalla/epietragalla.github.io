import { store } from '../../store.js';
import { generateId } from '../../schema.js';
import { escapeHtml } from '../../ui.js';

let crazyTimerInterval = null;

export function renderIdeateTemplate(container, project, stageKey, method) {
  const cid = method.catalogId || '';
  method.templateData = method.templateData || {};

  // 1. CRAZY 8 / DINÂMICAS DE IDEAÇÃO COM CRONÔMETRO DE 8 MINUTOS
  if (cid === 'ide-ws-3' || cid === 'ide-ws-2') {
    if (!Array.isArray(method.templateData.sketches)) {
      method.templateData.sketches = Array.from({ length: 8 }, (_, i) => ({
        slot: i + 1,
        title: `Ideia #${i + 1}`,
        description: '',
        votes: 0
      }));
    }
    const sketches = method.templateData.sketches;

    container.innerHTML = `
      <div class="card card-elevated">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div>
            <h3 class="typescale-title-large">Crazy 8s & Votação por Pontos</h3>
            <p class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">8 ideias rápidas em 8 minutos (1 min por quadro). Vote nas mais promissoras.</p>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span id="c8-timer-display" class="typescale-title-large" style="font-variant-numeric: tabular-nums;">08:00</span>
            <button type="button" class="btn btn-tonal" id="c8-start-timer">Iniciar 8 min</button>
          </div>
        </div>

        <div class="crazy8-grid">
          ${sketches.map((sk, idx) => `
            <div class="card card-outlined" style="padding: 12px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="typescale-label-large" style="color: var(--ux-stage-ideate);">#${sk.slot}</span>
                <button type="button" class="chip ${sk.votes > 0 ? 'selected' : ''}" style="min-height: 32px; padding: 0 10px;" data-vote-c8="${idx}">
                  👍 ${sk.votes}
                </button>
              </div>
              <input class="field-input" style="min-height: 38px; padding: 6px 10px;" data-c8-title="${idx}" value="${escapeHtml(sk.title)}" placeholder="Título da ideia">
              <textarea class="field-textarea" style="min-height: 76px; padding: 8px;" data-c8-desc="${idx}" placeholder="Como funciona...">${escapeHtml(sk.description)}</textarea>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelector('#c8-start-timer').addEventListener('click', () => {
      clearInterval(crazyTimerInterval);
      let seconds = 8 * 60;
      const disp = container.querySelector('#c8-timer-display');
      crazyTimerInterval = setInterval(() => {
        seconds--;
        const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
        const ss = String(seconds % 60).padStart(2, '0');
        if (disp) disp.textContent = `${mm}:${ss}`;
        if (seconds <= 0) clearInterval(crazyTimerInterval);
      }, 1000);
    });

    container.querySelectorAll('[data-vote-c8]').forEach(btn => btn.addEventListener('click', () => {
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.sketches[Number(btn.dataset.voteC8)].votes++; });
    }));
    container.querySelectorAll('[data-c8-title]').forEach(inp => inp.addEventListener('change', () => {
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.sketches[Number(inp.dataset.c8Title)].title = inp.value; });
    }));
    container.querySelectorAll('[data-c8-desc]').forEach(ta => ta.addEventListener('change', () => {
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.sketches[Number(ta.dataset.c8Desc)].description = ta.value; });
    }));
    return true;
  }

  // 2. EDITOR INTERATIVO DE FLUXOS DE USUÁRIO / MAPA MENTAL (Nós arrastáveis + conexões SVG)
  if (['ide-cr-1', 'ide-cr-6', 'ide-cr-7', 'pro-wf-2'].includes(cid)) {
    if (!Array.isArray(method.templateData.nodes)) {
      method.templateData.nodes = [
        { id: 'n1', label: 'Início: Home App', type: 'start', x: 30, y: 60 },
        { id: 'n2', label: 'Inserir Chave Pix', type: 'screen', x: 230, y: 60 },
        { id: 'n3', label: 'Chave Válida?', type: 'decision', x: 440, y: 60 },
        { id: 'n4', label: 'Comprovante Concluído', type: 'end', x: 650, y: 60 }
      ];
      method.templateData.edges = [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' }
      ];
    }

    const { nodes, edges } = method.templateData;

    container.innerHTML = `
      <div class="card card-elevated">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div>
            <h3 class="typescale-title-large">Editor de Fluxo / Arquitetura (Arraste os nós)</h3>
            <p class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">Arraste qualquer bloco no quadro para reorganizar o fluxo.</p>
          </div>
          <form id="add-node-form" style="display: flex; gap: 8px; flex-wrap: wrap;">
            <input type="text" id="nd-label" class="field-input" style="min-height: 40px;" placeholder="Nome da tela ou passo..." required>
            <select id="nd-type" class="field-select" style="min-height: 40px; width: auto;">
              <option value="screen">Tela</option>
              <option value="decision">Decisão</option>
              <option value="end">Fim / Sucesso</option>
            </select>
            <button type="submit" class="btn btn-filled" style="min-height: 40px;">+ Nó</button>
          </form>
        </div>

        <div class="interactive-stage-canvas" id="flow-canvas">
          <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
            ${edges.map(ed => {
              const a = nodes.find(n => n.id === ed.from);
              const b = nodes.find(n => n.id === ed.to);
              if (!a || !b) return '';
              return `<line x1="${a.x + 70}" y1="${a.y + 24}" x2="${b.x + 70}" y2="${b.y + 24}" stroke="var(--md-sys-color-primary)" stroke-width="2.5" />`;
            }).join('')}
          </svg>
          ${nodes.map(n => `
            <div class="flow-node" data-node-id="${n.id}" data-type="${n.type}" style="left: ${n.x}px; top: ${n.y}px;">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                <strong class="typescale-label-large">${escapeHtml(n.label)}</strong>
                <button type="button" data-del-node="${n.id}" style="background: none; border: none; cursor: pointer; color: inherit;" aria-label="Remover nó">×</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const canvas = container.querySelector('#flow-canvas');
    canvas.querySelectorAll('[data-node-id]').forEach(el => {
      el.addEventListener('pointerdown', e => {
        if (e.target.closest('button')) return;
        const nid = el.dataset.nodeId;
        const startX = e.clientX;
        const startY = e.clientY;
        const origX = parseFloat(el.style.left);
        const origY = parseFloat(el.style.top);
        el.setPointerCapture(e.pointerId);

        const onMove = ev => {
          el.style.left = `${Math.max(0, origX + (ev.clientX - startX))}px`;
          el.style.top = `${Math.max(0, origY + (ev.clientY - startY))}px`;
        };
        const onUp = () => {
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerup', onUp);
          store.updateMethod(project.id, stageKey, method.id, m => {
            const target = m.templateData.nodes.find(x => x.id === nid);
            if (target) {
              target.x = parseFloat(el.style.left);
              target.y = parseFloat(el.style.top);
            }
          });
        };
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerup', onUp);
      });
    });

    container.querySelector('#add-node-form').addEventListener('submit', e => {
      e.preventDefault();
      const label = container.querySelector('#nd-label').value.trim();
      const type = container.querySelector('#nd-type').value;
      if (!label) return;
      store.updateMethod(project.id, stageKey, method.id, m => {
        const newId = generateId('nd');
        const prev = m.templateData.nodes[m.templateData.nodes.length - 1];
        m.templateData.nodes.push({ id: newId, label, type, x: prev ? Math.min(680, prev.x + 160) : 40, y: prev ? prev.y + 40 : 60 });
        if (prev) m.templateData.edges.push({ from: prev.id, to: newId });
      });
    });

    container.querySelectorAll('[data-del-node]').forEach(btn => btn.addEventListener('click', () => {
      const id = btn.dataset.delNode;
      store.updateMethod(project.id, stageKey, method.id, m => {
        m.templateData.nodes = m.templateData.nodes.filter(n => n.id !== id);
        m.templateData.edges = m.templateData.edges.filter(ed => ed.from !== id && ed.to !== id);
      });
    }));

    return true;
  }

  return false;
}