import {
  onAddItemToBasket,
  onChangeAmountItemsInBasket,
  onCloseBasket,
  onCloseModal,
  onDeleteAllItemsFromBasket,
  onDeleteItemFromBasket,
  onOpenBasket,
} from "./actions.js";

export const HANDLERS = {
  addToBasket: handleAddToBasket,
  deleteFromCard: handleDeleteItemFromCard,
  decreaseAmount: handleDecreaseAmountItemsInBasket,
  increaseAmount: handleIncreaseAmountItemsInBasket,
  buy: handleBuy,
  openBasket: handleOpenBasket,
  closeBasket: handleCloseBasket,
  closeModal: handleCloseModal,
};

function handleAddToBasket(state, { id, category }) {
  let copyState = structuredClone(state);
  copyState = onAddItemToBasket(copyState, id, category);
  return copyState;
}

function handleOpenBasket(state) {
  let copyState = structuredClone(state);
  copyState = onOpenBasket(state);
  return copyState;
}

function handleCloseBasket(state) {
  let copyState = structuredClone(state);
  copyState = onCloseBasket(copyState);
  return copyState;
}

function handleDecreaseAmountItemsInBasket(state, { id, category }) {
  let copyState = structuredClone(state);
  copyState = onChangeAmountItemsInBasket(copyState, id, category, false);
  return copyState;
}

function handleIncreaseAmountItemsInBasket(state, { id, category }) {
  let copyState = structuredClone(state);
  copyState = onChangeAmountItemsInBasket(copyState, id, category, true);
  return copyState;
}

function handleDeleteItemFromCard(state, { id, category }) {
  let copyState = structuredClone(state);
  copyState = onDeleteItemFromBasket(copyState, id, category);
  return copyState;
}

function handleBuy(state, { id, category }) {
  let copyState = structuredClone(state);
  copyState = onDeleteAllItemsFromBasket(copyState, id, category);
  return copyState;
}

function handleCloseModal(state, { id, category }) {
  onCloseModal();
  return state;
}
