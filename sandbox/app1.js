// app.js — Doctor-only filtering with multi-Doctor support (doctors: ["10","11","War"])

// ====== DATA ======
const STORIES = [
  {
    id: "tv-blink",
    title: "Blink",
    doctors: ["10"],
    year: 2007,
    tags: ["Weeping Angels", "Mystery", "Remembrance"],
    villains: ["Weeping Angels"],
    poster: "https://commons.wikimedia.org/wiki/Special:FilePath/WeepingAngel.jpg",
    summary: "A Doctor-light classic featuring the Weeping Angels."
  },
  {
    id: "tv-dalek",
    title: "Dalek",
    doctors: ["9"],
    year: 2005,
    tags: ["Daleks", "Revival"],
    villains: ["Daleks"],
    poster: "https://commons.wikimedia.org/wiki/Special:FilePath/Dalek%20prop.jpg",
    summary: "A lone Dalek in captivity confronts the Ninth Doctor."
  },
  {
    id: "audio-chimes",
    title: "The Chimes of Midnight",
    doctors: ["8"],
    year: 2002,
    tags: ["Time Loop", "Classic"],
    villains: ["—"],
    poster: "https://commons.wikimedia.org/wiki/Special:FilePath/Doctor_Who_Experience_(15080434321).jpg",
    summary: "A sinister Edwardian mystery trapped in a time loop."
  },
  {
    id: "tv-day",
    title: "The Day of the Doctor",
    doctors: ["10","11","War"],
    year: 2013,
    tags: ["Anniversary", "Multi-Doctor"],
    villains: ["Zygons", "Daleks"],
    poster: "https://commons.wikimedia.org/wiki/Special:FilePath/Dalek_(10634451635).jpg",
    summary: "Three Doctors, one Moment, and a very big decision."
  }
];

// ====== STATE ======
const state = {
  q: "",
  doctor: new Set(),
  // Filtering mode for multi-select:
  // "any" = show stories that include ANY selected doctor (recommended)
  // "all" = show stories that include ALL selected doctors
  doctorMode: "any",
};

// ====== HELPERS ======
const $ = (id) => document.getElementById(id);

function escapeHTML(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setTheme(next){
  document.body.setAttribute("data-theme", next);
  $("themeIcon").textContent = next === "light" ? "☀️" : "🌙";
  localStorage.setItem("theme", next);
}

function storyDoctorsArray(s){
  // Backwards-safe: supports old `doctor: "10"` too
  if (Array.isArray(s.doctors)) return s.doctors;
  if (s.doctor) return [s.doctor];
  return [];
}

function formatDoctors(doctors){
  const list = Array.isArray(doctors) ? doctors : [];
  if (!list.length) return "—";
  return list.map(d => d === "War" ? "War Doctor" : `Doctor ${d}`).join(" • ");
}

// ====== DOCTOR CHIPS ======
function chipHTML(value, label){
  const on = state.doctor.has(value);
  return `
    <div class="chip" role="button" tabindex="0"
         data-value="${value}" data-on="${on ? "true":"false"}">
      <span class="dot" aria-hidden="true"></span>
      <span>${escapeHTML(label ?? value)}</span>
    </div>
  `;
}

function buildDoctorChips(){
  const doctorOptions = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","War"];

  $("chipsDoctor").innerHTML = doctorOptions
    .map(x => chipHTML(x, x === "War" ? "War Doctor" : "Doctor " + x))
    .join("");

  document.querySelectorAll("#chipsDoctor .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const value = chip.dataset.value;
      if (state.doctor.has(value)) state.doctor.delete(value);
      else state.doctor.add(value);

      chip.dataset.on = state.doctor.has(value) ? "true" : "false";
      render();
    });

    chip.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        chip.click();
      }
    });
  });
}

function syncDoctorChips(){
  document.querySelectorAll("#chipsDoctor .chip").forEach(chip => {
    chip.dataset.on = state.doctor.has(chip.dataset.value) ? "true" : "false";
  });
}

// ====== FILTERING ======
function applyFilters(items){
  const q = state.q.trim().toLowerCase();

  return items.filter(s => {
    const qok = !q || (
      (s.title || "").toLowerCase().includes(q) ||
      (s.tags || []).join(" ").toLowerCase().includes(q) ||
      (s.villains || []).join(" ").toLowerCase().includes(q)
    );

    const docs = storyDoctorsArray(s);
    let doctorOk = true;

    if (state.doctor.size === 0) {
      doctorOk = true;
    } else if (state.doctorMode === "all") {
      doctorOk = [...state.doctor].every(d => docs.includes(d));
    } else {
      // default: "any"
      doctorOk = docs.some(d => state.doctor.has(d));
    }

    return qok && doctorOk;
  });
}

// ====== MODAL ======
function openModal(story){
  if (!story) return;

  $("modalTitle").textContent = story.title || "Untitled";

  const meta = [
    formatDoctors(storyDoctorsArray(story)),
    story.year
  ].filter(Boolean).join(" • ");
  $("modalMeta").textContent = meta || "";

  $("modalTags").innerHTML = (story.tags || []).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join("");
  $("modalSummary").textContent = story.summary || "No summary yet.";

  $("modalPoster").innerHTML = story.poster
    ? `<img src="${story.poster}" alt="" loading="lazy">`
    : "";

  const items = [
    ["Villains", (story.villains && story.villains.length) ? story.villains.join(", ") : "—"],
    ["Doctor(s)", formatDoctors(storyDoctorsArray(story))],
    ["Year", story.year ?? "—"],
  ];

  $("modalGrid").innerHTML = items.map(([k,v]) => `
    <div class="modalItem">
      <span class="k">${escapeHTML(k)}</span>
      <span class="v">${escapeHTML(v)}</span>
    </div>
  `).join("");

  document.body.classList.add("modal-open");
  $("modal").setAttribute("aria-hidden", "false");
  $("modalOverlay").setAttribute("aria-hidden", "false");
  $("modalClose").focus();
}

function closeModal(){
  document.body.classList.remove("modal-open");
  $("modal").setAttribute("aria-hidden", "true");
  $("modalOverlay").setAttribute("aria-hidden", "true");
}

// ====== RENDER ======
function storyCard(s){
  const tags = (s.tags || []).slice(0,3).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join("");
  const poster = s.poster ? `<img src="${s.poster}" alt="" loading="lazy">` : "";

  const line = [
    formatDoctors(storyDoctorsArray(s)),
    s.year
  ].filter(Boolean).join(" • ");

  return `
    <div class="card" role="button" tabindex="0" data-id="${escapeHTML(s.id)}" aria-label="${escapeHTML(s.title)}">
      <div class="poster">${poster}</div>
      <div class="meta">
        <div class="name">${escapeHTML(s.title)}</div>
        <div class="line">${escapeHTML(line)}</div>
        <div class="tagrow">${tags}</div>
      </div>
    </div>
  `;
}

function render(){
  const grid = $("grid");
  const empty = $("empty");
  const count = $("resultCount");

  const filtered = applyFilters(STORIES);

  count.textContent = `${filtered.length} stor${filtered.length === 1 ? "y" : "ies"} found`;
  grid.innerHTML = filtered.map(storyCard).join("");
  empty.style.display = filtered.length ? "none" : "block";

  grid.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    const s = STORIES.find(x => x.id === id);

    card.addEventListener("click", () => openModal(s));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(s);
      }
    });
  });
}

// ====== INIT ======
document.addEventListener("DOMContentLoaded", () => {
  // Theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);

  // Doctor chips
  buildDoctorChips();

  // Optional: If you add a UI toggle later, you can hook it like:
  // state.doctorMode = "any" | "all"; render();

  // Search
  $("q").addEventListener("input", (e) => {
    state.q = e.target.value;
    render();
  });

  // Clear/show all
  $("clearFiltersBtn").addEventListener("click", () => {
    state.q = "";
    $("q").value = "";
    state.doctor.clear();
    syncDoctorChips();
    render();
  });

  $("showAllBtn").addEventListener("click", () => {
    state.q = "";
    $("q").value = "";
    state.doctor.clear();
    syncDoctorChips();
    render();
  });

  // Theme toggle
  $("themeBtn").addEventListener("click", () => {
    const cur = document.body.getAttribute("data-theme") || "dark";
    setTheme(cur === "dark" ? "light" : "dark");
  });

  // Modal close
  $("modalClose").addEventListener("click", closeModal);
  $("modalOverlay").addEventListener("click", closeModal);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("modal-open")) closeModal();
  });

  render();
});
