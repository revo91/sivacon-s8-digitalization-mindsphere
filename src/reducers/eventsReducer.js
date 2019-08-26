import moment from 'moment';

import { GET_EVENTS_REQUESTED,
    GET_EVENTS_DONE, GET_EVENTS_FAILED,
    SET_FILTER_FROM_DATE,
    SET_FILTER_TO_DATE } from '../actions/eventManagementApi';

const initialState = {
    eventsFetchError: false,
    eventsFetchPending: false,
    events: [],
    eventsFromTimeFilter: moment().subtract(1, 'month').toISOString(),
    eventsToTimeFilter: moment().toISOString()
};

export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS_REQUESTED:
            return {
                ...state,
                eventsFetchPending: true,
                eventsFetchError: false
            }
        case GET_EVENTS_FAILED:
            return {
                ...state,
                eventsFetchPending: false,
                eventsFetchError: true
            }
        case GET_EVENTS_DONE: 
            return {
                ...state,
                eventsFetchPending: false,
                eventsFetchError: false,
                events: action.data
            }
        case SET_FILTER_FROM_DATE: 
            return {
                ...state,
                eventsFromTimeFilter: action.fromDate
            }
        case SET_FILTER_TO_DATE:
            return {
                ...state,
                eventsToTimeFilter: action.toDate
            }

        default:
            return state;
    }
}