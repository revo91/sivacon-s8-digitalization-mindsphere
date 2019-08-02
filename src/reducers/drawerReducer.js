import { MANAGE_DRAWER_OPEN } from '../actions/index';

const initialState = {
    drawerOpen: false,
};

export const drawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case MANAGE_DRAWER_OPEN:
            return {
                ...state,
                drawerOpen: action.open
            }
        default:
            return state;
    }
}