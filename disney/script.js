// Lewflix / Disney — script.js (copy-paste full file)

let movies = [
  {
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

  // Keep only a small number of slides in DOM
  if (sliders.length > 6) {
    const old = sliders.shift();
    old?.remove();
  }

  // Smooth shift left by one slide width + gap (30px)
  if (sliders.length >= 2) {
    const shiftCount = sliders.length - 2;
    const margin = `calc(-${100 * shiftCount}% - ${30 * shiftCount}px)`;

    const first = sliders[0];
    first.style.transition = prefersReducedMotion
      ? "none"
      : "margin-left 650ms cubic-bezier(.2,.9,.2,1)";
    first.style.marginLeft = margin;
  }
};

// Seed slides
for (let i = 0; i < 3; i++) createSlide();

// Auto-advance
setInterval(() => createSlide(), 5000);

/* =========================
   CARD RAILS
   - Smooth button scroll
   - Hide arrows if rail doesn't overflow
   - Disable arrows at ends (when visible)
   - NO wheel-hijack scrolling
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

  // Use grid because your CSS uses display:grid for centering
  preBtn.style.display = "grid";
  nxtBtn.style.display = "grid";
}

function updateRailButtons(container, preBtn, nxtBtn) {
  if (!container || !preBtn || !nxtBtn) return;

  // If the rail doesn't need scrolling, hide arrows and stop here
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

// Setup each rail (paired by index, matching your HTML structure)
cardContainers.forEach((container, i) => {
  const preBtn = preBtns[i];
  const nxtBtn = nxtBtns[i];
  if (!container || !preBtn || !nxtBtn) return;

  // Initial visibility + state
  updateRailArrows(container, preBtn, nxtBtn);
  updateRailButtons(container, preBtn, nxtBtn);

  preBtn.addEventListener("click", () => scrollByStep(container, -1));
  nxtBtn.addEventListener("click", () => scrollByStep(container, 1));

  // Update state as user scrolls (drag, touch, trackpad horizontal)
  container.addEventListener(
    "scroll",
    () => updateRailButtons(container, preBtn, nxtBtn),
    { passive: true }
  );

  // Re-check if the rail needs arrows when layout changes (responsive)
  window.addEventListener("resize", () => {
    updateRailArrows(container, preBtn, nxtBtn);
    updateRailButtons(container, preBtn, nxtBtn);
  });
});
