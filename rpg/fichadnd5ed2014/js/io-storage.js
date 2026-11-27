function obterObjetoFicha() {
  const getV = (id, fallback = "") => {
    const el = document.getElementById(id);
    return el ? el.value : fallback;
  };

  return {
    version: "7.1",
    info: {
      char_name: getV("char_name"),
      char_sex: getV("char_sex"),
      player_name: getV("player_name"),
      class_name: getV("class_name"),
      subclass_name: getV("subclass_name"),
      level_val: getV("level_val", "1"),
      race_name: getV("race_name"),
      subrace_name: getV("subrace_name"),
      bg_name: getV("bg_name"),
      align: getV("align"),
      char_image_url: document.getElementById("char_img")?.src || ""
    },
    habilidades: attrs.reduce((acc, at) => {
      acc[at.id] = getV(at.id + "_score", "10");
      return acc;
    }, {}),
    saves: attrs.reduce((acc, at) => {
      const cb = document.querySelector(`.save-prof[data-attr="${at.id}"]`);
      const span = document.getElementById(`save_${at.id}`);
      acc[at.id] = {
        prof: cb ? cb.checked : false,
        manual: span ? (span.dataset.manual || "0") : "0"
      };
      return acc;
    }, {}),
    pericias: skills.reduce((acc, sk) => {
      const safeId = sk.n.replace(/\s+/g, "");
      const cb = document.getElementById(`check_${safeId}`);
      const span = document.getElementById(`sk_${safeId}`);
      acc[safeId] = {
        profLevel: cb ? (cb.dataset.profLevel || "0") : "0",
        manual: span ? (span.dataset.manual || "0") : "0"
      };
      return acc;
    }, {}),
    moedas: {
      pc: getV("coin_pc", "0"),
      pp: getV("coin_pp", "0"),
      po: getV("coin_po", "0"),
      pl: getV("coin_pl", "0")
    },
    combate: {
      hp_at: getV("hp_at"),
      hp_max: getV("hp_max"),
      hp_temp: getV("hp_temp"),
      hp_max_manual: document.getElementById("hp_max")?.dataset.manual || "false",
      ca_val: getV("ca_val", "10"),
      insp_val: getV("insp_val", "0"),
      speed_val: getV("speed_val", "9m"),
      hit_dice: getV("hit_dice"),
      passive_perc: getV("passive_perc"),
      death_saves: Array.from(document.querySelectorAll('.circles input[type="checkbox"]')).slice(0, 6).map(cb => cb.checked || false)
    },
    listas: {
      talentos: Array.from(document.querySelectorAll(".talento-select")).map(sel => sel.value || ""),
      infusoes: Array.from(document.querySelectorAll("#infusoes-container .infusao-row")).map(row => ({
        nome: row.querySelector(".infusao-select")?.value || "",
        ativa: row.querySelector(".infusao-ativo-check")?.checked || false
      })),
      idiomas: Array.from(document.querySelectorAll(".idioma-row select")).map(sel => sel.value || ""),
      armas: Array.from(document.querySelectorAll(".weapon-entry-guia")).map(el => ({
        name: el.dataset.weaponName || "",
        html: el.innerHTML || "",
        attr: el.dataset.attr || "FOR",
        baseDmg: el.dataset.baseDmg || "1d4",
        magicBonus: el.dataset.magicBonus || "0",
        isCustom: el.dataset.isCustom || "false",
        uid: el.dataset.uid || "",
        preco: el.dataset.preco || "--",
        peso: el.dataset.peso || "--",
        prop: el.dataset.prop || "",
        desc: el.dataset.desc || ""
      })),
      armaduras: Array.from(document.querySelectorAll(".armor-entry-guia")).map(el => ({
        name: el.dataset.name || "",
        category: el.dataset.category || "",
        html: el.innerHTML || ""
      })),
      itens: Array.from(document.querySelectorAll(".item-entry-guia")).map(el => ({
        name: el.dataset.name || "",
        html: el.innerHTML || ""
      }))
    },
    magia: {
      slots_gastos: Array.from(document.querySelectorAll("#spell-slots-tracker input[type='checkbox']")).map(cb => cb.checked || false),
      lista: Array.from(document.querySelectorAll(".magia-select")).map(sel => sel.value || "")
    },
    textos: {
      t1: getV("t1"), t1_c: getV("t1_custom"),
      t2: getV("t2"), t2_c: getV("t2_custom"),
      t3: getV("t3"), t3_c: getV("t3_custom"),
      t4: getV("t4"), t4_c: getV("t4_custom"),
      t5: getV("t5"), equip: getV("equip_area"), notes: getV("notes_full_page")
    },
    recursos_gastos: Array.from(document.querySelectorAll("#class-resources-tracker input[type='checkbox']")).map(cb => cb.checked || false),
    combate_status: {
      condicoes: Array.from(document.querySelectorAll(".condicao-check")).map(cb => cb.checked || false),
      exaustao: getV("exaustao_val", "0"),
      log: getV("combat_log")
    }
  };
}

function carregarDadosNaFicha(d) {
  const containers = [
    "magias-container", "infusoes-container", "talentos-container", "idiomas-container",
    "weapon-cards-container", "armor-cards-container", "item-cards-container",
    "desc-weapons-guia", "desc-armors-guia", "desc-items-guia"
  ];
  containers.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });

  const info = d.info || {};
  if (document.getElementById("char_name")) document.getElementById("char_name").value = info.char_name || "";
  if (document.getElementById("char_sex")) document.getElementById("char_sex").value = info.char_sex || "";
  if (document.getElementById("player_name")) document.getElementById("player_name").value = info.player_name || "";
  document.getElementById("race_name").value = info.race_name || "";
  atualizarSubracas();
  document.getElementById("subrace_name").value = info.subrace_name || "";
  document.getElementById("class_name").value = info.class_name || "";
  document.getElementById("level_val").value = info.level_val || 1;
  atualizarSubclasses();
  document.getElementById("subclass_name").value = info.subclass_name || "";
  document.getElementById("bg_name").value = info.bg_name || "";
  document.getElementById("align").value = info.align || "";
  if (info.char_image_url) document.getElementById("char_img").src = info.char_image_url;

  carregarCaracteristicasAntecedente();

  for (let id in d.habilidades) {
    const el = document.getElementById(id + "_score");
    if (el) el.value = d.habilidades[id];
  }

  if (d.pericias) {
    for (let safeId in d.pericias) {
      const item = d.pericias[safeId];
      const cb = document.getElementById(`check_${safeId}`);
      if (cb) {
        cb.dataset.profLevel = item.profLevel || "0";
        cb.checked = (item.profLevel !== "0");
        cb.style.outline = (item.profLevel === "2") ? "2px solid #d4af37" : "none";
        cb.style.boxShadow = (item.profLevel === "2") ? "0 0 5px #d4af37" : "none";
      }
      const span = document.getElementById(`sk_${safeId}`);
      if (span) span.dataset.manual = item.manual || "0";
    }
  }

  if (d.saves) {
    for (let id in d.saves) {
      const item = d.saves[id];
      const cb = document.querySelector(`.save-prof[data-attr="${id}"]`);
      if (cb) cb.checked = item.prof;
      const span = document.getElementById(`save_${id}`);
      if (span) span.dataset.manual = item.manual || "0";
    }
  }

  if (d.moedas) {
    document.getElementById("coin_pc").value = d.moedas.pc || 0;
    document.getElementById("coin_pp").value = d.moedas.pp || 0;
    document.getElementById("coin_po").value = d.moedas.po || 0;
    document.getElementById("coin_pl").value = d.moedas.pl || 0;
  }

  const c = d.combate || {};
  document.getElementById("hp_at").value = c.hp_at || "";
  const hpMaxEl = document.getElementById("hp_max");
  if (hpMaxEl) {
    hpMaxEl.value = c.hp_max || "";
    hpMaxEl.dataset.manual = c.hp_max_manual || "false";
  }
  if (document.getElementById("hp_temp")) document.getElementById("hp_temp").value = c.hp_temp || "";
  document.getElementById("ca_val").value = c.ca_val || 10;
  document.getElementById("insp_val").value = c.insp_val || 0;
  document.getElementById("speed_val").value = c.speed_val || "9m";
  document.getElementById("hit_dice").value = c.hit_dice || "";

  if (d.listas && d.listas.idiomas) {
    d.listas.idiomas.forEach(v => {
      adicionarIdioma();
      const sel = document.querySelector("#idiomas-container .idioma-row:last-child select");
      if (sel) sel.value = v;
    });
  }
  if (d.listas && d.listas.talentos) {
    d.listas.talentos.forEach(v => {
      adicionarTalento();
      const sel = document.querySelector("#talentos-container .talento-row:last-child select");
      if (sel) sel.value = v;
    });
  }
  if (d.magia && d.magia.lista) {
    d.magia.lista.forEach(v => {
      adicionarMagia();
      const sel = document.querySelector("#magias-container .magia-row:last-child select");
      if (sel) sel.value = v;
    });
  }
  if (d.listas && d.listas.infusoes) {
    d.listas.infusoes.forEach(v => {
      adicionarInfusao();
      const row = document.querySelector("#infusoes-container .infusao-row:last-child");
      if (row) {
        const sel = row.querySelector(".infusao-select");
        const chk = row.querySelector(".infusao-ativo-check");
        if (typeof v === "object" && v !== null) {
          if (sel) sel.value = v.nome || "";
          if (chk) chk.checked = v.ativa || false;
        } else {
          if (sel) sel.value = v || "";
        }
      }
    });
  }

  const restaurarItens = (lista, containerGuiaId, cardContainerId, tipo) => {
    const containerGuia = document.getElementById(containerGuiaId);
    const containerCards = document.getElementById(cardContainerId);
    if (!lista || lista.length === 0) {
      containerGuia.innerText = "---";
      return;
    }
    lista.forEach(item => {
      const entry = document.createElement("div");
      entry.className = tipo + "-entry-guia";
      entry.dataset.isCustom = item.isCustom || "false";
      if (tipo === "weapon") {
        entry.dataset.weaponName = item.name;
        entry.dataset.attr = item.attr || "FOR";
        entry.dataset.baseDmg = item.baseDmg || "1d4";
        entry.dataset.magicBonus = item.magicBonus || "0";
        entry.dataset.uid = item.uid || ("w-" + Date.now() + Math.floor(Math.random() * 1000));
        entry.dataset.preco = item.preco || "--";
        entry.dataset.peso = item.peso || "--";
        entry.dataset.prop = item.prop || "";
        entry.dataset.desc = item.desc || "";
      } else if (tipo === "armor") {
        entry.dataset.name = item.name;
        entry.dataset.category = item.category || "";
      } else {
        entry.dataset.name = item.name;
      }
      entry.innerHTML = item.html;
      containerGuia.appendChild(entry);

      const card = document.createElement("div");
      card.className = "weapon-card";
      card.dataset.name = item.name;
      if (tipo === "weapon") {
        card.dataset.uid = entry.dataset.uid;
        card.dataset.isCustom = entry.dataset.isCustom;
      }
      let funcRemove = tipo === 'weapon' ? 'removerArma' : (tipo === 'armor' ? 'removerArmadura' : 'removerItem');
      let btnEditarHTML = (tipo === 'weapon' && item.isCustom === 'true')
        ? `<button type="button" class="insp-btn" onclick="editarArmaCustom(this)" style="background:#0066cc; width:16px; height:16px; border:none; color:white; cursor:pointer; margin-right:4px;" title="Editar">✏️</button>`
        : '';
      card.innerHTML = `
        <div class="weapon-card-header">
          <span class="weapon-card-title">${item.name}</span>
          <div style="display:flex; align-items:center;">
            ${btnEditarHTML}
            <button type="button" class="insp-btn" onclick="${funcRemove}(this)" style="background:#666; width:16px; height:16px; border:none; color:white; cursor:pointer;">-</button>
          </div>
        </div>
        ${tipo === 'weapon' ? `
        <div style="font-size: 11px; color: #555; display: flex; gap: 10px; margin-top: 4px; padding-top: 4px; border-top: 1px dashed #eee; align-items: center;">
          <span><b>Ataque:</b> <button type="button" class="roll-pill-btn card-atk-val" onclick="rolarAtaqueArma(this)" title="Rolar 1d20 + Ataque">--</button></span>
          <span><b>Dano:</b> <button type="button" class="roll-pill-btn card-dmg-val" onclick="rolarDanoArma(this)" title="Rolar Dano da Arma">--</button></span>
        </div>` : ''}
      `;
      containerCards.appendChild(card);
    });
  };

  restaurarItens(d.listas.armas, "desc-weapons-guia", "weapon-cards-container", "weapon");
  restaurarItens(d.listas.armaduras, "desc-armors-guia", "armor-cards-container", "armor");
  restaurarItens(d.listas.itens, "desc-items-guia", "item-cards-container", "item");

  const t = d.textos || {};
  ["t1", "t2", "t3", "t4"].forEach(id => {
    const el = document.getElementById(id);
    const customEl = document.getElementById(id + "_custom");
    if (el) {
      el.value = t[id] || "";
      if (customEl) customEl.value = t[id + "_c"] || "";
      mostrarTextoCompleto(el, id + "_display", id + "_custom");
    }
  });
  document.getElementById("t5").value = t.t5 || "";
  document.getElementById("equip_area").value = t.equip || "";
  if (document.getElementById("notes_full_page")) {
    document.getElementById("notes_full_page").value = t.notes || "";
  }

  const deathChecks = document.querySelectorAll('.circles input[type="checkbox"]');
  if (d.combate && d.combate.death_saves) {
    d.combate.death_saves.forEach((val, i) => { if (deathChecks[i]) deathChecks[i].checked = val; });
  }

  const status = d.combate_status || {};
  const condChecks = document.querySelectorAll(".condicao-check");
  if (status.condicoes && Array.isArray(status.condicoes)) {
    status.condicoes.forEach((marcado, i) => { if (condChecks[i]) condChecks[i].checked = marcado; });
  }
  const exInput = document.getElementById("exaustao_val");
  if (exInput) exInput.value = status.exaustao || 0;
  const logInput = document.getElementById("combat_log");
  if (logInput) logInput.value = status.log || "";

  calcular();
  atualizarSlotsMagia();
  atualizarRecursosClasse();

  if (d.magia && d.magia.slots_gastos) {
    const spellChecks = document.querySelectorAll("#spell-slots-tracker input[type='checkbox']");
    d.magia.slots_gastos.forEach((val, i) => { if (spellChecks[i]) spellChecks[i].checked = val; });
  }
  if (d.recursos_gastos) {
    const resourceChecks = document.querySelectorAll("#class-resources-tracker input[type='checkbox']");
    d.recursos_gastos.forEach((val, i) => { if (resourceChecks[i]) resourceChecks[i].checked = val; });
  }
  atualizarGuia();
}

function exportarFichaJSON() {
  const dados = obterObjetoFicha();
  dados.version = "7.1";
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dados, null, 2));
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", (dados.info.char_name || "Ficha_DnD") + ".json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function importarFichaJSON(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const d = JSON.parse(e.target.result);
      carregarDadosNaFicha(d);
      alert("Ficha de " + (d.info.char_name || "Herói") + " carregada com sucesso!");
    } catch (err) {
      console.error("Erro na importação:", err);
      alert("Erro ao ler o arquivo JSON.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function baixarFicha() {
  const antigoScript = document.getElementById("script-restauracao-html");
  if (antigoScript) antigoScript.remove();
  const dadosFicha = obterObjetoFicha();
  const scriptRestauracao = `
    <script id="script-restauracao-html">
      window.addEventListener('load', () => {
        setTimeout(() => {
          const dadosSalvos = ${JSON.stringify(dadosFicha)};
          if (typeof carregarDadosNaFicha === 'function') {
            carregarDadosNaFicha(dadosSalvos);
          }
        }, 400);
      });
    <\/script>
  `;
  document.body.insertAdjacentHTML('beforeend', scriptRestauracao);
  const htmlCompleto = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
  document.getElementById("script-restauracao-html")?.remove();

  const nomePersonagem = document.getElementById("char_name")?.value.trim() || "Ficha_Personagem";
  const nomeArquivoLimpo = `${nomePersonagem.replace(/[^a-zA-Z0-9]/g, "_")}_fichadnd5e.html`;
  const blob = new Blob([htmlCompleto], { type: "text/html;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = nomeArquivoLimpo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function ajustarTextareasParaImpressao() {
  const camposTexto = ['t5', 'equip_area', 'combat_log', 'notes_full_page'];
  camposTexto.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.value.trim() !== '') {
      el.style.height = 'auto';
      el.style.height = (el.scrollHeight + 6) + 'px';
    }
  });
}

function restaurarTextareasAposImpressao() {
  const camposTexto = ['t5', 'equip_area', 'combat_log', 'notes_full_page'];
  camposTexto.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.height = '';
  });
}

function imprimirPDF() {
  if (typeof atualizarGuia === "function") atualizarGuia();
  if (typeof atualizarResumoPericias === "function") atualizarResumoPericias();
  ajustarTextareasParaImpressao();
  window.print();
}

function resetarCamposFichaParaPadrao() {
  const idsParaResetar = [
    "char_name", "char_sex", "player_name", "level_val", "race_name", "subrace_name",
    "class_name", "subclass_name", "bg_name", "align", "hp_at", "hp_max", "hp_temp",
    "insp_val", "ca_val", "speed_val", "hit_dice", "spell_save_dc"
  ];
  idsParaResetar.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (id === "level_val") el.value = 1;
      else if (id === "ca_val") el.value = 10;
      else if (id === "spell_save_dc") el.value = 8;
      else if (id === "insp_val") el.value = 0;
      else el.value = "";
    }
  });
  document.querySelectorAll("textarea").forEach((t) => (t.value = ""));
  document.querySelectorAll('input[type="checkbox"]').forEach((c) => {
    c.checked = false;
    c.dataset.auto = "false";
  });
  document.getElementById("magias-container").innerHTML = "";
  document.getElementById("talentos-container").innerHTML = "";
  document.getElementById("idiomas-container").innerHTML = "";
  document.getElementById("armor-cards-container").innerHTML = "";
  document.getElementById("weapon-cards-container").innerHTML = "";
  document.getElementById("item-cards-container").innerHTML = "";
  document.getElementById("desc-weapons-guia").innerText = "---";
  document.getElementById("desc-armors-guia").innerText = "---";
  document.getElementById("desc-items-guia").innerText = "---";
  if (document.getElementById("select_armadura_phb")) document.getElementById("select_armadura_phb").selectedIndex = 0;
  if (document.getElementById("select_arma_phb")) document.getElementById("select_arma_phb").selectedIndex = 0;
  if (document.getElementById("select_item_phb")) document.getElementById("select_item_phb").selectedIndex = 0;
  document.querySelectorAll(".val-bonus").forEach((span) => (span.innerText = "+0"));
  document.querySelectorAll(".mod").forEach((div) => (div.innerText = "+0"));
  document.querySelectorAll(".condicao-check").forEach(c => c.checked = false);
  document.getElementById("exaustao_val").value = 0;
  document.getElementById("combat_log").value = "";
  setup();
  atualizarGuia();
}

function limparFicha() {
  if (!confirm("Tem certeza que deseja limpar todos os dados da ficha? Esta ação não pode ser desfeita.")) {
    return;
  }
  resetarCamposFichaParaPadrao();
  alert("Ficha reiniciada com sucesso!");
}

function descansoCurto() {
  const lvl = parseInt(document.getElementById("level_val")?.value) || 1;
  const className = document.getElementById("class_name")?.value || "";
  const subClassName = document.getElementById("subclass_name")?.value || "";
  const hitDiceStr = document.getElementById("hit_dice")?.value || `${lvl}d8`;
  const faces = parseInt(hitDiceStr.split("d")[1]) || 8;
  const modCon = parseInt(document.getElementById("CON_mod")?.innerText) || 0;

  const hpMax = parseInt(document.getElementById("hp_max")?.value) || 0;
  const hpAtInput = document.getElementById("hp_at");
  let hpAtual = hpAtInput && hpAtInput.value !== "" ? parseInt(hpAtInput.value) : hpMax;

  if (!confirm("Realizar um Descanso Curto (1 hora)?\nIsso permitirá gastar Dados de Vida para cura e recuperará recursos de descanso curto (Ki, Canalizar Divindade, Forma Selvagem, Surto de Ação, Slots de Bruxo, etc.).")) {
    return;
  }

  let msgCura = "";
  const qtdGastarStr = prompt(
    `Você possui até ${lvl} Dados de Vida (1d${faces} ${modCon >= 0 ? "+" : ""}${modCon} cada).\nQuantos Dados de Vida deseja gastar agora? (0 para nenhum):`,
    "0"
  );
  const qtdGastar = Math.max(0, Math.min(lvl, parseInt(qtdGastarStr) || 0));

  if (qtdGastar > 0 && hpMax > 0) {
    let somaDados = 0;
    let rolagens = [];
    let curaTotal = 0;

    for (let i = 0; i < qtdGastar; i++) {
      let r = Math.floor(randomCriptografico() * faces) + 1;
      somaDados += r;
      rolagens.push(r);
      curaTotal += Math.max(1, r + modCon);
    }

    let bonusCancaoDescanso = 0;
    let infoCancao = "";
    if (className === "Bardo (Bard)" && lvl >= 2) {
      const facesCancao = lvl >= 17 ? 12 : (lvl >= 13 ? 10 : (lvl >= 9 ? 8 : 6));
      bonusCancaoDescanso = Math.floor(randomCriptografico() * facesCancao) + 1;
      curaTotal += bonusCancaoDescanso;
      infoCancao = ` + ${bonusCancaoDescanso} (Canção de Descanso 1d${facesCancao})`;
    }

    const novoHP = Math.min(hpMax, hpAtual + curaTotal);
    const recuperadoReal = novoHP - hpAtual;
    if (hpAtInput) hpAtInput.value = novoHP;

    if (typeof registrarNoLog === "function") {
      registrarNoLog(
        `${qtdGastar}d${faces} [${rolagens.join(", ")}]${infoCancao}`,
        somaDados + bonusCancaoDescanso,
        qtdGastar * modCon,
        curaTotal,
        "Descanso Curto (Dados de Vida)"
      );
    }
    msgCura = `\n• Dados de Vida (${qtdGastar}d${faces}): +${recuperadoReal} PV recuperados${infoCancao ? " (inclui Canção de Descanso)" : ""}.`;
  }

  let recuperouSlotsBruxo = false;
  if (className === "Bruxo (Warlock)") {
    const slotBoxes = document.querySelectorAll("#spell-slots-tracker .box-list");
    slotBoxes.forEach(box => {
      const labelTxt = box.querySelector("label")?.innerText || "";
      if (labelTxt.includes("Pacto")) {
        box.querySelectorAll('input[type="checkbox"]').forEach(cb => {
          cb.checked = false;
          recuperouSlotsBruxo = true;
        });
      }
    });
  }

  const classesRecuperamCurto = [
    "Monge (Monk)",
    "Clérigo (Cleric)",
    "Paladino (Paladin)",
    "Druida (Druid)",
    "Guerreiro (Fighter)"
  ];

  let recuperouRecursos = false;
  if (classesRecuperamCurto.includes(className)) {
    document.querySelectorAll("#class-resources-tracker > div").forEach(row => {
      const labelTxt = row.querySelector("label")?.innerText || "";
      if (!labelTxt.includes("Indomável")) {
        row.querySelectorAll('input[type="checkbox"]').forEach(cb => {
          cb.checked = false;
          recuperouRecursos = true;
        });
      }
    });
  } else if (className === "Bardo (Bard)" && lvl >= 5) {
    document.querySelectorAll('#class-resources-tracker input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
      recuperouRecursos = true;
    });
  }

  let msgRecuperacaoExtra = "";
  if (className === "Druida (Druid)" && lvl >= 2 && subClassName.toLowerCase().includes("terra")) {
    const maxNiveisRec = Math.ceil(lvl / 2);
    msgRecuperacaoExtra += `\n• Recuperação Natural: você pode desmarcar espaços de magia até ${maxNiveisRec} níveis combinados (máx. 5º círculo).`;
  } else if (className === "Mago (Wizard)") {
    const maxNiveisRec = Math.ceil(lvl / 2);
    msgRecuperacaoExtra += `\n• Recuperação Arcana (1x/Descanso Longo): você pode desmarcar espaços de magia até ${maxNiveisRec} níveis combinados (máx. 5º círculo).`;
  }

  let resumo = "Descanso Curto concluído!";
  if (msgCura) resumo += msgCura;
  if (recuperouSlotsBruxo) resumo += "\n• Espaços de Magia de Pacto restaurados.";
  if (recuperouRecursos) resumo += "\n• Recursos de classe de descanso curto restaurados.";
  if (msgRecuperacaoExtra) resumo += msgRecuperacaoExtra;
  if (!msgCura && !recuperouSlotsBruxo && !recuperouRecursos && !msgRecuperacaoExtra) {
    resumo += "\n• Nenhum dado gasto ou recurso curto pendente.";
  }

  alert(resumo);
}

function descansoLongo() {
  if (!confirm("Realizar um Descanso Longo (8 horas)?\nIsso restaurará todos os Pontos de Vida, espaços de magia, recursos de classe e reduzirá 1 nível de Exaustão.")) {
    return;
  }

  // 1. Pontos de Vida Máximos e zera PV Temporários
  const hpMax = document.getElementById("hp_max")?.value;
  if (hpMax && document.getElementById("hp_at")) {
    document.getElementById("hp_at").value = hpMax;
  }
  if (document.getElementById("hp_temp")) {
    document.getElementById("hp_temp").value = "";
  }

  // 2. Restaura todos os Slots de Magia, Recursos de Classe e Salvaguardas contra Morte
  document.querySelectorAll('#spell-slots-tracker input[type="checkbox"]').forEach(s => (s.checked = false));
  document.querySelectorAll('#class-resources-tracker input[type="checkbox"]').forEach(r => (r.checked = false));
  document.querySelectorAll('.death-saves-box .circles input[type="checkbox"]').forEach(ds => (ds.checked = false));

  // 3. Reduz 1 nível de Exaustão (se houver)
  let msgExaustao = "";
  const exInput = document.getElementById("exaustao_val");
  if (exInput) {
    const exAtual = parseInt(exInput.value) || 0;
    if (exAtual > 0) {
      exInput.value = exAtual - 1;
      if (typeof atualizarAlertaCondicoes === "function") atualizarAlertaCondicoes();
      msgExaustao = `\n• Exaustão reduzida para nível ${exAtual - 1}.`;
    }
  }

  alert("Descanso Longo concluído!\n• Pontos de Vida, magias e recursos restaurados." + msgExaustao);
}

function gerarNomeAleatorio() {
  const raca = document.getElementById("race_name").value;
  if (!raca || raca === "") {
    alert("Ei, aventureiro! Você precisa escolher uma Raça primeiro para eu saber que tipo de nome gerar.");
    return;
  }
  let nomes = [];
  let sobrenomes = [];
  if (raca === "Meio-Elfo (Half-Elf)") {
    const fonte = Math.random() > 0.5 ? "Elfo (Elf)" : "Humano (Human)";
    nomes = nomesDb[fonte].nomes;
    sobrenomes = nomesDb[fonte].sobrenomes;
  } else if (nomesDb[raca]) {
    nomes = nomesDb[raca].nomes;
    sobrenomes = nomesDb[raca].sobrenomes;
  } else {
    nomes = nomesDb["Humano (Human)"].nomes;
    sobrenomes = nomesDb["Humano (Human)"].sobrenomes;
  }
  const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenomeAleatorio = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  document.getElementById("char_name").value = nomeAleatorio + " " + sobrenomeAleatorio;
}

function sortearTracosPersonalidade() {
  const ids = ["t1", "t2", "t3", "t4"];
  ids.forEach(id => {
    const sel = document.getElementById(id);
    const validOptions = Array.from(sel.options).filter(opt => opt.value !== "" && opt.value !== "custom");
    if (validOptions.length > 0) {
      const randomOpt = validOptions[Math.floor(Math.random() * validOptions.length)];
      sel.value = randomOpt.value;
      mostrarTextoCompleto(sel, id + "_display", id + "_custom");
    }
  });
}

function gerarPersonagemAleatorio() {
  if (!confirm("Tem certeza que deseja gerar um personagem aleatório? Todos os dados atuais da sua ficha serão sobrescrevidos.")) {
    return;
  }
  const nivel = Math.floor(Math.random() * 20) + 1;
  document.getElementById("level_val").value = nivel;

  const racas = Object.keys(mecanicasPHB.races);
  const racaSorteada = racas[Math.floor(Math.random() * racas.length)];
  document.getElementById("race_name").value = racaSorteada;
  atualizarSubracas();

  const selSubRaca = document.getElementById("subrace_name");
  const subRacasValidas = Array.from(selSubRaca.options).filter(opt => opt.value !== "");
  if (subRacasValidas.length > 0) {
    selSubRaca.value = subRacasValidas[Math.floor(Math.random() * subRacasValidas.length)].value;
  }

  const classes = Object.keys(mecanicasPHB.classes);
  const classeSorteada = classes[Math.floor(Math.random() * classes.length)];
  document.getElementById("class_name").value = classeSorteada;
  atualizarSubclasses();

  const selSubClasse = document.getElementById("subclass_name");
  const subClassesValidas = Array.from(selSubClasse.options).filter(opt => opt.value !== "" && !opt.text.includes("Requer Nível"));
  if (!selSubClasse.disabled && subClassesValidas.length > 0) {
    selSubClasse.value = subClassesValidas[Math.floor(Math.random() * subClassesValidas.length)].value;
  }

  const selBg = document.getElementById("bg_name");
  const bgsValidos = Array.from(selBg.options).filter(opt => opt.value !== "" && !opt.text.toLowerCase().includes("selecione"));
  if (bgsValidos.length > 0) {
    selBg.value = bgsValidos[Math.floor(Math.random() * bgsValidos.length)].value;
  }

  const selAlign = document.getElementById("align");
  const alignsValidos = Array.from(selAlign.options).filter(opt => opt.value !== "");
  selAlign.value = alignsValidos[Math.floor(Math.random() * alignsValidos.length)].value;

  gerarNomeAleatorio();

  const arrayAtributos = [15, 14, 13, 12, 10, 8].sort(() => Math.random() - 0.5);
  attrs.forEach((at, index) => {
    document.getElementById(at.id + "_score").value = arrayAtributos[index];
  });

  document.getElementById("magias-container").innerHTML = "";
  document.getElementById("talentos-container").innerHTML = "";
  document.getElementById("idiomas-container").innerHTML = "";
  document.getElementById("armor-cards-container").innerHTML = "";
  document.getElementById("weapon-cards-container").innerHTML = "";
  document.getElementById("item-cards-container").innerHTML = "";
  document.getElementById("desc-weapons-guia").innerText = "---";
  document.getElementById("desc-armors-guia").innerText = "---";
  document.getElementById("desc-items-guia").innerText = "---";

  setup();
  carregarCaracteristicasAntecedente();
  sortearTracosPersonalidade();
  atualizarGuia();
}