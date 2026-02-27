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











(() => {
  const modal = document.getElementById("lfxModal");
  if (!modal) return console.warn("Missing #lfxModal");

  // Modal fields (must exist)
  const img = document.getElementById("lfxModalImg");
  const kicker = document.getElementById("lfxModalKicker");
  const title = document.getElementById("lfxModalTitle");
  const meta = document.getElementById("lfxModalMeta");
  const desc = document.getElementById("lfxModalDesc");
  const link = document.getElementById("lfxModalLink");

  const required = { img, kicker, title, meta, desc, link };
  for (const [k, el] of Object.entries(required)) {
    if (!el) {
      console.warn(`Missing modal element: #lfxModal${k[0].toUpperCase() + k.slice(1)}`);
      return;
    }
  }

  let lastFocus = null;

  // Extract url("...") from style="background-image: url(...)"
  const getBgImageUrl = (el) => {
    if (!el) return "";
    const bg = getComputedStyle(el).backgroundImage; // e.g. url("...")
    if (!bg || bg === "none") return "";
    const m = bg.match(/url\(["']?(.*?)["']?\)/i);
    return m ? m[1] : "";
  };

  const pill = (text) => {
    if (!text) return null;
    const span = document.createElement("span");
    span.className = "pill";
    span.textContent = text;
    return span;
  };

  const openModal = ({ kickerText, titleText, typeText, dateText, descText, imgSrc, href }) => {
    lastFocus = document.activeElement;

    kicker.textContent = kickerText || "";
    title.textContent = titleText || "";
    desc.textContent = descText || "";

    meta.innerHTML = "";
    const p1 = pill(typeText);
    const p2 = pill(dateText);
    if (p1) meta.appendChild(p1);
    if (p2) meta.appendChild(p2);

    if (imgSrc) {
      img.src = imgSrc;
      img.alt = titleText || "Artwork";
      img.style.display = "";
    } else {
      img.removeAttribute("src");
      img.alt = "";
      img.style.display = "none";
    }

    link.href = href || "#";

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const closeBtn = modal.querySelector("[data-close]");
    closeBtn && closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    lastFocus = null;
  };

  // Close: backdrop or any [data-close]
  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-close], .lfxModal__backdrop, .modal-backdrop")) closeModal();
  });

  // ESC close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  // Open on card click (event delegation)
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".bbbCard");
    if (!card) return;

    // allow opening link in new tab etc.
    if (
      e.button !== 0 ||
      e.metaKey || e.ctrlKey ||
      e.shiftKey || e.altKey
    ) return;

    e.preventDefault();

    const titleText =
      card.querySelector(".bbbCard__title")?.textContent?.trim() || "Untitled";

    const typeText =
      card.querySelector(".bbbPill")?.textContent?.trim() ||
      card.querySelector(".bbbCard__cat")?.textContent?.trim() ||
      "";

    const dateText =
      card.querySelector("time.bbbDate")?.textContent?.trim() ||
      card.querySelector("time")?.textContent?.trim() ||
      "";

    const kickerText = "Podcast"; // or set card.dataset.category etc.
    const descText = card.dataset.desc || ""; // optional (add later)

    const imgSrc = getBgImageUrl(card.querySelector(".bbbCard__img"));
    const href = card.getAttribute("href") || "#";

    openModal({ kickerText, titleText, typeText, dateText, descText, imgSrc, href });
  });
})();
