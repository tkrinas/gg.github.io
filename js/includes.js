
document.addEventListener('DOMContentLoaded', () => {
  const BASE = '/gg.github.io/';
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  // Determine current language
  const lang = segments.includes('el') ? 'el' : 'en';
  const headerFile = `header_${lang}.html`;

  // Compute the “page” (e.g. services.html or index.html)
  const langIndex = segments.indexOf(lang);
  let page = '';
  if (langIndex >= 0 && segments.length > langIndex + 1) {
    page = segments.slice(langIndex + 1).join('/');
  }
  if (!page) page = 'index.html';

  // 1. Mobile nav toggle
  function initNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      document.body.classList.toggle('nav-open');
    });
  }

  // 2. Language switch links
  function initLangSwitch() {
    document.querySelectorAll('.lang-switch-link').forEach(a => {
      a.href = `${BASE}${a.dataset.lang}/${page}`;
    });
  }

  // 3. Dark mode toggle
  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    const body = document.body;
    const DARK_CLASS = 'dark-theme';
    const STORAGE_KEY = 'preferred-theme';

    // Apply saved or system preference on load
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' ||
        (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      body.classList.add(DARK_CLASS);
      toggle.textContent = '☀️';
    } else {
      toggle.textContent = '🌙';
    }

    toggle.addEventListener('click', () => {
      const isDark = body.classList.toggle(DARK_CLASS);
      toggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    });
  }

  // Fetch and inject an include file
  function loadInclude(id, file) {
    fetch(`${BASE}includes/${file}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
        return res.text();
      })
      .then(html => {
        const container = document.getElementById(id);
        if (!container) return;
        container.innerHTML = html;
        if (id === 'site-header') {
          initNavToggle();
          initLangSwitch();
          initThemeToggle();
        }
      })
      .catch(err => console.error(err));
  }

  // Inject header and footer
  loadInclude('site-header', headerFile);
  loadInclude('site-footer', 'footer.html');
});
