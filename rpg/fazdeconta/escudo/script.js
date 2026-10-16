// TAB SWITCHING
// ABRIR/FECHAR MENU HAMBÚRGUER EM TELA PEQUENA
function toggleMobileMenu() {
    const menu = document.getElementById('nav-tabs-menu');
    if (menu) menu.classList.toggle('open');
}

// TROCA DE ABAS E FECHAMENTO AUTOMÁTICO DO MENU NO MOBILE
function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => btn.classList.remove('active'));

    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');

    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }

    const menu = document.getElementById('nav-tabs-menu');
    if (menu) {
        menu.classList.remove('open');
    }
}

// QUICK DICE ROLLER
function rollDice(numDice) {
    let total = 0;
    let rolls = [];
    for (let i = 0; i < numDice; i++) {
        let roll = Math.floor(Math.random() * 6) + 1;
        rolls.push(roll);
        total += roll;
    }

    const resultDisplay = document.getElementById('quick-dice-result');
    if (resultDisplay) {
        if (numDice === 1) {
            resultDisplay.innerHTML = `🎲 <strong>${total}</strong>`;
        } else {
            resultDisplay.innerHTML = `🎲 <strong>${total}</strong> (${rolls.join(' + ')})`;
        }
        resultDisplay.style.transform = 'scale(1.15)';
        setTimeout(() => {
            resultDisplay.style.transform = 'scale(1)';
        }, 150);
    }
}

// ENEMY SEARCH FILTER
function filterEnemies() {
    const input = document.getElementById('enemy-search').value.toLowerCase();
    const cards = document.querySelectorAll('.enemy-card');

    cards.forEach(card => {
        const name = card.getAttribute('data-name') || '';
        if (name.includes(input)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// LISTA AUTOMÁTICA DE MÚSICAS
let currentTrackIndex = 0;
let isLooping = false;

function getPlaylistTracks() {
    const buttons = document.querySelectorAll('button[onclick*="playDriveTrack"]');
    const tracks = [];
    buttons.forEach(btn => {
        const match = btn.getAttribute('onclick').match(/playDriveTrack\('([^']+)'/);
        if (match && match[1]) {
            tracks.push(match[1]);
        }
    });
    return tracks;
}

function playDriveTrack(fileName, trackName) {
    const player = document.getElementById('main-audio-player');
    const title = document.getElementById('music-title');
    const playlist = getPlaylistTracks();

    const nameToFind = trackName || fileName;
    const foundIndex = playlist.indexOf(nameToFind);
    if (foundIndex !== -1) {
        currentTrackIndex = foundIndex;
    }

    if (title) {
        title.innerText = "Tocando agora: " + nameToFind;
    }

    const audioUrl = "https://epietragalla.com/fazdeconta/trilhasonora/" + encodeURIComponent(nameToFind);

    if (player) {
        player.src = audioUrl;
        player.load();
        player.play().then(() => {
            updatePlayPauseButton(true);
        }).catch(error => {
            console.log("Erro ao reproduzir o áudio:", error);
        });
    }
}

function togglePlayPause() {
    const player = document.getElementById('main-audio-player');
    if (!player || !player.src) return;

    if (player.paused) {
        player.play();
        updatePlayPauseButton(true);
    } else {
        player.pause();
        updatePlayPauseButton(false);
    }
}

function updatePlayPauseButton(isPlaying) {
    const btn = document.getElementById('btn-play-pause');
    if (btn) {
        btn.innerHTML = isPlaying ? "⏸️ Pausar" : "▶️ Continuar";
    }
}

function nextTrack() {
    const playlist = getPlaylistTracks();
    if (playlist.length === 0) return;

    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    const nextSong = playlist[currentTrackIndex];
    playDriveTrack(nextSong, nextSong);
}

function previousTrack() {
    const playlist = getPlaylistTracks();
    if (playlist.length === 0) return;

    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    const prevSong = playlist[currentTrackIndex];
    playDriveTrack(prevSong, prevSong);
}

function toggleLoop() {
    const player = document.getElementById('main-audio-player');
    const btn = document.getElementById('btn-loop');

    isLooping = !isLooping;
    if (player) player.loop = isLooping;

    if (btn) {
        btn.innerText = isLooping ? "🔁 Repetir: ON" : "🔁 Repetir: OFF";
    }
}

async function loadTabContents() {
    const tabContainers = document.querySelectorAll('.tab-content[data-include]');

    async function loadTabContent(tab) {
        const file = tab.dataset.include;

        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            tab.innerHTML = await response.text();
        } catch (error) {
            console.error(`Erro ao carregar ${file}:`, error);
            tab.innerHTML = '<p class="include-error">Não foi possível carregar este conteúdo.</p>';
        }
    }

    const combatTab = document.getElementById('tab-combate');
    if (combatTab) {
        combatTab.classList.add('active');
        await loadTabContent(combatTab);
    }

    const remainingTabs = Array.from(tabContainers).filter(tab => tab !== combatTab);
    await Promise.all(remainingTabs.map(loadTabContent));
}

function initializeAudioPlayer() {
    const player = document.getElementById('main-audio-player');
    if (player) {
        player.addEventListener('ended', () => {
            if (!isLooping) {
                nextTrack();
            }
        });

        player.addEventListener('play', () => updatePlayPauseButton(true));
        player.addEventListener('pause', () => updatePlayPauseButton(false));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTabContents().then(initializeAudioPlayer);
});

// TABELAS DO GERADOR DE MISSÕES
const missionTables = {
    contato: {
        2: { nome: "Mago Ancião", desc: "O Mago Zaimen precisa da ajuda dos heróis para resolver um problema importante." },
        3: { nome: "Empreendedor", desc: "Dono de uma fazenda, loja ou estabelecimento que está enfrentando um grande problema." },
        4: { nome: "Celebridade", desc: "Uma pessoa muito famosa por seus talentos, como um músico, inventor ou artista da região." },
        5: { nome: "Morador Vizinho", desc: "Um morador de Terra da Chuva Miúda, que não vive em Vila Velha." },
        6: { nome: "Parente", desc: "Pai, mãe ou algum familiar de um dos heróis precisa de ajuda urgente." },
        7: { nome: "Estrangeiro", desc: "Um viajante recém-chegado que ainda não conhece bem a região de Terra da Chuva Miúda." },
        8: { nome: "Mensageiro", desc: "Um mensageiro enviado por alguém importante para entregar um pedido urgente." },
        9: { nome: "Aventureiro Ferido", desc: "Um explorador que voltou de uma missão perigosa e precisa da ajuda dos heróis para terminar o que começou." },
        10: { nome: "Guarda da Vila", desc: "Um guarda ou protetor de Vila Velha que não consegue resolver o problema sozinho." },
        11: { nome: "Morador da Vila", desc: "Uma criança ou idoso de Vila Velha precisa de ajuda." },
        12: { nome: "Criatura Amigável", desc: "Um animal falante ou criatura mágica que veio pedir ajuda aos heróis." }
    },
    objetivo: {
        2: { nome: "Derrotar", desc: "Algum Inseto Gigante ou criatura está causando problemas na região e precisa ser enfrentado pelos heróis." },
        3: { nome: "Escoltar", desc: "Levar uma pessoa específica com segurança até um determinado local." },
        4: { nome: "Transportar", desc: "Entregar uma carga importante ou objeto valioso em outro lugar." },
        5: { nome: "Coletar", desc: "Encontrar um item raro." },
        6: { nome: "Explorar", desc: "Investigar uma nova caverna, ruína ou local recém-descoberto na região." },
        7: { nome: "Resgatar", desc: "Alguém foi capturado ou se perdeu e precisa ser encontrado e trazido de volta em segurança." },
        8: { nome: "Proteger", desc: "Defender um local importante de uma ameaça." },
        9: { nome: "Recuperar", desc: "Localizar e recuperar uma arma lendária ou item roubado." },
        10: { nome: "Comunicar", desc: "Uma mensagem urgente precisa chegar até alguém importante em outra região." },
        11: { nome: "Construir", desc: "Ajudar a encontrar materiais e resolver problemas para construir algo importante." },
        12: { nome: "Descobrir", desc: "Um mistério escondido precisa ser revelado pelos heróis." }
    },
    local: {
        2: "Vila Velha", 3: "Bosque dos Espinhos", 4: "Montanha Congelante", 5: "Minas",
        6: "Cachoeira do Norte", 7: "Lago da Boa Pesca", 8: "Floresta Secreta ou Floresta Densa",
        9: "Rio do Destino", 10: "Cavernas sem Luz", 11: "Farol", 12: "Escombros"
    },
    inimigo: {
        2: "Abelha e/ou Vespa", 3: "Barata", 4: "Besouro Titã", 5: "Cupim e/ou Formiga",
        6: "Escorpião", 7: "Gafanhoto", 8: "Lagarta de Fogo e/ou Mariposa",
        9: "Mosca e/ou Mosquito", 10: "Percevejo", 11: "Pulga", 12: "Traça dos Livros"
    }
};

function roll2d6() {
    return (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
}

function roll1d6() {
    return Math.floor(Math.random() * 6) + 1;
}

// LORE OFICIAL DO FAZ DE CONTA RPG
const loreLocais = {
    "Vila Velha": "no aconchegante vilarejo de Vila Velha, onde os adultos estão ocupados na colheita e manutenção e o Mago Zaimen instrui os pequenos heróis",
    "Bosque dos Espinhos": "na perigosa área tóxica do Bosque dos Espinhos, onde a vegetação definhou e as árvores Secas dão lugar a raízes venenosas",
    "Montanha Congelante": "nas geladas e escarpadas encostas da Montanha Congelante, a região mais fria e íngreme de todo o continente",
    "Minas": "nas profundas galerias das Minas subterrâneas, repletas de veios minerais e caminhos estreitos escavados no solo",
    "Cachoeira do Norte": "perto da refrescante Cachoeira do Norte, o ponto mais belo e cristalino para águas da região",
    "Lago da Boa Pesca": "às margens do sereno Lago da Boa Pesca, onde peixes coloridos nadam entre as águas acumuladas da cachoeira",
    "Floresta Secreta ou Floresta Densa": "no coração da exuberante Floresta Densa, onde copas de árvores gigantescas abrigam frutos exóticos e clareiras mágicas",
    "Rio do Destino": "nas margens agitadas do Rio do Destino, cujas águas atravessam o continente desde a cachoeira até o mar aberto",
    "Cavernas sem Luz": "nos labirintos úmidos das Cavernas sem Luz, onde a escuridão é total e apenas fontes de luz mágicas ou tochas permitem enxergar",
    "Farol": "ao redor da imponente torre do Farol, cuja luz forte orienta os navios de estrangeiros amigáveis pela costa",
    "Escombros": "entre as misteriosas ruínas dos Escombros, os restos de uma antiga cidade destruída muito antes da chegada dos moradores da vila"
};

const loreInimigos = {
    "Abelha e/ou Vespa": "O zumbido ensurdecedor anuncia a presença de Abelhas e Vespas Gigantes. Elas atacam à distância lançando ferrões que provocam o status de Paralisia!",
    "Barata": "Cascas duras e passos rápidos revelam Baratas Gigantes. Quando ficam encurraladas e com pouca vida, investem em um perigoso ataque Voador!",
    "Besouro Titã": "Besouros Titãs avançam com suas carapaças pesadas. Cuidado com suas mandíbulas, pois ao prender um herói ativam o status de Agarro!",
    "Cupim e/ou Formiga": "Um bando organizado de Formigas ou Cupins Gigantes surge do solo! Elas usam a força de suas pinças para agarrar e arremessar os aventureiros a metros de distância.",
    "Escorpião": "Caudas erguidas indicam Escorpiões Gigantes. Seus bicos e ferrões causam dano duplo e aplicam o terrível status de Envenenamento!",
    "Gafanhoto": "Pernas traseiras poderosas impulsionam Gafanhotos Gigantes, que saltam por cima da linha de frente para golpear os heróis pelas costas!",
    "Lagarta de Fogo e/ou Mariposa": "Grumos de queimadura ou nuvens de pó cobrem o ar. As Lagartas causam Queimadura ao toque e as Mariposas soltam pó que causa Cegueira!",
    "Mosca e/ou Mosquito": "Zumbidos irritantes cortam o ar. Os Mosquitos sugam a energia causando o status de Lentidão, enquanto as Moscas investem em rasgos voadores!",
    "Percevejo": "Um cheiro insuportável toma conta do ambiente! Os Percevejos Gigantes emitem um odor nauseante que deixa os alvos com o status de Confusão.",
    "Pulga": "Salto velozes e picadas dolorosas! As Pulgas Gigantes sugam a vitalidade dos heróis e podem induzir os pequenos ao status de Sono.",
    "Traça dos Livros": "Mandíbulas afiadas que roem tudo! As Traças dos Livros usam um ataque giratório que atinge todos os aventureiros ao seu redor de uma só vez."
};

let currentMission;

// FUNÇÃO PRINCIPAL DE GERAÇÃO
async function generateMission() {
    const rollC = roll2d6();
    const rollO = roll2d6();
    const rollL = roll2d6();
    const rollI = roll2d6();
    const rollR = roll1d6();

    const contato = missionTables.contato[rollC];
    const objetivo = missionTables.objetivo[rollO];
    const local = missionTables.local[rollL];
    const inimigo = missionTables.inimigo[rollI];

    let recompensaTxt = "";
    if (rollR === 1) {
        const mult = roll1d6();
        recompensaTxt = `${mult * 10} Chuvisco$ (${mult}d6x10)`;
    } else if (rollR === 2) {
        const mult = roll1d6();
        recompensaTxt = `${mult * 10} Chuvisco$ + 1 Item de Aventura`;
    } else if (rollR === 3) {
        const mult = roll1d6() + roll1d6();
        recompensaTxt = `${mult * 10} Chuvisco$ + 1 Arma`;
    } else if (rollR === 4) {
        const mult = roll1d6() + roll1d6();
        recompensaTxt = `${mult * 10} Chuvisco$ + 1 Peça de Armadura/Proteção`;
    } else if (rollR === 5) {
        const mult = roll1d6() + roll1d6();
        recompensaTxt = `${mult * 10} Chuvisco$ + 1 Carta de Baú de Madeira`;
    } else if (rollR === 6) {
        const mult = roll1d6() + roll1d6() + roll1d6();
        recompensaTxt = `${mult * 10} Chuvisco$ + 1 Carta de Baú de Ferro`;
    }

    // 1. CARDS DETALHADOS
    document.getElementById('res-contato').innerHTML = `<strong>[d6: ${rollC}] ${contato.nome}:</strong> ${contato.desc}`;
    document.getElementById('res-objetivo').innerHTML = `<strong>[d6: ${rollO}] ${objetivo.nome}:</strong> ${objetivo.desc}`;
    document.getElementById('res-local').innerHTML = `<strong>[d6: ${rollL}]:</strong> ${local}`;
    document.getElementById('res-inimigo').innerHTML = `<strong>[d6: ${rollI}]:</strong> ${inimigo}`;
    document.getElementById('res-recompensa').innerHTML = `<strong>[d6: ${rollR}]:</strong> ${recompensaTxt}`;

    // 2. BOX 1: RESUMO SINTETIZADO
    const narrative = `Os heróis são contatados por um(a) <strong>${contato.nome}</strong> para <strong>${objetivo.nome.toLowerCase()}</strong> a região de <strong>${local}</strong>, mas são surpreendidos por um bando de <strong>${inimigo}</strong>. Ao concluir a missão com sucesso, são recompensados com <strong>${recompensaTxt}</strong> para ser dividida entre o grupo de heróis!`;
    document.getElementById('mission-narrative').innerHTML = narrative;

    // 3. BOX 2: ROTEIRO MESTRE NARRADOR
    const descLocalLore = loreLocais[local] || local;
    const descInimigoLore = loreInimigos[inimigo] || "Inimigos perigosos rondam o local.";

    const elaboratedHTML = `
        <p style="margin-bottom: 10px;">
            <strong>📍 O Chamado:</strong> A tranquilidade da Terra da Chuva Miúda foi interrompida! 
            <strong>${contato.nome}</strong> procurou os heróis com urgência: <em>"${contato.desc}"</em>
        </p>
        <p style="margin-bottom: 10px;">
            <strong>🌿 O Cenário da Missão:</strong> A jornada leva o grupo diretamente para <strong>${local}</strong> — 
            ${descLocalLore}. A missão principal estabelecida é <strong>${objetivo.nome}</strong> (${objetivo.desc.toLowerCase()}).
        </p>
        <p style="margin-bottom: 10px;">
            <strong>⚠️ A Ameaça dos Insetos Gigantes:</strong> Devido à nuvem vinda do Reino dos Gigantes, criaturas normais se tornaram ameaças enormes! 
            No caminho, os heróis encontrarão <strong>${inimigo}</strong>. ${descInimigoLore}
        </p>
        <p style="margin-bottom: 0px; background: #fdf8f0; padding: 8px 12px; border-radius: 4px; border-left: 3px solid var(--accent-green);">
            <strong>🎁 Desfecho & Recompensa:</strong> Lembrando que em Faz de Conta RPG os inimigos derrotados apenas fogem ou voltam ao tamanho normal inofensivo! Ao concluírem o objective em equipe, receberão <strong>${recompensaTxt}</strong> para dividir no vilarejo.
        </p>
    `;
    document.getElementById('mission-elaborated').innerHTML = elaboratedHTML;

    currentMission = { contato, objetivo, local, inimigo, recompensa: recompensaTxt };
    const aiButton = document.getElementById('btn-enhance-ai');
    if (aiButton) aiButton.disabled = false;

    const aiBox = document.getElementById('mission-ai-narrative');
    if (aiBox) {
        aiBox.innerHTML = '<em>Missão procedural pronta. Use o botão abaixo para solicitar uma versão expandida com WebLLM, se o navegador for compatível.</em>';
    }
}

function enhanceCurrentMission() {
    if (!currentMission) return;
    generateAIAventure(
        currentMission.contato,
        currentMission.objetivo,
        currentMission.local,
        currentMission.inimigo,
        currentMission.recompensa
    );
}

// GERAÇÃO LOCAL VIA WEBLLM, SEM API OU CRÉDITOS
async function generateAIAventure(contato, objetivo, local, inimigo, recompensa) {
    const aiBox = document.getElementById('mission-ai-narrative');
    if (!aiBox) return;
    const aiButton = document.getElementById('btn-enhance-ai');
    if (aiButton) aiButton.disabled = true;

    aiBox.innerHTML = `
        <div style="text-align: center; padding: 20px; color: var(--accent-green); font-weight: bold;">
            ⚡ O WebLLM está escrevendo o roteiro localmente... A primeira execução pode demorar.
        </div>
    `;

    const promptText = `Você é um Mestre de RPG especialista no sistema infantil 'Faz de Conta RPG' (Terra da Chuva Miúda).
REGRAS OBRIGATÓRIAS:
1. Tom: Lúdico, envolvente, amigável e seguro para crianças.
2. Ninguém morre! Heróis apenas desmaiam de cansaço e Insetos Gigantes apenas fogem ou encolhem ao tamanho normal inofensivo.
3. Formate a resposta usando tags HTML válidas (<p>, <strong>, <em>, <br>). NÃO use Markdown como **, ## ou \`\`\`html.

Crie uma aventura completa dividida exatamente assim:
<strong>🎯 Título da Missão</strong>
<strong>📜 CENA 1 - O Chamado:</strong> Introdução com uma fala em aspas para o NPC ${contato.nome} dizer aos heróis sobre o problema: ${contato.desc}.
<strong>🗺️ CENA 2 - A Exploração:</strong> A travessia até ${local}. Sugira 1 Teste de Inteligência ou Movimentação para superar um obstáculo do terreno.
<strong>⚔️ CENA 3 - O Confronto:</strong> O encontro com ${inimigo}. Descreva o comportamento e o ataque do inimigo.
<strong>🎁 CENA 4 - Conclusão:</strong> O objetivo ${objetivo.nome} cumprido, o agradecimento e a entrega da recompensa: ${recompensa}.`;

    try {
        if (typeof window.generateLocalAdventure !== 'function') {
            throw new Error('O módulo WebLLM ainda não foi carregado.');
        }

        let aiText = await window.generateLocalAdventure(promptText);
        aiText = aiText.replace(/```html/gi, '').replace(/```/g, '');
        aiText = aiText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        aiText = aiText.replace(/\*(.*?)\*/g, '<em>$1</em>');
        aiBox.innerHTML = aiText;
    } catch (error) {
        console.error('Erro na geração local:', error);
        aiBox.innerHTML = `
            <div style="background: #f8d7da; color: #721c24; padding: 12px; border-radius: 6px; border: 1px solid #f5c6cb;">
                ❌ <strong>Não foi possível usar a IA local:</strong> ${error.message}
                <br><small>Use um navegador com WebGPU habilitado e acesse o site via HTTPS ou servidor local.</small>
            </div>
        `;
    } finally {
        if (aiButton) aiButton.disabled = false;
    }
}
