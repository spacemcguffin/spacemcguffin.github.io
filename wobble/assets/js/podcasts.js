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

  // Optional date dropdown
  const dateSelect = document.getElementById("dateFilter");

  if (!grid || !btn) return;

  const allCards = Array.from(grid.querySelectorAll(".bbbCard"));
  const filterBtns = Array.from(document.querySelectorAll("[data-filter]"));

  const STEP = 9;
  let shown = 0;
  let activeFilter = "all";
  let activeDate = "all";

  function getCardDate(card) {
    // Prefer <time datetime="YYYY-MM-DD">
    const t = card.querySelector("time[datetime]");
    const iso = (t && t.getAttribute("datetime")) || card.dataset.date || "";
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  function matchesDate(card) {
    if (activeDate === "all") return true;

    const d = getCardDate(card);
    if (!d) return false;

    const now = new Date();
    const msDay = 24 * 60 * 60 * 1000;

    if (activeDate === "30d") return (now - d) <= 30 * msDay;
    if (activeDate === "90d") return (now - d) <= 90 * msDay;

    // Year filters like "2026"
    if (/^\d{4}$/.test(activeDate)) return d.getFullYear() === Number(activeDate);

    return true;
  }

  function matchesFilter(card) {
    // Category
    const catOk =
      activeFilter === "all"
        ? true
        : (card.dataset.category || "").toLowerCase().trim() === activeFilter;

    // Date
    const dateOk = matchesDate(card);

    return catOk && dateOk;
  }

  function apply(animate = true) {
    const matching = allCards.filter(matchesFilter);

    // reveal in batches
    shown = Math.min(matching.length, shown);

    // snapshot what was visible BEFORE changes
    const wasVisible = new Map();
    for (const c of allCards) wasVisible.set(c, c.style.display !== "none");

    // apply visibility
    let visibleCount = 0;
    for (const card of allCards) {
      if (!matchesFilter(card)) {
        card.style.display = "none";
        card.classList.remove("is-revealing");
        card.style.removeProperty("--delay");
        continue;
      }

      const shouldShow = visibleCount < shown;
      card.style.display = shouldShow ? "" : "none";

      if (!shouldShow) {
        card.classList.remove("is-revealing");
        card.style.removeProperty("--delay");
      }

      visibleCount++;
    }

    // animate only newly revealed cards
    if (animate) {
      const nowVisibleMatching = matching.filter(c => c.style.display !== "none");
      const newlyShown = nowVisibleMatching.filter(c => !wasVisible.get(c));

      newlyShown.forEach((card, idx) => {
        card.classList.remove("is-revealing");
        card.style.setProperty("--delay", `${idx * 35}ms`); // stagger
        void card.offsetWidth; // restart animation
        card.classList.add("is-revealing");
      });
    }

    // Update hint + button state
    if (hint) hint.textContent = `Showing ${Math.min(shown, matching.length)} of ${matching.length}`;

    const done = shown >= matching.length;
    const empty = matching.length === 0;

    btn.disabled = done || empty;
    btn.textContent = empty ? "No posts" : (done ? "All loaded" : "Load more");
    btn.style.opacity = (done || empty) ? "0.6" : "1";
    btn.style.cursor = (done || empty) ? "not-allowed" : "pointer";
  }

  function loadMore() {
    const matching = allCards.filter(matchesFilter);
    shown = Math.min(matching.length, shown + STEP);
    apply(true);
  }

  // Init
  shown = STEP;
  apply(false);

  btn.addEventListener("click", loadMore);

  // Category buttons
  filterBtns.forEach(b => {
    b.addEventListener("click", () => {
      const newFilter = (b.dataset.filter || "all").toLowerCase();
      if (newFilter === activeFilter) return;

      activeFilter = newFilter;
      shown = STEP;

      filterBtns.forEach(x => x.classList.toggle("is-active", x === b));
      apply(true);
    });
  });

  // Date dropdown (optional)
  if (dateSelect) {
    dateSelect.addEventListener("change", () => {
      activeDate = (dateSelect.value || "all").toLowerCase();
      shown = STEP;
      apply(true);
    });
  }
})();
