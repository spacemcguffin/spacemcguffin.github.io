/* archive-transform.js
   Converts the existing .maintable table into collapsible month blocks + entry grid cards.
   Text-only. No links. No external deps.
*/

(function () {
  "use strict";

  function textOf(el) {
    return (el?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function pad2(n) {
    const s = String(n).trim();
    if (!s) return "";
    // If it's already 2+ chars (e.g. "10"), keep it.
    if (s.length >= 2) return s;
    return "0" + s;
  }

  function buildArchiveFromTable(table, { openFirstMonth = true } = {}) {
    const rows = Array.from(table.querySelectorAll("tbody tr, tr"));
    const archive = document.createElement("div");
    archive.className = "archive";

    let currentDetails = null;
    let currentGrid = null;
    let monthIndex = 0;

    for (const tr of rows) {
      const tds = Array.from(tr.children).filter((n) => n.tagName === "TD" || n.tagName === "TH");
      if (!tds.length) continue;

      // Month header row: usually <td colspan="2"><div class="month">January 2025</div></td>
      const isMonthHeader =
        tds.length === 1 &&
        (tds[0].getAttribute("colspan") === "2" || tds[0].colSpan === 2) &&
        (tds[0].querySelector(".month") || textOf(tds[0]).match(/\b(20\d{2})\b/));

      if (isMonthHeader) {
        const monthLabel = textOf(tds[0].querySelector(".month")) || textOf(tds[0]);
        if (!monthLabel) continue;

        currentDetails = document.createElement("details");
        currentDetails.className = "month-block";
        monthIndex += 1;

        // open first month (optional)
        if (openFirstMonth && monthIndex === 1) currentDetails.open = true;

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

      // Entry row: day in first cell, title in second cell (or .eptitles)
      // Expect 2 columns, but be tolerant.
      const dayCell = tds[0];
      const titleCell = tds[1] || null;

      const dayRaw = textOf(dayCell);
      const titleRaw =
        textOf(titleCell?.querySelector(".eptitles")) ||
        textOf(titleCell) ||
        (tds.length >= 2 ? textOf(tds[1]) : "");

      // Skip rows that don't look like entries
      if (!dayRaw || !titleRaw) continue;

      // If we haven't seen a month header yet, create a fallback
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

    // Update counts
    const monthBlocks = archive.querySelectorAll(".month-block");
    monthBlocks.forEach((details) => {
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

    const table = wrapper.querySelector("table");
    if (!table) return;

    // Build new archive layout
    const archive = buildArchiveFromTable(table, { openFirstMonth: true });

    // Replace table with archive
    wrapper.innerHTML = "";
    wrapper.appendChild(archive);

    // Optional: add a class to body so you can target styles if needed
    document.body.classList.add("archive-enhanced");
  }

  // Run after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
