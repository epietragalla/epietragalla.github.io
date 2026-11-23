# PAPEL

Atue como Líder de UX e Especialista em UX Design sênior, com forte domínio de front-end (HTML, CSS e JavaScript puro) e do Material Design 3 (M3). Você vai projetar e construir uma aplicação web para DOCUMENTAR E GERENCIAR TODO O PROCESSO DE UX DESIGN de múltiplos projetos.

# OBJETIVO

Criar um site (HTML + CSS + JS vanilla, sem frameworks e sem build, rodando abrindo o index.html) em que o usuário:
1. Cria e gerencia vários projetos de UX.
2. Percorre as 5 etapas do processo (Discover, Define, Ideate, Prototype, Evaluate).
3. Adiciona, em cada etapa, os métodos que fazem sentido para aquele projeto.
4. Usa cada método como uma ferramenta funcional, registrando achados, andamento e evidências.
5. Acompanha o progresso por uma timeline principal e por um roadmap detalhado.
6. Define responsáveis pelo projeto, por etapa e por método.
7. Salva e importa tudo em JSON.

# DESIGN SYSTEM (OBRIGATÓRIO)

Seguir rigorosamente o Material Design 3 / M3 Expressive, conforme a skill "material-design-3-ui" anexada:
- Tokens semânticos de cor M3 via CSS custom properties (primary, onPrimary, primaryContainer, secondary, tertiary, surface, surfaceContainerLowest…Highest, onSurface, onSurfaceVariant, outline, outlineVariant, error etc.). Nenhum hex solto fora da definição dos tokens.
- Tema CLARO como padrão inicial + botão de tema SOMENTE ÍCONE (IconButton) no TopAppBar, alternando direto para o tema oposto (ícone de lua no claro, sol no escuro) com aria-label acessível. Persistir a escolha.
- Escala tipográfica M3 completa (display/headline/title/body/label), sem tamanhos arbitrários.
- Escala de formas M3 (4/8/12/16/28dp/full), elevação tonal + sombras sutis, grid de 4/8dp.
- Layout adaptativo por window size classes: Compact (<600) com NavigationBar (3 a 5 destinos); Medium (600–839) com NavigationRail; Expanded (≥840) com NavigationDrawer.
- Componentes canônicos: TopAppBar, Cards (elevated/filled/outlined), Buttons (filled/tonal/outlined/text), IconButtons, FAB/ExtendedFAB, Chips (assist/filter/input/suggestion), Dialog (só para decisões críticas), BottomSheet, Snackbar (feedback transitório), Text fields (filled/outlined com label persistente, supporting text e validação inline), Segmented buttons, Progress indicators, Tabs.
- Cada uma das 5 etapas tem uma cor própria derivada dos tokens (container/onContainer), inspirada na imagem de referência: Discover (vermelho/rosa), Define (roxo), Ideate (azul/índigo), Prototype (teal/ciano), Evaluate (verde). Funcionar em claro e escuro com contraste mínimo 4.5:1.
- Acessibilidade: alvos de toque mínimo 48x48dp, focus ring visível, navegação total por teclado, ARIA correto, prefers-reduced-motion respeitado, alternativa por teclado para TODA ação de arrastar.

# O PROCESSO UX (CONTEÚDO BASE: tudo abaixo deve existir como catálogo de dados)

Cada etapa tem: nome, descrição/objetivo, cor, e grupos de métodos. Cada grupo contém os métodos.

## 1. DISCOVER
Objetivo: "Obter insights para definir melhor o problema."
- Grupo Stakeholders: O que queremos fazer? | Para quem? | Por quê? Objetivo de negócio? | Concorrentes | Métricas | Limitações técnicas
- Grupo Dados: Análise de dados internos | Análise competitiva | Inventário de conteúdo | Avaliação de especialista (se produto existente)
- Grupo Pesquisa com usuários: Entrevistas com usuários | Surveys | Grupos focais

## 2. DEFINE
Objetivo: "Ter uma visão clara do problema, do objetivo e dos usuários."
- Grupo Entender o usuário: Persona | Mapa de empatia | Jornada do usuário / Experiência do usuário | Storyboards | User stories
- Grupo Redefinir o problema: Priorização de insights | Mapa de afinidade / Card sorting | Suposições (assumptions) | Declaração do problema | Proposta de valor | Perguntas "Como poderíamos…?" (How Might We)

## 3. IDEATE
Objetivo: "Encontrar a solução para o problema com base nos insights."
- Grupo Workshops: Montar um time | Brainstorming | Dinâmicas (6 to 1, Crazy 8, Round Robin…) | Benchmarking | Card sorting
- Grupo Criação: Mapa mental | Mapa de afinidade | UX magic | Storyboard | Jornada do usuário (com solução) | Fluxos de usuário | Arquitetura de informação

## 4. PROTOTYPE
Objetivo: "Construir e testar ideias. Errar rápido para acertar mais rápido."
- Grupo Protótipo de papel: Desenho rápido à mão | Simulação de interações | Testes | Feedback
- Grupo Wireframe: Telas em preto e branco | Fluxos de usuário detalhados | Interações | Testes | Feedback
- Grupo Protótipo Hi-Fi: Pesquisa de UI | Mockups | Protótipo interativo | Microinterações

## 5. EVALUATE
Objetivo: "A solução responde ao problema?"
- Grupo Testes de usabilidade: Shadowing (observação) | Survey SUS | Avaliação de especialista (por outro designer de UX) | Teste A/B
- Grupo Síntese: Análise de resultados | Go / No-go | Se no-go, volta e tenta de novo | Se go, você ganhou!

Regras do catálogo:
- Manter os nomes originais (em inglês) com tradução PT-BR, e deixar o catálogo em um arquivo separado (catalog.js) para fácil edição.
- Alguns métodos aparecem em mais de uma etapa (ex.: Card sorting, Mapa de afinidade, Storyboard, Jornada do usuário, Fluxos de usuário, Testes, Feedback). Cada instância é independente por etapa, com id próprio.
- Permitir ao usuário criar MÉTODOS PERSONALIZADOS dentro de qualquer etapa.

# ARQUITETURA DA INFORMAÇÃO / TELAS

1. **Projetos (home)**: grid de cards com nome, descrição, capa/cor, progresso geral, responsáveis (avatares), prazo e status. Criar, duplicar, arquivar, excluir (com Snackbar de desfazer) e reordenar projetos arrastando. Busca e filtros por status via chips.
2. **Visão geral do projeto**: resumo, objetivo, equipe, progresso por etapa, próximos passos, atividade recente.
3. **Timeline principal**: ver detalhes abaixo.
4. **Etapa (clicável)**: cabeçalho com objetivo, responsável, datas e % de conclusão. Lista os grupos de métodos do catálogo. O usuário escolhe quais métodos adicionar ao projeto (seletor com busca, chips por grupo e sugestões). Os adicionados aparecem como cards reordenáveis com status e responsável.
5. **Método (workspace funcional)**: tela/painel dedicado, ver "Motor de métodos".
6. **Roadmap**: ver detalhes abaixo.
7. **Equipe e responsáveis**: cadastro de pessoas (nome, papel, e-mail opcional, cor/avatar), atribuição a projeto, etapa e método, carga de trabalho por pessoa.
8. **Biblioteca / Guia de métodos**: cada método do catálogo com explicação, quando usar, como fazer (passo a passo), entregáveis típicos, duração estimada e erros comuns (conteúdo educativo escrito por você como especialista).
9. **Configurações**: tema, importar/exportar JSON, backup automático, idioma (PT-BR padrão), limpar dados.

Navegação: NavigationBar/Rail/Drawer adaptativos com Projetos, Visão geral, Etapas, Roadmap, Equipe, Biblioteca. Breadcrumb (Projeto > Etapa > Método). Atalhos de teclado (ex.: "/" para busca, "n" para novo, Ctrl+K para paleta de comandos, Ctrl+Z para desfazer).

# TIMELINE PRINCIPAL

- Barra horizontal FIXA (sticky) no topo da área de conteúdo do projeto, com as 5 etapas conectadas, cada uma com cor, ícone, % concluído (anel/barra de progresso) e contagem de métodos concluídos/total. Etapa atual destacada. Clicar navega até a etapa.
- Seção própria "Timeline" (tela cheia) mostrando cada etapa expandida com todos os métodos adicionados, status, responsável, datas e progresso individual, atualizando em tempo real conforme o usuário adiciona ou conclui métodos.
- Cálculo: % da etapa = média ponderada do progresso dos métodos adicionados (peso configurável, padrão igual). Etapa sem métodos mostra "0% - adicione métodos". % geral do projeto = média ponderada das etapas.
- Arrastar métodos entre etapas não é permitido (cada método pertence a uma etapa), mas reordenar dentro da etapa sim.
- Animação suave de preenchimento do progresso ao mudar valores.

# ROADMAP DETALHADO

- Visões alternáveis (segmented button): Gantt (barras horizontais por etapa e método), Quadro Kanban (A fazer / Em andamento / Em revisão / Concluído) e Lista/tabela.
- Gantt com zoom (semana/mês/trimestre), arrastar barras para mover datas, arrastar bordas para redimensionar, linha do "hoje", marcos (milestones) e dependências simples entre métodos.
- Cada item: título, etapa, método, responsável, datas, status, prioridade, esforço estimado, riscos/bloqueios, entregáveis, checklist, comentários.
- Filtros por etapa, responsável, status e prioridade.
- Alertas de atrasos e itens sem responsável.
- Sincronia total: alterar datas e status no roadmap atualiza a timeline e o método, e vice-versa (fonte única de dados).

# MOTOR DE MÉTODOS (cada método é funcional)

Construa um motor genérico baseado em BLOCOS reutilizáveis e, por cima, um template específico por método (cada template define quais blocos, campos e visualizações aparecem). Todo método tem o cabeçalho padrão: status, responsável(eis), datas, progresso, objetivo, e as abas **Planejar / Executar / Achados / Evidências / Conclusão**.

Blocos reutilizáveis:
- Texto rico simples (markdown básico) | Checklist com progresso | Tabela editável (linhas/colunas) | Campos de formulário (texto, número, escala, seleção, data) | Cards/post-its em quadro livre (arrastar, agrupar, colorir) | Kanban | Tags e chips | Escala de avaliação / Likert | Matriz 2x2 (impacto x esforço, importância x urgência) | Lista priorizável (arrastar) | Anexos e links (URL, imagem em base64 com limite de tamanho) | Canvas de desenho simples (para protótipo de papel e wireframes) | Gráfico simples (barras/pizza em SVG/canvas) | Comentários | Histórico de alterações.

Padrão obrigatório dentro de cada método: **Achados (insights)**, com título, descrição, evidência vinculada, severidade/impacto, tags e opção de "promover a insight" que alimenta Define e Ideate. Também um campo de "Conclusão e próximos passos".

Templates específicos (implementar no mínimo estes comportamentos):

DISCOVER
- Stakeholders (6 perguntas): cada pergunta vira um campo estruturado. Concorrentes = tabela comparativa; Métricas = lista de KPIs com meta/valor atual; Limitações técnicas = lista com impacto e mitigação.
- Análise de dados internos: fontes, métricas, gráfico simples, insights.
- Análise competitiva: matriz concorrentes x critérios com pontuação, pontos fortes/fracos, gráfico comparativo.
- Inventário de conteúdo: tabela (página/URL, tipo, dono, qualidade, ação: manter/editar/remover).
- Avaliação de especialista: checklist de heurísticas de Nielsen, severidade por achado.
- Entrevistas: roteiro de perguntas, lista de participantes, notas por entrevista, transcrição, tags de temas, citações destacadas.
- Surveys: construtor de perguntas, registro de respostas, resumo com gráficos.
- Grupos focais: roteiro, participantes, notas por tópico, citações.

DEFINE
- Persona: card visual completo (foto/avatar, bio, objetivos, dores, comportamentos, citação, contexto) com múltiplas personas.
- Mapa de empatia: 4 a 6 quadrantes (pensa, sente, diz, faz, dores, ganhos) com post-its arrastáveis.
- Jornada do usuário: etapas na horizontal, linhas (ações, pensamentos, emoções, pontos de contato, dores, oportunidades), curva de emoção editável por arraste.
- Storyboards: quadros sequenciais com desenho/imagem + legenda, reordenáveis.
- User stories: formato "Como… quero… para…" com critérios de aceitação, prioridade (MoSCoW) e épico.
- Priorização de insights: matriz impacto x esforço com itens arrastáveis.
- Mapa de afinidade / Card sorting: post-its livres, arrastar para agrupar, nomear grupos.
- Suposições: tabela suposição, risco, confiança, como validar, status (validada/invalidada).
- Declaração do problema: template guiado + versões e comparação.
- Proposta de valor: Value Proposition Canvas.
- How Might We: gerador de perguntas guiado, votação e agrupamento.

IDEATE
- Montar um time: participantes, papéis, agenda, convites.
- Brainstorming e dinâmicas: timer, regras, bloco de ideias, votação por pontos, cada dinâmica (6 to 1, Crazy 8 com 8 quadros cronometrados, Round Robin) com modo guiado.
- Benchmarking: referências com prints/links, o que aprendemos, o que aplicar.
- Card sorting (aberto/fechado): cartões, categorias, resultados por participante.
- Mapa mental: nós arrastáveis e conectáveis, expandir/colapsar.
- UX magic: espaço para ideias "fora da caixa" com viabilidade x encanto.
- Storyboard e Jornada com solução: reaproveitam os templates de Define com a camada "solução".
- Fluxos de usuário: editor de nós e conexões (início, tela, decisão, fim), arrastar e conectar, exportar como imagem.
- Arquitetura de informação: árvore/sitemap editável por arraste.

PROTOTYPE
- Protótipo de papel: canvas de desenho + upload de fotos dos esboços, simulação de interações (hotspots clicáveis entre telas), registro de testes e feedback.
- Wireframe: lista de telas, canvas simples de blocos em escala de cinza (arrastar elementos), fluxos detalhados, interações anotadas, testes e feedback.
- Hi-Fi: pesquisa de UI (moodboard), galeria de mockups com versões, protótipo interativo (links para Figma etc. e hotspots), catálogo de microinterações (gatilho, regra, feedback, duração).

EVALUATE
- Testes de usabilidade: plano, tarefas, participantes, sessões com métricas (sucesso, tempo, erros), notas com timestamps e severidade dos problemas.
- Shadowing: roteiro de observação e registro.
- Survey SUS: 10 perguntas padrão, cálculo automático do score (0-100) e interpretação.
- Avaliação de especialista (por outro designer): checklist heurístico e relatório.
- Teste A/B: hipótese, variantes, métrica, amostra, resultado e significância simples.
- Análise de resultados: consolida achados de todas as etapas e prioriza problemas.
- Go / No-go: critérios, pontuação, decisão registrada com justificativa. No-go gera sugestão de voltar a uma etapa anterior e cria itens no roadmap.

Métodos personalizados usam apenas os blocos genéricos.

# INTERAÇÕES COM MOUSE (arrastar e soltar em tudo que fizer sentido)

Usar Pointer Events (funciona em mouse, toque e caneta) e implementar sem bibliotecas:
- Reordenar projetos, métodos, checklists, listas, colunas e cards.
- Kanban entre colunas, post-its e quadros livres, pan e zoom (roda do mouse e arrastar) em canvases.
- Gantt: mover e redimensionar barras.
- Fluxos, mapa mental e sitemap: arrastar nós, criar conexões arrastando de alça a alça.
- Matriz 2x2: soltar itens nos quadrantes.
- Upload por arrastar arquivos (imagens, JSON de importação).
- Atribuir responsáveis arrastando o avatar para o card.
- Todo arrastar tem: feedback visual (elevação, sombra, placeholder), snap, auto-scroll nas bordas, cancelar com Esc e alternativa por teclado (setas + Enter/Espaço) com anúncio aria-live.

# MICROINTERAÇÕES (fluidez máxima, motion M3)

- Easings e durações M3 (emphasized, standard), animações por spring em arrastar/soltar e FAB.
- Ripple (state layer) em todos os componentes clicáveis, hover/focus/pressed states.
- Transições entre telas (container transform e shared axis), skeleton loading, contadores e progresso animados.
- Expandir/colapsar etapas com animação, confete sutil e mensagem ao concluir etapa ou projeto ("Se go, você ganhou!").
- Snackbar com "Desfazer" para ações destrutivas, validação inline animada, empty states ilustrados com CTA.
- Tudo desativado/reduzido com prefers-reduced-motion.

# DADOS, SALVAR E IMPORTAR

- Persistência automática em localStorage (ou IndexedDB para anexos grandes) com indicador "Salvo às HH:MM".
- Exportar JSON: do projeto atual OU de todos os projetos. Arquivo com `schemaVersion`, `exportedAt`, `app`, `projects[]`, `people[]`.
- Importar JSON: arrastar o arquivo ou escolher; validar schema; pré-visualizar o conteúdo; opções "Substituir", "Mesclar" ou "Importar como novo projeto"; tratar conflitos de id; migrar versões antigas; mensagens de erro claras.
- Desfazer/refazer global (histórico em memória).
- Modelo de dados sugerido (fonte única de verdade, tudo por id):
  project { id, name, description, color, status, startDate, endDate, ownerIds[], stages[] , milestones[], createdAt, updatedAt }
  stage { key (discover|define|ideate|prototype|evaluate), responsibleIds[], startDate, endDate, notes, methods[] }
  method { id, catalogId|null, title, group, status, progress, responsibleIds[], startDate, endDate, priority, effort, blocks{}, findings[], evidences[], comments[], history[] }
  finding { id, title, description, severity, tags[], evidenceIds[], promotedToInsight }
  person { id, name, role, email, color }
  roadmapItem derivado dos métodos + itens avulsos { id, title, stageKey, methodId?, assigneeIds[], start, end, status, priority, dependsOn[] }
- Exportações extras (bônus): relatório do projeto em HTML imprimível/PDF (window.print com CSS de impressão) e CSV do roadmap.

# MELHORIAS QUE EU (O ESPECIALISTA) RECOMENDO INCLUIR

- Templates de projeto (ex.: "Redesign de produto existente", "Produto novo", "Sprint de design de 5 dias") que já vêm com métodos pré-selecionados.
- "Próximo passo sugerido" por etapa com base no que falta (ex.: "Você ainda não tem personas antes de passar para Ideate").
- Portões de qualidade (checklist de saída) por etapa antes de marcar como concluída.
- Rastreabilidade: ligar insight de Discover > problema em Define > ideia em Ideate > protótipo > resultado de teste em Evaluate (visão "da pesquisa à decisão").
- Biblioteca central de insights e de evidências, com busca global e tags.
- Log de decisões (decision log) e registro de riscos.
- Comentários com @menção, histórico de versões por método e modo apresentação (slides das etapas para stakeholders).
- Modo foco (esconde tudo menos o método atual) e paleta de comandos.
- Pesquisa global (projetos, métodos, achados, pessoas).
- Onboarding curto na primeira visita e projeto de exemplo carregável.

# STACK E ORGANIZAÇÃO DO CÓDIGO

- Apenas HTML, CSS e JS vanilla (ES modules), sem dependências externas obrigatórias (fontes Roboto/Google Fonts e Material Symbols são aceitos via CDN, com fallback).
- Estrutura de arquivos sugerida:
  index.html
  /css: tokens.css (cores, tipografia, formas, elevação, motion), base.css, components.css, layout.css, views.css
  /js: main.js, router.js (hash routing), store.js (estado + persistência + undo/redo), catalog.js (dados do processo), schema.js (validação/migração JSON), ui/ (componentes M3 reutilizáveis), dnd.js (motor de arrastar), views/ (projects, overview, stage, method, timeline, roadmap, team, library, settings), methods/ (engine + templates por método)
- Roteamento por hash (#/projeto/:id/etapa/:key/metodo/:id), responsivo mobile-first, código comentado e modular, sem frameworks.

# ENTREGA EM FASES (IMPORTANTE)

Não tente gerar tudo de uma vez. Siga estas fases e, ao final de cada uma, me diga o que foi feito e o que vem a seguir:

FASE 1 (entregue agora, estrutura inicial funcional):
- Tokens M3 claro/escuro com toggle de tema só ícone (padrão claro), layout adaptativo (Bar/Rail/Drawer), TopAppBar.
- catalog.js completo com TODAS as etapas, grupos e métodos da lista acima.
- Store com persistência, roteamento, criar/editar/excluir/reordenar projetos.
- Tela de projeto com timeline principal fixa (progresso por etapa), telas de etapa clicáveis e seletor para adicionar/remover métodos, cards de método com status, responsável e progresso.
- Tela de método com o cabeçalho padrão, abas e os blocos genéricos básicos (texto, checklist, tabela, achados).
- Exportar/importar JSON funcionando, equipe/responsáveis básico, microinterações essenciais, drag-and-drop de reordenação com alternativa por teclado.

FASE 2: Roadmap (Gantt, Kanban, lista) e seção de Timeline completa.
FASE 3: Templates específicos dos métodos (Discover e Define primeiro, depois Ideate, Prototype, Evaluate).
FASE 4: Biblioteca/Guia de métodos, rastreabilidade, relatórios, templates de projeto, paleta de comandos, polimento de motion e acessibilidade.

# CRITÉRIOS DE ACEITE

- Segue o M3 e a skill anexada (tokens, tipografia, formas, navegação adaptativa, tema claro padrão com toggle ícone).
- Todos os métodos e etapas da imagem existem e são selecionáveis.
- Dados nunca se perdem ao recarregar; JSON exportado reimporta idêntico.
- Progresso da timeline reflete em tempo real o que foi adicionado/concluído.
- Tudo navegável por teclado, contraste AA, alvos de 48dp, reduced-motion respeitado.
- Funciona em celular, tablet e desktop.

Comece pela FASE 1. Antes de codar, apresente em poucas linhas o plano de arquitetura e quaisquer premissas que assumiu.