import { getFromLocalStorage } from "./store/store.js";
import { addListeners } from "./listeners.js";
import { renderAll } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
  getFromLocalStorage();
  renderAll();
  addListeners();
});
