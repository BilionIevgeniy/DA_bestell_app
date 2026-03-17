export function generateMenuTemplate({ src, title, items }) {
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
          ${items.map(generateCardTemplate).join("")}
        </div>
      </div>
    </section>
  `;
}

export function generateCardTemplate({
  id,
  src,
  name,
  ingredients,
  price,
  addedToCard,
}) {
  return /*html*/ `
  <div class="card" data-id="${id}">
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
      <button data-action="addToCard" class="add_to_card ${addedToCard > 0 ? "active" : ""}">${addedToCard > 0 ? "Added " + addedToCard : "Add to basket"}</button>
    </div>
  </div>
  `;
}

export function generateBasketTemplate({ items, subtotal, delivery, total }) {
  return /*html*/ `
    <h3>Your Basket</h3>
    <div class="basket-card-wrapper">
     ${items.map(generateBasketCardTemplate).join("")}
    </div>
    <div class="price">
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
    </div>
    <button data-action="buy" class="buy-btn">Buy now <span>(${total} €)</span></button>
  `;
}

export function generateBasketCardTemplate({ id, name, price, amount }) {
  return /*html*/ `
    <div data-id="${id}" class="card">
      <div class="title">
        ${amount} x ${name}
      </div>
      <div class="amount-wrapper">
        <div class="amount">
          ${
            amount == 1
              ? '<button data-action="deleteFromCard" class="del"><img src="assets/logo/delete.png" alt="Delete"></button>'
              : '<button data-action="decreaseAmount" class="del">-</button>'
          }
           ${amount}
          <button data-action="increaseAmount" class="del">+</button>
        </div>
        <div class="price">
          ${price.toFixed(2)} €
        </div>
      </div>
    </div>
  `;
}
