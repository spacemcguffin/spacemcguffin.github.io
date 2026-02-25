/* episode.js — dynamic template page
   Requires: window.movies = [...] (loaded before this script)
*/

(function () {
  const qs = new URLSearchParams(location.search);
  const id = qs.get("id");

  const data = Array.isArray(window.movies) ? window.movies : [];
  const episode = data.find((m) => String(m.id) === String(id));

  const $ = (sel) => document.querySelector(sel);

  const page = $("#page");
  const err = $("#error");

  if (!episode) {
    if (err) err.hidden = false;
    if (page) page.hidden = true;
    document.title = "Episode not found • Lewflix";
    return;
  }

  // Helpers
  const safe = (v, fallback = "") => (v == null ? fallback : String(v));
  const setText = (sel, text) => { const el = $(sel); if (el) el.textContent = text; };
  const setHTML = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };

  // Title + meta
  const title = safe(episode.name, "Untitled");
  const seasonNum = episode.season ?? "";
  const epNum = episode.episode ?? "";
  const year = episode.year ?? "";
  const runtime = episode.runtime ?? "";
  const rating = episode.rating ?? "";

  document.title = `${title} • Lewflix`;

  setText("#title", title);

  const metaBits = [
    (seasonNum && epNum) ? `Season ${seasonNum} • Episode ${epNum}` : safe(episode.season, ""),
    year ? String(year) : "",
    runtime ? String(runtime) : "",
    rating ? String(rating) : ""
  ].filter(Boolean);

  setText("#metaLine", metaBits.join("  •  "));
  setText("#desc", safe(episode.des, ""));

  // Poster
  const posterImg = $("#posterImg");
  if (posterImg) {
    posterImg.src = safe(episode.image, "");
    posterImg.alt = title;
    posterImg.loading = "eager";
  }

  // Hero backdrop (optional)
  const heroBg = $("#heroBg");
  const backdrop = episode.backdrop || episode.image;
  if (heroBg && backdrop) {
    heroBg.style.backgroundImage = `url("${backdrop}")`;
  }

  // Breadcrumbs
  const crumbs = $("#crumbs");
  if (crumbs) {
    crumbs.innerHTML = `
      <a href="/disney/">Home</a>
      <span>›</span>
      <a href="/disney/#season-${encodeURIComponent(seasonNum)}">Season ${safe(seasonNum, "?")}</a>
      <span>›</span>
      <span>${title}</span>
    `;
  }

  // Chips/tags
  const chips = $("#chips");
  if (chips) {
    const tags = Array.isArray(episode.tags) ? episode.tags : [];
    chips.innerHTML = tags.map((t) => `<span class="chip">${safe(t)}</span>`).join("");
  }

  // Details list
  const details = $("#details");
  if (details) {
    const rows = [
      ["ID", episode.id],
      ["Season", seasonNum],
      ["Episode", epNum],
      ["Year", year],
      ["Runtime", runtime],
      ["Rating", rating],
      ["Code", episode.code],
    ].filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "");

    details.innerHTML = rows
      .map(([k, v]) => `<div class="dl-row"><dt>${safe(k)}</dt><dd>${safe(v)}</dd></div>`)
      .join("");
  }

  // Cast + Trivia
  const castEl = $("#cast");
  const triviaEl = $("#trivia");

  const cast = Array.isArray(episode.cast) ? episode.cast : [];
  const trivia = Array.isArray(episode.trivia) ? episode.trivia : [];

  if (castEl) castEl.innerHTML = cast.length ? cast.map((c) => `<li>${safe(c)}</li>`).join("") : `<li class="muted">No cast listed.</li>`;
  if (triviaEl) triviaEl.innerHTML = trivia.length ? trivia.map((t) => `<li>${safe(t)}</li>`).join("") : `<li class="muted">No trivia yet.</li>`;

  // Watchlist (localStorage)
  const watchKey = "lewflix_watchlist";
  const watchBtn = $("#watchBtn");

  const getWatch = () => {
    try { return JSON.parse(localStorage.getItem(watchKey) || "[]"); }
    catch { return []; }
  };
  const setWatch = (arr) => localStorage.setItem(watchKey, JSON.stringify(arr));

  const updateWatchBtn = () => {
    if (!watchBtn) return;
    const list = getWatch();
    const inList = list.includes(episode.id);
    watchBtn.textContent = inList ? "✓ In Watchlist" : "＋ Watchlist";
    watchBtn.dataset.inList = inList ? "1" : "0";
  };

  if (watchBtn) {
    watchBtn.addEventListener("click", () => {
      const list = getWatch();
      const i = list.indexOf(episode.id);
      if (i >= 0) list.splice(i, 1);
      else list.push(episode.id);
      setWatch(list);
      updateWatchBtn();
    });
  }
  updateWatchBtn();

  // Share
  const shareBtn = $("#shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const url = location.href;
      const payload = { title: document.title, text: title, url };

      try {
        if (navigator.share) await navigator.share(payload);
        else {
          await navigator.clipboard.writeText(url);
          shareBtn.textContent = "Copied!";
          setTimeout(() => (shareBtn.textContent = "Share"), 900);
        }
      } catch {
        // ignore
      }
    });
  }

  // Related rail (same season first, then overlap tags)
  const rail = $("#rail");
  const related = data
    .filter((m) => m.id !== episode.id)
    .map((m) => {
      const sameSeason = m.season === episode.season ? 2 : 0;
      const tagsA = new Set((episode.tags || []).map(String));
      const tagsB = (m.tags || []).map(String);
      const overlap = tagsB.reduce((acc, t) => acc + (tagsA.has(t) ? 1 : 0), 0);
      const score = sameSeason + overlap;
      return { m, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 18)
    .map((x) => x.m);

  if (rail) {
    rail.innerHTML = related
      .map((m) => `
        <a class="rail-card" href="/disney/episode.html?id=${encodeURIComponent(m.id)}">
          <img src="${safe(m.image)}" alt="${safe(m.name)}" loading="lazy" />
          <div class="rail-card-meta">
            <div class="rail-title">${safe(m.name)}</div>
            <div class="rail-sub">Season ${safe(m.season, "?")} • Ep ${safe(m.episode, "?")}</div>
          </div>
        </a>
      `)
      .join("");
  }

  // Rail buttons
  const prevBtn = $("#prevBtn");
  const nextBtn = $("#nextBtn");
  const scrollAmt = () => Math.round((rail?.clientWidth || 600) * 0.9);

  if (prevBtn && rail) prevBtn.addEventListener("click", () => rail.scrollBy({ left: -scrollAmt(), behavior: "smooth" }));
  if (nextBtn && rail) nextBtn.addEventListener("click", () => rail.scrollBy({ left: scrollAmt(), behavior: "smooth" }));

  // Show page
  if (page) page.hidden = false;
})();
