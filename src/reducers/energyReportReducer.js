import { FETCH_ENERGY_REPORT } from "../actions/energyReportData";

const initialState = {
  year: null,
  month: null,
  data: null,
  totalConsumption: null,
  consumptionPerDay: null
};

export const energyDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ENERGY_REPORT:
      return {
        ...state,
        year: action.payload.year,
        month: action.payload.month,
        data: action.payload.data,
        totalConsumption: action.payload.totalConsumption,
        consumptionPerDay: action.payload.consumptionPerDay
      };

    default: {
      return state;
    }
  }
};
