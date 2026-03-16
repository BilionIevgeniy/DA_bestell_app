import { initialState } from "../../db.js";
import { ACTION_HANDLERS } from "./actions.js";

export let state = { ...initialState };

export function applyAction(action, payload = {}) {
  console.log("action", action);

  const handler =
    ACTION_HANDLERS[action] ||
    function () {
      console.warn("no action: " + action);
    };
  state = handler(state, payload);
  saveToLocalStorage();
}

export function saveToLocalStorage() {
  localStorage.setItem("state", JSON.stringify(state));
}

export function getFromLocalStorage() {
  const lsState = JSON.parse(localStorage.getItem("state"));
  if (lsState) {
    Object.assign(state, lsState);
  }
}
