(() => {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const btn = document.querySelector("[data-nav-toggle]");
  const list = document.querySelector("[data-nav-list]");
  if (!btn || !list) return;

  btn.addEventListener("click", () => {
    const open = list.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();
