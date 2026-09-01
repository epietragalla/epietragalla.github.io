document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Hamburguer Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
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
    openModalBtn.addEventListener('click', () => {
      supportersModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeModalBtn.addEventListener('click', () => {
      supportersModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    supportersModal.addEventListener('click', (e) => {
      if (e.target === supportersModal) {
        supportersModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // 4. Modal de Carrossel da Galeria
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryModal = document.getElementById('galleryModal');
  const closeGalleryModal = document.getElementById('closeGalleryModal');
  const carouselImg = document.getElementById('carouselImg');
  const carouselCaption = document.getElementById('carouselCaption');
  const carouselCounter = document.getElementById('carouselCounter');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  let galleryData = [];
  let currentImageIndex = 0;

  // Coleta todas as imagens da galeria
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      galleryData.push({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt') || 'Imagem da Galeria'
      });
    }

    item.addEventListener('click', () => {
      openGallery(index);
    });
  });

  function openGallery(index) {
    currentImageIndex = index;
    updateCarousel();
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function updateCarousel() {
    if (galleryData.length === 0) return;
    const currentData = galleryData[currentImageIndex];
    carouselImg.src = currentData.src;
    carouselImg.alt = currentData.alt;
    carouselCaption.textContent = currentData.alt;
    carouselCounter.textContent = `${currentImageIndex + 1} / ${galleryData.length}`;
  }

  function nextSlide() {
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    updateCarousel();
  }

  function prevSlide() {
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    updateCarousel();
  }

  if (galleryModal) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    closeGalleryModal.addEventListener('click', closeGallery);

    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        closeGallery();
      }
    });

    // Navegação por teclado (Setas e Esc)
    document.addEventListener('keydown', (e) => {
      if (!galleryModal.classList.contains('active')) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') closeGallery();
    });
  }

  // 5. Efeito Parallax Fluido nas Imagens de Fundo
  const parallaxImages = document.querySelectorAll('.parallax-img');

  function updateParallax() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    parallaxImages.forEach(img => {
      const parentSection = img.closest('section');
      if (!parentSection) return;

      const sectionTop = parentSection.offsetTop;
      const sectionHeight = parentSection.offsetHeight;

      if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
        const speed = 0.35;
        const yPos = (scrollY - sectionTop) * speed;
        img.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    });
  }

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateParallax);
  });
  
  updateParallax();
});