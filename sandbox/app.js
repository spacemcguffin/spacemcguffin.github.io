const stories = [
  {
    id: "daleks",
    title: "The Daleks",
    doctor: "First",
    era: "Classic",
    year: 1963,
    eps: 7,
    code: "A",
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

function cardTemplate(s) {
  return `
    <article class="card" tabindex="0" role="button" data-id="${escapeHtml(s.id)}"
      aria-label="Open ${escapeHtml(s.title)}">
      <div class="card__media"><span>${escapeHtml(s.title.split(" ")[0])}</span></div>
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
    card.addEventListener("click", () => openModal(i));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(i);
      }
    });
  });
}

// ---------- Modal ----------
function openModal(index) {
  if (!filtered.length) return;

  activeIndex = Math.max(0, Math.min(index, filtered.length - 1));
  const s = filtered[activeIndex];

  lastFocused = document.activeElement;

  els.title.textContent = s.title;
  els.desc.textContent = `${s.doctor} Doctor • ${s.era} • ${s.year} • ${s.eps} ep${s.eps === 1 ? "" : "s"}`;

  els.media.textContent = s.title;

  els.meta.innerHTML = `
    <div class="kv"><span>Code</span><strong>${escapeHtml(s.code)}</strong></div>
    <div class="kv"><span>Doctor</span><strong>${escapeHtml(s.doctor)}</strong></div>
    <div class="kv"><span>Era</span><strong>${escapeHtml(s.era)}</strong></div>
    <div class="kv"><span>Year</span><strong>${s.year}</strong></div>
    <div class="kv"><span>Episodes</span><strong>${s.eps}</strong></div>
  `;

  els.summary.textContent = s.summary || "—";

  els.notes.innerHTML = (s.notes || [])
    .map((n) => `<li>${escapeHtml(n)}</li>`)
    .join("") || "<li>—</li>";

  els.prev.disabled = filtered.length < 2;
  els.next.disabled = filtered.length < 2;

  // show
  els.modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // focus
  els.dialog.focus();
}

function closeModal() {
  els.modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocused && typeof lastFocused.focus === "function") {
    lastFocused.focus();
  }
}

function step(delta) {
  if (filtered.length < 2) return;
  const nextIndex = (activeIndex + delta + filtered.length) % filtered.length;
  openModal(nextIndex);
}

// Click outside to close
els.modal.addEventListener("click", (e) => {
  if (e.target && e.target.matches("[data-close]")) closeModal();
});

// Buttons
els.close.addEventListener("click", closeModal);
els.prev.addEventListener("click", () => step(-1));
els.next.addEventListener("click", () => step(1));

// Keyboard: ESC close, arrows navigate, trap focus
document.addEventListener("keydown", (e) => {
  const open = els.modal.getAttribute("aria-hidden") === "false";
  if (!open) return;

  if (e.key === "Escape") {
    e.preventDefault();
    closeModal();
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
els.q.addEventListener("input", () => {
  render();
  // if modal open, keep it coherent by closing
  if (els.modal.getAttribute("aria-hidden") === "false") closeModal();
});
els.doctor.addEventListener("change", () => {
  render();
  if (els.modal.getAttribute("aria-hidden") === "false") closeModal();
});
els.era.addEventListener("change", () => {
  render();
  if (els.modal.getAttribute("aria-hidden") === "false") closeModal();
});
els.clear.addEventListener("click", () => {
  els.q.value = "";
  els.doctor.value = "";
  els.era.value = "";
  render();
  if (els.modal.getAttribute("aria-hidden") === "false") closeModal();
});

// Init
initTheme();
render();
