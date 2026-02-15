/* archive-transform.js
   Converts .maintable table into collapsible month blocks + entry-grid cards.
   No links. Text only.
*/
(function () {
  "use strict";

  const CONFIG = {
    openFirstMonth: true,
    removeSourceTable: true, // set false if you want to keep the table hidden for debugging
  };

  function textOf(el) {
    return (el?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function pad2(value) {
    const s = String(value || "").trim();
    if (!s) return "";
    if (s.length >= 2) return s;
    return "0" + s;
  }

  function isMonthRow(tds) {
    if (tds.length !== 1) return false;
    const cell = tds[0];
    const colspan = cell.getAttribute("colspan");
    const colSpanNum = cell.colSpan || 0;

    // Your markup uses colspan="2"
    const hasColspan2 = colspan === "2" || colSpanNum === 2;

    // Must contain .month or look like "January 2025"
    const label = textOf(cell.querySelector(".month")) || textOf(cell);
    const looksLikeMonth = /\b(20\d{2})\b/.test(label) && /[A-Za-z]/.test(label);

    return hasColspan2 && looksLikeMonth;
  }

  function buildArchive(table) {
    const rows = Array.from(table.querySelectorAll("tr"));
    const archive = document.createElement("div");
    archive.className = "archive";

    let currentDetails = null;
    let currentGrid = null;
    let monthCount = 0;

    for (const tr of rows) {
      const tds = Array.from(tr.children).filter(
        (n) => n.tagName === "TD" || n.tagName === "TH"
      );
      if (!tds.length) continue;

      // Month header
      if (isMonthRow(tds)) {
        const monthLabel = textOf(tds[0].querySelector(".month")) || textOf(tds[0]);
        monthCount++;

        currentDetails = document.createElement("details");
        currentDetails.className = "month-block";
        if (CONFIG.openFirstMonth && monthCount === 1) currentDetails.open = true;

        const summary = document.createElement("summary");
        summary.className = "month-head";

        const labelSpan = document.createElement("span");
        labelSpan.className = "label";
        labelSpan.textContent = monthLabel;

        const countSpan = document.createElement("span");
        countSpan.className = "count";
        countSpan.textContent = "0 entries";

        summary.appendChild(labelSpan);
        summary.appendChild(countSpan);

        currentGrid = document.createElement("div");
        currentGrid.className = "entry-grid";

        currentDetails.appendChild(summary);
        currentDetails.appendChild(currentGrid);
        archive.appendChild(currentDetails);
        continue;
      }

      // Entry row: first cell is day, second is title
      const dayRaw = textOf(tds[0]);
      const titleRaw =
        textOf(tds[1]?.querySelector(".eptitles")) ||
        textOf(tds[1]) ||
        "";

      if (!dayRaw || !titleRaw) continue;

      // If an entry appears before any month header, create a fallback month section
      if (!currentDetails || !currentGrid) {
        currentDetails = document.createElement("details");
        currentDetails.className = "month-block";
        currentDetails.open = true;

        const summary = document.createElement("summary");
        summary.className = "month-head";

        const labelSpan = document.createElement("span");
        labelSpan.className = "label";
        labelSpan.textContent = "Entries";

        const countSpan = document.createElement("span");
        countSpan.className = "count";
        countSpan.textContent = "0 entries";

        summary.appendChild(labelSpan);
        summary.appendChild(countSpan);

        currentGrid = document.createElement("div");
        currentGrid.className = "entry-grid";

        currentDetails.appendChild(summary);
        currentDetails.appendChild(currentGrid);
        archive.appendChild(currentDetails);
      }

      const card = document.createElement("div");
      card.className = "entry-card";

      const day = document.createElement("span");
      day.className = "day";
      day.textContent = pad2(dayRaw);

      const title = document.createElement("span");
      title.className = "title";
      title.textContent = titleRaw;

      card.appendChild(day);
      card.appendChild(title);
      currentGrid.appendChild(card);
    }

    // Update counts per month
    archive.querySelectorAll(".month-block").forEach((details) => {
      const grid = details.querySelector(".entry-grid");
      const countEl = details.querySelector(".month-head .count");
      const count = grid ? grid.children.length : 0;
      if (countEl) countEl.textContent = `${count} ${count === 1 ? "entry" : "entries"}`;
    });

    return archive;
  }

  function init() {
    const wrapper = document.querySelector(".maintable");
    if (!wrapper) return;

    // Prevent double transforms
    if (wrapper.dataset.transformed === "1") return;

    const table = wrapper.querySelector("table");
    if (!table) return;

    // Hide source while converting (prevents table flash)
    wrapper.style.visibility = "hidden";

    const archive = buildArchive(table);

    if (CONFIG.removeSourceTable) {
      wrapper.innerHTML = "";
      wrapper.appendChild(archive);
      wrapper.classList.add("maintable--transformed");
    } else {
      // Keep table but hide it
      table.style.display = "none";
      wrapper.appendChild(archive);
    }

    wrapper.dataset.transformed = "1";
    wrapper.style.visibility = "";
    document.body.classList.add("archive-enhanced");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
