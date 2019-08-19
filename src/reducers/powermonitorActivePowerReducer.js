import { FETCH_POWERMONITOR_POWER_DATA } from "../actions/powermonitorActivePowerData";

const initialState = {
  data: null,
  startPeriod: null,
  endPeriod: null,
  maxValue: null,
  maxTime: null,
  transgressions: []
};

export const powermonitorPowerDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POWERMONITOR_POWER_DATA: {
      return {
        ...state,
        data: action.payload.data,
        startPeriod: action.payload.range.startPeriod,
        endPeriod: action.payload.range.endPeriod,
        transgressions: action.payload.transgressions,
        maxValue: action.payload.maxValue,
        maxTime: action.payload.maxTime
      };
    }
    default:
      return state;
  }
};
