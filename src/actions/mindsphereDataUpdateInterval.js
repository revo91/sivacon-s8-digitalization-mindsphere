import axios from 'axios';
import moment from 'moment';
import DecoderSupply from '../utils/DecoderSupply';
//devices' current state
export const GET_DATA_INTERVAL_SYNCHRONIZE_REQUESTED = 'GET_DATA_INTERVAL_SYNCHRONIZE_REQUESTED';
export const GET_DATA_INTERVAL_SYNCHRONIZE_DONE = 'GET_DATA_INTERVAL_SYNCHRONIZE_DONE';
export const GET_DATA_INTERVAL_SYNCHRONIZE_FAILED = 'GET_DATA_INTERVAL_SYNCHRONIZE_FAILED';
export const GET_3VA_BREAKER_1_MIN_DATA_FROM_MS_DONE = 'GET_3VA_BREAKER_1_MIN_DATA_FROM_MS_DONE';
export const GET_3VA_BREAKER_15_MIN_DATA_FROM_MS_DONE = 'GET_3VA_BREAKER_15_MIN_DATA_FROM_MS_DONE';
export const GET_3WL_BREAKER_1_MIN_DATA_FROM_MS_DONE = 'GET_3WL_BREAKER_1_MIN_DATA_FROM_MS_DONE';
export const GET_SOURCE_1_MIN_DATA_FROM_MS_DONE = 'GET_SOURCE_1_MIN_DATA_FROM_MS_DONE';
export const GET_SOURCE_15_MIN_DATA_FROM_MS_DONE = 'GET_SOURCE_15_MIN_DATA_FROM_MS_DONE';

export const getDataIntervalSynchronizeRequested = () => ({ type: GET_DATA_INTERVAL_SYNCHRONIZE_REQUESTED})
//1min
export const get3VABreaker1MinDataFromMSDone = (deviceName, data) => ({ type: GET_3VA_BREAKER_1_MIN_DATA_FROM_MS_DONE, deviceName, data})
export const get3WLBreaker1MinDataFromMSDone = (deviceName, data) => ({ type: GET_3WL_BREAKER_1_MIN_DATA_FROM_MS_DONE, deviceName, data})
export const getSource1MinDataFromMSDone = (deviceName, data, sourceState) => ({ type: GET_SOURCE_1_MIN_DATA_FROM_MS_DONE, deviceName, data, sourceState})
//15min
export const get3VABreaker15MinDataFromMSDone = (deviceName, data) => ({ type: GET_3VA_BREAKER_15_MIN_DATA_FROM_MS_DONE, deviceName, data})
export const getSource15MinDataFromMSDone = (deviceName, data) => ({ type: GET_SOURCE_15_MIN_DATA_FROM_MS_DONE, deviceName, data})

export const getDataIntervalSynchronizeFailed = (error) => ({ type: GET_DATA_INTERVAL_SYNCHRONIZE_FAILED, error})

export const getDataFromMS = (device, type, variable15Min=false) => {
    let url = null;
    let variables = null;
    let roundedDown = Math.floor(moment().minute() / 15) * 15;
    if(variable15Min === true)
    {
        if(type === 'breaker')
        {
            variables = 'Active_power_import_15_min,Reactive_power_import_15_min'
        }
        else {
            variables = 'Total_active_power_import_15_min,Total_apparent_power_15_min,Total_reactive_power_import_15_min'
        }
        url = `/api/iottimeseries/v3/timeseries/7e7105980c05449fae4e63a89b3952a4/${device}?select=${variables}&from=${moment().minute(roundedDown).second(0).subtract(1,'second').toISOString()}&to=${moment().minute(roundedDown).second(0).toISOString()}`
    }
    else {
        url = `/api/iottimeseries/v3/timeseries/7e7105980c05449fae4e63a89b3952a4/${device}`
    }
    
    return axios({
       url: url,
       header: 'application/json',
       method: 'GET',
       withCredentials: true,
       xsrfCookieName: 'XSRF-TOKEN'
   })
}

export const getIntervalData1Min = () => {
   return dispatch => {
       dispatch(getDataIntervalSynchronizeRequested());
       axios.all([
           //every 15-30 seconds
           getDataFromMS('1F1', 'breaker'),
           getDataFromMS('1F2', 'breaker'),
           getDataFromMS('1F3','breaker'),
           getDataFromMS('1F4', 'breaker'),
           getDataFromMS('1F5','breaker'),
           getDataFromMS('1F6', 'breaker'),
           getDataFromMS('1F7','breaker'),
           getDataFromMS('1FP1','breaker'),
           getDataFromMS('1FP2', 'breaker'),
           getDataFromMS('2F1','breaker'),
           getDataFromMS('2F2','breaker'),
           getDataFromMS('2F3', 'breaker'),
           getDataFromMS('2F4','breaker'),
           getDataFromMS('2F5','breaker'),
           getDataFromMS('2F6','breaker'),
           getDataFromMS('2FP1', 'breaker'),
           getDataFromMS('2FP2', 'breaker'),
           getDataFromMS('3F1', 'breaker'),
           getDataFromMS('3F2', 'breaker'),
           getDataFromMS('GEN', 'source'),
           getDataFromMS('PLC', 'breaker'),
           getDataFromMS('TR1', 'source'),
           getDataFromMS('TR2', 'source'),
         ])
         .then(axios.spread((_1F1, _1F2, _1F3, _1F4, _1F5, _1F6, _1F7, _1FP1, _1FP2, _2F1, _2F2, _2F3, _2F4, _2F5, _2F6, _2FP1, _2FP2, _3F1, _3F2, GEN, PLC, TR1, TR2) => {
             let Q1State = PLC.data[0].Q1_STATE;
             let Q2State = PLC.data[0].Q2_STATE;
             let Q3State = PLC.data[0].Q3_STATE;
             let Q4State = PLC.data[0].Q4_STATE;
             let Q5State = PLC.data[0].Q5_STATE;
             let sourcesState = DecoderSupply.convertValue(PLC.data[0].SUPPLY_STATE);

            dispatch(get3VABreaker1MinDataFromMSDone('cb_1F1',_1F1.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_1F2',_1F2.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_1F3',_1F3.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_1F4',_1F4.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_1F5',_1F5.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_1F6',_1F6.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_1F7',_1F7.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_1FP1',_1FP1.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_1FP2',_1FP2.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_2F1',_2F1.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_2F2',_2F2.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_2F3',_2F3.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_2F4',_2F4.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_2F5',_2F5.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_2F6',_2F6.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_2FP1',_2FP1.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_2FP2',_2FP2.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_3F1',_3F1.data[0]))
            dispatch(get3VABreaker1MinDataFromMSDone('cb_3F2',_3F2.data[0]))
            dispatch(get3WLBreaker1MinDataFromMSDone('cb_Q1',Q1State))
            dispatch(get3WLBreaker1MinDataFromMSDone('cb_Q2',Q2State))
            dispatch(get3WLBreaker1MinDataFromMSDone('cb_Q3',Q3State))
            dispatch(get3WLBreaker1MinDataFromMSDone('cb_Q4',Q4State))
            dispatch(get3WLBreaker1MinDataFromMSDone('cb_Q5',Q5State))
            dispatch(getSource1MinDataFromMSDone('TR1',TR1.data[0],sourcesState.tr1Supply))
            dispatch(getSource1MinDataFromMSDone('TR2',TR2.data[0],sourcesState.tr2Supply))
            dispatch(getSource1MinDataFromMSDone('GEN',GEN.data[0],sourcesState.genSupply))
         })
        )
        .catch(error => {
            // error
            dispatch(getDataIntervalSynchronizeFailed(error));
        })
   }
}

export const getIntervalData15Min = () => {
    return dispatch => {
        dispatch(getDataIntervalSynchronizeRequested());
        axios.all([
            //every full 15 mins - xx:00, xx:15, xx:30, xx:45
            getDataFromMS('TR1', 'source', true),
            getDataFromMS('TR2', 'source', true),
            getDataFromMS('GEN', 'source', true),
            getDataFromMS('1F1', 'breaker', true),
           getDataFromMS('1F2', 'breaker', true),
           getDataFromMS('1F3','breaker', true),
           getDataFromMS('1F4', 'breaker', true),
           getDataFromMS('1F5','breaker', true),
           getDataFromMS('1F6', 'breaker', true),
           getDataFromMS('1F7','breaker', true),
           getDataFromMS('1FP1','breaker', true),
           getDataFromMS('1FP2', 'breaker', true),
           getDataFromMS('2F1','breaker', true),
           getDataFromMS('2F2','breaker', true),
           getDataFromMS('2F3', 'breaker', true),
           getDataFromMS('2F4','breaker', true),
           getDataFromMS('2F5','breaker', true),
           getDataFromMS('2F6','breaker', true),
           getDataFromMS('2FP1', 'breaker', true),
           getDataFromMS('2FP2', 'breaker', true),
           getDataFromMS('3F1', 'breaker', true),
           getDataFromMS('3F2', 'breaker', true),
          ])
          .then(axios.spread((TR1, TR2, GEN, _1F1, _1F2, _1F3, _1F4, _1F5, _1F6, _1F7, _1FP1, _1FP2, _2F1, _2F2, _2F3, _2F4, _2F5, _2F6, _2FP1, _2FP2, _3F1, _3F2) => {
             dispatch(get3VABreaker15MinDataFromMSDone('cb_1F1',_1F1.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_1F2',_1F2.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_1F3',_1F3.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_1F4',_1F4.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_1F5',_1F5.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_1F6',_1F6.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_1F7',_1F7.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_1FP1',_1FP1.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_1FP2',_1FP2.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_2F1',_2F1.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_2F2',_2F2.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_2F3',_2F3.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_2F4',_2F4.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_2F5',_2F5.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_2F6',_2F6.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_2FP1',_2FP1.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_2FP2',_2FP2.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_3F1',_3F1.data[0]))
             dispatch(get3VABreaker15MinDataFromMSDone('cb_3F2',_3F2.data[0]))
             dispatch(getSource15MinDataFromMSDone('TR1',TR1.data[0]))
             dispatch(getSource15MinDataFromMSDone('TR2',TR2.data[0]))
             dispatch(getSource15MinDataFromMSDone('GEN',GEN.data[0]))
          })
         )
         .catch(error => {
            // error
            dispatch(getDataIntervalSynchronizeFailed(error));
        })
    }
 }