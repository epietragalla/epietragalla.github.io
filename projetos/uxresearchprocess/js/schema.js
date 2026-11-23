window.UXR = window.UXR || {};

window.UXR.CURRENT_SCHEMA_VERSION = 1;

window.UXR.uid = function(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
};

window.UXR.addDaysIso = function(baseIso, days) {
  const d = baseIso ? new Date(`${baseIso}T12:00:00`) : new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

window.UXR.createEmptyStage = function(key) {
  return {
    key,
    responsibleIds: [],
    startDate: '',
    endDate: '',
    notes: '',
    methods: [],
    activities: []
  };
};

window.UXR.createCycle = function(number = 1, name = `Ciclo ${number}`) {
  const today = new Date().toISOString().slice(0, 10);
  return {
    id: window.UXR.uid('cyc'),
    number,
    name,
    startDate: today,
    endDate: '',
    stages: window.UXR.STAGE_ORDER.map(key => window.UXR.createEmptyStage(key))
  };
};

window.UXR.createRoadmapItem = function({
  title,
  cycleNumber = 1,
  stageKey = 'discover',
  isMilestone = false,
  assigneeIds = [],
  startDate = '',
  endDate = '',
  priority = 'medium',
  dependsOn = []
}) {
  const start = startDate || new Date().toISOString().slice(0, 10);
  const end = isMilestone ? start : (endDate || window.UXR.addDaysIso(start, 4));
  return {
    id: window.UXR.uid('rmk'),
    title,
    cycleNumber,
    stageKey,
    isMilestone,
    assigneeIds,
    startDate: start,
    endDate: end,
    status: 'todo',
    priority,
    effort: isMilestone ? 'Marco' : 'M',
    dependsOn,
    deliverables: '',
    notes: ''
  };
};

window.UXR.createMethodInstance = function({ catalogItem = null, title, variant = '', responsibleIds = [] }) {
  const today = new Date().toISOString().slice(0, 10);
  const uid = window.UXR.uid;
  return {
    id: uid('mtd'),
    catalogId: catalogItem ? catalogItem.id : null,
    variant,
    title: title || (catalogItem ? `${catalogItem.namePt} (${catalogItem.nameEn})` : 'Método personalizado'),
    status: 'todo',
    progress: 0,
    weight: 1,
    responsibleIds,
    startDate: today,
    endDate: window.UXR.addDaysIso(today, 4),
    priority: 'medium',
    effort: 'M',
    dependsOn: [],
    deliverables: catalogItem?.guide?.deliverables || '',
    blocks: {
      plan: {
        objective: catalogItem?.guide?.what || '',
        researchQuestions: '',
        participantsSource: '',
        script: '',
        risks: '',
        ethicsChecklist: [
          { id: uid('chk'), text: 'Consentimento informado preparado', done: false },
          { id: uid('chk'), text: 'Dados pessoais minimizados e anonimizados (LGPD)', done: false }
        ]
      },
      execute: {
        notes: '',
        tableHeaders: ['Data', 'Participante / Fonte', 'Observação Principal', 'Status'],
        tableRows: [['', '', '', 'Pendente']]
      },
      conclusion: {
        summary: '',
        recommendations: '',
        nextSteps: ''
      }
    },
    sessions: [],
    findings: [],
    evidences: [],
    comments: [],
    history: [{ at: new Date().toISOString(), action: 'Método criado no ciclo' }]
  };
};

window.UXR.createActivityInstance = function({ catalogItem = null, title, responsibleIds = [] }) {
  const today = new Date().toISOString().slice(0, 10);
  const uid = window.UXR.uid;
  return {
    id: uid('act'),
    catalogId: catalogItem ? catalogItem.id : null,
    title: title || (catalogItem ? `${catalogItem.namePt} (${catalogItem.nameEn})` : 'Atividade personalizada'),
    status: 'todo',
    frequency: 'cycle',
    startDate: today,
    endDate: window.UXR.addDaysIso(today, 6),
    priority: 'medium',
    dependsOn: [],
    checklist: [
      { id: uid('chk'), text: 'Definir responsável e rotina de acompanhamento', done: false },
      { id: uid('chk'), text: 'Documentar evidências e aprendizados da atividade', done: false }
    ],
    notes: catalogItem?.shortDesc || '',
    responsibleIds
  };
};

window.UXR.createProject = function({
  name,
  description = '',
  color = 'primary',
  researchQuestions = [],
  hypotheses = [],
  constraints = { time: '', budget: '', systemMaturity: 'Produto existente', productType: 'Web / App' },
  ownerIds = [],
  themes = [],
  recommendations = []
}) {
  const now = new Date().toISOString();
  return {
    id: window.UXR.uid('prj'),
    name: name.trim(),
    description: description.trim(),
    color,
    status: 'active',
    researchQuestions,
    hypotheses,
    constraints,
    startDate: now.slice(0, 10),
    endDate: '',
    ownerIds,
    activeCycleNumber: 1,
    cycles: [window.UXR.createCycle(1, 'Ciclo 1')],
    milestones: [],
    customRoadmapItems: [],
    themes,
    recommendations,
    createdAt: now,
    updatedAt: now
  };
};

window.UXR.createSeedData = function() {
  const { STAGES_CATALOG } = window.UXR;
  const { uid, addDaysIso, createProject, createMethodInstance, createActivityInstance, createRoadmapItem } = window.UXR;

  const p1 = { id: 'per_ana', name: 'Ana Silva', role: 'UX Research Lead', email: 'ana@uxstudio.example', color: 'primary' };
  const p2 = { id: 'per_bruno', name: 'Bruno Costa', role: 'Product Designer', email: 'bruno@uxstudio.example', color: 'tertiary' };

  const demoProject = createProject({
    name: 'Redesign do Fluxo de Checkout & Pagamento',
    description: 'Investigar causas de abandono no checkout mobile e validar uma experiência mais transparente e acessível.',
    color: 'primary',
    researchQuestions: [
      'Por que 42% dos usuários abandonam o checkout na etapa de escolha de frete e pagamento?',
      'Quais informações de prazo e segurança geram maior confiança antes de concluir o pedido?'
    ],
    hypotheses: [
      'Exibir o valor total com frete desde o carrinho reduz o abandono por surpresa de custo.',
      'Simplificar o formulário de endereço para CEP automático reduz erros de preenchimento.'
    ],
    constraints: {
      time: '4 semanas (2 ciclos de 2 semanas)',
      budget: 'Moderado — foco em recrutamento remoto e análise de dados internos',
      systemMaturity: 'Produto existente em produção',
      productType: 'E-commerce Web e Mobile'
    },
    ownerIds: [p1.id]
  });

  const discStage = demoProject.cycles[0].stages.find(s => s.key === 'discover');
  discStage.responsibleIds = [p1.id];

  const mField = createMethodInstance({ catalogItem: STAGES_CATALOG.discover.methods[0], responsibleIds: [p1.id] });
  mField.status = 'done';
  mField.progress = 100;
  mField.findings.push({
    id: uid('fnd'),
    title: 'Surpresa com taxa de entrega na penúltima tela causa abandono imediato',
    description: '7 de 8 participantes pausaram ao ver o frete calculado apenas após inserir dados pessoais e fecharam a aba.',
    severity: 'high',
    confidence: 'high',
    tags: ['checkout', 'frete', 'confiança'],
    evidenceIds: [],
    themeId: 'thm_transparencia',
    promotedToRepository: true
  });

  const mReq = createMethodInstance({ catalogItem: STAGES_CATALOG.discover.methods[3], responsibleIds: [p1.id, p2.id] });
  mReq.status = 'doing';
  mReq.progress = 60;

  const actMetrics = createActivityInstance({ catalogItem: STAGES_CATALOG.discover.activities[5], responsibleIds: [p1.id] });
  actMetrics.checklist[0].done = true;

  discStage.methods.push(mField, mReq);
  discStage.activities.push(actMetrics);

  const expStage = demoProject.cycles[0].stages.find(s => s.key === 'explore');
  expStage.responsibleIds = [p2.id];
  const mProto = createMethodInstance({ catalogItem: STAGES_CATALOG.explore.methods[8], variant: 'clickable', responsibleIds: [p2.id] });
  mProto.status = 'doing';
  mProto.progress = 40;
  expStage.methods.push(mProto);

  const today = new Date().toISOString().slice(0, 10);
  mField.startDate = addDaysIso(today, -4);
  mField.endDate = addDaysIso(today, 0);
  mReq.startDate = addDaysIso(today, -1);
  mReq.endDate = addDaysIso(today, 3);
  mReq.dependsOn = [mField.id];
  actMetrics.startDate = addDaysIso(today, -2);
  actMetrics.endDate = addDaysIso(today, 5);
  mProto.startDate = addDaysIso(today, 2);
  mProto.endDate = addDaysIso(today, 7);
  mProto.dependsOn = [mReq.id];

  demoProject.customRoadmapItems.push(
    createRoadmapItem({
      title: 'Readout do Ciclo 1 para Stakeholders',
      cycleNumber: 1,
      stageKey: 'listen',
      isMilestone: true,
      assigneeIds: [p1.id],
      startDate: addDaysIso(today, 9),
      priority: 'high',
      dependsOn: [mProto.id]
    })
  );

  demoProject.themes.push({
    id: 'thm_transparencia',
    title: 'Transparência de custos e prazos antes da identificação',
    description: 'Usuários precisam conhecer o custo total da entrega antes de preencher dados pessoais.'
  });

  demoProject.recommendations.push({
    id: 'rec_frete_carrinho',
    title: 'Adicionar calculadora de frete por CEP diretamente no resumo do carrinho',
    findingIds: [mField.findings[0].id],
    priority: 'Alta',
    owner: 'Bruno Costa',
    status: 'Em andamento'
  });

  const seedParticipants = [
    { id: 'prt_01', projectId: demoProject.id, name: 'Fernanda Oliveira', profile: 'Compradora frequente mobile • 32 anos • Região Sudeste', accessibilityNeed: 'Nenhuma', contact: 'fernanda.o@example.com', consent: true, incentive: 'Vale-presente R$ 80 (Entregue)', status: 'completed', futurePool: true },
    { id: 'prt_02', projectId: demoProject.id, name: 'Rafael Mendes', profile: 'Usuário de leitor de tela (NVDA) • 41 anos • Região Nordeste', accessibilityNeed: 'Deficiência visual (NVDA)', contact: 'rafael.m@example.com', consent: true, incentive: 'Vale-presente R$ 80 (Agendado)', status: 'scheduled', futurePool: true }
  ];

  return {
    schemaVersion: window.UXR.CURRENT_SCHEMA_VERSION,
    app: 'UX Research Cycle Studio',
    theme: 'light',
    projects: [demoProject],
    people: [p1, p2],
    participants: seedParticipants
  };
};

window.UXR.validateAndMigrateState = function(raw) {
  const { STAGE_ORDER, createEmptyStage, createCycle, uid } = window.UXR;
  if (!raw || typeof raw !== 'object') throw new Error('Arquivo JSON inválido: estrutura raiz não é um objeto.');
  if (!Array.isArray(raw.projects)) throw new Error('Arquivo JSON inválido: lista "projects" ausente.');

  const migratedProjects = raw.projects.map((p, idx) => {
    if (!p.id || !p.name) throw new Error(`Projeto na posição ${idx + 1} sem "id" ou "name".`);
    const cycles = Array.isArray(p.cycles) && p.cycles.length > 0
      ? p.cycles.map((c, cIdx) => {
          const stagesMap = new Map((c.stages || []).map(s => [s.key, s]));
          const normalizedStages = STAGE_ORDER.map(key => {
            const existing = stagesMap.get(key) || createEmptyStage(key);
            return {
              ...createEmptyStage(key),
              ...existing,
              methods: Array.isArray(existing.methods) ? existing.methods : [],
              activities: Array.isArray(existing.activities) ? existing.activities : []
            };
          });
          return {
            id: c.id || uid('cyc'),
            number: c.number || cIdx + 1,
            name: c.name || `Ciclo ${cIdx + 1}`,
            startDate: c.startDate || '',
            endDate: c.endDate || '',
            stages: normalizedStages
          };
        })
      : [createCycle(1, 'Ciclo 1')];

    return {
      ...p,
      status: p.status || 'active',
      researchQuestions: Array.isArray(p.researchQuestions) ? p.researchQuestions : [],
      hypotheses: Array.isArray(p.hypotheses) ? p.hypotheses : [],
      constraints: p.constraints || { time: '', budget: '', systemMaturity: '', productType: '' },
      ownerIds: Array.isArray(p.ownerIds) ? p.ownerIds : [],
      customRoadmapItems: Array.isArray(p.customRoadmapItems) ? p.customRoadmapItems : [],
      themes: Array.isArray(p.themes) ? p.themes : [],
      recommendations: Array.isArray(p.recommendations) ? p.recommendations : [],
      activeCycleNumber: p.activeCycleNumber || cycles[cycles.length - 1].number,
      cycles
    };
  });

  return {
    schemaVersion: window.UXR.CURRENT_SCHEMA_VERSION,
    app: 'UX Research Cycle Studio',
    theme: raw.theme === 'dark' ? 'dark' : 'light',
    projects: migratedProjects,
    people: Array.isArray(raw.people) ? raw.people : [],
    participants: Array.isArray(raw.participants) ? raw.participants : []
  };
};

window.UXR.PROJECT_TEMPLATES = [
  { id: 'tpl-generative', name: 'Pesquisa Generativa para Produto Novo (0 → 1)', description: 'Foco intenso em Discover e Explore para validar necessidades reais antes de escrever código.', constraints: { time: '4 a 6 semanas', budget: 'Foco maior no início do ciclo (recomendação NN/g)', systemMaturity: 'Ideia / Produto novo (0 a 1)', productType: 'Novo produto / funcionalidade' }, stagesSetup: { discover: ['disc-field-interviews', 'disc-stakeholder-interviews', 'disc-requirements-constraints'], explore: ['exp-persona-building', 'exp-journey-mapping', 'exp-prototype-testing'], test: ['test-qual-usability'], listen: [] } },
  { id: 'tpl-redesign', name: 'Redesign de Produto Existente', description: 'Combina evidências de Listen e Test para diagnosticar gargalos e validar a nova proposta.', constraints: { time: '3 a 4 semanas', budget: 'Moderado', systemMaturity: 'Produto existente em produção', productType: 'Produto digital ativo' }, stagesSetup: { discover: ['disc-sales-support-interviews'], explore: ['exp-design-review', 'exp-task-analysis', 'exp-prototype-testing'], test: ['test-qual-usability', 'test-benchmark', 'test-accessibility'], listen: ['list-analytics-review', 'list-usability-bug-review'] } },
  { id: 'tpl-sprint-5d', name: 'Sprint de Pesquisa Rápida (5 Dias)', description: 'Ciclo enxuto focado no método essencial NN/g: teste de usabilidade qualitativo com 5 usuários.', constraints: { time: '5 dias úteis', budget: 'Enxuto', systemMaturity: 'Protótipo / MVP inicial', productType: 'Fluxo crítico específico' }, stagesSetup: { discover: ['disc-requirements-constraints'], explore: ['exp-prototype-testing'], test: ['test-qual-usability'], listen: ['list-feedback-review'] } },
  { id: 'tpl-research-ops', name: 'Pesquisa Contínua (Research Ops)', description: 'Cadência permanente de escuta, métricas longitudinais e recrutamento contínuo.', constraints: { time: 'Contínuo (ciclos quinzenais)', budget: 'Recorrente', systemMaturity: 'Produto existente em produção', productType: 'Plataforma contínua' }, stagesSetup: { discover: ['disc-support-call-monitoring'], explore: ['exp-design-review'], test: ['test-qual-usability', 'test-accessibility'], listen: ['list-surveys', 'list-analytics-review', 'list-search-log', 'list-feedback-review'] } }
];
