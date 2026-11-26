// Variáveis globais de banco de dados (populadas via JSON)
let attrs = [];
let skills = [];
let proficienciasFixasDB = { backgrounds: {}, racas: {} };
let slotsDB = {};
let goldByBackgroundDB = {};
let defsDND = {};

let mecanicasPHB = {
  races: {},
  subraces: {},
  classes: {},
  backgrounds: {},
  subclassesMecanicas: {}
};

let possibleSubraces = {};
let dadosMagiasGenasi = {};
let nomesDb = {};
let antecedentesData = {};
let talentosPHB = {};
let idiomasDB = [];
let regrasIdiomas = { races: {}, subraces: {}, classes: {}, backgrounds: {} };
let infusoesLista = [];
let infusoesDB_Desc = {};

let armadurasPHB_Lista = [];
let proficienciasArmaduraDB = {};
let armadurasDB = {};
let armasDB = {};
let equipamentosDB = {};
let startingEquipmentDB = {};

let recursosDB = {};
let labelsSubclasses = {};
let magiasSubclasseDB = {};
let progressoClasses = {};
let magiasDB = {};

let dataPHB = {
  languages: {},
  races: {},
  subraces: {},
  classes: {},
  subclasses: {},
  backgrounds: {},
  alignments: {}
};

let regrasPericiasDND = {
  classes: {},
  racas: {},
  expertise: {
    "Ladino (Rogue)": (lvl) => (lvl >= 6 ? 4 : (lvl >= 1 ? 2 : 0)),
    "Bardo (Bard)": (lvl) => (lvl >= 10 ? 4 : (lvl >= 3 ? 2 : 0)),
    "Patrulheiro (Ranger)": (lvl) => (lvl >= 1 ? 1 : 0)
  },
  especiais: [
    {
      nome: "Bardo (Conhecimento)",
      check: (c, s, l) => c === "Bardo (Bard)" && s.includes("Colégio do Conhecimento") && l >= 3,
      bonusPericia: 3,
      bonusExpertise: 0
    },
    {
      nome: "Ladino (Escoteiro)",
      check: (c, s, l) => c === "Ladino (Rogue)" && s.includes("Batedor") && l >= 3,
      bonusPericia: 2,
      bonusExpertise: 2
    },
    {
      nome: "Clérigo (Conhecimento)",
      check: (c, s, l) => c === "Clérigo (Cleric)" && s.includes("Domínio do Conhecimento"),
      bonusPericia: 2,
      bonusExpertise: 2
    }
  ]
};

async function carregarBancoDeDados() {
  try {
    const [
      regrasBase,
      racas,
      antecedentes,
      talentosIdiomas,
      equipamentos,
      classes,
      magias
    ] = await Promise.all([
      fetch("data/regras_base.json").then(r => r.json()),
      fetch("data/racas.json").then(r => r.json()),
      fetch("data/antecedentes.json").then(r => r.json()),
      fetch("data/talentos_idiomas.json").then(r => r.json()),
      fetch("data/equipamentos.json").then(r => r.json()),
      fetch("data/classes.json").then(r => r.json()),
      fetch("data/magias.json").then(r => r.json())
    ]);

    // 1. Regras Base
    attrs = regrasBase.attrs || [];
    skills = regrasBase.skills || [];
    proficienciasFixasDB = regrasBase.proficienciasFixasDB || { backgrounds: {}, racas: {} };
    slotsDB = regrasBase.slotsDB || {};
    goldByBackgroundDB = regrasBase.goldByBackgroundDB || {};
    defsDND = regrasBase.defsDND || {};
    dataPHB.alignments = regrasBase.alignments || {};
    if (regrasBase.regrasPericias) {
      regrasPericiasDND.classes = regrasBase.regrasPericias.classes || {};
      regrasPericiasDND.racas = regrasBase.regrasPericias.racas || {};
    }

    // 2. Raças
    mecanicasPHB.races = racas.mecanicas?.races || {};
    mecanicasPHB.subraces = racas.mecanicas?.subraces || {};
    possibleSubraces = racas.possibleSubraces || {};
    dadosMagiasGenasi = racas.dadosMagiasGenasi || {};
    dataPHB.races = racas.descricoes?.races || {};
    dataPHB.subraces = racas.descricoes?.subraces || {};
    nomesDb = racas.nomesDb || {};

    // 3. Antecedentes
    mecanicasPHB.backgrounds = antecedentes.mecanicas || {};
    dataPHB.backgrounds = antecedentes.descricoes || {};
    antecedentesData = antecedentes.personalidade || {};

    // 4. Talentos, Idiomas e Infusões
    talentosPHB = talentosIdiomas.talentos || {};
    idiomasDB = talentosIdiomas.idiomas?.lista || [];
    dataPHB.languages = talentosIdiomas.idiomas?.descricoes || {};
    regrasIdiomas = talentosIdiomas.idiomas?.regrasAutomaticas || { races: {}, subraces: {}, classes: {}, backgrounds: {} };
    infusoesLista = talentosIdiomas.infusoes?.lista || [];
    infusoesDB_Desc = talentosIdiomas.infusoes?.descricoes || {};

    // 5. Equipamentos
    armadurasPHB_Lista = equipamentos.armadurasPHB_Lista || [];
    proficienciasArmaduraDB = equipamentos.proficienciasArmaduraDB || {};
    armadurasDB = equipamentos.armadurasDB || {};
    armasDB = equipamentos.armasDB || {};
    equipamentosDB = equipamentos.equipamentosDB || {};
    startingEquipmentDB = equipamentos.startingEquipmentDB || {};

    // 6. Classes
    mecanicasPHB.classes = classes.mecanicas?.classes || {};
    mecanicasPHB.subclassesMecanicas = classes.mecanicas?.subclassesMecanicas || {};
    recursosDB = classes.recursosDB || {};
    labelsSubclasses = classes.labelsSubclasses || {};
    magiasSubclasseDB = classes.magiasSubclasseDB || {};
    dataPHB.classes = classes.descricoes?.classes || {};
    dataPHB.subclasses = classes.descricoes?.subclasses || {};
    progressoClasses = classes.progressoClasses || {};

    // 7. Magias
    magiasDB = magias || {};

    return true;
  } catch (err) {
    console.error("Erro fatal ao carregar arquivos JSON:", err);
    alert("Erro ao carregar o banco de dados (JSON). Certifique-se de rodar o projeto através de um servidor local (como o Live Server do VS Code) e não diretamente via file://.");
    return false;
  }
}