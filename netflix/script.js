// Lewflix / Disney — script.js (copy-paste full file)
// Includes: hero carousel + NEW hero prev/next buttons + rails with auto-hide arrows + episode modals

let movies = [
  {
    id: "twisted-christian",
    name: "Twisted Christian",
    season: "Season 28, Episode 1",
    des: "Cartman is possessed and may be the key to stopping the Antichrist.",
    image: "/wiki/img/episodes/tc.png",
  },
  {
    name: "The Woman in the Hat",
    season: "Season 28, Episode 2",
    des: "The White House deals with a disruptive spirit from the east wing; Stan worries that South Park has become too political.",
    image: "/wiki/img/episodes/twith.png",
  },
  {
    name: "Sora Not Sorry",
    season: "Season 28, Episode 3",
    des: "Butters' AI revenge plan backfires, igniting an epidemic of fake videos at school that leaves Detective Harris struggling to tell fantasy from reality.",
    image: "/wiki/img/episodes/sns.png",
  },
  {
    name: "Turkey Trot",
    season: "Season 28, Episode 4",
    des: "The town's annual Turkey Trot turns chaotic when Cartman uses questionable cutting-edge science to win the race.",
    image: "/wiki/img/episodes/tt.png",
  },
  {
    name: "The Crap Out",
    season: "Season 28, Episode 5",
    des: "Satan's due, Stan's praying, and only a Christmas miracle can deliver the Antichrist on time.",
    image: "/wiki/img/episodes/tco.png",
  },
];

// ===== Ensure every episode has a stable id (so lookups always work) =====
function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

movies.forEach((m, idx) => {
  if (!m) return;
  if (!m.id) m.id = slugify(m.name || m.title || `episode-${idx + 1}`);
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =========================
   HERO CAROUSEL (premium)
   ========================= */

const carousel = document.querySelector(".carousel");
let sliders = [];
let slideIndex = 0;

const createSlide = () => {
  if (!carousel) return;

  if (slideIndex >= movies.length) slideIndex = 0;

  const slide = document.createElement("div");
  const imgElement = document.createElement("img");
  const content = document.createElement("div");
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");

  h1.textContent = movies[slideIndex].name;
  h2.textContent = movies[slideIndex].season;
  p.textContent = movies[slideIndex].des;

  content.appendChild(h1);
  content.appendChild(h2);
  content.appendChild(p);

  imgElement.src = movies[slideIndex].image;
  imgElement.alt = movies[slideIndex].name;

  slide.className = "slider";
  content.className = "slide-content";
  h1.className = "movie-title";
  h2.className = "movie-season";
  p.className = "movie-des";

  slide.appendChild(content);
  slide.appendChild(imgElement);
  carousel.appendChild(slide);

  sliders.push(slide);
  slideIndex++;

  if (sliders.length > 6) {
    const old = sliders.shift();
    old?.remove();
  }

  if (sliders.length > 3) {
    const shiftCount = sliders.length - 3;
    const margin = `calc(-${100 * shiftCount}% - ${30 * shiftCount}px)`;

    const first = sliders[0];
    first.style.transition = prefersReducedMotion
      ? "none"
      : "margin-left 650ms cubic-bezier(.2,.9,.2,1)";
    first.style.marginLeft = margin;
  }
};

/* =========================
   HERO CAROUSEL BUTTONS (NEW)
   ========================= */

(function addHeroCarouselControls() {
  const container = document.querySelector(".carousel-container");
  const carouselEl = document.querySelector(".carousel");
  if (!container || !carouselEl) return;

  if (container.querySelector(".carousel-btn")) return;

  const prev = document.createElement("button");
  const next = document.createElement("button");

  prev.className = "carousel-btn carousel-btn--prev";
  next.className = "carousel-btn carousel-btn--next";
  prev.type = "button";
  next.type = "button";
  prev.setAttribute("aria-label", "Previous slide");
  next.setAttribute("aria-label", "Next slide");

  prev.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  next.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  container.appendChild(prev);
  container.appendChild(next);

  function goNext() {
    createSlide();
  }

  function goPrev() {
    slideIndex = (slideIndex - 2 + movies.length) % movies.length;
    createSlide();
  }

  prev.addEventListener("click", goPrev);
  next.addEventListener("click", goNext);

  prev.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") goPrev();
  });
  next.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") goNext();
  });
})();

// Seed initial slides
for (let i = 0; i < 3; i++) createSlide();

/* =========================
   CARD RAILS
   ========================= */

const cardContainers = document.querySelectorAll(".card-container");
const preBtns = document.querySelectorAll(".pre-btn");
const nxtBtns = document.querySelectorAll(".nxt-btn");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function needsHorizontalScroll(container) {
  return container.scrollWidth > container.clientWidth + 2;
}

function updateRailArrows(container, preBtn, nxtBtn) {
  const show = needsHorizontalScroll(container);

  if (!show) {
    preBtn.style.display = "none";
    nxtBtn.style.display = "none";
    return;
  }

  preBtn.style.display = "grid";
  nxtBtn.style.display = "grid";
}

function updateRailButtons(container, preBtn, nxtBtn) {
  if (!container || !preBtn || !nxtBtn) return;

  if (!needsHorizontalScroll(container)) {
    updateRailArrows(container, preBtn, nxtBtn);
    return;
  }

  const maxScroll = container.scrollWidth - container.clientWidth;
  const x = container.scrollLeft;

  const atStart = x <= 2;
  const atEnd = x >= maxScroll - 2;

  preBtn.disabled = atStart;
  nxtBtn.disabled = atEnd;

  preBtn.style.opacity = atStart ? "0.45" : "1";
  nxtBtn.style.opacity = atEnd ? "0.45" : "1";
  preBtn.style.pointerEvents = atStart ? "none" : "auto";
  nxtBtn.style.pointerEvents = atEnd ? "none" : "auto";
}

function scrollByStep(container, dir = 1) {
  const step = Math.round(container.clientWidth * 0.9);
  const target = clamp(container.scrollLeft + step * dir, 0, container.scrollWidth);

  container.scrollTo({
    left: target,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

cardContainers.forEach((container, i) => {
  const preBtn = preBtns[i];
  const nxtBtn = nxtBtns[i];
  if (!container || !preBtn || !nxtBtn) return;

  updateRailArrows(container, preBtn, nxtBtn);
  updateRailButtons(container, preBtn, nxtBtn);

  preBtn.addEventListener("click", () => scrollByStep(container, -1));
  nxtBtn.addEventListener("click", () => scrollByStep(container, 1));

  container.addEventListener(
    "scroll",
    () => updateRailButtons(container, preBtn, nxtBtn),
    { passive: true }
  );

  window.addEventListener("resize", () => {
    updateRailArrows(container, preBtn, nxtBtn);
    updateRailButtons(container, preBtn, nxtBtn);
  });
});

/* =========================
   EPISODE MODAL POPUPS (SINGLE CLEAN VERSION)
   - Click a .card to open
   - Shows Season heading + Episode label
   - Uses movies[] description if available
   ========================= */

(function episodeModal() {
  const byName = new Map(movies.map((m) => [String(m.name || "").trim(), m]));

  // Inject modal + styles once
  if (!document.getElementById("lfxModal")) {
    const style = document.createElement("style");
    style.textContent = `
      .lfx-modal{position:fixed;inset:0;display:none;z-index:9999}
      .lfx-modal.is-open{display:block}

      /* Glassy backdrop */
      .lfx-modal__backdrop{
        position:absolute;inset:0;
        background: rgba(0,0,0,.55);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }

      /* Panel */
      .lfx-modal__panel{
        position:relative;
        width:min(980px,calc(100vw - 28px));
        margin:6vh auto;
        border-radius:22px;
        overflow:hidden;

        /* glass */
        background: linear-gradient(
          180deg,
          rgba(255,255,255,.14),
          rgba(255,255,255,.08)
        );
        border: 1px solid rgba(255,255,255,.18);
        backdrop-filter: blur(18px) saturate(1.25);
        -webkit-backdrop-filter: blur(18px) saturate(1.25);

        color:#fff;
        outline:none;
        box-shadow:
          0 24px 70px rgba(0,0,0,.55),
          0 0 0 1px rgba(255,255,255,.06) inset;
      }

      /* Close button (glass pill) */
      .lfx-modal__close{
        position:absolute; top:12px; right:12px;
        width:42px; height:42px;
        border:1px solid rgba(255,255,255,.22);
        border-radius:999px;
        background: rgba(10,10,14,.25);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        color:#fff;
        font-size:22px;
        cursor:pointer;
        display:grid;
        place-items:center;
        transition: transform .12s ease, background .12s ease;
      }
      .lfx-modal__close:hover{ transform: scale(1.04); background: rgba(255,255,255,.12); }
      .lfx-modal__close:active{ transform: scale(.98); }

      /* Hero with soft gradient overlay */
      .lfx-modal__hero{
        height:300px;
        background: rgba(0,0,0,.35);
        position:relative;
      }
      .lfx-modal__img{width:100%;height:100%;object-fit:cover;filter:saturate(1.05) contrast(1.02)}
      .lfx-modal__hero::after{
        content:"";
        position:absolute; inset:0;
        background: linear-gradient(
          to bottom,
          rgba(0,0,0,.20),
          rgba(0,0,0,.55) 70%,
          rgba(0,0,0,.70)
        );
        pointer-events:none;
      }

      /* Content */
      .lfx-modal__body{
        position:relative;
        padding:18px 18px 22px;
      }

      .lfx-modal__title{
        margin:0 0 6px;
        font-size:24px;
        letter-spacing:.2px;
      }

      .lfx-modal__meta{
        opacity:.78;
        font-size:13px;
        margin-bottom:12px;
      }

      .lfx-modal__desc{
        margin:0;
        line-height:1.55;
        opacity:.92;
      }

      /* Optional: subtle divider shine */
      .lfx-modal__body::before{
        content:"";
        position:absolute; left:18px; right:18px; top:0;
        height:1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
        opacity:.7;
      }

      /* Lock scroll when open */
      .lfx-modalOpen{overflow:hidden}

      /* Mobile sizing */
      @media (max-width: 520px){
        .lfx-modal__panel{ margin: 10vh auto; border-radius: 18px; }
        .lfx-modal__hero{ height: 220px; }
        .lfx-modal__title{ font-size: 20px; }
      }
    `;
    document.head.appendChild(style);

    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="lfx-modal" id="lfxModal" aria-hidden="true">
        <div class="lfx-modal__backdrop" data-close></div>
        <div class="lfx-modal__panel" role="dialog" aria-modal="true" aria-labelledby="lfxModalTitle" tabindex="-1">
          <button class="lfx-modal__close" type="button" aria-label="Close" data-close>×</button>
          <div class="lfx-modal__hero">
            <img class="lfx-modal__img" alt="" />
          </div>
          <div class="lfx-modal__body">
            <h2 id="lfxModalTitle" class="lfx-modal__title"></h2>
            <div class="lfx-modal__meta"></div>
            <p class="lfx-modal__desc"></p>
          </div>
        </div>
      </div>`
    );
  }

  const modal = document.getElementById("lfxModal");
  const panel = modal.querySelector(".lfx-modal__panel");
  const titleEl = modal.querySelector(".lfx-modal__title");
  const metaEl = modal.querySelector(".lfx-modal__meta");
  const descEl = modal.querySelector(".lfx-modal__desc");
  const imgEl = modal.querySelector(".lfx-modal__img");

  let lastFocus = null;

  function openModal({ title, meta, desc, img }) {
    lastFocus = document.activeElement;

    titleEl.textContent = title || "Episode";
    metaEl.textContent = meta || "";
    descEl.textContent = desc || "";

    if (img) {
      imgEl.src = img;
      imgEl.style.display = "";
    } else {
      imgEl.removeAttribute("src");
      imgEl.style.display = "none";
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("lfx-modalOpen");
    panel.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("lfx-modalOpen");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  // Close on backdrop / close button
  document.addEventListener("click", (e) => {
    if (modal.classList.contains("is-open") && e.target.closest("[data-close]")) {
      closeModal();
    }
  });

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  // Find nearest <h1 class="title"> above this rail
  function findSectionHeading(card) {
    const rail = card.closest(".movies-list");
    if (!rail) return "";
    let el = rail.previousElementSibling;
    while (el) {
      if (el.matches?.("h1.title")) return el.textContent.trim();
      el = el.previousElementSibling;
    }
    return "";
  }

  // Open when clicking a card
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    const title = card.querySelector(".name")?.textContent?.trim() || "";
    const epLabel = card.querySelector(".des")?.textContent?.trim() || "";
    const section = findSectionHeading(card); // "Season 28" / "Specials" etc
    const img = card.querySelector(".card-img")?.getAttribute("src") || "";

    const match = byName.get(title);
    const desc = match?.des || ""; // will be blank for seasons not in movies[]

    const meta = [section, epLabel].filter(Boolean).join(" • ");

    openModal({ title, meta, desc, img });
  });
})();
