import { basketWrapper, menuWrapper, shopingCart } from "./selectors.js";
import { applyAction } from "./store/store.js";

const wrappers = [menuWrapper, basketWrapper, shopingCart];

function onAction(event) {
  const { action } = event.target.closest("[data-action]")?.dataset || {};
  if (!action) return;
  const card = event.target.closest(".card");
  const { id } = card?.dataset || {};
  applyAction(action, { id });
}

export function addListeners() {
  wrappers.forEach((wrapper) => wrapper.addEventListener("click", onAction));
}
