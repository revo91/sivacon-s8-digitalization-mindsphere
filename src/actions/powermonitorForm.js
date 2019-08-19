import { reset, arrayPush, arrayRemove } from "redux-form";

export function resetPowermonitorFormActionCreator() {
  return async function(dispatch, getState) {
    dispatch(reset("powermonitorSettings"));
  };
}

export function insertNewRecipient(recipient) {
  return async function(dispatch, getState) {
    await dispatch(arrayPush("powermonitorSettings", "recipients", recipient));
  };
}

export function removeRecipient(index) {
  return async function(dispatch, getState) {
    await dispatch(arrayRemove("powermonitorSettings", "recipients", index));
  };
}
