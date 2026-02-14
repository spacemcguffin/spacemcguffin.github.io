const stories = [
  {
    id: "daleks",
    title: "The Daleks",
    doctor: "First",
    era: "Classic",
    year: 1963,
    eps: 7,
    code: "A",
    image: "https://picsum.photos/seed/daleks/1200/675",
    summary: "The Doctor’s earliest encounter with the Daleks in the city of Skaro.",
    notes: ["Great intro to early Who", "Iconic villain origin vibes"],
  },
  {
    id: "web-planet",
    title: "The Web Planet",
    doctor: "First",
    era: "Classic",
    year: 1965,
    eps: 6,
    code: "R",
    image: "https://picsum.photos/seed/webplanet/1200/675",
    summary: "On Vortis, giant insects and strange alien politics trap the TARDIS crew.",
    notes: ["Very ambitious visuals for the time", "A real mood piece"],
  },
  {
    id: "tomb-cybermen",
    title: "The Tomb of the Cybermen",
    doctor: "Second",
    era: "Classic",
    year: 1967,
    eps: 4,
    code: "QQ",
    image: "https://picsum.photos/seed/tomb/1200/675",
    summary: "An archaeological expedition wakes a sleeping Cyber fleet.",
    notes: ["A classic base-under-siege feel", "Cybermen at their creepiest"],
  },
  {
    id: "spearhead",
    title: "Spearhead from Space",
    doctor: "Third",
    era: "Classic",
    year: 1970,
    eps: 4,
    code: "AAA",
    image: "https://picsum.photos/seed/spearhead/1200/675",
    summary: "UNIT investigates Auton activity as the Doctor regenerates.",
    notes: ["First Third Doctor story", "Strong action + mystery"],
  },
  {
    id: "blink",
    title: "Blink",
    doctor: "Tenth",
    era: "Modern",
    year: 2007,
    eps: 1,
    code: "3.10",
    image: "https://picsum.photos/seed/blink/1200/675",
    summary: "A timey-wimey thriller featuring the Weeping Angels.",
    notes: ["Perfect standalone", "Infamous quotes everywhere"],
  },
  {
    id: "midnight",
    title: "Midnight",
    doctor: "Tenth",
    era: "Modern",
    year: 2008,
    eps: 1,
    code: "4.10",
    image: "https://picsum.photos/seed/midnight/1200/675",
    summary: "A tour shuttle becomes a pressure-cooker paranoia chamber.",
    notes: ["Psychological horror", "Incredible tension and performances"],
  },
];

const els = {
  grid: document.querySelector("#grid"),
  count: document.querySelector("#count"),
  q: document.querySelector("#q"),
  doctor: document.querySelector("#doctor"),
  era: document.querySelector("#era"),
  clear: document.querySelector("#clearBtn"),
  theme: document.querySelector("#themeBtn"),

  modal: document.querySelector("#modal"),
  dialog: document.querySelector(".modal__dialog"),
  close: document.querySelector("#closeBtn"),
  prev: document.querySelector("#prevBtn"),
  next: document.querySelector("#nextBtn"),

  title: document.querySelector("#modalTitle"),
  desc: document.querySelector("#modalDesc"),
  media: document.querySelector("#modalMedia"),
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
    q: els.q.value.trim().toLowerCase(),
    doctor: els.doctor.value,
    era: els.era.value,
  };
}

function applyFilters(items, f) {
  return items.filter((s) => {
    const matchesQ =
      !f.q ||
      s.title.toLowerCase().includes(f.q) ||
      s.doctor.toLowerCase().includes(f.q) ||
      s.era.toLowerCase().includes(f.q) ||
      String(s.year).includes(f.q) ||
      String(s.code).toLowerCase().includes(f.q);

    const matchesDoctor = !f.doctor || s.doctor === f.doctor;
    const matchesEra = !f.era || s.era === f.era;

    return matchesQ && matchesDoctor && matchesEra;
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
        <p class="card__sub">${escapeHtml(s.era)} • ${s.year} • ${s.eps} ep${s.eps === 1 ? "" : "s"}</p>
        <div class="badges">
          <span class="badge badge--accent">${escapeHtml(s.doctor)} Doctor</span>
          <span class="badge">${escapeHtml(s.era)}</span>
        </div>
      </div>
    </article>
  `;
}

// ---------- Render ----------
function render() {
  filtered = applyFilters(stories, getFilters());
  els.count.textContent = filtered.length;

  els.grid.innerHTML = filtered.map(cardTemplate).join("");

  els.grid.querySelectorAll(".card").forEach((card, i) => {
    card.addEventListener("click", () => openModal(i, { updateHash: true }));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(i, { updateHash: true });
      }
    });
  });
}

// ---------- Modal ----------
function openModal(index, { updateHash } = { updateHash: true }) {
  if (!filtered.length) return;

  activeIndex = Math.max(0, Math.min(index, filtered.length - 1));
  const s = filtered[activeIndex];

  lastFocused = document.activeElement;

  els.title.textContent = s.title;
  els.desc.textContent = `${s.doctor} Doctor • ${s.era} • ${s.year} • ${s.eps} ep${s.eps === 1 ? "" : "s"}`;

  els.media.innerHTML = s.image
    ? `<img src="${escapeHtml(s.image)}" alt="" />`
    : `<span>${escapeHtml(s.title)}</span>`;

  els.meta.innerHTML = `
    <div class="kv"><span>Code</span><strong>${escapeHtml(s.code)}</strong></div>
    <div class="kv"><span>Doctor</span><strong>${escapeHtml(s.doctor)}</strong></div>
    <div class="kv"><span>Era</span><strong>${escapeHtml(s.era)}</strong></div>
    <div class="kv"><span>Year</span><strong>${s.year}</strong></div>
    <div class="kv"><span>Episodes</span><strong>${s.eps}</strong></div>
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

  // No story hash -> close if open
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

  // If the story is filtered out, we can still open it by using the full list
  // but UX-wise it's nicer to open it if present; otherwise fall back to global index.
  let idx = filteredIndexById(id);

  if (idx === -1) {
    const s = storyById(id);
    if (!s) return; // invalid id
    // Open using global list by temporarily swapping filtered
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
  els.theme.textContent = theme === "light" ? "☾" : "☀";
}
function initTheme() {
  const saved = localStorage.getItem("theme");
  setTheme(saved || "dark");
}
els.theme.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

// ---------- Controls ----------
function closeIfOpen() {
  if (els.modal.getAttribute("aria-hidden") === "false") closeModal({ clearHash: true });
}

els.q.addEventListener("input", () => { render(); closeIfOpen(); });
els.doctor.addEventListener("change", () => { render(); closeIfOpen(); });
els.era.addEventListener("change", () => { render(); closeIfOpen(); });

els.clear.addEventListener("click", () => {
  els.q.value = "";
  els.doctor.value = "";
  els.era.value = "";
  render();
  closeIfOpen();
});

// Init
initTheme();
render();
handleHashChange(); // open modal if URL already has #story=...
