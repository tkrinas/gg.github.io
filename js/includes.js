// File: /js/includes.js
document.addEventListener('DOMContentLoaded', () => {
  const BASE = '/gg.github.io/';
  const path = window.location.pathname;
  // Determine current language from URL
  const lang = path.split('/').includes('el') ? 'el' : 'en';
  const otherLang = lang === 'en' ? 'el' : 'en';
  const headerFile = `header_${lang}.html`;

  // Compute the “page” after the lang folder, default to index.html
  let rel = path.replace(BASE, '');        // e.g. "en/services.html" or "el/"
  rel = rel.replace(new RegExp(`^${lang}/`), '');  // strip "en/" or "el/"
  let page = rel || 'index.html';          // if empty, use index.html

  // Load includes
  function loadInclude(id, file) {
    fetch(BASE + 'includes/' + file)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(html => {
        document.getElementById(id).innerHTML = html;

        if (id === 'site-header') {
          // Re-bind nav toggle
          const toggle = document.querySelector('.nav-toggle');
          toggle && toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            document.body.classList.toggle('nav-open');
          });

          // Set up language-switch links
          document.querySelectorAll('.lang-switch-link')
            .forEach(a => {
              a.href = `${BASE}${a.dataset.lang}/${page}`;
            });
        }
      })
      .catch(err => console.error(`Error loading ${file}:`, err));
  }

  loadInclude('site-header', headerFile);
  loadInclude('site-footer', 'footer.html');
});
