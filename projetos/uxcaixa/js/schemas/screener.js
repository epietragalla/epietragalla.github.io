/**
 * Schema Declarativo — Documento 2: Screener
 */

import { SHARED_INFORMACOES_DEFAULT, SHARED_INFORMACOES_SECTION } from './plano-pesquisa.js';

export const screenerSchema = {
  id: 'screener',
  title: 'Screener',
  shortTitle: 'Screener',
  icon: 'checklist',
  sharedDefault: SHARED_INFORMACOES_DEFAULT,
  defaultFields: {
    perfilIntro: 'Clientes correntistas da CAIXA, distribuídos em 3 perfis cognitivos:',
    perfilLista: [
      'P1: Alta maturidade digital + Com experiência em investimentos.',
      'P2: Alta maturidade digital + Sem experiência em investimentos (iniciante).',
      'P3: Baixa maturidade digital (público 50+) + Com experiência em investimentos (recursos em Poupança/Renda Fixa).'
    ],
    quantidadeMeta: 'Meta: 30 a 50 testes válidos no Maze (sendo ~10 a 15 de cada persona) + 3 testes pilotos internos.',
    quantidadeBase: ['Base de disparo: 200 a 300 contatos da base CAIXA.'],
    metodoPesquisa: 'Recrutamento quantitativo via questionário de triagem (Screener) seguido de teste não moderado.',
    aplicacaoFerramenta: 'XXXXXXX',
    disparoScreener: '2026-11-26',
    perguntasSubsecoes: [
      {
        title: 'Dados Demográficos',
        questions: [
          {
            number: 1,
            text: 'Qual é o seu nome completo? (Pergunta aberta)',
            options: []
          },
          {
            number: 2,
            text: 'Qual é a sua idade? (Pergunta aberta / Numérica)',
            options: [
              '[Menos de 18 anos] (Desqualificar)',
              '[18 a 34 anos] (Direcionar para P1 ou P2)',
              '[35 a 49 anos] (Direcionar para P1 ou P2)',
              '[50 anos ou mais] (Direcionar prioritariamente para P3)'
            ]
          },
          {
            number: 3,
            text: 'Qual é a sua profissão ou área de atuação? (Pergunta aberta com filtro eliminatório)',
            options: [
              'Regra de exclusão: Se atuar em Bancos/Financeiras, Fintechs, TI, Design ou Pesquisa de UX → Desqualificar'
            ]
          },
          {
            number: 4,
            text: 'Após preencher esse questionário, você autoriza entrarmos em contato via WhatsApp ou e-mail para participar de testes de novas funcionalidades do aplicativo CAIXA? (Múltipla escolha)',
            options: [
              '( ) Sim (Avançar)',
              '( ) Não (Desqualificar)'
            ]
          },
          {
            number: 5,
            text: 'Qual é o seu telefone com WhatsApp? (Formato telefone com DDD)',
            options: []
          },
          {
            number: 6,
            text: 'Qual é o seu e-mail principal? (Formato e-mail)',
            options: []
          }
        ]
      },
      {
        title: 'Perfil do Usuário',
        questions: [
          {
            number: 7,
            text: 'Você já participou de algum estudo ou pesquisa da CAIXA? Se sim, há quanto tempo? (Múltipla escolha)',
            options: [
              'a. Sim, há menos de 3 meses (Desqualificar (evitar vício de amostragem))',
              'b. Sim, há mais de 3 meses (Avançar)',
              'c. Nunca participei (Avançar)'
            ]
          },
          {
            number: 8,
            text: 'Como você costuma realizar operações no seu banco no dia a dia? (Classificador de Maturidade Digital)',
            options: [
              'a. Faço praticamente tudo pelo celular no aplicativo do banco de forma autônoma. (Classificador: Alta Maturidade Digital)',
              'b. Uso o aplicativo apenas para ver saldo; prefiro ir à agência, lotérica ou caixa eletrônico por achar o app complicado ou inseguro. (Classificador: Baixa Maturidade Digital (P3))'
            ]
          }
        ]
      },
      {
        title: 'Perguntas contextuais para a pesquisa',
        questions: [
          {
            number: 9,
            text: 'Além da conta corrente, onde você possui dinheiro guardado ou investido atualmente? (Classificador de Experiência)',
            options: [
              'a. Não possuo valores guardados ou uso somente a Poupança tradicional. (Classificador: Sem Experiência (P2))',
              'b. Possuo valores em Caixinhas, Renda Fixa (CDB, LCI/LCA, Tesouro), Fundos ou Ações. (Classificador: Com Experiência (P1 ou P3))'
            ]
          },
          {
            number: 10,
            text: 'Com qual frequência você realiza operações em Bolsa de Valores ou Day Trade? (Filtro anti-viés)',
            options: [
              'a. Frequentemente / Diariamente (Desqualificar (Perfil Trader não é o público alvo deste produto))',
              'b. Ocasionalmente ou Nunca (Avançar)'
            ]
          }
        ]
      }
    ]
  },
  sections: [
    SHARED_INFORMACOES_SECTION,
    {
      id: 'informacoes-participantes',
      title: 'Informações dos participantes',
      fields: [
        {
          key: 'perfilIntro',
          type: 'text',
          label: 'Perfil das pessoas usuárias:'
        },
        {
          key: 'perfilLista',
          type: 'list',
          multiline: true,
          label: 'Perfis cognitivos'
        },
        {
          key: 'quantidadeMeta',
          type: 'textarea',
          rows: 2,
          label: 'Quantidade de participantes por perfil (5 pessoas Clientes + 1 piloto Cliente , por exemplo):'
        },
        {
          key: 'quantidadeBase',
          type: 'list',
          label: 'Base de disparo'
        },
        {
          key: 'metodoPesquisa',
          type: 'textarea',
          rows: 2,
          label: 'Método de pesquisa:'
        },
        {
          key: 'aplicacaoFerramenta',
          type: 'text',
          label: 'Aplicação (ferramenta):'
        },
        {
          key: 'disparoScreener',
          type: 'date',
          label: 'Disparo do Screener:',
          supportingText: '(data estimada conforme alinhamento)'
        }
      ]
    },
    {
      id: 'perguntas',
      title: 'Perguntas',
      fields: [
        {
          key: 'perguntasSubsecoes',
          type: 'screener-questions'
        }
      ]
    }
  ]
};