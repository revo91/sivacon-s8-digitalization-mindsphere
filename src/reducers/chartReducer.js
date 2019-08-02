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
    SLIDER_SET_TIMERANGE
} from '../actions/iottimeseriesData';

const initialState = {
    isChartDataLoading: false,
    isError: false,
    zoom: 1,
    timeRangeSlider: new Date().toISOString(),
    liveDataUpdate: true,
    datasets: [],
    unit: 'V',
    xLabel: 'Czas',
    yLabel: 'Wartości',
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
            console.log(action.timerange)
            return {
                ...state,
                timeRangeSlider: action.timerange
            }
        }
        default:
            return state;
    }
}