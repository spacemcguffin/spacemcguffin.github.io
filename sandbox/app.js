const stories = [
  {
    id: "daleks",
    title: "The Daleks",
    doctor: "1st",
    era: "Classic",
    season: 1,
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
    doctor: "1st",
    era: "Classic",
    season: 2,
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
    doctor: "2nd",
    era: "Classic",
    season: 5,
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
    doctor: "3rd",
    era: "Classic",
    season: 7,
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
    doctor: "10th",
    era: "Modern",
    year: 2007,
    season: 3,
    eps: 1,
    code: "3.10",
    image: "https://picsum.photos/seed/blink/1200/675",
    summary: "A timey-wimey thriller featuring the Weeping Angels.",
    notes: ["Perfect standalone", "Infamous quotes everywhere"],
  },
  {
    id: "midnight",
    title: "Midnight",
    doctor: "10th",
    era: "Modern",
    year: 2008,
    season: 4,
    eps: 1,
    code: "4.10",
    image: "https://picsum.photos/seed/midnight/1200/675",
    summary: "A tour shuttle becomes a pressure-cooker paranoia chamber.",
    notes: ["Psychological horror", "Incredible tension and performances"],
  },
  {
    id: "an-uneearthly-child",
    title: "An Unearthly Child",
    doctor: "1st",
    era: "Classic",
    year: 1963,
    season: 1,
    eps: 4,
    code: "B",
    image: "https://picsum.photos/seed/unearthly/1200/675",
    summary: "The very first Doctor Who story introducing the Doctor and Susan.",
    notes: ["First ever episode", "Totter's Lane junkyard debut"],
  },
  {
    id: "the-aztecs",
    title: "The Aztecs",
    doctor: "1st",
    era: "Classic",
    year: 1964,
    season: 1,
    eps: 4,
    code: "F",
    image: "https://picsum.photos/seed/aztecs/1200/675",
    summary: "Barbara attempts to rewrite history in ancient Mexico.",
    notes: ["Early historical classic", "Strong character drama"],
  },
  {
    id: "the-war-games",
    title: "The War Games",
    doctor: "2nd",
    era: "Classic",
    year: 1969,
    season: 6,
    eps: 10,
    code: "ZZ",
    image: "https://picsum.photos/seed/wargames/1200/675",
    summary: "The Second Doctor faces the Time Lords for the first time.",
    notes: ["Epic 10-part finale", "First Time Lord appearance"],
  },
  {
    id: "genesis-of-the-daleks",
    title: "Genesis of the Daleks",
    doctor: "4th",
    era: "Classic",
    year: 1975,
    season: 12,
    eps: 6,
    code: "4E",
    image: "https://picsum.photos/seed/genesis/1200/675",
    summary: "The Doctor is sent to Skaro to prevent the Daleks’ creation.",
    notes: ["Davros debut", "Moral dilemma masterpiece"],
  },
  {
    id: "city-of-death",
    title: "City of Death",
    doctor: "4th",
    era: "Classic",
    year: 1979,
    season: 17,
    eps: 4,
    code: "5H",
    image: "https://picsum.photos/seed/cityofdeath/1200/675",
    summary: "Time travel, art theft, and Parisian charm.",
    notes: ["Douglas Adams script", "Witty and stylish"],
  },
  {
    id: "earthshock",
    title: "Earthshock",
    doctor: "5th",
    era: "Classic",
    year: 1982,
    season: 19,
    eps: 4,
    code: "6H",
    image: "https://picsum.photos/seed/earthshock/1200/675",
    summary: "A shocking Cyberman return story.",
    notes: ["Huge twist ending", "Fan-favourite Fifth Doctor story"],
  },
  {
    id: "remembrance-of-the-daleks",
    title: "Remembrance of the Daleks",
    doctor: "7th",
    era: "Classic",
    year: 1988,
    season: 25,
    eps: 4,
    code: "7J",
    image: "https://picsum.photos/seed/remembrance/1200/675",
    summary: "The Doctor manipulates events in 1963 London.",
    notes: ["Dalek civil war", "Darker Seventh Doctor tone"],
  },
  {
    id: "rose",
    title: "Rose",
    doctor: "9th",
    era: "Modern",
    year: 2005,
    season: 1,
    eps: 1,
    code: "1.01",
    image: "https://picsum.photos/seed/rose/1200/675",
    summary: "The Doctor meets Rose Tyler.",
    notes: ["Modern revival begins", "Autons return"],
  },
  {
    id: "the-empty-child",
    title: "The Empty Child",
    doctor: "9th",
    era: "Modern",
    year: 2005,
    season: 1,
    eps: 2,
    code: "1.09",
    image: "https://picsum.photos/seed/emptychild/1200/675",
    summary: "A gas-mask child haunts wartime London.",
    notes: ["Creepy as hell", "Captain Jack debut"],
  },
  {
    id: "the-girl-in-the-fireplace",
    title: "The Girl in the Fireplace",
    doctor: "10th",
    era: "Modern",
    year: 2006,
    season: 2,
    eps: 1,
    code: "2.04",
    image: "https://picsum.photos/seed/fireplace/1200/675",
    summary: "The Doctor meets Madame de Pompadour.",
    notes: ["Emotional time romance", "Moffat time mechanics"],
  },
  {
    id: "human-nature",
    title: "Human Nature / The Family of Blood",
    doctor: "10th",
    era: "Modern",
    year: 2007,
    season: 3,
    eps: 2,
    code: "3.08",
    image: "https://picsum.photos/seed/humannature/1200/675",
    summary: "The Doctor becomes human to escape pursuit.",
    notes: ["Dark emotional arc", "Brilliant performance"],
  },
  {
    id: "the-eleventh-hour",
    title: "The Eleventh Hour",
    doctor: "11th",
    era: "Modern",
    year: 2010,
    season: 5,
    eps: 1,
    code: "5.01",
    image: "https://picsum.photos/seed/eleventhhour/1200/675",
    summary: "The Eleventh Doctor crashes into Amelia Pond’s life.",
    notes: ["New Doctor energy", "Crack in the wall"],
  },
  {
    id: "day-of-the-doctor",
    title: "The Day of the Doctor",
    doctor: "War",
    era: "Modern",
    year: 2013,
    season: 7,
    eps: 1,
    code: "50th",
    image: "https://picsum.photos/seed/daydoctor/1200/675",
    summary: "The Doctors unite to save Gallifrey.",
    notes: ["50th Anniversary special", "Multi-Doctor chaos"],
  },
  {
    id: "heaven-sent",
    title: "Heaven Sent",
    doctor: "12th",
    era: "Modern",
    year: 2015,
    season: 9,
    eps: 1,
    code: "9.11",
    image: "https://picsum.photos/seed/heavensent/1200/675",
    summary: "The Doctor trapped alone inside a confession dial.",
    notes: ["One-man masterpiece", "Grief + endurance"],
  },
  {
    id: "the-woman-who-fell-to-earth",
    title: "The Woman Who Fell to Earth",
    doctor: "13th",
    era: "Modern",
    year: 2018,
    season: 11,
    eps: 1,
    code: "11.01",
    image: "https://picsum.photos/seed/womanfell/1200/675",
    summary: "The Thirteenth Doctor’s debut adventure.",
    notes: ["New era reset", "Sheffield setting"],
  }
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










// ---------- Modal ----------
function openModal(index, { updateHash } = { updateHash: true }) {
  if (!filtered.length) return;

  activeIndex = Math.max(0, Math.min(index, filtered.length - 1));
  const s = filtered[activeIndex];

  lastFocused = document.activeElement;

  els.title.textContent = s.title;
  els.desc.textContent = `${s.doctor} Doctor • ${s.era} • ${s.year} • ${s.eps} ep${s.eps === 1 ? "" : "s"}`;

const hero = document.getElementById("modalHero");
if (hero) hero.style.backgroundImage = s.image ? `url("${s.image}")` : "";


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
