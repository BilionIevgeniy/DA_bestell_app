import {
  renderAddBtnById,
  renderBasket,
  renderCart,
  renderBasketItemById,
  renderBasketPriceTemplate,
} from "../render.js";
import {
  changeItemAmount,
  onAmountChange,
  onDeleteItemFromBasket,
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
  console.log("category", category);

  let copyState = structuredClone(state);
  const [modifiedState, count, existedInBasketItem] = changeItemAmount(
    copyState,
    id,
    category,
    true,
  );
  copyState = modifiedState;
  renderAddBtnById(id, count);
  if (copyState.isBasketOpened) {
    renderBasketItemById({
      id,
      isExisted: !!existedInBasketItem,
      state: copyState,
    });
    renderBasketPriceTemplate(copyState);
  } else {
    renderCart(true, copyState.basket.totalItems);
  }
  return copyState;
}

function handleOpenBasket(state) {
  let copyState = structuredClone(state);
  copyState = setIsBasketOpen(true, copyState);
  renderBasket(true, copyState.basket);
  renderCart(false, copyState.basket.totalItems);
  return copyState;
}

function handleDecreaseAmount(state, { id, category }) {
  let copyState = structuredClone(state);
  copyState = onAmountChange(copyState, id, category, false);
  return copyState;
}

function handleIncreaseAmount(state, { id, category }) {
  let copyState = structuredClone(state);
  copyState = onAmountChange(copyState, id, category, true);
  return copyState;
}

function handleDeleteFromCard(state, { id, category }) {
  let copyState = structuredClone(state);
  copyState = onDeleteItemFromBasket(copyState, id, category);
  return copyState;
}

function handleBuy(state) {
  let copyState = structuredClone(state);
  return copyState;
}
