/**
 * Catálogo completo das 5 etapas do processo de UX Design,
 * seus grupos e métodos (nome original em inglês + tradução PT-BR).
 */
export const UX_CATALOG = [
  {
    key: 'discover',
    nameEn: 'Discover',
    namePt: 'Descobrir',
    objective: 'Obter insights para definir melhor o problema.',
    icon: 'explore',
    tokens: {
      accent: 'var(--ux-stage-discover)',
      onAccent: 'var(--ux-stage-discover-on)',
      container: 'var(--ux-stage-discover-container)',
      onContainer: 'var(--ux-stage-discover-on-container)'
    },
    groups: [
      {
        id: 'disc-stakeholders',
        name: 'Stakeholders',
        methods: [
          { catalogId: 'disc-st-1', titleEn: 'What do we want to build?', titlePt: 'O que queremos fazer?' },
          { catalogId: 'disc-st-2', titleEn: 'Who is it for?', titlePt: 'Para quem?' },
          { catalogId: 'disc-st-3', titleEn: 'Why? Business Objective?', titlePt: 'Por quê? Objetivo de negócio?' },
          { catalogId: 'disc-st-4', titleEn: 'Competitors', titlePt: 'Concorrentes' },
          { catalogId: 'disc-st-5', titleEn: 'Metrics & KPIs', titlePt: 'Métricas' },
          { catalogId: 'disc-st-6', titleEn: 'Technical Constraints', titlePt: 'Limitações técnicas' }
        ]
      },
      {
        id: 'disc-data',
        name: 'Dados',
        methods: [
          { catalogId: 'disc-dt-1', titleEn: 'Internal Data Analysis', titlePt: 'Análise de dados internos' },
          { catalogId: 'disc-dt-2', titleEn: 'Competitive Analysis', titlePt: 'Análise competitiva' },
          { catalogId: 'disc-dt-3', titleEn: 'Content Inventory', titlePt: 'Inventário de conteúdo' },
          { catalogId: 'disc-dt-4', titleEn: 'Expert Review (Existing Product)', titlePt: 'Avaliação de especialista (se produto existente)' }
        ]
      },
      {
        id: 'disc-research',
        name: 'Pesquisa com usuários',
        methods: [
          { catalogId: 'disc-ur-1', titleEn: 'User Interviews', titlePt: 'Entrevistas com usuários' },
          { catalogId: 'disc-ur-2', titleEn: 'Surveys', titlePt: 'Surveys' },
          { catalogId: 'disc-ur-3', titleEn: 'Focus Groups', titlePt: 'Grupos focais' }
        ]
      }
    ]
  },
  {
    key: 'define',
    nameEn: 'Define',
    namePt: 'Definir',
    objective: 'Ter uma visão clara do problema, do objetivo e dos usuários.',
    icon: 'target',
    tokens: {
      accent: 'var(--ux-stage-define)',
      onAccent: 'var(--ux-stage-define-on)',
      container: 'var(--ux-stage-define-container)',
      onContainer: 'var(--ux-stage-define-on-container)'
    },
    groups: [
      {
        id: 'def-understand',
        name: 'Entender o usuário',
        methods: [
          { catalogId: 'def-uu-1', titleEn: 'Persona', titlePt: 'Persona' },
          { catalogId: 'def-uu-2', titleEn: 'Empathy Map', titlePt: 'Mapa de empatia' },
          { catalogId: 'def-uu-3', titleEn: 'User Journey / Experience Map', titlePt: 'Jornada do usuário / Experiência do usuário' },
          { catalogId: 'def-uu-4', titleEn: 'Storyboards', titlePt: 'Storyboards' },
          { catalogId: 'def-uu-5', titleEn: 'User Stories', titlePt: 'User stories' }
        ]
      },
      {
        id: 'def-reframe',
        name: 'Redefinir o problema',
        methods: [
          { catalogId: 'def-rp-1', titleEn: 'Insight Prioritization', titlePt: 'Priorização de insights' },
          { catalogId: 'def-rp-2', titleEn: 'Affinity Map / Card Sorting', titlePt: 'Mapa de afinidade / Card sorting' },
          { catalogId: 'def-rp-3', titleEn: 'Assumptions Mapping', titlePt: 'Suposições (assumptions)' },
          { catalogId: 'def-rp-4', titleEn: 'Problem Statement', titlePt: 'Declaração do problema' },
          { catalogId: 'def-rp-5', titleEn: 'Value Proposition', titlePt: 'Proposta de valor' },
          { catalogId: 'def-rp-6', titleEn: 'How Might We (HMW)', titlePt: 'Perguntas "Como poderíamos…?" (How Might We)' }
        ]
      }
    ]
  },
  {
    key: 'ideate',
    nameEn: 'Ideate',
    namePt: 'Idear',
    objective: 'Encontrar a solução para o problema com base nos insights.',
    icon: 'lightbulb',
    tokens: {
      accent: 'var(--ux-stage-ideate)',
      onAccent: 'var(--ux-stage-ideate-on)',
      container: 'var(--ux-stage-ideate-container)',
      onContainer: 'var(--ux-stage-ideate-on-container)'
    },
    groups: [
      {
        id: 'ide-workshops',
        name: 'Workshops',
        methods: [
          { catalogId: 'ide-ws-1', titleEn: 'Team Building', titlePt: 'Montar um time' },
          { catalogId: 'ide-ws-2', titleEn: 'Brainstorming', titlePt: 'Brainstorming' },
          { catalogId: 'ide-ws-3', titleEn: 'Ideation Dynamics (6-to-1, Crazy 8, Round Robin)', titlePt: 'Dinâmicas (6 to 1, Crazy 8, Round Robin…)' },
          { catalogId: 'ide-ws-4', titleEn: 'Benchmarking', titlePt: 'Benchmarking' },
          { catalogId: 'ide-ws-5', titleEn: 'Card Sorting', titlePt: 'Card sorting' }
        ]
      },
      {
        id: 'ide-creation',
        name: 'Criação',
        methods: [
          { catalogId: 'ide-cr-1', titleEn: 'Mind Map', titlePt: 'Mapa mental' },
          { catalogId: 'ide-cr-2', titleEn: 'Affinity Map', titlePt: 'Mapa de afinidade' },
          { catalogId: 'ide-cr-3', titleEn: 'UX Magic', titlePt: 'UX magic' },
          { catalogId: 'ide-cr-4', titleEn: 'Storyboard', titlePt: 'Storyboard' },
          { catalogId: 'ide-cr-5', titleEn: 'User Journey (With Solution)', titlePt: 'Jornada do usuário (com solução)' },
          { catalogId: 'ide-cr-6', titleEn: 'User Flows', titlePt: 'Fluxos de usuário' },
          { catalogId: 'ide-cr-7', titleEn: 'Information Architecture', titlePt: 'Arquitetura de informação' }
        ]
      }
    ]
  },
  {
    key: 'prototype',
    nameEn: 'Prototype',
    namePt: 'Prototipar',
    objective: 'Construir e testar ideias. Errar rápido para acertar mais rápido.',
    icon: 'design_services',
    tokens: {
      accent: 'var(--ux-stage-prototype)',
      onAccent: 'var(--ux-stage-prototype-on)',
      container: 'var(--ux-stage-prototype-container)',
      onContainer: 'var(--ux-stage-prototype-on-container)'
    },
    groups: [
      {
        id: 'pro-paper',
        name: 'Protótipo de papel',
        methods: [
          { catalogId: 'pro-pp-1', titleEn: 'Rapid Hand Sketching', titlePt: 'Desenho rápido à mão' },
          { catalogId: 'pro-pp-2', titleEn: 'Interaction Simulation', titlePt: 'Simulação de interações' },
          { catalogId: 'pro-pp-3', titleEn: 'Paper Tests', titlePt: 'Testes' },
          { catalogId: 'pro-pp-4', titleEn: 'Feedback Capture', titlePt: 'Feedback' }
        ]
      },
      {
        id: 'pro-wireframe',
        name: 'Wireframe',
        methods: [
          { catalogId: 'pro-wf-1', titleEn: 'Low-Fi Grayscale Screens', titlePt: 'Telas em preto e branco' },
          { catalogId: 'pro-wf-2', titleEn: 'Detailed User Flows', titlePt: 'Fluxos de usuário detalhados' },
          { catalogId: 'pro-wf-3', titleEn: 'Annotated Interactions', titlePt: 'Interações' },
          { catalogId: 'pro-wf-4', titleEn: 'Wireframe Tests', titlePt: 'Testes' },
          { catalogId: 'pro-wf-5', titleEn: 'Wireframe Feedback', titlePt: 'Feedback' }
        ]
      },
      {
        id: 'pro-hifi',
        name: 'Protótipo Hi-Fi',
        methods: [
          { catalogId: 'pro-hf-1', titleEn: 'UI Research & Moodboard', titlePt: 'Pesquisa de UI' },
          { catalogId: 'pro-hf-2', titleEn: 'Mockups', titlePt: 'Mockups' },
          { catalogId: 'pro-hf-3', titleEn: 'Interactive Prototype', titlePt: 'Protótipo interativo' },
          { catalogId: 'pro-hf-4', titleEn: 'Microinteractions', titlePt: 'Microinterações' }
        ]
      }
    ]
  },
  {
    key: 'evaluate',
    nameEn: 'Evaluate',
    namePt: 'Avaliar',
    objective: 'A solução responde ao problema?',
    icon: 'verified',
    tokens: {
      accent: 'var(--ux-stage-evaluate)',
      onAccent: 'var(--ux-stage-evaluate-on)',
      container: 'var(--ux-stage-evaluate-container)',
      onContainer: 'var(--ux-stage-evaluate-on-container)'
    },
    groups: [
      {
        id: 'eva-usability',
        name: 'Testes de usabilidade',
        methods: [
          { catalogId: 'eva-ut-1', titleEn: 'Shadowing (Observation)', titlePt: 'Shadowing (observação)' },
          { catalogId: 'eva-ut-2', titleEn: 'SUS Survey (System Usability Scale)', titlePt: 'Survey SUS' },
          { catalogId: 'eva-ut-3', titleEn: 'Peer Expert Review', titlePt: 'Avaliação de especialista (por outro designer de UX)' },
          { catalogId: 'eva-ut-4', titleEn: 'A/B Testing', titlePt: 'Teste A/B' }
        ]
      },
      {
        id: 'eva-synthesis',
        name: 'Síntese',
        methods: [
          { catalogId: 'eva-sy-1', titleEn: 'Results Analysis', titlePt: 'Análise de resultados' },
          { catalogId: 'eva-sy-2', titleEn: 'Go / No-Go Decision', titlePt: 'Go / No-go' },
          { catalogId: 'eva-sy-3', titleEn: 'Iterate & Retry (If No-Go)', titlePt: 'Se no-go, volta e tenta de novo' },
          { catalogId: 'eva-sy-4', titleEn: 'Launch & Celebrate (If Go)', titlePt: 'Se go, você ganhou!' }
        ]
      }
    ]
  }
];

export function getStageMeta(stageKey) {
  return UX_CATALOG.find(s => s.key === stageKey) || UX_CATALOG[0];
}

/**
 * Templates de Projeto pré-configurados com métodos recomendados.
 */
export const PROJECT_TEMPLATES = [
  {
    id: 'tpl-blank',
    name: 'Projeto em Branco (Personalizado)',
    description: 'Comece com as 5 etapas limpas e escolha cada método sob demanda.',
    methodsByStage: {}
  },
  {
    id: 'tpl-redesign',
    name: 'Redesign de Produto Existente',
    description: 'Foco em diagnóstico de usabilidade, dados atuais, reestruturação de fluxos e validação comparativa.',
    methodsByStage: {
      discover: ['disc-st-3', 'disc-st-5', 'disc-dt-1', 'disc-dt-4', 'disc-ur-1'],
      define: ['def-uu-1', 'def-uu-3', 'def-rp-1', 'def-rp-4'],
      ideate: ['ide-ws-4', 'ide-cr-6', 'ide-cr-7'],
      prototype: ['pro-wf-1', 'pro-hf-2', 'pro-hf-3'],
      evaluate: ['eva-ut-2', 'eva-ut-4', 'eva-sy-2']
    }
  },
  {
    id: 'tpl-new-product',
    name: 'Produto Novo (Zero to One)',
    description: 'Descoberta profunda de mercado, proposta de valor, prototipação rápida e testes de conceito.',
    methodsByStage: {
      discover: ['disc-st-1', 'disc-st-2', 'disc-st-3', 'disc-dt-2', 'disc-ur-1', 'disc-ur-2'],
      define: ['def-uu-1', 'def-uu-2', 'def-rp-3', 'def-rp-4', 'def-rp-5', 'def-rp-6'],
      ideate: ['ide-ws-2', 'ide-ws-3', 'ide-cr-4', 'ide-cr-6'],
      prototype: ['pro-pp-1', 'pro-wf-1', 'pro-hf-3'],
      evaluate: ['eva-ut-1', 'eva-sy-1', 'eva-sy-2']
    }
  },
  {
    id: 'tpl-sprint',
    name: 'Design Sprint (5 Dias)',
    description: 'Ciclo enxuto de 1 semana: Mapear, Esboçar, Decidir, Prototipar e Testar com usuários.',
    methodsByStage: {
      discover: ['disc-st-3', 'disc-st-5'],
      define: ['def-uu-3', 'def-rp-6'],
      ideate: ['ide-ws-3', 'ide-cr-4'],
      prototype: ['pro-hf-3'],
      evaluate: ['eva-ut-1', 'eva-sy-2']
    }
  }
];

/**
 * Conteúdo educativo de especialista para a Biblioteca de Métodos.
 */
export const METHOD_GUIDES = {
  discover: {
    when: 'No início do projeto ou sempre que houver incerteza sobre necessidades reais dos usuários, métricas atuais ou restrições técnicas.',
    steps: [
      'Alinhe expectativas e métricas de sucesso com os stakeholders antes de falar com usuários.',
      'Analise dados quantitativos existentes (analytics, funis, chamados de suporte) e concorrentes.',
      'Conduza pesquisas qualitativas (entrevistas, shadowing) focadas em comportamentos passados, não em opiniões futuras.',
      'Sintetize evidências brutas e promova os achados mais críticos para Insights.'
    ],
    deliverables: 'Matriz de alinhamento, relatório de benchmarking, transcrições/citações e achados priorizados.',
    duration: '1 a 3 semanas',
    pitfalls: 'Perguntar ao usuário "o que você gostaria que o produto tivesse" em vez de observar como ele resolve o problema hoje.'
  },
  define: {
    when: 'Após coletar dados brutos em Discover, quando o time precisa convergir e escolher qual problema vale a pena resolver.',
    steps: [
      'Agrupe descobertas por afinidade para identificar padrões recorrentes.',
      'Sintetize perfis reais em Personas e mapeie a Jornada atual destacando pontos de dor.',
      'Redija uma Declaração do Problema clara e transforme-a em perguntas "Como poderíamos…?" (HMW).',
      'Priorize oportunidades na matriz Impacto x Esforço.'
    ],
    deliverables: 'Personas, Mapa de Empatia, Jornada As-Is, Declaração do Problema e Backlog de User Stories.',
    duration: '3 a 7 dias',
    pitfalls: 'Pular direto para telas sem concordar sobre qual problema e qual métrica estamos atacando.'
  },
  ideate: {
    when: 'Com o problema bem definido, para explorar múltiplas alternativas de solução antes de se apegar à primeira ideia.',
    steps: [
      'Reúna perfis multidisciplinares (Design, Produto, Engenharia, Negócios).',
      'Use dinâmicas divergentes como Crazy 8s para gerar volume sem julgamento.',
      'Vote nas ideias mais promissoras e estruture os Fluxos de Usuário e Arquitetura de Informação.',
      'Valide a viabilidade técnica antes de investir em alta fidelidade.'
    ],
    deliverables: 'Esboços de dinâmica, Fluxos de Usuário (User Flows), Sitemap / Arquitetura de Informação.',
    duration: '2 a 5 dias',
    pitfalls: 'Criticar ideias durante a fase de divergência ou desenhar telas isoladas sem fluxo ponta a ponta.'
  },
  prototype: {
    when: 'Quando você precisa tangibilizar uma hipótese de solução para testar com usuários gastando o mínimo possível.',
    steps: [
      'Comece com rabiscos em papel ou wireframes em escala de cinza para validar estrutura e fluxo.',
      'Simule interações e colete feedback rápido antes de aplicar identidade visual.',
      'Evolua para protótipos Hi-Fi interativos apenas nos fluxos críticos que irão para teste.'
    ],
    deliverables: 'Wireframes anotados, Protótipo interativo clicável e especificação de microinterações.',
    duration: '3 a 10 dias',
    pitfalls: 'Perfeccionismo visual prematuro em protótipos descartáveis ("apaixonar-se pelo pixel").'
  },
  evaluate: {
    when: 'Antes de desenvolver em produção (validação de protótipo) e após o lançamento (medição contínua).',
    steps: [
      'Defina cenários e tarefas realistas sem induzir o participante ("como você faria para...").',
      'Observe onde o usuário hesita, erra ou pede ajuda; registre severidade dos problemas.',
      'Aplique a Survey SUS ao final para obter uma métrica comparável de usabilidade (0–100).',
      'Tome uma decisão explícita de Go / No-Go baseada em critérios objetivos.'
    ],
    deliverables: 'Relatório de usabilidade, Score SUS, análise de Teste A/B e decisão Go / No-Go.',
    duration: '2 a 5 dias',
    pitfalls: 'Explicar como a interface funciona durante o teste ou ignorar um No-Go por pressão de prazo.'
  }
};