import axios from 'axios';
import moment from 'moment';

export const GET_DATA_REQUESTED = 'GET_DATA_REQUESTED';
export const GET_DATA_DONE = 'GET_DATA_DONE';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';
export const CLEAR_DATASETS = 'CLEAR_DATASETS';
export const CHART_LIVE_UPDATE = 'CHART_LIVE_UPDATE';
export const SLIDER_SET_TIMERANGE = 'SLIDER_SET_TIMERANGE';
export const SLIDER_SET_STEP_VALUE = 'SLIDER_SET_STEP_VALUE';
export const CHART_SET_MARGIN_TO_REWIND = 'CHART_SET_MARGIN_TO_REWIND';
export const CHART_SET_REWIND_DIRECTION = 'CHART_SET_REWIND_DIRECTION';

export const getDataRequested = () => ({ type: GET_DATA_REQUESTED })
export const getDataDone = (data) => ({ type: GET_DATA_DONE, data: data })
export const getDataFailed = (error) => ({ type: GET_DATA_FAILED, data: error })
export const clearDatasets = () => ({ type: CLEAR_DATASETS })
export const chartLiveUpdate = (enabled) => ({ type: CHART_LIVE_UPDATE, enabled })
export const sliderSetTimerange = (timerange) => ({ type: SLIDER_SET_TIMERANGE, timerange })
export const sliderSetStepValue = (stepValue) => ({ type: SLIDER_SET_STEP_VALUE, stepValue })
export const chartSetMarginToRewind = (marginRange) => ({ type: CHART_SET_MARGIN_TO_REWIND, marginRange })
export const chartSetRewindDirection = (direction) => ({ type: CHART_SET_REWIND_DIRECTION, direction})

export const getData = (tabIndex, fromTime) => {

    let from = moment(fromTime).toISOString()
    let to = moment(from).add(30, 'minutes').toISOString();
    console.log(from)
    console.log(to)

    return dispatch => {
        let datasets = [];
        let colors = ['#ff4000',
        '#ff8000',
        '#ffbf00',
        '#ffff00',
        '#bfff00',
        '#80ff00',
        '#40ff00',
        '#00ff00',
        '#00ff40',
        '#00ff80',
        '#00ffbf',
        '#00ffff',
        '#00bfff',
        '#0080ff',
        '#0040ff',
        '#0000ff',
        '#4000ff',
        '#8000ff',
        '#bf00ff',
        '#ff00ff',
        '#ff00bf',
        '#ff0080',
        '#ff0040',
        '#ff0000']

        let i = 0;

        // set state to "loading"
        dispatch(getDataRequested());
        axios({
            url: `/api/iottimeseries/v3/timeseries/be32c81e40b541dab543f139a9f99eee/PAC2200?from=${from}&to=${to}&sort=desc&limit=2000`,
            header: 'application/json',
            method: 'GET',
            withCredentials: true,
            xsrfCookieName: 'XSRF-TOKEN'
        }).then(res => {
            //success

            if(res.data.length>0)
            {
                
                Object.keys(res.data[0]).forEach(function(key) {
                    let condition = null;
                    if(tabIndex===1)
                        {
                            //case Tab === voltage
                            condition = key.indexOf('_qc')===-1 && key.indexOf('_time')===-1 && key.indexOf('Voltage')!==-1;
                        }
                    else if(tabIndex===2)
                    {
                        //case Tab === current
                        condition = key.indexOf('_qc')===-1 && key.indexOf('_time')===-1 && key.indexOf('Current')!==-1;
                    }

                    if(condition)
                    {
                        i++;
                        let xyData=[];
                        res.data.map(singlePoint=>{
                            xyData.unshift({ x: new Date(singlePoint._time).toISOString(), y: (singlePoint[key]).toFixed(3) })
                        })

                        //if replace whole datasets > tab changed
                        datasets.push({
                            label: key,
                            backgroundColor: i<=colors.length?colors[i]:'#000000',
                            borderColor: i<=colors.length?colors[i]:'#000000',
                            data: xyData,
                            type: 'line',
                            pointRadius: 0,
                            fill: false,
                            lineTension: 0,
                            borderWidth: 2
                        })
                    }
                })
            }
                dispatch(getDataDone(datasets))
        })
            .catch(error => {
                // error
                dispatch(getDataFailed(error));
            })
    }
}