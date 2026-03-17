import { getFromLocalStorage, state } from "./store/store.js";
import { addListeners } from "./listeners.js";
import { render } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
  getFromLocalStorage();
  render(state);
  addListeners();
});
