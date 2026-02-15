const stories = [
  { 
    id: "unearthly-child",
    title: "An Unearthly Child",
    doctors: ["1st"],
    serialno: "1",
    season: 1,
    episodes: 4,
    code: "A",
    image: "/sandbox/img/1/unearthlychild.png",
    summary: "Two schoolteachers follow a strange pupil home and uncover a time machine hidden in a junkyard.",
    notes: ["First Doctor Who story", "Introduces the TARDIS"],
    tags: ["season 1"]
  },
  {
    id: "the-daleks",
    title: "The Daleks",
    doctors: ["1st"],
    serialno: "2",
    season: 1,
    episodes: 7,
    code: "B",
    image: "/sandbox/img/1/thedaleks.png",
    summary: "The Doctor and companions encounter the Daleks on the planet Skaro.",
    notes: ["First Dalek story", "Established the show’s popularity"],
    tags: ["season 1"]
  },
  {
    id: "edge-of-destruction",
    title: "The Edge of Destruction",
    doctors: ["1st"],
    serialno: "3",
    season: 1,
    episodes: 2,
    code: "C",
    image: "/sandbox/img/1/edgeofdestruction.png",
    summary: "Strange forces aboard the TARDIS turn the crew against each other.",
    notes: ["Early TARDIS paranoia story"],
    tags: ["season 2"]
  },
  {
    id: "marco-polo",
    title: "Marco Polo",
    doctors: ["1st"],
    serialno: "4",
    season: 7,
    episodes: 7,
    code: "D",
    image: "/sandbox/img/1/marcopolo.png",
    summary: "The Doctor and companions journey with Marco Polo across Asia.",
    notes: ["Classic historical adventure"],
    tags: ["season 2"]
  },
  {
    id: "keys-of-marinus",
    title: "The Keys of Marinus",
    doctors: ["1st"],
    serialno: "5",
    season: 1,
    episodes: 6,
    code: "E",
    image: "/sandbox/img/1/keysofmarinus.png",
    summary: "A quest across Marinus to recover the Keys of Conscience.",
    notes: ["Quest story structure"],
    tags: ["season 3"]
  },
  {
    id: "the-aztecs",
    title: "The Aztecs",
    doctors: ["1st"],
    serialno: "6",
    season: 1,
    episodes: 4,
    code: "F",
    image: "/sandbox/img/1/theaztecs.png",
    summary: "Barbara is mistaken for a goddess in 15th-century Mexico.",
    notes: ["Classic historical story"],
    tags: ["season 4"]
  },
  {
    id: "the-sensorites",
    title: "The Sensorites",
    doctors: ["1st"],
    season: 1,
    serialno: "7",
    episodes: 6,
    code: "G",
    image: "/sandbox/img/1/thesensorites.png",
    summary: "A strange alien presence threatens a human expedition.",
    notes: ["Atmospheric early alien story"],
    tags: ["season 5"]
  },
  {
    id: "reign-of-terror",
    title: "The Reign of Terror",
    doctors: ["1st"],
    season: 1,
    serialno: "8",
    episodes: 6,
    code: "H",
    image: "/sandbox/img/1/thereignofterror.png",
    summary: "The TARDIS crew are caught up in the French Revolution.",
    notes: ["Historical adventure"],
    tags: ["season 5"]
  },
  {
    id: "tenth-planet",
    title: "The Tenth Planet",
    doctors: ["1st"],
    season: 4,
    episodes: 4,
    code: "DD",
    image: "/sandbox/img/1/tenthplanet.png",
    summary: "The Cybermen debut as Earth's twin planet Mondas appears in the sky.",
    notes: ["First Cybermen story", "First regeneration"],
    tags: ["season 4"]
  },
  {
    id: "tomb-of-the-cybermen",
    title: "The Tomb of the Cybermen",
    doctors: ["2nd"],
    season: 5,
    episodes: 4,
    code: "QQ",
    image: "/wiki/img/episodes/sickofancy.png",
    summary: "An archaeological expedition wakes a sleeping Cyber fleet.",
    notes: ["A classic base under siege feel", "Cybermen at their creepiest"],
    tags: ["season 5"]
  },
  {
    id: "spearhead-from-space",
    title: "Spearhead from Space",
    doctors: ["3rd"],
    season: 7,
    episodes: 4,
    code: "AAA",
    image: "https://picsum.photos/seed/spearhead/1200/675",
    summary: "UNIT investigates Auton activity as the Doctor regenerates.",
    notes: ["First Third Doctor story", "Strong action + mystery"],
    tags: ["season 7"]
  },
  {
    id: "blink",
    title: "Blink",
    doctors: ["10th"],
    season: 3,
    episodes: 1,
    code: "3.10",
    image: "https://picsum.photos/seed/blink/1200/675",
    summary: "A timey-wimey thriller featuring the Weeping Angels.",
    notes: ["Perfect standalone", "Infamous quotes everywhere"],
    tags: ["series 3"]
  },
  {
    id: "midnight",
    title: "Midnight",
    doctors: ["10th"],
    season: 4,
    episodes: 1,
    code: "4.10",
    image: "https://picsum.photos/seed/midnight/1200/675",
    summary: "A tour shuttle becomes a pressure-cooker paranoia chamber.",
    notes: ["Psychological horror", "Incredible tension and performances"],
    tags: ["series 4"]
  },
  {
    id: "war-games",
    title: "The War Games",
    doctors: ["2nd"],
    season: 6,
    episodes: 10,
    code: "ZZ",
    image: "https://picsum.photos/seed/wargames/1200/675",
    summary: "The Second Doctor faces the Time Lords for the first time.",
    notes: ["Epic 10-part finale", "First Time Lord appearance"],
    tags: ["season 6"]
  },
  {
    id: "genesis-of-the-daleks",
    title: "Genesis of the Daleks",
    doctors: ["4th"],
    season: 12,
    episodes: 6,
    code: "4E",
    image: "https://picsum.photos/seed/genesis/1200/675",
    summary: "The Doctor is sent to Skaro to prevent the Daleks’ creation.",
    notes: ["Davros debut", "Moral dilemma masterpiece"],
    tags: ["season 12"]
  },
  {
    id: "city-of-death",
    title: "City of Death",
    doctors: ["4th"],
    season: 17,
    episodes: 4,
    code: "5H",
    image: "https://picsum.photos/seed/cityofdeath/1200/675",
    summary: "Time travel, art theft, and Parisian charm.",
    notes: ["Douglas Adams script", "Witty and stylish"],
    tags: ["season 17"]
  },
  {
    id: "earthshock",
    title: "Earthshock",
    doctors: ["5th"],
    season: 19,
    episodes: 4,
    code: "6H",
    image: "https://picsum.photos/seed/earthshock/1200/675",
    summary: "A shocking Cyberman return story.",
    notes: ["Huge twist ending", "Fan-favourite Fifth Doctor story"],
    tags: ["season 19"]
  },
  {
    id: "remembrance-of-the-daleks",
    title: "Remembrance of the Daleks",
    doctors: ["7th"],
    season: 25,
    episodes: 4,
    code: "7J",
    image: "https://picsum.photos/seed/remembrance/1200/675",
    summary: "The Doctor manipulates events in 1963 London.",
    notes: ["Dalek civil war", "Darker Seventh Doctor tone"],
    tags: ["season 25"]
  },
  {
    id: "rose",
    title: "Rose",
    doctors: ["9th"],
    season: 1,
    episodes: 1,
    code: "1.01",
    image: "https://picsum.photos/seed/rose/1200/675",
    summary: "The Doctor meets Rose Tyler.",
    notes: ["Modern revival begins", "Autons return"],
    tags: ["series 1"]
  },
  {
    id: "the-empty-child",
    title: "The Empty Child",
    doctors: ["9th"],
    season: 1,
    episodes: 2,
    code: "1.09",
    image: "https://picsum.photos/seed/emptychild/1200/675",
    summary: "A gas-mask child haunts wartime London.",
    notes: ["Creepy as hell", "Captain Jack debut"],
    tags: ["series 1"]
  },
  {
    id: "girl-in-the-fireplace",
    title: "The Girl in the Fireplace",
    doctors: ["10th"],
    season: 2,
    episodes: 1,
    code: "2.04",
    image: "https://picsum.photos/seed/fireplace/1200/675",
    summary: "The Doctor meets Madame de Pompadour.",
    notes: ["Emotional time romance", "Moffat time mechanics"],
    tags: ["series 2"]
  },
  {
    id: "human-nature",
    title: "Human Nature / The Family of Blood",
    doctors: ["10th"],
    season: 3,
    episodes: 2,
    code: "3.08",
    image: "https://picsum.photos/seed/humannature/1200/675",
    summary: "The Doctor becomes human to escape pursuit.",
    notes: ["Dark emotional arc", "Brilliant performance"],
    tags: ["series 3"]
  },
  {
    id: "eleventh-hour",
    title: "The Eleventh Hour",
    doctors: ["11th"],
    season: 5,
    episodes: 1,
    code: "5.01",
    image: "https://picsum.photos/seed/eleventhhour/1200/675",
    summary: "The Eleventh Doctor crashes into Amelia Pond’s life.",
    notes: ["New Doctor energy", "Crack in the wall"],
    tags: ["series 5"]
  },
  {
    id: "day-of-the-doctor",
    title: "The Day of the Doctor",
    doctors: ["10th", "11th", "War"],
    season: 7,
    episodes: 1,
    code: "50th",
    image: "https://picsum.photos/seed/daydoctor/1200/675",
    summary: "The Doctors unite to save Gallifrey.",
    notes: ["50th Anniversary special", "Multi-Doctor chaos"],
    tags: ["series 7", "multi-doctor", "specials"]
  },
  {
    id: "heaven-sent",
    title: "Heaven Sent",
    doctors: ["12th"],
    season: 9,
    episodes: 1,
    code: "9.11",
    image: "https://picsum.photos/seed/heavensent/1200/675",
    summary: "The Doctor trapped alone inside a confession dial.",
    notes: ["One-man masterpiece", "Grief + endurance"],
    tags: ["series 9"]
  },
  {
    id: "woman-who-fell-to-earth",
    title: "The Woman Who Fell to Earth",
    doctors: ["13th"],
    season: 11,
    episodes: 1,
    code: "11.01",
    image: "https://picsum.photos/seed/womanfell/1200/675",
    summary: "The Thirteenth Doctor’s debut adventure.",
    notes: ["New era reset", "Sheffield setting"],
    tags: ["series 11"]
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

  // footer duplicates (optional)
  prev2: document.querySelector("#prevBtn2"),
  next2: document.querySelector("#nextBtn2"),

  title: document.querySelector("#modalTitle"),
  desc: document.querySelector("#modalDesc"),
  meta: document.querySelector("#modalMeta"),
  summary: document.querySelector("#modalSummary"),
  notes: document.querySelector("#modalNotes"),
};

let filtered = [];
let activeIndex = -1;
let lastFocused = null;
let suppressHashWrite = false;

// --- Multi-select doctor filter state ---
const selectedDoctors = new Set();

// ---------- Utils ----------
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Supports doctors:[] AND legacy doctor:""
function getDoctorList(s) {
  if (Array.isArray(s.doctors) && s.doctors.length) return s.doctors;
  if (s.doctor) return [s.doctor];
  return [];
}

function syncDoctorDropdownUI() {
  if (!els.doctor) return;
  if (selectedDoctors.size === 1) {
    els.doctor.value = Array.from(selectedDoctors)[0];
  } else if (selectedDoctors.size > 1) {
    els.doctor.value = "";
  }
}

function toggleDoctor(d) {
  if (!d) return;
  if (selectedDoctors.has(d)) selectedDoctors.delete(d);
  else selectedDoctors.add(d);

  syncDoctorDropdownUI();
  render();
  closeIfOpen();
}

// Doctor pills HTML (buttons)
function doctorPillsHTML(s, { clickable = true } = {}) {
  const ds = getDoctorList(s);
  if (!ds.length) return `<span class="badge">—</span>`;

  return ds.map((d) => {
    const on = selectedDoctors.has(d);
    if (!clickable) return `<span class="badge">${escapeHtml(d)}</span>`;

    return `
      <button type="button"
        class="badge badge--doctor ${on ? "is-on" : ""}"
        data-doctor="${escapeHtml(d)}"
        aria-pressed="${on ? "true" : "false"}"
        aria-label="${on ? "Remove" : "Add"} ${escapeHtml(d)} Doctor filter">
        ${escapeHtml(d)}
      </button>
    `;
  }).join("");
}

function getFilters() {
  return {
    q: els.q.value.trim(),
    doctor: els.doctor.value,
    doctors: Array.from(selectedDoctors)
  };
}

// --- Query parsing (supports tag:xxx) ---
function parseQuery(raw) {
  const q = String(raw || "").trim();
  const m = q.match(/^tag:(.+)$/i);
  if (m) return { mode: "tag", term: m[1].trim().toLowerCase() };
  return { mode: "all", term: q.toLowerCase() };
}

// --- Search haystack includes tags + all doctors (tags never shown) ---
function storySearchHaystack(s) {
  const parts = [
    s.title,
    ...getDoctorList(s),
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

function matchesQuery(s, rawQuery) {
  const { mode, term } = parseQuery(rawQuery);
  if (!term) return true;

  if (mode === "tag") {
    return (Array.isArray(s.tags) ? s.tags : [])
      .some(t => String(t).toLowerCase().includes(term));
  }

  return storySearchHaystack(s).includes(term);
}

// ---------- Tag autocomplete ----------
function buildTagIndex(items) {
  const seen = new Map();
  items.forEach(s => {
    (Array.isArray(s.tags) ? s.tags : []).forEach(t => {
      const orig = String(t).trim();
      if (!orig) return;
      const key = orig.toLowerCase();
      if (!seen.has(key)) seen.set(key, orig);
    });
  });

  return Array.from(seen.values()).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
}

function initTagAutocomplete({ maxItems = 10, fillMode = "plain" } = {}) {
  const input = els.q;
  if (!input) return;

  const parent = input.closest(".ac") || input.parentElement;
  if (!parent) return;

  const panel = document.createElement("div");
  panel.className = "ac__panel";
  panel.setAttribute("role", "listbox");
  parent.appendChild(panel);

  let tags = buildTagIndex(stories);
  let open = false;
  let active = -1;
  let current = [];

  function getTerm(raw) {
    const q = String(raw || "").trim();
    if (/^tag:/i.test(q)) return q.replace(/^tag:\s*/i, "").trim().toLowerCase();
    return q.toLowerCase();
  }

  function openPanel() {
    if (open) return;
    panel.style.display = "block";
    open = true;
  }

  function close() {
    if (!open) return;
    panel.style.display = "none";
    panel.innerHTML = "";
    open = false;
    active = -1;
    current = [];
  }

  function highlight(idx) {
    const items = Array.from(panel.querySelectorAll(".ac__item"));
    items.forEach((el, i) => el.setAttribute("aria-selected", i === idx ? "true" : "false"));
  }

  function choose(idx) {
    const tag = current[idx];
    if (!tag) return;

    input.value = (fillMode === "plain") ? tag : `tag:${tag}`;
    close();
    input.focus();

    render();
    closeIfOpen();
  }

  function renderList(list) {
    panel.innerHTML = "";
    current = list;
    active = -1;

    if (!list.length) { close(); return; }

    list.forEach((tag, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ac__item";
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-selected", "false");
      btn.innerHTML = `
        <span class="ac__tag">${escapeHtml(tag)}</span>
        <span class="ac__hint">${fillMode === "tag" ? "tag search" : "search"}</span>
      `;
      btn.addEventListener("mousedown", (e) => { e.preventDefault(); choose(i); });
      panel.appendChild(btn);
    });

    openPanel();
  }

  function update() {
    tags = buildTagIndex(stories);
    const term = getTerm(input.value);

    if (!term) { close(); return; }

    const list = tags
      .filter(t => t.toLowerCase().includes(term))
      .slice(0, maxItems);

    renderList(list);
  }

  input.addEventListener("input", update);

  input.addEventListener("keydown", (e) => {
    if (!open) {
      if (e.key === "ArrowDown") {
        update();
        if (open) {
          e.preventDefault();
          active = 0;
          highlight(active);
        }
      }
      return;
    }

    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, current.length - 1); highlight(active); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(active - 1, 0); highlight(active); return; }
    if (e.key === "Enter" && active >= 0) { e.preventDefault(); choose(active); }
  });

  document.addEventListener("mousedown", (e) => {
    if (!open) return;
    if (panel.contains(e.target)) return;
    if (e.target === input) return;
    close();
  });

  input.addEventListener("blur", () => setTimeout(close, 80));
  els.clear?.addEventListener("click", () => close());
}

// ---------- Filtering ----------
function applyFilters(items, f) {
  return items.filter((s) => {
    const matchesQ = matchesQuery(s, f.q);

    const storyDoctors = getDoctorList(s);
    const matchesDoctor =
      (f.doctors && f.doctors.length)
        ? f.doctors.some(d => storyDoctors.includes(d))
        : (!f.doctor || storyDoctors.includes(f.doctor));

    return matchesQ && matchesDoctor;
  });
}

// ---------- Hash routing ----------
function storyById(id) {
  return stories.find((s) => s.id === id) || null;
}
function filteredIndexById(id) {
  return filtered.findIndex((s) => s.id === id);
}
function getStoryIdFromHash() {
  const hash = window.location.hash || "";
  const m = hash.match(/story=([^&]+)/);
  return m ? decodeURIComponent(m[1]) : "";
}
function setStoryHash(id) {
  if (suppressHashWrite) return;
  if (!id) {
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
          ${doctorPillsHTML(s, { clickable: true })}
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

  els.grid.style.opacity = "0";

  window.setTimeout(() => {
    els.grid.innerHTML = filtered.map(cardTemplate).join("");

    const cards = Array.from(els.grid.querySelectorAll(".card"));

    cards.forEach((card, i) => {
      card.addEventListener("click", () => openModal(i, { updateHash: true }));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(i, { updateHash: true });
        }
      });
    });

    renderRAF = requestAnimationFrame(() => {
      els.grid.style.opacity = "1";
    });
  }, 120);
}

// ---------- Modal ----------
function openModal(index, { updateHash } = { updateHash: true }) {
  if (!filtered.length) return;

  activeIndex = Math.max(0, Math.min(index, filtered.length - 1));
  const s = filtered[activeIndex];

  lastFocused = document.activeElement;

  els.title.textContent = s.title;

  // Doctors as clickable pills + episode count
  els.desc.innerHTML = `
    <span class="modal__doctors">${doctorPillsHTML(s, { clickable: true })}</span>
    <span class="modal__sep"> • </span>
    <span>${s.episodes} episode${s.episodes === 1 ? "" : "s"}</span>
  `;

  const hero = document.getElementById("modalHero");
  if (hero) hero.style.backgroundImage = s.image ? `url("${s.image}")` : "";

  els.meta.innerHTML = `
    <div class="kv"><span>Code</span><strong>${escapeHtml(s.code)}</strong></div>
    <div class="kv"><span>Doctor</span><strong>${doctorPillsHTML(s, { clickable: true })}</strong></div>
    <div class="kv"><span>Episodes</span><strong>${s.episodes}</strong></div>
  `;

  els.summary.textContent = s.summary || "—";
  els.notes.innerHTML = (s.notes || []).map((n) => `<li>${escapeHtml(n)}</li>`).join("") || "<li>—</li>";

  const canStep = filtered.length >= 2;
  els.prev.disabled = !canStep;
  els.next.disabled = !canStep;
  if (els.prev2) els.prev2.disabled = !canStep;
  if (els.next2) els.next2.disabled = !canStep;

  els.modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
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

els.modal.addEventListener("click", (e) => {
  if (e.target && e.target.matches("[data-close]")) closeModal({ clearHash: true });
});

els.close.addEventListener("click", () => closeModal({ clearHash: true }));
els.prev.addEventListener("click", () => step(-1));
els.next.addEventListener("click", () => step(1));
els.prev2?.addEventListener("click", () => step(-1));
els.next2?.addEventListener("click", () => step(1));

document.addEventListener("keydown", (e) => {
  const open = els.modal.getAttribute("aria-hidden") === "false";
  if (!open) return;

  if (e.key === "Escape") { e.preventDefault(); closeModal({ clearHash: true }); }
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

  if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
}

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
  els.theme?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
});

// ---------- Controls ----------
function closeIfOpen() {
  if (els.modal.getAttribute("aria-hidden") === "false") closeModal({ clearHash: true });
}

els.q.addEventListener("input", () => { render(); closeIfOpen(); });

// Dropdown = single-select, also clears multi-select when "All"
els.doctor.addEventListener("change", () => {
  const v = els.doctor.value;
  selectedDoctors.clear();
  if (v) selectedDoctors.add(v);
  render();
  closeIfOpen();
});

els.clear.addEventListener("click", () => {
  els.q.value = "";
  els.doctor.value = "";
  selectedDoctors.clear();
  render();
  closeIfOpen();
});

// Clicking a doctor pill on cards toggles multi-select WITHOUT opening modal
els.grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".badge--doctor[data-doctor]");
  if (!btn) return;

  e.preventDefault();
  e.stopPropagation();
  toggleDoctor(btn.getAttribute("data-doctor"));
});

// Clicking a doctor pill in modal toggles and closes (so you see filtered grid)
els.dialog.addEventListener("click", (e) => {
  const btn = e.target.closest(".badge--doctor[data-doctor]");
  if (!btn) return;

  e.preventDefault();
  closeModal({ clearHash: true });
  toggleDoctor(btn.getAttribute("data-doctor"));
});

function populateDoctorOptions() {
  const doctors = Array.from(new Set(stories.flatMap(s => getDoctorList(s))))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

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
populateDoctorOptions();
initTagAutocomplete({ maxItems: 10, fillMode: "plain" });
render();
handleHashChange();
