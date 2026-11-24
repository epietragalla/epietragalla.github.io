/**
 * Schema Declarativo — Documento 1: Plano de Pesquisa
 */

export const SHARED_INFORMACOES_DEFAULT = {
  areaInteressada: 'Gerência / Coordenação de Produtos de Investimento (SuperAPP CAIXA)',
  stakeholders: [
    'Cibele Martins Alvarenga Henriques (Demandante / Negócio de Investimentos)',
    'Carolina Alves Pereira (Product Designer / UX UI)',
    'Clarissa Lima de Rezende (Coordenação de Research & Operações)',
    'Marcela Dantas de Noronha (Pesquisadora Responsável / Execução)',
    'Estefano Silvestre Pietragalla (Pesquisador / Apoio Metodológico)',
    'Maxwell Pessoa Canelhas Fontes (Liderança / Research Lead)'
  ],
  nomeProjeto: 'SuperAPP Fase 21'
};

export const SHARED_INFORMACOES_SECTION = {
  id: 'informacoes',
  title: 'Informações',
  fields: [
    {
      key: 'areaInteressada',
      type: 'text',
      shared: true,
      label: 'Área interessada'
    },
    {
      key: 'stakeholders',
      type: 'list',
      shared: true,
      label: 'Stakeholders envolvidos'
    },
    {
      key: 'nomeProjeto',
      type: 'text',
      shared: true,
      label: 'Nome do projeto'
    }
  ]
};

export const planoPesquisaSchema = {
  id: 'plano-pesquisa',
  title: 'Plano de Pesquisa',
  shortTitle: 'Plano',
  icon: 'description',
  sharedDefault: SHARED_INFORMACOES_DEFAULT,
  defaultFields: {
    objetivoGeral:
      'Avaliar a usabilidade, a arquitetura de informação e a fluidez cognitiva da tela inicial da Central de Investimentos do SuperAPP da CAIXA, garantindo que o cliente compreenda instantaneamente seu patrimônio consolidado e consiga localizar produtos, ações transacionais e serviços de suporte com autonomia e segurança.',
    objetivosEspecificos: [
      'Mensurar a capacidade do usuário em interpretar o gráfico semicircular de distribuição da carteira, o valor total investido (R$ 100 mil) e sua correlação direta com a lista de produtos (Renda Fixa, Fundos, Poupança, Caixinhas).',
      'Avaliar a clareza e a diferenciação intencional entre os atalhos de topo (Investir, Resgatar, Todos produtos) em relação ao toque direto nos itens da lista.',
      'Identificar os modelos mentais e expectativas geradas pelo card Agregador de investimentos (se o cliente compreende que é apenas visualização consolidada de outros bancos ou se infere transferência de custódia).',
      'Mapear a facilidade de localização e a compreensão dos termos da base da tela: Perfil do investidor, Cadastro do investidor e Remuneração do distribuidor.'
    ],
    impactosEsperados: [
      'Reduzir a barreira de entrada digital e o sentimento de insegurança de clientes correntistas tradicionais na gestão de seus ativos.',
      'Fornecer insumos quantitativos (mapas de calor e taxas de sucesso) e qualitativos para subsidiar melhorias de interface (V2) antes do rollout em escala nacional.'
    ],
    hipoteses: [
      'H1: Usuários de menor maturidade digital (Persona 3) associam as cores do gráfico semicircular à lista de produtos sem necessidade de legendas adicionais.',
      'H2: O atalho Investir entra em conflito cognitivo com "Todos produtos", gerando dúvidas sobre onde descobrir novas opções de aplicação.',
      'H3: O card Agregador de investimentos gera a suposição incorreta de que o dinheiro de outras instituições será transferido financeiramente para a CAIXA.',
      'H4: O termo regulatório "Remuneração do distribuidor" não é compreendido pelo cliente pessoa física como transparência de taxas, gerando confusão ou desinteresse.'
    ],
    expMetodologia:
      'Teste de Usabilidade Não Moderado Remoto com tarefas baseadas em protótipo navegável via plataforma Maze. Inclui teste de primeira impressão (5-second adaptado), missões de clique (missions) e perguntas estruturadas pós tarefa.',
    expMetricas: [
      'Taxa de Sucesso da Missão: Sucesso Direto (Direct Success) e Sucesso Indireto (Indirect Success).',
      'Taxa de Cliques Errados (Misclick Rate): Identificação de dispersão e áreas de confusão via Mapas de Calor (Heatmaps).',
      'Tempo Médio de Resolução da Tarefa (Time on Task).',
      'Percepção de Facilidade / Carga Cognitiva: Escala de Avaliação de 1 a 5 estrelas ao final do teste.'
    ],
    expArtefato:
      'Protótipo interativo desenvolvido no Figma por Carolina Alves Pereira, otimizado para navegação mobile com links de tela e caminhos de clique funcionais para as missões previstas.',
    expConducao: [
      'Configuração, Análise e Relatório: Marcela Dantas (Pesquisadora Líder) e Estefano Silvestre (Apoio).',
      'Supervisão Metodológica: Maxwell Canelhas.',
      'Recrutamento e Gestão de Disparos: Clarissa Lima em articulação com as áreas gestoras de base da CAIXA.',
      'Validação de Negócio e Design: Cibele Martins e Carolina Alves Pereira.'
    ],
    expDuracaoResumo: 'Tempo Total Estimado: 8 a 10 dias úteis.',
    expDuracaoEtapas: [
      'Setup do Maze e Teste Piloto Interno: 2 dias úteis.',
      'Disparo do Screener e Coleta no Maze: 3 a 4 dias úteis (janela ativa de respostas).',
      'Tabulação, Codificação e Relatório Executivo: 3 a 4 dias úteis.',
      'Duração por participante: 5 a 7 minutos por sessão.'
    ],
    expMaterial: [
      'Telefone Celular (Smartphone iOS ou Android) com navegador web atualizado;',
      'Conexão de internet móvel (4G/5G) ou Wi-Fi estável;',
      '(Computadores e tablets bloqueados via configuração do Maze).'
    ],
    expPerfilMeta:
      'Meta de Amostra: 30 a 50 testes concluídos e válidos (disparo em base de 200 a 300 contatos).',
    expPerfilSegmentacaoTitulo: 'Segmentação em 3 Personas:',
    expPerfilPersonas: [
      'P1: Alta maturidade digital + Com experiência em investimentos.',
      'P2: Alta maturidade digital + Sem experiência prévia em investimentos.',
      'P3 (Público Estratégico 50+): Baixa maturidade digital + Possui investimentos (Poupança/Renda Fixa).'
    ],
    expPerfilExclusao:
      'Critérios de Exclusão: Colaboradores de bancos/fintechs, profissionais de TI/Design/UX e investidores do tipo Day Trader / especuladores diários.',
    expCapturaDados: [
      'Fonte: Base oficial de correntistas CAIXA selecionada via critérios do Screener.',
      'Canais de Disparo: Mensagem padronizada via WhatsApp Corporativo oficial e E-mail Transacional.',
      'Coleta: Telemetria de cliques, tempo de resposta e respostas atitudinais consolidadas nativamente na plataforma Maze.'
    ]
  },
  sections: [
    SHARED_INFORMACOES_SECTION,
    {
      id: 'contextualizacao',
      title: 'Contextualização',
      fields: [
        {
          key: 'objetivoGeral',
          type: 'textarea',
          label: 'Objetivo Geral',
          rows: 4
        },
        {
          key: 'objetivosEspecificos',
          type: 'list',
          numbered: true,
          multiline: true,
          label: 'Objetivos Específicos'
        },
        {
          key: 'impactosEsperados',
          type: 'list',
          numbered: true,
          multiline: true,
          label: 'Impactos Esperados'
        },
        {
          key: 'hipoteses',
          type: 'list',
          numbered: true,
          multiline: true,
          label: 'Hipóteses'
        }
      ]
    },
    {
      id: 'experimento',
      title: 'Experimento',
      fields: [
        {
          key: 'tabelaExperimento',
          type: 'experiment-table',
          rows: [
            {
              title: 'Metodologia Aplicada',
              helpText: 'Descrever quais os métodos que serão utilizados. Exemplo: Survey/Questionário.',
              subFields: [
                {
                  key: 'expMetodologia',
                  type: 'textarea',
                  label: 'Metodologia Aplicada',
                  rows: 3
                }
              ]
            },
            {
              title: 'Métricas (se aplicável)',
              helpText:
                'Descrever quais são os critérios para validar, invalidar ou tratar um objetivo, hipótese ou dúvida como inconclusiva.',
              subFields: [
                {
                  key: 'expMetricas',
                  type: 'list',
                  multiline: true,
                  label: 'Métricas (se aplicável)'
                }
              ]
            },
            {
              title: 'Artefato e Protótipo',
              helpText:
                'Listar quais informações existentes que podem nos auxiliar durante a pesquisa, quais principais certezas, suposições e dúvidas que já existem sobre o tema, além de pesquisas anteriores (dados internos) que podem ser úteis para o estudo.',
              subFields: [
                {
                  key: 'expArtefato',
                  type: 'textarea',
                  label: 'Artefato e Protótipo',
                  rows: 3
                }
              ]
            },
            {
              title: 'Condução e moderação',
              helpText: 'Descreva quem serão as pessoas responsáveis por cada papel:',
              subFields: [
                {
                  key: 'expConducao',
                  type: 'list',
                  multiline: true,
                  label: 'Condução e moderação'
                }
              ]
            },
            {
              title: 'Duração',
              helpText:
                'Descrever qual o tempo estimado desde o recrutamento até a entrega de resultados. Se possível, descreva quanto tempo pretende levar em cada uma dessas etapas (recrutamento, entrevistas, análise...)',
              subFields: [
                {
                  key: 'expDuracaoResumo',
                  type: 'text',
                  label: 'Duração'
                },
                {
                  key: 'expDuracaoEtapas',
                  type: 'list',
                  label: 'Etapas'
                }
              ]
            },
            {
              title: 'Material necessário para o participante',
              helpText: 'Descrever os materiais necessários para realização do experimento:',
              subFields: [
                {
                  key: 'expMaterial',
                  type: 'list',
                  label: 'Material necessário para o participante'
                }
              ]
            },
            {
              title: 'Perfil e amostra',
              helpText:
                'Listar a quantidade de pessoas que precisamos que respondam a pesquisa e qual o perfil delas, considerando:',
              subFields: [
                {
                  key: 'expPerfilMeta',
                  type: 'textarea',
                  label: 'Perfil e amostra',
                  rows: 2
                },
                {
                  key: 'expPerfilSegmentacaoTitulo',
                  type: 'text',
                  label: 'Segmentação'
                },
                {
                  key: 'expPerfilPersonas',
                  type: 'list',
                  multiline: true,
                  label: 'Personas'
                },
                {
                  key: 'expPerfilExclusao',
                  type: 'textarea',
                  label: 'Critérios de Exclusão',
                  rows: 2
                }
              ]
            },
            {
              title: 'Captura de Dados e Recrutamento',
              helpText:
                'Descrever de que forma foi coletada a base, através de que meio foi disparado o screener (se foi) e outras possíveis informações sobre o processo de recrutamento.',
              subFields: [
                {
                  key: 'expCapturaDados',
                  type: 'list',
                  multiline: true,
                  label: 'Captura de Dados e Recrutamento'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};