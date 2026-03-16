export const ACTION_HANDLERS = {
  addToCard: handleAddToCard,
  deleteFromCard: handleDeleteFromCard,
  decreaseAmount: handleDecreaseAmount,
  increaseAmount: handleIncreaseAmount,
  buy: handleBuy,
};

function handleAddToCard(state, { id }) {
  console.log("id", id);

  let newFirstState = state;
  return newFirstState;
}

function handleDeleteFromCard(state, { id }) {
  console.log("id", id);

  let newFirstState = state;
  return newFirstState;
}

function handleDecreaseAmount(state, { id }) {
  console.log("id", id);

  let newFirstState = state;
  return newFirstState;
}

function handleIncreaseAmount(state, { id }) {
  console.log("id", id);

  let newFirstState = state;
  return newFirstState;
}

function handleBuy(state) {
  let newFirstState = state;
  return newFirstState;
}
