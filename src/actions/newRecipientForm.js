import { reset } from "redux-form";

export function resetNewRecipientFormActionCreator() {
  return async function(dispatch, getState) {
    dispatch(reset("newRecipient"));
  };
}
