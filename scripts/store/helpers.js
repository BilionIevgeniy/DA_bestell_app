import {
  renderAddBtnById,
  renderRemoveBasketItemById,
  renderBasketPriceTemplate,
  renderCart,
  renderBasket,
  renderBasketItemById,
} from "../render.js";

// MENU
export function changeMenuItemCount({ state, id, category, increase }) {
  const copyState = structuredClone(state);

  let newItem;
  let count;
  copyState.menu[category].items = copyState.menu[category].items.map(
    (item) => {
      if (item.id == id) {
        count = increase ? item.countInBasket + 1 : item.countInBasket - 1;
        newItem = { ...item, countInBasket: count };
        return newItem;
      }
      return item;
    },
  );

  return [newItem, count, copyState];
}

// BASKET
export function removeItemFromBasketState(state, id) {
  const copyState = structuredClone(state);

  copyState.basket.items = copyState.basket.items.filter(
    (item) => item.id != id,
  );

  return copyState;
}

export function addBasketTotalItems(state, increase) {
  const copyState = structuredClone(state);

  copyState.basket.totalItems = increase
    ? copyState.basket.totalItems + 1
    : copyState.basket.totalItems - 1;

  return copyState;
}

export function addItemToBasket(state, item, category) {
  const copyState = structuredClone(state);

  const newBasketItem = {
    id: item.id,
    category,
    name: item.name,
    price: item.price,
    amount: 1,
  };
  copyState.basket.items.push(newBasketItem);

  return copyState;
}

export function changeBasketItemCount(state, item, increase) {
  const copyState = structuredClone(state);

  copyState.basket.items = copyState.basket.items.map((basketItem) => {
    if (basketItem.id == item.id) {
      const count = increase ? basketItem.amount + 1 : basketItem.amount - 1;
      return { ...basketItem, amount: count, price: count * item.price };
    } else {
      return basketItem;
    }
  });

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

export function onDeleteItemFromBasket(state, id, category) {
  let copyState = structuredClone(state);

  copyState = removeItemFromState(copyState, id, category);
  renderAddBtnById(id, 0);
  if (!copyState.basket.totalItems) {
    renderCart(false);
    renderBasket(false);
    copyState = setIsBasketOpen(false, copyState);
    copyState = setIsCartOpen(false, copyState);
  } else {
    renderRemoveBasketItemById(id);
    renderBasketPriceTemplate(copyState);
  }

  return copyState;
}

export function setIsBasketOpen(open, state) {
  const copyState = structuredClone(state);
  copyState.isBasketOpened = open;
  return copyState;
}

// GENERAL
export function findItemById(items, id) {
  return items.find((item) => item.id == id);
}

export function changeItemAmount(state, id, category, increase) {
  let copyState = structuredClone(state);

  const [newMenuItem, count, modyfiedState] = changeMenuItemCount({
    state: copyState,
    id,
    category,
    increase,
  });
  copyState = modyfiedState;
  copyState = addBasketTotalItems(copyState, increase);
  const existedItem = findItemById(copyState.basket.items, id);
  if (increase) {
    if (existedItem) {
      copyState = changeBasketItemCount(copyState, newMenuItem, increase);
    } else {
      copyState = addItemToBasket(copyState, newMenuItem, category);
    }
  } else {
    copyState = changeBasketItemCount(copyState, newMenuItem, increase);
  }
  copyState = recalcPrice(copyState);
  return [copyState, count, existedItem];
}

export function removeItemFromState(state, id, category) {
  let copyState = structuredClone(state);

  const [_, __, modyfiedState] = changeMenuItemCount({
    state: copyState,
    id,
    category,
    increase: false,
  });
  copyState = modyfiedState;
  copyState = addBasketTotalItems(copyState, false);
  copyState = removeItemFromBasketState(copyState, id);
  copyState = recalcPrice(copyState);
  return copyState;
}

export function onAmountChange(state, id, category, increase) {
  let copyState = structuredClone(state);

  const [modifiedState, count, existedInBasketItem] = changeItemAmount(
    copyState,
    id,
    category,
    increase,
  );
  copyState = modifiedState;
  renderAddBtnById(id, count);
  renderBasketItemById({
    id,
    isExisted: !!existedInBasketItem,
    state: copyState,
  });
  renderBasketPriceTemplate(copyState);

  return copyState;
}

export function setIsCartOpen(open, state) {
  const copyState = structuredClone(state);
  copyState.isCartOpened = open;
  return copyState;
}
