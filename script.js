// Мобильное меню
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const navOverlay = document.querySelector('.nav-overlay');

function closeMenu() {
  nav?.classList.remove('open');
  menuBtn?.classList.remove('active');
  navOverlay?.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

function openMenu() {
  nav?.classList.add('open');
  menuBtn?.classList.add('active');
  navOverlay?.classList.add('open');
  menuBtn?.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
}

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Закрытие по клику на overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Закрытие по клику на ссылку
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });
}

function openMenu() {
  nav?.classList.add('open');
  menuBtn?.classList.add('active');
  navOverlay?.classList.add('open');
  menuBtn?.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
}

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Закрытие по клику на overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Закрытие по клику на ссылку
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });
}

// Плавное появление элементов при скролле
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Анимация счётчиков
const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    update();
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// Аккордеон FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const trigger = item.querySelector('.faq-trigger');
  if (!trigger) return;

  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Закрываем все
    faqItems.forEach(other => {
      if (other !== item) {
        other.classList.remove('open');
        other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
      }
    });

    // Переключаем текущий
    item.classList.toggle('open');
    trigger.setAttribute('aria-expanded', !isOpen);
  });
});

// Обработка формы
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span>Отправка...</span>';
    btn.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 1500));

    btn.innerHTML = '<span>✓ Отправлено!</span>';
    btn.style.background = 'linear-gradient(135deg, #00cc66 0%, #00994d 100%)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// Плавный скролл к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 64;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Хедер скрывается/показывается при скролле
let lastScroll = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const current = window.pageYOffset;

  if (current > lastScroll && current > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }

  header.style.transition = 'transform 0.3s ease';
  lastScroll = current;
});

// Закрытие мобильного меню при изменении размера окна
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    nav?.classList.remove('open');
    menuBtn?.classList.remove('active');
    menuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// Запрет зума на iOS
document.addEventListener('gesturestart', (e) => {
  e.preventDefault();
});

// Оптимизация для touch устройств
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY;
  const diff = touchStartY - touchEndY;

  // Закрытие меню свайпом вниз
  if (nav.classList.contains('open') && diff < -50) {
    nav.classList.remove('open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}, { passive: true });

// Добавляем класс loaded после загрузки страницы
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

console.log('%c ЦЕХ — Производство одежды ', 'background: #ff6600; color: #000; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
