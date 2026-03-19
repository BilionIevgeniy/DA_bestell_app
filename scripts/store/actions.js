import {
  renderAddBtnById,
  renderBasket,
  renderBasketItemById,
  renderBasketPriceTemplate,
  renderCart,
  renderModal,
} from "../render.js";
import {
  changeItemAmount,
  removeItemFromState,
  renderAfterDeleteFromBasket,
  setIsBasketOpen,
  setIsCartOpen,
  setWidthToSelector,
} from "./helpers.js";

export function onAddItemToBasket(state, id, category) {
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

export function onCloseBasket(state) {
  let copyState = structuredClone(state);

  copyState = setIsBasketOpen(false, copyState);
  copyState = setIsCartOpen(true, copyState);
  renderBasket(false, copyState.basket);
  renderCart(true, copyState.basket.totalItems);
  setWidthToSelector(".menu-card-wrapper", "100%");
  return copyState;
}

export function onOpenBasket(state) {
  let copyState = structuredClone(state);

  copyState = setIsBasketOpen(true, copyState);
  copyState = setIsCartOpen(false, copyState);
  renderBasket(true, copyState.basket);
  renderCart(false, copyState.basket.totalItems);
  setWidthToSelector(".menu-card-wrapper", "75%");
  return copyState;
}

export function onChangeAmountItemsInBasket(state, id, category, increase) {
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

export function onDeleteItemFromBasket(state, id, category) {
  let copyState = structuredClone(state);

  copyState = removeItemFromState(copyState, id, category);
  renderAddBtnById(id, 0);
  copyState = renderAfterDeleteFromBasket(copyState, id);

  return copyState;
}

export function onDeleteAllItemsFromBasket(state) {
  let copyState = structuredClone(state);
  const basketItems = copyState.basket.items;
  basketItems.forEach(({ id, category }) => {
    copyState = removeItemFromState(copyState, id, category, true);
    renderAddBtnById(id, 0);
  });
  copyState = renderAfterDeleteFromBasket(copyState);
  setWidthToSelector(".menu-card-wrapper", "100%");
  renderModal(true);

  return copyState;
}

export function onCloseModal() {
  renderModal(false);
}
