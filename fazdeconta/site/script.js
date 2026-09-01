document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Hamburguer Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Rolagem Suave dos Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 3. Modal de Apoiadores
  const openModalBtn = document.getElementById('openSupportersModal');
  const closeModalBtn = document.getElementById('closeSupportersModal');
  const supportersModal = document.getElementById('supportersModal');

  if (openModalBtn && closeModalBtn && supportersModal) {
    // Abrir Modal
    openModalBtn.addEventListener('click', () => {
      supportersModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Evita rolagem do fundo
    });

    // Fechar Modal no Botão
    closeModalBtn.addEventListener('click', () => {
      supportersModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    // Fechar Modal Clicando Fora
    supportersModal.addEventListener('click', (e) => {
      if (e.target === supportersModal) {
        supportersModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }
});