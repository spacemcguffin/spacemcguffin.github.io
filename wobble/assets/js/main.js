(function () {
  const $ = (sel, root = document) => root.querySelector(sel);

  // Year
  const y = $('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobile menu
  const menuBtn = $('[data-menu-btn]');
  const nav = $('[data-nav]');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('is-open'));
    document.addEventListener('click', (e) => {
      const isClickInside = nav.contains(e.target) || menuBtn.contains(e.target);
      if (!isClickInside) nav.classList.remove('is-open');
    });
  }

  // Search overlay
  const overlay = $('[data-search]');
  const openBtn = $('[data-search-open]');
  const closeBtn = $('[data-search-close]');
  const setSearch = (open) => {
    if (!overlay) return;
    overlay.classList.toggle('is-open', open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };
  if (openBtn) openBtn.addEventListener('click', () => setSearch(true));
  if (closeBtn) closeBtn.addEventListener('click', () => setSearch(false));
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) setSearch(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setSearch(false);
    });
  }

  // Reading progress (only visible on pages with the elements)
  const bar = $('[data-progress]');
  const box = $('[data-progress-box]');
  if (bar && box) {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight || document.body.scrollHeight;
      const clientHeight = doc.clientHeight;
      const max = Math.max(1, scrollHeight - clientHeight);
      const p = Math.min(1, Math.max(0, scrollTop / max));
      const pct = (p * 100).toFixed(2) + '%';
      bar.style.width = pct;

      // fill the little "box"
      box.style.setProperty('--fill', pct);
      box.style.position = 'relative';
      box.style.overflow = 'hidden';
      box.style.setProperty('transform', 'translateZ(0)');
      // write into ::after height via inline style helper:
      box.style.setProperty('--h', pct);
      box.style.setProperty('background', 'rgba(255,255,255,.06)');

      // directly set the pseudo fill by updating a CSS custom prop
      box.style.setProperty('--progress', pct);
      // fallback if you keep the ::after approach:
      box.style.setProperty('outline', 'none');
      box.style.setProperty('willChange', 'contents');
      box.style.setProperty('contain', 'paint');

      // If using .box::after height transition, set it via a data attribute:
      box.dataset.fill = pct;
      box.style.setProperty('--fillHeight', pct);
      // we’ll apply it below by injecting a style once:
    };

    // inject one small rule so the ::after reads the CSS var
    const style = document.createElement('style');
    style.textContent = `.box::after{ height: var(--fillHeight, 0%); }`;
    document.head.appendChild(style);

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }
})();
