/* archive-transform.js (Two-column Month Index + Entries panel)
   Reads .maintable table and replaces it with a wiki-ish two-column archive.
*/
(function () {
  "use strict";

  const CONFIG = {
    openMonth: "first", // "first" or "last"
  };

  function textOf(el) {
    return (el?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function pad2(value) {
    const s = String(value || "").trim();
    if (!s) return "";
    return s.length >= 2 ? s : "0" + s;
  }

  function isMonthRow(tds) {
    if (tds.length !== 1) return false;
    const cell = tds[0];
    const colspan = cell.getAttribute("colspan");
    const colSpanNum = cell.colSpan || 0;
    const hasColspan2 = colspan === "2" || colSpanNum === 2;

    const label = textOf(cell.querySelector(".month")) || textOf(cell);
    const looksLikeMonth = /\b(20\d{2})\b/.test(label) && /[A-Za-z]/.test(label);

    return hasColspan2 && looksLikeMonth;
  }

  function parseTable(table) {
    const rows = Array.from(table.querySelectorAll("tr"));
    const months = [];
    let current = null;

    for (const tr of rows) {
      const tds = Array.from(tr.children).filter(
        (n) => n.tagName === "TD" || n.tagName === "TH"
      );
      if (!tds.length) continue;

      if (isMonthRow(tds)) {
        const label = textOf(tds[0].querySelector(".month")) || textOf(tds[0]);
        current = { label, entries: [] };
        months.push(current);
        continue;
      }

      const dayRaw = textOf(tds[0]);
      const titleRaw =
        textOf(tds[1]?.querySelector(".eptitles")) ||
        textOf(tds[1]) ||
        "";

      if (!dayRaw || !titleRaw) continue;

      if (!current) {
        current = { label: "Entries", entries: [] };
        months.push(current);
      }

      current.entries.push({ day: pad2(dayRaw), title: titleRaw });
    }

    // Drop empty months if any
    return months.filter((m) => m.entries.length > 0);
  }

  function slugifyMonth(label) {
    return label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function buildUI(months) {
    const root = document.createElement("div");
    root.className = "archive-two";

    // Left index
    const index = document.createElement("aside");
    index.className = "month-index";

    const indexTitle = document.createElement("h3");
    indexTitle.textContent = "Months";
    index.appendChild(indexTitle);

    const ul = document.createElement("ul");
    ul.className = "month-list";
    index.appendChild(ul);

    // Right panel
    const panel = document.createElement("section");
    panel.className = "month-panel";

    const panelHead = document.createElement("div");
    panelHead.className = "month-panel-head";

    const panelTitle = document.createElement("div");
    panelTitle.className = "title";

    const panelMeta = document.createElement("div");
    panelMeta.className = "meta";

    panelHead.appendChild(panelTitle);
    panelHead.appendChild(panelMeta);

    const grid = document.createElement("div");
    grid.className = "entry-grid";

    panel.appendChild(panelHead);
    panel.appendChild(grid);

    // State
    const byId = new Map();
    const monthIds = months.map((m) => {
      const id = slugifyMonth(m.label);
      byId.set(id, m);
      return id;
    });

    function renderMonth(id, { setHash = true } = {}) {
      const m = byId.get(id) || months[0];
      const currentId = byId.has(id) ? id : monthIds[0];

      // Update buttons
      ul.querySelectorAll(".month-btn").forEach((btn) => {
        btn.setAttribute("aria-current", btn.dataset.monthId === currentId ? "true" : "false");
      });

      // Update panel
      panelTitle.textContent = m.label;
      panelMeta.textContent = `${m.entries.length} ${m.entries.length === 1 ? "entry" : "entries"}`;

      grid.innerHTML = "";
      for (const e of m.entries) {
        const card = document.createElement("div");
        card.className = "entry-card";

        const day = document.createElement("span");
        day.className = "day";
        day.textContent = e.day;

        const title = document.createElement("span");
        title.className = "title";
        title.textContent = e.title;

        card.appendChild(day);
        card.appendChild(title);
        grid.appendChild(card);
      }

      if (setHash) {
        history.replaceState(null, "", `#${currentId}`);
      }
    }

    // Build month buttons
    for (const m of months) {
      const id = slugifyMonth(m.label);

      const li = document.createElement("li");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "month-btn";
      btn.dataset.monthId = id;

      const labelSpan = document.createElement("span");
      labelSpan.textContent = m.label;

      const countSpan = document.createElement("span");
      countSpan.className = "count";
      countSpan.textContent = String(m.entries.length);

      btn.appendChild(labelSpan);
      btn.appendChild(countSpan);

      btn.addEventListener("click", () => renderMonth(id));

      li.appendChild(btn);
      ul.appendChild(li);
    }

    // Initial month: hash > config
    const hashId = (location.hash || "").replace("#", "");
    let initialId = monthIds[0];

    if (hashId && byId.has(hashId)) {
      initialId = hashId;
    } else if (CONFIG.openMonth === "last") {
      initialId = monthIds[monthIds.length - 1] || monthIds[0];
    }

    // Ensure first render also marks active button
    requestAnimationFrame(() => renderMonth(initialId, { setHash: !!initialId }));

    // Respond to back/forward hash changes
    window.addEventListener("hashchange", () => {
      const hid = (location.hash || "").replace("#", "");
      if (hid && byId.has(hid)) renderMonth(hid, { setHash: false });
    });

    root.appendChild(index);
    root.appendChild(panel);
    return root;
  }

  function init() {
    const wrapper = document.querySelector(".maintable");
    if (!wrapper || wrapper.dataset.transformed === "1") return;

    const table = wrapper.querySelector("table");
    if (!table) return;

    wrapper.style.visibility = "hidden";

    const months = parseTable(table);
    const ui = buildUI(months);

    wrapper.innerHTML = "";
    wrapper.appendChild(ui);
    wrapper.dataset.transformed = "1";
    wrapper.style.visibility = "";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
