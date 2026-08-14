// Language toggle (PT / EN)
(function () {
  const STORAGE_KEY = 'site-lang';
  const root = document.documentElement;

  function applyLanguage(lang) {
    const isEn = lang === 'en';
    root.setAttribute('lang', lang);
    document.body.classList.toggle('lang-en', isEn);

    document.querySelectorAll('[data-pt][data-en]').forEach(el => {
      el.textContent = isEn ? el.dataset.en : el.dataset.pt;
    });

    document.querySelectorAll('[data-pt-html][data-en-html]').forEach(el => {
      el.innerHTML = isEn ? el.dataset.enHtml : el.dataset.ptHtml;
    });

    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.classList.toggle('is-en', isEn);
      btn.setAttribute('aria-label', isEn ? 'Switch to Portuguese' : 'Mudar para Inglês');
    });
  }

  function getInitialLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'pt' || saved === 'en') return saved;
    return navigator.language && navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'pt';
  }

  function toggleLanguage() {
    const current = root.getAttribute('lang') === 'en' ? 'en' : 'pt';
    const next = current === 'pt' ? 'en' : 'pt';
    localStorage.setItem(STORAGE_KEY, next);
    applyLanguage(next);
  }

  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', toggleLanguage);
  });

  applyLanguage(getInitialLanguage());
})();

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));
