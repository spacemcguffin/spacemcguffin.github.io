// ===== Rail scrolling (works with your current markup) =====
document.querySelectorAll(".movies-list").forEach((rail) => {
  const track = rail.querySelector(".card-container");
  const prev = rail.querySelector(".pre-btn");
  const next = rail.querySelector(".nxt-btn");

  if (!track || !prev || !next) return;

  const scrollAmount = () => Math.round(track.clientWidth * 0.9);

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  });
});

// ===== Click-to-open modal (details view) =====
const modalHTML = `
  <div class="modal" id="modal" aria-hidden="true">
    <div class="modal-backdrop" data-close></div>
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-x" data-close aria-label="Close">✕</button>
      <img id="mImg" alt="">
      <div class="modal-body">
        <h3 id="mTitle"></h3>
        <p id="mMeta" class="muted"></p>
      </div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML("beforeend", modalHTML);

const modal = document.querySelector("#modal");
const mImg = document.querySelector("#mImg");
const mTitle = document.querySelector("#mTitle");
const mMeta = document.querySelector("#mMeta");

function openModal({ img, title, meta }) {
  mImg.src = img || "";
  mTitle.textContent = title || "";
  mMeta.textContent = meta || "";
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const close = e.target.closest("[data-close]");
  if (close) return closeModal();

  const card = e.target.closest(".card");
  if (!card) return;

  openModal({
    img: card.querySelector(".card-img")?.src,
    title: card.querySelector(".name")?.textContent,
    meta: card.querySelector(".des")?.textContent,
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
});
