# TAREFA

Crie um sistema web para REGISTRAR E PREENCHER a documentação de um processo de Teste de Usabilidade (projeto "SuperAPP Fase 21", CAIXA). O sistema deve ser feito somente com HTML, CSS e JavaScript puro (vanilla, sem frameworks e sem build), com arquitetura bem estruturada para ser expandida depois com outros processos e tipos de documento.

# DESIGN SYSTEM

Use obrigatoriamente o Material Design 3, seguindo TODAS as regras do arquivo `materialdesign3v2.md` anexo. Em especial:
- Tokens de cor semânticos M3 como CSS custom properties (nunca hex solto fora da definição dos tokens), com esquemas claro e escuro.
- Tema CLARO como padrão inicial, com botão de alternância apenas com ícone (IconButton) no TopAppBar, mostrando lua no tema claro e sol no tema escuro, com aria-label acessível.
- Escala tipográfica M3, escala de formas M3, grid de 4/8dp, elevação tonal e classes de janela (Compact < 600dp, Medium 600–839dp, Expanded ≥ 840dp).
- Componentes: TopAppBar, NavigationDrawer (Expanded), NavigationRail (Medium) e NavigationBar (Compact, 3–5 destinos), Cards, Buttons (filled, tonal, outlined, text), IconButtons, Chips, Text fields (outlined, com label persistente, supporting text e validação inline), Dialog, Snackbar.
- Acessibilidade: alvos de toque mínimos de 48x48dp, foco visível, navegação por teclado, labels ARIA, contraste mínimo 4.5:1.
- Responsivo (mobile-first). Evite anti-patterns de "fake Material".
- Para o cabeçalho dos documentos, use uma faixa em `primaryContainer`/`primary` com o título do documento. Não use logos nem imagens da CAIXA.

# FUNCIONALIDADES

1. Três documentos, navegáveis pelo menu de navegação: **Plano de Pesquisa**, **Screener** e **Roteiro | Teste Assíncrono**, todos dentro do mesmo projeto.
2. Cada documento reproduz FIELMENTE a estrutura, a ordem e os textos da documentação (conteúdo abaixo). Todo texto já preenchido deve vir como valor padrão EDITÁVEL, e os espaços em branco devem ser campos vazios para preenchimento.
3. Salvar localmente (localStorage), com autosave com debounce e indicador de "salvo" (Snackbar). Dados serializados em JSON.
4. Exportar o projeto inteiro em arquivo `.json` (download) e importar um `.json` (input file), com validação do formato, versão do schema e confirmação por Dialog antes de sobrescrever os dados atuais.
5. Botão para restaurar o conteúdo original do documento (com Dialog de confirmação).
6. Listas dinâmicas onde a documentação mostra listas (adicionar/remover itens), e linhas de tabela adicionáveis/removíveis onde houver tabela.
7. Estilos de impressão simples (`@media print`) para imprimir cada documento.

# REGRAS DE CONTEÚDO (CRÍTICO)

- Use SOMENTE o conteúdo listado abaixo. NÃO invente campos, seções, perguntas, textos de ajuda, dados, exemplos, missões extras, placeholders ou conteúdo que não esteja neste prompt.
- Os textos de ajuda em cinza da coluna esquerda da tabela "Experimento" fazem parte da documentação e devem aparecer como supporting text do respectivo campo.
- Os elementos de interface (botões, menus, mensagens do sistema) são a única exceção e devem ser mínimos e neutros.
- Mantenha os textos originais literalmente, inclusive os trechos entre colchetes, parênteses e asteriscos.

# ARQUITETURA (pensada para expansão)

Estrutura de pastas sugerida:

```
/index.html
/css/tokens.css        (tokens M3: cores claro/escuro, tipografia, formas, elevação, espaçamento)
/css/base.css          (reset, layout, window size classes)
/css/components.css    (componentes M3 reutilizáveis)
/css/print.css
/js/app.js             (bootstrap, roteamento por hash)
/js/core/store.js      (estado, localStorage, import/export, versionamento de schema)
/js/core/router.js
/js/core/theme.js
/js/core/renderer.js   (renderiza qualquer documento a partir de um schema declarativo)
/js/core/ui.js         (Dialog, Snackbar, helpers)
/js/schemas/plano-pesquisa.js
/js/schemas/screener.js
/js/schemas/roteiro-teste-assincrono.js
/js/schemas/index.js   (registro de documentos/processos)
```

Princípios:
- Cada documento é definido por um SCHEMA declarativo (seções, tipos de campo, valores padrão, textos de ajuda). O renderer genérico monta a UI a partir do schema, de modo que novos documentos e processos possam ser adicionados criando apenas um novo arquivo de schema e registrando-o em `schemas/index.js`.
- Tipos de campo suportados: `text`, `textarea`, `list` (itens dinâmicos), `table` (colunas + linhas dinâmicas), `date`, `number`, `readonly-text`.
- Dados salvos em estrutura como esta (adapte se necessário):

```
{
  "schemaVersion": 1,
  "project": { "name": "SuperAPP Fase 21" },
  "documents": {
    "plano-pesquisa": { "fields": { ... } },
    "screener": { "fields": { ... } },
    "roteiro-teste-assincrono": { "fields": { ... } }
  },
  "updatedAt": "ISO-8601"
}
```

- Código comentado, sem dependências externas (apenas Google Fonts opcional para Roboto e Material Symbols), ES Modules.
- Entregue todos os arquivos completos e funcionais, e instruções curtas de como abrir (observando que ES Modules exigem servidor local, por exemplo `npx serve` ou `python -m http.server`).

# CONTEÚDO DOS DOCUMENTOS

## Bloco comum "Informações" (aparece no topo dos 3 documentos; compartilhe os mesmos dados entre eles, de modo que editar em um atualize nos outros)

- Área interessada: Gerência / Coordenação de Produtos de Investimento (SuperAPP CAIXA)
- Stakeholders envolvidos (lista editável):
  - Cibele Martins Alvarenga Henriques (Demandante / Negócio de Investimentos)
  - Carolina Alves Pereira (Product Designer / UX UI)
  - Clarissa Lima de Rezende (Coordenação de Research & Operações)
  - Marcela Dantas de Noronha (Pesquisadora Responsável / Execução)
  - Estefano Silvestre Pietragalla (Pesquisador / Apoio Metodológico)
  - Maxwell Pessoa Canelhas Fontes (Liderança / Research Lead)
- Nome do projeto: SuperAPP Fase 21

---

## DOCUMENTO 1: PLANO DE PESQUISA

### Seção: Informações
(bloco comum acima)

### Seção: Contextualização

**Objetivo Geral** (textarea):
"Avaliar a usabilidade, a arquitetura de informação e a fluidez cognitiva da tela inicial da Central de Investimentos do SuperAPP da CAIXA, garantindo que o cliente compreenda instantaneamente seu patrimônio consolidado e consiga localizar produtos, ações transacionais e serviços de suporte com autonomia e segurança."

**Objetivos Específicos** (lista editável):
1. "Mensurar a capacidade do usuário em interpretar o gráfico semicircular de distribuição da carteira, o valor total investido (R$ 100 mil) e sua correlação direta com a lista de produtos (Renda Fixa, Fundos, Poupança, Caixinhas)."
2. "Avaliar a clareza e a diferenciação intencional entre os atalhos de topo (Investir, Resgatar, Todos produtos) em relação ao toque direto nos itens da lista."
3. "Identificar os modelos mentais e expectativas geradas pelo card Agregador de investimentos (se o cliente compreende que é apenas visualização consolidada de outros bancos ou se infere transferência de custódia)."
4. "Mapear a facilidade de localização e a compreensão dos termos da base da tela: Perfil do investidor, Cadastro do investidor e Remuneração do distribuidor."

**Impactos Esperados** (lista editável):
1. "Reduzir a barreira de entrada digital e o sentimento de insegurança de clientes correntistas tradicionais na gestão de seus ativos."
2. "Fornecer insumos quantitativos (mapas de calor e taxas de sucesso) e qualitativos para subsidiar melhorias de interface (V2) antes do rollout em escala nacional."

**Hipóteses** (lista editável):
1. "H1: Usuários de menor maturidade digital (Persona 3) associam as cores do gráfico semicircular à lista de produtos sem necessidade de legendas adicionais."
2. "H2: O atalho Investir entra em conflito cognitivo com "Todos produtos", gerando dúvidas sobre onde descobrir novas opções de aplicação."
3. "H3: O card Agregador de investimentos gera a suposição incorreta de que o dinheiro de outras instituições será transferido financeiramente para a CAIXA."
4. "H4: O termo regulatório "Remuneração do distribuidor" não é compreendido pelo cliente pessoa física como transparência de taxas, gerando confusão ou desinteresse."

### Seção: Experimento
Tabela de duas colunas: "Informação" e "Descrição". Cada linha tem, à esquerda, o nome da informação e o texto de ajuda; à direita, o campo editável com o valor padrão.

1. **Metodologia Aplicada**
   - Texto de ajuda: "Descrever quais os métodos que serão utilizados. Exemplo: Survey/Questionário."
   - Valor: "Teste de Usabilidade Não Moderado Remoto com tarefas baseadas em protótipo navegável via plataforma Maze. Inclui teste de primeira impressão (5-second adaptado), missões de clique (missions) e perguntas estruturadas pós tarefa."

2. **Métricas (se aplicável)**
   - Texto de ajuda: "Descrever quais são os critérios para validar, invalidar ou tratar um objetivo, hipótese ou dúvida como inconclusiva."
   - Valor (lista):
     - "Taxa de Sucesso da Missão: Sucesso Direto (Direct Success) e Sucesso Indireto (Indirect Success)."
     - "Taxa de Cliques Errados (Misclick Rate): Identificação de dispersão e áreas de confusão via Mapas de Calor (Heatmaps)."
     - "Tempo Médio de Resolução da Tarefa (Time on Task)."
     - "Percepção de Facilidade / Carga Cognitiva: Escala de Avaliação de 1 a 5 estrelas ao final do teste."

3. **Artefato e Protótipo**
   - Texto de ajuda: "Listar quais informações existentes que podem nos auxiliar durante a pesquisa, quais principais certezas, suposições e dúvidas que já existem sobre o tema, além de pesquisas anteriores (dados internos) que podem ser úteis para o estudo."
   - Valor: "Protótipo interativo desenvolvido no Figma por Carolina Alves Pereira, otimizado para navegação mobile com links de tela e caminhos de clique funcionais para as missões previstas."

4. **Condução e moderação**
   - Texto de ajuda: "Descreva quem serão as pessoas responsáveis por cada papel:"
   - Valor (lista):
     - "Configuração, Análise e Relatório: Marcela Dantas (Pesquisadora Líder) e Estefano Silvestre (Apoio)."
     - "Supervisão Metodológica: Maxwell Canelhas."
     - "Recrutamento e Gestão de Disparos: Clarissa Lima em articulação com as áreas gestoras de base da CAIXA."
     - "Validação de Negócio e Design: Cibele Martins e Carolina Alves Pereira."

5. **Duração**
   - Texto de ajuda: "Descrever qual o tempo estimado desde o recrutamento até a entrega de resultados. Se possível, descreva quanto tempo pretende levar em cada uma dessas etapas (recrutamento, entrevistas, análise...)"
   - Valor: "Tempo Total Estimado: 8 a 10 dias úteis." seguido da lista:
     - "Setup do Maze e Teste Piloto Interno: 2 dias úteis."
     - "Disparo do Screener e Coleta no Maze: 3 a 4 dias úteis (janela ativa de respostas)."
     - "Tabulação, Codificação e Relatório Executivo: 3 a 4 dias úteis."
     - "Duração por participante: 5 a 7 minutos por sessão."

6. **Material necessário para o participante**
   - Texto de ajuda: "Descrever os materiais necessários para realização do experimento:"
   - Valor (lista):
     - "Telefone Celular (Smartphone iOS ou Android) com navegador web atualizado;"
     - "Conexão de internet móvel (4G/5G) ou Wi-Fi estável;"
     - "(Computadores e tablets bloqueados via configuração do Maze)."

7. **Perfil e amostra**
   - Texto de ajuda: "Listar a quantidade de pessoas que precisamos que respondam a pesquisa e qual o perfil delas, considerando:"
   - Valor: "Meta de Amostra: 30 a 50 testes concluídos e válidos (disparo em base de 200 a 300 contatos)." 
   - Subtítulo/valor: "Segmentação em 3 Personas:" com lista:
     - "P1: Alta maturidade digital + Com experiência em investimentos."
     - "P2: Alta maturidade digital + Sem experiência prévia em investimentos."
     - "P3 (Público Estratégico 50+): Baixa maturidade digital + Possui investimentos (Poupança/Renda Fixa)."
   - Valor final: "Critérios de Exclusão: Colaboradores de bancos/fintechs, profissionais de TI/Design/UX e investidores do tipo Day Trader / especuladores diários."

8. **Captura de Dados e Recrutamento**
   - Texto de ajuda: "Descrever de que forma foi coletada a base, através de que meio foi disparado o screener (se foi) e outras possíveis informações sobre o processo de recrutamento."
   - Valor (lista):
     - "Fonte: Base oficial de correntistas CAIXA selecionada via critérios do Screener."
     - "Canais de Disparo: Mensagem padronizada via WhatsApp Corporativo oficial e E-mail Transacional."
     - "Coleta: Telemetria de cliques, tempo de resposta e respostas atitudinais consolidadas nativamente na plataforma Maze."

---

## DOCUMENTO 2: SCREENER

### Seção: Informações
(bloco comum acima)

### Seção: Informações dos participantes

- **Perfil das pessoas usuárias:** "Clientes correntistas da CAIXA, distribuídos em 3 perfis cognitivos:"
  - "P1: Alta maturidade digital + Com experiência em investimentos."
  - "P2: Alta maturidade digital + Sem experiência em investimentos (iniciante)."
  - "P3: Baixa maturidade digital (público 50+) + Com experiência em investimentos (recursos em Poupança/Renda Fixa)."
- **Quantidade de participantes por perfil (5 pessoas Clientes + 1 piloto Cliente , por exemplo):** "Meta: 30 a 50 testes válidos no Maze (sendo ~10 a 15 de cada persona) + 3 testes pilotos internos."
  - "Base de disparo: 200 a 300 contatos da base CAIXA."
- **Método de pesquisa:** "Recrutamento quantitativo via questionário de triagem (Screener) seguido de teste não moderado."
- **Aplicação (ferramenta):** "XXXXXXX"
- **Disparo do Screener:** "26 de novembro de 2026 (data estimada conforme alinhamento)" (use campo de data, com o texto complementar "(data estimada conforme alinhamento)" mantido como texto de apoio)

### Seção: Perguntas

**Subseção: Dados Demográficos**

1. "Qual é o seu nome completo? (Pergunta aberta)"
2. "Qual é a sua idade? (Pergunta aberta / Numérica)"
   - "[Menos de 18 anos] (Desqualificar)"
   - "[18 a 34 anos] (Direcionar para P1 ou P2)"
   - "[35 a 49 anos] (Direcionar para P1 ou P2)"
   - "[50 anos ou mais] (Direcionar prioritariamente para P3)"
3. "Qual é a sua profissão ou área de atuação? (Pergunta aberta com filtro eliminatório)"
   - "Regra de exclusão: Se atuar em Bancos/Financeiras, Fintechs, TI, Design ou Pesquisa de UX → Desqualificar"
4. "Após preencher esse questionário, você autoriza entrarmos em contato via WhatsApp ou e-mail para participar de testes de novas funcionalidades do aplicativo CAIXA? (Múltipla escolha)"
   - "( ) Sim (Avançar)"
   - "( ) Não (Desqualificar)"
5. "Qual é o seu telefone com WhatsApp? (Formato telefone com DDD)"
6. "Qual é o seu e-mail principal? (Formato e-mail)"

**Subseção: Perfil do Usuário**

7. "Você já participou de algum estudo ou pesquisa da CAIXA? Se sim, há quanto tempo? (Múltipla escolha)"
   - "a. Sim, há menos de 3 meses (Desqualificar (evitar vício de amostragem))"
   - "b. Sim, há mais de 3 meses (Avançar)"
   - "c. Nunca participei (Avançar)"
8. "Como você costuma realizar operações no seu banco no dia a dia? (Classificador de Maturidade Digital)"
   - "a. Faço praticamente tudo pelo celular no aplicativo do banco de forma autônoma. (Classificador: Alta Maturidade Digital)"
   - "b. Uso o aplicativo apenas para ver saldo; prefiro ir à agência, lotérica ou caixa eletrônico por achar o app complicado ou inseguro. (Classificador: Baixa Maturidade Digital (P3))"

**Subseção: Perguntas contextuais para a pesquisa**

9. "Além da conta corrente, onde você possui dinheiro guardado ou investido atualmente? (Classificador de Experiência)"
   - "a. Não possuo valores guardados ou uso somente a Poupança tradicional. (Classificador: Sem Experiência (P2))"
   - "b. Possuo valores em Caixinhas, Renda Fixa (CDB, LCI/LCA, Tesouro), Fundos ou Ações. (Classificador: Com Experiência (P1 ou P3))"
10. "Com qual frequência você realiza operações em Bolsa de Valores ou Day Trade? (Filtro anti-viés)"
    - "a. Frequentemente / Diariamente (Desqualificar (Perfil Trader não é o público alvo deste produto))"
    - "b. Ocasionalmente ou Nunca (Avançar)"

Cada pergunta e cada alternativa deve ser um campo editável (texto) com listas dinâmicas para as alternativas. Não numere automaticamente além da numeração acima. Nesta tela não deve haver campos de resposta de participante; é o roteiro do questionário, não o formulário de resposta.

---

## DOCUMENTO 3: ROTEIRO | TESTE ASSÍNCRONO

### Seção: Informações
(bloco comum acima)

### Seção: Objetivo
"Avaliar a experiência de uso da Central de Investimentos no SuperAPP, verificando se as informações sobre a carteira são apresentadas de forma clara e compreensível e se as principais ações (investir, resgatar, conhecer opções) e serviços correlatos podem ser localizados com autonomia pelos clientes."

### Seção: Teste de Usabilidade

**Tela de boas-vindas**
- Título: "Teste da Nova Central de Investimentos"
- Mensagem de Boas-Vindas:
  "Olá! Agradecemos sua participação. Hoje você nos ajudará a avaliar uma nova experiência para o aplicativo da CAIXA."
  Instruções importantes (lista numerada editável):
  1. "Este é um teste interativo em um protótipo com dados e valores simulados."
  2. "Realize este teste obrigatoriamente pelo seu telefone celular (smartphone)."
  3. "Leia atentamente as instruções de cada missão antes de iniciar a navegação."
  4. "O teste leva cerca de 5 a 7 minutos para ser concluído."
  Fechamento: "Clique em 'Começar' quando estiver pronto(a)."

**MISSÃO 01: [Nome da Missão 1 ex: Aposta Simples]** (o nome da missão é um campo editável; permita adicionar novas missões com a mesma estrutura, numeradas automaticamente "MISSÃO 02", etc., e remover missões adicionadas)
- Contexto / Cenário: "Imagine que você acabou de acessar sua conta para verificar como está o seu dinheiro guardado e aplicado na CAIXA."
- Instrução da Tarefa (Task Prompt): "Observe a tela com atenção por 10 segundos. Em seguida, avance para responder o que você identificou."
- Caminho Esperado (Path Definition): "[Tela Inicial Central de Investimentos -> Visualização do Topo/Gráfico -> Clique em Avançar]"
- Tabela com as colunas "Hipótese", "Pergunta primária" e "Pergunta secundária", iniciando com 2 linhas vazias (uma célula de texto por coluna), com botão para adicionar/remover linhas.

**Perguntas pós-tarefas**
- Indicação: "Adequar ao contexto do projeto*"
- Lista editável: 1. "Escala Likert (1 a 5): "Em uma escala de 1 a 5, quão fácil ou difícil foi concluir essa tarefa?""

**Questionário e Encerramento**
- Indicação: "Adequar ao contexto do projeto*"
- Lista editável:
  1. "Aplicação da Escala SUS (System Usability Scale - 10 itens padronizados)"
  2. "Pergunta Aberta Final: "Você encontrou alguma dificuldade ou gostaria de deixar alguma sugestão?""

**Tela de agradecimento**
- Indicação: "Adequar ao contexto do projeto*"
- Mensagem: "Teste concluído com sucesso! Suas respostas foram salvas e nos ajudarão a evoluir nosso produto. Muito obrigado!"

---

# ENTREGA

1. Todos os arquivos completos, prontos para rodar.
2. Confirme ao final, em uma lista curta, que nenhum conteúdo além do descrito acima foi adicionado nos documentos.