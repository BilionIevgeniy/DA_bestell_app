import { basketWrapper, shopingCart } from "./selectors.js";
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

export function renderBasket(show, basket = state.basket) {
  if (show) {
    basketWrapper.style.display = "block";
    basketWrapper.innerHTML = generateBasketTemplate(basket);
  } else {
    basketWrapper.style.display = "none";
  }
}

export function renderBasketCart(show, amount) {
  if (show) {
    const amountSpan = shopingCart.querySelector("span");
    amountSpan.innerHTML = amount;
    shopingCart.style.display = "block";
  } else {
    shopingCart.style.display = "none";
  }
}

export function render(state) {
  renderMenu();
  renderBasketCart(state.basket.totalItems > 0, state.basket.totalItems);
}
