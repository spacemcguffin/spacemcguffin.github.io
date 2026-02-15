// ====== DATA ======
// Add/expand freely. Posters should be direct image URLs.
// For screenshot-like cards, use serial + episodes (optional).
const STORIES = [
  {
    id: "s01-01",
    title: "An Unearthly Child",
    doctors: ["1"],
    serial: 1,
    episodes: 4,
    year: 1963,
    villains: [],
    tags: ["Pilot", "Hartnell"],
    poster: "https://commons.wikimedia.org/wiki/Special:FilePath/Doctor_Who_(1963)_opening_titles.jpg",
    summary: "The very first story: mysterious teachers follow Susan and discover the TARDIS."
  },
  {
    id: "s01-02",
    title: "The Daleks",
    doctors: ["1"],
    serial: 2,
    episodes: 7,
    year: 1963,
    villains: ["Daleks"],
    tags: ["Daleks", "Skaro", "Hartnell"],
    poster: "https://commons.wikimedia.org/wiki/Special:FilePath/Dalek%20prop.jpg",
    summary: "The Doctor and friends encounter the Daleks on Skaro."
  },
  {
    id: "s01-03",
    title: "The Edge of Destruction",
    doctors: ["1"],
    serial: 3,
    episodes: 2,
    year: 1964,
    villains: ["—"],
    tags: ["TARDIS", "Hartnell"],
    poster: "https://commons.wikimedia.org/wiki/Special:FilePath/TARDIS_console_room_(Doctor_Who).jpg",
    summary: "Something is very wrong aboard the TARDIS… and paranoia takes hold."
  },
  {
    id: "tv-day",
    title: "The Day of the Doctor",
    doctors: ["10","11","War"],
    year: 2013,
    villains: ["Zygons", "Daleks"],
    tags: ["Daleks", "Zygons", "50th"],
    poster: "https://commons.wikimedia.org/wiki/Special:FilePath/Dalek_(10634451635).jpg",
    summary: "Three Doctors, one Moment, and a very big decision."
  }
];

// ====== STATE ======
const state = {
  q: "",
  doctor: new Set(),
  doctorMode: "any" // "any" or "all"
};

// ====== HELPERS ======
const $ = (id) => document.getElementById(id);

function escapeHTML(str){
  return String(str ?? "")
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
  if (Array.isArray(s.doctors)) return s.doctors;
  if (s.doctor) return [s.doctor];
  return [];
}

function ordinal(n){
  const num = Number(n);
  if (!Number.isFinite(num)) return String(n);
  const mod100 = num % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${num}th`;
  const mod10 = num % 10;
  if (mod10 === 1) return `${num}st`;
  if (mod10 === 2) return `${num}nd`;
  if (mod10 === 3) return `${num}rd`;
  return `${num}th`;
}

function doctorPillLabel(story){
  const docs = storyDoctorsArray(story);
  if (docs.length === 0) return "Doctor";
  if (docs.length > 1) return "Multi-Doctor";
  const d = docs[0];
  if (d === "War") return "War Doctor";
  return `${ordinal(d)} Doctor`;
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
      <span>${escapeHTML(label)}</span>
    </div>
  `;
}

function buildDoctorChips(){
  const doctorOptions = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","War"];
  $("chipsDoctor").innerHTML = doctorOptions
    .map(x => chipHTML(x, x === "War" ? "War Doctor" : `Doctor ${x}`))
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
  (s.villains || []).join(" ").toLowerCase().includes(q) ||
  (s.tags || []).join(" ").toLowerCase().includes(q)
);

    const docs = storyDoctorsArray(s);
    let doctorOk = true;

    if (state.doctor.size > 0){
      if (state.doctorMode === "all"){
        doctorOk = [...state.doctor].every(d => docs.includes(d));
      } else {
        doctorOk = docs.some(d => state.doctor.has(d));
      }
    }

    return qok && doctorOk;
  });
}

// ====== CARDS ======
function storyCard(s){
  const poster = s.poster ? `<img src="${s.poster}" alt="" loading="lazy">` : "";
  const pill = doctorPillLabel(s);

  const metaLeft = (typeof s.serial === "number")
    ? `Serial ${s.serial}`
    : (typeof s.year === "number" ? `${s.year}` : "Story");

  const metaRight = (typeof s.episodes === "number")
    ? `${s.episodes} episode${s.episodes === 1 ? "" : "s"}`
    : "";

  const meta = [metaLeft, metaRight].filter(Boolean).join(" • ");

  return `
    <div class="card serial" role="button" tabindex="0"
         data-id="${escapeHTML(s.id)}"
         aria-label="${escapeHTML(s.title)}">
      <div class="serialImage">${poster}</div>
      <div class="serialInfo">
        <div class="serialTitle">${escapeHTML(s.title)}</div>
        <div class="serialMeta">${escapeHTML(meta)}</div>
        <div class="serialPill">${escapeHTML(pill)}</div>
      </div>
    </div>
  `;
}

// ====== MODAL ======
function openModal(story){
  if (!story) return;

  $("modalTitle").textContent = story.title || "Untitled";

  const docs = storyDoctorsArray(story);
  const metaBits = [
    formatDoctors(docs),
    typeof story.year === "number" ? story.year : null,
    typeof story.serial === "number" ? `Serial ${story.serial}` : null,
    typeof story.episodes === "number" ? `${story.episodes} episode${story.episodes === 1 ? "" : "s"}` : null
  ].filter(Boolean);
  $("modalMeta").textContent = metaBits.join(" • ");

  $("modalSummary").textContent = story.summary || "No summary yet.";

  $("modalPoster").innerHTML = story.poster
    ? `<img src="${story.poster}" alt="" loading="lazy">`
    : "";

  const items = [
    ["Doctor(s)", formatDoctors(docs)],
    ["Villains", (story.villains && story.villains.length) ? story.villains.join(", ") : "—"],
    ["Year", story.year ?? "—"],
    ["Serial", story.serial ?? "—"],
    ["Episodes", story.episodes ?? "—"]
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
  // theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);

  // filters
  buildDoctorChips();

  // search
  $("q").addEventListener("input", (e) => {
    state.q = e.target.value;
    render();
  });

  // clear/show all
  $("clearFiltersBtn").addEventListener("click", () => {
    state.q = ""; $("q").value = "";
    state.doctor.clear();
    syncDoctorChips();
    render();
  });

  $("showAllBtn").addEventListener("click", () => {
    state.q = ""; $("q").value = "";
    state.doctor.clear();
    syncDoctorChips();
    render();
  });

  // theme toggle
  $("themeBtn").addEventListener("click", () => {
    const cur = document.body.getAttribute("data-theme") || "dark";
    setTheme(cur === "dark" ? "light" : "dark");
  });

  // modal close
  $("modalClose").addEventListener("click", closeModal);
  $("modalOverlay").addEventListener("click", closeModal);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("modal-open")) closeModal();
  });

  render();
});
