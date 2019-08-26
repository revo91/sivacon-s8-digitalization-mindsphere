import axios from "axios";
import {
  showBusyDialogActionCreator,
  hideBusyDialogActionCreator
} from "./busyDialog";

export const GET_EVENTS_REQUESTED = "GET_EVENTS_REQUESTED";
export const GET_EVENTS_DONE = "GET_EVENTS_DONE";
export const GET_EVENTS_FAILED = "GET_EVENTS_FAILED";
export const SET_FILTER_FROM_DATE = "SET_FILTER_FROM_DATE";
export const SET_FILTER_TO_DATE = "SET_FILTER_TO_DATE";

export const getEventsRequested = () => ({ type: GET_EVENTS_REQUESTED });
export const getEventsDone = data => ({ type: GET_EVENTS_DONE, data });
export const getEventsFailed = () => ({ type: GET_EVENTS_FAILED });
export const setEventsFilterFromDate = fromDate => ({
  type: SET_FILTER_FROM_DATE,
  fromDate
});
export const setEventsFilterToDate = toDate => ({
  type: SET_FILTER_TO_DATE,
  toDate
});

export const getEvents = (fromDate, toDate) => {
  return dispatch => {
    // set state to "loading"
    dispatch(getEventsRequested());
    dispatch(showBusyDialogActionCreator());
    axios({
      url: `/api/eventmanagement/v3/events?size=100`,
      header: "application/json",
      method: "GET",
      withCredentials: true,
      xsrfCookieName: "XSRF-TOKEN",
      params: {
        filter: {
          timestamp: {
            between: `[${fromDate},${toDate})`
          }
        }
      }
    })
      .then(res => {
        //success
        let data = res.data._embedded.events;
        dispatch(hideBusyDialogActionCreator());
        dispatch(getEventsDone(data));
      })
      .catch(error => {
        // error
        dispatch(hideBusyDialogActionCreator());
        dispatch(getEventsFailed());
      });
  };
};
