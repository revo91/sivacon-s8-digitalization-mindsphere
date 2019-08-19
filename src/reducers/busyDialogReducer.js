import { SHOW_BUSY_DIALOG, HIDE_BUSY_DIALOG } from "../actions/busyDialog";

const initialState = {
  display: false
};

export const busyDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_BUSY_DIALOG: {
      return {
        ...state,
        display: true
      };
    }
    case HIDE_BUSY_DIALOG: {
      return {
        ...state,
        display: false
      };
    }
    default:
      return state;
  }
};
