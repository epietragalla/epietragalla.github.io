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
    notaClasseHTML = `Apenas a partir do Nível 2. Magias fixas da lista de Patrulheiro. Distribuição livre entre os círculos liberados pelo nível do personagem.`;
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

  if (classe === "Monge (Monk)") {
    let dadoArtesMarciais = nivel >= 17 ? "1d10" : (nivel >= 11 ? "1d8" : (nivel >= 5 ? "1d6" : "1d4"));
    let bonusMovimento = nivel >= 18 ? "+9m" : (nivel >= 14 ? "+7,5m" : (nivel >= 10 ? "+6m" : (nivel >= 6 ? "+4,5m" : (nivel >= 2 ? "+3m" : "+0m"))));
    let detalheMovimento = nivel >= 2 ? ` e sua velocidade possui um bônus de <b>${bonusMovimento}</b>` : "";
    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #f1f8e9; border-left: 3px solid #7cb342; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Artes Marciais & Movimento:</b><br>
        - Dado de Artes Marciais: <span style="font-weight:bold; color:#e65100;">${dadoArtesMarciais}</span><br>
        - Movimento Sem Armadura: <span style="font-weight:bold; color:#0d47a1;">${bonusMovimento}</span>
        <div style="font-size:8.5px; color:#558b2f; margin-top:4px; font-style:italic;">
          > <b>Artes Marciais Ativas:</b> Seu dado de ataque desarmado causa <b>${dadoArtesMarciais}</b>${detalheMovimento}!
        </div>
      </div>`;
  }

  if (classe === "Bárbaro (Barbarian)") {
    let danoFuria = nivel >= 16 ? "+4" : (nivel >= 9 ? "+3" : "+2");
    let criticoBrutal = nivel >= 17 ? "+3 dados" : (nivel >= 13 ? "+2 dados" : (nivel >= 9 ? "+1 dado" : "Nenhum"));
    let tashaHTML = "";
    if (nivel >= 10) tashaHTML = `• <b>Conhecimento Primal (Tasha):</b> Você liberou <b>2 perícias bônus</b> (do nível 3 e 10). Escolha e assinale-as manualmente na sua lista de perícias!<br>`;
    else if (nivel >= 3) tashaHTML = `• <b>Conhecimento Primal (Tasha):</b> Você liberou <b>1 perícia bônus</b> (do nível 3). Escolha e assinale-a manualmente na sua lista de perícias!<br>`;

    magiasHTML += `
      <div style="margin-top: 6px; padding: 6px; background-color: #fff5f5; border-left: 3px solid #c62828; font-size: 10px; color: #222; line-height: 1.4; text-align: left;">
        <b>Fúria & Combate Brutal:</b><br>
        - Dano de Fúria Extra: <span style="font-weight:bold; color:#c62828;">${danoFuria}</span><br>
        - Crítico Brutal: <span style="font-weight:bold; color:#b71c1c;">${criticoBrutal}</span>
        ${tashaHTML ? `<div style="margin-top:4px; border-top:1px dotted #ffcdd2; padding-top:4px; color:#555;">${tashaHTML}</div>` : ""}
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

  if (!recursosDB[c]) {
    box.style.display = "none";
    ultimoEstadoRecurso = "";
    return;
  }

  const data = recursosDB[c];
  let modAtual = 0;
  if (data.useAttr) {
    const score = parseInt(document.getElementById(data.useAttr + "_score").value) || 10;
    modAtual = Math.floor((score - 10) / 2);
  } else if (c === "Artífice (Artificer)") {
    modAtual = parseInt(document.getElementById("INT_mod").innerText) || 0;
  }

  const estadoAtual = `${c}-${lvl}-${modAtual}-${sub}`;
  if (estadoAtual === ultimoEstadoRecurso) return;
  ultimoEstadoRecurso = estadoAtual;

  box.style.display = "block";
  let qtd = 0;
  let html = "";

  if (data.customArtificer) {
    if (lvl >= 7) html += gerarResourceRow("Lampejo de Gênio (Flash of Genius)", Math.max(1, modAtual));
    if (lvl >= 11) html += gerarResourceRow("Item de Armazenar Magia (Spell-Storing Item)", Math.max(2, 2 * modAtual));
  } else if (data.perLevel) {
    qtd = lvl >= 2 ? lvl : 0;
  } else if (data.useAttr) {
    qtd = Math.max(1, modAtual);
  } else if (data.customFighter) {
    const surto = lvl >= 17 ? 2 : (lvl >= 2 ? 1 : 0);
    const indomavel = lvl >= 17 ? 3 : (lvl >= 13 ? 2 : (lvl >= 9 ? 1 : 0));
    if (surto > 0) html += gerarResourceRow("Surto de Ação", surto);
    if (indomavel > 0) html += gerarResourceRow("Indomável", indomavel);
  } else {
    qtd = data.progression[lvl - 1];
  }

  if (qtd > 0 && !data.customFighter && !data.customArtificer) {
    html = gerarResourceRow(data.label, qtd);
  }

  if (c === "Monge (Monk)") {
    let dadoArtesMarciais = lvl >= 17 ? "1d10" : (lvl >= 11 ? "1d8" : (lvl >= 5 ? "1d6" : "1d4"));
    let tashaHTML = "";
    if (lvl >= 3) tashaHTML += `• <b>Ataque Focado em Ki:</b> Se você gastou Ki na ação principal, você ganha um ataque desarmado com ação bônus.<br>`;
    if (lvl >= 4) tashaHTML += `• <b>Cura Focalizada:</b> Gaste 2 pontos de Ki para rolar seu Dado de Artes Marciais (<b>${dadoArtesMarciais}</b>) + Bônus de Proficiência e recuperar essa quantidade de PV.<br>`;
    if (tashaHTML) {
      html += `<div style="font-size: 9px; color: #4e342e; margin-top: 4px; padding: 4px; background: #efebe9; border-left: 2px solid #d84315; text-align: left; line-height: 1.3;"><b>Recursos Opcionais (Tasha):</b><br>${tashaHTML}</div>`;
    }
  }

  if (c === "Monge (Monk)" && lvl >= 3) {
    let maxKiDisc = lvl >= 17 ? 5 : (lvl >= 11 ? 4 : (lvl >= 6 ? 3 : 2));
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