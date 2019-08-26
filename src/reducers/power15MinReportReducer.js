import {
  FETCH_15_MIN_POWER_REPORT,
  CHANGE_DAY_POWER_REPORT
} from "../actions/power15MinReportData";

const initialState = {
  year: null,
  month: null,
  data: null,
  transgressions: [],
  trendDay: null
};

export const power15MinReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_15_MIN_POWER_REPORT:
      return {
        ...state,
        year: action.payload.year,
        month: action.payload.month,
        data: action.payload.data,
        transgressions: action.payload.transgressions,
        trendDay: action.payload.trendDay
      };
    case CHANGE_DAY_POWER_REPORT:
      return {
        ...state,
        trendDay: action.payload.trendDay
      };
    default: {
      return state;
    }
  }
};
