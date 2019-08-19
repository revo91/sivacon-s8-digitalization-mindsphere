import {
  GET_POWERMONITOR_DATA,
  CHANGE_POWERMONITOR_PAGE,
  CHANGE_POWERMONITOR_SETTINGS,
  GET_POWERMONITOR_SETTINGS
} from "../actions/powermonitorData";

const initialState = {
  data: null,
  pageNumber: 0,
  settings: null
};

export const powermonitorDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POWERMONITOR_DATA: {
      return {
        ...state,
        data: action.payload.data
      };
    }
    case CHANGE_POWERMONITOR_PAGE: {
      return {
        ...state,
        pageNumber: action.payload.pageNumber
      };
    }
    case CHANGE_POWERMONITOR_SETTINGS: {
      return {
        ...state,
        data: action.payload.data,
        settings: action.payload.settings
      };
    }
    case GET_POWERMONITOR_SETTINGS: {
      return {
        ...state,
        settings: action.payload.settings
      };
    }
    default:
      return state;
  }
};
