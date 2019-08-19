import {
  SHOW_NEW_RECIPIENT_DIALOG,
  HIDE_NEW_RECIPIENT_DIALOG
} from "../actions/newRecipientDialog";

const initialState = {
  display: false
};

export const newRecipientDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NEW_RECIPIENT_DIALOG: {
      return {
        ...state,
        display: true
      };
    }
    case HIDE_NEW_RECIPIENT_DIALOG: {
      return {
        ...state,
        display: false
      };
    }
    default:
      return state;
  }
};
