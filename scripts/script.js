import { getFromLocalStorage, globalState } from "./store/store.js";
import { addListeners } from "./listeners.js";
import { render } from "./render.js";
import { setIsCartOpen } from "./store/helpers.js";

document.addEventListener("DOMContentLoaded", () => {
  getFromLocalStorage();
  render(globalState);
  setIsCartOpen(globalState.basket.totalItems > 0, globalState);
  addListeners();
});
