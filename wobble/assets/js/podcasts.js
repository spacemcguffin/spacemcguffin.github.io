(() => {
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
      const inside = nav.contains(e.target) || menuBtn.contains(e.target);
      if (!inside) nav.classList.remove('is-open');
    });
  }
})();
