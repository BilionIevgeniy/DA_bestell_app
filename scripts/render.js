import { basketWrapper, menuWrapper, modal, shopingCart } from "./selectors.js";
import { globalState } from "./store/store.js";
import {
  generateAddBtnInnerHTML,
  generateBasketCardsActionBtns,
  generateBasketCardTemplate,
  generateBasketManePriceTemplate,
  generateBasketTemplate,
  generateMenuTemplate,
} from "./templates.js";

export function renderMenu(menu = globalState.menu) {
  let template = "";
  for (const category in menu) {
    template += generateMenuTemplate(category, menu[category]);
  }
  menuWrapper.innerHTML = template;
}

export function renderBasket(show, basket = globalState.basket) {
  if (show) {
    basketWrapper.style.display = "flex";
    basketWrapper.innerHTML = generateBasketTemplate(basket);
  } else {
    basketWrapper.style.display = "none";
  }
}

export function renderCart(show, totalItems) {
  if (show) {
    const amountSpan = shopingCart.querySelector("span");
    amountSpan.innerHTML = totalItems;
    shopingCart.style.display = "block";
  } else {
    shopingCart.style.display = "none";
  }
}

export function renderAddBtnById(id, count) {
  const card = menuWrapper.querySelector(`[data-id='${id}']`);
  const addBtn = card.querySelector(".add_to_card");
  if (count > 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
  addBtn.innerHTML = generateAddBtnInnerHTML(count);
}

export function renderBasketItemById({ id, isExisted, state }) {
  const cardData = state.basket.items.find((item) => item.id == id);
  const template = generateBasketCardTemplate(cardData);
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = template;
  const node = tempDiv.firstElementChild;
  if (isExisted) {
    const basketCard = basketWrapper.querySelector(`[data-id='${id}']`);
    basketCard.replaceWith(node);
  } else {
    const basketCardWrapper = document.querySelector(".basket-card-wrapper");
    basketCardWrapper.appendChild(node);
  }
}

export function renderRemoveBasketItemById(id) {
  const basketCard = basketWrapper.querySelector(`[data-id='${id}']`);
  basketCard.remove();
}

export function renderBasketPriceTemplate(state) {
  const { subtotal, delivery, total } = state.basket;
  const priceWrapper = document.querySelector(".price-wrapper");
  const buyBtnSpan = document.querySelector(".buy-btn-span");
  priceWrapper.innerHTML = generateBasketManePriceTemplate({
    subtotal,
    delivery,
    total,
  });
  buyBtnSpan.innerHTML = total.toFixed(2);
}

export function renderBasketCardActionsBtns(id, amount) {
  const card = basketWrapper.querySelector(`[data-id=${id}]`);
  const amountComponent = card.querySelector(".amount");
  const content = generateBasketCardsActionBtns(amount);
  amountComponent.outerHTML = content;
}

export function render(state) {
  renderMenu();
  renderCart(state.basket.totalItems > 0, state.basket.totalItems);
}

export function renderModal(open) {
  modal.style.display = open ? "flex" : "none";
}
