import {
    GENERATE_RANDOM_DATA,
    MANAGE_ZOOM
} from '../actions/index';

import {
    GET_DATA_REQUESTED,
    GET_DATA_DONE,
    GET_DATA_FAILED,
    CLEAR_DATASETS,
    CHART_LIVE_UPDATE,
    SLIDER_SET_TIMERANGE,
    SLIDER_SET_STEP_VALUE,
    CHART_SET_REWIND_DIRECTION,
    CHART_SET_MARGIN_TO_REWIND,
} from '../actions/iottimeseriesData';

const initialState = {
    isChartDataLoading: false,
    isError: false,
    zoom: 1,
    zoomedUnixTimeMargin: 0,
    zoomedRewindDirection: 0,
    timeRangeSlider: new Date().toISOString(),
    timeRangeStepValue: false,
    liveDataUpdate: true,
    datasets: [],
    unit: 'V',
};

export const chartReducer = (state = initialState, action) => {

    switch (action.type) {
        case GENERATE_RANDOM_DATA:
            return {
                ...state,
                values: action.data
            };
        case MANAGE_ZOOM:
            return {
                ...state,
                zoom: action.InOut
            }
        case GET_DATA_REQUESTED: {
            return {
                ...state,
                isChartDataLoading: true,
                isError: false
            }
        }
        case GET_DATA_DONE: {
            return {
                ...state,
                isChartDataLoading: false,
                isError: false,
                datasets: action.data
            }
        }
        case GET_DATA_FAILED: {
            return {
                ...state,
                isChartDataLoading: false,
                isError: true
            }
        }
        case CLEAR_DATASETS: {
            return {
                ...state,
                datasets: []
            }
        }
        case CHART_LIVE_UPDATE: {
            return {
                ...state,
                liveDataUpdate: action.enabled
            }
        }
        case SLIDER_SET_TIMERANGE: {
            return {
                ...state,
                timeRangeSlider: action.timerange
            }
        }
        case SLIDER_SET_STEP_VALUE: {
            return {
                ...state,
                timeRangeStepValue: action.stepValue
            }
        }
        case CHART_SET_MARGIN_TO_REWIND: {
            return {
                ...state,
                zoomedUnixTimeMargin: action.marginRange
            }
        }
        case CHART_SET_REWIND_DIRECTION: {
            return {
                ...state,
                zoomedRewindDirection: action.direction==="Forward"?state.zoomedRewindDirection+1:
                action.direction==="Backward"?state.zoomedRewindDirection-1:0
            }
        }
        default:
            return state;
    }
}