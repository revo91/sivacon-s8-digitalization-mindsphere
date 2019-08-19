export const SHOW_NEW_RECIPIENT_DIALOG = "SHOW_NEW_RECIPIENT_DIALOG";
export const HIDE_NEW_RECIPIENT_DIALOG = "HIDE_NEW_RECIPIENT_DIALOG";

export const showNewRecipientDialogActionCreator = function() {
  return {
    type: SHOW_NEW_RECIPIENT_DIALOG
  };
};

export const hideNewRecipientDialogActionCreator = function() {
  return {
    type: HIDE_NEW_RECIPIENT_DIALOG
  };
};
