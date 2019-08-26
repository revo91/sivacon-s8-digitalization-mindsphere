import {
  FETCH_INFEED_QUALITY_REPORT,
  CHANGE_INFEED_SELECTION_QUALITY_REPORT
} from "../actions/infeedQualityReportData";

const initialState = {
  year: null,
  month: null,
  data: null,
  selectedInfeed: null
};

export const infeedQualityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INFEED_QUALITY_REPORT:
      return {
        ...state,
        year: action.payload.year,
        month: action.payload.month,
        data: action.payload.data,
        selectedInfeed: action.payload.selectedInfeed
      };

    case CHANGE_INFEED_SELECTION_QUALITY_REPORT:
      return {
        ...state,
        selectedInfeed: action.payload.selectedInfeed
      };
    default: {
      return state;
    }
  }
};
