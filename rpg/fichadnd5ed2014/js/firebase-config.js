const firebaseConfig = {
  apiKey: "AIzaSyCdkD7w5cuCzRPg_sZnOnQ71a7r_en5dJU",
  authDomain: "fichadnd5ed2014.firebaseapp.com",
  projectId: "fichadnd5ed2014",
  storageBucket: "fichadnd5ed2014.firebasestorage.app",
  messagingSenderId: "833978799616",
  appId: "1:833978799616:web:b02008fa1c8a3b0ec32ae5"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  const guestEl = document.getElementById("auth-status-guest");
  const userEl = document.getElementById("auth-status-user");
  const emailDisplay = document.getElementById("user-email-display");

  if (user) {
    if (guestEl) guestEl.style.display = "none";
    if (userEl) userEl.style.display = "flex";
    if (emailDisplay) emailDisplay.innerText = " " + user.email;
  } else {
    if (guestEl) guestEl.style.display = "block";
    if (userEl) userEl.style.display = "none";
  }
});

function abrirModalAuth(tipo) {
  const modal = document.getElementById("auth-modal");
  const titulo = document.getElementById("modal-title");
  const btn = document.getElementById("auth-submit-btn");

  modal.style.display = "block";
  if (tipo === "login") {
    titulo.innerText = "Entrar no Cofre";
    btn.onclick = () => logar();
  } else {
    titulo.innerText = "Criar Nova Conta";
    btn.onclick = () => cadastrar();
  }
}

async function cadastrar() {
  const email = document.getElementById("auth-email").value;
  const pass = document.getElementById("auth-pass").value;
  try {
    await auth.createUserWithEmailAndPassword(email, pass);
    alert("Conta criada! Agora você pode salvar suas fichas.");
    document.getElementById("auth-modal").style.display = "none";
  } catch (e) {
    alert("Erro: " + e.message);
  }
}

async function logar() {
  const email = document.getElementById("auth-email").value;
  const pass = document.getElementById("auth-pass").value;
  try {
    await auth.signInWithEmailAndPassword(email, pass);
    document.getElementById("auth-modal").style.display = "none";
  } catch (e) {
    alert("Erro: " + e.message);
  }
}

async function deslogar() {
  if (!confirm("Tem certeza que deseja sair de sua conta? A tela e a ficha atual serão limpas.")) {
    return;
  }
  try {
    await auth.signOut();
    resetarCamposFichaParaPadrao();
  } catch (e) {
    alert("Erro ao sair: " + e.message);
  }
}

async function abrirGaleriaNuvem() {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const snapshot = await db.collection("users").doc(user.uid).collection("fichas").get();
    const select = document.getElementById("nuvem-select");
    select.innerHTML = "";

    if (snapshot.empty) {
      alert("Nenhuma ficha encontrada na nuvem.");
      return;
    }
    snapshot.forEach(doc => {
      let opt = document.createElement("option");
      opt.value = doc.id;
      opt.innerText = doc.id;
      select.appendChild(opt);
    });
    document.getElementById("gallery-modal").style.display = "block";
  } catch (e) {
    alert("Erro ao listar fichas: " + e.message);
  }
}

async function confirmarCargaNuvem() {
  const user = auth.currentUser;
  const nomeFicha = document.getElementById("nuvem-select").value;
  if (!nomeFicha || !user) return;
  try {
    const doc = await db.collection("users").doc(user.uid).collection("fichas").doc(nomeFicha).get();
    if (doc.exists) {
      const d = doc.data();
      carregarDadosNaFicha(d);
      document.getElementById("gallery-modal").style.display = "none";
      alert("Ficha '" + nomeFicha + "' carregada da nuvem!");
    }
  } catch (e) {
    alert("Erro ao carregar dados: " + e.message);
  }
}

async function salvarFichaNuvem(silencioso = false) {
  const user = auth.currentUser;
  if (!user) {
    if (!silencioso) alert("Você precisa estar logado para salvar na nuvem!");
    return;
  }
  const dadosFicha = obterObjetoFicha();
  const nomeChar = dadosFicha.info.char_name || "Herói_Sem_Nome";
  if (silencioso && (!nomeChar || nomeChar === "Herói_Sem_Nome")) return;
  try {
    await db.collection("users").doc(user.uid).collection("fichas").doc(nomeChar).set(dadosFicha);
    if (!silencioso) {
      alert("Ficha de '" + nomeChar + "' salva com sucesso na nuvem!");
    } else {
      mostrarBadgeAutoSave();
    }
  } catch (e) {
    if (!silencioso) alert("Erro ao salvar: " + e.message);
  }
}

async function deletarFichaNuvem() {
  const user = auth.currentUser;
  const nomeFicha = document.getElementById("nuvem-select").value;
  if (!nomeFicha) {
    alert("Selecione uma ficha para deletar.");
    return;
  }
  const confirmacao = confirm(`⚠️ ATENÇÃO: Você tem certeza que deseja excluir permanentemente a ficha de "${nomeFicha}"? Esta ação não pode ser desfeita.`);
  if (confirmacao) {
    try {
      await db.collection("users").doc(user.uid).collection("fichas").doc(nomeFicha).delete();
      alert("Ficha deletada com sucesso!");
      abrirGaleriaNuvem();
    } catch (e) {
      alert("Erro ao deletar: " + e.message);
    }
  }
}