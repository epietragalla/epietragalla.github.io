/**
 * Schema Declarativo — Documento 3: Roteiro | Teste Assíncrono
 */

import { SHARED_INFORMACOES_DEFAULT, SHARED_INFORMACOES_SECTION } from './plano-pesquisa.js';

export const roteiroTesteAssincronoSchema = {
  id: 'roteiro-teste-assincrono',
  title: 'Roteiro | Teste Assíncrono',
  shortTitle: 'Roteiro',
  icon: 'route',
  sharedDefault: SHARED_INFORMACOES_DEFAULT,
  defaultFields: {
    objetivo:
      'Avaliar a experiência de uso da Central de Investimentos no SuperAPP, verificando se as informações sobre a carteira são apresentadas de forma clara e compreensível e se as principais ações (investir, resgatar, conhecer opções) e serviços correlatos podem ser localizados com autonomia pelos clientes.',
    boasVindasTitulo: 'Teste da Nova Central de Investimentos',
    boasVindasMensagem:
      'Olá! Agradecemos sua participação. Hoje você nos ajudará a avaliar uma nova experiência para o aplicativo da CAIXA.',
    boasVindasInstrucoes: [
      'Este é um teste interativo em um protótipo com dados e valores simulados.',
      'Realize este teste obrigatoriamente pelo seu telefone celular (smartphone).',
      'Leia atentamente as instruções de cada missão antes de iniciar a navegação.',
      'O teste leva cerca de 5 a 7 minutos para ser concluído.'
    ],
    boasVindasFechamento: "Clique em 'Começar' quando estiver pronto(a).",
    missoes: [
      {
        name: '[Nome da Missão 1 ex: Aposta Simples]',
        context:
          'Imagine que você acabou de acessar sua conta para verificar como está o seu dinheiro guardado e aplicado na CAIXA.',
        taskPrompt:
          'Observe a tela com atenção por 10 segundos. Em seguida, avance para responder o que você identificou.',
        pathDefinition:
          '[Tela Inicial Central de Investimentos -> Visualização do Topo/Gráfico -> Clique em Avançar]',
        tableRows: [
          { hipotese: '', perguntaPrimaria: '', perguntaSecundaria: '' },
          { hipotese: '', perguntaPrimaria: '', perguntaSecundaria: '' }
        ]
      }
    ],
    perguntasPosTarefas: [
      'Escala Likert (1 a 5): "Em uma escala de 1 a 5, quão fácil ou difícil foi concluir essa tarefa?"'
    ],
    questionarioEncerramento: [
      'Aplicação da Escala SUS (System Usability Scale - 10 itens padronizados)',
      'Pergunta Aberta Final: "Você encontrou alguma dificuldade ou gostaria de deixar alguma sugestão?"'
    ],
    telaAgradecimentoMensagem:
      'Teste concluído com sucesso! Suas respostas foram salvas e nos ajudarão a evoluir nosso produto. Muito obrigado!'
  },
  sections: [
    SHARED_INFORMACOES_SECTION,
    {
      id: 'objetivo',
      title: 'Objetivo',
      fields: [
        {
          key: 'objetivo',
          type: 'textarea',
          label: 'Objetivo',
          rows: 4
        }
      ]
    },
    {
      id: 'teste-usabilidade',
      title: 'Teste de Usabilidade',
      fields: [
        {
          key: 'boasVindasTitulo',
          type: 'text',
          label: 'Tela de boas-vindas — Título'
        },
        {
          key: 'boasVindasMensagem',
          type: 'textarea',
          label: 'Mensagem de Boas-Vindas',
          rows: 3
        },
        {
          key: 'boasVindasInstrucoes',
          type: 'list',
          numbered: true,
          label: 'Instruções importantes'
        },
        {
          key: 'boasVindasFechamento',
          type: 'text',
          label: 'Fechamento'
        },
        {
          key: 'missoes',
          type: 'missions'
        },
        {
          key: 'indicacaoPosTarefas',
          type: 'readonly-text',
          label: 'Perguntas pós-tarefas',
          text: 'Adequar ao contexto do projeto*'
        },
        {
          key: 'perguntasPosTarefas',
          type: 'list',
          numbered: true,
          multiline: true,
          label: 'Perguntas pós-tarefas'
        },
        {
          key: 'indicacaoQuestionario',
          type: 'readonly-text',
          label: 'Questionário e Encerramento',
          text: 'Adequar ao contexto do projeto*'
        },
        {
          key: 'questionarioEncerramento',
          type: 'list',
          numbered: true,
          multiline: true,
          label: 'Questionário e Encerramento'
        },
        {
          key: 'indicacaoAgradecimento',
          type: 'readonly-text',
          label: 'Tela de agradecimento',
          text: 'Adequar ao contexto do projeto*'
        },
        {
          key: 'telaAgradecimentoMensagem',
          type: 'textarea',
          label: 'Mensagem',
          rows: 3
        }
      ]
    }
  ]
};