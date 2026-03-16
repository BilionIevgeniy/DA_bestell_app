import { getFromLocalStorage } from "./store/store.js";
import { addListeners } from "./listeners.js";
import { renderBasket, renderMenu } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
  getFromLocalStorage();
  renderMenu();
  renderBasket();
  addListeners();
});
