function inicializarTema() {
  const temaSalvo = localStorage.getItem("dnd_sheet_theme") || "light";
  if (temaSalvo === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

function alternarTema() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("dnd_sheet_theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("dnd_sheet_theme", "dark");
  }
}

inicializarTema();

function randomCriptografico() {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] / (0xFFFFFFFF + 1);
}

function registrarNoLog(dadosInfo, somaDados, bonus, total, label) {
  const container = document.getElementById("dice-log-content");
  const entry = document.createElement("div");
  entry.className = "roll-entry";

  const corDestaque = (dadosInfo.includes("1d20"))
    ? (somaDados === 20 ? "color:var(--success-color); font-weight:bold;" : (somaDados === 1 ? "color:var(--dnd-red); font-weight:bold;" : "font-weight:bold;"))
    : "font-weight:bold;";

  entry.innerHTML = `
    <div style="font-size:9px; color:var(--text-muted);">${label} (${dadosInfo})</div>
    <div style="font-size:13px;">
      <span style="${corDestaque}">${somaDados}</span> ${bonus >= 0 ? "+" : "-"} ${Math.abs(bonus)} = <strong>${total}</strong>
    </div>
  `;
  container.prepend(entry);
  if (container.children.length > 10) container.lastElementChild.remove();
}

function rolarDado(faces, bonus, label) {
  const result = Math.floor(randomCriptografico() * faces) + 1;
  const total = result + bonus;
  registrarNoLog(`1d${faces}`, result, bonus, total, label);
}

function rolarAtaqueArma(btn) {
  const card = btn.closest(".weapon-card");
  const nomeArma = card?.dataset.name || "Arma";
  const bonus = parseInt(btn.innerText) || 0;
  rolarDado(20, bonus, `Ataque: ${nomeArma}`);
}

function rolarDanoArma(btn) {
  const card = btn.closest(".weapon-card");
  const nomeArma = card?.dataset.name || "Arma";
  const formula = btn.innerText.trim();
  const match = formula.match(/^(\d+)d(\d+)([+-]\d+)?$/i);

  if (!match) {
    const valFixo = parseInt(formula) || 0;
    registrarNoLog("Fixo", valFixo, 0, valFixo, `Dano: ${nomeArma}`);
    return;
  }

  const qtd = parseInt(match[1]) || 1;
  const faces = parseInt(match[2]) || 4;
  const bonus = parseInt(match[3]) || 0;

  let somaDados = 0;
  let resultados = [];
  for (let i = 0; i < qtd; i++) {
    let r = Math.floor(randomCriptografico() * faces) + 1;
    somaDados += r;
    resultados.push(r);
  }
  const total = somaDados + bonus;
  registrarNoLog(`${qtd}d${faces} [${resultados.join(", ")}]`, somaDados, bonus, total, `Dano: ${nomeArma}`);
}

function vincularCliquesRolagem() {
  document.querySelectorAll(".val-bonus").forEach(span => {
    span.onclick = function () {
      const label = this.parentElement.innerText.replace(/[▲▼+0-9-]/g, '').trim();
      const bonus = parseInt(this.innerText) || 0;
      rolarDado(20, bonus, label);
    };
  });

  document.querySelectorAll(".mod").forEach(div => {
    div.style.cursor = "pointer";
    div.title = "Clique para rolar teste de Atributo";
    div.onclick = function () {
      const label = this.parentElement.querySelector("label").innerText;
      const bonus = parseInt(this.innerText) || 0;
      rolarDado(20, bonus, label);
    };
  });
}

function rolarManual(faces) {
  let bonus = 0;
  let qtd = 1;
  let tipo = "n";

  if (faces === 20) {
    const bInput = prompt("Bônus para o d20 (ou 0):", "0");
    bonus = parseInt(bInput) || 0;
    const tInput = prompt("Tipo de rolagem: [N]ormal, [V]antagem, [D]esvantagem", "n");
    tipo = tInput ? tInput.toLowerCase() : "n";
    let r1 = Math.floor(randomCriptografico() * 20) + 1;
    let r2 = Math.floor(randomCriptografico() * 20) + 1;
    let finalDie = r1;
    let extraInfo = "";
    if (tipo === "v") {
      finalDie = Math.max(r1, r2);
      extraInfo = `(Vantagem: ${r1}, ${r2})`;
    } else if (tipo === "d") {
      finalDie = Math.min(r1, r2);
      extraInfo = `(Desvantagem: ${r1}, ${r2})`;
    }
    const total = finalDie + bonus;
    registrarNoLog(`1d20${extraInfo}`, finalDie, bonus, total, "Rolagem Manual");
  } else if (faces === 100) {
    const bInput = prompt("Bônus para o d100 (ou 0):", "0");
    bonus = parseInt(bInput) || 0;
    let result = Math.floor(randomCriptografico() * 100) + 1;
    registrarNoLog(`1d100`, result, bonus, result + bonus, "Rolagem Manual");
  } else {
    const qInput = prompt(`Quantos d${faces} deseja rolar?`, "1");
    qtd = parseInt(qInput) || 1;
    const bInput = prompt(`Bônus total para a soma (ou 0):`, "0");
    bonus = parseInt(bInput) || 0;
    let somaDados = 0;
    let resultadosIndividuais = [];
    for (let i = 0; i < qtd; i++) {
      let r = Math.floor(randomCriptografico() * faces) + 1;
      somaDados += r;
      resultadosIndividuais.push(r);
    }
    const total = somaDados + bonus;
    const labelDados = `${qtd}d${faces} [${resultadosIndividuais.join(", ")}]`;
    registrarNoLog(labelDados, somaDados, bonus, total, "Rolagem Manual");
  }
}

function toggleDiceLog() {
  const log = document.getElementById("dice-log-container");
  const btnReabrir = document.getElementById("btn-reabrir-log");
  if (log.style.display === "none") {
    log.style.display = "flex";
    btnReabrir.style.display = "none";
  } else {
    log.style.display = "none";
    btnReabrir.style.display = "block";
  }
}

function toggleMenuHamburguer() {
  const menu = document.querySelector(".btn-container-inner");
  const btn = document.getElementById("menu-hamburguer-btn");
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
    btn.innerText = "☰";
  } else {
    menu.classList.add("open");
    btn.innerText = "✕";
  }
}

function selecionarAbaSuperior(targetId) {
  const mLayout = document.querySelector(".main-layout");
  const secoes = [
    "guide_section_box",
    "notes_section_box",
    "grimoire_section_box",
    "infusions_section_box"
  ];

  secoes.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  document.querySelectorAll(".top-tabs-bar .top-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.target === targetId);
  });

  if (targetId === "sheet") {
    mLayout.style.display = "grid";
  } else {
    mLayout.style.display = "none";
    const alvo = document.getElementById(targetId);
    if (alvo) alvo.style.display = "block";
    if (targetId === "infusions_section_box") renderizarDescricoesInfusoes();
  }
}

function agendarAutoSave() {}

function registrarEventosInterface() {
  // Alternância de tema Light / Dark
  document.getElementById("btn-theme-toggle")?.addEventListener("click", alternarTema);

  // Rolador de dados
  document.getElementById("btn-reabrir-log")?.addEventListener("click", toggleDiceLog);
  document.getElementById("btn-fechar-log")?.addEventListener("click", toggleDiceLog);
  document.getElementById("btn-limpar-log")?.addEventListener("click", () => {
    document.getElementById("dice-log-content").innerHTML = "";
  });
  document.querySelectorAll("#dice-quick-rolls .quick-roll-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const faces = parseInt(btn.dataset.dice);
      if (faces) rolarManual(faces);
    });
  });

  // Barra superior fixa e modais
  document.getElementById("menu-hamburguer-btn")?.addEventListener("click", toggleMenuHamburguer);
  document.getElementById("btn-fechar-spell-modal")?.addEventListener("click", () => {
    document.getElementById("spell-quick-modal").style.display = "none";
  });

  // Botões de arquivo e ações principais
  document.getElementById("import_file")?.addEventListener("change", importarFichaJSON);
  document.getElementById("btn-exportar-json")?.addEventListener("click", exportarFichaJSON);
  document.getElementById("btn-limpar-ficha")?.addEventListener("click", limparFicha);
  document.getElementById("btn-baixar-html")?.addEventListener("click", baixarFicha);
  document.getElementById("btn-imprimir-pdf")?.addEventListener("click", imprimirPDF);
  document.getElementById("btn-gerar-aleatorio")?.addEventListener("click", gerarPersonagemAleatorio);

  // Avatar e Cabeçalho do personagem
  document.getElementById("char-image-container")?.addEventListener("click", alterarImagemPersonagem);
  document.getElementById("btn-gerar-nome")?.addEventListener("click", gerarNomeAleatorio);
  document.getElementById("btn-descanso-longo")?.addEventListener("click", descansoLongo);
  document.getElementById("level_val")?.addEventListener("input", () => {
    atualizarSubclasses();
    atualizarSlotsMagia();
    atualizarGuia();
    calcular();
  });
  document.getElementById("race_name")?.addEventListener("change", () => {
    atualizarSubracas();
    atualizarGuia();
    calcular(true);
  });
  document.getElementById("subrace_name")?.addEventListener("change", () => {
    atualizarGuia();
    calcular(true);
  });
  document.getElementById("align")?.addEventListener("change", atualizarGuia);
  document.getElementById("class_name")?.addEventListener("change", () => {
    atualizarSubclasses();
    atualizarSlotsMagia();
    atualizarGuia();
    calcular(true);
  });
  document.getElementById("subclass_name")?.addEventListener("change", () => {
    atualizarGuia();
    calcular(true);
  });
  document.getElementById("bg_name")?.addEventListener("change", () => {
    carregarCaracteristicasAntecedente();
    atualizarGuia();
    calcular(true);
  });

  // Navegação pelas abas superiores
  document.querySelectorAll(".top-tabs-bar button.top-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      if (target) selecionarAbaSuperior(target);
    });
  });

  // Combate, equipamentos e listas dinâmicas
  const hpMaxEl = document.getElementById("hp_max");
  if (hpMaxEl) {
    hpMaxEl.addEventListener("input", function () { this.dataset.manual = "true"; });
  }
  document.getElementById("btn-reset-hp")?.addEventListener("click", () => {
    if (hpMaxEl) hpMaxEl.dataset.manual = "false";
    calcular();
  });

  document.getElementById("btn-add-armadura")?.addEventListener("click", adicionarArmaduraCard);
  document.getElementById("btn-add-arma")?.addEventListener("click", adicionarArmaCard);
  document.getElementById("btn-add-item")?.addEventListener("click", () => adicionarItemCard());
  document.getElementById("btn-converter-moedas")?.addEventListener("click", converterMoedas);
  document.getElementById("btn-add-talento")?.addEventListener("click", adicionarTalento);
  document.getElementById("btn-add-magia")?.addEventListener("click", adicionarMagia);
  document.getElementById("btn-add-infusao")?.addEventListener("click", adicionarInfusao);
  document.getElementById("btn-add-idioma")?.addEventListener("click", () => adicionarIdioma());

  // Condições e exaustão (alerta automático)
  document.querySelectorAll(".condicao-check").forEach(cb => {
    cb.addEventListener("change", atualizarAlertaCondicoes);
  });
  document.getElementById("exaustao_val")?.addEventListener("input", atualizarAlertaCondicoes);

  // Traços de personalidade
  ["t1", "t2", "t3", "t4"].forEach(id => {
    const sel = document.getElementById(id);
    if (sel) {
      sel.addEventListener("change", function () {
        mostrarTextoCompleto(this, `${id}_display`, `${id}_custom`);
      });
    }
  });

  // Gatilhos de atualização do resumo em tempo real
  const elementosGatilho = ["race_name", "subrace_name", "class_name", "subclass_name", "bg_name", "level_val"];
  elementosGatilho.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", atualizarResumoPericias);
      el.addEventListener("input", atualizarResumoPericias);
    }
  });

  const alvoFicha = document.querySelector(".sheet");
  if (alvoFicha) {
    alvoFicha.addEventListener("input", agendarAutoSave);
    alvoFicha.addEventListener("change", agendarAutoSave);
  }
}

window.addEventListener("beforeprint", ajustarTextareasParaImpressao);
window.addEventListener("afterprint", restaurarTextareasAposImpressao);

window.onload = async () => {
  const carregou = await carregarBancoDeDados();
  if (!carregou) return;

  registrarEventosInterface();
  setup();
  carregarSeletorArmas();
  carregarSeletorItens();
  carregarSeletorArmaduras();

  setTimeout(atualizarResumoPericias, 300);
};