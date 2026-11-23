import { store } from '../../store.js';
import { escapeHtml } from '../../ui.js';

const NIELSEN_HEURISTICS = [
  '1. Visibilidade do status do sistema',
  '2. Correspondência entre o sistema e o mundo real',
  '3. Controle e liberdade do usuário',
  '4. Consistência e padrões',
  '5. Prevenção de erros',
  '6. Reconhecimento em vez de memorização',
  '7. Flexibilidade e eficiência de uso',
  '8. Estética e design minimalista',
  '9. Ajudar usuários a reconhecer, diagnosticar e recuperar-se de erros',
  '10. Ajuda e documentação'
];

export function renderDiscoverTemplate(container, project, stageKey, method) {
  const cid = method.catalogId || '';
  method.templateData = method.templateData || {};

  // 1. Grupo Stakeholders (6 perguntas estruturadas)
  if (cid.startsWith('disc-st-')) {
    const prompts = {
      'disc-st-1': { q: 'O que exatamente queremos construir ou melhorar?', placeholder: 'Descreva o produto, funcionalidade, escopo inicial e o que está fora de escopo...' },
      'disc-st-2': { q: 'Para quem estamos projetando? (Segmentos, perfis, contexto de uso)', placeholder: 'Quem são os usuários finais, compradores e influenciadores...' },
      'disc-st-3': { q: 'Por quê? Qual o objetivo de negócio e impacto esperado?', placeholder: 'Aumento de conversão, retenção, redução de chamados de suporte...' },
      'disc-st-4': { q: 'Quem são os concorrentes diretos e indiretos?', placeholder: 'Liste concorrentes, diferenciais e benchmarks de mercado...' },
      'disc-st-5': { q: 'Quais métricas (KPIs) definirão o sucesso?', placeholder: 'Ex: Taxa de conclusão > 85%, NPS +15 pontos, tempo de tarefa < 30s...' },
      'disc-st-6': { q: 'Quais limitações técnicas, legais ou de prazo existem?', placeholder: 'APIs legadas, LGPD, prazo regulatório, orçamento...' }
    };
    const info = prompts[cid];
    const data = method.templateData;

    container.innerHTML = `
      <div class="card card-elevated">
        <h3 class="typescale-title-large" style="margin-bottom: 12px;">Alinhamento com Stakeholders</h3>
        <div class="field-group">
          <label class="field-label" for="st-ans">${escapeHtml(info.q)}</label>
          <textarea id="st-ans" class="field-textarea" style="min-height: 130px;" placeholder="${escapeHtml(info.placeholder)}">${escapeHtml(data.answer || '')}</textarea>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
          <div class="field-group">
            <label class="field-label" for="st-who">Stakeholders entrevistados / fontes</label>
            <input type="text" id="st-who" class="field-input" value="${escapeHtml(data.stakeholders || '')}" placeholder="Ex: PM, Tech Lead, Diretor Comercial">
          </div>
          <div class="field-group">
            <label class="field-label" for="st-risk">Risco ou premissa crítica identificada</label>
            <input type="text" id="st-risk" class="field-input" value="${escapeHtml(data.criticalRisk || '')}" placeholder="Ex: Dependência de aprovação jurídica">
          </div>
        </div>
      </div>
    `;
    container.querySelector('#st-ans').addEventListener('change', e => store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.answer = e.target.value; }));
    container.querySelector('#st-who').addEventListener('change', e => store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.stakeholders = e.target.value; }));
    container.querySelector('#st-risk').addEventListener('change', e => store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.criticalRisk = e.target.value; }));
    return true;
  }

  // 2. Avaliação Heurística de Especialista (10 Heurísticas de Nielsen)
  if (cid === 'disc-dt-4') {
    if (!Array.isArray(method.templateData.heuristics)) {
      method.templateData.heuristics = NIELSEN_HEURISTICS.map(h => ({ name: h, severity: 0, note: '' }));
    }
    const items = method.templateData.heuristics;

    container.innerHTML = `
      <div class="card card-elevated">
        <h3 class="typescale-title-large" style="margin-bottom: 6px;">Avaliação Heurística (10 Heurísticas de Nielsen)</h3>
        <p class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant); margin-bottom: 16px;">
          Severidade: 0 = Sem problema | 1 = Cosmético | 2 = Menor | 3 = Grave | 4 = Catastrófico
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${items.map((h, idx) => `
            <div style="display: grid; grid-template-columns: minmax(220px, 1.2fr) 140px 2fr; gap: 10px; align-items: center; padding: 10px; border-radius: 10px; background: var(--md-sys-color-surface-container-low);">
              <strong class="typescale-body-medium">${escapeHtml(h.name)}</strong>
              <select class="field-select" data-h-sev="${idx}" style="min-height: 40px;">
                ${[0, 1, 2, 3, 4].map(s => `<option value="${s}" ${Number(h.severity) === s ? 'selected' : ''}>Sev. ${s}</option>`).join('')}
              </select>
              <input type="text" class="field-input" style="min-height: 40px;" data-h-note="${idx}" value="${escapeHtml(h.note)}" placeholder="Onde ocorre e recomendação...">
            </div>
          `).join('')}
        </div>
      </div>
    `;
    container.querySelectorAll('[data-h-sev]').forEach(sel => sel.addEventListener('change', () => {
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.heuristics[Number(sel.dataset.hSev)].severity = Number(sel.value); });
    }));
    container.querySelectorAll('[data-h-note]').forEach(inp => inp.addEventListener('change', () => {
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.heuristics[Number(inp.dataset.hNote)].note = inp.value; });
    }));
    return true;
  }

  // 3. Entrevistas / Surveys / Grupos Focais
  if (cid.startsWith('disc-ur-')) {
    const data = method.templateData;
    data.quotes = Array.isArray(data.quotes) ? data.quotes : [];

    container.innerHTML = `
      <div class="card card-elevated">
        <h3 class="typescale-title-large" style="margin-bottom: 12px;">Roteiro & Citações Destacadas (Verbatims)</h3>
        <div class="field-group">
          <label class="field-label" for="ur-script">Roteiro de Perguntas / Estrutura</label>
          <textarea id="ur-script" class="field-textarea" placeholder="1. Quebra-gelo...&#10;2. Contexto atual...&#10;3. Tarefa principal...">${escapeHtml(data.script || '')}</textarea>
        </div>

        <form id="add-quote-form" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;">
          <input type="text" id="q-author" class="field-input" style="max-width: 180px;" placeholder="Participante (ex: P04)" required>
          <input type="text" id="q-text" class="field-input" style="flex: 1; min-width: 220px;" placeholder="Citação literal marcante do usuário..." required>
          <button type="submit" class="btn btn-tonal">+ Citação</button>
        </form>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${data.quotes.map((q, idx) => `
            <blockquote style="padding: 10px 14px; border-left: 4px solid var(--ux-stage-discover); background: var(--md-sys-color-surface-container-low); border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
              <div><em>"${escapeHtml(q.text)}"</em> — <strong>${escapeHtml(q.author)}</strong></div>
              <button type="button" class="icon-btn" data-del-q="${idx}"><span class="material-symbols-outlined">close</span></button>
            </blockquote>
          `).join('')}
        </div>
      </div>
    `;
    container.querySelector('#ur-script').addEventListener('change', e => store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.script = e.target.value; }));
    container.querySelector('#add-quote-form').addEventListener('submit', e => {
      e.preventDefault();
      const author = container.querySelector('#q-author').value.trim();
      const text = container.querySelector('#q-text').value.trim();
      if (!author || !text) return;
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.quotes.unshift({ author, text }); });
    });
    container.querySelectorAll('[data-del-q]').forEach(btn => btn.addEventListener('click', () => {
      store.updateMethod(project.id, stageKey, method.id, m => { m.templateData.quotes.splice(Number(btn.dataset.delQ), 1); });
    }));
    return true;
  }

  return false;
}