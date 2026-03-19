import { initialState } from "../../db.js";
import { HANDLERS } from "./handlers.js";

export let globalState = { ...initialState };

export function applyAction(action, payload = {}) {
  const handler =
    HANDLERS[action] ||
    function () {
      console.warn("no action: " + action);
    };
  globalState = handler(globalState, payload) || globalState;
  saveToLocalStorage();
}

export function saveToLocalStorage() {
  localStorage.setItem("globalState", JSON.stringify(globalState));
}

export function getFromLocalStorage() {
  const lsState = JSON.parse(localStorage.getItem("globalState"));
  if (lsState) {
    Object.assign(globalState, { ...lsState, isBasketOpened: false });
  }
}
