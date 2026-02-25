// Lewflix / Disney — script.js (copy-paste full file)
// Includes: hero carousel + NEW hero prev/next buttons + rails with auto-hide arrows + episode modals + modal navigation

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
   - Navigation ONLY within the current .movies-list rail
   ========================= */

(function episodeModal() {
  const byName = new Map(movies.map((m) => [String(m.name || "").trim(), m]));

  // Inject modal once (CSS is in your style.css)
  if (!document.getElementById("lfxModal")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="lfx-modal" id="lfxModal" aria-hidden="true">
        <div class="lfx-modal__backdrop" data-close></div>

        <div class="lfx-modal__panel" role="dialog" aria-modal="true" aria-labelledby="lfxModalTitle" tabindex="-1">
          <div class="lfx-modal__hero">
            <img class="lfx-modal__img" alt="" />

            <button class="lfx-modal__close" type="button" aria-label="Close" data-close>×</button>

            <button class="lfx-nav lfx-nav--prev" type="button" aria-label="Previous episode" data-nav="prev">‹</button>
            <button class="lfx-nav lfx-nav--next" type="button" aria-label="Next episode" data-nav="next">›</button>

            <div class="lfx-modal__actions" aria-label="Actions">
              <button class="lfx-action lfx-action--primary" type="button" data-action="wiki">Wiki</button>
              <button class="lfx-action" type="button" data-action="trailer">Trailer</button>
              </div>
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
  const prevBtn = modal.querySelector('[data-nav="prev"]');
  const nextBtn = modal.querySelector('[data-nav="next"]');

  let lastFocus = null;

  // CURRENT rail context
  let currentRail = null;
  let episodeList = [];
  let currentIndex = -1;

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

  // Build list ONLY from a specific rail
  function buildEpisodeListFromRail(railEl) {
    if (!railEl) return [];
    const cards = Array.from(railEl.querySelectorAll(".card"));
    return cards
      .map((card) => {
        const title = card.querySelector(".name")?.textContent?.trim() || "";
        const epLabel = card.querySelector(".des")?.textContent?.trim() || "";
        const section = findSectionHeading(card);
        const img = card.querySelector(".card-img")?.getAttribute("src") || "";

        // long description if in movies[]
        const match = byName.get(title);
        const desc = match?.des || "";

        const meta = [section, epLabel].filter(Boolean).join(" • ");
        return { title, meta, desc, img };
      })
      .filter((x) => x.title);
  }

  function setNavState() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex < 0 || currentIndex >= episodeList.length - 1;
  }

  function renderEpisode(ep) {
    if (!ep) return;

    titleEl.textContent = ep.title || "Episode";
    metaEl.textContent = ep.meta || "";
    descEl.textContent = ep.desc || "";

    if (ep.img) {
      imgEl.src = ep.img;
      imgEl.style.display = "";
    } else {
      imgEl.removeAttribute("src");
      imgEl.style.display = "none";
    }

    setNavState();
  }

  function openModalFromCard(card) {
    lastFocus = document.activeElement;

    currentRail = card.closest(".movies-list");
    episodeList = buildEpisodeListFromRail(currentRail);

    const title = card.querySelector(".name")?.textContent?.trim() || "";
    const epLabel = card.querySelector(".des")?.textContent?.trim() || "";
    const section = findSectionHeading(card);
    const img = card.querySelector(".card-img")?.getAttribute("src") || "";

    const match = byName.get(title);
    const desc = match?.des || "";

    const meta = [section, epLabel].filter(Boolean).join(" • ");

    // locate index within THIS rail list
    currentIndex = episodeList.findIndex((x) => x.title === title && x.meta === meta);
    if (currentIndex < 0) currentIndex = episodeList.findIndex((x) => x.title === title);

    renderEpisode(episodeList[currentIndex] || { title, meta, desc, img });

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

  function navigate(dir) {
    if (!modal.classList.contains("is-open")) return;
    if (!episodeList.length) return;
    if (currentIndex < 0) return;

    const next = currentIndex + dir;
    if (next < 0 || next >= episodeList.length) return;

    currentIndex = next;
    renderEpisode(episodeList[currentIndex]);
  }

  // Close on backdrop / close button
  document.addEventListener("click", (e) => {
    if (modal.classList.contains("is-open") && e.target.closest("[data-close]")) {
      closeModal();
    }
  });

  // Click prev/next buttons
  document.addEventListener("click", (e) => {
    if (!modal.classList.contains("is-open")) return;

    const nav = e.target.closest("[data-nav]");
    if (!nav) return;

    e.preventDefault();
    if (nav.getAttribute("data-nav") === "prev") navigate(-1);
    if (nav.getAttribute("data-nav") === "next") navigate(1);
  });

  // ESC + keyboard arrows
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;

    if (e.key === "Escape") {
      closeModal();
      return;
    }

    const t = e.target;
    const typing =
      t &&
      (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    if (typing) return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      navigate(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      navigate(1);
    }
  });

  // Open when clicking a card
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    openModalFromCard(card);
  });

  // Action buttons (demo handlers)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".lfx-action");
    if (!btn || !modal.classList.contains("is-open")) return;

    const action = btn.getAttribute("data-action");
    const currentTitle = titleEl.textContent.trim();


    if (action === "wiki") {

  // Find the card currently open
  const currentTitle = titleEl.textContent.trim();

  // Find the matching card in the current rail
  const cards = document.querySelectorAll(".card");

  for (const card of cards) {
    const name = card.querySelector(".name")?.textContent?.trim();
    if (name === currentTitle) {
      const wikiLink = card.getAttribute("data-wiki");
      if (wikiLink) {
        window.location.href = wikiLink;
      }
      break;
    }
  }

  return;
}


    if (action === "trailer") {
      console.log("Trailer:", currentTitle);
      return;
    }

  });
})();
