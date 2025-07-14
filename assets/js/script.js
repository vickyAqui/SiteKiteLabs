// Pausar animações quando a aba não está visível
document.addEventListener('visibilitychange', () => {
  const components = document.querySelector('.components');
  if (components) {
    if (document.hidden) {
      components.style.animationPlayState = 'paused';
    } else {
      components.style.animationPlayState = 'running';
    }
  }
});

// Melhorar performance do scroll horizontal (apenas desktop)
const componentsWrapper = document.querySelector('.components-wrapper');
if (componentsWrapper) {
  componentsWrapper.addEventListener('touchstart', (e) => {
    componentsWrapper.style.animationPlayState = 'paused';
  }, { passive: true });

  componentsWrapper.addEventListener('touchend', (e) => {
    setTimeout(() => {
      componentsWrapper.style.animationPlayState = 'running';
    }, 1000);
  }, { passive: true });
}

// Otimizar carregamento de imagens
const images = document.querySelectorAll('img');
images.forEach(img => {
  img.loading = 'lazy';
});

// Prevenir zoom em inputs (se houver)
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

// Otimizar animações de scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.card, .component, .pill').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// Melhorar performance do header fixo
let lastScrollTop = 0;
const header = document.querySelector('.header');

if (header) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scroll para baixo
      header.style.transform = 'translateX(-50%) translateY(-100%)';
    } else {
      // Scroll para cima
      header.style.transform = 'translateX(-50%) translateY(0)';
    }

    lastScrollTop = scrollTop;
  }, { passive: true });
}

// Otimizar carregamento de fontes
const fontLink = document.createElement('link');
fontLink.rel = 'preload';
fontLink.as = 'font';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
fontLink.crossOrigin = 'anonymous';
document.head.appendChild(fontLink);

// Melhorar experiência de toque
document.addEventListener('DOMContentLoaded', () => {
  // Melhorar scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  // VanillaTilt nos cards da Prancheta2 (apenas desktop)
  if (window.VanillaTilt) {
    const tiltCards = document.querySelectorAll('.Prancheta2 .card');
    if (tiltCards.length > 0) {
      VanillaTilt.init(tiltCards, {
        max: 25, // Inclinação máxima mais forte
        speed: 400,
        scale: 1.12, // Salto mais para frente
        glare: true,
        "max-glare": 0.18,
        perspective: 900,
        gyroscope: true,
      });
    }
  }
});

// Efeito hover simples nos cards (sem 3D)
function handleCardHover(card) {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    card.style.transform = 'translateY(-4px) scale(1.02)';
    card.style.boxShadow = '0 8px 32px 0 rgba(0, 147, 255, 0.18)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '';
  });
}

// Aplicar hover simples em todos os cards e componentes (apenas desktop)
document.querySelectorAll('.card, .component').forEach(handleCardHover);

// Pausar animação apenas no desktop
document.querySelectorAll('.component').forEach(card => {
  card.addEventListener('mouseenter', () => {
    document.querySelector('.components').classList.add('paused');
  });
  card.addEventListener('mouseleave', () => {
    document.querySelector('.components').classList.remove('paused');
  });
});

// VanillaTilt nos cards da Prancheta2 (apenas desktop)
if (window.VanillaTilt) {
  const tiltCards = document.querySelectorAll('.Prancheta2 .card');
  if (tiltCards.length > 0) {
    VanillaTilt.init(tiltCards, {
      max: 25, // Inclinação máxima mais forte
      speed: 400,
      scale: 1.12, // Salto mais para frente
      glare: true,
      "max-glare": 0.18,
      perspective: 900,
      gyroscope: true,
    });
  }
}
// Menu mobile hamburger
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
  });
  // Fecha ao clicar em um link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
  // Fecha ao clicar fora do menu
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// VanillaTilt nos cards da Prancheta2 (debug)
console.log('VanillaTilt:', window.VanillaTilt);
const tiltCards = document.querySelectorAll('.Prancheta2 .card');
console.log('Cards encontrados para tilt:', tiltCards);
if (tiltCards.length > 0 && window.VanillaTilt) {
  VanillaTilt.init(tiltCards, {
    max: 45, // Inclinação máxima BEM forte
    speed: 400,
    scale: 1.25, // Salto bem para frente
    glare: true,
    "max-glare": 0.35,
    perspective: 500, // Perspectiva mais dramática
    gyroscope: true,
  });
  console.log('VanillaTilt inicializado!');
} else {
  console.warn('VanillaTilt NÃO inicializado!');
}

// Slider touch para dúvidas no mobile
(function () {
  const wrapper = document.querySelector('.components-wrapper');
  if (!wrapper) return;
  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener('touchstart', function (e) {
    isDown = true;
    startX = e.touches[0].pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  }, { passive: true });

  wrapper.addEventListener('touchmove', function (e) {
    if (!isDown) return;
    const x = e.touches[0].pageX - wrapper.offsetLeft;
    const walk = (startX - x); // quanto arrastou
    let newScroll = scrollLeft + walk;
    // Bloqueia o scroll nos limites
    if (newScroll < 0) newScroll = 0;
    if (newScroll > wrapper.scrollWidth - wrapper.clientWidth) newScroll = wrapper.scrollWidth - wrapper.clientWidth;
    wrapper.scrollLeft = newScroll;
  }, { passive: true });

  wrapper.addEventListener('touchend', function () {
    isDown = false;
  });
  wrapper.addEventListener('touchcancel', function () {
    isDown = false;
  });
})();

// Animação de entrada dos cards ao rolar (mobile)
(function () {
  if (window.innerWidth > 900) return;
  const animatedEls = document.querySelectorAll('.card, .component, .quadrado, .quadradao');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  animatedEls.forEach(el => observer.observe(el));
})();
