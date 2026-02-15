/* =========================================================
   Lewflix script.js (fresh)
   ========================================================= */

(() => {
  // ---------- Rail scrolling ----------
  document.querySelectorAll(".movies-list").forEach((rail) => {
    const track = rail.querySelector(".card-container");
    const prev = rail.querySelector(".pre-btn");
    const next = rail.querySelector(".nxt-btn");

    if (!track || !prev || !next) return;

    const scrollAmount = () => Math.round(track.clientWidth * 0.9);

    prev.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });

    next.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });
  });

  // ---------- Modal injection ----------
  const modalHTML = `
    <div class="modal" id="modal" aria-hidden="true">
      <div class="modal-backdrop" data-close></div>
      <div class="modal-card" role="dialog" aria-modal="true" aria-label="Details">
        <button class="modal-x" data-close aria-label="Close">✕</button>
        <img id="mImg" alt="">
        <div class="modal-body">
          <h3 id="mTitle"></h3>
          <p id="mMeta" class="muted"></p>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.querySelector("#modal");
  const mImg = document.querySelector("#mImg");
  const mTitle = document.querySelector("#mTitle");
  const mMeta = document.querySelector("#mMeta");

  // ---------- Scroll lock (correct pattern) ----------
  let scrollY = 0;

  function lockScroll() {
    scrollY = window.scrollY || 0;

    // lock body without losing scroll position
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }

  function unlockScroll() {
    // restore body
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    // jump back to where user was
    window.scrollTo(0, scrollY);
  }

  function openModal({ img, title, meta }) {
    mImg.src = img || "";
    mTitle.textContent = title || "";
    mMeta.textContent = meta || "";

    modal.setAttribute("aria-hidden", "false");
    lockScroll();
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    unlockScroll();
  }

  // ---------- Click handling ----------
  document.addEventListener("click", (e) => {
    // close modal
    if (e.target.closest("[data-close]")) {
      if (modal.getAttribute("aria-hidden") === "false") closeModal();
      return;
    }

    // open modal if clicking a card
    const card = e.target.closest(".card");
    if (!card) return;

    openModal({
      img: card.querySelector(".card-img")?.src,
      title: card.querySelector(".name")?.textContent,
      meta: card.querySelector(".des")?.textContent,
    });
  });

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });

  // ---------- Search (auto-inject if missing) ----------
  // If you already have <input class="search-box">, it will use it.
  // Otherwise it will create one inside .right-container (and show it).
  let searchInput = document.querySelector(".search-box");

  if (!searchInput) {
    const right = document.querySelector(".right-container");
    if (right) {
      right.style.display = "block";
      right.style.position = "relative";
      right.innerHTML = `
        <input class="search-box" type="search" placeholder="Search titles…" autocomplete="off" />
      `;
      searchInput = right.querySelector(".search-box");
    }
  }

  if (searchInput) {
    const cards = () => [...document.querySelectorAll(".card")];

    searchInput.addEventListener("input", () => {
      const term = searchInput.value.trim().toLowerCase();

      cards().forEach((card) => {
        const title = (card.querySelector(".name")?.textContent || "").toLowerCase();
        const meta = (card.querySelector(".des")?.textContent || "").toLowerCase();
        const hit = !term || title.includes(term) || meta.includes(term);
        card.style.display = hit ? "" : "no
