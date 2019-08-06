import {
    MANAGE_LANGUAGE_DIALOG
} from '../actions/languageDialog';

const initialState = {
    openDialog: false,
    language: ''
};

export const languageDialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case MANAGE_LANGUAGE_DIALOG: {
            return {
                ...state,
                openDialog: action.open
            }
        }
        default:
            return state;
    }
}