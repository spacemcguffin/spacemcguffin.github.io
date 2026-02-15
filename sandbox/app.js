const stories = [
{
  id: "unearthly-child",
  title: "An Unearthly Child",
  doctor: "1st",
  serialno: "1",
  season: 1,
  episodes: 4,
  code: "A",
  image: "/sandbox/img/1/unearthlychild.png",
  summary: "Two schoolteachers follow a strange pupil home and uncover a time machine hidden in a junkyard.",
  notes: ["First Doctor Who story", "Introduces the TARDIS"],
  tags: ["debut", "first", "pilot", "barbara", "ian"]
},
{
  id: "the-daleks",
  title: "The Daleks",
  doctor: "1st",
  serialno: "2",
  season: 1,
  episodes: 7,
  code: "B",
  image: "/sandbox/img/1/thedaleks.png",
  summary: "The Doctor and companions encounter the Daleks on the planet Skaro.",
  notes: ["First Dalek story", "Established the show’s popularity"],
  tags: ["daleks", "skaro", "thals", "radiation", "iconic"]
},
{
  id: "edge-of-destruction",
  title: "The Edge of Destruction",
  doctor: "1st",
  serialno: "3",
  season: 1,
  episodes: 2,
  code: "C",
  image: "/sandbox/img/1/edgeofdestruction.png",
  summary: "Strange forces aboard the TARDIS turn the crew against each other.",
  notes: ["Early TARDIS paranoia story"],
  tags: ["tardis", "paranoia", "claustrophobic"]
},
{
  id: "marco-polo",
  title: "Marco Polo",
  doctor: "1st",
  serialno: "4",
  season: 7,
  episodes: 7,
  code: "D",
  image: "/sandbox/img/1/marcopolo.png",
  summary: "The Doctor and companions journey with Marco Polo across Asia.",
  notes: ["Classic historical adventure"],
  tags: ["historical", "marco polo", "travel", "silk road"]
},
{
  id: "keys-of-marinus",
  title: "The Keys of Marinus",
  doctor: "1st",
  serialno: "5",
  season: 1,
  episodes: 6,
  code: "E",
  image: "/sandbox/img/1/keysofmarinus.png",
  summary: "A quest across Marinus to recover the Keys of Conscience.",
  notes: ["Quest story structure"],
  tags: ["quest", "marinus", "conscience"]
},
{
  id: "the-aztecs",
  title: "The Aztecs",
  doctor: "1st",
  serialno: "6",
  season: 1,
  episodes: 4,
  code: "F",
  image: "/sandbox/img/1/theaztecs.png",
  summary: "Barbara is mistaken for a goddess in 15th-century Mexico.",
  notes: ["Classic historical story"],
  tags: ["historical", "aztecs", "barbara", "mexico"]
},
{
  id: "the-sensorites",
  title: "The Sensorites",
  doctor: "1st",
  season: 1,
  serialno: "7",
  episodes: 6,
  code: "G",
  image: "/sandbox/img/1/thesensorites.png",
  summary: "A strange alien presence threatens a human expedition.",
  notes: ["Atmospheric early alien story"],
  tags: ["aliens", "telepathy", "base under siege"]
},
{
  id: "reign-of-terror",
  title: "The Reign of Terror",
  doctor: "1st",
  season: 1,
  serialno: "8",
  episodes: 6,
  code: "H",
  image: "/sandbox/img/1/thereignofterror.png",
  summary: "The TARDIS crew are caught up in the French Revolution.",
  notes: ["Historical adventure"],
  tags: ["historical", "french revolution", "politics"]
},
{
  id: "tenth-planet",
  title: "The Tenth Planet",
  doctor: "1st",
  season: 4,
  episodes: 4,
  code: "DD",
  image: "/sandbox/img/1/tenthplanet.png",
  summary: "The Cybermen debut as Earth's twin planet Mondas appears in the sky.",
  notes: ["First Cybermen story", "First regeneration"],
  tags: ["cybermen", "mondas", "regeneration", "debut"]
},

{
  id: "tomb-of-the-cybermen",
  title: "The Tomb of the Cybermen",
  doctor: "2nd",
  season: 5,
  episodes: 4,
  code: "QQ",
  image: "/wiki/img/episodes/sickofancy.png",
  summary: "An archaeological expedition wakes a sleeping Cyber fleet.",
  notes: ["A classic base under siege feel", "Cybermen at their creepiest"],
  tags: ["cybermen", "tomb", "archaeology", "base under siege"]
},
{
  id: "spearhead-from-space",
  title: "Spearhead from Space",
  doctor: "3rd",
  season: 7,
  episodes: 4,
  code: "AAA",
  image: "https://picsum.photos/seed/spearhead/1200/675",
  summary: "UNIT investigates Auton activity as the Doctor regenerates.",
  notes: ["First Third Doctor story", "Strong action + mystery"],
  tags: ["unit", "autons", "regeneration", "debut"]
},
{
  id: "blink",
  title: "Blink",
  doctor: "10th",
  season: 3,
  episodes: 1,
  code: "3.10",
  image: "https://picsum.photos/seed/blink/1200/675",
  summary: "A timey-wimey thriller featuring the Weeping Angels.",
  notes: ["Perfect standalone", "Infamous quotes everywhere"],
  tags: ["weeping angels", "timey wimey", "thriller", "standalone"]
},
{
  id: "midnight",
  title: "Midnight",
  doctor: "10th",
  season: 4,
  episodes: 1,
  code: "4.10",
  image: "https://picsum.photos/seed/midnight/1200/675",
  summary: "A tour shuttle becomes a pressure-cooker paranoia chamber.",
  notes: ["Psychological horror", "Incredible tension and performances"],
  tags: ["psychological", "horror", "bottle episode", "paranoia"]
},
{
  id: "war-games",
  title: "The War Games",
  doctor: "2nd",
  season: 6,
  episodes: 10,
  code: "ZZ",
  image: "https://picsum.photos/seed/wargames/1200/675",
  summary: "The Second Doctor faces the Time Lords for the first time.",
  notes: ["Epic 10-part finale", "First Time Lord appearance"],
  tags: ["time lords", "trial", "finale", "epic"]
},
{
  id: "genesis-of-the-daleks",
  title: "Genesis of the Daleks",
  doctor: "4th",
  season: 12,
  episodes: 6,
  code: "4E",
  image: "https://picsum.photos/seed/genesis/1200/675",
  summary: "The Doctor is sent to Skaro to prevent the Daleks’ creation.",
  notes: ["Davros debut", "Moral dilemma masterpiece"],
  tags: ["daleks", "davros", "skaro", "moral dilemma"]
},
{
  id: "city-of-death",
  title: "City of Death",
  doctor: "4th",
  season: 17,
  episodes: 4,
  code: "5H",
  image: "https://picsum.photos/seed/cityofdeath/1200/675",
  summary: "Time travel, art theft, and Parisian charm.",
  notes: ["Douglas Adams script", "Witty and stylish"],
  tags: ["douglas adams", "paris", "art", "comedy"]
},
{
  id: "earthshock",
  title: "Earthshock",
  doctor: "5th",
  season: 19,
  episodes: 4,
  code: "6H",
  image: "https://picsum.photos/seed/earthshock/1200/675",
  summary: "A shocking Cyberman return story.",
  notes: ["Huge twist ending", "Fan-favourite Fifth Doctor story"],
  tags: ["cybermen", "twist", "classic", "shock"]
},
{
  id: "remembrance-of-the-daleks",
  title: "Remembrance of the Daleks",
  doctor: "7th",
  season: 25,
  episodes: 4,
  code: "7J",
  image: "https://picsum.photos/seed/remembrance/1200/675",
  summary: "The Doctor manipulates events in 1963 London.",
  notes: ["Dalek civil war", "Darker Seventh Doctor tone"],
  tags: ["daleks", "1963", "darker", "manipulation"]
},
{
  id: "rose",
  title: "Rose",
  doctor: "9th",
  season: 1,
  episodes: 1,
  code: "1.01",
  image: "https://picsum.photos/seed/rose/1200/675",
  summary: "The Doctor meets Rose Tyler.",
  notes: ["Modern revival begins", "Autons return"],
  tags: ["debut", "revival", "autons", "rose tyler"]
},
{
  id: "the-empty-child",
  title: "The Empty Child",
  doctor: "9th",
  season: 1,
  episodes: 2,
  code: "1.09",
  image: "https://picsum.photos/seed/emptychild/1200/675",
  summary: "A gas-mask child haunts wartime London.",
  notes: ["Creepy as hell", "Captain Jack debut"],
  tags: ["wartime", "gas mask", "horror", "captain jack"]
},
{
  id: "girl-in-the-fireplace",
  title: "The Girl in the Fireplace",
  doctor: "10th",
  season: 2,
  episodes: 1,
  code: "2.04",
  image: "https://picsum.photos/seed/fireplace/1200/675",
  summary: "The Doctor meets Madame de Pompadour.",
  notes: ["Emotional time romance", "Moffat time mechanics"],
  tags: ["romance", "time travel", "moffat", "pompadour"]
},
{
  id: "human-nature",
  title: "Human Nature / The Family of Blood",
  doctor: "10th",
  season: 3,
  episodes: 2,
  code: "3.08",
  image: "https://picsum.photos/seed/humannature/1200/675",
  summary: "The Doctor becomes human to escape pursuit.",
  notes: ["Dark emotional arc", "Brilliant performance"],
  tags: ["family of blood", "john smith", "dark", "emotional"]
},
{
  id: "eleventh-hour",
  title: "The Eleventh Hour",
  doctor: "11th",
  season: 5,
  episodes: 1,
  code: "5.01",
  image: "https://picsum.photos/seed/eleventhhour/1200/675",
  summary: "The Eleventh Doctor crashes into Amelia Pond’s life.",
  notes: ["New Doctor energy", "Crack in the wall"],
  tags: ["debut", "amelia pond", "crack", "new era"]
},
{
  id: "day-of-the-doctor",
  title: "The Day of the Doctor",
  doctor: "War",
  season: 7,
  episodes: 1,
  code: "50th",
  image: "https://picsum.photos/seed/daydoctor/1200/675",
  summary: "The Doctors unite to save Gallifrey.",
  notes: ["50th Anniversary special", "Multi-Doctor chaos"],
  tags: ["anniversary", "multi-doctor", "gallifrey", "time war"]
},
{
  id: "heaven-sent",
  title: "Heaven Sent",
  doctor: "12th",
  season: 9,
  episodes: 1,
  code: "9.11",
  image: "https://picsum.photos/seed/heavensent/1200/675",
  summary: "The Doctor trapped alone inside a confession dial.",
  notes: ["One-man masterpiece", "Grief + endurance"],
  tags: ["confession dial", "grief", "loop", "masterpiece"]
},
{
  id: "woman-who-fell-to-earth",
  title: "The Woman Who Fell to Earth",
  doctor: "13th",
  season: 11,
  episodes: 1,
  code: "11.01",
  image: "https://picsum.photos/seed/womanfell/1200/675",
  summary: "The Thirteenth Doctor’s debut adventure.",
  notes: ["New era reset", "Sheffield setting"],
  tags: ["debut", "sheffield", "new era"]
}
];

const els = {
  grid: document.querySelector("#grid"),
  count: document.querySelector("#count"),
  q: document.querySelector("#q"),
  doctor: document.querySelector("#doctor"),
  clear: document.querySelector("#clearBtn"),
  theme: document.querySelector("#themeBtn"),

  modal: document.querySelector("#modal"),
  dialog: document.querySelector(".modal__dialog"),
  close: document.querySelector("#closeBtn"),
  prev: document.querySelector("#prevBtn"),
  next: document.querySelector("#nextBtn"),

  title: document.querySelector("#modalTitle"),
  desc: document.querySelector("#modalDesc"),
  meta: document.querySelector("#modalMeta"),
  summary: document.querySelector("#modalSummary"),
  notes: document.querySelector("#modalNotes"),
};

let filtered = [];
let activeIndex = -1;
let lastFocused = null;

// When we open a modal via click, we want the back button to close it (hash change).
// When we are *responding* to a hash change, avoid re-writing the hash.
let suppressHashWrite = false;

// ---------- Utils ----------
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getFilters() {
  return {
    q: els.q.value.trim(), // keep raw; we parse it
    doctor: els.doctor.value
  };
}

// --- NEW: query parsing (supports tag:xxx) ---
function parseQuery(raw) {
  const q = String(raw || "").trim();
  const m = q.match(/^tag:(.+)$/i);
  if (m) return { mode: "tag", term: m[1].trim().toLowerCase() };
  return { mode: "all", term: q.toLowerCase() };
}

// --- NEW: build a searchable “haystack” including tags (NOT rendered anywhere) ---
function storySearchHaystack(s) {
  const parts = [
    s.title,
    s.doctor,
    s.code,
    s.serialno,
    s.season,
    s.episodes,
    ...(Array.isArray(s.tags) ? s.tags : [])
  ];

  return parts
    .flatMap(v => Array.isArray(v) ? v : [v])
    .filter(v => v !== undefined && v !== null && String(v).trim() !== "")
    .join(" ")
    .toLowerCase();
}

// --- NEW: unified matcher ---
function matchesQuery(s, rawQuery) {
  const { mode, term } = parseQuery(rawQuery);
  if (!term) return true;

  if (mode === "tag") {
    return (Array.isArray(s.tags) ? s.tags : [])
      .some(t => String(t).toLowerCase().includes(term));
  }

  return storySearchHaystack(s).includes(term);
}

function applyFilters(items, f) {
  return items.filter((s) => {
    const matchesQ = matchesQuery(s, f.q);

    const matchesDoctor =
      !f.doctor || s.doctor === f.doctor;

    return matchesQ && matchesDoctor;
  });
}

function storyById(id) {
  return stories.find((s) => s.id === id) || null;
}

function filteredIndexById(id) {
  return filtered.findIndex((s) => s.id === id);
}

// Hash format: #story=blink
function getStoryIdFromHash() {
  const hash = window.location.hash || "";
  const m = hash.match(/story=([^&]+)/);
  return m ? decodeURIComponent(m[1]) : "";
}

function setStoryHash(id) {
  if (suppressHashWrite) return;
  if (!id) {
    // remove hash without jumping
    history.pushState("", document.title, window.location.pathname + window.location.search);
    return;
  }
  window.location.hash = `story=${encodeURIComponent(id)}`;
}

// ---------- Templates ----------
function cardTemplate(s) {
  const img = s.image
    ? `<img src="${escapeHtml(s.image)}" alt="" loading="lazy" />`
    : `<span>${escapeHtml(s.title.split(" ")[0])}</span>`;

  return `
    <article class="card" tabindex="0" role="button" data-id="${escapeHtml(s.id)}"
      aria-label="Open ${escapeHtml(s.title)}">
      <div class="card__media">${img}</div>
      <div class="card__body">
        <h3 class="card__title">${escapeHtml(s.title)}</h3>
        <p class="card__sub">Serial ${escapeHtml(s.serialno ?? "—")} • ${s.episodes} episode${s.episodes === 1 ? "" : "s"}</p>
        <div class="badges">
          <span class="badge badge--accent">${escapeHtml(s.doctor)} Doctor</span>
        </div>
      </div>
    </article>
  `;
}

// ---------- Render ----------
let renderRAF = 0;

function render() {
  if (renderRAF) cancelAnimationFrame(renderRAF);

  filtered = applyFilters(stories, getFilters());
  els.count.textContent = filtered.length;

  // Fade out
  els.grid.style.opacity = "0";

  window.setTimeout(() => {
    els.grid.innerHTML = filtered.map(cardTemplate).join("");

    const cards = Array.from(els.grid.querySelectorAll(".card"));

    // Enter state
    cards.forEach(c => c.classList.add("is-enter"));

    // Wire up events
    cards.forEach((card, i) => {
      card.addEventListener("click", () => openModal(i, { updateHash: true }));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(i, { updateHash: true });
        }
      });
    });

    // Animate in
    renderRAF = requestAnimationFrame(() => {
      els.grid.style.opacity = "1";
      cards.forEach((card, idx) => {
        const delay = Math.min(idx * 18, 180);
        setTimeout(() => card.classList.remove("is-enter"), delay);
      });
    });
  }, 140);
}

// ===== Subtle parallax tilt on cards =====
function enableCardTilt() {
  // Skip on touch + reduced motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (prefersReduced || isTouch) return;

  const MAX_TILT = 6;   // degrees (keep small!)
  const SCALE = 1.02;   // subtle
  const PERSPECTIVE = 800;

  const cards = Array.from(document.querySelectorAll(".card"));

  cards.forEach((card) => {
    let raf = 0;

    function onMove(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = x / rect.width;   // 0..1
      const py = y / rect.height;  // 0..1

      // tilt: top = tilt down a bit, left = tilt right a bit (feels natural)
      const tiltY = (px - 0.5) * (MAX_TILT * 2);
      const tiltX = (0.5 - py) * (MAX_TILT * 2);

      // for sheen position
      card.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
      card.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform =
          `perspective(${PERSPECTIVE}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(${SCALE})`;
      });
    }

    function onLeave() {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = "";
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
    }

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
  });
}

// Call once, and again after each render (because you rebuild the grid)
enableCardTilt();

// Hook into your render so new cards get tilt too
const _render = render;
render = function () {
  _render();
  // wait for DOM update (your render uses a timeout)
  setTimeout(enableCardTilt, 200);
};

// ---------- Modal ----------
function openModal(index, { updateHash } = { updateHash: true }) {
  if (!filtered.length) return;

  activeIndex = Math.max(0, Math.min(index, filtered.length - 1));
  const s = filtered[activeIndex];

  lastFocused = document.activeElement;

  els.title.textContent = s.title;
  els.desc.textContent = `${s.doctor} Doctor • ${s.episodes} episode${s.episodes === 1 ? "" : "s"}`;

  const hero = document.getElementById("modalHero");
  if (hero) hero.style.backgroundImage = s.image ? `url("${s.image}")` : "";

  els.meta.innerHTML = `
    <div class="kv"><span>Code</span><strong>${escapeHtml(s.code)}</strong></div>
    <div class="kv"><span>Doctor</span><strong>${escapeHtml(s.doctor)}</strong></div>
    <div class="kv"><span>Episodes</span><strong>${s.episodes}</strong></div>
  `;

  els.summary.textContent = s.summary || "—";
  els.notes.innerHTML = (s.notes || []).map((n) => `<li>${escapeHtml(n)}</li>`).join("") || "<li>—</li>";

  els.prev.disabled = filtered.length < 2;
  els.next.disabled = filtered.length < 2;

  // show
  els.modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Focus the dialog for trapFocus to work cleanly
  els.dialog.focus();

  if (updateHash) setStoryHash(s.id);
}

function closeModal({ clearHash } = { clearHash: true }) {
  els.modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (clearHash) setStoryHash("");

  if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
}

function step(delta) {
  if (filtered.length < 2) return;
  const nextIndex = (activeIndex + delta + filtered.length) % filtered.length;
  openModal(nextIndex, { updateHash: true });
}

// Click outside to close
els.modal.addEventListener("click", (e) => {
  if (e.target && e.target.matches("[data-close]")) closeModal({ clearHash: true });
});

// Buttons
els.close.addEventListener("click", () => closeModal({ clearHash: true }));
els.prev.addEventListener("click", () => step(-1));
els.next.addEventListener("click", () => step(1));

// Keyboard: ESC close, arrows navigate, trap focus
document.addEventListener("keydown", (e) => {
  const open = els.modal.getAttribute("aria-hidden") === "false";
  if (!open) return;

  if (e.key === "Escape") {
    e.preventDefault();
    closeModal({ clearHash: true });
  }
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);

  if (e.key === "Tab") trapFocus(e);
});

function trapFocus(e) {
  const focusables = els.dialog.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const list = Array.from(focusables).filter((el) => !el.disabled && el.offsetParent !== null);
  if (!list.length) return;

  const first = list[0];
  const last = list[list.length - 1];
  const active = document.activeElement;

  if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
}

// ---------- Hash routing (share + back button) ----------
function handleHashChange() {
  const id = getStoryIdFromHash();

  if (!id) {
    if (els.modal.getAttribute("aria-hidden") === "false") {
      suppressHashWrite = true;
      closeModal({ clearHash: false });
      suppressHashWrite = false;
    }
    return;
  }

  // Ensure filtered is current
  render();

  let idx = filteredIndexById(id);

  if (idx === -1) {
    const s = storyById(id);
    if (!s) return;

    const prevFiltered = filtered;
    filtered = stories.slice();
    idx = filteredIndexById(id);

    suppressHashWrite = true;
    openModal(idx, { updateHash: false });
    suppressHashWrite = false;

    filtered = prevFiltered;
    return;
  }

  suppressHashWrite = true;
  openModal(idx, { updateHash: false });
  suppressHashWrite = false;
}

window.addEventListener("hashchange", handleHashChange);

// ---------- Theme ----------
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const btn = document.getElementById("themeBtn");
  if (btn) btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  setTheme(saved || "dark");
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  const btn = document.getElementById("themeBtn");
  if (!btn) {
    console.warn("themeBtn not found");
    return;
  }

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
});

// ---------- Controls ----------
function closeIfOpen() {
  if (els.modal.getAttribute("aria-hidden") === "false") closeModal({ clearHash: true });
}

els.q.addEventListener("input", () => { render(); closeIfOpen(); });
els.doctor.addEventListener("change", () => { render(); closeIfOpen(); });

els.clear.addEventListener("click", () => {
  els.q.value = "";
  els.doctor.value = "";
  render();
  closeIfOpen();
});

function populateDoctorOptions() {
  const doctors = Array.from(new Set(stories.map(s => s.doctor))).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );

  els.doctor.innerHTML =
    `<option value="">All</option>` +
    doctors.map(d => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join("");
}

window.addEventListener("scroll", () => {
  document.body.classList.toggle("scrolled", window.scrollY > 8);
});

document.querySelector("#featuredBtn")?.addEventListener("click", () => {
  const idx = filtered.findIndex(s => s.id === "day-of-the-doctor");
  if (idx !== -1) openModal(idx, { updateHash: true });
});

document.querySelector("#randomBtn")?.addEventListener("click", () => {
  if (!filtered.length) return;
  const idx = Math.floor(Math.random() * filtered.length);
  openModal(idx, { updateHash: true });
});

// Init
initTheme();
populateDoctorOptions();
render();
handleHashChange();
