import { store } from '../../store.js';
import { escapeHtml, showSnackbar } from '../../ui.js';

const SUS_QUESTIONS = [
  '1. Acho que gostaria de usar este sistema com frequência.',
  '2. Achei o sistema desnecessariamente complexo.',
  '3. Achei o sistema fácil de usar.',
  '4. Acho que precisaria de ajuda de uma pessoa com conhecimentos técnicos para usar o sistema.',
  '5. Achei que as várias funções do sistema estavam muito bem integradas.',
  '6. Achei que havia muita inconsistência neste sistema.',
  '7. Imagino que a maioria das pessoas aprenderia a usar este sistema rapidamente.',
  '8. Achei o sistema muito atrapalhado/difícil de usar.',
  '9. Senti-me muito confiante usando o sistema.',
  '10. Precisei aprender várias coisas novas antes de conseguir usar o sistema.'
];

export function renderPrototypeEvaluateTemplate(container, project, stageKey, method) {
  const cid = method.catalogId || '';
  method.templateData = method.templateData || {};

  // 1. CANVAS DE DESENHO LIVRE (Protótipo de Papel / Wireframe)
  if (['pro-pp-1', 'pro-wf-1'].includes(cid)) {
    container.innerHTML = `
      <div class="card card-elevated">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 class="typescale-title-large">Canvas de Esboço Rápido (Wireframe / Papel)</h3>
            <p class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">Desenhe fluxos ou telas usando mouse, dedo ou caneta e salve direto no método.</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn btn-outlined" id="sketch-clear">Limpar</button>
            <button type="button" class="btn btn-filled" id="sketch-save">Salvar Esboço</button>
          </div>
        </div>
        <canvas id="wireframe-canvas" width="900" height="380" style="width: 100%; height: 380px; background: #FFFFFF; border: 1px solid var(--md-sys-color-outline); border-radius: 12px; touch-action: none; cursor: crosshair;"></canvas>
      </div>
    `;

    const canvas = container.querySelector('#wireframe-canvas');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1A1B21';

    if (method.templateData.sketchDataUrl) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = method.templateData.sketchDataUrl;
    }

    let drawing = false;
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    canvas.addEventListener('pointerdown', e => {
      drawing = true;
      const p = getPos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', e => {
      if (!drawing) return;
      const p = getPos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    });
    canvas.addEventListener('pointerup', () => { drawing = false; });

    container.querySelector('#sketch-clear').addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    container.querySelector('#sketch-save').addEventListener('click', () => {
      const dataUrl = canvas.toDataURL('image/png');
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.sketchDataUrl = dataUrl; });
      showSnackbar('Esboço salvo no método!');
    });
    return true;
  }

  // 2. SURVEY SUS (System Usability Scale — Cálculo Automático 0 a 100)
  if (cid === 'eva-ut-2') {
    if (!Array.isArray(method.templateData.susScores)) {
      method.templateData.susScores = [4, 2, 4, 2, 4, 2, 4, 2, 4, 2]; // Média inicial ~70
    }
    const scores = method.templateData.susScores;

    // Fórmula padrão Brooke (1996): ímpares (val - 1), pares (5 - val), soma * 2.5
    let rawSum = 0;
    scores.forEach((val, idx) => {
      rawSum += (idx % 2 === 0) ? (val - 1) : (5 - val);
    });
    const susTotal = Math.round(rawSum * 2.5 * 10) / 10;
    const grade = susTotal >= 80.3 ? 'A (Excelente)' : susTotal >= 68 ? 'B/C (Acima da média - Aceitável)' : 'D/F (Abaixo da média - Requer melhorias)';

    container.innerHTML = `
      <div class="card card-elevated" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="sus-score-banner">
          <div>
            <div class="typescale-label-large">SCORE SUS CALCULADO</div>
            <div class="typescale-display-small" style="font-weight: 700;">${susTotal} / 100</div>
          </div>
          <div>
            <div class="typescale-title-medium">Classificação: ${grade}</div>
            <div class="typescale-body-small">Benchmark global de usabilidade: 68 pontos</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${SUS_QUESTIONS.map((q, idx) => `
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; padding: 10px; border-radius: 10px; background: var(--md-sys-color-surface-container-low);">
              <span class="typescale-body-medium" style="flex: 1; min-width: 240px;">${escapeHtml(q)}</span>
              <div style="display: flex; gap: 6px; align-items: center;">
                <span class="typescale-label-small">Discordo</span>
                ${[1, 2, 3, 4, 5].map(n => `
                  <button type="button" class="chip ${scores[idx] === n ? 'selected' : ''}" style="min-width: 40px; min-height: 40px; padding: 0; justify-content: center;" data-sus="${idx}:${n}">${n}</button>
                `).join('')}
                <span class="typescale-label-small">Concordo</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('[data-sus]').forEach(btn => btn.addEventListener('click', () => {
      const [qIdx, val] = btn.dataset.sus.split(':').map(Number);
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.susScores[qIdx] = val; });
    }));
    return true;
  }

  // 3. DECISÃO GO / NO-GO (Integrada ao Roadmap)
  if (['eva-sy-2', 'eva-sy-3', 'eva-sy-4'].includes(cid)) {
    const data = method.templateData;
    container.innerHTML = `
      <div class="card card-elevated">
        <h3 class="typescale-title-large" style="margin-bottom: 12px;">Portão de Decisão: Go / No-Go</h3>
        <div class="field-group">
          <label class="field-label" for="gng-decision">Decisão do Comitê / Time</label>
          <select id="gng-decision" class="field-select">
            <option value="pending" ${data.decision === 'pending' ? 'selected' : ''}>Em avaliação</option>
            <option value="go" ${data.decision === 'go' ? 'selected' : ''}>GO — Solução validada! Pronta para entrega/lançamento</option>
            <option value="nogo" ${data.decision === 'nogo' ? 'selected' : ''}>NO-GO — Necessário iterar e voltar a uma etapa anterior</option>
          </select>
        </div>
        <div class="field-group">
          <label class="field-label" for="gng-rationale">Justificativa e métricas que embasam a decisão</label>
          <textarea id="gng-rationale" class="field-textarea" placeholder="Registre os critérios atendidos ou os bloqueios encontrados...">${escapeHtml(data.rationale || '')}</textarea>
        </div>
        ${data.decision === 'nogo' ? `
          <div style="padding: 14px; border-radius: 12px; background: var(--md-sys-color-error-container); color: var(--md-sys-color-on-error-container); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px;">
            <span><strong>No-Go registrado:</strong> Crie uma tarefa de iteração diretamente no Roadmap para corrigir os pontos levantados.</span>
            <button type="button" class="btn btn-filled" id="nogo-create-rm">Criar Ciclo de Iteração no Roadmap</button>
          </div>
        ` : data.decision === 'go' ? `
          <div style="padding: 14px; border-radius: 12px; background: var(--ux-stage-evaluate-container); color: var(--ux-stage-evaluate-on-container);">
            <strong>🎉 Se Go, você ganhou!</strong> Solução validada e pronta para handoff final.
          </div>
        ` : ''}
      </div>
    `;

    container.querySelector('#gng-decision').addEventListener('change', e => {
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.decision = e.target.value; });
    });
    container.querySelector('#gng-rationale').addEventListener('change', e => {
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.rationale = e.target.value; });
    });
    container.querySelector('#nogo-create-rm')?.addEventListener('click', () => {
      store.addCustomRoadmapItem(project.id, {
        title: `Iteração pós No-Go (${method.titlePt})`,
        stageKey: 'prototype',
        priority: 'high'
      });
      showSnackbar('Item de iteração adicionado ao Roadmap!');
    });
    return true;
  }

  return false;
}