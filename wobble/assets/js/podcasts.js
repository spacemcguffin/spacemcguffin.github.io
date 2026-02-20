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

  const allCards = Array.from(grid.querySelectorAll(".bbbCard"));
  const filterBtns = Array.from(document.querySelectorAll("[data-filter]"));

  const STEP = 9;
  let shown = 0;
  let activeFilter = "all";

  function matchesFilter(card) {
    if (activeFilter === "all") return true;
    const cat = (card.dataset.category || "").toLowerCase().trim();
    return cat === activeFilter;
  }

  function apply() {
    const matching = allCards.filter(matchesFilter);

    // reveal in batches
    shown = Math.min(matching.length, shown);

    let visibleCount = 0;

    for (const card of allCards) {
      // hide non-matching completely
      if (!matchesFilter(card)) {
        card.style.display = "none";
        continue;
      }

      // matching: show only up to shown
      const shouldShow = visibleCount < shown;
      card.style.display = shouldShow ? "" : "none";
      visibleCount++;
    }

    // Update hint + button state
    if (hint) {
      hint.textContent = `Showing ${Math.min(shown, matching.length)} of ${matching.length}`;
    }

    const done = shown >= matching.length;
    btn.disabled = done || matching.length === 0;
    btn.textContent = matching.length === 0 ? "No posts" : (done ? "All loaded" : "Load more");
    btn.style.opacity = (done || matching.length === 0) ? "0.6" : "1";
    btn.style.cursor = (done || matching.length === 0) ? "not-allowed" : "pointer";
  }

  function loadMore() {
    const matching = allCards.filter(matchesFilter);
    shown = Math.min(matching.length, shown + STEP);
    apply();
  }

  // Init: start with STEP visible
  shown = STEP;
  apply();

  btn.addEventListener("click", loadMore);

  // Filter buttons
  filterBtns.forEach(b => {
    b.addEventListener("click", () => {
      activeFilter = (b.dataset.filter || "all").toLowerCase();

      // reset batch when changing filter
      shown = STEP;

      // active button styling
      filterBtns.forEach(x => x.classList.toggle("is-active", x === b));

      apply();
    });
  });
})();










(() => {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  const toggle = () => {
    const show = window.scrollY > 500;
    btn.classList.toggle("is-visible", show);
  };

  window.addEventListener("scroll", toggle);

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
})();
