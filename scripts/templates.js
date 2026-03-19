export function generateMenuTemplate(category, { src, title, items }) {
  return /*html*/ `
    <section>
      <div class="menu-subtitle">
        <div class="container">
          <div class="menu-subtitle-wrapper">
            <img src="${src}" alt="${title} image">
            <h2>${title}</h2>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="menu-card-wrapper">
          ${items.map((item) => generateMenuCardTemplate(category, item)).join("")}
        </div>
      </div>
    </section>
  `;
}

export function generateMenuCardTemplate(
  category,
  { id, src, name, ingredients, price, countInBasket },
) {
  return /*html*/ `
  <div class="card" data-id="${id}" data-category="${category}">
    <div class="card-img">
      <img src="${src}" alt="${name}">
    </div>
    <div class="card-content">
      <div class="card-content-wrapper">
        <div class="content-wrapper-description">
          <h3>${name}</h3>
          <p>${ingredients.join("")}</p>
        </div>
        <span class="price">
          ${price.toFixed(2)}€
        </span>
      </div>
      <button data-action="addToBasket" class="add_to_card ${countInBasket > 0 ? "active" : ""}">${generateAddBtnInnerHTML(countInBasket)}</button>
    </div>
  </div>
  `;
}

export function generateBasketTemplate({ items, subtotal, delivery, total }) {
  return /*html*/ `
    <div class="basket-top">
      <h3>Your Basket</h3>
      <button data-action="closeBasket">x</button>
    </div>
    <div class="basket-card-wrapper">
     ${items.map(generateBasketCardTemplate).join("")}
    </div>
    <div class="price-wrapper">
      ${generateBasketManePriceTemplate({ subtotal, delivery, total })}
    </div>
    <button data-action="buy" class="buy-btn">Buy now (<span class="buy-btn-span">${total.toFixed(2)} €</span>)</button>
  `;
}

export function generateBasketCardTemplate({
  id,
  name,
  price,
  amount,
  category,
}) {
  return /*html*/ `
    <div data-category="${category}" data-id="${id}" class="card">
      <div class="title">
        ${amount} x ${name}
      </div>
      <div class="amount-wrapper">
        ${generateBasketCardsActionBtns(amount)}
        <div class="price">
          ${price.toFixed(2)} €
        </div>
      </div>
    </div>
  `;
}

export function generateAddBtnInnerHTML(countInBasket) {
  return countInBasket > 0 ? "Added " + countInBasket : "Add to basket";
}

export function generateBasketManePriceTemplate({ subtotal, delivery, total }) {
  return /*html*/ `
    <div class="subtotal">
      <span>Subtotal</span>
      <span>${subtotal.toFixed(2)} €</span>
    </div>
    <div class="delivery">
      <span>Delivery fee</span>
      <span>${delivery.toFixed(2)} €</span>
    </div>
    <div class="total">
      <span>Total</span>
      <span>${total.toFixed(2)} €</span>
    </div>  
  `;
}

export function generateBasketCardsActionBtns(amount) {
  return /*html */ `
  <div class="amount">
    ${
      amount == 1
        ? '<button data-action="deleteFromCard" class="del"><img src="assets/logo/delete.png" alt="Delete"></button>'
        : '<button data-action="decreaseAmount" class="del">-</button>'
    }
     ${amount}
    <button data-action="increaseAmount" class="del">+</button>
  </div>
  `;
}
