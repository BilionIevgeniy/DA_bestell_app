import { applyAction } from "./store/store.js";

const menuWrapper = document.querySelector(".menu-wrapper");
const basketWrapper = document.querySelector(".basket-wrapper");

function onAction(event) {
  const { action } = event.target.closest("[data-action]")?.dataset || {};
  if (!action) return;
  const card = event.target.closest(".card");
  const { id } = card?.dataset || {};
  applyAction(action, { id });
}

export function addListeners() {
  menuWrapper.addEventListener("click", onAction);
  basketWrapper.addEventListener("click", onAction);
}
