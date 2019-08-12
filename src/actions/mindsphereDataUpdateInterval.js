import axios from 'axios';
import DecoderSupply from '../utils/DecoderSupply';
//devices' current state
export const GET_DATA_INTERVAL_SYNCHRONIZE_REQUESTED = 'GET_DATA_INTERVAL_SYNCHRONIZE_REQUESTED';
export const GET_DATA_INTERVAL_SYNCHRONIZE_DONE = 'GET_DATA_INTERVAL_SYNCHRONIZE_DONE';
export const GET_DATA_INTERVAL_SYNCHRONIZE_FAILED = 'GET_DATA_INTERVAL_SYNCHRONIZE_FAILED';
export const GET_3VA_BREAKER_DATA_FROM_MS_DONE = 'GET_3VA_BREAKER_DATA_FROM_MS_DONE';
export const GET_3WL_BREAKER_DATA_FROM_MS_DONE = 'GET_3WL_BREAKER_DATA_FROM_MS_DONE';
export const GET_SOURCE_DATA_FROM_MS_DONE = 'GET_SOURCE_DATA_FROM_MS_DONE';

export const getDataIntervalSynchronizeRequested = () => ({ type: GET_DATA_INTERVAL_SYNCHRONIZE_REQUESTED})
export const getDataIntervalSynchronizeDone = (deviceType, deviceName, data) => ({ type: GET_DATA_INTERVAL_SYNCHRONIZE_DONE, deviceType, deviceName, data})
export const get3VABreakerDataFromMSDone = (deviceName, data) => ({ type: GET_3VA_BREAKER_DATA_FROM_MS_DONE, deviceName, data})
export const get3WLBreakerDataFromMSDone = (deviceName, data) => ({ type: GET_3WL_BREAKER_DATA_FROM_MS_DONE, deviceName, data})
export const getSourceDataFromMSDone = (deviceName, data, sourceState) => ({ type: GET_SOURCE_DATA_FROM_MS_DONE, deviceName, data, sourceState})

export const getDataIntervalSynchronizeFailed = (error) => ({ type: GET_DATA_INTERVAL_SYNCHRONIZE_FAILED, error})

export const getDataFromMS = (device) => {
    return axios({
       url: `/api/iottimeseries/v3/timeseries/7e7105980c05449fae4e63a89b3952a4/${device}`,
       header: 'application/json',
       method: 'GET',
       withCredentials: true,
       xsrfCookieName: 'XSRF-TOKEN'
   })
}

export const getIntervalData = () => {
   return dispatch => {
       dispatch(getDataIntervalSynchronizeRequested());
       axios.all([
           getDataFromMS('1F1'),
           getDataFromMS('1F2'),
           getDataFromMS('1F3'),
           getDataFromMS('1F4'),
           getDataFromMS('1F5'),
           getDataFromMS('1F6'),
           getDataFromMS('1F7'),
           getDataFromMS('1FP1'),
           getDataFromMS('1FP2'),
           getDataFromMS('2F1'),
           getDataFromMS('2F2'),
           getDataFromMS('2F3'),
           getDataFromMS('2F4'),
           getDataFromMS('2F5'),
           getDataFromMS('2F6'),
           getDataFromMS('2FP1'),
           getDataFromMS('2FP2'),
           getDataFromMS('3F1'),
           getDataFromMS('3F2'),
           getDataFromMS('GEN'),
           getDataFromMS('PLC'),
           getDataFromMS('TR1'),
           getDataFromMS('TR2'),
         ])
         .then(axios.spread((_1F1, _1F2, _1F3, _1F4, _1F5, _1F6, _1F7, _1FP1, _1FP2, _2F1, _2F2, _2F3, _2F4, _2F5, _2F6, _2FP1, _2FP2, _3F1, _3F2, GEN, PLC, TR1, TR2) => {
             let Q1State = PLC.data[0].Q1_STATE;
             let Q2State = PLC.data[0].Q2_STATE;
             let Q3State = PLC.data[0].Q3_STATE;
             let Q4State = PLC.data[0].Q4_STATE;
             let Q5State = PLC.data[0].Q5_STATE;
             let sourcesState = DecoderSupply.convertValue(PLC.data[0].SUPPLY_STATE);

            dispatch(get3VABreakerDataFromMSDone('cb_1F1',_1F1.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_1F2',_1F2.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_1F3',_1F3.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_1F4',_1F4.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_1F5',_1F5.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_1F6',_1F6.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_1F7',_1F7.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_1FP1',_1FP1.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_1FP2',_1FP2.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_2F1',_2F1.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_2F2',_2F2.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_2F3',_2F3.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_2F4',_2F4.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_2F5',_2F5.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_2F6',_2F6.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_2FP1',_2FP1.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_2FP2',_2FP2.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_3F1',_3F1.data[0]))
            dispatch(get3VABreakerDataFromMSDone('cb_3F2',_3F2.data[0]))
            dispatch(get3WLBreakerDataFromMSDone('cb_Q1',Q1State))
            dispatch(get3WLBreakerDataFromMSDone('cb_Q2',Q2State))
            dispatch(get3WLBreakerDataFromMSDone('cb_Q3',Q3State))
            dispatch(get3WLBreakerDataFromMSDone('cb_Q4',Q4State))
            dispatch(get3WLBreakerDataFromMSDone('cb_Q5',Q5State))
            dispatch(getSourceDataFromMSDone('TR1',TR1.data[0],sourcesState.tr1Supply))
            dispatch(getSourceDataFromMSDone('TR2',TR2.data[0],sourcesState.tr2Supply))
            dispatch(getSourceDataFromMSDone('GEN',GEN.data[0],sourcesState.genSupply))
         })
        );
   }
}