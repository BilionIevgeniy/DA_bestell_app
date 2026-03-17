import {
  renderAddBtnById,
  renderBasket,
  renderBasketCart,
  renderBasketItemById,
  renderBasketPriceTemplate,
} from "../render.js";
import {
  addBasketTotalItems,
  addItemToBasket,
  changeAndGetCountInBasket,
  findItemById,
  recalcPrice,
  setIsBasketOpen,
} from "./helpers.js";

export const ACTION_HANDLERS = {
  addToBasket: handleAddToBasket,
  deleteFromCard: handleDeleteFromCard,
  decreaseAmount: handleDecreaseAmount,
  increaseAmount: handleIncreaseAmount,
  buy: handleBuy,
  openBasket: handleOpenBasket,
};

function handleAddToBasket(state, { id, category }) {
  let copyState = structuredClone(state);
  const [newItem, count] = changeAndGetCountInBasket(copyState, id, category);
  copyState = addBasketTotalItems(copyState, 1);
  const existedItem = findItemById(copyState.basket.items, newItem.id);
  copyState = addItemToBasket(copyState, newItem, existedItem);
  renderAddBtnById(id, count);
  copyState = recalcPrice(copyState);
  if (copyState.isBasketOpened) {
    renderBasketItemById(newItem.id, !!existedItem, copyState);
    renderBasketPriceTemplate(copyState);
  } else {
    renderBasketCart(true, copyState.basket.totalItems);
  }
  return copyState;
}

function handleOpenBasket(state) {
  let copyState = structuredClone(state);
  renderBasket(true, copyState.basket);
  copyState = setIsBasketOpen(true, copyState);
  renderBasketCart(false, copyState.basket.totalItems);
  return copyState;
}

function handleDeleteFromCard(state, { id }) {
  let copyState = structuredClone(state);
  return copyState;
}

function handleDecreaseAmount(state, { id }) {
  let copyState = structuredClone(state);
  return copyState;
}

function handleIncreaseAmount(state, { id }) {
  let copyState = structuredClone(state);
  return copyState;
}

function handleBuy(state) {
  let copyState = structuredClone(state);
  return copyState;
}
