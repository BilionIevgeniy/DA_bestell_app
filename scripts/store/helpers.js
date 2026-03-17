export function changeAndGetCountInBasket(state, id, category) {
  let newItem;
  let count;
  state.menu[category].items = state.menu[category].items.map((item) => {
    if (item.id == id) {
      count = item.countInBasket + 1;
      newItem = { ...item, countInBasket: count };
      return newItem;
    }
    return item;
  });
  return [newItem, count];
}

export function addBasketTotalItems(state, amount) {
  const copyState = structuredClone(state);
  copyState.basket.totalItems = amount ? copyState.basket.totalItems + 1 : 0;
  return copyState;
}

export function setIsBasketOpen(open, state) {
  const copyState = structuredClone(state);
  copyState.isBasketOpened = open;
  return copyState;
}

export function setIsBasketCartOpen(open, state) {
  const copyState = structuredClone(state);
  copyState.isBasketCartOpened = open;
  return copyState;
}

export function findItemById(items, id) {
  return items.find((item) => item.id == id);
}

export function addItemToBasket(state, item, existedItem) {
  const copyState = structuredClone(state);
  if (existedItem) {
    copyState.basket.items = copyState.basket.items.map((basketItem) => {
      if (basketItem.id == item.id) {
        const count = basketItem.amount + 1;
        return { ...basketItem, amount: count, price: count * item.price };
      } else {
        return basketItem;
      }
    });
  } else {
    const newBasketItem = {
      id: item.id,
      category: item.category,
      name: item.name,
      price: item.price,
      amount: 1,
    };
    copyState.basket.items.push(newBasketItem);
  }
  return copyState;
}

export function recalcPrice(state) {
  let copyState = structuredClone(state);
  let subtotal = 0;
  copyState.basket.items.forEach((item) => {
    subtotal += item.price;
  });
  const total = copyState.basket.delivery + subtotal;
  copyState.basket = { ...copyState.basket, subtotal, total };

  return copyState;
}
