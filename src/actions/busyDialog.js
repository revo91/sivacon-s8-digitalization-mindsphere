export const SHOW_BUSY_DIALOG = "SHOW_BUSY_DIALOG";
export const HIDE_BUSY_DIALOG = "HIDE_BUSY_DIALOG";

export const showBusyDialogActionCreator = function() {
  return {
    type: SHOW_BUSY_DIALOG
  };
};

export const hideBusyDialogActionCreator = function() {
  return {
    type: HIDE_BUSY_DIALOG
  };
};
