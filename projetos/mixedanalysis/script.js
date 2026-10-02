document.addEventListener('DOMContentLoaded', () => {

    // 1. Navegação em Abas via Drawer
    const drawerItems = document.querySelectorAll('.drawer-item');
    const sections = document.querySelectorAll('.content-section');

    drawerItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');

            drawerItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // 2. Menu Responsivo Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('drawer');

    menuToggle.addEventListener('click', () => {
        if (drawer.style.display === 'none') {
            drawer.style.display = 'block';
        } else {
            drawer.style.display = 'none';
        }
    });

    // 3. Simulação Dinâmica de Transformação de Dados
    const btnQuant = document.getElementById('btn-quantitizing');
    const btnQual = document.getElementById('btn-qualitizing');
    const outputContainer = document.getElementById('transformation-result');

    btnQuant.addEventListener('click', () => {
        outputContainer.innerHTML = `
            <h4><strong>Processo: Quantitização (Nível 2 Ordinal / Modelo DIME)</strong></h4>
            <p style="margin-top: 8px;"><em>Texto Bruto:</em> "Os sujeitos relataram forte receio de interagir com o sistema."</p>
            <p style="color: var(--md-sys-color-primary); font-weight: 500;">➔ Recodificação Numérica: [Código: MEDO_SISTEMA | Matriz Binária: 1 | Escala de Intensidade: 4/4]</p>
        `;
    });

    btnQual.addEventListener('click', () => {
        outputContainer.innerHTML = `
            <h4><strong>Processo: Qualitização (Perfil Comparativo/Modal)</strong></h4>
            <p style="margin-top: 8px;"><em>Dados Estatísticos:</em> Média = 4.82/5.00 em abandono de tarefas digitais (p < 0.001).</p>
            <p style="color: var(--md-sys-color-accent); font-weight: 500;">➔ Construção Narrativa: "Perfil de Insegurança Operacional Severa com Rejeição Sistemática".</p>
        `;
    });

    // 4. Accordion Component
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('open');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // Lista de Dicionário Temático (Regras de Extração por Palavras-Chave)
    const THEMATIC_DICTIONARY = [
        { id: 'T1', name: 'Medo/Insegurança', keywords: ['medo', 'receio', 'inseguro', 'insegurança', 'perder'] },
        { id: 'T2', name: 'Ansiedade/Estresse', keywords: ['ansioso', 'ansiedade', 'estresse', 'nervoso'] },
        { id: 'T3', name: 'Clareza/Facilidade', keywords: ['claro', 'clara', 'rápido', 'fácil', 'tranquilo', 'facilidade'] },
        { id: 'T4', name: 'Erro/Falha Sistema', keywords: ['erro', 'falha', 'bug', 'travou', 'dificuldade'] }
    ];

    const btnGenerate = document.getElementById('btn-generate-matrix');
    const btnReset = document.getElementById('btn-reset-matrix');
    const inputArea = document.getElementById('qualitative-input');
    const matrixOutput = document.getElementById('matrix-output');
    const matrixHead = document.getElementById('matrix-head');
    const matrixBody = document.getElementById('matrix-body');
    const matrixStats = document.getElementById('matrix-stats');

    btnGenerate.addEventListener('click', () => {
        const text = inputArea.value.trim();
        if (!text) {
            alert('Por favor, insira pelo menos um trecho de texto qualitativo.');
            return;
        }

        // 1. Processar Linhas (Participantes)
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const dataset = lines.map((line, index) => {
            let participantId = `P${index + 1}`;
            let content = line;

            // Se o usuário digitou no formato "P1: texto..."
            if (line.includes(':')) {
                const parts = line.split(':');
                participantId = parts[0].trim();
                content = parts.slice(1).join(':').trim();
            }

            return { id: participantId, text: content.toLowerCase() };
        });

        // 2. Avaliar Incidência dos Temas (Quantitização Dicotômica 0/1)
        const matrixData = dataset.map(item => {
            const rowScores = {};
            THEMATIC_DICTIONARY.forEach(theme => {
                // Checa se alguma palavra-chave do tema aparece no texto
                const hasTheme = theme.keywords.some(kw => item.text.includes(kw));
                rowScores[theme.id] = hasTheme ? 1 : 0;
            });
            return { participant: item.id, scores: rowScores };
        });

        // 3. Renderizar o Cabeçalho da Tabela
        let headHTML = '<tr><th>Participante</th>';
        THEMATIC_DICTIONARY.forEach(theme => {
            headHTML += `<th title="Keywords: ${theme.keywords.join(', ')}">${theme.name} (${theme.id})</th>`;
        });
        headHTML += '<th>Total (Frequência)</th></tr>';
        matrixHead.innerHTML = headHTML;

        // 4. Renderizar o Corpo da Tabela
        let bodyHTML = '';
        matrixData.forEach(row => {
            let totalRow = 0;
            bodyHTML += `<tr><td class="cell-participant">${row.participant}</td>`;
            
            THEMATIC_DICTIONARY.forEach(theme => {
                const score = row.scores[theme.id];
                totalRow += score;
                const cellClass = score === 1 ? 'cell-active' : 'cell-inactive';
                bodyHTML += `<td class="${cellClass}">${score}</td>`;
            });

            bodyHTML += `<td style="font-weight: bold; text-align: center;">${totalRow}</td></tr>`;
        });

        // Linha de Prevalência/Frequência dos Temas
        bodyHTML += '<tr style="border-top: 2px solid var(--md-sys-color-primary); font-weight: bold;"><td>Prevalência Temática</td>';
        THEMATIC_DICTIONARY.forEach(theme => {
            const themeTotal = matrixData.reduce((acc, curr) => acc + curr.scores[theme.id], 0);
            const prevalencePercentage = ((themeTotal / matrixData.length) * 100).toFixed(1);
            bodyHTML += `<td style="text-align: center; color: var(--md-sys-color-primary);">${themeTotal} (${prevalencePercentage}%)</td>`;
        });
        bodyHTML += '<td>-</td></tr>';

        matrixBody.innerHTML = bodyHTML;

        // 5. Exibir Tabela e Atualizar Estatísticas
        matrixStats.textContent = `${matrixData.length} Participantes | ${THEMATIC_DICTIONARY.length} Temas`;
        matrixOutput.style.display = 'block';
    });

    btnReset.addEventListener('click', () => {
        inputArea.value = '';
        matrixOutput.style.display = 'none';
    });
});