let ultimoEstadoRecurso = "";

function calcular(resetProficiencies = false) {
  const lvl = parseInt(document.getElementById("level_val").value) || 1;
  const prof = Math.floor((lvl - 1) / 4) + 2;
  document.getElementById("prof_bonus").value = `+${prof}`;

  const race = document.getElementById("race_name").value;
  const subrace = document.getElementById("subrace_name").value;
  const className = document.getElementById("class_name").value;
  const subClassName = document.getElementById("subclass_name").value;
  const backgroundRaw = document.getElementById("bg_name").value;
  const background = backgroundRaw.split(" (")[0];

  // Garante que os seletores estejam populados antes de qualquer inserção automática
  atualizarOpcoesArmadura();

  if (resetProficiencies) {
    document.querySelectorAll(".skill-prof, .save-prof").forEach((c) => {
      if (c.dataset.auto === "true") {
        c.checked = false;
        c.dataset.auto = "false";
        c.dataset.profLevel = "0";
        c.style.outline = "none";
        c.style.boxShadow = "none";
      }
    });

    atualizarIdiomasAutomaticos();

    const marcarAuto = (id) => {
      let safeId = id.replace(/\s+/g, "");
      let check = document.getElementById("check_" + safeId);
      if (check) {
        check.checked = true;
        check.dataset.auto = "true";
        check.dataset.profLevel = "1";
        check.style.outline = "none";
      }
    };

    if (race && proficienciasFixasDB.racas[race]) {
      proficienciasFixasDB.racas[race].forEach(s => marcarAuto(s));
    }
    if (background && proficienciasFixasDB.backgrounds[background]) {
      proficienciasFixasDB.backgrounds[background].forEach(s => marcarAuto(s));
    }
    if (mecanicasPHB.classes[className]) {
      mecanicasPHB.classes[className].saves.forEach(s => {
        const cb = document.querySelector(`.save-prof[data-attr="${s}"]`);
        if (cb) {
          cb.checked = true;
          cb.dataset.auto = "true";
        }
      });
    }
    sincronizarTudoAutomatico();
  }

  let bonusAtributos = { FOR: 0, DES: 0, CON: 0, INT: 0, SAB: 0, CAR: 0 };
  let baseSpeedStr = "9m";

  if (mecanicasPHB.races[race]) {
    const rData = mecanicasPHB.races[race];
    Object.keys(bonusAtributos).forEach(k => { if (rData[k]) bonusAtributos[k] += rData[k]; });
    if (rData.speed) baseSpeedStr = rData.speed;
  }
  if (subrace && mecanicasPHB.subraces[subrace]) {
    const srData = mecanicasPHB.subraces[subrace];
    Object.keys(bonusAtributos).forEach(k => { if (srData[k]) bonusAtributos[k] += srData[k]; });
    if (srData.speed) baseSpeedStr = srData.speed;
  }

  let mods = {};
  attrs.forEach(at => {
    const baseScore = parseInt(document.getElementById(`${at.id}_score`).value) || 10;
    const currentBonus = bonusAtributos[at.id] || 0;
    const m = Math.floor((baseScore + currentBonus - 10) / 2);
    mods[at.id] = m;

    const bSpan = document.getElementById(`${at.id}_bonus_display`);
    if (bSpan) bSpan.innerText = currentBonus > 0 ? `+${currentBonus}` : "";
    document.getElementById(`${at.id}_mod`).innerText = (m >= 0 ? "+" : "") + m;

    const sCheck = document.querySelector(`.save-prof[data-attr="${at.id}"]`);
    const sValSpan = document.getElementById(`save_${at.id}`);
    const manualBonus = parseInt(sValSpan.dataset.manual) || 0;
    const sVal = m + (sCheck && sCheck.checked ? prof : 0) + manualBonus;
    sValSpan.innerText = (sVal >= 0 ? "+" : "") + sVal;
  });

  if (mecanicasPHB.classes[className]) {
    const cData = mecanicasPHB.classes[className];
    const modCon = mods["CON"] || 0;
    const valorDado = parseInt(cData.hitDice.split('d')[1]) || 8;
    const mediaFixa = Math.floor(valorDado / 2) + 1;
    let totalHP = valorDado + modCon;
    if (lvl > 1) {
      totalHP += (mediaFixa + modCon) * (lvl - 1);
    }
    let hpExtraPorNivel = 0;
    if (subrace.includes("Anão da Colina") || subrace.includes("Hill Dwarf")) hpExtraPorNivel += 1;
    if (className.includes("Feiticeiro") && subClassName.includes("Dracônica")) hpExtraPorNivel += 1;
    const temRobusto = Array.from(document.querySelectorAll(".talento-select")).some(sel => sel.value.includes("Robusto") || sel.value.includes("Tough"));
    if (temRobusto) hpExtraPorNivel += 2;
    totalHP += (hpExtraPorNivel * lvl);
    if (totalHP < lvl) totalHP = lvl;

    const hpMaxInput = document.getElementById("hp_max");
    if (hpMaxInput && hpMaxInput.dataset.manual !== "true") {
      hpMaxInput.value = totalHP;
    }
    document.getElementById("hit_dice").value = lvl + "d" + valorDado;
  }

  // Versatilidade (Jack of All Trades) do Bardo no Nível 2+
  const halfProf = Math.floor(prof / 2);
  const temVersatilidade = (className === "Bardo (Bard)" && lvl >= 2);

  skills.forEach(sk => {
    const safeId = sk.n.replace(/\s+/g, "");
    const checkEl = document.getElementById(`check_${safeId}`);
    const valEl = document.getElementById(`sk_${safeId}`);
    if (checkEl && valEl) {
      const profLevel = parseInt(checkEl.dataset.profLevel) || 0;
      const manualBonus = parseInt(valEl.dataset.manual) || 0;
      const bonusProfEfetivo = profLevel > 0 ? (prof * profLevel) : (temVersatilidade ? halfProf : 0);
      const total = mods[sk.a] + bonusProfEfetivo + manualBonus;
      valEl.innerText = (total >= 0 ? "+" : "") + total;
    }
  });

  const inicBonus = mods["DES"] + (temVersatilidade ? halfProf : 0);
  document.getElementById("inic_val").value = (inicBonus >= 0 ? "+" : "") + inicBonus;

  const percCheck = document.getElementById("check_Percepção");
  const percProfLvl = percCheck ? (parseInt(percCheck.dataset.profLevel) || 0) : 0;
  const percBonusProf = percProfLvl > 0 ? (percProfLvl * prof) : (temVersatilidade ? halfProf : 0);
  document.getElementById("passive_perc").value = 10 + mods["SAB"] + percBonusProf;

  // Cálculo da Classe de Armadura (CA) e detecção de Armadura Pesada
  let baseCA = 10;
  let modDex = mods["DES"] || 0;
  let bonusEscudo = 0;
  let temArmadura = false;
  let usandoArmaduraPesada = false;

  const armorEntries = document.querySelectorAll(".armor-entry-guia");
  armorEntries.forEach(entry => {
    const nome = entry.dataset.name;
    const categoria = entry.dataset.category;
    if (nome.includes("Escudo")) {
      bonusEscudo = 2;
    } else {
      let armorData = null;
      for (const cat in armadurasDB) {
        if (armadurasDB[cat][nome]) armorData = armadurasDB[cat][nome];
      }
      if (armorData) {
        temArmadura = true;
        if (categoria === "Armadura Leve") {
          baseCA = armorData.ca + modDex;
        } else if (categoria === "Armadura Média") {
          baseCA = armorData.ca + Math.min(modDex, 2);
        } else if (categoria === "Armadura Pesada") {
          baseCA = armorData.ca;
          usandoArmaduraPesada = true;
        }
      }
    }
  });

  if (!temArmadura) {
    if (className === "Monge (Monk)") {
      baseCA = 10 + modDex + (mods["SAB"] || 0);
    } else if (className === "Bárbaro (Barbarian)") {
      baseCA = 10 + modDex + (mods["CON"] || 0);
    } else if (className === "Feiticeiro (Sorcerer)" && subClassName.includes("Dracônica")) {
      baseCA = 13 + modDex;
    } else {
      baseCA = 10 + modDex;
    }
  }
  document.getElementById("ca_val").value = baseCA + bonusEscudo;

  // Cálculo de Deslocamento (com Movimento Rápido do Bárbaro no Nível 5+)
  let speedNum = parseFloat(baseSpeedStr.replace(",", ".").replace("m", "")) || 9;
  if (className === "Bárbaro (Barbarian)" && lvl >= 5 && !usandoArmaduraPesada) {
    speedNum += 3;
  }
  document.getElementById("speed_val").value = `${speedNum.toString().replace(".", ",")}m`;

  // Painel e Botão de Infusões exclusivos do Artífice
  const isArtificer = className === "Artífice (Artificer)";
  const boxInfusoes = document.getElementById("box-infusoes-artifice");
  if (boxInfusoes) {
    boxInfusoes.style.display = (isArtificer && lvl >= 2) ? "block" : "none";
  }

  const btnInfusoes = document.getElementById("btn_toggle_infusions");
  const secInfusoes = document.getElementById("infusions_section_box");
  if (btnInfusoes) {
    btnInfusoes.style.display = isArtificer ? "inline-block" : "none";
  }
  if (!isArtificer && secInfusoes && secInfusoes.style.display === "block") {
    secInfusoes.style.display = "none";
    document.querySelector(".main-layout").style.display = "grid";
    document.querySelector(".header-container").style.display = "flex";
    if (btnInfusoes) btnInfusoes.innerText = "Infusões";
  }

  // Bônus de Fúria do Bárbaro (se checkbox de Fúria Ativa estiver marcado)
  const furiaAtiva = document.getElementById("check-furia-ativa")?.checked || false;
  let bonusFuria = 0;
  if (className === "Bárbaro (Barbarian)" && furiaAtiva && !usandoArmaduraPesada) {
    bonusFuria = lvl >= 16 ? 4 : (lvl >= 9 ? 3 : 2);
  }

  // Cálculo de Ataque e Dano das Armas
  const profVal = parseInt(document.getElementById("prof_bonus").value.replace("+", "")) || 2;
  document.querySelectorAll(".weapon-entry-guia").forEach(entry => {
    let modAtaque = 0;
    let baseDmg = "";
    let magicB = 0;
    let attrUsado = "FOR";
    let ehCorpoACorpo = true;
    const wName = entry.dataset.weaponName;

    if (entry.dataset.isCustom === "true") {
      attrUsado = entry.dataset.attr || "FOR";
      modAtaque = mods[attrUsado] || 0;
      baseDmg = entry.dataset.baseDmg || "1d4";
      magicB = parseInt(entry.dataset.magicBonus) || 0;
      ehCorpoACorpo = !(entry.dataset.prop || "").toLowerCase().includes("distância");
    } else {
      let wData = null;
      let catEncontrada = "";
      for (const cat in armasDB) {
        if (armasDB[cat][wName]) {
          wData = armasDB[cat][wName];
          catEncontrada = cat;
        }
      }
      if (!wData) return;
      baseDmg = wData.dano;
      const prop = wData.prop.toLowerCase();
      ehCorpoACorpo = catEncontrada.includes("Corpo-a-Corpo");

      if (prop.includes("distância") || (prop.includes("arremesso") && !prop.includes("acuidade"))) {
        attrUsado = "DES";
      } else if (prop.includes("acuidade")) {
        attrUsado = mods["FOR"] > mods["DES"] ? "FOR" : "DES";
      }
      modAtaque = mods[attrUsado];
    }

    const extraFuria = (ehCorpoACorpo && attrUsado === "FOR") ? bonusFuria : 0;
    const totalAtk = modAtaque + profVal + magicB;
    const totalDmgMod = modAtaque + magicB + extraFuria;

    const atkEl = entry.querySelector(".atk-val");
    const dmgEl = entry.querySelector(".dmg-val");
    if (atkEl) atkEl.innerText = (totalAtk >= 0 ? "+" : "") + totalAtk;
    if (dmgEl) dmgEl.innerText = baseDmg === "-" ? "-" : (baseDmg + (totalDmgMod >= 0 ? "+" : "") + totalDmgMod);

    const uid = entry.dataset.uid;
    let cardEls = uid
      ? document.querySelectorAll(`#weapon-cards-container .weapon-card[data-uid="${uid}"]`)
      : document.querySelectorAll(`#weapon-cards-container .weapon-card[data-name="${wName}"]`);

    cardEls.forEach(cardEl => {
      const cardAtk = cardEl.querySelector(".card-atk-val");
      const cardDmg = cardEl.querySelector(".card-dmg-val");
      if (cardAtk) cardAtk.innerText = (totalAtk >= 0 ? "+" : "") + totalAtk;
      if (cardDmg) cardDmg.innerText = baseDmg === "-" ? "-" : (baseDmg + (totalDmgMod >= 0 ? "+" : "") + totalDmgMod);
    });
  });

  atualizarSubclasses();
  atualizarSlotsMagia();
  atualizarResumoPericias();
  atualizarGuia();
  atualizarRecursosClasse();
  vincularCliquesRolagem();
  atualizarBlocoConjuracao();
}

function modificarScore(attrId, delta) {
  const input = document.getElementById(attrId + "_score");
  let currentVal = parseInt(input.value) || 0;
  let newVal = currentVal + delta;
  if (newVal < 1) newVal = 1;
  if (newVal > 30) newVal = 30;
  input.value = newVal;
  calcular();
}

function modificarManualSkill(safeId, delta) {
  const el = document.getElementById('sk_' + safeId);
  if (!el) return;
  let currentManual = parseInt(el.dataset.manual) || 0;
  el.dataset.manual = currentManual + delta;
  calcular();
}

function modificarManualSave(attrId, delta) {
  const el = document.getElementById('save_' + attrId);
  if (!el) return;
  let currentManual = parseInt(el.dataset.manual) || 0;
  el.dataset.manual = currentManual + delta;
  calcular();
}

function alternarEspecializacao(el) {
  let level = parseInt(el.dataset.profLevel) || 0;
  level = (level + 1) % 3;
  el.dataset.profLevel = level;
  if (level === 0) {
    el.checked = false;
    el.style.outline = "none";
    el.style.boxShadow = "none";
  } else if (level === 1) {
    el.checked = true;
    el.style.outline = "none";
    el.style.boxShadow = "none";
  } else if (level === 2) {
    el.checked = true;
    el.style.outline = "2px solid #d4af37";
    el.style.boxShadow = "0 0 5px #d4af37";
  }
  calcular();
}

function atualizarBlocoConjuracao() {
  const classe = document.getElementById("class_name").value;
  const subclasse = document.getElementById("subclass_name").value;
  const lvl = parseInt(document.getElementById("level_val").value) || 1;
  const profBonus = Math.floor((lvl - 1) / 4) + 2;

  let atributoChave = "";
  const classesInt = ["Mago (Wizard)", "Artífice (Artificer)"];
  const classesSab = ["Clérigo (Cleric)", "Druida (Druid)", "Patrulheiro (Ranger)"];
  const classesCar = ["Bardo (Bard)", "Bruxo (Warlock)", "Feiticeiro (Sorcerer)", "Paladino (Paladin)"];
  const subclassesInt = ["Trapaceiro Arcano (Arcane Trickster)", "Cavaleiro Arcano (Eldritch Knight)"];

  if (classesInt.includes(classe) || subclassesInt.includes(subclasse)) {
    atributoChave = "INT";
  } else if (classesSab.includes(classe)) {
    atributoChave = "SAB";
  } else if (classesCar.includes(classe)) {
    atributoChave = "CAR";
  }

  let modValor = 0;
  let textoAtributo = "+0";
  if (atributoChave !== "") {
    const modEl = document.getElementById(`${atributoChave}_mod`);
    if (modEl) {
      modValor = parseInt(modEl.innerText) || 0;
    } else {
      const inputAttr = document.getElementById(`${atributoChave}_score`);
      const score = inputAttr ? (parseInt(inputAttr.value) || 10) : 10;
      modValor = Math.floor((score - 10) / 2);
    }
    textoAtributo = (modValor >= 0 ? "+" : "") + modValor;
  }

  const inputSpellAttr = document.getElementById("spell_attr_val");
  const inputSpellDC = document.getElementById("spell_save_dc");
  const inputSpellAtk = document.getElementById("spell_atk_mod");

  if (inputSpellAttr) inputSpellAttr.value = textoAtributo;
  if (inputSpellDC) inputSpellDC.value = atributoChave !== "" ? (8 + profBonus + modValor) : 8;
  if (inputSpellAtk) {
    const totalAtk = profBonus + modValor;
    inputSpellAtk.value = (totalAtk >= 0 ? "+" : "") + totalAtk;
  }
}

function getSpellLevel(spellName) {
  if (!spellName) return 99;
  for (const levelKey in magiasDB) {
    if (magiasDB[levelKey][spellName]) {
      if (levelKey.includes("Truques")) return 0;
      return parseInt(levelKey.replace(/\D/g, "")) || 0;
    }
  }
  return 99;
}

function atualizarMoedasIniciais() {
  const seletorBg = document.getElementById("bg_name");
  if (!seletorBg) return;
  const bgName = seletorBg.value.split("(")[0].trim();
  const totalPO = goldByBackgroundDB[bgName] || 0;
  const campoOuro = document.getElementById("coin_po");
  if (campoOuro) campoOuro.value = totalPO;
}

function converterMoedas() {
  const elPc = document.getElementById("coin_pc");
  const elPp = document.getElementById("coin_pp");
  const elPo = document.getElementById("coin_po");
  const elPl = document.getElementById("coin_pl");
  if (!elPc || !elPp || !elPo || !elPl) return;

  let pc = parseInt(elPc.value) || 0;
  let pp = parseInt(elPp.value) || 0;
  let po = parseInt(elPo.value) || 0;
  let pl = parseInt(elPl.value) || 0;

  let totalEmPC = (pl * 1000) + (po * 100) + (pp * 10) + pc;
  if (totalEmPC === 0) return;

  elPl.value = Math.floor(totalEmPC / 1000);
  totalEmPC %= 1000;
  elPo.value = Math.floor(totalEmPC / 100);
  totalEmPC %= 100;
  elPp.value = Math.floor(totalEmPC / 10);
  elPc.value = totalEmPC % 10;

  alert("Moedas convertidas com sucesso!");
}

function sincronizarTudoAutomatico() {
  const classe = document.getElementById("class_name").value;
  const subclasse = document.getElementById("subclass_name").value;
  const raca = document.getElementById("race_name").value;
  const subraca = document.getElementById("subrace_name").value;
  const antec = document.getElementById("bg_name").value;

  document.querySelectorAll(".auto-item").forEach(el => el.remove());

  const processarEquip = (obj) => {
    if (!obj) return;
    if (obj.armas) obj.armas.forEach(n => adicionarItemAutomatico(n, 'arma'));
    if (obj.armaduras) obj.armaduras.forEach(n => adicionarItemAutomatico(n, 'armadura'));
    if (obj.itens) obj.itens.forEach(n => adicionarItemAutomatico(n, 'item'));
  };

  if (startingEquipmentDB.racas) processarEquip(startingEquipmentDB.racas[raca]);
  if (startingEquipmentDB.subracas) processarEquip(startingEquipmentDB.subracas[subraca]);
  if (startingEquipmentDB.classes) processarEquip(startingEquipmentDB.classes[classe]);
  if (startingEquipmentDB.subclasses) processarEquip(startingEquipmentDB.subclasses[subclasse]);
  if (startingEquipmentDB.backgrounds) processarEquip(startingEquipmentDB.backgrounds[antec]);

  // Restaura placeholders "---" se alguma categoria ficou vazia
  if (document.querySelectorAll("#desc-weapons-guia .weapon-entry-guia").length === 0) {
    document.getElementById("desc-weapons-guia").innerText = "---";
  }
  if (document.querySelectorAll("#desc-armors-guia .armor-entry-guia").length === 0) {
    document.getElementById("desc-armors-guia").innerText = "---";
  }
  if (document.querySelectorAll("#desc-items-guia .item-entry-guia").length === 0) {
    document.getElementById("desc-items-guia").innerText = "---";
  }

  atualizarMoedasIniciais();
}

function atualizarOpcoesArmadura() {
  const classeSelecionada = document.getElementById("class_name").value;
  const subclasseSelecionada = document.getElementById("subclass_name")?.value || "";
  const lvl = parseInt(document.getElementById("level_val")?.value) || 1;
  const selectArmadura = document.getElementById("select_armadura_phb");
  if (!selectArmadura) return;
  const valorPreDefinido = selectArmadura.value;
  selectArmadura.innerHTML = '<option value="">Selecione uma armadura</option>';

  if (!classeSelecionada) {
    armadurasPHB_Lista.forEach(arm => {
      let opt = document.createElement("option");
      opt.value = arm.valor;
      opt.innerText = arm.texto;
      selectArmadura.appendChild(opt);
    });
    selectArmadura.value = valorPreDefinido;
    return;
  }

  let tiposPermitidos = [...(proficienciasArmaduraDB[classeSelecionada] || [])];

  // Bardo: Colégio da Bravura ganha armaduras médias e escudos no 3º nível
  if (classeSelecionada === "Bardo (Bard)" && subclasseSelecionada.includes("Bravura") && lvl >= 3) {
    tiposPermitidos = ["leve", "media", "escudo"];
  }

  // Clérigo: Domínios que concedem proficiência com Armaduras Pesadas no 1º nível
  if (classeSelecionada === "Clérigo (Cleric)") {
    const dominiosPesados = ["Vida", "Guerra", "Natureza", "Tempestade", "Ordem", "Crepúsculo"];
    if (dominiosPesados.some(dom => subclasseSelecionada.includes(dom))) {
      tiposPermitidos = ["leve", "media", "pesada", "escudo"];
    }
  }

  armadurasPHB_Lista.forEach(arm => {
    if (tiposPermitidos.includes(arm.tipo)) {
      let opt = document.createElement("option");
      opt.value = arm.valor;
      opt.innerText = arm.texto;
      selectArmadura.appendChild(opt);
    }
  });

  if (tiposPermitidos.length === 0) {
    let opt = document.createElement("option");
    opt.value = "";
    opt.innerText = "Nenhuma proficiência de armadura por classe";
    opt.disabled = true;
    selectArmadura.appendChild(opt);
  } else {
    selectArmadura.value = valorPreDefinido;
  }
}