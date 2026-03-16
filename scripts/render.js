import { state } from "./store/store.js";
import { generateBasketTemplate, generateMenuTemplate } from "./templates.js";

export function renderMenu(menu = state.menu) {
  const container = document.querySelector(".menu-wrapper");
  let template = "";
  for (const key in menu) {
    template += generateMenuTemplate(menu[key]);
  }
  container.innerHTML = template;
}

export function renderBasket(basket = state.basket) {
  const container = document.querySelector(".basket-wrapper");
  container.innerHTML = generateBasketTemplate(basket);
}
