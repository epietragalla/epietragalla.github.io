// Classes (Mantendo as 24 anteriores)
const classesInfo = {
    "Guerreiro": { forca: 3, defesa: 3, inteligencia: 1, bolsa: 4, pericia: "Espada Longa", alcance: 1, mov: "2d6", especial: "+1 ponto em Força contra inimigos que não voam." },
    "Amazona": { forca: 3, defesa: 3, inteligencia: 1, bolsa: 4, pericia: "Lâmina Curta", alcance: 1, mov: "2d6", especial: "Contra-ataca sempre que um inimigo falha ao lhe atacar." },
    "Mago": { forca: 1, defesa: 2, inteligencia: 4, bolsa: 4, pericia: "Magia Elemental", alcance: 3, mov: "2d6", especial: "Pode conjurar magias elementais e resolver enigmas mágicos." },
    "Elementalista": { forca: 1, defesa: 2, inteligencia: 4, bolsa: 4, pericia: "Mãos Elementais", alcance: 2, mov: "2d6", especial: "Molda seu elemento para criar armas ou objetos úteis." },
    "Arqueiro": { forca: 3, defesa: 1, inteligencia: 3, bolsa: 4, pericia: "Arco e Flecha", alcance: 4, mov: "2d6", especial: "+1 ponto em Força contra inimigos que voam." },
    "Caçadora": { forca: 3, defesa: 1, inteligencia: 3, bolsa: 4, pericia: "Besta", alcance: 3, mov: "2d6", especial: "Revela inimigos, armadilhas e passagens secretas em áreas vizinhas." },
    "Bárbaro": { forca: 4, defesa: 3, inteligencia: 1, bolsa: 3, pericia: "Machado Gigante", alcance: 1, mov: "2d6-1", especial: "Causa 2 pontos de Dano sempre que rola 1 no teste de ataque." },
    "Druida": { forca: 2, defesa: 2, inteligencia: 3, bolsa: 4, pericia: "Cajado da Natureza", alcance: 1, mov: "2d6", especial: "Transforma-se temporariamente em um animal (Lobo, Urso, etc)." },
    "Monge": { forca: 3, defesa: 3, inteligencia: 2, bolsa: 3, pericia: "Artes Marciais", alcance: 1, mov: "2d6+1", especial: "+1 ponto em Defesa contra ataques recebidos a 1 quadrado de distância." },
    "Alquimista": { forca: 1, defesa: 1, inteligencia: 4, bolsa: 5, pericia: "Frascos Explosivos", alcance: 2, mov: "2d6", especial: "Cria poções e antídotos usando ingredientes da natureza." },
    "Aventureiro": { forca: 2, defesa: 2, inteligencia: 2, bolsa: 5, pericia: "Espada Curta", alcance: 1, mov: "2d6+1", especial: "Pode refazer 1 teste de ataque falho uma vez por turno." },
    "Exploradora": { forca: 2, defesa: 2, inteligencia: 3, bolsa: 4, pericia: "Chicote", alcance: 2, mov: "2d6+1", especial: "Não cai em armadilhas e encontra passagens secretas facilmente." },
    "Bardo": { forca: 2, defesa: 1, inteligencia: 4, bolsa: 4, pericia: "Lira/Instrumento", alcance: 3, mov: "2d6", especial: "Recupera 1 Ponto de Vida de um aliado com sua música inspiradora." },
    "Dançarina": { forca: 2, defesa: 4, inteligencia: 1, bolsa: 4, pericia: "Leques/Adagas", alcance: 1, mov: "2d6+2", especial: "Ganha uma jogada extra de Movimentação ao derrotar um inimigo." },
    "Paladino": { forca: 3, defesa: 4, inteligencia: 1, bolsa: 3, pericia: "Martelo de Guerra", alcance: 1, mov: "2d6-1", especial: "Recupera 1 Ponto de Vida seu ou de um aliado ao rolar 6 na defesa." },
    "Defensora": { forca: 2, defesa: 4, inteligencia: 2, bolsa: 3, pericia: "Lança e Escudo", alcance: 2, mov: "2d6", especial: "Pode receber o ataque no lugar de um aliado adjacente." },
    "Domador": { forca: 2, defesa: 2, inteligencia: 3, bolsa: 4, pericia: "Comando Animal", alcance: 3, mov: "2d6", especial: "Luta acompanhado de um Animal Companheiro fiel." },
    "Fazendeira": { forca: 3, defesa: 2, inteligencia: 2, bolsa: 4, pericia: "Foice de Colheita", alcance: 1, mov: "2d6", especial: "Recupera 1 Ponto de Vida seu ou de um aliado ao derrotar um inimigo." },
    "Engenhoqueiro": { forca: 2, defesa: 2, inteligencia: 4, bolsa: 3, pericia: "Ferramentas", alcance: 1, mov: "2d6", especial: "Cria dispositivos mecânicos para resolver problemas no ambiente." },
    "Inventora": { forca: 1, defesa: 3, inteligencia: 4, bolsa: 3, pericia: "Engenhoca de Disparo", alcance: 3, mov: "2d6", especial: "Usa sua cadeira/máquina especial para atravessar terrenos difíceis." },
    "Samurai": { forca: 4, defesa: 2, inteligencia: 1, bolsa: 4, pericia: "Katana", alcance: 1, mov: "2d6", especial: "Seu primeiro ataque a um inimigo causa 2 pontos de Dano." },
    "Ninja": { forca: 3, defesa: 1, inteligencia: 2, bolsa: 5, pericia: "Shuriken", alcance: 4, mov: "2d6+2", especial: "Salta até 3 quadrados evitando obstáculos e armadilhas." },
    "Vigilante": { forca: 3, defesa: 3, inteligencia: 3, bolsa: 2, pericia: "Bastão", alcance: 2, mov: "2d6", especial: "Nunca é pego por ataques surpresa (Vigilância constante)." },
    "Fada": { forca: 1, defesa: 2, inteligencia: 4, bolsa: 4, pericia: "Varinha de Luz", alcance: 3, mov: "2d6 (Voo)", especial: "Ganha 2 Cartas de Tesouro ao derrotar inimigos Operários." }
};

// Banco de Dados das Cartas de Tesouro (Pág 61-63)
const cartasTesouro = [
    { tipo: "Madeira (Poções)", nome: "Poção de Cura", desc: "Recupera 2 Pontos de Vida imediatamente." },
    { tipo: "Madeira (Poções)", nome: "Poção de Força", desc: "+1 ponto temporário em testes de Força até o fim do combate." },
    { tipo: "Madeira (Poções)", nome: "Antídoto", desc: "Cura efeitos de Envenenamento." },
    { tipo: "Ferro (Pergaminhos)", nome: "Pergaminho de Escudo", desc: "Garante +2 em Defesa no próximo turno." },
    { tipo: "Ferro (Pergaminhos)", nome: "Pergaminho de Luz", desc: "Ilumina áreas escuras e revela armadilhas na sala." },
    { tipo: "Ferro (Pergaminhos)", nome: "Pergaminho de Fogo", desc: "Causa 2 pontos de dano em um inimigo (Alcance 3)." },
    { tipo: "Ouro (Anéis)", nome: "Anel da Proteção", desc: "Efeito Permanente: +1 fixo no atributo Defesa." },
    { tipo: "Ouro (Anéis)", nome: "Anel da Visão", desc: "Efeito Permanente: +1 fixo no atributo Inteligência." },
    { tipo: "Ouro (Anéis)", nome: "Anel do Vento", desc: "Efeito Permanente: Adiciona +2 quadrados na sua movimentação final." }
];

let inventarioHeroi = [];

// Inicializar seletor de tesouros
const seletor = document.getElementById('seletor-tesouros');
cartasTesouro.forEach((carta, index) => {
    let opt = document.createElement('option');
    opt.value = index;
    opt.innerHTML = `[${carta.tipo}] ${carta.nome}`;
    seletor.appendChild(opt);
});

function adicionarCarta() {
    const maxBolsa = parseInt(document.getElementById('attr-bolsa').value) || 0;
    const index = document.getElementById('seletor-tesouros').value;

    if (index === "") return;
    if (inventarioHeroi.length >= maxBolsa) {
        alert("Sua bolsa está cheia! Remova ou dê uma carta para um aliado antes.");
        return;
    }

    inventarioHeroi.push(cartasTesouro[index]);
    renderizarCartas();
}

function removerCarta(index) {
    inventarioHeroi.splice(index, 1);
    renderizarCartas();
}

function renderizarCartas() {
    const container = document.getElementById('lista-cartas');
    container.innerHTML = '';

    inventarioHeroi.forEach((carta, index) => {
        container.innerHTML += `
            <div class="carta-item">
                <button class="btn-remover" onclick="removerCarta(${index})">x</button>
                <b>${carta.nome}</b>
                <small>${carta.tipo}</small>
                <p>${carta.desc}</p>
            </div>
        `;
    });
}

// Funções de Classe e Vida (mantidas do prompt anterior)
function atualizarClasse() {
    const classeSelecionada = document.getElementById('classe-select').value;
    const info = classesInfo[classeSelecionada];
    if (info) {
        document.getElementById('attr-forca').value = info.forca;
        document.getElementById('attr-defesa').value = info.defesa;
        document.getElementById('attr-int').value = info.inteligencia;
        document.getElementById('attr-bolsa').value = info.bolsa;
        document.getElementById('attr-mov').value = info.mov;
        document.getElementById('pericia-nome').value = info.pericia;
        document.getElementById('pericia-alcance').value = info.alcance;
        document.getElementById('especial-desc').value = info.especial;
        gerarVida(5); 
    }
}

function gerarVida(quantidade) {
    const container = document.getElementById('pv-container');
    container.innerHTML = '';
    for(let i=0; i < quantidade; i++) {
        const span = document.createElement('span');
        span.innerHTML = '❤️';
        span.style.cursor = 'pointer';
        span.onclick = function() {
            this.innerHTML = this.innerHTML === '❤️' ? '🤍' : '❤️';
        };
        container.appendChild(span);
    }
}
gerarVida(5);