import { getFromLocalStorage, globalState } from "./store/store.js";
import { addListeners } from "./listeners.js";
import { render } from "./render.js";
import { setIsBasketCartOpen, setIsBasketOpen } from "./store/helpers.js";

document.addEventListener("DOMContentLoaded", () => {
  getFromLocalStorage();
  render(globalState);
  setIsBasketCartOpen(globalState.basket.totalItems > 0, globalState);
  addListeners();
});
