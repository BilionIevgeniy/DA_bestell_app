import { applyAction } from "./store/store.js";

const btns = document.querySelectorAll(".btn");
const wrapper = document.querySelector(".wrapper");
btns.forEach((btn) => (btn.disabled = true));

function onAction(event) {
  const { action } = event.target.closest("[data-action]")?.dataset || {};
  if (!action) return;
  const card = event.target.closest(".card");
  const { id } = card.dataset;

  if (id) {
    applyAction(action, { id });
  }
}

export function addListeners() {
  wrapper.addEventListener("click", onAction);
}
