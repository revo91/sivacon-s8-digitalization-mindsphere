import { CHANGE_REPORT_PAGE } from "../actions/reportData";

const initialState = {
  pageNumber: 0
};

export const reportDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_REPORT_PAGE: {
      return {
        ...state,
        pageNumber: action.payload.pageNumber
      };
    }
    default:
      return state;
  }
};
