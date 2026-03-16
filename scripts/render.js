import { state } from "./store/store.js";
import { generateTemplate } from "./templates.js";

export function renderAll(items = state) {
  const container = document.querySelector(".wrapper");

  container.innerHTML = [...items]
    .map((book) => generateTemplate(item))
    .join("");
}
