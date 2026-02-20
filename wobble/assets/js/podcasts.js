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




(() => {
  const grid = document.getElementById("postsGrid");
  const btn = document.getElementById("loadMoreBtn");
  const hint = document.getElementById("loadMoreHint");

  if (!grid || !btn) return;

  const cards = Array.from(grid.querySelectorAll(".bbbCard"));

  // How many to show initially + each click
  const STEP = 9;

  let shown = 0;

  function update() {
    // Show next batch
    shown = Math.min(cards.length, shown + STEP);

    cards.forEach((card, i) => {
      card.style.display = i < shown ? "" : "none";
    });

    // Update hint + button state
    if (hint) hint.textContent = `Showing ${shown} of ${cards.length}`;

    const done = shown >= cards.length;
    btn.disabled = done;
    btn.textContent = done ? "All loaded" : "Load more";
    btn.style.opacity = done ? "0.6" : "1";
    btn.style.cursor = done ? "not-allowed" : "pointer";
  }

  // Initial state
  shown = 0;
  update();

  btn.addEventListener("click", update);
})();
