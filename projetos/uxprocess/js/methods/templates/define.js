import { store } from '../../store.js';
import { generateId } from '../../schema.js';
import { escapeHtml, announce } from '../../ui.js';

export function renderDefineTemplate(container, project, stageKey, method) {
  const cid = method.catalogId || '';
  method.templateData = method.templateData || {};

  // 1. PERSONA (Múltiplas personas visuais completas)
  if (cid === 'def-uu-1') {
    if (!Array.isArray(method.templateData.personas)) {
      method.templateData.personas = [
        { id: generateId('prs'), name: 'Camila Andrade, 32', role: 'Analista Financeira', quote: 'Preciso resolver transferências entre reuniões sem medo de errar.', goals: 'Agilidade e clareza nos dados do recebedor.', pains: 'Telas confusas e letras pequenas no comprovante.' }
      ];
    }
    const personas = method.templateData.personas;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 class="typescale-title-large">Personas do Projeto (${personas.length})</h3>
          <button type="button" class="btn btn-filled" id="add-persona-btn">+ Nova Persona</button>
        </div>

        ${personas.map((p, idx) => `
          <article class="card card-elevated persona-card">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center;">
              <div style="width: 88px; height: 88px; border-radius: 50%; background: var(--ux-stage-define-container); color: var(--ux-stage-define-on-container); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700;">
                ${escapeHtml((p.name || 'P')[0].toUpperCase())}
              </div>
              <button type="button" class="btn btn-text" data-del-prs="${idx}" style="color: var(--md-sys-color-error); min-height: 36px;">Remover</button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
              <div class="field-group"><label class="field-label">Nome & Idade</label><input class="field-input" data-prs="${idx}:name" value="${escapeHtml(p.name)}"></div>
              <div class="field-group"><label class="field-label">Ocupação / Contexto</label><input class="field-input" data-prs="${idx}:role" value="${escapeHtml(p.role)}"></div>
              <div class="field-group" style="grid-column: 1 / -1;"><label class="field-label">Citação-chave</label><input class="field-input" data-prs="${idx}:quote" value="${escapeHtml(p.quote)}"></div>
              <div class="field-group"><label class="field-label">Objetivos & Necessidades</label><textarea class="field-textarea" data-prs="${idx}:goals">${escapeHtml(p.goals)}</textarea></div>
              <div class="field-group"><label class="field-label">Dores & Frustrações</label><textarea class="field-textarea" data-prs="${idx}:pains">${escapeHtml(p.pains)}</textarea></div>
            </div>
          </article>
        `).join('')}
      </div>
    `;

    container.querySelector('#add-persona-btn').addEventListener('click', () => {
      store.updateMethod(project.id, stageKey, method.id, m => {
        m.templateData.personas.push({ id: generateId('prs'), name: 'Nova Persona', role: '', quote: '', goals: '', pains: '' });
      });
    });
    container.querySelectorAll('[data-prs]').forEach(el => el.addEventListener('change', () => {
      const [idx, key] = el.dataset.prs.split(':');
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.personas[Number(idx)][key] = el.value; });
    }));
    container.querySelectorAll('[data-del-prs]').forEach(btn => btn.addEventListener('click', () => {
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.personas.splice(Number(btn.dataset.delPrs), 1); });
    }));
    return true;
  }

  // 2. QUADROS DE POST-ITS ARRASTÁVEIS (Mapa de Empatia / Afinidade / Matriz 2x2 Impacto x Esforço)
  if (['def-uu-2', 'def-rp-1', 'def-rp-2'].includes(cid)) {
    const isMatrix = cid === 'def-rp-1';
    const isEmpathy = cid === 'def-uu-2';

    const defaultCols = isMatrix
      ? [
          { id: 'q1', title: 'Alto Impacto / Baixo Esforço (Quick Wins)' },
          { id: 'q2', title: 'Alto Impacto / Alto Esforço (Projetos Maiores)' },
          { id: 'q3', title: 'Baixo Impacto / Baixo Esforço (Preenchimento)' },
          { id: 'q4', title: 'Baixo Impacto / Alto Esforço (Evitar)' }
        ]
      : isEmpathy
      ? [
          { id: 'pensa', title: 'Pensa & Sente' },
          { id: 'diz', title: 'Diz & Faz' },
          { id: 've', title: 'Vê & Ouve' },
          { id: 'dores', title: 'Dores & Ganhos' }
        ]
      : [
          { id: 'g1', title: 'Cluster 1 — Usabilidade' },
          { id: 'g2', title: 'Cluster 2 — Confiança & Segurança' },
          { id: 'g3', title: 'Cluster 3 — Performance & Fluxo' }
        ];

    if (!Array.isArray(method.templateData.cards)) {
      method.templateData.cards = [
        { id: generateId('pi'), col: defaultCols[0].id, text: 'Destacar nome e banco do recebedor antes do PIN', color: 'yellow' },
        { id: generateId('pi'), col: defaultCols[1].id, text: 'Salvar contatos favoritos com apelido visual', color: 'blue' }
      ];
    }

    const cards = method.templateData.cards;

    container.innerHTML = `
      <div class="card card-elevated">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div>
            <h3 class="typescale-title-large">${isMatrix ? 'Matriz 2x2: Impacto x Esforço' : isEmpathy ? 'Mapa de Empatia Interativo' : 'Mapa de Afinidade / Agrupamento'}</h3>
            <p class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">Arraste os post-its entre os quadrantes ou use o seletor de destino para mover.</p>
          </div>
          <form id="add-pi-form" style="display: flex; gap: 8px; flex-wrap: wrap;">
            <input type="text" id="pi-text" class="field-input" style="min-width: 220px;" placeholder="Novo post-it..." required>
            <select id="pi-color" class="field-select" style="width: auto;">
              <option value="yellow">Amarelo</option>
              <option value="pink">Rosa</option>
              <option value="blue">Azul</option>
              <option value="green">Verde</option>
            </select>
            <button type="submit" class="btn btn-filled">+ Post-it</button>
          </form>
        </div>

        <div class="${isMatrix ? 'matrix-2x2' : 'sticky-board-grid'}">
          ${defaultCols.map(col => `
            <div class="quadrant-box" data-drop-col="${col.id}">
              <h4 class="typescale-title-small">${escapeHtml(col.title)}</h4>
              ${cards.filter(c => c.col === col.id).map(c => `
                <div class="post-it" data-color="${c.color}" data-pi-id="${c.id}" tabindex="0">
                  <span>${escapeHtml(c.text)}</span>
                  <div style="display: flex; align-items: center; gap: 2px;">
                    <select aria-label="Mover post-it para" data-move-pi="${c.id}" style="background: rgba(255,255,255,0.5); border: none; border-radius: 4px; font-size: 11px; padding: 2px;">
                      ${defaultCols.map(opt => `<option value="${opt.id}" ${opt.id === c.col ? 'selected' : ''}>${escapeHtml(opt.title.split(' ')[0])}</option>`).join('')}
                    </select>
                    <button type="button" data-del-pi="${c.id}" style="background: none; border: none; cursor: pointer; font-weight: bold;" aria-label="Remover">×</button>
                  </div>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelector('#add-pi-form').addEventListener('submit', e => {
      e.preventDefault();
      const text = container.querySelector('#pi-text').value.trim();
      const color = container.querySelector('#pi-color').value;
      if (!text) return;
      store.updateMethod(project.id, stageKey, method.id, m => {
        m.templateData.cards.push({ id: generateId('pi'), col: defaultCols[0].id, text, color });
      });
    });

    // Pointer Events Drag & Drop entre quadrantes
    container.querySelectorAll('[data-pi-id]').forEach(cardEl => {
      cardEl.addEventListener('pointerdown', e => {
        if (e.target.closest('select, button')) return;
        const piId = cardEl.dataset.piId;
        cardEl.style.opacity = '0.6';
        cardEl.setPointerCapture(e.pointerId);

        const onMove = ev => {
          const box = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('[data-drop-col]');
          container.querySelectorAll('[data-drop-col]').forEach(b => b.classList.remove('drag-over'));
          if (box) box.classList.add('drag-over');
        };

        const onUp = ev => {
          cardEl.style.opacity = '1';
          cardEl.removeEventListener('pointermove', onMove);
          cardEl.removeEventListener('pointerup', onUp);
          const box = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('[data-drop-col]');
          container.querySelectorAll('[data-drop-col]').forEach(b => b.classList.remove('drag-over'));
          if (box) {
            store.updateMethod(project.id, stageKey, method.id, m => {
              const targetCard = m.templateData.cards.find(x => x.id === piId);
              if (targetCard) targetCard.col = box.dataset.dropCol;
            });
            announce('Post-it movido.');
          }
        };

        cardEl.addEventListener('pointermove', onMove);
        cardEl.addEventListener('pointerup', onUp);
      });
    });

    container.querySelectorAll('[data-move-pi]').forEach(sel => sel.addEventListener('change', () => {
      store.updateMethod(project.id, stageKey, method.id, m => {
        const targetCard = m.templateData.cards.find(x => x.id === sel.dataset.movePi);
        if (targetCard) targetCard.col = sel.value;
      });
    }));

    container.querySelectorAll('[data-del-pi]').forEach(btn => btn.addEventListener('click', () => {
      store.updateMethod(project.id, stageKey, method.id, m => {
        m.templateData.cards = m.templateData.cards.filter(x => x.id !== btn.dataset.delPi);
      });
    }));
    return true;
  }

  // 3. DECLARAÇÃO DO PROBLEMA / PROPOSTA DE VALOR / HOW MIGHT WE
  if (['def-rp-4', 'def-rp-5', 'def-rp-6'].includes(cid)) {
    const data = method.templateData;
    container.innerHTML = `
      <div class="card card-elevated">
        <h3 class="typescale-title-large" style="margin-bottom: 12px;">Enquadramento Estratégico do Problema</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
          <div class="field-group">
            <label class="field-label">Usuário (Quem enfrenta o problema?)</label>
            <input class="field-input" id="ps-user" value="${escapeHtml(data.user || '')}" placeholder="Ex: Clientes que fazem transferências recorrentes">
          </div>
          <div class="field-group">
            <label class="field-label">Necessidade (O que precisa fazer?)</label>
            <input class="field-input" id="ps-need" value="${escapeHtml(data.need || '')}" placeholder="Ex: Confirmar com segurança os dados do recebedor">
          </div>
          <div class="field-group" style="grid-column: 1 / -1;">
            <label class="field-label">Insight / Por quê? (O que descobrimos na pesquisa?)</label>
            <input class="field-input" id="ps-insight" value="${escapeHtml(data.insight || '')}" placeholder="Ex: Porque a tela atual oculta o banco e gera medo de fraude">
          </div>
          <div class="field-group" style="grid-column: 1 / -1;">
            <label class="field-label">Pergunta "Como poderíamos…?" (How Might We)</label>
            <textarea class="field-textarea" id="ps-hmw" placeholder="Como poderíamos tornar a revisão de transferência instantânea e à prova de erros?">${escapeHtml(data.hmw || '')}</textarea>
          </div>
        </div>
      </div>
    `;
    ['user', 'need', 'insight', 'hmw'].forEach(k => {
      container.querySelector(`#ps-${k}`).addEventListener('change', e => {
        store.updateMethod(project.id, stageKey, method.id, m => { m.templateData[k] = e.target.value; });
      });
    });
    return true;
  }

  // 4. USER STORIES (Formato "Como... quero... para..." + MoSCoW)
  if (cid === 'def-uu-5') {
    method.templateData.stories = Array.isArray(method.templateData.stories) ? method.templateData.stories : [];
    const stories = method.templateData.stories;

    container.innerHTML = `
      <div class="card card-elevated">
        <h3 class="typescale-title-large" style="margin-bottom: 12px;">Backlog de User Stories</h3>
        <form id="add-us-form" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 16px;">
          <input class="field-input" id="us-as" placeholder="Como [persona]..." required>
          <input class="field-input" id="us-want" placeholder="Quero [ação]..." required>
          <input class="field-input" id="us-so" placeholder="Para [benefício]..." required>
          <select class="field-select" id="us-moscow">
            <option value="Must Have">Must Have</option>
            <option value="Should Have">Should Have</option>
            <option value="Could Have">Could Have</option>
          </select>
          <button type="submit" class="btn btn-filled">+ Adicionar Story</button>
        </form>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${stories.map((s, idx) => `
            <div style="padding: 12px; border-radius: 10px; background: var(--md-sys-color-surface-container-low); display: flex; justify-content: space-between; align-items: center; gap: 12px;">
              <div>
                <span class="status-badge" style="margin-bottom: 4px;">${escapeHtml(s.moscow)}</span>
                <p class="typescale-body-medium"><strong>Como</strong> ${escapeHtml(s.as)}, <strong>quero</strong> ${escapeHtml(s.want)}, <strong>para</strong> ${escapeHtml(s.so)}.</p>
              </div>
              <button type="button" class="icon-btn" data-del-us="${idx}"><span class="material-symbols-outlined">delete</span></button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    container.querySelector('#add-us-form').addEventListener('submit', e => {
      e.preventDefault();
      store.updateMethod(project.id, stageKey, method.id, m => {
        m.templateData.stories.unshift({
          as: container.querySelector('#us-as').value.trim(),
          want: container.querySelector('#us-want').value.trim(),
          so: container.querySelector('#us-so').value.trim(),
          moscow: container.querySelector('#us-moscow').value
        });
      });
    });
    container.querySelectorAll('[data-del-us]').forEach(btn => btn.addEventListener('click', () => {
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.stories.splice(Number(btn.dataset.delUs), 1); });
    }));
    return true;
  }

  return false;
}