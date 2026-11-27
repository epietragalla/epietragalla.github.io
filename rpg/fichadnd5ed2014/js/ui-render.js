const DEFAULT_AVATAR_SVG = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'%3E%3C/path%3E%3C/svg%3E";

function limparTexto(txt) {
  if (!txt) return "";
  return txt.replace(/\]*\]/g, "").trim();
}

function setup() {
  const containerAtributos = document.getElementById("coluna-atributos-pericias");
  if (!containerAtributos) return;

  let htmlAtributos = `
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 12px;">
      <div class="attr-box" style="margin-bottom:0; padding: 6px 4px;">
        <label style="font-size: 8.5px;">Proficiência</label>
        <input type="text" id="prof_bonus" readonly style="width:100%; font-weight:bold; font-size:20px; text-align:center; border:none; color:var(--dnd-red); background:transparent;">
      </div>
      <div class="attr-box" style="margin-bottom:0; padding: 6px 4px;">
        <label style="font-size: 8.5px;">Inspiração</label>
        <input type="number" id="insp_val" value="0" style="width:100%; text-align:center; border:none; font-weight:bold; font-size:20px; background:transparent;">
      </div>
      <div class="attr-box" style="margin-bottom:0; padding: 6px 4px;" title="Percepção Passiva (10 + Sabedoria + Proficiência)">
        <label style="font-size: 8.5px;">Perc. Passiva</label>
        <input type="text" id="passive_perc" readonly value="10" style="width:100%; text-align:center; border:none; font-weight:bold; font-size:20px; color:#333; background:transparent;">
      </div>
    </div>
  `;

  attrs.forEach((at) => {
    htmlAtributos += `
      <div class="attr-group-box">
        <div style="text-align: center; border-bottom: 2px solid var(--dnd-red); margin-bottom: 8px; padding-bottom: 5px;">
          <label style="display: block; font-weight: bold; text-transform: uppercase; font-size: 11px; color: var(--dnd-red);">${at.n}</label>
          <div class="mod" id="${at.id}_mod">+0</div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 5px;">
            <button type="button" class="btn-step" onclick="modificarScore('${at.id}', -1)">-</button>
            <div style="position: relative;">
              <input type="number" class="score-input" id="${at.id}_score" value="10" oninput="calcular()">
              <span id="${at.id}_bonus_display" style="position: absolute; top: -14px; left: 50%; transform: translateX(-50%); font-size: 10px; color: var(--dnd-red); font-weight: bold; white-space: nowrap;"></span>
            </div>
            <button type="button" class="btn-step" onclick="modificarScore('${at.id}', 1)">+</button>
          </div>
        </div>
        <div class="row" style="background: #f0f0f0; border-radius: 4px; padding: 4px 6px; margin-bottom: 6px;">
          <input type="checkbox" class="save-prof" data-attr="${at.id}" onchange="calcular()">
          <span class="val-bonus" id="save_${at.id}" data-manual="0">+0</span>
          <div style="display: flex; flex-direction: column; align-items: center; line-height: 0.5; margin: 0 6px;">
            <button type="button" style="background:none; border:none; cursor:pointer; font-size:9px; color:#666; padding:1px 0;" onclick="modificarManualSave('${at.id}', 1)">▲</button>
            <button type="button" style="background:none; border:none; cursor:pointer; font-size:9px; color:#666; padding:1px 0;" onclick="modificarManualSave('${at.id}', -1)">▼</button>
          </div>
          <span style="font-size: 10.5px; font-weight: bold; text-transform: uppercase;">Salvaguarda</span>
        </div>
        <div style="padding-left: 2px;">
          ${skills.filter(sk => sk.a === at.id).map(sk => {
      const safeId = sk.n.replace(/\s+/g, "");
      return `
              <div class="row" style="margin-bottom: 3px;">
                <input type="checkbox" class="skill-prof" data-attr="${sk.a}" id="check_${safeId}" data-prof-level="0" onclick="alternarEspecializacao(this)">
                <span class="val-bonus" id="sk_${safeId}" data-manual="0">+0</span>
                <div style="display: flex; flex-direction: column; align-items: center; line-height: 0.5; margin: 0 6px;">
                  <button type="button" style="background:none; border:none; cursor:pointer; font-size:8.5px; color:#888; padding:1px 0;" onclick="modificarManualSkill('${safeId}', 1)">▲</button>
                  <button type="button" style="background:none; border:none; cursor:pointer; font-size:8.5px; color:#888; padding:1px 0;" onclick="modificarManualSkill('${safeId}', -1)">▼</button>
                </div>
                <span style="font-size: 11.5px;">${sk.n}</span>
              </div>
            `;
    }).join('')}
        </div>
      </div>
    `;
  });

  htmlAtributos += `
    <div style="padding: 5px; border-top: 1px dashed #ccc;">
      <p style="font-size: 10px; color: #666; font-style: italic; line-height: 1.3; margin: 0;">
        <strong>Distribuição inicial:</strong> 15, 14, 13, 12, 10 e 8 entre os atributos base.
      </p>
    </div>
  `;

  containerAtributos.innerHTML = htmlAtributos;
  adicionarTalento();
  adicionarMagia();
  atualizarSubclasses();
  calcular(true);
  atualizarGuia();
  ["t1", "t2", "t3", "t4"].forEach(id => {
    const el = document.getElementById(id);
    if (el) mostrarTextoCompleto(el, id + "_display", id + "_custom");
  });
  adicionarIdioma();
  carregarCaracteristicasAntecedente();
  atualizarResumoPericias();
}

function alterarImagemPersonagem() {
  const imgEl = document.getElementById("char_img");
  if (!imgEl) return;
  const urlAtual = imgEl.src;
  const sugestao = urlAtual.startsWith("data:image/svg+xml") ? "" : urlAtual;
  const novaUrl = prompt("Cole aqui o endereço (URL) da imagem do personagem:", sugestao);
  if (novaUrl !== null) {
    const urlLimpa = novaUrl.trim();
    imgEl.src = urlLimpa === "" ? DEFAULT_AVATAR_SVG : urlLimpa;
  }
}

function atualizarSubracas() {
  const r = document.getElementById("race_name").value;
  const selSub = document.getElementById("subrace_name");
  selSub.innerHTML = '<option value="">Selecione...</option>';
  if (possibleSubraces[r]) {
    possibleSubraces[r].forEach((s) => {
      selSub.innerHTML += `<option value="${s}">${s}</option>`;
    });
  }
}

function atualizarSubclasses() {
  const c = document.getElementById("class_name").value;
  const lvl = parseInt(document.getElementById("level_val").value) || 1;
  const selSub = document.getElementById("subclass_name");
  const valorAntesDeLimpar = selSub.value;
  selSub.innerHTML = '<option value="">Selecione...</option>';
  selSub.disabled = false;

  if (c) {
    const escolherNoNivel3 = [
      "Ladino (Rogue)", "Artífice (Artificer)", "Guerreiro (Fighter)",
      "Paladino (Paladin)", "Bárbaro (Barbarian)", "Bardo (Bard)",
      "Monge (Monk)", "Patrulheiro (Ranger)"
    ];
    const escolherNoNivel2 = ["Druida (Druid)", "Mago (Wizard)"];

    if (escolherNoNivel3.includes(c) && lvl < 3) {
      selSub.disabled = true;
      selSub.innerHTML = `<option value="">Requer Nível 3...</option>`;
    } else if (escolherNoNivel2.includes(c) && lvl < 2) {
      selSub.disabled = true;
      selSub.innerHTML = `<option value="">Requer Nível 2...</option>`;
    } else if (dataPHB.subclasses[c]) {
      Object.keys(dataPHB.subclasses[c]).forEach((s) => {
        let selected = (s === valorAntesDeLimpar) ? "selected" : "";
        selSub.innerHTML += `<option value="${s}" ${selected}>${s}</option>`;
      });
    }
  }
}

function carregarCaracteristicasAntecedente() {
  const background = document.getElementById("bg_name").value;
  const config = [
    { selectId: "t1", displayId: "t1_display", customId: "t1_custom", key: "tracos" },
    { selectId: "t2", displayId: "t2_display", customId: "t2_custom", key: "ideais" },
    { selectId: "t3", displayId: "t3_display", customId: "t3_custom", key: "vinculos" },
    { selectId: "t4", displayId: "t4_display", customId: "t4_custom", key: "defeitos" }
  ];

  config.forEach((item) => {
    const select = document.getElementById(item.selectId);
    select.innerHTML = '<option value="">Selecione...</option>';
    if (background && antecedentesData[background]) {
      const lista = antecedentesData[background][item.key];
      lista.forEach((texto) => {
        const opt = document.createElement("option");
        opt.value = texto;
        opt.innerText = texto.length > 50 ? texto.substring(0, 47) + "..." : texto;
        select.appendChild(opt);
      });
    }
    const optCustom = document.createElement("option");
    optCustom.value = "custom";
    optCustom.innerText = "Outro (Escrever meu próprio...)";
    select.appendChild(optCustom);
    mostrarTextoCompleto(select, item.displayId, item.customId);
  });
}

function mostrarTextoCompleto(selectEl, displayId, customId) {
  const displayDiv = document.getElementById(displayId);
  const customArea = document.getElementById(customId);
  if (selectEl.value === "custom") {
    displayDiv.style.display = "none";
    customArea.style.display = "block";
  } else {
    customArea.style.display = "none";
    displayDiv.style.display = "block";
    displayDiv.innerText = selectEl.value || "---";
  }
}

function atualizarOpcoesArmadura() {
  const classeSelecionada = document.getElementById("class_name").value;
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

  const tiposPermitidos = proficienciasArmaduraDB[classeSelecionada] || [];
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

function carregarSeletorArmaduras() {
  const select = document.getElementById("select_armadura_phb");
  if (!select) return;
  select.innerHTML = '<option value="">Selecione uma armadura</option>';
  for (const cat in armadurasDB) {
    let group = document.createElement("optgroup");
    group.label = cat;
    for (const arm in armadurasDB[cat]) {
      let opt = document.createElement("option");
      opt.value = arm;
      opt.innerText = arm;
      group.appendChild(opt);
    }
    select.appendChild(group);
  }
}

function adicionarArmaduraCard() {
  const armName = document.getElementById("select_armadura_phb").value;
  if (!armName) return;
  let data = null;
  let categoriaEncontrada = "";
  for (const cat in armadurasDB) {
    if (armadurasDB[cat][armName]) {
      data = armadurasDB[cat][armName];
      categoriaEncontrada = cat;
    }
  }
  if (!data) return;

  const cardsContainer = document.getElementById("armor-cards-container");
  const card = document.createElement("div");
  card.className = "weapon-card";
  card.dataset.name = armName;
  card.innerHTML = `
    <div class="weapon-card-header">
      <span class="weapon-card-title" style="font-size:12px;">${armName}</span>
      <button type="button" class="insp-btn" onclick="removerArmadura(this)" style="background:#666; width:16px; height:16px;">-</button>
    </div>
  `;
  cardsContainer.appendChild(card);

  const guideContainer = document.getElementById("desc-armors-guia");
  if (guideContainer.innerText === "---") guideContainer.innerHTML = "";
  const infoItem = document.createElement("div");
  infoItem.className = "armor-entry-guia";
  infoItem.dataset.name = armName;
  infoItem.dataset.category = categoriaEncontrada;
  infoItem.style.cssText = "font-size: 12px; border-bottom: 1px solid #eee; margin-bottom: 10px; padding-top: 3px; line-height: 1.2; color: #333;";
  infoItem.innerHTML = `
    <b style="text-transform:uppercase; color:#333; border-bottom: 0px;">${armName}:</b> 
    CA: ${data.ca}${data.dex !== 0 ? ' +Des' : ''} | 
    ${data.custo} | ${data.peso} | 
    Força: ${data.forca} | Furtividade: ${data.furtiv}
  `;
  guideContainer.appendChild(infoItem);

  calcular();
  atualizarGuia();
}

function removerArmadura(btn) {
  const card = btn.closest('.weapon-card');
  const name = card.dataset.name;
  card.remove();
  const guideEntries = document.querySelectorAll(`#desc-armors-guia .armor-entry-guia`);
  guideEntries.forEach(e => { if (e.dataset.name === name) e.remove(); });
  if (document.querySelectorAll("#desc-armors-guia .armor-entry-guia").length === 0) {
    document.getElementById("desc-armors-guia").innerText = "---";
  }
  calcular();
}

function carregarSeletorArmas() {
  const select = document.getElementById("select_arma_phb");
  if (!select) return;
  select.innerHTML = '<option value="">Selecione uma arma</option>';
  for (const cat in armasDB) {
    let group = document.createElement("optgroup");
    group.label = cat;
    for (const arma in armasDB[cat]) {
      let opt = document.createElement("option");
      opt.value = arma;
      opt.innerText = arma;
      group.appendChild(opt);
    }
    select.appendChild(group);
  }
  select.innerHTML += '<option value="custom" style="color:var(--dnd-red); font-weight:bold;">➕ Outra (Personalizada)...</option>';
}

function adicionarArmaCard() {
  const weaponSelect = document.getElementById("select_arma_phb");
  const weaponValue = weaponSelect.value;
  if (!weaponValue) return;

  let wData = {
    nome: "", atk: "--", dano: "--", preco: "--", peso: "--",
    prop: "", desc: "", custom: false, attr: "FOR", magicBonus: 0
  };

  if (weaponValue === "custom") {
    wData.nome = prompt("Nome da Arma:");
    if (!wData.nome) return;
    const escolhaAttr = prompt("Qual atributo essa arma usa? (FOR, DES, INT, SAB, CAR)", "FOR").toUpperCase();
    wData.attr = ["FOR", "DES", "INT", "SAB", "CAR"].includes(escolhaAttr) ? escolhaAttr : "FOR";
    wData.dano = prompt("Dado de Dano base (ex: 1d8, 2d6):", "1d4");
    wData.magicBonus = parseInt(prompt("Bônus Mágico da arma (ex: 0, 1, 2):", "0")) || 0;
    wData.preco = prompt("Preço (ex: 10 po):", "--");
    wData.peso = prompt("Peso (ex: 1kg):", "--");
    wData.prop = prompt("Propriedades (Acuidade, Alcance, Arremesso, Duas Mãos, Especial, Leve, Munição, Pesada, Recarga, Versátil):", "--");
    wData.desc = prompt("Descrição/Efeitos Mágicos:", "");
    wData.custom = true;
  } else {
    wData.nome = weaponValue;
    for (const c in armasDB) {
      if (armasDB[c][weaponValue]) {
        const d = armasDB[c][weaponValue];
        wData.dano = d.dano;
        wData.preco = d.preco;
        wData.peso = d.peso;
        wData.prop = d.prop;
      }
    }
  }

  const uid = "w-" + Date.now() + Math.floor(Math.random() * 1000);
  const cardsContainer = document.getElementById("weapon-cards-container");
  const card = document.createElement("div");
  card.className = "weapon-card";
  card.dataset.name = wData.nome;
  card.dataset.uid = uid;
  card.dataset.isCustom = wData.custom ? "true" : "false";

  let btnEditarHTML = wData.custom
    ? `<button type="button" class="insp-btn" onclick="editarArmaCustom(this)" style="background:transparent; width:16px; height:16px; border:none; color:white; cursor:pointer; margin-right:4px; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; padding: 0; line-height: 1;" title="Editar">✏️</button>`
    : '';

  card.innerHTML = `
    <div class="weapon-card-header">
      <span class="weapon-card-title">${wData.nome}</span>
      <div style="display:flex; align-items:center;">
        ${btnEditarHTML}
        <button type="button" class="insp-btn" onclick="removerArma(this)" style="background:#666; width:16px; height:16px; border:none; color:white; cursor:pointer;">-</button>
      </div>
    </div>
    <div style="font-size: 11px; color: #555; display: flex; gap: 10px; margin-top: 4px; padding-top: 4px; border-top: 1px dashed #eee; align-items: center;">
      <span><b>Ataque:</b> <button type="button" class="roll-pill-btn card-atk-val" onclick="rolarAtaqueArma(this)" title="Rolar 1d20 + Ataque">--</button></span>
      <span><b>Dano:</b> <button type="button" class="roll-pill-btn card-dmg-val" onclick="rolarDanoArma(this)" title="Rolar Dano da Arma">--</button></span>
    </div>
  `;
  cardsContainer.appendChild(card);

  const containerGuia = document.getElementById("desc-weapons-guia");
  if (containerGuia.innerText === "---") containerGuia.innerHTML = "";
  const infoItem = document.createElement("div");
  infoItem.className = "weapon-entry-guia";
  infoItem.dataset.weaponName = wData.nome;
  infoItem.dataset.uid = uid;
  infoItem.dataset.isCustom = wData.custom ? "true" : "false";
  infoItem.dataset.attr = wData.attr;
  infoItem.dataset.baseDmg = wData.dano;
  infoItem.dataset.magicBonus = wData.magicBonus;
  infoItem.dataset.preco = wData.preco;
  infoItem.dataset.peso = wData.peso;
  infoItem.dataset.prop = wData.prop;
  infoItem.dataset.desc = wData.desc;
  infoItem.style.cssText = "border-bottom: 1px solid #ccc; padding: 6px 0; margin-bottom: 8px; color: #000;";
  infoItem.innerHTML = `
    <div style="font-weight: bold; font-size: 12px; text-transform:uppercase; margin-bottom: 4px;">${wData.nome}:</div>
    <div style="display: grid; grid-template-columns: 70px 100px 70px 1fr; font-size: 10px; gap: 5px;">
      <div style="color: #666; font-weight: bold;">ATAQUE</div>
      <div style="color: #666; font-weight: bold;">DANO</div>
      <div style="color: #666; font-weight: bold;">PREÇO</div>
      <div style="color: #666; font-weight: bold;">PESO</div>
      <div class="atk-val" style="font-size: 12px; font-weight: bold;">--</div>
      <div class="dmg-val" style="font-size: 12px; font-weight: bold;">--</div>
      <div style="font-size: 12px; font-weight: bold;">${wData.preco}</div>
      <div style="font-size: 12px; font-weight: bold;">${wData.peso}</div>
      <div style="font-size: 12px; grid-column: span 4; margin-top: 4px; padding-top: 4px; border-top: 1px dashed #eee;">
        <small style="padding-bottom:25px;"><b style="font-size: 10px; color:#666;">Propriedades:</b> ${wData.prop} ${wData.custom ? `(Atributo: ${wData.attr})` : ''}</small>
        ${wData.desc ? `<br><small><b style="font-size: 10px; color:#666; margin-top:20px;">Descrição:</b> ${wData.desc}</small>` : ''}
      </div>
    </div>
  `;
  containerGuia.appendChild(infoItem);
  calcular();
}

function editarArmaCustom(btn) {
  const card = btn.closest('.weapon-card');
  const uid = card.dataset.uid;
  let entry = document.querySelector(`.weapon-entry-guia[data-uid="${uid}"]`);
  if (!entry) return;

  const novoNome = prompt("Nome da Arma:", entry.dataset.weaponName);
  if (!novoNome) return;
  const escolhaAttr = prompt("Qual atributo essa arma usa? (FOR, DES, INT, SAB, CAR)", entry.dataset.attr).toUpperCase();
  const novoAttr = ["FOR", "DES", "INT", "SAB", "CAR"].includes(escolhaAttr) ? escolhaAttr : "FOR";
  const novoDano = prompt("Dado de Dano base (ex: 1d8, 2d6):", entry.dataset.baseDmg);
  const novoMagic = parseInt(prompt("Bônus Mágico da arma:", entry.dataset.magicBonus)) || 0;
  const novoPreco = prompt("Preço:", entry.dataset.preco);
  const novoPeso = prompt("Peso:", entry.dataset.peso);
  const novaProp = prompt("Propriedades:", entry.dataset.prop);
  const novaDesc = prompt("Descrição/Efeitos Mágicos:", entry.dataset.desc);

  card.dataset.name = novoNome;
  card.querySelector('.weapon-card-title').innerText = novoNome;
  entry.dataset.weaponName = novoNome;
  entry.dataset.attr = novoAttr;
  entry.dataset.baseDmg = novoDano;
  entry.dataset.magicBonus = novoMagic;
  entry.dataset.preco = novoPreco;
  entry.dataset.peso = novoPeso;
  entry.dataset.prop = novaProp;
  entry.dataset.desc = novaDesc;

  entry.innerHTML = `
    <div style="font-weight: bold; font-size: 12px; text-transform:uppercase; margin-bottom: 4px;">${novoNome}:</div>
    <div style="display: grid; grid-template-columns: 70px 100px 70px 1fr; font-size: 10px; gap: 5px;">
      <div style="color: #666; font-weight: bold;">ATAQUE</div>
      <div style="color: #666; font-weight: bold;">DANO</div>
      <div style="color: #666; font-weight: bold;">PREÇO</div>
      <div style="color: #666; font-weight: bold;">PESO</div>
      <div class="atk-val" style="font-size: 12px; font-weight: bold;">--</div>
      <div class="dmg-val" style="font-size: 12px; font-weight: bold;">--</div>
      <div style="font-size: 12px; font-weight: bold;">${novoPreco}</div>
      <div style="font-size: 12px; font-weight: bold;">${novoPeso}</div>
      <div style="font-size: 12px; grid-column: span 4; margin-top: 4px; padding-top: 4px; border-top: 1px dashed #eee;">
        <small style="padding-bottom:25px;"><b style="font-size: 10px; color:#666;">Propriedades:</b> ${novaProp} (Atributo: ${novoAttr})</small>
        ${novaDesc ? `<br><small><b style="font-size: 10px; color:#666; margin-top:20px;">Descrição:</b> ${novaDesc}</small>` : ''}
      </div>
    </div>
  `;
  calcular();
  if (typeof agendarAutoSave === "function") agendarAutoSave();
}

function removerArma(btn) {
  const card = btn.closest('.weapon-card');
  const uid = card.dataset.uid;
  card.remove();
  const entry = document.querySelector(`.weapon-entry-guia[data-uid="${uid}"]`);
  if (entry) entry.remove();
  if (document.querySelectorAll("#desc-weapons-guia .weapon-entry-guia").length === 0) {
    document.getElementById("desc-weapons-guia").innerText = "---";
  }
  calcular();
}

function carregarSeletorItens() {
  const select = document.getElementById("select_item_phb");
  if (!select) return;
  select.innerHTML = '<option value="">Selecione um item</option>';
  for (const categoria in equipamentosDB) {
    let group = document.createElement("optgroup");
    group.label = categoria;
    for (const item in equipamentosDB[categoria]) {
      let opt = document.createElement("option");
      opt.value = item;
      opt.innerText = item;
      group.appendChild(opt);
    }
    select.appendChild(group);
  }
}

function adicionarItemCard(valorPredefinido = "") {
  const itemName = valorPredefinido || document.getElementById("select_item_phb").value;
  if (!itemName) return;
  let iData = null;
  for (const cat in equipamentosDB) { if (equipamentosDB[cat][itemName]) iData = equipamentosDB[cat][itemName]; }
  if (!iData) return;

  const cardsContainer = document.getElementById("item-cards-container");
  const card = document.createElement("div");
  card.className = "weapon-card";
  card.dataset.name = itemName;
  card.innerHTML = `
    <div class="weapon-card-header">
      <span class="weapon-card-title">${itemName}</span>
      <button type="button" class="insp-btn" onclick="removerItem(this)" style="background:#666; width:16px; height:16px;">-</button>
    </div>
  `;
  cardsContainer.appendChild(card);

  const containerGuia = document.getElementById("desc-items-guia");
  if (containerGuia.innerText === "---") containerGuia.innerHTML = "";
  const infoItem = document.createElement("div");
  infoItem.className = "item-entry-guia";
  infoItem.dataset.name = itemName;
  infoItem.style.cssText = "border-bottom: 1px solid #ccc; padding: 6px 0; margin-bottom: 8px; color: #000;";
  infoItem.innerHTML = `
    <div style="font-size: 12px; text-transform:uppercase; margin-bottom: 2px; font-weight: bold;">${itemName}:</div>
    <div style="display: flex; font-size: 12px; color: #333; white-space: nowrap;">
      <div style="width: 70px; font-weight: bold;">Custo:</div>
      <div style="width: 70px; font-weight: bold; text-align: center;">Peso:</div> 
      <div style="flex: 1; font-weight: bold; padding-left: 5px;">Descrição:</div>
    </div>
    <div style="display: flex; font-size: 12px; align-items: flex-start; line-height: 1.3;">
      <div style="width: 70px;">${iData.custo}</div> 
      <div style="width: 70px; text-align: center;">${iData.peso}</div> 
      <div style="flex: 1; padding-left: 5px; font-size: 12px; white-space: normal; text-align: justify; word-break: break-word;">
        ${iData.desc}
      </div>
    </div>
  `;
  containerGuia.appendChild(infoItem);
  atualizarGuia();
}

function removerItem(btn) {
  const card = btn.closest('.weapon-card');
  const name = card.dataset.name;
  card.remove();
  const guideEntries = document.querySelectorAll(`#desc-items-guia .item-entry-guia`);
  guideEntries.forEach(e => { if (e.dataset.name === name) e.remove(); });
  if (document.querySelectorAll("#desc-items-guia .item-entry-guia").length === 0) {
    document.getElementById("desc-items-guia").innerText = "---";
  }
  if (typeof agendarAutoSave === "function") agendarAutoSave();
}

function adicionarItemAutomatico(nome, tipo) {
  let idSeletor = "";
  let funcaoAdd = null;
  if (tipo === 'arma') {
    idSeletor = "select_arma_phb";
    funcaoAdd = adicionarArmaCard;
  } else if (tipo === 'armadura') {
    idSeletor = "select_armadura_phb";
    funcaoAdd = adicionarArmaduraCard;
  } else if (tipo === 'item') {
    idSeletor = "select_item_phb";
    funcaoAdd = adicionarItemCard;
  }
  const seletor = document.getElementById(idSeletor);
  if (seletor && typeof funcaoAdd === "function") {
    seletor.value = nome;
    funcaoAdd();
    marcarUltimoComoAutomatico(tipo);
  }
}

function marcarUltimoComoAutomatico(tipo) {
  let containers = [];
  if (tipo === 'arma') containers = ["weapon-cards-container", "desc-weapons-guia"];
  else if (tipo === 'armadura') containers = ["armor-cards-container", "desc-armors-guia"];
  else containers = ["item-cards-container", "desc-items-guia"];
  containers.forEach(id => {
    const cont = document.getElementById(id);
    if (cont && cont.lastElementChild) {
      cont.lastElementChild.classList.add("auto-item");
    }
  });
}

function adicionarTalento() {
  const container = document.getElementById("talentos-container");
  if (!container) return;
  const newRow = document.createElement("div");
  newRow.className = "talento-row";
  newRow.style.cssText = "display: flex; gap: 5px; align-items: center; margin-bottom: 5px;";
  let options = Object.keys(talentosPHB).sort().map((t) => `<option value="${t}">${t}</option>`).join("");
  newRow.innerHTML = `
    <select class="talento-select" style="flex: 1; background: #fafafa; font-size: 12px; border-bottom: 1px solid #ccc;" 
            onchange="atualizarGuia(); atualizarResumoPericias(); calcular();">
      <option value="">Selecione um Talento</option>
      ${options}
    </select>
    <button type="button" class="insp-btn" 
            onclick="this.parentElement.remove(); atualizarGuia(); atualizarResumoPericias(); calcular();" 
            style="width: 20px; height: 20px; background: #666; font-size: 14px; line-height: 1;">-</button>
  `;
  container.appendChild(newRow);
}

function adicionarIdioma(valorPredefinido = "") {
  const container = document.getElementById("idiomas-container");
  if (!container) return;
  const newRow = document.createElement("div");
  newRow.className = "idioma-row";
  newRow.style.cssText = "display: flex; gap: 5px; align-items: center; margin-bottom: 5px;";
  let options = [...idiomasDB].sort().map((i) => {
    let selected = (i === valorPredefinido) ? "selected" : "";
    return `<option value="${i}" ${selected}>${i}</option>`;
  }).join("");
  newRow.innerHTML = `
    <select class="idioma-select" style="flex: 1; background: #fafafa; font-size: 12px; border-bottom: 1px solid #ccc;" onchange="atualizarGuia()">
      <option value="">Selecione um idioma</option>
      ${options}
    </select>
    <button type="button" class="insp-btn" onclick="this.parentElement.remove(); atualizarGuia();" style="width: 20px; height: 20px; background: #666; font-size: 14px; line-height: 1;">-</button>
  `;
  container.appendChild(newRow);
}

function atualizarIdiomasAutomaticos() {
  const raca = document.getElementById("race_name").value;
  const subraca = document.getElementById("subrace_name").value;
  const classe = document.getElementById("class_name").value;
  const antec = document.getElementById("bg_name").value;
  const container = document.getElementById("idiomas-container");
  if (!container) return;
  container.innerHTML = "";
  let listaIdiomas = [];

  if (raca && regrasIdiomas.races[raca]) listaIdiomas = listaIdiomas.concat(regrasIdiomas.races[raca]);
  if (subraca && regrasIdiomas.subraces[subraca]) listaIdiomas = listaIdiomas.concat(regrasIdiomas.subraces[subraca]);
  if (classe && regrasIdiomas.classes[classe]) listaIdiomas = listaIdiomas.concat(regrasIdiomas.classes[classe]);
  if (antec && regrasIdiomas.backgrounds[antec]) listaIdiomas = listaIdiomas.concat(regrasIdiomas.backgrounds[antec]);

  if (listaIdiomas.length === 0) {
    adicionarIdioma("");
  } else {
    listaIdiomas.forEach(lang => adicionarIdioma(lang));
  }
}

function atualizarSlotsMagia() {
  const c = document.getElementById("class_name").value;
  const sc = document.getElementById("subclass_name").value;
  const lvl = parseInt(document.getElementById("level_val").value) || 1;
  const container = document.getElementById("spell-slots-tracker");
  if (!container) return;

  const checkboxesAntigos = container.querySelectorAll('input[type="checkbox"]');
  const estadosAntigos = Array.from(checkboxesAntigos).map(cb => cb.checked);
  container.innerHTML = "";

  const isWarlock = c === "Bruxo (Warlock)";
  let slotsDisponiveis = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const fullCasters = ["Mago (Wizard)", "Clérigo (Cleric)", "Bardo (Bard)", "Druida (Druid)", "Feiticeiro (Sorcerer)"];
  const halfCasters = ["Paladino (Paladin)", "Patrulheiro (Ranger)"];
  const thirdCasters = ["Trapaceiro Arcano (Arcane Trickster)", "Cavaleiro Arcano (Eldritch Knight)"];

  if (fullCasters.includes(c)) slotsDisponiveis = slotsDB.full[lvl - 1] || [0, 0, 0, 0, 0, 0, 0, 0, 0];
  else if (c === "Artífice (Artificer)") slotsDisponiveis = slotsDB.artificer[lvl - 1] || [0, 0, 0, 0, 0, 0, 0, 0, 0];
  else if (halfCasters.includes(c)) slotsDisponiveis = slotsDB.half[lvl - 1] || [0, 0, 0, 0, 0, 0, 0, 0, 0];
  else if (thirdCasters.includes(sc)) slotsDisponiveis = slotsDB.third[lvl - 1] || [0, 0, 0, 0, 0, 0, 0, 0, 0];
  else if (isWarlock) slotsDisponiveis = slotsDB.warlock[lvl - 1] || [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const temSlots = slotsDisponiveis.some(qtd => qtd > 0);
  const titleEl = document.getElementById("spell-slots-title");
  if (titleEl) titleEl.style.display = temSlots ? "block" : "none";

  slotsDisponiveis.forEach((qtd, index) => {
    if (qtd > 0) {
      let slotBox = document.createElement("div");
      slotBox.className = "box-list";
      slotBox.style.cssText = "padding: 5px; text-align: center; margin-bottom: 5px; background: #fff; border: 1px solid #ddd; min-width: 70px; flex: 1;";
      let label = isWarlock
        ? (index < 5 ? `Pacto (${index + 1}º)` : `Arcanum (${index + 1}º)`)
        : `${index + 1}º Nível`;
      slotBox.innerHTML = `<label style="font-size: 8px; margin-bottom: 3px;">${label}</label>`;

      let circlesWrap = document.createElement("div");
      circlesWrap.className = "circles";
      circlesWrap.style.cssText = "display: flex; gap: 4px; justify-content: center; flex-wrap: wrap;";
      for (let j = 0; j < qtd; j++) {
        circlesWrap.innerHTML += `<input type="checkbox" style="width:14px; height:14px; margin:0;">`;
      }
      slotBox.appendChild(circlesWrap);
      container.appendChild(slotBox);
    }
  });

  const novosCheckboxes = container.querySelectorAll('input[type="checkbox"]');
  novosCheckboxes.forEach((cb, index) => {
    if (estadosAntigos[index] !== undefined) cb.checked = estadosAntigos[index];
  });
}

function adicionarMagia() {
  const container = document.getElementById("magias-container");
  const newRow = document.createElement("div");
  newRow.className = "magia-row";
  newRow.style.cssText = "display: flex; flex-direction: column; margin-bottom: 5px;";

  const schoolAbbr = {
    Abjuração: "ABJ", Adivinhação: "ADIV", Conjuração: "CONJ", Encantamento: "ENC",
    Evocação: "EVO", Ilusão: "ILU", Necromancia: "NEC", Transmutação: "TRANS"
  };

  let selectHTML = `<div style="display: flex; gap: 4px; align-items: center; width: 100%;">
    <select class="magia-select" style="flex: 1; background: #fafafa; font-size: 12px;" onchange="atualizarMagia(this)">
      <option value="">Selecione o Truque ou Magia</option>`;

  for (const [nivel, lista] of Object.entries(magiasDB)) {
    if (Object.keys(lista).length === 0) continue;
    selectHTML += `<optgroup label="${nivel}">`;
    Object.keys(lista).sort().forEach((m) => {
      const fullLevelSchool = lista[m].level_school;
      const schoolName = fullLevelSchool.includes(" de ")
        ? fullLevelSchool.split(" de ")[1].split(" ")[0]
        : "";
      const abbr = schoolAbbr[schoolName] || "";
      const nomeAjustado = m.split(" ").map((palavra, index) => {
        if (index === 0 || palavra.length > 3) {
          return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
        }
        return palavra.toLowerCase();
      }).join(" ");
      const prefixo = nivel.includes("Truques")
        ? "Truque"
        : nivel.split(" ")[0] + " " + nivel.split(" ")[1];
      selectHTML += `<option value="${m}">${prefixo}: ${nomeAjustado} (${abbr})</option>`;
    });
    selectHTML += `</optgroup>`;
  }

  selectHTML += `</select>
    <button type="button" class="btn-spell-info" onclick="abrirDetalhesMagiaRapido(this)" title="Ver descrição rápida da magia">👁️</button>
    <button type="button" class="insp-btn" onclick="this.closest('.magia-row').remove(); atualizarGuia();" style="width: 20px; height: 20px; background: #666;">-</button>
  </div>`;
  newRow.innerHTML = selectHTML;
  container.appendChild(newRow);
}

function abrirDetalhesMagiaRapido(btn) {
  const row = btn.closest(".magia-row");
  const mNome = row?.querySelector(".magia-select")?.value;
  if (!mNome) {
    alert("Selecione uma magia na lista primeiro para visualizar os detalhes.");
    return;
  }

  let mData = null;
  for (const nKey in magiasDB) {
    if (magiasDB[nKey][mNome]) {
      mData = magiasDB[nKey][mNome];
      break;
    }
  }
  if (!mData) return;

  document.getElementById("sqm-title").innerText = `${mNome} (${mData.en})`;
  document.getElementById("sqm-meta").innerHTML = `
    <strong>Escola:</strong> ${mData.level_school} | <strong>Tempo:</strong> ${mData.time}<br>
    <strong>Alcance:</strong> ${mData.range} | <strong>Duração:</strong> ${mData.dur}<br>
    <strong>Componentes:</strong> ${mData.comp}
  `;
  document.getElementById("sqm-desc").innerHTML = limparTexto(mData.desc);
  document.getElementById("spell-quick-modal").style.display = "block";
}

function ordenarMagias() {
  const container = document.getElementById("magias-container");
  const rows = Array.from(container.querySelectorAll(".magia-row"));
  rows.sort((a, b) => {
    const valA = a.querySelector(".magia-select").value;
    const valB = b.querySelector(".magia-select").value;
    const lvlA = getSpellLevel(valA);
    const lvlB = getSpellLevel(valB);
    if (lvlA !== lvlB) return lvlA - lvlB;
    return valA.localeCompare(valB);
  });
  rows.forEach((row) => container.appendChild(row));
}

function atualizarMagia() {
  ordenarMagias();
  atualizarGuia();
}

function adicionarInfusao() {
  const container = document.getElementById("infusoes-container");
  const newRow = document.createElement("div");
  newRow.className = "infusao-row";
  newRow.style.cssText = "display: flex; gap: 5px; align-items: center; margin-bottom: 5px;";

  let optionsHTML = `<input type="checkbox" class="infusao-ativo-check" onchange="calcular();" title="Ativar esta infusão em um item mundano" style="width:14px; height:14px; margin:0 2px 0 0; cursor:pointer;">
    <select class="infusao-select" style="flex: 1; background: #fafafa; font-size: 12px;" onchange="calcular();">
      <option value="">Selecione a Infusão</option>`;
  infusoesLista.forEach(inf => { optionsHTML += `<option value="${inf}">${inf}</option>`; });
  optionsHTML += `</select>
    <button type="button" class="insp-btn" onclick="this.parentElement.remove(); calcular();" style="width: 20px; height: 20px; background: #666;">-</button>`;
  newRow.innerHTML = optionsHTML;
  container.appendChild(newRow);
  calcular();
}

function renderizarDescricoesInfusoes() {
  let html = "";
  document.querySelectorAll(".infusao-select").forEach(sel => {
    const nome = sel.value;
    if (nome) {
      let dados = infusoesDB_Desc[nome];
      if (!dados) {
        dados = {
          item: "Varia conforme o item",
          req: nome.includes("14º") ? "14º nível" : (nome.includes("10º") ? "10º nível" : (nome.includes("6º") ? "6º nível" : "2º nível")),
          sint: "Consulte o manual da réplica",
          desc: "Você replica os efeitos e propriedades mágicas literais deste item conforme descrito no guia de tesouros do livro mestre."
        };
      }
      html += `
        <div class="spell-detail-box" style="margin-bottom: 25px; padding: 12px; border-left: 4px solid #7cb342; background: #f1f8e9; box-shadow: 1px 1px 3px rgba(0,0,0,0.1); text-align: left;">
          <b style="color: #558b2f; font-size: 15px; display: block; border-bottom: 1px solid #c5e1a5; padding-bottom: 4px;">🛠️ ${nome}</b>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px; font-size: 12px; padding-top: 8px; color: #444;">
            <div><b>Item Necessário:</b> ${dados.item || "Varia"}</div>
            <div><b>Pré-requisito:</b> ${dados.req || "Nível 2"}</div>
            <div><b>Requer Sintonização:</b> ${dados.sint || "Não"}</div>
          </div>
          <br>
          <p style="font-size: 12.5px; line-height: 1.4; text-align: justify; color: #222; margin: 5px 0;">
            ${dados.desc}
          </p>
        </div>`;
    }
  });
  document.getElementById("infusions_content").innerHTML = html || "<small style='color:gray; font-style:italic;'>Nenhuma infusão selecionada no painel principal da ficha.</small>";
}

function atualizarAlertaCondicoes() {
  const alertaBox = document.getElementById("condicoes-alerta-box");
  if (!alertaBox) return;

  const regrasCondicoes = {
    "Amedrontado": "Desvantagem em testes e ataques enquanto vê a fonte do medo; não pode se aproximar dela.",
    "Caído": "Só pode rastejar; desvantagem em ataques. Ataques a 1,5m contra você têm vantagem.",
    "Cego": "Falha auto em testes de visão; ataques contra você têm vantagem, seus ataques têm desvantagem.",
    "Enfeitiçado": "Não pode atacar quem o enfeitiçou; ele tem vantagem social contra você.",
    "Envenenado": "Desvantagem em jogadas de ataque e testes de habilidade.",
    "Agarrado": "Deslocamento torna-se 0 e não recebe bônus de deslocamento.",
    "Incapacitado": "Não pode realizar ações nem reações.",
    "Invisível": "Impossível de ver sem magia; seus ataques têm vantagem, ataques contra você têm desvantagem.",
    "Paralisado": "Incapacitado, falha auto em TR de FOR/DES, ataques a 1,5m são críticos.",
    "Petrificado": "Transformado em pedra, incapacitado, resistência a todos os danos, imune a veneno/doença.",
    "Impedido": "Deslocamento 0, ataques contra você têm vantagem, seus ataques e TR de DES têm desvantagem.",
    "Atordoado": "Incapacitado, não pode se mover, falha auto em TR de FOR/DES, ataques contra você têm vantagem.",
    "Inconsciente": "Incapacitado, caído, larga tudo, falha auto em TR de FOR/DES, ataques a 1,5m são críticos."
  };

  const ativas = Array.from(document.querySelectorAll(".condicao-check:checked")).map(cb => cb.dataset.name);
  const exaustao = parseInt(document.getElementById("exaustao_val")?.value) || 0;

  if (ativas.length === 0 && exaustao === 0) {
    alertaBox.style.display = "none";
    alertaBox.innerHTML = "";
    return;
  }

  let html = "";
  ativas.forEach(nome => {
    html += `<div><strong>⚠️ ${nome}:</strong> ${regrasCondicoes[nome] || ""}</div>`;
  });
  if (exaustao > 0) {
    const niveisExaustao = [
      "",
      "Nível 1: Desvantagem em testes de habilidade.",
      "Nível 2: Deslocamento reduzido à metade.",
      "Nível 3: Desvantagem em ataques e salvaguardas.",
      "Nível 4: Pontos de vida máximos reduzidos à metade.",
      "Nível 5: Deslocamento reduzido a 0.",
      "Nível 6: Morte."
    ];
    html += `<div><strong>⚠️ Exaustão (${exaustao}):</strong> ${niveisExaustao[Math.min(exaustao, 6)]}</div>`;
  }

  alertaBox.innerHTML = html;
  alertaBox.style.display = "block";
}

function atualizarGuia() {
  const c = document.getElementById("class_name").value;
  const sc = document.getElementById("subclass_name").value;
  const lvl = parseInt(document.getElementById("level_val").value) || 1;
  const fields = {
    race: "race_name",
    subrace: "subrace_name",
    class: "class_name",
    subclass: "subclass_name",
    bg: "bg_name",
    align: "align"
  };

  for (const [id, inputId] of Object.entries(fields)) {
    const val = document.getElementById(inputId).value;
    const titleEl = document.getElementById(`title-${id}`);
    const descEl = document.getElementById(`desc-${id}`);
    if (titleEl) {
      let label = titleEl.innerText.split(":")[0];
      if (id === "subclass") label = labelsSubclasses[c] || "Subclasse";
      titleEl.innerText = label + ": " + (val || "---");
    }
    if (descEl) {
      let text = "---";
      if (id === "subclass") text = (c && dataPHB.subclasses[c]) ? dataPHB.subclasses[c][val] : "---";
      else if (id === "race") text = dataPHB.races[val];
      else if (id === "subrace") text = dataPHB.subraces[val];
      else if (id === "class") text = dataPHB.classes[val];
      else if (id === "bg") text = dataPHB.backgrounds[val];
      else if (id === "align") text = dataPHB.alignments[val];
      descEl.innerHTML = limparTexto(text || "---");
    }
  }

  let progressoHTML = "";
  if (c && progressoClasses[c]) {
    let labelBase = labelsSubclasses[c] || "Subclasse";
    let labelCompleta = sc ? `${labelBase}: ${sc}` : labelBase;
    for (let i = 1; i <= lvl; i++) {
      let hBase = progressoClasses[c][i];
      let subKey = c + "_" + sc;
      let hSub = (sc && progressoClasses[subKey]) ? progressoClasses[subKey][i] : null;
      if (hBase || hSub) {
        progressoHTML += `<div style="margin-bottom: 20px;">`;
        progressoHTML += `<span class="lvl-tag">Nível ${i}</span>`;
        progressoHTML += `<div style="background: #f4f4f4; padding: 12px; border-radius: 4px; border: 1px solid #e0e0e0; font-size: 13px; line-height: 1.5; color: #333;">`;
        if (hBase) progressoHTML += `<div>${limparTexto(hBase)}</div>`;
        if (hSub) {
          if (hBase) progressoHTML += `<hr style="border: 0; border-top: 1px solid #ccc; margin: 10px 0;">`;
          progressoHTML += `<div>
            <span class="lvl-tag" style="background: #333; font-size: 10px; padding: 3px 5px; margin-bottom: 5px; box-shadow: none;">${labelCompleta}</span> 
            <div style="margin-top: 3px;">${limparTexto(hSub)}</div>
          </div>`;
        }
        progressoHTML += `</div></div>`;
      }
    }
  }

  const progressionContainer = document.getElementById("desc-progression");
  if (progressionContainer) {
    progressionContainer.innerHTML = progressoHTML || "Selecione uma classe e nível.";
    let magiasTextoHTML = "";

    let dSub = null;
    if (sc) {
      for (const palavraChave in magiasSubclasseDB) {
        if (sc.toLowerCase().includes(palavraChave.toLowerCase())) {
          dSub = magiasSubclasseDB[palavraChave];
          break;
        }
      }
    }

    if (dSub) {
      let automaticas = [];
      Object.keys(dSub).forEach(lReq => {
        if (lReq !== "tipo" && lvl >= parseInt(lReq)) {
          automaticas = automaticas.concat(dSub[lReq]);
        }
      });
      automaticas.forEach(mNome => {
        let mData = null;
        for (const nKey in magiasDB) {
          if (magiasDB[nKey][mNome]) { mData = magiasDB[nKey][mNome]; break; }
          const matchAprox = Object.keys(magiasDB[nKey]).find(k => k.startsWith(mNome) || mNome.startsWith(k));
          if (matchAprox) { mData = magiasDB[nKey][matchAprox]; mNome = matchAprox; break; }
        }
        if (mData) {
          magiasTextoHTML += `
            <div class="spell-detail-box" style="margin-bottom: 25px; padding: 12px; border-left: 4px solid #1e88e5; background: #e3f2fd; box-shadow: 1px 1px 3px rgba(0,0,0,0.1); text-align: left;">
              <b style="color: #1e88e5; font-size: 15px; display: block; border-bottom: 1px solid #bbdefb; padding-bottom: 4px;">🌟 ${mNome} (${mData.en}) [${dSub.tipo}]</b>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(185px, 185px)); gap: 8px; font-size: 12px; padding-top: 8px; color: #444;">
                <div><b>Tipo de magia:</b> ${mData.level_school}</div>
                <div><b>Fonte:</b> ${mData.source}</div>
                <div><b>Classes:</b> ${mData.casters}</div>
                <div><b>Tempo de Conjuração:</b> ${mData.time}</div>
              </div>
              <br>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(185px, 185px)); gap: 8px; font-size: 12px; color: #444;">
                <div><b>Alcance/Área:</b> ${mData.range}</div>
                <div><b>Duração:</b> ${mData.dur}</div>
                <div><b>Componentes:</b> ${mData.comp}</div>
              </div>
              <br>
              <p style="font-size: 12.5px; line-height: 1.4; text-align: justify; color: #222; margin: 10px 0;">
                ${limparTexto(mData.desc)}
              </p>
            </div>`;
        }
      });
    }

    document.querySelectorAll(".magia-select").forEach((sel) => {
      const mNome = sel.value;
      if (mNome) {
        let mData = null;
        for (const nKey in magiasDB) {
          if (magiasDB[nKey][mNome]) { mData = magiasDB[nKey][mNome]; break; }
        }
        if (mData) {
          magiasTextoHTML += `
            <div class="spell-detail-box" style="margin-bottom: 25px; padding: 12px; border-left: 4px solid var(--dnd-red); background: #fdfaf3; box-shadow: 1px 1px 3px rgba(0,0,0,0.1); text-align: left;">
              <b style="color: var(--dnd-red); font-size: 15px; display: block; border-bottom: 1px solid #ddd; padding-bottom: 4px;">${mNome} (${mData.en})</b>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(185px, 185px)); gap: 8px; font-size: 12px; padding-top: 8px; color: #444;">
                <div><b>Tipo de magia:</b> ${mData.level_school}</div>
                <div><b>Fonte:</b> ${mData.source}</div>
                <div><b>Classes:</b> ${mData.casters}</div>
                <div><b>Tempo de Conjuração: </b> ${mData.time}</div>
              </div>
              <br>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(185px, 185px)); gap: 8px; font-size: 12px; padding-top: 8px; color: #444;">
                <div><b>Alcance/Área:</b> ${mData.range}</div>
                <div><b>Duração:</b> ${mData.dur}</div>
                <div><b>Componentes:</b> ${mData.comp}</div>
              </div>
              <br>
              <p style="font-size: 12.5px; line-height: 1.4; text-align: justify; color: #222; margin: 10px 0;">
                ${limparTexto(mData.desc)}
              </p>
            </div>`;
        }
      }
    });

    const grimoireContent = document.getElementById("grimoire_content");
    if (grimoireContent) grimoireContent.innerHTML = magiasTextoHTML;
  }

  atualizarTalentosEIdiomasNoGuia();
  atualizarResumoPericias();
  atualizarAlertaCondicoes();
  if (typeof agendarAutoSave === "function") agendarAutoSave();
}

function atualizarTalentosEIdiomasNoGuia() {
  let talentosHTML = "";
  document.querySelectorAll(".talento-select").forEach((sel) => {
    const tNome = sel.value;
    if (tNome && talentosPHB[tNome]) {
      talentosHTML += `<div style="border-bottom: 1px solid #ddd; padding: 4px 0; margin-bottom: 4px; text-align: justify; line-height: 1.4;">
        <strong style="color: #333;">${tNome}</strong>: ${limparTexto(talentosPHB[tNome])}
      </div>`;
    }
  });
  if (document.getElementById("desc-talentos-guia")) {
    document.getElementById("desc-talentos-guia").innerHTML = talentosHTML || "---";
  }

  let idiomasHTML = "";
  document.querySelectorAll(".idioma-select").forEach((sel) => {
    const idm = sel.value;
    if (idm && dataPHB.languages[idm]) {
      idiomasHTML += `<div style="border-bottom: 1px solid #ddd; padding: 4px 0; margin-bottom: 4px; text-align: justify; line-height: 1.4;">
        <strong style="color: #333;">${idm}</strong>: ${dataPHB.languages[idm]}
      </div>`;
    }
  });
  if (document.getElementById("desc-languages")) {
    document.getElementById("desc-languages").innerHTML = idiomasHTML || "---";
  }
}

function atualizarResumoPericias() {
  const getCor = (atual, limite) => atual > limite ? "red" : (atual === limite ? "green" : "#b8860b");
  const classe = document.getElementById("class_name").value;
  const raca = document.getElementById("race_name").value;
  const subraca = document.getElementById("subrace_name").value;
  const subclasse = document.getElementById("subclass_name").value;
  const antec = document.getElementById("bg_name").value;
  const nivel = parseInt(document.getElementById("level_val").value) || 1;

  let totalASIPermitida = 0;
  const niveisASI = [4, 8, 12, 16, 19];
  niveisASI.forEach(n => { if (nivel >= n) totalASIPermitida++; });
  if (classe === "Guerreiro (Fighter)") {
    if (nivel >= 6) totalASIPermitida++;
    if (nivel >= 14) totalASIPermitida++;
  } else if (classe === "Ladino (Rogue)") {
    if (nivel >= 10) totalASIPermitida++;
  }

  let totalProfPermitida = (regrasPericiasDND.classes[classe] || 0) + (regrasPericiasDND.racas[raca] || 0) + (antec ? 2 : 0);
  let totalExpPermitida = (classe && regrasPericiasDND.expertise[classe]) ? regrasPericiasDND.expertise[classe](nivel) : 0;
  const totalProfMarcada = document.querySelectorAll('.skill-prof[data-prof-level="1"], .skill-prof[data-prof-level="2"]').length;
  const totalExpMarcada = document.querySelectorAll('.skill-prof[data-prof-level="2"]').length;
  const talentosGastos = Math.max(0, Array.from(document.querySelectorAll(".talento-select")).filter(sel => sel.value !== "").length - (raca.includes("Humano") ? 1 : 0));

  let somaHabilidadesBase = 0;
  attrs.forEach(at => {
    somaHabilidadesBase += parseInt(document.getElementById(`${at.id}_score`)?.value || 0);
  });
  let pontosExtras = Math.max(0, somaHabilidadesBase - 72);
  let totalGenasiUsado = 0;
  if (raca === "Genasi") {
    totalGenasiUsado = Math.min(3, pontosExtras);
    pontosExtras -= totalGenasiUsado;
  }
  const melhoriasViaPontos = pontosExtras / 2;
  const totalASIUsada = talentosGastos + melhoriasViaPontos;

  let detalhesHTML = `<ul style="padding-left:15px; margin:0; list-style:square;">`;
  if (raca === "Genasi") {
    detalhesHTML += `<li><b>Melhorias de Genasi:</b> +2pts em uma habilidade e +1pt em outra habilidade ou +1pt em três habilidades</li>`;
  }
  if (totalASIPermitida > 0) {
    detalhesHTML += `<li><b>Melhorias:</b> ${totalASIPermitida} (+2pts em uma habilidade ou +1pt em duas habilidades ou 1 talento, por melhoria)</li>`;
  }
  if (classe && regrasPericiasDND.classes[classe]) {
    detalhesHTML += `<li><b>Classe:</b> +${regrasPericiasDND.classes[classe]} Proficiências</li>`;
  }
  if (raca && regrasPericiasDND.racas[raca]) {
    detalhesHTML += `<li><b>Raça:</b> +${regrasPericiasDND.racas[raca]} Proficiências</li>`;
  }
  if (antec) {
    detalhesHTML += `<li><b>Antecedente:</b> +2 Proficiências</li>`;
  }

  let expExibir = totalExpPermitida;
  regrasPericiasDND.especiais.forEach(regra => {
    if (regra.check(classe, subclasse, nivel)) {
      if (regra.bonusPericia) totalProfPermitida += regra.bonusPericia;
      if (regra.bonusExpertise) {
        expExibir += regra.bonusExpertise;
        totalExpPermitida += regra.bonusExpertise;
      }
    }
  });
  if (expExibir > 0) {
    detalhesHTML += `<li><b>Classe:</b> ${expExibir} Especializações</li>`;
  }
  detalhesHTML += `</ul>`;

  let truquesMax = 0;
  let magiasMax = 0;
  let tipoMagiaLabel = "Magias Conhecidas";
  let notaClasseHTML = "";

  const intMod = Math.floor((parseInt(document.getElementById("INT_score")?.value || 10) - 10) / 2);
  const sabMod = Math.floor((parseInt(document.getElementById("SAB_score")?.value || 10) - 10) / 2);
  const carMod = Math.floor((parseInt(document.getElementById("CAR_score")?.value || 10) - 10) / 2);

  if (classe === "Mago (Wizard)") {
    tipoMagiaLabel = "Magias Preparadas";
    truquesMax = nivel >= 10 ? 5 : (nivel >= 4 ? 4 : 3);
    magiasMax = Math.max(1, nivel + intMod);
    notaClasseHTML = `Aprende 6 magias de 1º círculo no Nível 1. Ganha 2 novas magias por nível de Mago livremente para o Grimório. Pode copiar magias extras encontradas gastando tempo e ouro. Prepara um total de Inteligência + Nível diariamente.`;
  } else if (classe === "Clérigo (Cleric)") {
    tipoMagiaLabel = "Magias Preparadas";
    truquesMax = nivel >= 10 ? 5 : (nivel >= 4 ? 4 : 3);
    magiasMax = Math.max(1, nivel + sabMod);
    notaClasseHTML = `Conhece toda a lista de Clérigo automaticamente. Prepara diariamente um total de Sabedoria + Nível. Magias de Domínio são preparadas automaticamente e NÃO contam neste limite de ${magiasMax}.`;
  } else if (classe === "Druida (Druid)") {
    tipoMagiaLabel = "Magias Preparadas";
    truquesMax = nivel >= 10 ? 4 : (nivel >= 4 ? 3 : 2);
    magiasMax = Math.max(1, nivel + sabMod);
    notaClasseHTML = `Conhece toda a lista de Druida automaticamente. Prepara diariamente um total de Sabedoria + Nível. No 2º nível, o Druida escolhe seu Círculo; se o círculo escolhido conceder magias adicionais, elas estarão sempre preparadas e NÃO contam neste limite de ${magiasMax}.`;
  } else if (classe === "Paladino (Paladin)") {
    tipoMagiaLabel = "Magias Preparadas";
    truquesMax = 0;
    magiasMax = Math.max(1, Math.floor(nivel / 2) + carMod);
    notaClasseHTML = `Apenas a partir do Nível 2. Conhece toda a lista de Paladino. Prepara diariamente um total de Carisma + Metade do Nível (arredondado para baixo). Magias de Juramento são automáticas e NÃO contam neste limite de ${magiasMax}.`;
  } else if (classe === "Artífice (Artificer)") {
    tipoMagiaLabel = "Magias Preparadas";
    truquesMax = nivel >= 10 ? 4 : (nivel >= 5 ? 3 : 2);
    let intScoreRaw = parseInt(document.getElementById("INT_score")?.value || 10);
    let modIntDefinitivo = Math.floor((intScoreRaw - 10) / 2);
    if (intScoreRaw === 15 || intScoreRaw === 16 || intScoreRaw === 17) modIntDefinitivo = 3;
    let valorNivelAjustado = (nivel === 1) ? 1 : Math.floor(nivel / 2);
    magiasMax = valorNivelAjustado + modIntDefinitivo;
    notaClasseHTML = `Conhece toda a lista de Artífice. Prepara diariamente um total de Inteligência + Metade do Nível (mínimo de 1). Magias de Especialista são automáticas e NÃO contam neste limite de ${magiasMax}.`;
  } else if (classe === "Bardo (Bard)") {
    tipoMagiaLabel = "Magias Conhecidas";
    truquesMax = nivel >= 10 ? 4 : (nivel >= 4 ? 3 : 2);
    const bardoSpells = [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22];
    magiasMax = bardoSpells[nivel - 1] || 0;
    let segredosQtd = 0;
    if (subclasse.includes("Colégio do Conhecimento") && nivel >= 6) segredosQtd += 2;
    if (nivel >= 10) segredosQtd += 2;
    if (nivel >= 14) segredosQtd += 2;
    if (nivel >= 18) segredosQtd += 2;
    notaClasseHTML = `Magias fixas da lista de Bardo. Ao subir de nível, pode trocar uma magia antiga por outra. `;
    if (segredosQtd > 0) {
      notaClasseHTML += `Inclui <b>${segredosQtd} Segredos Mágicos</b> (magias de QUALQUER outra classe) que já contam dentro do total de ${magiasMax}.`;
    }
  } else if (classe === "Feiticeiro (Sorcerer)") {
    tipoMagiaLabel = "Magias Conhecidas";
    truquesMax = nivel >= 10 ? 6 : (nivel >= 4 ? 5 : 4);
    const sorcSpells = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15];
    magiasMax = sorcSpells[nivel - 1] || 0;
    notaClasseHTML = `Magias fixas da lista de Feiticeiro. Distribuição livre por círculos disponíveis. Ao subir de nível, pode substituir uma magia conhecida por outra de 1º círculo ou superior da lista da classe.`;
  } else if (classe === "Bruxo (Warlock)") {
    tipoMagiaLabel = "Magias Conhecidas";
    truquesMax = nivel >= 10 ? 4 : (nivel >= 4 ? 3 : 2);
    const warSpells = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 12, 12, 14, 14, 16, 16, 18, 18, 18, 18];
    magiasMax = warSpells[nivel - 1] || 0;
    let arcanumHTML = "";
    if (nivel >= 11) arcanumHTML += " 6º círculo (Nível 11)";
    if (nivel >= 13) arcanumHTML += ", 7º círculo (Nível 13)";
    if (nivel >= 15) arcanumHTML += ", 8º círculo (Nível 15)";
    if (nivel >= 17) arcanumHTML += ", 9º círculo (Nível 17)";
    notaClasseHTML = `Magias conhecidas limitadas do 1º ao 5º círculo (lançadas sempre no nível máximo dos seus slots de Pacto). Recarrega em Descanso Curto.`;
    if (arcanumHTML) {
      notaClasseHTML += `<br><b>Arcanum Místico (Mystic Arcanum):</b> Você aprende 1 magia fixa de círculo superior para cada um destes marcos:${arcanumHTML}. Elas são conjuradas uma vez por descanso longo cada, sem gastar seus slots de Pacto.`;
    }
  } else if (classe === "Patrulheiro (Ranger)") {
    tipoMagiaLabel = "Magias Conhecidas";
    truquesMax = 0;
    const rangerSpells = [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11];
    magiasMax = rangerSpells[nivel - 1] || 0;
    notaClasseHTML = `Apenas a partir do Nível 2. Magias fixas da lista de Patrulheiro. Distribuição livre entre os círculos liberados pelo nível do personagem (com opções adicionais de Guardião/Prontidão Primal no Tasha).`;
  } else if (subclasse === "Trapaceiro Arcano (Arcane Trickster)") {
    tipoMagiaLabel = "Magias Conhecidas";
    if (nivel >= 3) {
      truquesMax = nivel >= 10 ? 3 : 2;
      const thirdSpells = [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 10, 11, 11, 12, 13];
      magiasMax = thirdSpells[nivel - 1] || 0;
      let livres = nivel >= 20 ? 4 : (nivel >= 14 ? 3 : (nivel >= 8 ? 2 : 1));
      let restritas = magiasMax - livres;
      notaClasseHTML = `As magias devem ser da lista de Mago. Obrigatoriamente <b>${restritas} magias</b> devem ser das escolas de <b>Encantamento</b> ou <b>Ilusão</b>. As outras <b>${livres} magias</b> podem ser de qualquer escola de magia.`;
    }
  } else if (subclasse === "Cavaleiro Arcano (Eldritch Knight)") {
    tipoMagiaLabel = "Magias Conhecidas";
    if (nivel >= 3) {
      truquesMax = nivel >= 10 ? 3 : 2;
      const thirdSpells = [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 10, 11, 11, 12, 13];
      magiasMax = thirdSpells[nivel - 1] || 0;
      let livres = nivel >= 20 ? 4 : (nivel >= 14 ? 3 : (nivel >= 8 ? 2 : 1));
      let restritas = magiasMax - livres;
      notaClasseHTML = `As magias devem ser da lista de Mago. Obrigatoriamente <b>${restritas} magias</b> devem ser das escolas de <b>Abjuração</b> ou <b>Evocação</b>. As outras <b>${livres} magias</b> podem ser de qualquer escola de magia.`;
    }
  }

  let truquesAtuais = 0;
  let magiasPorNivel = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  let totalMagiasAtuais = 0;

  document.querySelectorAll(".magia-select").forEach(sel => {
    let val = sel.value;
    if (val) {
      let lvlSpell = getSpellLevel(val);
      if (lvlSpell === 0) truquesAtuais++;
      else if (lvlSpell >= 1 && lvlSpell <= 9) {
        magiasPorNivel[lvlSpell]++;
        totalMagiasAtuais++;
      }
    }
  });

  const conjuradoresCompletos = ["Mago (Wizard)", "Clérigo (Cleric)", "Bardo (Bard)", "Druida (Druid)", "Feiticeiro (Sorcerer)", "Bruxo (Warlock)"];
  const conjuradoresMeios = ["Paladino (Paladin)", "Patrulheiro (Ranger)"];
  const conjuradoresTerco = ["Trapaceiro Arcano (Arcane Trickster)", "Cavaleiro Arcano (Eldritch Knight)"];

  let slotsDisponiveis = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  if (conjuradoresCompletos.includes(classe)) slotsDisponiveis = slotsDB.full[nivel - 1] || [0, 0, 0, 0, 0, 0, 0, 0, 0];
  else if (classe === "Artífice (Artificer)") slotsDisponiveis = slotsDB.artificer[nivel - 1] || [0, 0, 0, 0, 0, 0, 0, 0, 0];
  else if (conjuradoresMeios.includes(classe)) slotsDisponiveis = slotsDB.half[nivel - 1] || [0, 0, 0, 0, 0, 0, 0, 0, 0];
  else if (conjuradoresTerco.includes(subclasse)) slotsDisponiveis = slotsDB.third[nivel - 1] || [0, 0, 0, 0, 0, 0, 0, 0, 0];

  let magiasHTML = "";
  if (truquesMax > 0) {
    magiasHTML += `<div style="margin-bottom:4px;"><b>Truques Escolhidos:</b> <span style="color:${getCor(truquesAtuais, truquesMax)}">${truquesAtuais} / ${truquesMax}</span></div>`;
  }
  if (magiasMax > 0) {
    magiasHTML += `<div style="margin-bottom:2px; margin-top:4px;"><b>Magias escolhidas:</b></div>`;
  }

  slotsDisponiveis.forEach((slots, idx) => {
    let spellLvl = idx + 1;
    if (slots > 0) {
      let sufixoLimite = "";
      if (tipoMagiaLabel === "Magias Preparadas" && classe === "Mago (Wizard)") {
        let limNatural = 0;
        if (spellLvl === 1) limNatural = nivel >= 2 ? 8 : 6;
        else if (spellLvl >= 2 && spellLvl <= 8) limNatural = nivel >= (spellLvl * 2) ? 4 : 2;
        else if (spellLvl === 9) limNatural = nivel >= 20 ? 8 : (nivel === 19 ? 6 : (nivel === 18 ? 4 : 2));
        sufixoLimite = ` / ${limNatural}`;
      }
      magiasHTML += `<div style="margin-bottom:4px; padding-left: 12px; font-size: 10.5px; color: #666;">- ${spellLvl}º Nível: <span style="font-weight:bold; color:#333;">${magiasPorNivel[spellLvl]} escolhida(s)${sufixoLimite}</span></div>`;
    }
  });

  if (magiasMax > 0) {
    magiasHTML += `<div style="margin-bottom:4px; margin-top: 4px; border-top: 1px dotted #ccc; padding-top: 4px;"><b>Total de ${tipoMagiaLabel}:</b> <span style="color:${getCor(totalMagiasAtuais, magiasMax)}">${totalMagiasAtuais} / ${magiasMax}</span></div>`;

    if (classe === "Artífice (Artificer)" && nivel >= 2) {
      let infConhecidas = nivel >= 18 ? 12 : (nivel >= 14 ? 10 : (nivel >= 10 ? 8 : (nivel >= 6 ? 6 : 4)));
      let infAtivas = nivel >= 18 ? 6 : (nivel >= 14 ? 5 : (nivel >= 10 ? 4 : (nivel >= 6 ? 3 : 2)));
      let infEscolhidasAtuais = Array.from(document.querySelectorAll(".infusao-select")).filter(sel => sel.value).length;
      let infAtivasAtuais = document.querySelectorAll(".infusao-ativo-check:checked").length;

      magiasHTML += `
        <div style="margin-top: 6px; padding: 6px; background-color: #f1f8e9; border-left: 3px solid #7cb342; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
          <b>Mecânica de Infusões:</b><br>
- Infusões Conhecidas: <span style="font-weight:bold; color:${getCor(infEscolhidasAtuais, infConhecidas)};">${infEscolhidasAtuais} / ${infConhecidas}</span><br>
- Itens Infundidos Ativos: <span style="font-weight:bold; color:${getCor(infAtivasAtuais, infAtivas)};">${infAtivasAtuais} / ${infAtivas}</span>
          <div style="font-size:8.5px; color:#558b2f; margin-top:2px; font-style:italic;">* Altere ou instancie seus itens infundidos após um Descanso Longo.</div>
        </div>`;
    }

    if (classe === "Druida (Druid)" && nivel >= 2) {
      let maxND = "1/4";
      let restricoes = "Sem natação ou voo";
      if (subclasse.toLowerCase().includes("lua") || subclasse.toLowerCase().includes("moon")) {
        maxND = nivel >= 6 ? Math.floor(nivel / 3) : "1";
        restricoes = nivel >= 6 ? "Combate Avançado" : "Combate Terrestre";
      } else {
        if (nivel >= 8) { maxND = "1"; restricoes = "Voo e natação liberados"; }
        else if (nivel >= 4) { maxND = "1/2"; restricoes = "Natação liberada | Sem voo"; }
      }
      magiasHTML += `
        <div style="margin-top: 6px; padding: 6px; background-color: #f1f8e9; border-left: 3px solid #7cb342; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
          <b>Forma Selvagem (Wild Shape):</b><br>
- Limite Atual: <span style="font-weight:bold; color:#33691e;">ND Máx ${maxND} (${restricoes})</span>
          <div style="font-size:8.5px; color:#558b2f; margin-top:2px; font-style:italic;">* Recarrega completamente ao término de um Descanso Curto ou Longo.</div>
        </div>`;
    }

    let dadosSub = null;
    if (subclasse) {
      for (const palavraChave in magiasSubclasseDB) {
        if (subclasse.toLowerCase().includes(palavraChave.toLowerCase())) {
          dadosSub = magiasSubclasseDB[palavraChave];
          break;
        }
      }
    }
    if (dadosSub) {
      let listaMagiasGanhadas = [];
      Object.keys(dadosSub).forEach(lvlReq => {
        if (lvlReq !== "tipo" && nivel >= parseInt(lvlReq)) {
          listaMagiasGanhadas = listaMagiasGanhadas.concat(dadosSub[lvlReq]);
        }
      });
      if (listaMagiasGanhadas.length > 0) {
        magiasHTML += `
          <div style="margin-top: 6px; padding: 6px; background-color: #e3f2fd; border-left: 3px solid #1e88e5; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
            <b>Magias de ${dadosSub.tipo} (${subclasse.split(" (")[0]}):</b><br>
            <span style="color:#555; font-weight: 500;">${listaMagiasGanhadas.join(", ")}</span>
            <div style="font-size:8.5px; color:#666; margin-top:2px; font-style:italic;">* Estão sempre preparadas gratuitamente e não contam no seu limite diário.</div>
          </div>`;
      }
    }

    if (notaClasseHTML) {
      magiasHTML += `
        <div style="margin-top: 6px; padding: 6px; background-color: #f5f0e1; border-left: 3px solid #b8860b; font-size: 10px; color: #444; line-height: 1.3; text-align: left;">
          <b>Regras de Aprendizado:</b> ${notaClasseHTML}
        </div>`;
    }
  }

  if (classe === "Artífice (Artificer)") {
    const infConhecidas = nivel >= 18 ? 12 : (nivel >= 14 ? 10 : (nivel >= 10 ? 8 : (nivel >= 6 ? 6 : (nivel >= 2 ? 4 : 0))));
    const maxItensInf = nivel >= 18 ? 6 : (nivel >= 14 ? 5 : (nivel >= 10 ? 4 : (nivel >= 6 ? 3 : (nivel >= 2 ? 2 : 0))));
    const maxSintonizacao = nivel >= 18 ? 6 : (nivel >= 14 ? 5 : (nivel >= 10 ? 4 : 3));
    const subLower = subclasse.toLowerCase();

    let especialidadeArtificeHTML = "";
    if (nivel >= 3 && subclasse) {
      if (subLower.includes("alquimista") || subLower.includes("alchemist")) {
        especialidadeArtificeHTML = `<div style="margin-top:4px; border-top:1px dotted #b2ebf2; padding-top:4px; color:#333;"><b>Alquimista (Tasha):</b> Elixir Experimental${nivel >= 5 ? " + Sábio Alquímico" : ""}${nivel >= 9 ? " + Reagentes Restauradores" : ""}${nivel >= 15 ? " + Maestria Química" : ""}.</div>`;
      } else if (subLower.includes("armeiro") || subLower.includes("armorer")) {
        especialidadeArtificeHTML = `<div style="margin-top:4px; border-top:1px dotted #b2ebf2; padding-top:4px; color:#333;"><b>Armeiro (Tasha):</b> Armadura Arcana (Protetor/Infiltrador)${nivel >= 5 ? " + Ataque Extra" : ""}${nivel >= 9 ? " + Modificações de Armadura" : ""}${nivel >= 15 ? " + Armadura Aperfeiçoada" : ""}.</div>`;
      } else if (subLower.includes("artilheiro") || subLower.includes("artillerist")) {
        especialidadeArtificeHTML = `<div style="margin-top:4px; border-top:1px dotted #b2ebf2; padding-top:4px; color:#333;"><b>Artilheiro (Tasha):</b> Canhão Místico${nivel >= 5 ? " + Arma de Fogo Arcana" : ""}${nivel >= 9 ? " + Canhão Explosivo" : ""}${nivel >= 15 ? " + Posição Fortificada" : ""}.</div>`;
      } else if (subLower.includes("ferreiro") || subLower.includes("battle smith")) {
        especialidadeArtificeHTML = `<div style="margin-top:4px; border-top:1px dotted #b2ebf2; padding-top:4px; color:#333;"><b>Ferreiro de Batalha (Tasha):</b> Prontidão em Batalha + Defensor de Aço${nivel >= 5 ? " + Ataque Extra" : ""}${nivel >= 9 ? " + Solavanco Arcano" : ""}${nivel >= 15 ? " + Defensor Aprimorado" : ""}.</div>`;
      }
    }

    const marcosArtifice = {
      1: "Conjuração (INT; ferramentas como foco e rituais preparados) e Funilaria Mágica",
      2: "Infundir Item (4 infusões conhecidas; até 2 itens infundidos)",
      3: "Especialidade de Artífice, A Ferramenta Certa para o Trabalho e acesso a magias de 2º círculo",
      4: "Incremento no Valor de Habilidade (ASI) e truque adicional",
      5: "Característica de Especialidade de Artífice e acesso a magias de 3º círculo",
      6: "Especialista em Ferramenta (dobra BP com ferramentas), 6 infusões e até 3 itens infundidos",
      7: "Lampejo de Genialidade (reação +INT em teste/TR; INT usos/Longo)",
      8: "Incremento no Valor de Habilidade (ASI)",
      9: "Característica de Especialidade de Artífice e acesso a magias de 4º círculo",
      10: "Adepto de Item Mágico (até 4 sintonizados; 1/4 tempo e 1/2 ouro em comuns/incomuns), 8 infusões e até 4 itens infundidos",
      11: "Item Armazenador de Magia (1º/2º círculo, 1 ação; 2xINT usos, mín. 2)",
      12: "Incremento no Valor de Habilidade (ASI)",
      13: "Acesso a magias de 5º círculo",
      14: "Erudito do Item Mágico (até 5 sintonizados; ignora requisitos), 10 infusões e até 5 itens infundidos",
      15: "Característica de Especialidade de Artífice",
      16: "Incremento no Valor de Habilidade (ASI)",
      17: "Acesso a magias de 5º círculo (máx. de Artífice)",
      18: "Mestre do Item Mágico (até 6 sintonizados), 12 infusões e até 6 itens infundidos",
      19: "Incremento no Valor de Habilidade (ASI)",
      20: "Alma de Artífice (+1 em todas as salvaguardas por item sintonizado; reação para cair a 1 PV)"
    };

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #e0f7fa; border-left: 3px solid #00838f; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Invenção & Infusões (d8 | TR: CON/INT):</b><br>
- Infusões: <span style="font-weight:bold; color:#006064;">${infConhecidas} conhecidas | ${maxItensInf} ativos</span> | Sintonização: <span style="font-weight:bold; color:#0d47a1;">até ${maxSintonizacao}</span><br>
- Funilaria Mágica: <span style="font-weight:bold; color:#1b5e20;">até ${Math.max(1, intMod)} objeto(s)</span>
        ${especialidadeArtificeHTML}
        <div style="margin-top:4px; border-top:1px dotted #80deea; padding-top:4px; color:#444;">
          <b>Nível ${nivel}:</b> ${marcosArtifice[nivel] || ""}
        </div>
        <div style="font-size:8.5px; color:#555; margin-top:4px; font-style:italic;">
          * Proficiências: Armaduras leves, médias, escudos, armas simples, Funileiro, Ladrão e 1 ferramenta de artesão (Tasha; magias/itens expandidos com Xanathar/PHB).
        </div>
      </div>`;
  }

  if (classe === "Mago (Wizard)") {
    const recArcanaMax = Math.ceil(nivel / 2);
    const preparadasMax = Math.max(1, nivel + intMod);
    const subLower = subclasse.toLowerCase();

    let tradicaoMagoHTML = "";
    if (nivel >= 2 && subclasse) {
      if (subLower.includes("lâmina cantante") || subLower.includes("bladesinging")) {
        tradicaoMagoHTML = `<div style="margin-top:4px; border-top:1px dotted #bbdefb; padding-top:4px; color:#333;"><b>Lâmina Cantante (Tasha):</b> Canção da Lâmina${nivel >= 6 ? " + Ataque Extra" : ""}${nivel >= 10 ? " + Canção de Defesa" : ""}${nivel >= 14 ? " + Canção da Vitória" : ""}.</div>`;
      } else if (subLower.includes("escribas") || subLower.includes("scribes")) {
        tradicaoMagoHTML = `<div style="margin-top:4px; border-top:1px dotted #bbdefb; padding-top:4px; color:#333;"><b>Ordem dos Escribas (Tasha):</b> Pena Mágica + Livro de Magias Desperto${nivel >= 6 ? " + Manifestar Mente" : ""}${nivel >= 10 ? " + Mestre Escrivão" : ""}${nivel >= 14 ? " + Uno com o Mundo" : ""}.</div>`;
      } else if (subLower.includes("guerra") || subLower.includes("war")) {
        tradicaoMagoHTML = `<div style="margin-top:4px; border-top:1px dotted #bbdefb; padding-top:4px; color:#333;"><b>Mago de Guerra (Xanathar):</b> Deflexão Arcana + Astúcia Tática${nivel >= 6 ? " + Surto de Poder" : ""}${nivel >= 10 ? " + Magia Duradoura" : ""}${nivel >= 14 ? " + Blindagem Defletora" : ""}.</div>`;
      } else {
        tradicaoMagoHTML = `<div style="margin-top:4px; border-top:1px dotted #bbdefb; padding-top:4px; color:#333;"><b>Tradição Arcana (PHB):</b> ${subclasse} (marcos nos níveis 2, 6, 10 e 14).</div>`;
      }
    }

    const marcosMago = {
      1: "Conjuração (INT), Conjuração de Ritual e Recuperação Arcana (1 nível)",
      2: "Tradição Arcana e Recuperação Arcana (1 nível)",
      3: "Acesso a magias de 2º círculo, Recuperação Arcana (2 níveis) e Fórmulas de Truque (Tasha)",
      4: "Incremento no Valor de Habilidade (ASI), truque adicional e Recuperação Arcana (2 níveis)",
      5: "Acesso a magias de 3º círculo e Recuperação Arcana (3 níveis)",
      6: "Característica de Tradição Arcana e Recuperação Arcana (3 níveis)",
      7: "Acesso a magias de 4º círculo e Recuperação Arcana (4 níveis)",
      8: "Incremento no Valor de Habilidade (ASI) e Recuperação Arcana (4 níveis)",
      9: "Acesso a magias de 5º círculo e Recuperação Arcana (5 níveis)",
      10: "Característica de Tradição Arcana, truque adicional e Recuperação Arcana (5 níveis)",
      11: "Acesso a magias de 6º círculo e Recuperação Arcana (6 níveis)",
      12: "Incremento no Valor de Habilidade (ASI) e Recuperação Arcana (6 níveis)",
      13: "Acesso a magias de 7º círculo e Recuperação Arcana (7 níveis)",
      14: "Característica de Tradição Arcana e Recuperação Arcana (7 níveis)",
      15: "Acesso a magias de 8º círculo e Recuperação Arcana (8 níveis)",
      16: "Incremento no Valor de Habilidade (ASI) e Recuperação Arcana (8 níveis)",
      17: "Acesso a magias de 9º círculo e Recuperação Arcana (9 níveis)",
      18: "Assinatura de Magia (2 magias de 3º círculo; Curto/Longo) e Recuperação Arcana (9 níveis)",
      19: "Incremento no Valor de Habilidade (ASI) e Recuperação Arcana (10 níveis)",
      20: "Domínio de Magia (1 magia de 3º círculo à vontade) e Recuperação Arcana (10 níveis)"
    };

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #e3f2fd; border-left: 3px solid #1565c0; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Grimório & Alta Arcana (d6 | TR: INT/SAB):</b><br>
- Preparadas Diárias: <span style="font-weight:bold; color:#0d47a1;">${preparadasMax}</span> (INT + Nível) | Recuperação Arcana: <span style="font-weight:bold; color:#1b5e20;">até ${recArcanaMax} níveis</span> (máx. 5º)<br>
- Conjuração de Ritual: <span style="font-weight:bold; color:#4a148c;">Ativa (Grimório)</span>${nivel >= 18 ? " | Assinatura de Magia (Nv 18+)" : ""}${nivel >= 20 ? " | Domínio de Magia (Nv 20)" : ""}
        ${tradicaoMagoHTML}
        <div style="margin-top:4px; border-top:1px dotted #bbdefb; padding-top:4px; color:#444;">
          <b>Nível ${nivel}:</b> ${marcosMago[nivel] || ""}
        </div>
        <div style="font-size:8.5px; color:#555; margin-top:4px; font-style:italic;">
          * Proficiências: Nenhuma armadura/escudo | Adagas, dardos, fundas, bordões e bestas leves | Opcionais (Tasha) suportadas.
        </div>
      </div>`;
  }

  if (classe === "Patrulheiro (Ranger)") {
    const qtdInimigosFav = nivel >= 14 ? 3 : (nivel >= 6 ? 2 : 1);
    const qtdTerrenosFav = nivel >= 10 ? 3 : (nivel >= 6 ? 2 : 1);
    const inimigoCerteiroTxt = nivel >= 20 ? `+${sabMod} (SAB) 1x/turno em Inimigo Favorito` : "Bloqueado (Nv 20)";
    const subLower = subclasse.toLowerCase();

    let conclaveExtraHTML = "";
    if (nivel >= 3 && subclasse) {
      if (subLower.includes("caçador") || subLower.includes("hunter")) {
        conclaveExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #c5e1a5; padding-top:4px; color:#333;"><b>Caçador (PHB):</b> Tática de Caçador${nivel >= 7 ? " + Táticas Defensivas" : ""}${nivel >= 11 ? " + Ataques Múltiplos" : ""}${nivel >= 15 ? " + Defesa Superior" : ""}.</div>`;
      } else if (subLower.includes("besta") || subLower.includes("beast")) {
        conclaveExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #c5e1a5; padding-top:4px; color:#333;"><b>Mestre das Bestas (PHB/Tasha):</b> Companheiro Bestial / Fera Primal${nivel >= 7 ? " + Treinamento Excepcional" : ""}${nivel >= 11 ? " + Fúria Bestial" : ""}${nivel >= 15 ? " + Compartilhar Magias" : ""}.</div>`;
      } else if (subLower.includes("obscuro") || subLower.includes("gloom")) {
        conclaveExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #c5e1a5; padding-top:4px; color:#333;"><b>Perseguidor Obscuro (Xanathar):</b> Emboscador Terrível + Visão Umbral${nivel >= 7 ? " + Mente de Ferro" : ""}${nivel >= 11 ? " + Agitação Perseguidora" : ""}${nivel >= 15 ? " + Evasiva Sombria" : ""}.</div>`;
      } else if (subLower.includes("horizonte") || subLower.includes("horizon")) {
        conclaveExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #c5e1a5; padding-top:4px; color:#333;"><b>Andarilho do Horizonte (Xanathar):</b> Detectar Portais + Guerreiro Planar${nivel >= 7 ? " + Passo Etéreo" : ""}${nivel >= 11 ? " + Ataque Distante" : ""}${nivel >= 15 ? " + Defesa Espectral" : ""}.</div>`;
      } else if (subLower.includes("exterminador") || subLower.includes("monster slayer")) {
        conclaveExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #c5e1a5; padding-top:4px; color:#333;"><b>Exterminador de Monstros (Xanathar):</b> Sentido do Caçador + Exterminador de Presas${nivel >= 7 ? " + Defesa Sobrenatural" : ""}${nivel >= 11 ? " + Nêmesis do Conjurador" : ""}${nivel >= 15 ? " + Contra-Ataque do Exterminador" : ""}.</div>`;
      } else if (subLower.includes("feérico") || subLower.includes("fey")) {
        conclaveExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #c5e1a5; padding-top:4px; color:#333;"><b>Andarilho Feérico (Tasha):</b> Golpes Terríveis + Glamour Transcendental${nivel >= 7 ? " + Detalhe Sedutor" : ""}${nivel >= 11 ? " + Reforços Feéricos" : ""}${nivel >= 15 ? " + Andarilho Nebuloso" : ""}.</div>`;
      } else if (subLower.includes("enxame") || subLower.includes("swarm")) {
        conclaveExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #c5e1a5; padding-top:4px; color:#333;"><b>Protetor do Enxame (Tasha):</b> Enxame Reunido${nivel >= 7 ? " + Maré Rodopiante" : ""}${nivel >= 11 ? " + Enxame Poderoso" : ""}${nivel >= 15 ? " + Dispersão de Enxame" : ""}.</div>`;
      }
    }

    const marcosPatrulheiro = {
      1: "Inimigo Favorito (1) e Explorador Natural (1) [ou Adversário Favorito / Explorador Hábil - Tasha]",
      2: "Estilo de Luta e Conjuração (SAB; magias conhecidas)",
      3: "Arquétipo / Conclave de Patrulheiro e Consciência Primeva (ou Prontidão Primal - Tasha)",
      4: "Incremento no Valor de Habilidade (ASI) e Versatilidade Marcial opcional (Tasha)",
      5: "Ataque Extra (2 ataques por ação Atacar)",
      6: "Inimigo Favorito (2) e Explorador Natural (2)",
      7: "Característica de Arquétipo / Conclave",
      8: "Incremento no Valor de Habilidade (ASI) e Passo da Natureza",
      9: "Acesso a magias de 3º círculo",
      10: "Explorador Natural (3) e Sumir de Vista (ou Véu da Natureza - Tasha)",
      11: "Característica de Arquétipo / Conclave",
      12: "Incremento no Valor de Habilidade (ASI)",
      13: "Acesso a magias de 4º círculo",
      14: "Inimigo Favorito (3) e Esconder-se à Plena Vista",
      15: "Característica de Arquétipo / Conclave",
      16: "Incremento no Valor de Habilidade (ASI)",
      17: "Acesso a magias de 5º círculo",
      18: "Camuflagem",
      19: "Incremento no Valor de Habilidade (ASI)",
      20: "Inimigo Certeiro (+SAB em ataque ou dano 1x/turno contra Inimigo Favorito)"
    };

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #f1f8e9; border-left: 3px solid #558b2f; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Ermos & Caçada (d10 | TR: FOR/DES):</b><br>
- Inimigos Favoritos: <span style="font-weight:bold; color:#33691e;">${qtdInimigosFav}</span> | Terrenos Favoritos: <span style="font-weight:bold; color:#1b5e20;">${qtdTerrenosFav}</span><br>
- Inimigo Certeiro (Nv 20): <span style="font-weight:bold; color:#0d47a1;">${inimigoCerteiroTxt}</span>
        ${conclaveExtraHTML}
        <div style="margin-top:4px; border-top:1px dotted #c5e1a5; padding-top:4px; color:#444;">
          <b>Nível ${nivel}:</b> ${marcosPatrulheiro[nivel] || ""}
        </div>
        <div style="font-size:8.5px; color:#555; margin-top:4px; font-style:italic;">
          * Proficiências: Armaduras leves, médias, escudos, armas simples e marciais | Opcionais (Tasha) suportadas.
        </div>
      </div>`;
  }

  if (classe === "Paladino (Paladin)") {
    const reservaCura = nivel * 5;
    const usosSentido = Math.max(1, 1 + carMod);
    const toquePurifTxt = nivel >= 14 ? `${Math.max(1, carMod)}/Descanso Longo` : "Bloqueado (Nv 14+)";
    const destruicaoAprimTxt = nivel >= 11 ? "+1d8 radiante automático" : "Bloqueado (Nv 11+)";
    const subLower = subclasse.toLowerCase();

    let juramentoExtraHTML = "";
    if (nivel >= 3 && subclasse) {
      if (subLower.includes("devoção") || subLower.includes("devotion")) {
        juramentoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe082; padding-top:4px; color:#333;"><b>Juramento da Devoção (PHB):</b> Arma Sagrada ou Expulsar o Profano${nivel >= 7 ? " + Aura de Devoção" : ""}${nivel >= 15 ? " + Proteção Contra o Mal e o Bem" : ""}${nivel >= 20 ? " + Avatar Invencível" : ""}.</div>`;
      } else if (subLower.includes("anciões") || subLower.includes("ancients")) {
        juramentoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe082; padding-top:4px; color:#333;"><b>Juramento dos Anciões (PHB):</b> Ira da Natureza${nivel >= 7 ? " + Aura de Proteção Contra Magias" : ""}${nivel >= 15 ? " + Sentinela Imortal" : ""}${nivel >= 20 ? " + Campeão Ancião" : ""}.</div>`;
      } else if (subLower.includes("vingança") || subLower.includes("vengeance")) {
        juramentoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe082; padding-top:4px; color:#333;"><b>Juramento da Vingança (PHB):</b> Voto de Inimizade ou Abjurar o Inimigo${nivel >= 7 ? " + Vingador Implacável" : ""}${nivel >= 15 ? " + Alma da Vingança" : ""}${nivel >= 20 ? " + Vingador" : ""}.</div>`;
      } else if (subLower.includes("conquista") || subLower.includes("conquest")) {
        juramentoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe082; padding-top:4px; color:#333;"><b>Juramento da Conquista (Xanathar):</b> Presença Conquistadora ou Ataque Guiado${nivel >= 7 ? " + Aura da Conquista" : ""}${nivel >= 15 ? " + Repreensão Arrogante" : ""}${nivel >= 20 ? " + Conquistador Invencível" : ""}.</div>`;
      } else if (subLower.includes("redenção") || subLower.includes("redemption")) {
        juramentoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe082; padding-top:4px; color:#333;"><b>Juramento da Redenção (Xanathar):</b> Emissário da Paz ou Repreendendo a Violência${nivel >= 7 ? " + Aura do Guardião" : ""}${nivel >= 15 ? " + Espírito Protetor" : ""}${nivel >= 20 ? " + Emissário da Redenção" : ""}.</div>`;
      } else if (subLower.includes("glória") || subLower.includes("glory")) {
        juramentoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe082; padding-top:4px; color:#333;"><b>Juramento da Glória (Tasha):</b> Atleta Inigualável ou Destruição Inspiradora${nivel >= 7 ? " + Aura de Vivacidade" : ""}${nivel >= 15 ? " + Defesa Gloriosa" : ""}${nivel >= 20 ? " + Lenda Viva" : ""}.</div>`;
      } else if (subLower.includes("vigilantes") || subLower.includes("watchers")) {
        juramentoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe082; padding-top:4px; color:#333;"><b>Juramento dos Vigilantes (Tasha):</b> Vontade do Vigilante ou Abjurar o Extraplanar${nivel >= 7 ? " + Aura do Sentinela" : ""}${nivel >= 15 ? " + Repprimenda Vigilante" : ""}${nivel >= 20 ? " + Baluarte Mortal" : ""}.</div>`;
      }
    }

    const marcosPaladino = {
      1: "Sentido Divino (1+CAR/Longo) e Cura pelas Mãos (5 PV/nível)",
      2: "Estilo de Luta, Conjuração (CAR) e Destruição Divina (2d8 radiante)",
      3: "Juramento Sagrado, Saúde Divina e Amealhar Poder Divino opcional (Tasha)",
      4: "Incremento no Valor de Habilidade (ASI) e Versatilidade Marcial opcional (Tasha)",
      5: "Ataque Extra (2 ataques por ação Atacar)",
      6: "Aura de Proteção (+CAR em TR a até 3m para você e aliados)",
      7: "Característica de Juramento Sagrado",
      8: "Incremento no Valor de Habilidade (ASI)",
      9: "Acesso a magias de 3º círculo",
      10: "Aura da Coragem (imune a amedrontado a até 3m)",
      11: "Destruição Divina Aprimorada (+1d8 radiante em ataques corpo a corpo)",
      12: "Incremento no Valor de Habilidade (ASI)",
      13: "Acesso a magias de 4º círculo",
      14: "Toque Purificador (CAR/Longo)",
      15: "Característica de Juramento Sagrado",
      16: "Incremento no Valor de Habilidade (ASI)",
      17: "Acesso a magias de 5º círculo",
      18: "Auras aumentam para 9m de raio",
      19: "Incremento no Valor de Habilidade (ASI)",
      20: "Característica suprema de Juramento Sagrado"
    };

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #fffde7; border-left: 3px solid #f57f17; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Juramento & Auras (d10 | TR: SAB/CAR):</b><br>
- Cura pelas Mãos: <span style="font-weight:bold; color:#2e7d32;">${reservaCura} PV/Longo</span> | Sentido Divino: <span style="font-weight:bold; color:#e65100;">${usosSentido}/Longo</span><br>
- Destruição Divina Aprimorada: <span style="font-weight:bold; color:#b71c1c;">${destruicaoAprimTxt}</span><br>
- Toque Purificador: <span style="font-weight:bold; color:#0d47a1;">${toquePurifTxt}</span>
        ${juramentoExtraHTML}
        <div style="margin-top:4px; border-top:1px dotted #ffe082; padding-top:4px; color:#444;">
          <b>Nível ${nivel}:</b> ${marcosPaladino[nivel] || ""}
        </div>
        <div style="font-size:8.5px; color:#555; margin-top:4px; font-style:italic;">
          * Foco de Conjuração: Símbolo Sagrado | Proficiências: Todas as armaduras, escudos, armas simples e marciais.
        </div>
      </div>`;
  }

  if (classe === "Ladino (Rogue)") {
    const dadosFurtivo = Math.ceil(nivel / 2);
    const qtdEspecializacao = nivel >= 6 ? 4 : 2;
    const golpeSorteTxt = nivel >= 20 ? "1/Descanso Curto ou Longo" : "Bloqueado (Nv 20)";
    const subLower = subclasse.toLowerCase();

    let arquetipoLadinoHTML = "";
    if (nivel >= 3 && subclasse) {
      if (subLower.includes("trapaceiro") || subLower.includes("arcane trickster")) {
        arquetipoLadinoHTML = `<div style="margin-top:4px; border-top:1px dotted #d7ccc8; padding-top:4px; color:#333;"><b>Trapaceiro Arcano (PHB):</b> Conjuração de 1/3 (INT) + Mãos Mágicas Malabaristas${nivel >= 9 ? " + Emboscada Mágica" : ""}${nivel >= 13 ? " + Versátil com Truques" : ""}${nivel >= 17 ? " + Ladrão de Magias" : ""}.</div>`;
      } else if (subLower.includes("assassino") || subLower.includes("assassin")) {
        arquetipoLadinoHTML = `<div style="margin-top:4px; border-top:1px dotted #d7ccc8; padding-top:4px; color:#333;"><b>Assassino (PHB):</b> Assassinar${nivel >= 9 ? " + Especialização em Infiltração" : ""}${nivel >= 13 ? " + Impostor" : ""}${nivel >= 17 ? " + Golpe Letal" : ""}.</div>`;
      } else if (subLower.includes("ladrão") || subLower.includes("thief")) {
        arquetipoLadinoHTML = `<div style="margin-top:4px; border-top:1px dotted #d7ccc8; padding-top:4px; color:#333;"><b>Ladrão (PHB):</b> Mãos Rápidas + Andarilho de Telhados${nivel >= 9 ? " + Furtividade Suprema" : ""}${nivel >= 13 ? " + Usar Instrumento Mágico" : ""}${nivel >= 17 ? " + Reflexos de Ladrão" : ""}.</div>`;
      } else if (subLower.includes("inquiridor") || subLower.includes("inquisitive")) {
        arquetipoLadinoHTML = `<div style="margin-top:4px; border-top:1px dotted #d7ccc8; padding-top:4px; color:#333;"><b>Inquiridor (Xanathar):</b> Ouvir do Enganador, Olhar do Detalhe e Combatente Perspicaz${nivel >= 9 ? " + Olhar Constante" : ""}${nivel >= 13 ? " + Olhar Inflexível" : ""}${nivel >= 17 ? " + Olhar da Fraqueza (+3d6)" : ""}.</div>`;
      } else if (subLower.includes("mentor") || subLower.includes("mastermind")) {
        arquetipoLadinoHTML = `<div style="margin-top:4px; border-top:1px dotted #d7ccc8; padding-top:4px; color:#333;"><b>Mentor (Xanathar):</b> Mestre da Intriga e Mestre de Tática${nivel >= 9 ? " + Manipulador Perspicaz" : ""}${nivel >= 13 ? " + Redirecionar" : ""}${nivel >= 17 ? " + Alma do Enganador" : ""}.</div>`;
      } else if (subLower.includes("batedor") || subLower.includes("scout")) {
        arquetipoLadinoHTML = `<div style="margin-top:4px; border-top:1px dotted #d7ccc8; padding-top:4px; color:#333;"><b>Batedor (Xanathar):</b> Escaramuça e Sobrevivente${nivel >= 9 ? " + Mobilidade Superior" : ""}${nivel >= 13 ? " + Mestre da Emboscada" : ""}${nivel >= 17 ? " + Golpe Súbito" : ""}.</div>`;
      } else if (subLower.includes("espadachim") || subLower.includes("swashbuckler")) {
        arquetipoLadinoHTML = `<div style="margin-top:4px; border-top:1px dotted #d7ccc8; padding-top:4px; color:#333;"><b>Espadachim (Xanathar):</b> Passo Elegante e Audácia Devassa${nivel >= 9 ? " + Penachar" : ""}${nivel >= 13 ? " + Manobra Elegante" : ""}${nivel >= 17 ? " + Mestre Duelista" : ""}.</div>`;
      } else if (subLower.includes("adaga espiritual") || subLower.includes("soulknife")) {
        const bpVal = Math.floor((nivel - 1) / 4) + 2;
        const facePsi = nivel >= 17 ? "d12" : (nivel >= 11 ? "d10" : (nivel >= 5 ? "d8" : "d6"));
        arquetipoLadinoHTML = `<div style="margin-top:4px; border-top:1px dotted #d7ccc8; padding-top:4px; color:#333;"><b>Adaga Espiritual (Tasha):</b> ${2 * bpVal} dados (<b>${facePsi}</b>) + Lâminas Psíquicas${nivel >= 9 ? " + Lâminas da Alma" : ""}${nivel >= 13 ? " + Véu Psíquico" : ""}${nivel >= 17 ? " + Rasgar Mente" : ""}.</div>`;
      } else if (subLower.includes("fantasma") || subLower.includes("phantom")) {
        arquetipoLadinoHTML = `<div style="margin-top:4px; border-top:1px dotted #d7ccc8; padding-top:4px; color:#333;"><b>Fantasma (Tasha):</b> Sussurros dos Mortos + Lamentos da Sepultura${nivel >= 9 ? " + Símbolos Daqueles Que Partiram" : ""}${nivel >= 13 ? " + Caminhada Fantasma" : ""}${nivel >= 17 ? " + Amigo da Morte" : ""}.</div>`;
      }
    }

    const marcosLadino = {
      1: "Especialização (2), Ataque Furtivo (1d6) e Gíria de Ladrão",
      2: "Ação Ardilosa (Disparada, Desengajar ou Esconder como ação bônus)",
      3: "Arquétipo de Ladino, Ataque Furtivo (2d6) e Mira Firme opcional (Tasha)",
      4: "Incremento no Valor de Habilidade (ASI)",
      5: "Esquiva Sobrenatural (reação) e Ataque Furtivo (3d6)",
      6: "Especialização (mais 2; total de 4)",
      7: "Evasão e Ataque Furtivo (4d6)",
      8: "Incremento no Valor de Habilidade (ASI)",
      9: "Característica de Arquétipo de Ladino e Ataque Furtivo (5d6)",
      10: "Incremento no Valor de Habilidade (ASI extra do Ladino)",
      11: "Talento Confiável (d20 ≤ 9 vira 10 em testes com proficiência) e Ataque Furtivo (6d6)",
      12: "Incremento no Valor de Habilidade (ASI)",
      13: "Característica de Arquétipo de Ladino e Ataque Furtivo (7d6)",
      14: "Sentido Cego (3m se puder ouvir)",
      15: "Mente Escorregadia (proficiência em TR de Sabedoria) e Ataque Furtivo (8d6)",
      16: "Incremento no Valor de Habilidade (ASI)",
      17: "Característica de Arquétipo de Ladino e Ataque Furtivo (9d6)",
      18: "Elusivo (sem vantagem contra você enquanto não incapacitado)",
      19: "Incremento no Valor de Habilidade (ASI) e Ataque Furtivo (10d6)",
      20: "Golpe de Sorte (1x por Descanso Curto ou Longo)"
    };

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #efebe9; border-left: 3px solid #5d4037; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Furtividade & Precisão (d8 | TR: DES/INT):</b><br>
- Ataque Furtivo: <span style="font-weight:bold; color:#7e1d15;">${dadosFurtivo}d6</span> | Especializações: <span style="font-weight:bold; color:#3e2723;">${qtdEspecializacao}</span><br>
- Golpe de Sorte (Nv 20): <span style="font-weight:bold; color:#0d47a1;">${golpeSorteTxt}</span>
        ${arquetipoLadinoHTML}
        <div style="margin-top:4px; border-top:1px dotted #bcaaa4; padding-top:4px; color:#444;">
          <b>Nível ${nivel}:</b> ${marcosLadino[nivel] || ""}
        </div>
        <div style="font-size:8.5px; color:#555; margin-top:4px; font-style:italic;">
          * Proficiências: Armaduras leves, armas simples/bestas de mão/espadas longas/rapieiras/espadas curtas e Ferramentas de Ladrão.
        </div>
      </div>`;
  }

  if (classe === "Guerreiro (Fighter)") {
    const ataquesAcao = nivel >= 20 ? 4 : (nivel >= 11 ? 3 : (nivel >= 5 ? 2 : 1));
    const surtoQtd = nivel >= 17 ? "2/Desc. Curto ou Longo" : (nivel >= 2 ? "1/Desc. Curto ou Longo" : "Bloqueado (Nv 2+)");
    const indomavelQtd = nivel >= 17 ? "3/Desc. Longo" : (nivel >= 13 ? "2/Desc. Longo" : (nivel >= 9 ? "1/Desc. Longo" : "Bloqueado (Nv 9+)"));
    const subLower = subclasse.toLowerCase();

    let arquetipoExtraHTML = "";
    if (nivel >= 3 && subclasse) {
      if (subLower.includes("mestre de batalha") || subLower.includes("battle master")) {
        const qtdDados = nivel >= 15 ? 6 : (nivel >= 7 ? 5 : 4);
        const faceDado = nivel >= 18 ? "d12" : (nivel >= 10 ? "d10" : "d8");
        const qtdManobras = nivel >= 15 ? 9 : (nivel >= 10 ? 7 : (nivel >= 7 ? 5 : 3));
        arquetipoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #cfd8dc; padding-top:4px; color:#333;"><b>Mestre de Batalha (PHB/Tasha):</b> <b>${qtdDados}</b> dados (<b>${faceDado}</b>) e <b>${qtdManobras}</b> manobras${nivel >= 7 ? " + Conheça Seu Inimigo" : ""}${nivel >= 15 ? " + Implacável" : ""}.</div>`;
      } else if (subLower.includes("campeão") || subLower.includes("champion")) {
        const margemCrit = nivel >= 15 ? "18–20" : "19–20";
        arquetipoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #cfd8dc; padding-top:4px; color:#333;"><b>Campeão (PHB):</b> Crítico em <b>${margemCrit}</b>${nivel >= 7 ? " + Atletismo Extraordinário" : ""}${nivel >= 10 ? " + Estilo de Luta Adicional" : ""}${nivel >= 18 ? " + Sobrevivente" : ""}.</div>`;
      } else if (subLower.includes("cavaleiro arcano") || subLower.includes("eldritch knight")) {
        arquetipoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #cfd8dc; padding-top:4px; color:#333;"><b>Cavaleiro Arcano (PHB):</b> Conjuração de 1/3 (INT) + Vínculo com Arma${nivel >= 7 ? " + Magia de Guerra" : ""}${nivel >= 10 ? " + Golpe Místico" : ""}${nivel >= 15 ? " + Investida Arcana" : ""}${nivel >= 18 ? " + Magia de Guerra Aprimorada" : ""}.</div>`;
      } else if (subLower.includes("arqueiro arcano") || subLower.includes("arcane archer")) {
        const qtdOpcoes = nivel >= 18 ? 6 : (nivel >= 15 ? 5 : (nivel >= 10 ? 4 : (nivel >= 7 ? 3 : 2)));
        arquetipoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #cfd8dc; padding-top:4px; color:#333;"><b>Arqueiro Arcano (Xanathar):</b> 2 Disparos Arcanos/descanso + <b>${qtdOpcoes}</b> opções${nivel >= 7 ? " + Flecha Mágica e Tiro Curvado" : ""}${nivel >= 15 ? " + Disparo Sempre Pronto" : ""}.</div>`;
      } else if (subLower.includes("cavaleiro") || subLower.includes("cavalier")) {
        arquetipoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #cfd8dc; padding-top:4px; color:#333;"><b>Cavaleiro (Xanathar):</b> Nascido para a Sela + Marca Inabalável${nivel >= 7 ? " + Manobra de Proteção" : ""}${nivel >= 10 ? " + Mantenha a Formação" : ""}${nivel >= 15 ? " + Investida Feroz" : ""}${nivel >= 18 ? " + Defensor Vigilante" : ""}.</div>`;
      } else if (subLower.includes("samurai")) {
        const pvTempSamurai = nivel >= 15 ? 15 : (nivel >= 10 ? 10 : 5);
        arquetipoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #cfd8dc; padding-top:4px; color:#333;"><b>Samurai (Xanathar):</b> Espírito Guerreiro (3/longo; <b>${pvTempSamurai} PV temp.</b>)${nivel >= 7 ? " + Cortesão Elegante" : ""}${nivel >= 10 ? " + Espírito Incansável" : ""}${nivel >= 15 ? " + Golpe Rápido" : ""}${nivel >= 18 ? " + Força Diante da Morte" : ""}.</div>`;
      } else if (subLower.includes("rúnico") || subLower.includes("rune")) {
        const qtdRunas = nivel >= 15 ? 5 : (nivel >= 10 ? 4 : (nivel >= 7 ? 3 : 2));
        arquetipoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #cfd8dc; padding-top:4px; color:#333;"><b>Cavaleiro Rúnico (Tasha):</b> <b>${qtdRunas}</b> runas + Poder do Gigante${nivel >= 7 ? " + Escudo Rúnico" : ""}${nivel >= 10 ? " + Grande Estatura" : ""}${nivel >= 15 ? " + Mestre das Runas" : ""}${nivel >= 18 ? " + Força Rúnica Implácável" : ""}.</div>`;
      } else if (subLower.includes("psíquico") || subLower.includes("psi")) {
        const bpVal = Math.floor((nivel - 1) / 4) + 2;
        const facePsi = nivel >= 17 ? "d12" : (nivel >= 11 ? "d10" : (nivel >= 5 ? "d8" : "d6"));
        arquetipoExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #cfd8dc; padding-top:4px; color:#333;"><b>Combatente Psíquico (Tasha):</b> <b>${2 * bpVal}</b> dados (<b>${facePsi}</b>)${nivel >= 7 ? " + Adepto Telecinético" : ""}${nivel >= 10 ? " + Mente Guardada" : ""}${nivel >= 15 ? " + Baluarte de Energia" : ""}${nivel >= 18 ? " + Mestre Telecinético" : ""}.</div>`;
      }
    }

    const marcosGuerreiro = {
      1: "Estilo de Luta e Retomar o Fôlego (1d10 + nível; Curto/Longo)",
      2: "Surto de Ação (1 uso; Curto/Longo)",
      3: "Arquétipo Marcial",
      4: "Incremento no Valor de Habilidade (ASI) e Versatilidade Marcial opcional (Tasha)",
      5: "Ataque Extra (2 ataques por ação Atacar)",
      6: "Incremento no Valor de Habilidade (ASI extra do Guerreiro)",
      7: "Característica de Arquétipo Marcial",
      8: "Incremento no Valor de Habilidade (ASI)",
      9: "Indomável (1 uso; Descanso Longo)",
      10: "Característica de Arquétipo Marcial",
      11: "Ataque Extra (3 ataques por ação Atacar)",
      12: "Incremento no Valor de Habilidade (ASI)",
      13: "Indomável (2 usos; Descanso Longo)",
      14: "Incremento no Valor de Habilidade (ASI extra do Guerreiro)",
      15: "Característica de Arquétipo Marcial",
      16: "Incremento no Valor de Habilidade (ASI)",
      17: "Surto de Ação (2 usos) e Indomável (3 usos)",
      18: "Característica de Arquétipo Marcial",
      19: "Incremento no Valor de Habilidade (ASI)",
      20: "Ataque Extra (4 ataques por ação Atacar)"
    };

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #eceff1; border-left: 3px solid #37474f; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Maestria Marcial & Fôlego (d10 | TR: FOR/CON):</b><br>
- Ataques por Ação: <span style="font-weight:bold; color:#263238;">${ataquesAcao}</span> | Retomar o Fôlego: <span style="font-weight:bold; color:#2e7d32;">1d10+${nivel}</span><br>
- Surto de Ação: <span style="font-weight:bold; color:#0d47a1;">${surtoQtd}</span><br>
- Indomável: <span style="font-weight:bold; color:#7e1d15;">${indomavelQtd}</span>
        ${arquetipoExtraHTML}
        <div style="margin-top:4px; border-top:1px dotted #b0bec5; padding-top:4px; color:#444;">
          <b>Nível ${nivel}:</b> ${marcosGuerreiro[nivel] || ""}
        </div>
        <div style="font-size:8.5px; color:#555; margin-top:4px; font-style:italic;">
          * Proficiências: Todas as armaduras, escudos, armas simples e marciais | Opcionais (Tasha): Estilos de Luta e Manobras extras.
        </div>
      </div>`;
  }

  if (classe === "Feiticeiro (Sorcerer)") {
    const pontosFeiticaria = nivel >= 2 ? `${nivel}/Descanso Longo` : "Bloqueada (Nv 2+)";
    const qtdMetamagia = nivel >= 17 ? 4 : (nivel >= 10 ? 3 : (nivel >= 3 ? 2 : 0));
    const metamagiaTxt = qtdMetamagia > 0 ? `${qtdMetamagia} opção(ões)` : "Bloqueada (Nv 3+)";
    const restMistTxt = nivel >= 20 ? "4 pts ao fim de Descanso Curto" : "Bloqueada (Nv 20)";
    const subLower = subclasse.toLowerCase();

    let origemExtraHTML = "";
    if (subclasse) {
      if (subLower.includes("dracônica") || subLower.includes("draconic")) {
        origemExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #e1bee7; padding-top:4px; color:#333;"><b>Linhagem Dracônica (PHB):</b> Resiliência Dracônica (CA 13+DES sem armadura; +1 PV/nível)${nivel >= 6 ? " + Afinidade Elemental" : ""}${nivel >= 14 ? " + Asas de Dragão" : ""}${nivel >= 18 ? " + Presença Dracônica" : ""}.</div>`;
      } else if (subLower.includes("selvagem") || subLower.includes("wild")) {
        origemExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #e1bee7; padding-top:4px; color:#333;"><b>Magia Selvagem (PHB):</b> Surto de Magia Selvagem + Marés de Caos${nivel >= 6 ? " + Dobrar a Sorte" : ""}${nivel >= 14 ? " + Caos Controlado" : ""}${nivel >= 18 ? " + Bombardeio de Magia" : ""}.</div>`;
      } else if (subLower.includes("alma favorecida") || subLower.includes("divine soul")) {
        origemExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #e1bee7; padding-top:4px; color:#333;"><b>Alma Favorecida (Xanathar):</b> Magia Divina (Clérigo) + Favorecido pelos Deuses${nivel >= 6 ? " + Cura Fortalecida" : ""}${nivel >= 14 ? " + Asas Transcendentais" : ""}${nivel >= 18 ? " + Recuperação Sublime" : ""}.</div>`;
      } else if (subLower.includes("sombras") || subLower.includes("shadow")) {
        origemExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #e1bee7; padding-top:4px; color:#333;"><b>Adepto das Sombras (Xanathar):</b> Olhos da Escuridão + Força do Túmulo${nivel >= 6 ? " + Cão do Mal Presságio" : ""}${nivel >= 14 ? " + Caminhar nas Sombras" : ""}${nivel >= 18 ? " + Forma Umbral" : ""}.</div>`;
      } else if (subLower.includes("tempestade") || subLower.includes("storm")) {
        origemExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #e1bee7; padding-top:4px; color:#333;"><b>Feiticeiro da Tempestade (Xanathar):</b> Orador do Vento + Magia Tempestuosa${nivel >= 6 ? " + Coração e Guia da Tempestade" : ""}${nivel >= 14 ? " + Fúria da Tempestade" : ""}${nivel >= 18 ? " + Alma do Vento" : ""}.</div>`;
      } else if (subLower.includes("mecânica") || subLower.includes("clockwork")) {
        origemExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #e1bee7; padding-top:4px; color:#333;"><b>Alma Mecânica (Tasha):</b> Magias Mecânicas + Restaurar Equilíbrio${nivel >= 6 ? " + Bastião da Lei" : ""}${nivel >= 14 ? " + Transe da Ordem" : ""}${nivel >= 18 ? " + Cavalgada Mecânica" : ""}.</div>`;
      } else if (subLower.includes("mente aberrante") || subLower.includes("aberrant")) {
        origemExtraHTML = `<div style="margin-top:4px; border-top:1px dotted #e1bee7; padding-top:4px; color:#333;"><b>Mente Aberrante (Tasha):</b> Magias Psiônicas + Fala Telepática${nivel >= 6 ? " + Feitiçaria Psiônica e Defesas Psíquicas" : ""}${nivel >= 14 ? " + Revelação em Carne" : ""}${nivel >= 18 ? " + Implosão Envolvente" : ""}.</div>`;
      }
    }

    const marcosFeiticeiro = {
      1: "Conjuração (CAR) e Origem de Feitiçaria",
      2: "Fonte de Magia (2 pontos de feitiçaria e Conjuração Flexível)",
      3: "Metamágica (2 opções) e acesso a magias de 2º círculo",
      4: "Incremento no Valor de Habilidade (ASI), truque adicional e Versatilidade de Feitiçaria (Tasha)",
      5: "Acesso a magias de 3º círculo",
      6: "Característica de Origem de Feitiçaria",
      7: "Acesso a magias de 4º círculo",
      8: "Incremento no Valor de Habilidade (ASI)",
      9: "Acesso a magias de 5º círculo",
      10: "Metamágica (3 opções) e truque adicional",
      11: "Acesso a magias de 6º círculo",
      12: "Incremento no Valor de Habilidade (ASI)",
      13: "Acesso a magias de 7º círculo",
      14: "Característica de Origem de Feitiçaria",
      15: "Acesso a magias de 8º círculo",
      16: "Incremento no Valor de Habilidade (ASI)",
      17: "Metamágica (4 opções) e acesso a magias de 9º círculo",
      18: "Característica de Origem de Feitiçaria",
      19: "Incremento no Valor de Habilidade (ASI)",
      20: "Restauração Mística (4 pontos de feitiçaria em Descanso Curto)"
    };

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #fce4ec; border-left: 3px solid #ad1457; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Fonte de Magia & Metamágica (d6 | TR: CON/CAR):</b><br>
- Pontos de Feitiçaria: <span style="font-weight:bold; color:#880e4f;">${pontosFeiticaria}</span><br>
- Metamágica: <span style="font-weight:bold; color:#4a148c;">${metamagiaTxt}</span><br>
- Restauração Mística: <span style="font-weight:bold; color:#0d47a1;">${restMistTxt}</span>
        ${origemExtraHTML}
        <div style="margin-top:4px; border-top:1px dotted #f48fb1; padding-top:4px; color:#444;">
          <b>Nível ${nivel}:</b> ${marcosFeiticeiro[nivel] || ""}
        </div>
        <div style="font-size:8.5px; color:#555; margin-top:4px; font-style:italic;">
          * Foco Arcano utilizável para magias de Feiticeiro | Opcionais (Tasha): Magia Buscadora, Magia Transmutada e Orientação Mágica.
        </div>
      </div>`;
  }

  if (classe === "Druida (Druid)") {
    const subLower = subclasse.toLowerCase();
    const usosForma = nivel >= 20 ? "Ilimitado" : (nivel >= 2 ? "2/Desc. Curto ou Longo" : "Bloqueada (Nv 2+)");
    const duracaoHoras = Math.max(1, Math.floor(nivel / 2));
    const recNaturalMax = Math.ceil(nivel / 2);

    let maxND = "Bloqueada (Nv 2+)";
    let restricoes = "";
    if (nivel >= 2) {
      if (subLower.includes("lua") || subLower.includes("moon")) {
        maxND = nivel >= 6 ? `ND ${Math.floor(nivel / 3)}` : "ND 1";
        restricoes = nivel >= 6 ? "Ataques Mágicos + Combate Avançado" : "Combate Terrestre (Ação Bônus)";
      } else {
        if (nivel >= 8) { maxND = "ND 1"; restricoes = "Voo e natação liberados"; }
        else if (nivel >= 4) { maxND = "ND 1/2"; restricoes = "Natação liberada | Sem voo"; }
        else { maxND = "ND 1/4"; restricoes = "Sem natação ou voo"; }
      }
    }

    let circuloExtraHTML = "";
    if (nivel >= 2 && subclasse) {
      if (subLower.includes("terra") || subLower.includes("land")) {
        circuloExtraHTML += `<div style="margin-top:4px; border-top:1px dotted #c8e6c9; padding-top:4px; color:#333;"><b>Círculo da Terra (PHB):</b> Recuperação Natural até <b>${recNaturalMax} níveis</b> de slots (máx. 5º círculo) + Magias de Círculo.</div>`;
      } else if (subLower.includes("lua") || subLower.includes("moon")) {
        circuloExtraHTML += `<div style="margin-top:4px; border-top:1px dotted #c8e6c9; padding-top:4px; color:#333;"><b>Círculo da Lua (PHB):</b> Forma Selvagem de Combate + Formas de Círculo${nivel >= 6 ? " + Ataque Primordial" : ""}${nivel >= 10 ? " + Forma Selvagem de Elemental (2 usos)" : ""}${nivel >= 14 ? " + Mil Formas" : ""}.</div>`;
      } else if (subLower.includes("sonhos") || subLower.includes("dreams")) {
        circuloExtraHTML += `<div style="margin-top:4px; border-top:1px dotted #c8e6c9; padding-top:4px; color:#333;"><b>Círculo dos Sonhos (Xanathar):</b> Bálsamo da Corte de Verão (<b>${nivel}d6</b>)${nivel >= 6 ? " + Lareira de Sombra e Luar" : ""}${nivel >= 10 ? " + Caminhos Ocultos" : ""}${nivel >= 14 ? " + Caminhante dos Sonhos" : ""}.</div>`;
      } else if (subLower.includes("pastor") || subLower.includes("shepherd")) {
        circuloExtraHTML += `<div style="margin-top:4px; border-top:1px dotted #c8e6c9; padding-top:4px; color:#333;"><b>Círculo do Pastor (Xanathar):</b> Voz da Natureza + Espírito Totêmico (Urso/Falcão/Unicórnio)${nivel >= 6 ? " + Invocador Poderoso" : ""}${nivel >= 10 ? " + Espírito Guardião" : ""}${nivel >= 14 ? " + Chamado de Fidelidade" : ""}.</div>`;
      } else if (subLower.includes("estrelas") || subLower.includes("stars")) {
        circuloExtraHTML += `<div style="margin-top:4px; border-top:1px dotted #c8e6c9; padding-top:4px; color:#333;"><b>Círculo das Estrelas (Tasha):</b> Mapa Estelar + Forma Estrelada (Arqueiro/Cálice/Dragão)${nivel >= 6 ? " + Presságio Cósmico" : ""}${nivel >= 10 ? " + Constelações Cintilantes" : ""}${nivel >= 14 ? " + Repleto de Estrelas" : ""}.</div>`;
      } else if (subLower.includes("esporos") || subLower.includes("spores")) {
        const haloDado = nivel >= 14 ? "1d10" : (nivel >= 10 ? "1d8" : (nivel >= 6 ? "1d6" : "1d4"));
        circuloExtraHTML += `<div style="margin-top:4px; border-top:1px dotted #c8e6c9; padding-top:4px; color:#333;"><b>Círculo de Esporos (Tasha):</b> Halo de Esporos (<b>${haloDado}</b>) + Entidade Simbiótica (<b>${nivel * 4} PV temp.</b>)${nivel >= 6 ? " + Infestação Fúngica" : ""}${nivel >= 10 ? " + Espalhar Esporos" : ""}${nivel >= 14 ? " + Corpo Fúngico" : ""}.</div>`;
      } else if (subLower.includes("fogo selvagem") || subLower.includes("wildfire")) {
        circuloExtraHTML += `<div style="margin-top:4px; border-top:1px dotted #c8e6c9; padding-top:4px; color:#333;"><b>Círculo do Fogo Selvagem (Tasha):</b> Invocar Espírito do Fogo Selvagem (PV: <b>${5 + (nivel * 5)}</b>)${nivel >= 6 ? " + Vínculo Aprimorado (+1d8)" : ""}${nivel >= 10 ? " + Chamas Cauterizantes" : ""}${nivel >= 14 ? " + Reviver Resplandecente" : ""}.</div>`;
      }
    }

    const marcosDruida = {
      1: "Druídico e Conjuração (SAB; rituais e preparação diária)",
      2: "Círculo Druídico e Forma Selvagem (2/descanso; ND 1/4 sem voo/natação)",
      3: "Acesso a magias de 2º círculo",
      4: "Incremento no Valor de Habilidade (ASI), truque adicional e Forma Selvagem ND 1/2 (sem voo)",
      5: "Acesso a magias de 3º círculo",
      6: "Característica de Círculo Druídico",
      7: "Acesso a magias de 4º círculo",
      8: "Incremento no Valor de Habilidade (ASI) e Forma Selvagem ND 1 (voo e natação liberados)",
      9: "Acesso a magias de 5º círculo",
      10: "Característica de Círculo Druídico e truque adicional",
      11: "Acesso a magias de 6º círculo",
      12: "Incremento no Valor de Habilidade (ASI)",
      13: "Acesso a magias de 7º círculo",
      14: "Característica de Círculo Druídico",
      15: "Acesso a magias de 8º círculo",
      16: "Incremento no Valor de Habilidade (ASI)",
      17: "Acesso a magias de 9º círculo",
      18: "Corpo Atemporal (envelhece 1 ano a cada 10 anos) e Magias da Besta (V/S na forma de besta)",
      19: "Incremento no Valor de Habilidade (ASI)",
      20: "Arquidruida (Forma Selvagem ilimitada e sem componentes V/S ou materiais sem custo)"
    };

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #e8f5e9; border-left: 3px solid #2e7d32; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Natureza & Forma Selvagem (d8 | TR: INT/SAB):</b><br>
- Forma Selvagem: <span style="font-weight:bold; color:#1b5e20;">${usosForma}</span>${nivel >= 2 ? ` | Limite: <b>${maxND}</b> (${restricoes}) | Duração: <b>${duracaoHoras}h</b>` : ""}<br>
- Armaduras & Ferramentas: <span style="font-weight:bold; color:#33691e;">Leves, Médias e Escudos (sem metal) | Kit de Herbalismo</span>
        ${circuloExtraHTML}
        <div style="margin-top:4px; border-top:1px dotted #c8e6c9; padding-top:4px; color:#444;">
          <b>Nível ${nivel}:</b> ${marcosDruida[nivel] || ""}
        </div>
        <div style="font-size:8.5px; color:#555; margin-top:4px; font-style:italic;">
          * Foco Druídico: Ramo/Cajado/Totem/Varinha | Opcionais (Tasha): Companheiro Selvagem (Nv 2) e Versatilidade de Truque (Nv 4).
        </div>
      </div>`;
  }

  if (classe === "Clérigo (Cleric)") {
    const canalizarQtd = nivel >= 18 ? 3 : (nivel >= 6 ? 2 : (nivel >= 2 ? 1 : 0));
    const ndDestruir = nivel >= 17 ? "ND 4" : (nivel >= 14 ? "ND 3" : (nivel >= 11 ? "ND 2" : (nivel >= 8 ? "ND 1" : (nivel >= 5 ? "ND 1/2" : "Inativo (Nv 5+)"))));
    const intervencaoTxt = nivel >= 20 ? "Automática (Nv 20)" : (nivel >= 10 ? `d100 ≤ ${nivel} (7 dias se bem-sucedida)` : "Bloqueada (Nv 10+)");
    const dadoDanoExtra = nivel >= 14 ? "2d8" : "1d8";
    const subLower = subclasse.toLowerCase();

    let efeitoNv8Clerigo = "Bloqueado (Nv 8+)";
    if (nivel >= 8) {
      if (subLower.includes("conhecimento") || subLower.includes("luz") || subLower.includes("paz") || subLower.includes("sepultura")) {
        efeitoNv8Clerigo = `Conjuração Potente (+${sabMod} SAB em truques)`;
      } else if (subLower.includes("forja")) {
        efeitoNv8Clerigo = `Impacto Divino (+${dadoDanoExtra} ígneo 1x/turno)`;
      } else if (subLower.includes("ordem")) {
        efeitoNv8Clerigo = `Golpe Divino (+${dadoDanoExtra} psíquico 1x/turno)`;
      } else {
        efeitoNv8Clerigo = `Golpe Divino (+${dadoDanoExtra} extra 1x/turno)`;
      }
    }

    const marcosClerigo = {
      1: "Conjuração (SAB), Domínio Divino e Magias de Domínio",
      2: "Canalizar Divindade (1/descanso) + Expulsar Mortos-Vivos + opção do Domínio",
      3: "Acesso a magias de 2º círculo e magias de domínio de 3º nível de clérigo",
      4: "Incremento no Valor de Habilidade (ASI) e truque adicional",
      5: "Destruir Mortos-Vivos (ND 1/2 ou menor) e acesso a magias de 3º círculo",
      6: "Canalizar Divindade (2/descanso) e característica de Domínio Divino",
      7: "Acesso a magias de 4º círculo",
      8: `Incremento no Valor de Habilidade (ASI), Destruir Mortos-Vivos (ND 1) e ${efeitoNv8Clerigo}`,
      9: "Acesso a magias de 5º círculo",
      10: "Intervenção Divina (d100 ≤ nível) e truque adicional",
      11: "Destruir Mortos-Vivos (ND 2 ou menor) e acesso a magias de 6º círculo",
      12: "Incremento no Valor de Habilidade (ASI)",
      13: "Acesso a magias de 7º círculo",
      14: "Destruir Mortos-Vivos (ND 3 ou menor) e aprimoramento de 8º nível (2d8)",
      15: "Acesso a magias de 8º círculo",
      16: "Incremento no Valor de Habilidade (ASI)",
      17: "Destruir Mortos-Vivos (ND 4 ou menor), característica de Domínio (17º) e 9º círculo",
      18: "Canalizar Divindade (3/descanso)",
      19: "Incremento no Valor de Habilidade (ASI)",
      20: "Aprimoramento de Intervenção Divina (sucesso automático)"
    };

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #fff8e1; border-left: 3px solid #f9a825; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Divindade & Canalização (d8 | TR: SAB/CAR):</b><br>
- Canalizar Divindade: <span style="font-weight:bold; color:#e65100;">${canalizarQtd > 0 ? `${canalizarQtd}/Descanso Curto ou Longo` : "Bloqueado (Nv 2+)"}</span><br>
- Destruir Mortos-Vivos: <span style="font-weight:bold; color:#7e1d15;">${ndDestruir}</span><br>
- Intervenção Divina: <span style="font-weight:bold; color:#0d47a1;">${intervencaoTxt}</span><br>
- Marco Nv 8+: <span style="font-weight:bold; color:#2e7d32;">${efeitoNv8Clerigo}</span>
        <div style="margin-top:4px; border-top:1px dotted #ffe082; padding-top:4px; color:#444;">
          <b>Nível ${nivel}:</b> ${marcosClerigo[nivel] || ""}
        </div>
        <div style="font-size:8.5px; color:#555; margin-top:4px; font-style:italic;">
          * Foco de Conjuração: Símbolo Sagrado | Rituais conhecidos podem ser conjurados como ritual.
        </div>
      </div>`;
  }

  if (classe === "Bruxo (Warlock)") {
    const invTabela = [0, 2, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8];
    const qtdInv = invTabela[Math.min(19, Math.max(0, nivel - 1))] || 0;
    const slotsPactoQtd = nivel >= 17 ? 4 : (nivel >= 11 ? 3 : (nivel >= 2 ? 2 : 1));
    const nivelSlotPacto = nivel >= 9 ? "5º" : (nivel >= 7 ? "4º" : (nivel >= 5 ? "3º" : (nivel >= 3 ? "2º" : "1º")));
    const arcanasTxt = nivel >= 17 ? "6º, 7º, 8º e 9º" : (nivel >= 15 ? "6º, 7º e 8º" : (nivel >= 13 ? "6º e 7º" : (nivel >= 11 ? "6º" : "Nenhuma (Nv 11+)")));

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #f3e5f5; border-left: 3px solid #6a1b9a; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Magia de Pacto & Invocações (d8 | TR: SAB/CAR):</b><br>
- Espaços de Pacto: <span style="font-weight:bold; color:#6a1b9a;">${slotsPactoQtd} slot(s) de ${nivelSlotPacto} nível</span> (Desc. Curto/Longo)<br>
- Invocações Místicas: <span style="font-weight:bold; color:#4a148c;">${qtdInv} conhecida(s)</span>${nivel >= 3 ? " | Dádiva do Pacto (Nv 3)" : ""}<br>
- Arcana Mística: <span style="font-weight:bold; color:#7e1d15;">${arcanasTxt}</span>
        <div style="font-size:8.5px; color:#555; margin-top:4px; font-style:italic;">
          * Foco Arcano utilizável para magias de Bruxo; conjuração de ritual via Pacto do Tomo / Livro dos Segredos Antigos.
        </div>
      </div>`;
  }

  if (classe === "Bardo (Bard)") {
    const dadoInsp = nivel >= 15 ? "d12" : (nivel >= 10 ? "d10" : (nivel >= 5 ? "d8" : "d6"));
    const dadoDescanso = nivel >= 17 ? "1d12" : (nivel >= 13 ? "1d10" : (nivel >= 9 ? "1d8" : "1d6"));
    const prof = Math.floor((nivel - 1) / 4) + 2;
    const halfProf = Math.floor(prof / 2);
    const recargaInsp = nivel >= 5 ? "Descanso Curto ou Longo (Fonte de Inspiração)" : "Descanso Longo";

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #fdf6e7; border-left: 3px solid #b08d57; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Inspiração & Versatilidade (d8 | TR: DES/CAR):</b><br>
- Dado de Inspiração de Bardo: <span style="font-weight:bold; color:#7e1d15;">${dadoInsp}</span> (${recargaInsp})<br>
- Canção de Descanso (Nv 2+): <span style="font-weight:bold; color:#2e7d32;">${nivel >= 2 ? `+${dadoDescanso}` : "Bloqueada (Nv 2+)"}</span><br>
- Versatilidade (Nv 2+): <span style="font-weight:bold; color:#0d47a1;">${nivel >= 2 ? `+${halfProf} em testes sem proficiência e Iniciativa` : "Bloqueada (Nv 2+)"}</span>
        <div style="font-size:8.5px; color:#555; margin-top:4px; font-style:italic;">
          * Foco de Conjuração: Instrumento Musical | Conjuração de Ritual disponível para rituais conhecidos.
        </div>
      </div>`;
  }

  if (classe === "Monge (Monk)") {
    let dadoArtesMarciais = nivel >= 17 ? "1d10" : (nivel >= 11 ? "1d8" : (nivel >= 5 ? "1d6" : "1d4"));
    let bonusMovimento = nivel >= 18 ? "+9m" : (nivel >= 14 ? "+7,5m" : (nivel >= 10 ? "+6m" : (nivel >= 6 ? "+4,5m" : (nivel >= 2 ? "+3m" : "+0m"))));
    let detalheMovimento = nivel >= 2 ? ` e sua velocidade possui um bônus de <b>${bonusMovimento}</b>` : "";
    const pontosKiTxt = nivel >= 2 ? `${nivel}/Descanso Curto ou Longo` : "Bloqueado (Nv 2+)";
    const subLower = subclasse.toLowerCase();

    let tradicaoMongeHTML = "";
    if (nivel >= 3 && subclasse) {
      if (subLower.includes("mão aberta") || subLower.includes("open hand")) {
        tradicaoMongeHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe0b2; padding-top:4px; color:#333;"><b>Caminho da Mão Aberta (PHB):</b> Técnica da Mão Aberta (Nv 3)${nivel >= 6 ? " + Integridade Corporal" : ""}${nivel >= 11 ? " + Tranquilidade" : ""}${nivel >= 17 ? " + Palma Vibrante (3 Ki)" : ""}.</div>`;
      } else if (subLower.includes("sombra") || subLower.includes("shadow")) {
        tradicaoMongeHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe0b2; padding-top:4px; color:#333;"><b>Caminho das Sombras (PHB):</b> Artes das Sombras (2 Ki)${nivel >= 6 ? " + Passo das Sombras" : ""}${nivel >= 11 ? " + Manto das Sombras" : ""}${nivel >= 17 ? " + Oportunista" : ""}.</div>`;
      } else if (subLower.includes("quatro elementos") || subLower.includes("four elements")) {
        const maxKiDisc = nivel >= 17 ? 5 : (nivel >= 11 ? 4 : (nivel >= 6 ? 3 : 2));
        tradicaoMongeHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe0b2; padding-top:4px; color:#333;"><b>Caminho dos Quatro Elementos (PHB):</b> Disciplinas Elementais (máx. <b>${maxKiDisc} Ki</b> por disciplina).</div>`;
      } else if (subLower.includes("bêbada") || subLower.includes("drunken")) {
        tradicaoMongeHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe0b2; padding-top:4px; color:#333;"><b>Estilo do Mestre Bêbado (Xanathar):</b> Técnica Bêbada${nivel >= 6 ? " + Balanço Bêbado (1 Ki)" : ""}${nivel >= 11 ? " + Sorte do Bêbado (2 Ki)" : ""}${nivel >= 17 ? " + Frenesi do Bêbado (até 5 golpes)" : ""}.</div>`;
      } else if (subLower.includes("kensei")) {
        const qtdArmasKensei = nivel >= 17 ? 5 : (nivel >= 11 ? 4 : (nivel >= 6 ? 3 : 2));
        tradicaoMongeHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe0b2; padding-top:4px; color:#333;"><b>Estilo do Kensei (Xanathar):</b> <b>${qtdArmasKensei}</b> armas Kensei + Esquiva Rápida + Tiro do Kensei${nivel >= 6 ? " + Uno com a Lâmina" : ""}${nivel >= 11 ? " + Aguçar a Lâmina (até 3 Ki)" : ""}${nivel >= 17 ? " + Precisão Infalível" : ""}.</div>`;
      } else if (subLower.includes("alma solar") || subLower.includes("sun soul")) {
        tradicaoMongeHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe0b2; padding-top:4px; color:#333;"><b>Estilo da Alma Solar (Xanathar):</b> Raio Solar Radiante (<b>${dadoArtesMarciais}</b> radiante, 9m)${nivel >= 6 ? " + Golpe do Arco Abrasador (2+ Ki)" : ""}${nivel >= 11 ? " + Explosão Calcinante (2d6; +2d6/Ki até 3 Ki)" : ""}${nivel >= 17 ? " + Escudo Solar" : ""}.</div>`;
      } else if (subLower.includes("misericórdia") || subLower.includes("mercy")) {
        tradicaoMongeHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe0b2; padding-top:4px; color:#333;"><b>Caminho da Misericórdia (Tasha):</b> Mão de Cura & Mão de Dolo (<b>${dadoArtesMarciais}+SAB</b>)${nivel >= 6 ? " + Toque de Médico" : ""}${nivel >= 11 ? " + Torrente de Cura e Dolo" : ""}${nivel >= 17 ? " + Mão da Misericórdia Final (5 Ki)" : ""}.</div>`;
      } else if (subLower.includes("eu astral") || subLower.includes("astral")) {
        tradicaoMongeHTML = `<div style="margin-top:4px; border-top:1px dotted #ffe0b2; padding-top:4px; color:#333;"><b>Caminho do Eu Astral (Tasha):</b> Braços do Eu Astral (1 Ki; usa SAB)${nivel >= 6 ? " + Fisionomia (1 Ki)" : ""}${nivel >= 11 ? " + Corpo do Eu Astral" : ""}${nivel >= 17 ? " + Eu Astral Desperto (5 Ki)" : ""}.</div>`;
      }
    }

    const marcosMonge = {
      1: "Defesa sem Armadura (10+DES+SAB) e Artes Marciais (1d4)",
      2: "Ki (2 pontos; Curto/Longo), Movimento sem Armadura (+3m) e Arma Dedicada (Tasha)",
      3: "Tradição Monástica, Deflexão de Projéteis e Ataque Alimentado por Ki (Tasha)",
      4: "Incremento no Valor de Habilidade (ASI), Queda Lenta e Cura Acelerada (Tasha)",
      5: "Ataque Extra, Golpes Atordoantes, Dado de Artes Marciais (1d6) e Mira Focada (Tasha)",
      6: "Golpes de Ki Mágicos, Característica de Tradição e Movimento sem Armadura (+4,5m)",
      7: "Evasão e Tranquilidade / sentidos aprimorados",
      8: "Incremento no Valor de Habilidade (ASI)",
      9: "Movimento sem Armadura em superfícies verticais e líquidos",
      10: "Movimento sem Armadura (+6m) e aprimoramentos de Ki/Tradição",
      11: "Característica de Tradição e Dado de Artes Marciais (1d8)",
      12: "Incremento no Valor de Habilidade (ASI)",
      13: "Língua do Sol e da Lua (compreende e fala todos os idiomas)",
      14: "Alma de Diamante (proficiência em todos os TR; 1 Ki para repetir TR) e Movimento (+7,5m)",
      15: "Corpo Atemporal (sem necessidade de comida/água; sem envelhecimento físico)",
      16: "Incremento no Valor de Habilidade (ASI)",
      17: "Característica de Tradição e Dado de Artes Marciais (1d10)",
      18: "Passo Vazio (4 Ki invisibilidade/resistência; 8 Ki Projeção Astral) e Movimento (+9m)",
      19: "Incremento no Valor de Habilidade (ASI)",
      20: "Corpo Perfeito (4 Ki ao rolar iniciativa sem Ki restante)"
    };

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #fff3e0; border-left: 3px solid #ef6c00; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Ki & Artes Marciais (d8 | TR: FOR/DES):</b><br>
- Pontos de Ki: <span style="font-weight:bold; color:#e65100;">${pontosKiTxt}</span><br>
- Dado de Artes Marciais: <span style="font-weight:bold; color:#bf360c;">${dadoArtesMarciais}</span><br>
- Movimento Sem Armadura: <span style="font-weight:bold; color:#0d47a1;">${bonusMovimento}</span>
        ${tradicaoMongeHTML}
        <div style="margin-top:4px; border-top:1px dotted #ffcc80; padding-top:4px; color:#444;">
          <b>Nível ${nivel}:</b> ${marcosMonge[nivel] || ""}
        </div>
        <div style="font-size:8.5px; color:#558b2f; margin-top:4px; font-style:italic;">
          > <b>Artes Marciais Ativas:</b> Seu dado de ataque desarmado causa <b>${dadoArtesMarciais}</b>${detalheMovimento}!
        </div>
      </div>`;
  }

  if (classe === "Bárbaro (Barbarian)") {
    const furiasProg = [2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 99];
    const furiasQtd = furiasProg[Math.min(19, Math.max(0, nivel - 1))];
    const furiasTexto = furiasQtd === 99 ? "Ilimitado" : `${furiasQtd}/Descanso Longo`;
    let danoFuria = nivel >= 16 ? "+4" : (nivel >= 9 ? "+3" : "+2");
    let criticoBrutal = nivel >= 17 ? "+3 dados" : (nivel >= 13 ? "+2 dados" : (nivel >= 9 ? "+1 dado" : "Nenhum"));
    let movRapidoTxt = nivel >= 5 ? "+3m (sem armadura pesada)" : "Bloqueado (Requer Nível 5)";

    let tashaHTML = "";
    if (nivel >= 10) tashaHTML += `• <b>Conhecimento Primal (Tasha):</b> Você liberou <b>2 perícias bônus</b> (do nível 3 e 10). Escolha e assinale-as manualmente na sua lista de perícias!<br>`;
    else if (nivel >= 3) tashaHTML += `• <b>Conhecimento Primal (Tasha):</b> Você liberou <b>1 perícia bônus</b> (do nível 3). Escolha e assinale-a manualmente na sua lista de perícias!<br>`;
    if (nivel >= 7) tashaHTML += `• <b>Bote Instintivo (Tasha):</b> Ao entrar em fúria com ação bônus, pode mover-se até metade do deslocamento.<br>`;

    let subBarbaroHTML = "";
    const subLower = subclasse.toLowerCase();
    if (nivel >= 3 && subclasse) {
      if (subLower.includes("guardião ancestral") || subLower.includes("ancestral")) {
        const escudoDados = nivel >= 14 ? "4d6" : (nivel >= 10 ? "3d6" : (nivel >= 6 ? "2d6" : "Inativo (Nv 6+)"));
        subBarbaroHTML = `<div style="margin-top:4px; border-top:1px dotted #ffcdd2; padding-top:4px; color:#333;"><b>Guardião Ancestral (Xanathar):</b> Protetor Ancestral (Nv 3) | Escudo Espiritual: <b>${escudoDados}</b>${nivel >= 10 ? " | Consultar os Espíritos" : ""}${nivel >= 14 ? " | Ancestrais Vingativos" : ""}</div>`;
      } else if (subLower.includes("arauto da tempestade") || subLower.includes("storm herald")) {
        subBarbaroHTML = `<div style="margin-top:4px; border-top:1px dotted #ffcdd2; padding-top:4px; color:#333;"><b>Arauto da Tempestade (Xanathar):</b> Aura da Tempestade (Deserto/Mar/Tundra, 3m)${nivel >= 6 ? " | Alma da Tempestade" : ""}${nivel >= 10 ? " | Tempestade Protetora" : ""}${nivel >= 14 ? " | Tempestade Furiosa" : ""}</div>`;
      } else if (subLower.includes("fanático") || subLower.includes("zealot")) {
        subBarbaroHTML = `<div style="margin-top:4px; border-top:1px dotted #ffcdd2; padding-top:4px; color:#333;"><b>Fanático (Xanathar):</b> Fúria Divina + Guerreiro dos Deuses${nivel >= 6 ? " | Foco Fanático" : ""}${nivel >= 10 ? " | Presença Zelosa" : ""}${nivel >= 14 ? " | Fúria Além da Morte" : ""}</div>`;
      } else if (subLower.includes("fera") || subLower.includes("beast")) {
        subBarbaroHTML = `<div style="margin-top:4px; border-top:1px dotted #ffcdd2; padding-top:4px; color:#333;"><b>Trilha da Fera (Tasha):</b> Forma da Fera (Mordida/Garras/Cauda)${nivel >= 6 ? " | Alma Bestial" : ""}${nivel >= 10 ? " | Fúria Infecciosa" : ""}${nivel >= 14 ? " | Invocar a Caçada" : ""}</div>`;
      } else if (subLower.includes("magia selvagem") || subLower.includes("wild magic")) {
        subBarbaroHTML = `<div style="margin-top:4px; border-top:1px dotted #ffcdd2; padding-top:4px; color:#333;"><b>Trilha da Magia Selvagem (Tasha):</b> Percepção de Magia + Surto Selvagem (1d8)${nivel >= 6 ? " | Magia Reforçante" : ""}${nivel >= 10 ? " | Reação Instável" : ""}${nivel >= 14 ? " | Surto Controlado" : ""}</div>`;
      }
    }

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #fff5f5; border-left: 3px solid #c62828; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Fúria & Combate Brutal (d12 | TR: FOR/CON):</b><br>
- Fúrias: <span style="font-weight:bold; color:#c62828;">${furiasTexto}</span><br>
- Dano de Fúria Extra: <span style="font-weight:bold; color:#c62828;">${danoFuria}</span><br>
- Crítico Brutal: <span style="font-weight:bold; color:#b71c1c;">${criticoBrutal}</span><br>
- Defesa sem Armadura: <span style="font-weight:bold; color:#2e7d32;">10 + DES + CON</span> (+Escudo)<br>
- Movimento Rápido: <span style="font-weight:bold; color:#0d47a1;">${movRapidoTxt}</span>
        ${tashaHTML ? `<div style="margin-top:4px; border-top:1px dotted #ffcdd2; padding-top:4px; color:#555;">${tashaHTML}</div>` : ""}
        ${subBarbaroHTML}
        <div style="font-size:8.5px; color:#b71c1c; margin-top:4px; font-style:italic;">
          > <b>Estado de Fúria:</b> Seus ataques corpo a corpo com Força recebem <b>${danoFuria} no dano</b>${criticoBrutal !== "Nenhum" ? ` e seus acertos críticos rolam <b>${criticoBrutal} extra</b>` : ""}!
        </div>
      </div>`;
  }

  if (raca === "Genasi" && dadosMagiasGenasi[subraca]) {
    const elemental = dadosMagiasGenasi[subraca];
    let truquesGenasiMax = 1;
    let magiasGenasiMax = nivel >= 5 ? 2 : (nivel >= 3 ? 1 : 0);
    let truquesGenasiAtuais = 0;
    let magiasGenasiAtuais = 0;

    document.querySelectorAll(".magia-select").forEach(sel => {
      let val = sel.value;
      if (val) {
        if (val === elemental.truque) truquesGenasiAtuais++;
        if (nivel >= 3 && val === elemental.m3) magiasGenasiAtuais++;
        if (nivel >= 5 && val === elemental.m5) magiasGenasiAtuais++;
      }
    });

    let statusM3 = nivel >= 3
      ? `<span style="color:#2e7d32;">✔ <b>${elemental.m3}</b> (Liberada - 1x/Descanso Longo)</span>`
      : `<span style="color:#757575;">🔒 <b>${elemental.m3}</b> (Bloqueada - Requer Nível 3)</span>`;
    let statusM5 = nivel >= 5
      ? `<span style="color:#2e7d32;">✔ <b>${elemental.m5}</b> (Liberada - 1x/Descanso Longo)</span>`
      : `<span style="color:#757575;">🔒 <b>${elemental.m5}</b> (Bloqueada - Requer Nível 5)</span>`;

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #fffde7; border-left: 3px solid #fbc02d; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Magia Inata Genasi (${subraca.split(" ").pop()}):</b><br>
- Truques Elementais: <span style="font-weight:bold; color:${getCor(truquesGenasiAtuais, truquesGenasiMax)};">${truquesGenasiAtuais} / ${truquesGenasiMax}</span><br>
- Magias Inatas: <span style="font-weight:bold; color:${getCor(magiasGenasiAtuais, magiasGenasiMax)};">${magiasGenasiAtuais} / ${magiasGenasiMax}</span>
        <div style="margin-top: 4px; padding-top: 4px; border-top: 1px dashed #fbc02d; font-size: 9px; color: #444;">
          <b>Lista de Feitiços Genasi:</b><br>
- Truque: <span style="color:#2e7d32;">✔ <b>${elemental.truque}</b></span><br>
- 1º Círculo: ${statusM3}<br>
- 2º Círculo: ${statusM5}
        </div>
        <div style="font-size:8px; color:#555; margin-top:4px; font-style:italic;">
- Conjure sem gastar componentes materiais. Você também pode usar seus slots de classe normais se preferir. Atributo chave: INT, SAB ou CAR.
        </div>
      </div>`;
  }

  const boxConteudo = document.getElementById("conteudo-resumo-pericias");
  if (boxConteudo) {
    let genasiRowHTML = raca === "Genasi"
      ? `<div style="margin-bottom:4px;"><b>Melhorias (Genasi):</b> <span style="color:${getCor(totalGenasiUsado, 3)}">${totalGenasiUsado} / 3</span></div>`
      : "";

    boxConteudo.innerHTML = `
      ${detalhesHTML}
      <div style="margin-top:8px; padding-top:5px; border-top:1px dashed #ccc; font-size:11px;">
        ${genasiRowHTML}
        <div style="margin-bottom:4px;"><b>Melhorias:</b> <span style="color:${getCor(totalASIUsada, totalASIPermitida)}">${totalASIUsada} / ${totalASIPermitida}</span></div>
        <div style="margin-bottom:4px;"><b>Proficiências:</b> <span style="color:${getCor(totalProfMarcada, totalProfPermitida)}">${totalProfMarcada} / ${totalProfPermitida}</span></div>
        <div style="margin-bottom:4px;"><b>Especializações:</b> <span style="color:${getCor(totalExpMarcada, totalExpPermitida)}">${totalExpMarcada} / ${totalExpPermitida}</span></div>
        ${magiasHTML}
      </div>
    `;
  }
}

function atualizarRecursosClasse() {
  const c = document.getElementById("class_name").value;
  const lvl = parseInt(document.getElementById("level_val").value) || 1;
  const sub = document.getElementById("subclass_name")?.value || "";
  const container = document.getElementById("class-resources-tracker");
  const box = document.getElementById("box-recursos-classe");

  const classesComPainelExtra = [
    "Ladino (Rogue)",
    "Paladino (Paladin)",
    "Patrulheiro (Ranger)",
    "Mago (Wizard)"
  ];

  if (!recursosDB[c] && !classesComPainelExtra.includes(c)) {
    box.style.display = "none";
    ultimoEstadoRecurso = "";
    return;
  }

  const data = recursosDB[c] || {};
  let modAtual = 0;
  if (data.useAttr) {
    const score = parseInt(document.getElementById(data.useAttr + "_score").value) || 10;
    modAtual = Math.floor((score - 10) / 2);
  } else if (c === "Artífice (Artificer)" || c === "Mago (Wizard)") {
    modAtual = parseInt(document.getElementById("INT_mod").innerText) || 0;
  } else if (c === "Bruxo (Warlock)" || c === "Paladino (Paladin)") {
    modAtual = parseInt(document.getElementById("CAR_mod").innerText) || 0;
  } else if (c === "Clérigo (Cleric)" || c === "Patrulheiro (Ranger)") {
    modAtual = parseInt(document.getElementById("SAB_mod").innerText) || 0;
  }

  const estadoAtual = `${c}-${lvl}-${modAtual}-${sub}`;
  if (estadoAtual === ultimoEstadoRecurso) return;
  ultimoEstadoRecurso = estadoAtual;

  box.style.display = "block";
  let qtd = 0;
  let html = "";

  if (c === "Artífice (Artificer)") {
    const bpVal = Math.floor((lvl - 1) / 4) + 2;
    const subLower = sub.toLowerCase();

    if (lvl >= 7) {
      const usosGenio = Math.max(1, modAtual);
      html += gerarResourceRow("Lampejo de Genialidade (Desc. Longo)", usosGenio);
    }
    if (lvl >= 11) {
      const usosItem = Math.max(2, 2 * modAtual);
      html += gerarResourceRow("Item Armazenador de Magia", usosItem);
    }
    if (lvl >= 3 && (subLower.includes("alquimista") || subLower.includes("alchemist"))) {
      const qtdElixires = lvl >= 15 ? 3 : (lvl >= 6 ? 2 : 1);
      html += gerarResourceRow("Elixires Experimentais (Desc. Longo)", qtdElixires);
      if (lvl >= 9) html += gerarResourceRow("Reagentes: Restauração Menor (Longo)", Math.max(1, modAtual));
    } else if (lvl >= 3 && (subLower.includes("armeiro") || subLower.includes("armorer"))) {
      html += gerarResourceRow("Campo Defensivo (Protetor - Longo)", bpVal);
      if (lvl >= 15) html += gerarResourceRow("Puxar Reação (Protetor - Longo)", bpVal);
    } else if (lvl >= 3 && (subLower.includes("artilheiro") || subLower.includes("artillerist"))) {
      const qtdCanhoes = lvl >= 15 ? 2 : 1;
      html += gerarResourceRow("Canhão Místico (1h / Slot - Longo)", qtdCanhoes);
    } else if (lvl >= 3 && (subLower.includes("ferreiro") || subLower.includes("battle smith"))) {
      if (lvl >= 9) html += gerarResourceRow("Solavanco Arcano (Desc. Longo)", Math.max(1, modAtual));
    }
    if (lvl >= 20) {
      html += gerarResourceRow("Alma de Artífice (Reação - 1 PV)", 1);
    }

    const infConhecidas = lvl >= 18 ? 12 : (lvl >= 14 ? 10 : (lvl >= 10 ? 8 : (lvl >= 6 ? 6 : (lvl >= 2 ? 4 : 0))));
    const maxItensInfundidos = lvl >= 18 ? 6 : (lvl >= 14 ? 5 : (lvl >= 10 ? 4 : (lvl >= 6 ? 3 : (lvl >= 2 ? 2 : 0))));
    const maxSintonizacao = lvl >= 18 ? 6 : (lvl >= 14 ? 5 : (lvl >= 10 ? 4 : 3));
    const maxFunilaria = Math.max(1, modAtual);
    const maxPreparadas = Math.max(1, modAtual + Math.floor(lvl / 2));

    let detalhesArtifice = `
      <div><b>🔧 Funilaria Mágica:</b> Até <b>${maxFunilaria}</b> objeto(s) minúsculo(s) afetado(s) por vez</div>
      <div><b>📜 Magias Preparadas:</b> Até <b>${maxPreparadas}</b> magia(s) (+ magias da especialidade; rituais preparados)</div>`;

    if (lvl >= 2) {
      detalhesArtifice += `<div><b>⚙️ Infundir Item:</b> <b>${infConhecidas}</b> infusões conhecidas | Até <b>${maxItensInfundidos}</b> itens infundidos${lvl >= 9 && (subLower.includes("armeiro") || subLower.includes("armorer")) ? " (+2 itens extras da Armadura Arcana)" : ""}</div>`;
    }
    if (lvl >= 3) {
      detalhesArtifice += `<div><b>🧰 A Ferramenta Certa para o Trabalho:</b> Cria ferramentas de artesão em 1h (coincide com descanso curto/longo)</div>`;
    }
    if (lvl >= 6) {
      detalhesArtifice += `<div><b>🛠️ Especialista em Ferramenta:</b> Dobra bônus de proficiência em testes com ferramentas proficientes</div>`;
    }
    detalhesArtifice += `<div><b>💎 Sintonização Máxima:</b> Até <b>${maxSintonizacao}</b> item(ns) mágico(s) sintonizado(s)${lvl >= 14 ? " (ignora requisitos de classe/raça/magia/nível)" : (lvl >= 10 ? " (1/4 tempo e 1/2 ouro em comuns/incomuns)" : "")}</div>`;

    if (lvl >= 20) {
      const bonusAlma = Math.max(1, modAtual);
      detalhesArtifice += `<div><b>✨ Alma de Artífice:</b> <b>+${bonusAlma}</b> em todas as salvaguardas por item sintonizado</div>`;
    }
    if (lvl >= 3 && (subLower.includes("alquimista") || subLower.includes("alchemist"))) {
      const qtdElixires = lvl >= 15 ? 3 : (lvl >= 6 ? 2 : 1);
      detalhesArtifice += `<div><b>🧪 Alquimista:</b> <b>${qtdElixires}</b> elixir(es) experimental(is) ao fim do descanso longo${lvl >= 5 ? ` | Sábio Alquímico: +${Math.max(1, modAtual)} (INT) em cura ou dano ácido/ígneo/necrótico/venenoso` : ""}${lvl >= 9 ? ` | Reagentes: +2d6+${Math.max(1, modAtual)} PV temp.` : ""}${lvl >= 15 ? " | Maestria Química: resist. ácido/veneno e imune a envenenado" : ""}</div>`;
    } else if (lvl >= 3 && (subLower.includes("armeiro") || subLower.includes("armorer"))) {
      detalhesArtifice += `<div><b>🛡️ Armeiro:</b> Armadura Arcana (Protetor ou Infiltrador; usa INT nos ataques da arma especial)${lvl >= 5 ? " | Ataque Extra (2 ataques)" : ""}${lvl >= 9 ? " | Modificações de Armadura (+2 itens infundidos na armadura)" : ""}${lvl >= 15 ? " | Armadura Aperfeiçoada" : ""}</div>`;
    } else if (lvl >= 3 && (subLower.includes("artilheiro") || subLower.includes("artillerist"))) {
      const qtdCanhoes = lvl >= 15 ? 2 : 1;
      const dadoCanhao = lvl >= 9 ? "3d8" : "2d8";
      detalhesArtifice += `<div><b>💣 Artilheiro:</b> Canhão Místico (até <b>${qtdCanhoes}</b>; <b>${dadoCanhao}</b> base/protetor 1d8+INT; PV = 5x nível)${lvl >= 5 ? " | Arma de Fogo Arcana (+1d8 dano de magia)" : ""}${lvl >= 9 ? " | Canhão Explosivo (3d8 em 6m)" : ""}${lvl >= 15 ? " | Posição Fortificada (meia cobertura a 3m)" : ""}</div>`;
    } else if (lvl >= 3 && (subLower.includes("ferreiro") || subLower.includes("battle smith"))) {
      const pvDefensor = 2 + modAtual + (lvl * 5);
      const caDefensor = lvl >= 15 ? 17 : 15;
      detalhesArtifice += `<div><b>🐺 Ferreiro de Batalha:</b> Defensor de Aço (PV: <b>${pvDefensor}</b>, CA <b>${caDefensor}</b>; usa INT em armas mágicas)${lvl >= 5 ? " | Ataque Extra (2 ataques)" : ""}${lvl >= 9 ? ` | Solavanco Arcano (${lvl >= 15 ? "4d6" : "2d6"})` : ""}${lvl >= 15 ? ` | Defensor Aprimorado (reação 1d4+${modAtual} energético)` : ""}</div>`;
    }

    html += `
      <div style="font-size: 9.5px; color: var(--text-main); margin-top: 6px; padding: 6px 8px; background: var(--surface-muted); border-left: 2.5px solid var(--gold); border-radius: var(--radius-sm); line-height: 1.4;">
        ${detalhesArtifice}
      </div>`;
  } else if (c === "Mago (Wizard)") {
    const bpVal = Math.floor((lvl - 1) / 4) + 2;
    const maxNiveisRec = Math.ceil(lvl / 2);
    const subLower = sub.toLowerCase();

    html += gerarResourceRow(`Recuperação Arcana (${maxNiveisRec} níveis - Desc. Longo)`, 1);

    if (lvl >= 2 && (subLower.includes("lâmina cantante") || subLower.includes("bladesinging"))) {
      html += gerarResourceRow("Canção da Lâmina (Desc. Longo)", bpVal);
    } else if (lvl >= 2 && (subLower.includes("escribas") || subLower.includes("scribes"))) {
      html += gerarResourceRow("Livro Desperto: Ritual Rápido (Longo)", 1);
      if (lvl >= 6) html += gerarResourceRow("Manifestar Mente: Conjurar (Dia)", bpVal);
      if (lvl >= 14) html += gerarResourceRow("Uno com o Mundo (Desc. Longo)", 1);
    } else if (lvl >= 2 && (subLower.includes("guerra") || subLower.includes("war"))) {
      if (lvl >= 6) html += gerarResourceRow("Surto de Poder (Máx.)", Math.max(1, modAtual));
    }

    if (lvl >= 18) {
      html += gerarResourceRow("Assinatura de Magia (2 magias 3º - Curto/Longo)", 2);
    }

    let detalhesMago = `
      <div><b>📖 Grimório & Rituais:</b> Conjura magias de ritual do grimório mesmo sem prepará-las</div>
      <div><b>🔮 Recuperação Arcana:</b> 1x/Descanso Longo em Descanso Curto, recupere espaços até <b>${maxNiveisRec} níveis</b> combinados (máx. 5º círculo)</div>`;

    if (lvl >= 3) {
      detalhesMago += `<div><b>✍️ Fórmulas de Truque (Tasha):</b> Pode trocar 1 truque de mago conhecido ao fim de um Descanso Longo</div>`;
    }
    if (lvl >= 2 && sub) {
      if (subLower.includes("lâmina cantante") || subLower.includes("bladesinging")) {
        detalhesMago += `<div><b>⚔️ Lâmina Cantante (Tasha):</b> Canção da Lâmina (bônus ação: +${Math.max(1, modAtual)} CA, +3m desloc., vantagem Acrobacia, +${Math.max(1, modAtual)} TR CON concentração; sem armadura média/pesada ou escudo)${lvl >= 6 ? " | Ataque Extra (pode substituir 1 ataque por truque)" : ""}${lvl >= 10 ? " | Canção de Defesa (5x círculo)" : ""}${lvl >= 14 ? ` | Canção da Vitória (+${Math.max(1, modAtual)} dano corpo a corpo)` : ""}</div>`;
      } else if (subLower.includes("escribas") || subLower.includes("scribes")) {
        detalhesMago += `<div><b>📜 Ordem dos Escribas (Tasha):</b> Pena Mágica + Livro de Magias Desperto (foco, troca tipo de dano por magia do mesmo círculo no grimório)${lvl >= 6 ? " | Manifestar Mente" : ""}${lvl >= 10 ? " | Mestre Escrivão (pergaminho +1 círculo)" : ""}${lvl >= 14 ? " | Uno com o Mundo (vantagem Arcanismo; reação salva dano)" : ""}</div>`;
      } else if (subLower.includes("guerra") || subLower.includes("war")) {
        detalhesMago += `<div><b>🛡️ Mago de Guerra (Xanathar):</b> Deflexão Arcana (+2 CA ou +4 TR na reação; só truques até fim do próximo turno) e Astúcia Tática (+${modAtual} Iniciativa)${lvl >= 6 ? ` | Surto de Poder (+${Math.floor(lvl / 2)} energético)` : ""}${lvl >= 10 ? " | Magia Duradoura (+2 CA e TR concentrando)" : ""}${lvl >= 14 ? ` | Blindagem Defletora (${Math.floor(lvl / 2)} energético até 3 alvos)` : ""}</div>`;
      } else {
        detalhesMago += `<div><b>🏛️ Tradição Arcana:</b> ${sub}</div>`;
      }
    }
    if (lvl >= 18) {
      detalhesMago += `<div><b>✨ Assinatura de Magia:</b> 2 magias de 3º nível conjuradas 1x cada sem gastar espaço</div>`;
    }
    if (lvl >= 20) {
      detalhesMago += `<div><b>👑 Domínio de Magia:</b> 1 magia de 3º nível conjurada à vontade sem gastar espaço</div>`;
    }

    html += `
      <div style="font-size: 9.5px; color: var(--text-main); margin-top: 6px; padding: 6px 8px; background: var(--surface-muted); border-left: 2.5px solid var(--gold); border-radius: var(--radius-sm); line-height: 1.4;">
        ${detalhesMago}
      </div>`;
  } else if (c === "Patrulheiro (Ranger)") {
    const bpVal = Math.floor((lvl - 1) / 4) + 2;
    const qtdInimigosFav = lvl >= 14 ? 3 : (lvl >= 6 ? 2 : 1);
    const qtdTerrenosFav = lvl >= 10 ? 3 : (lvl >= 6 ? 2 : 1);
    const subLower = sub.toLowerCase();

    html += gerarResourceRow("Adversário Favorito (Tasha - Longo)", bpVal);
    if (lvl >= 10) html += gerarResourceRow("Incansável / Véu da Natureza (Longo)", bpVal);

    if (lvl >= 3 && (subLower.includes("horizonte") || subLower.includes("horizon"))) {
      html += gerarResourceRow("Detectar Portais (Curto/Longo)", 1);
      if (lvl >= 7) html += gerarResourceRow("Passo Etéreo (Curto/Longo)", 1);
    } else if (lvl >= 3 && (subLower.includes("exterminador") || subLower.includes("monster slayer"))) {
      html += gerarResourceRow("Sentido do Caçador (Desc. Longo)", Math.max(1, modAtual));
      html += gerarResourceRow("Exterminador de Presas (Curto/Longo)", 1);
      if (lvl >= 11) html += gerarResourceRow("Nêmesis do Conjurador (Curto/Longo)", 1);
    } else if (lvl >= 3 && (subLower.includes("feérico") || subLower.includes("fey"))) {
      if (lvl >= 15) html += gerarResourceRow("Andarilho Nebuloso (Desc. Longo)", Math.max(1, modAtual));
    } else if (lvl >= 3 && (subLower.includes("enxame") || subLower.includes("swarm"))) {
      if (lvl >= 7) html += gerarResourceRow("Maré Rodopiante (Desc. Longo)", bpVal);
      if (lvl >= 15) html += gerarResourceRow("Dispersão de Enxame (Desc. Longo)", bpVal);
    }

    let detalhesPatrulheiro = `
      <div><b>🏹 Inimigo Favorito:</b> <b>${qtdInimigosFav}</b> tipo(s) (vantagem em Sobrevivência para rastrear e Inteligência para recordar informações)</div>
      <div><b>🌲 Explorador Natural:</b> <b>${qtdTerrenosFav}</b> terreno(s) favorito(s) (bônus em viagem, navegação, forragem e furtividade)</div>`;

    if (lvl >= 2) {
      detalhesPatrulheiro += `<div><b>⚔️ Estilo de Luta:</b> PHB + Tasha (Arremesso, Combate Desarmado, Luta às Cegas; Versatilidade Marcial no Nv 4+)</div>`;
    }
    if (lvl >= 3) {
      detalhesPatrulheiro += `<div><b>🧭 Consciência Primeva:</b> Gaste 1 slot de magia para detectar tipos de criaturas a 1,6 km (9,6 km em terreno favorito) por 1 min/nível do slot</div>`;
    }
    if (lvl >= 5) {
      detalhesPatrulheiro += `<div><b>⚡ Ataque Extra:</b> <b>2</b> ataques ao usar a ação Atacar</div>`;
    }
    if (lvl >= 8) {
      detalhesPatrulheiro += `<div><b>🍃 Passo da Natureza:</b> Terreno difícil não-mágico sem custo extra; vantagem em TR contra plantas mágicas</div>`;
    }
    if (lvl >= 10) {
      detalhesPatrulheiro += `<div><b>🌫️ Sumir de Vista:</b> Ação para se esconder em cobertura/ocultação${lvl >= 10 ? " | Tasha: Incansável / Véu da Natureza" : ""}</div>`;
    }
    if (lvl >= 14) {
      detalhesPatrulheiro += `<div><b>🌿 Esconder-se à Plena Vista:</b> +10 em Furtividade parado após 1 min usando camuflagem natural</div>`;
    }
    if (lvl >= 18) {
      detalhesPatrulheiro += `<div><b>👻 Camuflagem:</b> Invisível para criaturas que não o vejam enquanto não se mover ou agir</div>`;
    }
    if (lvl >= 20) {
      detalhesPatrulheiro += `<div><b>🎯 Inimigo Certeiro:</b> 1x/turno, adicione <b>+${modAtual} (SAB)</b> ao ataque ou dano contra um Inimigo Favorito</div>`;
    }

    if (lvl >= 3 && sub) {
      if (subLower.includes("caçador") || subLower.includes("hunter")) {
        detalhesPatrulheiro += `<div><b>🗡️ Caçador (PHB):</b> Tática de Caçador (Nv 3)${lvl >= 7 ? " | Táticas Defensivas" : ""}${lvl >= 11 ? " | Ataques Múltiplos" : ""}${lvl >= 15 ? " | Defesa Superior" : ""}</div>`;
      } else if (subLower.includes("besta") || subLower.includes("beast")) {
        const bonusComp = bpVal;
        detalhesPatrulheiro += `<div><b>🐺 Mestre das Bestas (PHB/Tasha):</b> Companheiro Bestial / Fera Primal (soma <b>+${bonusComp}</b> BP)${lvl >= 7 ? " | Treinamento Excepcional" : ""}${lvl >= 11 ? " | Fúria Bestial" : ""}${lvl >= 15 ? " | Compartilhar Magias" : ""}</div>`;
      } else if (subLower.includes("obscuro") || subLower.includes("gloom")) {
        detalhesPatrulheiro += `<div><b>🌑 Perseguidor Obscuro (Xanathar):</b> Emboscador Terrível (+SAB Iniciativa; +1 ataque/1d8 no 1º turno) e Visão Umbral${lvl >= 7 ? " | Mente de Ferro" : ""}${lvl >= 11 ? " | Agitação Perseguidora" : ""}${lvl >= 15 ? " | Evasiva Sombria" : ""}</div>`;
      } else if (subLower.includes("horizonte") || subLower.includes("horizon")) {
        const dadoPlanar = lvl >= 11 ? "2d8" : "1d8";
        detalhesPatrulheiro += `<div><b>🌀 Andarilho do Horizonte (Xanathar):</b> Detectar Portais e Guerreiro Planar (<b>${dadoPlanar}</b> energético)${lvl >= 7 ? " | Passo Etéreo" : ""}${lvl >= 11 ? " | Ataque Distante" : ""}${lvl >= 15 ? " | Defesa Espectral" : ""}</div>`;
      } else if (subLower.includes("exterminador") || subLower.includes("monster slayer")) {
        detalhesPatrulheiro += `<div><b>🐉 Exterminador de Monstros (Xanathar):</b> Sentido do Caçador e Exterminador de Presas (+1d6)${lvl >= 7 ? " | Defesa Sobrenatural (+1d6)" : ""}${lvl >= 11 ? " | Nêmesis do Conjurador" : ""}${lvl >= 15 ? " | Contra-Ataque do Exterminador" : ""}</div>`;
      } else if (subLower.includes("feérico") || subLower.includes("fey")) {
        const dadoFeerico = lvl >= 11 ? "1d6" : "1d4";
        detalhesPatrulheiro += `<div><b>🧚 Andarilho Feérico (Tasha):</b> Golpes Terríveis (<b>${dadoFeerico}</b> psíquico) e Glamour Transcendental${lvl >= 7 ? " | Detalhe Sedutor" : ""}${lvl >= 11 ? " | Reforços Feéricos" : ""}${lvl >= 15 ? " | Andarilho Nebuloso" : ""}</div>`;
      } else if (subLower.includes("enxame") || subLower.includes("swarm")) {
        const dadoEnxame = lvl >= 11 ? "1d8" : "1d6";
        detalhesPatrulheiro += `<div><b>🐝 Protetor do Enxame (Tasha):</b> Enxame Reunido (<b>${dadoEnxame}</b> perfurante/empurrar/deslocar)${lvl >= 7 ? " | Maré Rodopiante (voo 3m)" : ""}${lvl >= 11 ? " | Enxame Poderoso" : ""}${lvl >= 15 ? " | Dispersão de Enxame" : ""}</div>`;
      }
    }

    html += `
      <div style="font-size: 9.5px; color: var(--text-main); margin-top: 6px; padding: 6px 8px; background: var(--surface-muted); border-left: 2.5px solid var(--gold); border-radius: var(--radius-sm); line-height: 1.4;">
        ${detalhesPatrulheiro}
      </div>`;
  } else if (c === "Paladino (Paladin)") {
    const usosSentido = Math.max(1, 1 + modAtual);
    const bpVal = Math.floor((lvl - 1) / 4) + 2;
    const subLower = sub.toLowerCase();

    html += gerarResourceRow("Sentido Divino (Desc. Longo)", usosSentido);

    qtd = data.progression ? (data.progression[lvl - 1] || 0) : 0;
    if (qtd > 0) {
      html += gerarResourceRow(`${data.label} (Curto/Longo)`, qtd);
    }

    if (lvl >= 3) {
      const usosAmearlhar = lvl >= 15 ? 3 : (lvl >= 7 ? 2 : 1);
      const maxCirculoRec = Math.ceil(bpVal / 2);
      html += gerarResourceRow(`Amealhar Poder Divino (Tasha - ≤${maxCirculoRec}º - Longo)`, usosAmearlhar);
    }

    if (lvl >= 14) {
      html += gerarResourceRow("Toque Purificador (Desc. Longo)", Math.max(1, modAtual));
    }

    if (lvl >= 3 && (subLower.includes("glória") || subLower.includes("glory"))) {
      if (lvl >= 15) html += gerarResourceRow("Defesa Gloriosa (Desc. Longo)", Math.max(1, modAtual));
      if (lvl >= 20) html += gerarResourceRow("Lenda Viva (1x/Longo ou 5º slot)", 1);
    } else if (lvl >= 3 && (subLower.includes("vigilantes") || subLower.includes("watchers"))) {
      if (lvl >= 20) html += gerarResourceRow("Baluarte Mortal (1x/Longo ou 5º slot)", 1);
    } else if (lvl >= 3 && (subLower.includes("conquista") || subLower.includes("conquest"))) {
      if (lvl >= 20) html += gerarResourceRow("Conquistador Invencível (Desc. Longo)", 1);
    } else if (lvl >= 3 && (subLower.includes("redenção") || subLower.includes("redemption"))) {
      if (lvl >= 20) html += gerarResourceRow("Emissário da Redenção (Desc. Longo)", 1);
    }

    const reservaCura = lvl * 5;
    const alcanceAura = lvl >= 18 ? "9m" : "3m";
    const bonusAura = Math.max(1, modAtual);

    let detalhesPaladino = `
      <div><b>❤️ Cura pelas Mãos:</b> Reserva de <b>${reservaCura} PV</b> (5 pts/doença ou veneno)</div>`;

    if (lvl >= 2) {
      detalhesPaladino += `<div><b>⚡ Destruição Divina:</b> <b>2d8</b> radiante (1º slot) +1d8/nível acima (máx. 5d8; +1d8 morto-vivo/corruptor)</div>`;
    }
    if (lvl >= 3) {
      detalhesPaladino += `<div><b>🛡️ Saúde Divina:</b> Imune a doenças</div>`;
    }
    if (lvl >= 6) {
      detalhesPaladino += `<div><b>✨ Aura de Proteção:</b> <b>+${bonusAura} (CAR)</b> em TR para você e aliados a até <b>${alcanceAura}</b></div>`;
    }
    if (lvl >= 10) {
      detalhesPaladino += `<div><b>🦁 Aura da Coragem:</b> Você e aliados a até <b>${alcanceAura}</b> não podem ser amedrontados</div>`;
    }
    if (lvl >= 11) {
      detalhesPaladino += `<div><b>⚔️ Destruição Divina Aprimorada:</b> <b>+1d8</b> de dano radiante extra ao acertar com arma corpo a corpo</div>`;
    }
    if (lvl >= 3 && sub) {
      if (subLower.includes("devoção") || subLower.includes("devotion")) {
        detalhesPaladino += `<div><b>☀️ Juramento da Devoção (PHB):</b> Canalizar Divindade: Arma Sagrada (+CAR no ataque) ou Expulsar o Profano${lvl >= 7 ? " | Aura de Devoção (imune a encanto, 3m/9m)" : ""}${lvl >= 15 ? " | Proteção Contra o Mal e o Bem" : ""}${lvl >= 20 ? " | Avatar Invencível (10 min)" : ""}</div>`;
      } else if (subLower.includes("anciões") || subLower.includes("ancients")) {
        detalhesPaladino += `<div><b>🌿 Juramento dos Anciões (PHB):</b> Canalizar Divindade: Ira da Natureza${lvl >= 7 ? " | Aura de Proteção Contra Magias (resistência a dano de magias, 3m/9m)" : ""}${lvl >= 15 ? " | Sentinela Imortal" : ""}${lvl >= 20 ? " | Campeão Ancião (1 min)" : ""}</div>`;
      } else if (subLower.includes("vingança") || subLower.includes("vengeance")) {
        detalhesPaladino += `<div><b>🗡️ Juramento da Vingança (PHB):</b> Canalizar Divindade: Voto de Inimizade ou Abjurar o Inimigo${lvl >= 7 ? " | Vingador Implacável" : ""}${lvl >= 15 ? " | Alma da Vingança" : ""}${lvl >= 20 ? " | Vingador (asas, 1h)" : ""}</div>`;
      } else if (subLower.includes("conquista") || subLower.includes("conquest")) {
        detalhesPaladino += `<div><b>🏴 Juramento da Conquista (Xanathar):</b> Presença Conquistadora ou Ataque Guiado (+10)${lvl >= 7 ? ` | Aura da Conquista (desloc. 0 e ${Math.floor(lvl / 2)} psíquico em amedrontados, ${alcanceAura})` : ""}${lvl >= 15 ? ` | Repreensão Arrogante (${bonusAura} psíquico)` : ""}${lvl >= 20 ? " | Conquistador Invencível" : ""}</div>`;
      } else if (subLower.includes("redenção") || subLower.includes("redemption")) {
        detalhesPaladino += `<div><b>🕊️ Juramento da Redenção (Xanathar):</b> Emissário da Paz (+5 Persuasão) ou Repreendendo a Violência${lvl >= 7 ? ` | Aura do Guardião (transfere dano, ${alcanceAura})` : ""}${lvl >= 15 ? ` | Espírito Protetor (1d6+${Math.floor(lvl / 2)} PV se < metade PV)` : ""}${lvl >= 20 ? " | Emissário da Redenção" : ""}</div>`;
      } else if (subLower.includes("glória") || subLower.includes("glory")) {
        detalhesPaladino += `<div><b>🏆 Juramento da Glória (Tasha):</b> Atleta Inigualável ou Destruição Inspiradora (2d8+${lvl} PV temp.)${lvl >= 7 ? " | Aura de Vivacidade (+3m)" : ""}${lvl >= 15 ? " | Defesa Gloriosa" : ""}${lvl >= 20 ? " | Lenda Viva" : ""}</div>`;
      } else if (subLower.includes("vigilantes") || subLower.includes("watchers")) {
        detalhesPaladino += `<div><b>👁️ Juramento dos Vigilantes (Tasha):</b> Vontade do Vigilante ou Abjurar o Extraplanar${lvl >= 7 ? ` | Aura do Sentinela (+${bpVal} Iniciativa, ${alcanceAura})` : ""}${lvl >= 15 ? ` | Repprimenda Vigilante (2d8+${modAtual} energético)` : ""}${lvl >= 20 ? " | Baluarte Mortal" : ""}</div>`;
      }
    }

    html += `
      <div style="font-size: 9.5px; color: var(--text-main); margin-top: 6px; padding: 6px 8px; background: var(--surface-muted); border-left: 2.5px solid var(--gold); border-radius: var(--radius-sm); line-height: 1.4;">
        ${detalhesPaladino}
      </div>`;
  } else if (c === "Ladino (Rogue)") {
    const bpVal = Math.floor((lvl - 1) / 4) + 2;
    const sabMod = Math.floor(((parseInt(document.getElementById("SAB_score")?.value) || 10) - 10) / 2);
    const subLower = sub.toLowerCase();

    if (lvl >= 20) {
      html += gerarResourceRow("Golpe de Sorte (Desc. Curto/Longo)", 1);
    }

    if (lvl >= 3 && (subLower.includes("adaga espiritual") || subLower.includes("soulknife"))) {
      const facePsi = lvl >= 17 ? "d12" : (lvl >= 11 ? "d10" : (lvl >= 5 ? "d8" : "d6"));
      html += gerarResourceRow(`Dados de Energia Psiônica (${facePsi} - Longo)`, 2 * bpVal);
    } else if (lvl >= 3 && (subLower.includes("fantasma") || subLower.includes("phantom"))) {
      html += gerarResourceRow("Lamentos da Sepultura (Desc. Longo)", bpVal);
      if (lvl >= 9) html += gerarResourceRow("Bugigangas da Alma (Máx.)", bpVal);
    } else if (lvl >= 3 && (subLower.includes("inquiridor") || subLower.includes("inquisitive"))) {
      if (lvl >= 13) html += gerarResourceRow("Olhar Inflexível (Desc. Longo)", Math.max(1, sabMod));
    } else if (lvl >= 3 && (subLower.includes("espadachim") || subLower.includes("swashbuckler"))) {
      if (lvl >= 17) html += gerarResourceRow("Mestre Duelista (Curto/Longo)", 1);
    }

    const dadosFurtivo = Math.ceil(lvl / 2);
    const qtdEspecializacao = lvl >= 6 ? 4 : 2;

    let detalhesLadino = `
      <div><b>🗡️ Ataque Furtivo:</b> <b>${dadosFurtivo}d6</b> extras (1x/turno com vantagem, aliado adjacente ou regra do arquétipo)</div>
      <div><b>🎯 Especialização:</b> Dobra proficiência em <b>${qtdEspecializacao}</b> perícias/ferramentas de ladrão</div>`;

    if (lvl >= 2) {
      detalhesLadino += `<div><b>⚡ Ação Ardilosa:</b> Disparada, Desengajar ou Esconder como ação bônus</div>`;
    }
    if (lvl >= 3) {
      detalhesLadino += `<div><b>🎯 Mira Firme (Tasha):</b> Ação bônus para vantagem no próximo ataque (sem mover neste turno; deslocamento 0 até fim do turno)</div>`;
    }
    if (lvl >= 5) {
      detalhesLadino += `<div><b>🛡️ Esquiva Sobrenatural:</b> Reação reduz dano de ataque visível à metade</div>`;
    }
    if (lvl >= 7) {
      detalhesLadino += `<div><b>💨 Evasão:</b> Sucesso em TR de DES contra efeito de metade do dano anula o dano</div>`;
    }
    if (lvl >= 11) {
      detalhesLadino += `<div><b>🎲 Talento Confiável:</b> d20 ≤ 9 conta como <b>10</b> em testes com proficiência</div>`;
    }
    if (lvl >= 14) {
      detalhesLadino += `<div><b>👁️ Sentido Cego:</b> Detecta criaturas escondidas/invisíveis a até 3m (se puder ouvir)</div>`;
    }
    if (lvl >= 15) {
      detalhesLadino += `<div><b>🧠 Mente Escorregadia:</b> Proficiência em salvaguardas de Sabedoria</div>`;
    }
    if (lvl >= 18) {
      detalhesLadino += `<div><b>🌑 Elusivo:</b> Nenhum ataque tem vantagem contra você (enquanto não incapacitado)</div>`;
    }

    if (lvl >= 3 && sub) {
      if (subLower.includes("trapaceiro") || subLower.includes("arcane trickster")) {
        detalhesLadino += `<div><b>🔮 Trapaceiro Arcano:</b> Conjuração (INT) | Mãos Mágicas Malabaristas (3m, invisível)${lvl >= 9 ? " | Emboscada Mágica" : ""}${lvl >= 13 ? " | Versátil com Truques" : ""}${lvl >= 17 ? " | Ladrão de Magias" : ""}</div>`;
      } else if (subLower.includes("assassino") || subLower.includes("assassin")) {
        detalhesLadino += `<div><b>☠️ Assassino:</b> Assassinar (vantagem contra quem ainda não agiu; crítico automático em surpresos)${lvl >= 9 ? " | Especialização em Infiltração" : ""}${lvl >= 13 ? " | Impostor" : ""}${lvl >= 17 ? " | Golpe Letal (TR CON ou dano dobrado em surpreso)" : ""}</div>`;
      } else if (subLower.includes("ladrão") || subLower.includes("thief")) {
        detalhesLadino += `<div><b>🗝️ Ladrão:</b> Mãos Rápidas e Andarilho de Telhados${lvl >= 9 ? " | Furtividade Suprema" : ""}${lvl >= 13 ? " | Usar Instrumento Mágico" : ""}${lvl >= 17 ? " | Reflexos de Ladrão (2 turnos na 1ª rodada)" : ""}</div>`;
      } else if (subLower.includes("inquiridor") || subLower.includes("inquisitive")) {
        detalhesLadino += `<div><b>🔍 Inquiridor:</b> Ouvir do Enganador, Olhar do Detalhe e Combatente Perspicaz${lvl >= 9 ? " | Olhar Constante" : ""}${lvl >= 13 ? " | Olhar Inflexível" : ""}${lvl >= 17 ? " | Olhar da Fraqueza (+3d6 Ataque Furtivo)" : ""}</div>`;
      } else if (subLower.includes("mentor") || subLower.includes("mastermind")) {
        detalhesLadino += `<div><b>🎭 Mentor:</b> Mestre da Intriga e Mestre de Tática (Ação Ajuda bônus até 9m)${lvl >= 9 ? " | Manipulador Perspicaz" : ""}${lvl >= 13 ? " | Redirecionar" : ""}${lvl >= 17 ? " | Alma do Enganador" : ""}</div>`;
      } else if (subLower.includes("batedor") || subLower.includes("scout")) {
        detalhesLadino += `<div><b>🌲 Batedor:</b> Escaramuça e Sobrevivente (especialização em Natureza e Sobrevivência)${lvl >= 9 ? " | Mobilidade Superior (+3m)" : ""}${lvl >= 13 ? " | Mestre da Emboscada" : ""}${lvl >= 17 ? " | Golpe Súbito (ataque bônus)" : ""}</div>`;
      } else if (subLower.includes("espadachim") || subLower.includes("swashbuckler")) {
        detalhesLadino += `<div><b>⚔️ Espadachim:</b> Passo Elegante e Audácia Devassa (+CAR na Iniciativa; Furtivo em duelo 1x1)${lvl >= 9 ? " | Penachar" : ""}${lvl >= 13 ? " | Manobra Elegante" : ""}${lvl >= 17 ? " | Mestre Duelista" : ""}</div>`;
      } else if (subLower.includes("adaga espiritual") || subLower.includes("soulknife")) {
        detalhesLadino += `<div><b>✨ Adaga Espiritual (Tasha):</b> Lâminas Psíquicas (1d6+MOD / 1d4 bônus; alcance 18m)${lvl >= 9 ? " | Lâminas da Alma" : ""}${lvl >= 13 ? " | Véu Psíquico" : ""}${lvl >= 17 ? " | Rasgar Mente (TR SAB ou Atordoado)" : ""}</div>`;
      } else if (subLower.includes("fantasma") || subLower.includes("phantom")) {
        detalhesLadino += `<div><b>👻 Fantasma (Tasha):</b> Sussurros dos Mortos + Lamentos da Sepultura (${Math.ceil(dadosFurtivo / 2)}d6 necrótico em 2º alvo)${lvl >= 9 ? " | Símbolos Daqueles Que Partiram" : ""}${lvl >= 13 ? " | Caminhada Fantasma" : ""}${lvl >= 17 ? " | Amigo da Morte" : ""}</div>`;
      }
    }

    html += `
      <div style="font-size: 9.5px; color: var(--text-main); margin-top: 6px; padding: 6px 8px; background: var(--surface-muted); border-left: 2.5px solid var(--gold); border-radius: var(--radius-sm); line-height: 1.4;">
        ${detalhesLadino}
      </div>`;
  } else if (data.customWarlock) {
    const bpVal = Math.floor((lvl - 1) / 4) + 2;
    const subLower = sub.toLowerCase();
    if (subLower.includes("arquifada") || subLower.includes("archfey")) {
      html += gerarResourceRow("Presença Feérica (Desc. Curto/Longo)", 1);
      if (lvl >= 6) html += gerarResourceRow("Névoa de Fuga (Desc. Curto/Longo)", 1);
      if (lvl >= 14) html += gerarResourceRow("Delírio Sombrio (Desc. Curto/Longo)", 1);
    } else if (subLower.includes("ínfero") || subLower.includes("corruptor") || subLower.includes("fiend")) {
      if (lvl >= 6) html += gerarResourceRow("Sorte do Próprio Obscuro (Curto/Longo)", 1);
      if (lvl >= 14) html += gerarResourceRow("Lançar no Inferno (Desc. Longo)", 1);
    } else if (subLower.includes("grande antigo") || subLower.includes("great old one")) {
      if (lvl >= 6) html += gerarResourceRow("Proteção Entrópica (Desc. Curto/Longo)", 1);
    } else if (subLower.includes("celestial")) {
      html += gerarResourceRow("Iluminação Curativa (d6 - Desc. Longo)", 1 + lvl);
      if (lvl >= 14) html += gerarResourceRow("Vingança Ardente (Desc. Longo)", 1);
    } else if (subLower.includes("lâmina maldita") || subLower.includes("hexblade")) {
      html += gerarResourceRow("Maldição da Lâmina Maldita (Curto/Longo)", 1);
      if (lvl >= 6) html += gerarResourceRow("Espectro Amaldiçoado (Desc. Longo)", 1);
    } else if (subLower.includes("gênio") || subLower.includes("genie")) {
      html += gerarResourceRow("Trégua Engarrafada (Desc. Longo)", 1);
      if (lvl >= 6) html += gerarResourceRow("Presente Elemental (Desc. Longo)", bpVal);
      if (lvl >= 14) html += gerarResourceRow("Desejo Limitado (1d4 Desc. Longos)", 1);
    } else if (subLower.includes("insondável") || subLower.includes("fathomless")) {
      html += gerarResourceRow("Tentáculo das Profundezas (Desc. Longo)", bpVal);
      if (lvl >= 14) html += gerarResourceRow("Mergulhar no Insondável (Curto/Longo)", 1);
    }

    if (lvl >= 11) html += gerarResourceRow("Arcana Mística (6º Nível)", 1);
    if (lvl >= 13) html += gerarResourceRow("Arcana Mística (7º Nível)", 1);
    if (lvl >= 15) html += gerarResourceRow("Arcana Mística (8º Nível)", 1);
    if (lvl >= 17) html += gerarResourceRow("Arcana Mística (9º Nível)", 1);
    if (lvl >= 20) html += gerarResourceRow("Mestre Místico (1 min - Desc. Longo)", 1);

    const invTabela = [0, 2, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8];
    const qtdInvocacoes = invTabela[lvl - 1] || 0;
    const nivelSlotPacto = lvl >= 9 ? "5º" : (lvl >= 7 ? "4º" : (lvl >= 5 ? "3º" : (lvl >= 3 ? "2º" : "1º")));

    let magiasPatronoTxt = "";
    if (subLower.includes("arquifada") || subLower.includes("archfey")) {
      magiasPatronoTxt = "1º: Fogo das Fadas, Sono | 2º: Acalmar Emoções, Força Fantasmagórica | 3º: Piscar, Ampliar Plantas | 4º: Dominar Besta, Invisibilidade Maior | 5º: Dominar Pessoa, Similaridade";
    } else if (subLower.includes("ínfero") || subLower.includes("corruptor") || subLower.includes("fiend")) {
      magiasPatronoTxt = "1º: Mãos Flamejantes, Comando | 2º: Cegueira/Surdez, Raio Ardente | 3º: Bola de Fogo, Névoa Fétida | 4º: Escudo de Fogo, Muralha de Fogo | 5º: Coluna de Chamas, Santificar";
    } else if (subLower.includes("grande antigo") || subLower.includes("great old one")) {
      magiasPatronoTxt = "1º: Sussurros Dissonantes, Riso Histérico de Tasha | 2º: Detectar Pensamentos, Força Fantasmagórica | 3º: Clarividência, Enviar Mensagem | 4º: Dominar Besta, Tentáculos Negros de Evard | 5º: Dominar Pessoa, Telecinésia";
    } else if (subLower.includes("celestial")) {
      magiasPatronoTxt = "1º: Curar Ferimentos, Raio Guiador | 2º: Esfera Flamejante, Restauração Menor | 3º: Luz do Dia, Revivificar | 4º: Guardião da Fé, Muralha de Fogo | 5º: Coluna de Chamas, Restauração Maior (+Truques: Luz e Chama Sagrada)";
    } else if (subLower.includes("lâmina maldita") || subLower.includes("hexblade")) {
      magiasPatronoTxt = "1º: Escudo Arcano, Destruição Colérica | 2º: Nublar, Marca da Punição | 3º: Piscar, Arma Elemental | 4º: Assassino Fantasmagórico, Destruição Estonteante | 5º: Destruição Banidora, Cone de Frio";
    } else if (subLower.includes("gênio") || subLower.includes("genie")) {
      magiasPatronoTxt = "1º: Detectar o Bem e o Mal | 2º: Força Espectral | 3º: Criar Comida e Água | 4º: Assassino Fantasmagórico | 5º: Criação | 9º: Desejo (+magias elementais do Dao, Djinni, Ifriti ou Marid)";
    } else if (subLower.includes("insondável") || subLower.includes("fathomless")) {
      magiasPatronoTxt = "1º: Criar ou Destruir Água, Onda Trovejante | 2º: Lufada de Vento, Silêncio | 3º: Nevasca, Relâmpago | 4º: Controlar Água, Invocar Elemental | 5º: Cone de Frio, Mão de Bigby";
    }

    html += `
      <div style="font-size: 9.5px; color: var(--text-main); margin-top: 6px; padding: 6px 8px; background: var(--surface-muted); border-left: 2.5px solid var(--dnd-red); border-radius: var(--radius-sm); line-height: 1.4;">
        <div><b>🔮 Magia de Pacto:</b> Todos os slots são conjurados no <b>${nivelSlotPacto} Nível</b> (Recupera em Descanso Curto/Longo)</div>
        ${qtdInvocacoes > 0 ? `<div><b>📜 Invocações Místicas:</b> Você conhece <b>${qtdInvocacoes}</b> invocações</div>` : ""}
        ${lvl >= 3 ? `<div><b>🎁 Dádiva do Pacto:</b> Corrente, Lâmina, Tomo ou Talismã (Tasha)</div>` : ""}
        ${magiasPatronoTxt ? `<div style="margin-top:4px; padding-top:4px; border-top:1px dashed var(--border-strong); font-size:9px; color:var(--text-muted);"><b>Lista Expandida do Patrono:</b> ${magiasPatronoTxt}</div>` : ""}
      </div>`;
  } else if (data.perLevel) {
    qtd = lvl >= 2 ? lvl : 0;
  } else if (data.useAttr) {
    qtd = Math.max(1, modAtual);
  } else if (data.customFighter) {
    html += gerarResourceRow(`Retomar o Fôlego (1d10+${lvl} - Curto/Longo)`, 1);
    const surto = lvl >= 17 ? 2 : (lvl >= 2 ? 1 : 0);
    const indomavel = lvl >= 17 ? 3 : (lvl >= 13 ? 2 : (lvl >= 9 ? 1 : 0));
    if (surto > 0) html += gerarResourceRow("Surto de Ação (Curto/Longo)", surto);
    if (indomavel > 0) html += gerarResourceRow("Indomável (Desc. Longo)", indomavel);

    const subLower = sub.toLowerCase();
    if (lvl >= 3 && (subLower.includes("mestre de batalha") || subLower.includes("battle master"))) {
      const qtdDadosSup = lvl >= 15 ? 6 : (lvl >= 7 ? 5 : 4);
      const faceDadoSup = lvl >= 18 ? "d12" : (lvl >= 10 ? "d10" : "d8");
      html += gerarResourceRow(`Dados de Superioridade (${faceDadoSup} - Curto/Longo)`, qtdDadosSup);
    }

    const ataquesPorAcao = lvl >= 20 ? 4 : (lvl >= 11 ? 3 : (lvl >= 5 ? 2 : 1));
    let infoGuerreiro = `<div><b>⚔️ Ataques por Ação:</b> <b>${ataquesPorAcao}</b> ataque(s) ao usar a ação Atacar</div>`;
    if (lvl >= 3 && (subLower.includes("mestre de batalha") || subLower.includes("battle master"))) {
      const qtdManobras = lvl >= 15 ? 9 : (lvl >= 10 ? 7 : (lvl >= 7 ? 5 : 3));
      infoGuerreiro += `<div><b>🛡️ Manobras Conhecidas:</b> <b>${qtdManobras}</b> manobras (CD = 8 + BP + Mod. FOR ou DES)</div>`;
    } else if (lvl >= 3 && (subLower.includes("campeão") || subLower.includes("champion"))) {
      const margemCrit = lvl >= 15 ? "18–20" : "19–20";
      infoGuerreiro += `<div><b>🎯 Margem de Crítico:</b> Acerto crítico em <b>${margemCrit}</b> com armas</div>`;
    }

    html += `
      <div style="font-size: 9.5px; color: var(--text-main); margin-top: 6px; padding: 6px 8px; background: var(--surface-muted); border-left: 2.5px solid var(--gold); border-radius: var(--radius-sm); line-height: 1.4;">
        ${infoGuerreiro}
      </div>`;
  } else if (data.progression) {
    qtd = data.progression[lvl - 1] || 0;
  }

  if (qtd > 0 && !data.customFighter && !data.customArtificer && !data.customWarlock && c !== "Paladino (Paladin)") {
    let labelRecurso = data.label;
    if (c === "Druida (Druid)") labelRecurso = lvl >= 20 ? `${data.label} (Ilimitado)` : `${data.label} (Desc. Curto/Longo)`;
    else if (c === "Monge (Monk)") labelRecurso = `${data.label} (Desc. Curto/Longo)`;
    else if (c === "Clérigo (Cleric)") labelRecurso = `${data.label} (Curto/Longo)`;
    else if (c === "Bardo (Bard)") labelRecurso = `${data.label} (${lvl >= 5 ? "Curto/Longo" : "Desc. Longo"})`;
    else if (c === "Feiticeiro (Sorcerer)") labelRecurso = `${data.label} (Desc. Longo)`;
    else if (c === "Bárbaro (Barbarian)" && qtd === 99) labelRecurso = `${data.label} (Ilimitado - Desc. Longo)`;
    else if (c === "Bárbaro (Barbarian)") labelRecurso = `${data.label} (Desc. Longo)`;
    html = gerarResourceRow(labelRecurso, qtd === 99 ? 6 : qtd);
  }

  if (c === "Feiticeiro (Sorcerer)") {
    const bpVal = Math.floor((lvl - 1) / 4) + 2;
    const subLower = sub.toLowerCase();

    if (subLower.includes("selvagem") || subLower.includes("wild")) {
      html += gerarResourceRow("Marés de Caos (Desc. Longo)", 1);
    } else if (subLower.includes("alma favorecida") || subLower.includes("divine soul")) {
      html += gerarResourceRow("Favorecido pelos Deuses (Curto/Longo)", 1);
      if (lvl >= 18) html += gerarResourceRow("Recuperação Sublime (Desc. Longo)", 1);
    } else if (subLower.includes("tempestade") || subLower.includes("storm")) {
      if (lvl >= 18) html += gerarResourceRow("Alma do Vento: Compartilhar Voo (Curto/Longo)", 1);
    } else if (subLower.includes("mecânica") || subLower.includes("clockwork")) {
      html += gerarResourceRow("Restaurar Equilíbrio (Desc. Longo)", bpVal);
      if (lvl >= 14) html += gerarResourceRow("Transe da Ordem (Desc. Longo)", 1);
      if (lvl >= 18) html += gerarResourceRow("Cavalgada Mecânica (Desc. Longo)", 1);
    } else if (subLower.includes("mente aberrante") || subLower.includes("aberrant")) {
      if (lvl >= 18) html += gerarResourceRow("Implosão Envolvente (Desc. Longo)", 1);
    }

    if (lvl >= 20) {
      html += gerarResourceRow("Restauração Mística (+4 pts - Curto)", 1);
    }

    const qtdMetamagia = lvl >= 17 ? 4 : (lvl >= 10 ? 3 : (lvl >= 3 ? 2 : 0));
    let detalhesFeiticeiro = "";
    if (lvl >= 2) {
      detalhesFeiticeiro += `<div><b>⚡ Conjuração Flexível:</b> Converta pontos em slots (1º: 2 pts | 2º: 3 pts | 3º: 5 pts | 4º: 6 pts | 5º: 7 pts) ou slots em pontos (+nível).</div>`;
    }
    if (qtdMetamagia > 0) {
      detalhesFeiticeiro += `<div><b>✨ Metamágica:</b> Você possui <b>${qtdMetamagia}</b> opções escolhidas${lvl >= 4 ? " (Versatilidade de Feitiçaria opcional no Nv 4+)" : ""}.</div>`;
    }
    if (subLower.includes("dracônica") || subLower.includes("draconic")) {
      detalhesFeiticeiro += `<div><b>🐉 Resiliência Dracônica:</b> CA base <b>13 + DES</b> (sem armadura) e <b>+${lvl} PV</b> máximos${lvl >= 6 ? " | Afinidade Elemental (+CAR dano; 1 pt = resist. 1h)" : ""}${lvl >= 14 ? " | Asas de Dragão" : ""}${lvl >= 18 ? " | Presença Dracônica (5 pts)" : ""}.</div>`;
    } else if (subLower.includes("selvagem") || subLower.includes("wild")) {
      detalhesFeiticeiro += `<div><b>🎲 Magia Selvagem:</b> Surto de Magia Selvagem (d20=1) + Marés de Caos${lvl >= 6 ? " | Dobrar a Sorte (2 pts, 1d4)" : ""}${lvl >= 14 ? " | Caos Controlado (2d100)" : ""}${lvl >= 18 ? " | Bombardeio de Magia" : ""}.</div>`;
    } else if (subLower.includes("alma favorecida") || subLower.includes("divine soul")) {
      detalhesFeiticeiro += `<div><b>☀️ Alma Favorecida:</b> Acesso à lista de Clérigo + magia extra por afinidade${lvl >= 6 ? " | Cura Fortalecida (1 pt)" : ""}${lvl >= 14 ? " | Asas Transcendentais (voo 9m)" : ""}${lvl >= 18 ? ` | Recuperação Sublime (${Math.floor(lvl / 2)} / metade PV)` : ""}.</div>`;
    } else if (subLower.includes("sombras") || subLower.includes("shadow")) {
      detalhesFeiticeiro += `<div><b>🌑 Adepto das Sombras:</b> Visão no Escuro 36m + Força do Túmulo (TR CAR CD 5+dano)${lvl >= 6 ? " | Cão do Mal Presságio (3 pts)" : ""}${lvl >= 14 ? " | Caminhar nas Sombras (36m)" : ""}${lvl >= 18 ? " | Forma Umbral (6 pts)" : ""}.</div>`;
    } else if (subLower.includes("tempestade") || subLower.includes("storm")) {
      detalhesFeiticeiro += `<div><b>⛈️ Feiticeiro da Tempestade:</b> Primordial + Magia Tempestuosa (voo 3m sem ataques de oportunidade)${lvl >= 6 ? " | Coração e Guia da Tempestade" : ""}${lvl >= 14 ? " | Fúria da Tempestade" : ""}${lvl >= 18 ? " | Alma do Vento (imunidade elétrico/trovejante; voo 18m)" : ""}.</div>`;
    } else if (subLower.includes("mecânica") || subLower.includes("clockwork")) {
      detalhesFeiticeiro += `<div><b>⚙️ Alma Mecânica:</b> Magias Mecânicas + Restaurar Equilíbrio${lvl >= 6 ? " | Bastião da Lei (1–5 pts em d8s)" : ""}${lvl >= 14 ? " | Transe da Ordem (5 pts para reuso)" : ""}${lvl >= 18 ? " | Cavalgada Mecânica (7 pts para reuso)" : ""}.</div>`;
    } else if (subLower.includes("mente aberrante") || subLower.includes("aberrant")) {
      detalhesFeiticeiro += `<div><b>🧠 Mente Aberrante:</b> Magias Psiônicas + Fala Telepática${lvl >= 6 ? " | Feitiçaria Psiônica (pts sem comp.) e Defesas Psíquicas" : ""}${lvl >= 14 ? " | Revelação em Carne (1+ pts)" : ""}${lvl >= 18 ? " | Implosão Envolvente (5 pts para reuso)" : ""}.</div>`;
    }

    if (detalhesFeiticeiro) {
      html += `
        <div style="font-size: 9.5px; color: var(--text-main); margin-top: 6px; padding: 6px 8px; background: var(--surface-muted); border-left: 2.5px solid var(--gold); border-radius: var(--radius-sm); line-height: 1.4;">
          ${detalhesFeiticeiro}
        </div>`;
    }
  }

  if (c === "Druida (Druid)") {
    const subLower = sub.toLowerCase();
    const bpVal = Math.floor((lvl - 1) / 4) + 2;
    const duracaoHoras = Math.max(1, Math.floor(lvl / 2));

    if (lvl >= 2 && (subLower.includes("sonhos") || subLower.includes("dreams"))) {
      html += gerarResourceRow("Bálsamo da Corte de Verão (d6 - Longo)", lvl);
      if (lvl >= 10) html += gerarResourceRow("Caminhos Ocultos (Desc. Longo)", Math.max(1, modAtual));
      if (lvl >= 14) html += gerarResourceRow("Caminhante dos Sonhos (Desc. Longo)", 1);
    } else if (lvl >= 2 && (subLower.includes("pastor") || subLower.includes("shepherd"))) {
      html += gerarResourceRow("Espírito Totêmico (Curto/Longo)", 1);
      if (lvl >= 14) html += gerarResourceRow("Chamado de Fidelidade (Desc. Longo)", 1);
    } else if (lvl >= 2 && (subLower.includes("estrelas") || subLower.includes("stars"))) {
      html += gerarResourceRow("Mapa Estelar: Raio Guia (Desc. Longo)", bpVal);
      if (lvl >= 6) html += gerarResourceRow("Presságio Cósmico (Desc. Longo)", bpVal);
    } else if (lvl >= 2 && (subLower.includes("esporos") || subLower.includes("spores"))) {
      if (lvl >= 6) html += gerarResourceRow("Infestação Fúngica (Desc. Longo)", Math.max(1, modAtual));
    } else if (lvl >= 2 && (subLower.includes("fogo selvagem") || subLower.includes("wildfire"))) {
      if (lvl >= 10) html += gerarResourceRow("Chamas Cauterizantes (Desc. Longo)", bpVal);
      if (lvl >= 14) html += gerarResourceRow("Reviver Resplandecente (Desc. Longo)", 1);
    }

    let recNaturalTxt = "";
    if (lvl >= 2 && (subLower.includes("terra") || subLower.includes("land"))) {
      const maxNiveisRecuperar = Math.ceil(lvl / 2);
      recNaturalTxt = `<div><b>🌿 Recuperação Natural:</b> 1x/Descanso Longo, recupere espaços até <b>${maxNiveisRecuperar} níveis</b> combinados (máx. 5º círculo).</div>`;
    }
    let marcosDruidaTxt = "";
    if (lvl >= 2) {
      marcosDruidaTxt += `<div><b>🐾 Forma Selvagem:</b> Duração de <b>${duracaoHoras}h</b>${lvl >= 20 ? " (usos ilimitados + sem V/S/M sem custo)" : " (2/Desc. Curto ou Longo)"}.</div>`;
    }
    if (lvl >= 18) {
      marcosDruidaTxt += `<div><b>⏳ Corpo Atemporal & Magias da Besta:</b> Envelhece 1 ano a cada 10 anos; conjura magias de druida (V/S) na forma de besta.</div>`;
    }
    if (lvl >= 20) {
      marcosDruidaTxt += `<div><b>👑 Arquidruida:</b> Forma Selvagem ilimitada e componentes verbais, somáticos e materiais sem custo ignorados.</div>`;
    }

    html += `
      <div style="font-size: 9.5px; color: var(--text-main); margin-top: 6px; padding: 6px 8px; background: var(--surface-muted); border-left: 2.5px solid var(--gold); border-radius: var(--radius-sm); line-height: 1.4;">
        <div><b>🌱 Restrição Druídica:</b> Sem armaduras ou escudos de metal.</div>
        ${recNaturalTxt}
        ${marcosDruidaTxt}
      </div>`;
  }

  if (c === "Clérigo (Cleric)") {
    const usosSab = Math.max(1, modAtual);
    const bpVal = Math.floor((lvl - 1) / 4) + 2;
    const subLower = sub.toLowerCase();

    if (subLower.includes("luz") || subLower.includes("light")) {
      html += gerarResourceRow("Labareda Protetora (Desc. Longo)", usosSab);
    } else if (subLower.includes("tempestade") || subLower.includes("tempest")) {
      html += gerarResourceRow("Ira da Tormenta (Desc. Longo)", usosSab);
    } else if (subLower.includes("guerra") || subLower.includes("war")) {
      html += gerarResourceRow("Sacerdote da Guerra (Desc. Longo)", usosSab);
    } else if (subLower.includes("conhecimento") || subLower.includes("knowledge")) {
      if (lvl >= 17) html += gerarResourceRow("Visões do Passado (Curto/Longo)", 1);
    } else if (subLower.includes("ordem") || subLower.includes("order")) {
      if (lvl >= 6) html += gerarResourceRow("Personificação da Lei (Desc. Longo)", usosSab);
    } else if (subLower.includes("paz") || subLower.includes("peace")) {
      html += gerarResourceRow("Vínculo Encorajador (Desc. Longo)", bpVal);
    } else if (subLower.includes("crepúsculo") || subLower.includes("twilight")) {
      html += gerarResourceRow("Olhos da Noite (Compartilhar)", 1);
      if (lvl >= 6) html += gerarResourceRow("Passos do Crepúsculo (Desc. Longo)", bpVal);
    } else if (subLower.includes("sepultura") || subLower.includes("grave")) {
      html += gerarResourceRow("Olhos da Sepultura (Desc. Longo)", usosSab);
      if (lvl >= 6) html += gerarResourceRow("Sentinela na Porta da Morte (Longo)", usosSab);
    }

    if (lvl >= 2) {
      const usosAmearlhar = lvl >= 18 ? 3 : (lvl >= 6 ? 2 : 1);
      html += gerarResourceRow("Amealhar Poder Divino (Tasha - Longo)", usosAmearlhar);
    }

    if (lvl >= 10) {
      const labelIntervencao = lvl >= 20 ? "Intervenção Divina (Sucesso Auto)" : `Intervenção Divina (≤ ${lvl} no d100)`;
      html += gerarResourceRow(labelIntervencao, 1);
    }

    let infoExtraClerigo = "";
    if (lvl >= 5) {
      const ndDestruir = lvl >= 17 ? "4" : (lvl >= 14 ? "3" : (lvl >= 11 ? "2" : (lvl >= 8 ? "1" : "1/2")));
      infoExtraClerigo += `<div><b>☀️ Destruir Mortos-Vivos:</b> Destrói mortos-vivos de <b>ND ${ndDestruir} ou menor</b> ao falharem na Expulsão.</div>`;
    }
    if (lvl >= 8) {
      const dadoGolpe = lvl >= 14 ? "2d8" : "1d8";
      if (subLower.includes("conhecimento") || subLower.includes("luz") || subLower.includes("paz") || subLower.includes("sepultura")) {
        infoExtraClerigo += `<div><b>✨ Conjuração Potente:</b> Adicione <b>+${modAtual} (SAB)</b> ao dano de seus truques de clérigo.</div>`;
      } else if (subLower.includes("forja")) {
        infoExtraClerigo += `<div><b>🔨 Impacto Divino:</b> 1x/turno ao acertar com arma, cause <b>+${dadoGolpe}</b> de dano ígneo extra.</div>`;
      } else if (subLower.includes("ordem")) {
        infoExtraClerigo += `<div><b>⚖️ Golpe Divino:</b> 1x/turno ao acertar com arma, cause <b>+${dadoGolpe}</b> de dano psíquico extra.</div>`;
      } else if (sub) {
        infoExtraClerigo += `<div><b>⚔️ Golpe Divino:</b> 1x por turno ao acertar com arma, cause <b>+${dadoGolpe}</b> de dano extra.</div>`;
      }
    }
    if (lvl >= 1) {
      if (subLower.includes("forja")) {
        infoExtraClerigo += `<div><b>🔥 Bênção da Forja:</b> +1 em arma ou armadura não mágica até Descanso Longo${lvl >= 6 ? " | Alma da Forja (+1 CA em armadura pesada; resist. fogo)" : ""}${lvl >= 17 ? " | Santo da Forja e Fogo (imunidade fogo)" : ""}.</div>`;
      } else if (subLower.includes("ordem")) {
        infoExtraClerigo += `<div><b>📜 Voz da Autoridade:</b> Magia de 1º+ nível em aliado permite a ele reação de ataque corpo a corpo.</div>`;
      } else if (subLower.includes("crepúsculo")) {
        infoExtraClerigo += `<div><b>🌙 Santuário Crepuscular (Nv 2+):</b> Esfera de 9m com meia-luz; PV temp. (1d6+nível) ou encerra encantamento/medo.</div>`;
      }
    }

    if (infoExtraClerigo) {
      html += `
        <div style="font-size: 9.5px; color: var(--text-main); margin-top: 6px; padding: 6px 8px; background: var(--surface-muted); border-left: 2.5px solid var(--gold); border-radius: var(--radius-sm); line-height: 1.4;">
          ${infoExtraClerigo}
        </div>`;
    }
  }

  if (c === "Bárbaro (Barbarian)") {
    const danoFuria = lvl >= 16 ? "+4" : (lvl >= 9 ? "+3" : "+2");
    html += `
      <div style="margin-top: 6px; padding: 6px 8px; background: var(--accent-soft); border: 1px solid var(--accent-border); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: space-between;">
        <label for="check-furia-ativa" style="margin:0; cursor:pointer; color:var(--dnd-red); font-weight:700; display:flex; align-items:center; gap:6px;">
          <input type="checkbox" id="check-furia-ativa" onchange="calcular()" style="margin:0;">
          🔥 Fúria Ativa (${danoFuria} Dano)
        </label>
        <span style="font-size: 9px; color: var(--text-muted);">Resist. Fís.</span>
      </div>`;
  }

  if (c === "Bardo (Bard)") {
    const dadoInsp = lvl >= 15 ? "d12" : (lvl >= 10 ? "d10" : (lvl >= 5 ? "d8" : "d6"));
    const dadoDescanso = lvl >= 17 ? "1d12" : (lvl >= 13 ? "1d10" : (lvl >= 9 ? "1d8" : "1d6"));
    const halfProf = Math.floor((Math.floor((lvl - 1) / 4) + 2) / 2);
    const qtdAptidao = lvl >= 10 ? 4 : (lvl >= 3 ? 2 : 0);
    const subLower = sub.toLowerCase();

    if (subLower.includes("eloquência") && lvl >= 6) {
      html += gerarResourceRow("Idioma Universal (Desc. Longo)", 1);
      if (lvl >= 14) html += gerarResourceRow("Inspiração Infecciosa (Desc. Longo)", Math.max(1, modAtual));
    } else if (subLower.includes("glamour") && lvl >= 3) {
      html += gerarResourceRow("Performance Deslumbrante (Curto/Longo)", 1);
      if (lvl >= 6) html += gerarResourceRow("Manto de Majestade (Desc. Longo)", 1);
      if (lvl >= 14) html += gerarResourceRow("Majestade Inquebrável (Curto/Longo)", 1);
    } else if (subLower.includes("sussurros") && lvl >= 3) {
      html += gerarResourceRow("Palavras de Terror (Curto/Longo)", 1);
      if (lvl >= 6) html += gerarResourceRow("Manto de Sussurros (Curto/Longo)", 1);
      if (lvl >= 14) html += gerarResourceRow("Conhecimento das Sombras (Desc. Longo)", 1);
    }

    let detalhesBardo = `
      <div><b>🎵 Inspiração de Bardo:</b> Dado <b>${dadoInsp}</b> (${lvl >= 5 ? "Recupera em Descanso Curto/Longo" : "Recupera em Descanso Longo"})</div>`;
    if (lvl >= 2) {
      detalhesBardo += `<div><b>🎭 Versatilidade:</b> +<b>${halfProf}</b> automático em perícias sem proficiência e Iniciativa</div>`;
      detalhesBardo += `<div><b>🎶 Canção de Descanso:</b> +<b>${dadoDescanso}</b> PV extras ao gastar Dados de Vida no Descanso Curto</div>`;
    }
    if (qtdAptidao > 0) {
      detalhesBardo += `<div><b>🎯 Aptidão:</b> Dobra proficiência em <b>${qtdAptidao}</b> perícia(s)</div>`;
    }
    if (lvl >= 20) {
      detalhesBardo += `<div><b>👑 Inspiração Superior:</b> Recupera 1 uso de Inspiração ao rolar iniciativa sem usos restantes</div>`;
    }

    html += `
      <div style="font-size: 9.5px; color: var(--text-main); margin-top: 6px; padding: 6px 8px; background: var(--surface-muted); border-left: 2.5px solid var(--gold); border-radius: var(--radius-sm); line-height: 1.4;">
        ${detalhesBardo}
      </div>`;
  }

  if (c === "Monge (Monk)") {
    let dadoArtesMarciais = "1d4";
    if (lvl >= 17) dadoArtesMarciais = "1d10";
    else if (lvl >= 11) dadoArtesMarciais = "1d8";
    else if (lvl >= 5) dadoArtesMarciais = "1d6";

    let bonusMov = "+0m";
    if (lvl >= 18) bonusMov = "+9m";
    else if (lvl >= 14) bonusMov = "+7,5m";
    else if (lvl >= 10) bonusMov = "+6m";
    else if (lvl >= 6) bonusMov = "+4,5m";
    else if (lvl >= 2) bonusMov = "+3m";

    const subLower = sub.toLowerCase();
    if (lvl >= 3 && (subLower.includes("misericórdia") || subLower.includes("mercy"))) {
      if (lvl >= 17) html += gerarResourceRow("Mão da Misericórdia Final (Longo)", 1);
    } else if (lvl >= 3 && (subLower.includes("eu astral") || subLower.includes("astral"))) {
      if (lvl >= 17) html += gerarResourceRow("Eu Astral Desperto (5 Ki - 10 min)", 1);
    } else if (lvl >= 3 && (subLower.includes("bêbada") || subLower.includes("drunken"))) {
      if (lvl >= 11) html += gerarResourceRow("Sorte do Bêbado (2 Ki/uso)", 1);
    } else if (lvl >= 3 && (subLower.includes("alma solar") || subLower.includes("sun soul"))) {
      if (lvl >= 17) html += gerarResourceRow("Escudo Solar (Reação: 5+SAB)", 1);
    }

    let recursosMongeHTML = `
      <div style="font-size: 9.5px; color: var(--text-main); margin-top: 6px; padding: 6px 8px; background: var(--surface-muted); border-left: 2.5px solid var(--gold); border-radius: var(--radius-sm); line-height: 1.4;">
        <div><b>🥋 Artes Marciais:</b> Dado <b>${dadoArtesMarciais}</b> | Sem armadura: CA <b>10 + DES + SAB</b></div>
        ${lvl >= 2 ? `<div><b>🏃 Movimento sem Armadura:</b> <b>${bonusMov}</b> (sem armadura ou escudo)${lvl >= 9 ? " | Paredes e líquidos" : ""}</div>` : ""}
        ${lvl >= 3 ? `<div><b>🏹 Deflexão de Projéteis:</b> Reação reduz dano em <b>1d10 + DES + nível</b> (1 Ki para contra-atacar)</div>` : ""}
        ${lvl >= 4 ? `<div><b>🪶 Queda Lenta:</b> Reação reduz dano de queda em até <b>${lvl * 5} PV</b></div>` : ""}
        ${lvl >= 5 ? `<div><b>⚡ Ataque Extra & Golpes Atordoantes:</b> 2 ataques/ação | 1 Ki ao acertar corpo a corpo (TR CON ou Atordoado)</div>` : ""}
        ${lvl >= 6 ? `<div><b>✨ Golpes de Ki Mágicos:</b> Ataques desarmados e armas de monge contam como mágicos</div>` : ""}
        ${lvl >= 7 ? `<div><b>💨 Evasão & Tranquilidade (Nv 11):</b> TR DES sem dano no sucesso${lvl >= 11 ? " | Tranquilidade (Santuário automático após descanso longo)" : ""}</div>` : ""}
        ${lvl >= 14 ? `<div><b>💎 Alma de Diamante:</b> Proficiência em todos os TR (1 Ki para repetir TR)</div>` : ""}
        ${lvl >= 15 ? `<div><b>⏳ Corpo Atemporal:</b> Sem necessidade de comida/água; não envelhece fisicamente</div>` : ""}
        ${lvl >= 18 ? `<div><b>👻 Passo Vazio:</b> 4 Ki (Invisibilidade/Resistência 1 min) ou 8 Ki (Projeção Astral)</div>` : ""}
        ${lvl >= 20 ? `<div><b>👑 Corpo Perfeito:</b> 4 Ki ao rolar iniciativa sem Ki restante</div>` : ""}
      </div>`;

    let tashaHTML = "";
    if (lvl >= 2) {
      tashaHTML += `• <b>Arma Dedicada (Tasha):</b> 1 arma simples/marcial proficiente (sem pesada/especial) vira arma de monge após descanso curto/longo.<br>`;
    }
    if (lvl >= 3) {
      tashaHTML += `• <b>Ataque Alimentado por Ki (Tasha):</b> Gastar 1+ Ki na ação libera ataque desarmado ou com arma de monge como ação bônus.<br>`;
    }
    if (lvl >= 4) {
      tashaHTML += `• <b>Cura Acelerada (Tasha):</b> Ação + 2 Ki recupera <b>${dadoArtesMarciais} + BP</b> PV.<br>`;
    }
    if (lvl >= 5) {
      tashaHTML += `• <b>Mira Focada (Tasha):</b> Ao errar ataque, gaste 1–3 Ki para ganhar <b>+2/Ki</b> na jogada.<br>`;
    }
    if (tashaHTML) {
      recursosMongeHTML += `
        <div style="font-size: 9px; color: #4e342e; margin-top: 4px; padding: 5px 6px; background: #efebe9; border-left: 2px solid #d84315; text-align: left; line-height: 1.3; border-radius: var(--radius-sm);">
          <b>Recursos Opcionais (Tasha):</b><br>
          ${tashaHTML}
        </div>`;
    }

    html += recursosMongeHTML;
  }

  if (c === "Monge (Monk)" && lvl >= 3) {
    let maxKiDisc = 2;
    if (lvl >= 17) maxKiDisc = 5;
    else if (lvl >= 11) maxKiDisc = 4;
    else if (lvl >= 6) maxKiDisc = 3;

    const mongeSubclassesDB = {
      "mão aberta": `<b>Técnica da Mão Aberta (Nível 3):</b> Ao acertar uma criatura com a <i>Rajada de Golpes</i>, aplique 1 efeito (sem custo extra de Ki):<br>- Salvaguarda de DES ou cai Caído (Derrubado).<br>- Salvaguarda de FOR ou é Empurrado até 4,5 metros para longe de você.<br>- Perde a capacidade de usar Reações até o fim do seu próximo turno.`,
      "sombra": `<b>Artes das Sombras (Nível 3):</b> Como uma ação, gaste 2 pontos de Ki para conjurar as seguintes magias sem necessidade de componentes materiais:<br>- <i>Escuridão (Darkness)</i>, <i>Passos Sem Pegadas (Pass Without Trace)</i>, <i>Silêncio (Silence)</i> ou <i>Visão Escura (Darkvision)</i>.`,
      "quatro elementos": `<b>Disciplinas Elementais (Nível 3):</b> Você canaliza o Ki para conjurar magias e efeitos elementais aprendidos.<br>- <b>Limite de Gasto:</b> O limite máximo de Ki que você pode gastar em uma única disciplina neste nível é de <b>${maxKiDisc} pontos</b>.`,
      "eu astral": `<b>Braços do Eu Astral (Nível 3):</b> Como uma ação bônus, gaste 1 ponto de Ki para evocar os braços espectrais por 10 minutos:<br>- Seus testes de FOR e salvaguardas de FOR podem usar seu modificador de SAB.<br>- Seus Ataques Desarmados ganham +1,5m de alcance extra e causam dano do tipo Força.`,
      "misericórdia": `<b>Mão da Cura & Harmonia (Nível 3):</b> Manipulação da energia vital através de Ki:<br>- <b>Mão da Cura:</b> Gaste 1 ponto de Ki (Ação ou Bônus na Rajada) para curar um aliado em 1 Dado de Artes Marciais + mod SAB.<br>- <b>Mão da Harmonia:</b> Gaste 1 ponto de Ki ao acertar um ataque desarmado para infligir dano necrótico extra igual a 1 Dado de Artes Marciais + mod SAB.`,
      "kensei": `<b>Artes do Kensei (Nível 3):</b> Técnicas exclusivas com suas armas Kensei escolhidas:<br>- <b>Defesa Ágil:</b> Se fizer um ataque desarmado na sua ação de Ataque empunhando uma arma Kensei corpo a corpo, ganha +2 na CA até o início do seu próximo turno.<br>- <b>Disparo do Kensei:</b> Use uma ação bônus para adicionar +1d4 de dano do mesmo tipo da arma a todos os seus ataques à distância neste turno.`,
      "bêbada": `<b>Técnica do Mestre Bêbado (Nível 3):</b> Benefícios de estilo de luta fluído e imprevisível:<br>- <b>Técnica do Mestre Bêbado:</b> Sempre que usar a <i>Rajada de Golpes</i>, você ganha automaticamente os benefícios da ação Desengajar e seu deslocamento aumenta em 3 metros até o fim do turno.<br>- <b>Proficiências Bônus:</b> Você ganha proficiência na perícia Atuação (Performance) e com ferramentas de cervejeiro.`,
      "alma solar": `<b>Forma do Sol Radiante (Nível 3):</b> Você canaliza seu ki em rajadas incandescentes de luz mística:<br>- <b>Raio do Sol Radiante:</b> Você pode substituir seus ataques desarmados por um ataque mágico à distância (alcance 9m) que causa dano Radiante igual ao seu Dado de Artes Marciais + modificador de DES.<br>- Ao usar essa ação no seu turno, você pode gastar 1 ponto de Ki para fazer dois desses ataques adicionais como uma ação bônus.`
    };

    let infoSub = "";
    for (const chave in mongeSubclassesDB) {
      if (sub.toLowerCase().includes(chave)) {
        infoSub = mongeSubclassesDB[chave];
        break;
      }
    }
    if (infoSub) {
      html += `<div style="font-size: 9px; color: #1b5e20; margin-top: 5px; padding: 5px; background: #e8f5e9; border-left: 2px solid #4caf50; line-height: 1.3; text-align: left;">${infoSub}</div>`;
    }
  }

  if (c === "Bárbaro (Barbarian)" && lvl >= 3) {
    const bpVal = Math.floor((lvl - 1) / 4) + 2;
    const conMod = Math.floor(((parseInt(document.getElementById("CON_score")?.value) || 10) - 10) / 2);
    const carMod = Math.floor(((parseInt(document.getElementById("CAR_score")?.value) || 10) - 10) / 2);
    let subLower = sub.toLowerCase();

    if ((subLower.includes("fera") || subLower.includes("beast")) && lvl >= 10) {
      html += gerarResourceRow(`Fúria Infecciosa (CD ${8 + bpVal + conMod} - Constituição)`, bpVal);
    } else if (subLower.includes("magia selvagem") || subLower.includes("wild magic")) {
      html += gerarResourceRow("Percepção de Magia", bpVal);
      if (lvl >= 6) html += gerarResourceRow("Magia Reforçante", bpVal);
    } else if (subLower.includes("fanático") || subLower.includes("zelote") || subLower.includes("zealot")) {
      let danoZelote = 1 + Math.floor(lvl / 2);
      html += `<div style="font-size: 9px; color: #7f0000; margin-top: 5px; padding: 5px; background: #ffebee; border-left: 2px solid #d32f2f; line-height: 1.3; text-align: left;"><b>Fúria Divina (Nível 3):</b> O primeiro alvo que você atingir com uma arma em cada um de seus turnos sofre <b>1d6 + ${danoZelote}</b> de dano extra (radiante ou necrótico).</div>`;
    } else if (subLower.includes("arauto da tempestade") || subLower.includes("storm herald")) {
      let desertoDmg = lvl >= 20 ? 6 : (lvl >= 15 ? 5 : (lvl >= 10 ? 4 : (lvl >= 5 ? 3 : 2)));
      let marDmg = lvl >= 20 ? "4d6" : (lvl >= 15 ? "3d6" : (lvl >= 10 ? "2d6" : "1d6"));
      let tundraPv = lvl >= 20 ? 6 : (lvl >= 15 ? 5 : (lvl >= 10 ? 4 : (lvl >= 5 ? 3 : 2)));
      const cdMar = 8 + bpVal + conMod;
      html += `<div style="font-size: 9px; color: #0d47a1; margin-top: 5px; padding: 5px; background: #e3f2fd; border-left: 2px solid #2196f3; line-height: 1.3; text-align: left;"><b>Aura da Tempestade (Nível 3):</b> Aura ativa de 3 metros. Escolha seu ambiente:<br>- <b>Deserto:</b> Inimigos na área sofrem <b>${desertoDmg}</b> de dano de fogo automático.<br>- <b>Mar:</b> Uma criatura faz TR de Destreza (<b>CD ${cdMar}</b>) ou sofre <b>${marDmg}</b> de eletricidade (metade se passar).<br>- <b>Tundra:</b> Seus aliados na área ganham <b>${tundraPv}</b> PV temporários.</div>`;
    } else if ((subLower.includes("furioso") || subLower.includes("berserker")) && lvl >= 10) {
      html += `<div style="font-size: 9px; color: #3e2723; margin-top: 5px; padding: 5px; background: #efebe9; border-left: 2px solid #795548; line-height: 1.3; text-align: left;"><b>Presença Intimidante (Nível 10):</b> Use uma ação para amedrontar uma criatura a até 9 metros. <br>- <b>CD de Salvaguarda:</b> Sabedoria <b>CD ${8 + bpVal + carMod} - Carisma</b>.</div>`;
    }
  }

  container.innerHTML = html || "<small style='color:gray'>Nenhum recurso neste nível.</small>";
}

function gerarResourceRow(label, qtd) {
  if (qtd === 99) return `<div><label>${label}</label><span style="font-size:12px; color:var(--dnd-red)">∞ Uso Ilimitado</span></div>`;
  let checks = "";
  for (let i = 0; i < qtd; i++) {
    checks += `<input type="checkbox" style="width:14px; height:14px; margin:0;">`;
  }
  return `
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding-bottom:4px;">
      <label style="margin:0; flex:1; color:#333;">${label}</label>
      <div class="circles" style="display:flex; gap:4px; flex-wrap:wrap; justify-content:flex-end; max-width:120px;">${checks}</div>
    </div>`;
}