(function() {
  const { uid, esc, icon, showSnackbar, announce } = window.UXR;

  function ensureTemplateData(method, templateKey) {
    if (!method.blocks.specialized) method.blocks.specialized = {};
    const sp = method.blocks.specialized;
    switch (templateKey) {
      case 'field_interviews':
        if (!sp.contextChecklist) sp.contextChecklist = [
          { id: uid('chk'), text: 'Observar em contexto: registrar o que fazem, não só o que dizem', done: false },
          { id: uid('chk'), text: 'Evitar perguntas sobre o futuro ("você usaria...") — focar em fatos passados', done: false }
        ];
        if (!sp.timestampNotes) sp.timestampNotes = [{ id: uid('ts'), time: '00:04:15', participant: 'P01', tag: 'workaround', note: 'Abriu bloco de notas externo para copiar código.' }];
        break;
      case 'diary_study':
        if (!sp.diaryConfig) sp.diaryConfig = { durationDays: 7, frequency: 'Diária', prompt: 'Qual tarefa você tentou fazer hoje e onde travou?' };
        if (!sp.diaryEntries) sp.diaryEntries = [{ id: uid('dry'), day: 'Dia 1', participant: 'P01', trigger: 'Mobile', frustration: 4, text: 'Botão cortado na tela.' }];
        break;
      case 'stakeholder_interviews':
        if (!sp.stakeholders) sp.stakeholders = [{ id: uid('stk'), name: 'Diretoria de Produto', quadrant: 'high_high', goal: 'Aumentar conversão', assumption: 'Falta meio de pagamento' }];
        break;
      case 'requirements_constraints':
        if (!sp.requirements) sp.requirements = [{ id: uid('req'), title: 'Consentimento LGPD', origin: 'Jurídico', type: 'legal', priority: 'Alta', impact: 'Aceite explícito.' }];
        break;
      case 'sales_support_interviews':
        if (!sp.frontlineIssues) sp.frontlineIssues = [{ id: uid('frt'), category: 'Pior problema', issue: 'Dúvida sobre compensação', frequency: 'Alta', team: 'Suporte' }];
        break;
      case 'support_call_monitoring':
        if (!sp.callLogs) sp.callLogs = [{ id: uid('cal'), userTerm: '"Cancelar cobrança"', systemTerm: '"Estorno de fatura"', explanation: 'Atendente orienta acessar Histórico.' }];
        break;
      case 'competitive_testing':
        if (!sp.compTests) sp.compTests = [{ id: uid('cpt'), competitor: 'Concorrente A', task: 'Checkout', strengths: 'Frete visível', weaknesses: 'Form longo', userPraise: 'Transparência' }];
        break;
      case 'competitive_analysis':
        if (!sp.compMatrix) sp.compMatrix = [{ id: uid('cmp'), criterion: 'Clareza de preços', ourScore: 2, compAScore: 5, compBScore: 4, notes: 'Resumo fixo.' }];
        break;
      case 'design_review':
        if (!sp.heuristics) sp.heuristics = [{ id: uid('heu'), heuristic: '1. Visibilidade do status', finding: 'Falta indicador de progresso', severity: 3 }];
        break;
      case 'persona_building':
        if (!sp.personas) sp.personas = [{ id: uid('prs'), name: 'Mariana — Compradora Pragmática', role: 'Analista, 34 anos', quote: '“Se eu não vejo o valor final logo de cara, fecho o site.”', goals: 'Concluir rápido', pains: 'Taxas escondidas', behaviors: 'Usa Pix', evidenceSource: 'Entrevistas P01, P03' }];
        break;
      case 'task_analysis':
        if (!sp.tasks) sp.tasks = [{ id: uid('tsk'), step: '1. Revisar carrinho', subtask: 'Conferir cupom', effort: 'Baixo', friction: 'Campo oculto', opportunity: 'Expandir campo' }];
        break;
      case 'journey_mapping':
        if (!sp.journeySteps) sp.journeySteps = [
          { id: uid('jrn'), stage: 'Descoberta', action: 'Adiciona ao carrinho', thought: '“Ótimo preço.”', emotion: 2, touchpoint: 'App', pain: 'Nenhuma', opportunity: 'Estimar frete', churnRisk: 'Baixo' },
          { id: uid('jrn'), stage: 'Frete & Pagamento', action: 'Vê valor final', thought: '“Subiu 30%!”', emotion: -2, touchpoint: 'Checkout', pain: 'Surpresa tardia', opportunity: 'Transparência no carrinho', churnRisk: 'Alto' }
        ];
        break;
      case 'hcd_exploration':
      case 'design_diversity':
        if (!sp.alternatives) sp.alternatives = [{ id: uid('alt'), name: 'Alternativa A', pros: 'Visão total', cons: 'Tela longa', selectedParts: 'Resumo fixo' }];
        break;
      case 'pluralistic_walkthrough':
        if (!sp.walkthroughScreens) sp.walkthroughScreens = [{ id: uid('wlk'), screen: 'Tela 01 — Carrinho', userNote: 'Procuro frete', devNote: 'Endpoint CEP', consolidated: 'Input de CEP no carrinho' }];
        break;
      case 'prototype_testing':
        if (!sp.protoRuns) sp.protoRuns = [{ id: uid('prt'), participant: 'P01', task: 'Simular frete', success: 'Sucesso', errors: 0, note: 'Sem hesitar.' }];
        break;
      case 'user_stories':
        if (!sp.stories) sp.stories = [{ id: uid('ust'), persona: 'Mariana', want: 'calcular frete no carrinho', benefit: 'saber o total antes', moscow: 'Must have', acceptance: 'Exibir em <2s.' }];
        break;
      case 'card_sorting':
        if (!sp.cardSort) sp.cardSort = { mode: method.variant === 'closed' ? 'closed' : 'open', categories: ['Minha Conta', 'Pedidos', 'Pagamentos'], cards: [{ id: uid('crd'), label: 'Rastrear pacote', category: 'Pedidos' }, { id: uid('crd'), label: 'Segunda via boleto', category: 'Pagamentos' }] };
        break;
      case 'qual_usability_testing':
        if (!sp.thinkAloudChecklist) sp.thinkAloudChecklist = [{ id: uid('chk'), text: 'Explicar think-aloud: "Estamos testando o design, não você"', done: true }];
        if (!sp.usabilitySessions) sp.usabilitySessions = [{ id: uid('usb'), participant: 'P01', task: 'Concluir compra', completed: 'Com dificuldade', timeSec: 145, errors: 2, severity: 'Alta', notes: 'Foco perdido no cupom.' }];
        break;
      case 'benchmark_testing':
        if (!sp.benchmarks) sp.benchmarks = [{ id: uid('bnk'), task: 'T1: Checkout', cycle1Success: 58, currentSuccess: 86, cycle1TimeSec: 190, currentTimeSec: 112 }];
        break;
      case 'accessibility_evaluation':
        if (!sp.wcagChecks) sp.wcagChecks = [{ id: uid('wcg'), principle: 'Operável', criterion: '2.1.1 Teclado', status: 'Aprovado', severity: 'Baixa', fix: 'Validado.' }];
        break;
      case 'training_research':
      case 'community_monitoring':
        if (!sp.communityPosts) sp.communityPosts = [{ id: uid('com'), source: 'Fórum', date: new Date().toISOString().slice(0, 10), sentiment: 'Dúvida', topic: 'Estorno', note: 'Tópico fixo criado.' }];
        break;
      case 'surveys':
        if (!sp.surveyQuestions) sp.surveyQuestions = [{ id: uid('srv'), type: 'Escala Likert (1-5)', question: 'Facilidade de achar frete?', responsesSummary: 'Média 3.2/5' }];
        break;
      case 'analytics_review':
        if (!sp.analyticsFindings) sp.analyticsFindings = [{ id: uid('anl'), metric: 'Conversão Endereço -> Pagamento', value: '58%', qualQuestion: 'Por que abandonam após o CEP?' }];
        break;
      case 'search_log_analysis':
        if (!sp.searchLogs) sp.searchLogs = [{ id: uid('src'), term: 'pix parcelado', volume: 420, zeroResults: true, productTerm: 'Pagamento instantâneo', action: 'Adicionar sinônimo' }];
        break;
      case 'feedback_bug_faq_review':
        if (!sp.feedbackClusters) sp.feedbackClusters = [{ id: uid('fbk'), theme: 'Troca e devolução', count: 34, severity: 'Média', misunderstanding: 'Frete reverso', action: 'Selo troca grátis' }];
        break;
      case 'outreach_qa':
        if (!sp.qaItems) sp.qaItems = [{ id: uid('qai'), event: 'Demo Mensal', question: 'Funciona offline?', concern: 'Logística', recruitLead: 'Carlos (Operações)' }];
        break;
    }
  }

  function renderSimpleTable(title, listKey, rows, columns) {
    return `
      <section class="card card-elevated stack-v">
        <div class="stack-h" style="justify-content: space-between;">
          <h2 class="title-large">${esc(title)}</h2>
          <button type="button" class="btn btn-tonal btn-sm" data-sp-add="${esc(listKey)}">${icon('add')}<span>Adicionar linha</span></button>
        </div>
        <div class="m3-table-wrapper">
          <table class="m3-table">
            <thead><tr>${columns.map(c => `<th>${esc(c.label)}</th>`).join('')}<th>Ação</th></tr></thead>
            <tbody>
              ${rows.map((row, idx) => `
                <tr>
                  ${columns.map(c => `<td><input class="field-input" data-sp-edit="${esc(listKey)}:${idx}:${esc(c.key)}" value="${esc(row[c.key] ?? '')}" /></td>`).join('')}
                  <td><button type="button" class="icon-btn" data-sp-del="${esc(listKey)}:${idx}" aria-label="Remover">${icon('delete')}</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  window.UXR.renderSpecializedMethodWorkspace = function(method, templateKey) {
    ensureTemplateData(method, templateKey);
    const sp = method.blocks.specialized;
    switch (templateKey) {
      case 'field_interviews':
        return `
          <section class="card card-elevated stack-v">
            <h2 class="title-large">Checklist de Observação Contextual (NN/g)</h2>
            ${sp.contextChecklist.map(c => `<label style="display:flex;align-items:center;gap:12px;min-height:48px;"><input type="checkbox" data-sp-toggle="contextChecklist:${esc(c.id)}" ${c.done ? 'checked' : ''} /><span>${esc(c.text)}</span></label>`).join('')}
          </section>
          ${renderSimpleTable('Notas com Timestamp & Tags', 'timestampNotes', sp.timestampNotes, [{ key: 'time', label: 'Tempo' }, { key: 'participant', label: 'Participante' }, { key: 'tag', label: 'Tag' }, { key: 'note', label: 'Observação' }])}
        `;
      case 'diary_study':
        return renderSimpleTable('Registros do Diário Longitudinal', 'diaryEntries', sp.diaryEntries, [{ key: 'day', label: 'Dia' }, { key: 'participant', label: 'Participante' }, { key: 'trigger', label: 'Gatilho' }, { key: 'frustration', label: 'Frustração (1-5)' }, { key: 'text', label: 'Relato' }]);
      case 'stakeholder_interviews':
        return renderSimpleTable('Stakeholders, Influência & Suposições', 'stakeholders', sp.stakeholders, [{ key: 'name', label: 'Stakeholder' }, { key: 'quadrant', label: 'Quadrante' }, { key: 'goal', label: 'Objetivo' }, { key: 'assumption', label: 'Suposição a validar' }]);
      case 'requirements_constraints':
        return renderSimpleTable('Requisitos e Restrições', 'requirements', sp.requirements, [{ key: 'title', label: 'Requisito' }, { key: 'origin', label: 'Origem' }, { key: 'type', label: 'Tipo' }, { key: 'priority', label: 'Prioridade' }, { key: 'impact', label: 'Impacto' }]);
      case 'sales_support_interviews':
        return renderSimpleTable('Ranking de Dores: Vendas & Suporte', 'frontlineIssues', sp.frontlineIssues, [{ key: 'category', label: 'Categoria' }, { key: 'issue', label: 'Problema' }, { key: 'frequency', label: 'Frequência' }, { key: 'team', label: 'Equipe' }]);
      case 'support_call_monitoring':
        return renderSimpleTable('Vocabulário Usuário × Sistema', 'callLogs', sp.callLogs, [{ key: 'userTerm', label: 'Termo do usuário' }, { key: 'systemTerm', label: 'Termo do sistema' }, { key: 'explanation', label: 'Explicação do suporte' }]);
      case 'competitive_testing':
        return renderSimpleTable('Teste Competitivo', 'compTests', sp.compTests, [{ key: 'competitor', label: 'Concorrente' }, { key: 'task', label: 'Tarefa' }, { key: 'strengths', label: 'Forças' }, { key: 'weaknesses', label: 'Fraquezas' }, { key: 'userPraise', label: 'Elogios' }]);
      case 'competitive_analysis':
        return renderSimpleTable('Matriz Competitiva (0 a 5)', 'compMatrix', sp.compMatrix, [{ key: 'criterion', label: 'Critério' }, { key: 'ourScore', label: 'Nosso' }, { key: 'compAScore', label: 'Conc. A' }, { key: 'compBScore', label: 'Conc. B' }, { key: 'notes', label: 'Notas' }]);
      case 'design_review':
        return renderSimpleTable('Inspeção Heurística de Nielsen', 'heuristics', sp.heuristics, [{ key: 'heuristic', label: 'Heurística' }, { key: 'finding', label: 'Achado' }, { key: 'severity', label: 'Severidade (0-4)' }]);
      case 'persona_building':
        return `
          <section class="stack-v">
            <div class="stack-h" style="justify-content:space-between;"><h2 class="title-large">Personas Fundamentadas em Dados</h2><button type="button" class="btn btn-filled btn-sm" data-sp-add="personas">${icon('person_add')}<span>Nova Persona</span></button></div>
            ${sp.personas.map((p, i) => `
              <article class="persona-card">
                <div class="persona-header">
                  <div style="flex:1;"><input class="field-input" style="font-weight:700;margin-bottom:4px;" data-sp-edit="personas:${i}:name" value="${esc(p.name)}" /><input class="field-input" data-sp-edit="personas:${i}:role" value="${esc(p.role)}" /></div>
                  <button type="button" class="icon-btn" data-sp-del="personas:${i}">${icon('delete')}</button>
                </div>
                <div class="persona-quote"><input class="field-input" data-sp-edit="personas:${i}:quote" value="${esc(p.quote)}" /></div>
                <div class="persona-body">
                  <div class="field"><label class="field-label">Objetivos</label><textarea class="field-textarea" data-sp-edit="personas:${i}:goals">${esc(p.goals)}</textarea></div>
                  <div class="field"><label class="field-label">Dores</label><textarea class="field-textarea" data-sp-edit="personas:${i}:pains">${esc(p.pains)}</textarea></div>
                  <div class="field"><label class="field-label">Comportamentos</label><textarea class="field-textarea" data-sp-edit="personas:${i}:behaviors">${esc(p.behaviors)}</textarea></div>
                  <div class="field"><label class="field-label">Evidências de Origem</label><textarea class="field-textarea" data-sp-edit="personas:${i}:evidenceSource">${esc(p.evidenceSource)}</textarea></div>
                </div>
              </article>
            `).join('')}
          </section>
        `;
      case 'task_analysis':
        return renderSimpleTable('Análise de Tarefas', 'tasks', sp.tasks, [{ key: 'step', label: 'Etapa' }, { key: 'subtask', label: 'Subtarefas' }, { key: 'effort', label: 'Esforço' }, { key: 'friction', label: 'Fricção' }, { key: 'opportunity', label: 'Oportunidade' }]);
      case 'journey_mapping': {
        const steps = sp.journeySteps;
        const width = Math.max(640, steps.length * 180);
        const stepX = steps.length > 1 ? (width - 160) / (steps.length - 1) : 0;
        const pts = steps.map((s, idx) => ({ x: 80 + idx * stepX, y: 80 - Math.max(-2, Math.min(2, Number(s.emotion) || 0)) * 28, emotion: Number(s.emotion) || 0 }));
        return `
          <section class="card card-elevated stack-v">
            <div class="stack-h" style="justify-content:space-between;"><h2 class="title-large">Mapa de Jornada & Curva Emocional</h2><button type="button" class="btn btn-tonal btn-sm" data-sp-add="journeySteps">${icon('add')}<span>Nova etapa</span></button></div>
            <div class="journey-curve-box">
              <svg id="journey-svg" viewBox="0 0 ${width} 160" style="width:100%;min-width:600px;height:160px;">
                <line x1="20" y1="80" x2="${width - 20}" y2="80" stroke="var(--md-sys-color-outline-variant)" stroke-dasharray="4 4" />
                <polyline fill="none" stroke="var(--md-sys-color-primary)" stroke-width="3" points="${pts.map(p => `${p.x},${p.y}`).join(' ')}" />
                ${pts.map((pt, idx) => `<circle class="journey-point" data-journey-drag="${idx}" cx="${pt.x}" cy="${pt.y}" r="9" fill="var(--md-sys-color-primary)" />`).join('')}
              </svg>
            </div>
            ${renderSimpleTable('Etapas da Jornada', 'journeySteps', steps, [{ key: 'stage', label: 'Etapa' }, { key: 'emotion', label: 'Emoção (-2..+2)' }, { key: 'action', label: 'Ação' }, { key: 'pain', label: 'Dor' }, { key: 'opportunity', label: 'Oportunidade' }])}
          </section>
        `;
      }
      case 'hcd_exploration':
      case 'design_diversity':
        return renderSimpleTable('Exploração de Alternativas', 'alternatives', sp.alternatives, [{ key: 'name', label: 'Alternativa' }, { key: 'pros', label: 'Prós' }, { key: 'cons', label: 'Contras' }, { key: 'selectedParts', label: 'Partes selecionadas' }]);
      case 'pluralistic_walkthrough':
        return renderSimpleTable('Walkthrough Pluralista', 'walkthroughScreens', sp.walkthroughScreens, [{ key: 'screen', label: 'Tela' }, { key: 'userNote', label: 'Reação Usuário' }, { key: 'devNote', label: 'Nota Dev' }, { key: 'consolidated', label: 'Consolidado' }]);
      case 'prototype_testing':
        return renderSimpleTable('Testes de Protótipo', 'protoRuns', sp.protoRuns, [{ key: 'participant', label: 'Participante' }, { key: 'task', label: 'Tarefa' }, { key: 'success', label: 'Resultado' }, { key: 'errors', label: 'Erros' }, { key: 'note', label: 'Nota' }]);
      case 'user_stories':
        return renderSimpleTable('User Stories (MoSCoW)', 'stories', sp.stories, [{ key: 'persona', label: 'Como' }, { key: 'want', label: 'Quero' }, { key: 'benefit', label: 'Para' }, { key: 'moscow', label: 'Prioridade' }, { key: 'acceptance', label: 'Aceitação' }]);
      case 'card_sorting': {
        const cs = sp.cardSort;
        const buckets = ['Sem categoria', ...cs.categories];
        return `
          <section class="card card-elevated stack-v">
            <div class="stack-h" style="justify-content:space-between;">
              <h2 class="title-large">Card Sorting (${cs.mode === 'closed' ? 'Fechado' : 'Aberto'})</h2>
              <div class="stack-h">
                <input id="cs-new-card" class="field-input" style="width:180px;" placeholder="Novo cartão..." />
                <button type="button" class="btn btn-tonal btn-sm" id="btn-cs-add-card">Cartão</button>
                <input id="cs-new-cat" class="field-input" style="width:180px;" placeholder="Nova categoria..." />
                <button type="button" class="btn btn-outlined btn-sm" id="btn-cs-add-cat">Categoria</button>
              </div>
            </div>
            <div class="cardsort-grid">
              ${buckets.map(b => `
                <div class="cardsort-bucket">
                  <strong>${esc(b)}</strong>
                  ${cs.cards.filter(c => c.category === b).map(card => `
                    <div class="cardsort-item">
                      <span>${esc(card.label)}</span>
                      <select class="field-select" style="width:auto;min-height:48px;padding-block:4px;" data-cs-move="${esc(card.id)}">
                        ${buckets.map(opt => `<option value="${esc(opt)}" ${opt === b ? 'selected' : ''}>${esc(opt)}</option>`).join('')}
                      </select>
                    </div>
                  `).join('')}
                </div>
              `).join('')}
            </div>
          </section>
        `;
      }
      case 'qual_usability_testing':
        return `
          <section class="card card-elevated stack-v">
            <h2 class="title-large">Protocolo Think-Aloud</h2>
            ${sp.thinkAloudChecklist.map(c => `<label style="display:flex;align-items:center;gap:12px;min-height:48px;"><input type="checkbox" data-sp-toggle="thinkAloudChecklist:${esc(c.id)}" ${c.done ? 'checked' : ''} /><span>${esc(c.text)}</span></label>`).join('')}
          </section>
          ${renderSimpleTable('Sessões de Teste de Usabilidade', 'usabilitySessions', sp.usabilitySessions, [{ key: 'participant', label: 'Participante' }, { key: 'task', label: 'Tarefa' }, { key: 'completed', label: 'Conclusão' }, { key: 'timeSec', label: 'Tempo (s)' }, { key: 'errors', label: 'Erros' }, { key: 'severity', label: 'Severidade' }, { key: 'notes', label: 'Notas' }])}
        `;
      case 'benchmark_testing':
        return renderSimpleTable('Benchmark Quantitativo', 'benchmarks', sp.benchmarks, [{ key: 'task', label: 'Tarefa' }, { key: 'cycle1Success', label: 'Sucesso Base (%)' }, { key: 'currentSuccess', label: 'Sucesso Atual (%)' }, { key: 'cycle1TimeSec', label: 'Tempo Base (s)' }, { key: 'currentTimeSec', label: 'Tempo Atual (s)' }]);
      case 'accessibility_evaluation':
        return renderSimpleTable('Auditoria WCAG', 'wcagChecks', sp.wcagChecks, [{ key: 'principle', label: 'Princípio' }, { key: 'criterion', label: 'Critério' }, { key: 'status', label: 'Status' }, { key: 'severity', label: 'Severidade' }, { key: 'fix', label: 'Correção' }]);
      case 'training_research':
      case 'community_monitoring':
        return renderSimpleTable('Monitoramento de Comunidades e Treinamentos', 'communityPosts', sp.communityPosts, [{ key: 'source', label: 'Fonte' }, { key: 'date', label: 'Data' }, { key: 'sentiment', label: 'Sentimento' }, { key: 'topic', label: 'Tema' }, { key: 'note', label: 'Observação' }]);
      case 'surveys':
        return renderSimpleTable('Instrumento de Survey', 'surveyQuestions', sp.surveyQuestions, [{ key: 'type', label: 'Tipo' }, { key: 'question', label: 'Pergunta' }, { key: 'responsesSummary', label: 'Resumo' }]);
      case 'analytics_review':
        return renderSimpleTable('Revisão de Analytics', 'analyticsFindings', sp.analyticsFindings, [{ key: 'metric', label: 'Métrica' }, { key: 'value', label: 'Valor' }, { key: 'qualQuestion', label: 'Pergunta qualitativa' }]);
      case 'search_log_analysis':
        return renderSimpleTable('Logs de Busca Interna', 'searchLogs', sp.searchLogs, [{ key: 'term', label: 'Termo' }, { key: 'volume', label: 'Volume' }, { key: 'productTerm', label: 'Termo no produto' }, { key: 'action', label: 'Ação' }]);
      case 'feedback_bug_faq_review':
        return renderSimpleTable('Clusters de Feedback / Bugs / FAQ', 'feedbackClusters', sp.feedbackClusters, [{ key: 'theme', label: 'Tema' }, { key: 'count', label: 'Ocorrências' }, { key: 'severity', label: 'Severidade' }, { key: 'misunderstanding', label: 'Mal-entendido' }, { key: 'action', label: 'Ação' }]);
      case 'outreach_qa':
        return renderSimpleTable('Perguntas em Palestras e Conferências', 'qaItems', sp.qaItems, [{ key: 'event', label: 'Evento' }, { key: 'question', label: 'Pergunta' }, { key: 'concern', label: 'Preocupação' }, { key: 'recruitLead', label: 'Contato recrutamento' }]);
      default:
        return '';
    }
  };

  window.UXR.bindSpecializedTemplateEvents = function(container, updateMethod) {
    container.querySelectorAll('[data-sp-toggle]').forEach(box => {
      box.addEventListener('change', () => {
        const [listKey, id] = box.dataset.spToggle.split(':');
        updateMethod(m => { const item = m.blocks.specialized?.[listKey]?.find(x => x.id === id); if (item) item.done = box.checked; });
      });
    });
    container.querySelectorAll('[data-sp-edit]').forEach(inp => {
      inp.addEventListener('change', () => {
        const [listKey, idxStr, field] = inp.dataset.spEdit.split(':');
        updateMethod(m => { if (m.blocks.specialized?.[listKey]?.[Number(idxStr)]) m.blocks.specialized[listKey][Number(idxStr)][field] = inp.value; });
      });
    });
    container.querySelectorAll('[data-sp-del]').forEach(btn => {
      btn.addEventListener('click', () => {
        const [listKey, idxStr] = btn.dataset.spDel.split(':');
        updateMethod(m => { m.blocks.specialized?.[listKey]?.splice(Number(idxStr), 1); });
      });
    });
    container.querySelectorAll('[data-sp-add]').forEach(btn => {
      btn.addEventListener('click', () => {
        const listKey = btn.dataset.spAdd;
        const defaults = {
          timestampNotes: { id: uid('ts'), time: '00:10:00', participant: 'P02', tag: 'insight', note: '' },
          diaryEntries: { id: uid('dry'), day: 'Dia 2', participant: 'P01', trigger: '', frustration: 3, text: '' },
          stakeholders: { id: uid('stk'), name: 'Novo Stakeholder', quadrant: 'low_high', goal: '', assumption: '' },
          requirements: { id: uid('req'), title: '', origin: '', type: 'negócio', priority: 'Média', impact: '' },
          frontlineIssues: { id: uid('frt'), category: 'Frequente', issue: '', frequency: 'Média', team: 'Suporte' },
          callLogs: { id: uid('cal'), userTerm: '', systemTerm: '', explanation: '' },
          compTests: { id: uid('cpt'), competitor: '', task: '', strengths: '', weaknesses: '', userPraise: '' },
          compMatrix: { id: uid('cmp'), criterion: '', ourScore: 3, compAScore: 3, compBScore: 3, notes: '' },
          heuristics: { id: uid('heu'), heuristic: '4. Consistência', finding: '', severity: 2 },
          personas: { id: uid('prs'), name: 'Nova Persona', role: '', quote: '“...”', goals: '', pains: '', behaviors: '', evidenceSource: '' },
          tasks: { id: uid('tsk'), step: '', subtask: '', effort: 'Médio', friction: '', opportunity: '' },
          journeySteps: { id: uid('jrn'), stage: 'Nova Etapa', action: '', thought: '', emotion: 0, touchpoint: '', pain: '', opportunity: '', churnRisk: 'Baixo' },
          alternatives: { id: uid('alt'), name: 'Alternativa B', pros: '', cons: '', selectedParts: '' },
          walkthroughScreens: { id: uid('wlk'), screen: '', userNote: '', devNote: '', consolidated: '' },
          protoRuns: { id: uid('prt'), participant: 'P02', task: '', success: 'Sucesso', errors: 0, note: '' },
          stories: { id: uid('ust'), persona: '', want: '', benefit: '', moscow: 'Should have', acceptance: '' },
          usabilitySessions: { id: uid('usb'), participant: 'P02', task: '', completed: 'Sucesso', timeSec: 60, errors: 0, severity: 'Baixa', notes: '' },
          benchmarks: { id: uid('bnk'), task: 'Nova Tarefa', cycle1Success: 60, currentSuccess: 80, cycle1TimeSec: 120, currentTimeSec: 85 },
          wcagChecks: { id: uid('wcg'), principle: 'Operável', criterion: '', status: 'Aprovado', severity: 'Baixa', fix: '' },
          communityPosts: { id: uid('com'), source: '', date: new Date().toISOString().slice(0, 10), sentiment: 'Dúvida', topic: '', note: '' },
          surveyQuestions: { id: uid('srv'), type: 'Fechada', question: '', responsesSummary: '' },
          analyticsFindings: { id: uid('anl'), metric: '', value: '', qualQuestion: '' },
          searchLogs: { id: uid('src'), term: '', volume: 0, zeroResults: true, productTerm: '', action: '' },
          feedbackClusters: { id: uid('fbk'), theme: '', count: 1, severity: 'Média', misunderstanding: '', action: '' },
          qaItems: { id: uid('qai'), event: '', question: '', concern: '', recruitLead: '' }
        };
        updateMethod(m => { if (m.blocks.specialized?.[listKey] && defaults[listKey]) m.blocks.specialized[listKey].push(defaults[listKey]); });
      });
    });

    const journeySvg = container.querySelector('#journey-svg');
    if (journeySvg) {
      journeySvg.querySelectorAll('[data-journey-drag]').forEach(circle => {
        circle.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          const idx = Number(circle.dataset.journeyDrag);
          circle.setPointerCapture(e.pointerId);
          const onMove = (ev) => {
            const rect = journeySvg.getBoundingClientRect();
            const relY = ((ev.clientY - rect.top) / rect.height) * 160;
            const clamped = Math.max(-2, Math.min(2, Math.round((80 - relY) / 28)));
            circle.setAttribute('cy', String(80 - clamped * 28));
            circle.dataset.pendingEmotion = String(clamped);
          };
          const onUp = () => {
            circle.removeEventListener('pointermove', onMove);
            circle.removeEventListener('pointerup', onUp);
            if (circle.dataset.pendingEmotion !== undefined) {
              const val = Number(circle.dataset.pendingEmotion);
              updateMethod(m => { const step = m.blocks.specialized?.journeySteps?.[idx]; if (step) step.emotion = val; });
              showSnackbar(`Curva emocional atualizada (${val > 0 ? '+' + val : val}).`);
            }
          };
          circle.addEventListener('pointermove', onMove);
          circle.addEventListener('pointerup', onUp);
        });
      });
    }

    container.querySelectorAll('[data-cs-move]').forEach(sel => {
      sel.addEventListener('change', () => {
        updateMethod(m => { const card = m.blocks.specialized?.cardSort?.cards?.find(c => c.id === sel.dataset.csMove); if (card) card.category = sel.value; });
      });
    });
    container.querySelector('#btn-cs-add-card')?.addEventListener('click', () => {
      const inp = container.querySelector('#cs-new-card');
      if (!inp?.value.trim()) return;
      updateMethod(m => { m.blocks.specialized?.cardSort?.cards?.push({ id: uid('crd'), label: inp.value.trim(), category: 'Sem categoria' }); });
    });
    container.querySelector('#btn-cs-add-cat')?.addEventListener('click', () => {
      const inp = container.querySelector('#cs-new-cat');
      if (!inp?.value.trim()) return;
      updateMethod(m => { const cats = m.blocks.specialized?.cardSort?.categories; if (cats && !cats.includes(inp.value.trim())) cats.push(inp.value.trim()); });
    });
  };
})();
