import axios from 'axios';
import DecoderSupply from '../utils/DecoderSupply';
import DecoderATSE from '../utils/DecoderATSE';
//devices' current state
export const GET_DATA_INTERVAL_SYNCHRONIZE_REQUESTED = 'GET_DATA_INTERVAL_SYNCHRONIZE_REQUESTED';
export const GET_DATA_INTERVAL_SYNCHRONIZE_DONE = 'GET_DATA_INTERVAL_SYNCHRONIZE_DONE';
export const GET_DATA_INTERVAL_SYNCHRONIZE_FAILED = 'GET_DATA_INTERVAL_SYNCHRONIZE_FAILED';
export const GET_3VA_BREAKER_1_MIN_DATA_FROM_MS_DONE = 'GET_3VA_BREAKER_1_MIN_DATA_FROM_MS_DONE';
export const GET_3VA_BREAKER_15_MIN_DATA_FROM_MS_DONE = 'GET_3VA_BREAKER_15_MIN_DATA_FROM_MS_DONE';
export const GET_3WL_BREAKER_1_MIN_DATA_FROM_MS_DONE = 'GET_3WL_BREAKER_1_MIN_DATA_FROM_MS_DONE';
export const GET_SOURCE_1_MIN_DATA_FROM_MS_DONE = 'GET_SOURCE_1_MIN_DATA_FROM_MS_DONE';
export const GET_SOURCE_15_MIN_DATA_FROM_MS_DONE = 'GET_SOURCE_15_MIN_DATA_FROM_MS_DONE';
export const GET_GEN_READY_STARTED = 'GET_GEN_READY_STARTED';
export const GET_ATSE_STATE = 'GET_ATSE_STATE';

export const getDataIntervalSynchronizeRequested = () => ({ type: GET_DATA_INTERVAL_SYNCHRONIZE_REQUESTED })
//1min
export const get3VABreaker1MinDataFromMSDone = (deviceName, data) => ({ type: GET_3VA_BREAKER_1_MIN_DATA_FROM_MS_DONE, deviceName, data })
export const get3WLBreaker1MinDataFromMSDone = (deviceName, data) => ({ type: GET_3WL_BREAKER_1_MIN_DATA_FROM_MS_DONE, deviceName, data })
export const getSource1MinDataFromMSDone = (deviceName, data, sourceState) => ({ type: GET_SOURCE_1_MIN_DATA_FROM_MS_DONE, deviceName, data, sourceState })
export const getGenReadyStartedFromMSDone = (ready, started) => ({ type: GET_GEN_READY_STARTED, ready, started })
export const getAtseState = (data) => ({ type: GET_ATSE_STATE, data })
//15min
export const get3VABreaker15MinDataFromMSDone = (deviceName, data) => ({ type: GET_3VA_BREAKER_15_MIN_DATA_FROM_MS_DONE, deviceName, data })
export const getSource15MinDataFromMSDone = (deviceName, data) => ({ type: GET_SOURCE_15_MIN_DATA_FROM_MS_DONE, deviceName, data })

export const getDataIntervalSynchronizeFailed = (error) => ({ type: GET_DATA_INTERVAL_SYNCHRONIZE_FAILED, error })

export const getDataFromMS = (device, type, variable15Min = false) => {
    let url = null;
    let variables = null;
    if (variable15Min === true) {
        if (type === 'breaker') {
            variables = 'Active_power_import_15_min,Reactive_power_import_15_min'
        }
        else {
            variables = 'Total_active_power_import,Total_apparent_power,Total_reactive_power_import'
        }
        url = `/api/iottimeseries/v3/timeseries/a5eebd59cd1348c5b38f8d74ab432780/${device}?select=${variables}`
    }
    else {
        url = `/api/iottimeseries/v3/timeseries/a5eebd59cd1348c5b38f8d74ab432780/${device}`
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
            getDataFromMS('1F1_1_min', 'breaker'),
            getDataFromMS('1F2_1_min', 'breaker'),
            getDataFromMS('1F3_1_min', 'breaker'),
            getDataFromMS('1F4_1_min', 'breaker'),
            getDataFromMS('1F5_1_min', 'breaker'),
            getDataFromMS('1F6_1_min', 'breaker'),
            getDataFromMS('1F7_1_min', 'breaker'),
            getDataFromMS('1FP1_1_min', 'breaker'),
            getDataFromMS('1FP2_1_min', 'breaker'),
            getDataFromMS('2F1_1_min', 'breaker'),
            getDataFromMS('2F2_1_min', 'breaker'),
            getDataFromMS('2F3_1_min', 'breaker'),
            getDataFromMS('2F4_1_min', 'breaker'),
            getDataFromMS('2F5_1_min', 'breaker'),
            getDataFromMS('2F6_1_min', 'breaker'),
            getDataFromMS('2FP1_1_min', 'breaker'),
            getDataFromMS('2FP2_1_min', 'breaker'),
            getDataFromMS('3F1_1_min', 'breaker'),
            getDataFromMS('3F2_1_min', 'breaker'),
            getDataFromMS('GEN_1_min', 'source'),
            //q1-q5 states
            getDataFromMS('RG_PLC_1_min', 'breaker'),
            //supplies state
            getDataFromMS('RG_PLC_5_s', 'source'),
            getDataFromMS('TR1_1_min', 'source'),
            getDataFromMS('TR2_1_min', 'source'),
            //currents (case breakers, sources) & voltages (case sources) - '_1_s'
            getDataFromMS('1F1_1_s', 'breaker'),
            getDataFromMS('1F2_1_s', 'breaker'),
            getDataFromMS('1F3_1_s', 'breaker'),
            getDataFromMS('1F4_1_s', 'breaker'),
            getDataFromMS('1F5_1_s', 'breaker'),
            getDataFromMS('1F6_1_s', 'breaker'),
            getDataFromMS('1F7_1_s', 'breaker'),
            getDataFromMS('1FP1_1_s', 'breaker'),
            getDataFromMS('1FP2_1_s', 'breaker'),
            getDataFromMS('2F1_1_s', 'breaker'),
            getDataFromMS('2F2_1_s', 'breaker'),
            getDataFromMS('2F3_1_s', 'breaker'),
            getDataFromMS('2F4_1_s', 'breaker'),
            getDataFromMS('2F5_1_s', 'breaker'),
            getDataFromMS('2F6_1_s', 'breaker'),
            getDataFromMS('2FP1_1_s', 'breaker'),
            getDataFromMS('2FP2_1_s', 'breaker'),
            getDataFromMS('3F1_1_s', 'breaker'),
            getDataFromMS('3F2_1_s', 'breaker'),
            getDataFromMS('GEN_1_s', 'source'),
            getDataFromMS('TR1_1_s', 'source'),
            getDataFromMS('TR2_1_s', 'source')
        ])
            .then(axios.spread((_1F1, _1F2, _1F3, _1F4, _1F5, _1F6, _1F7, _1FP1, _1FP2, _2F1, _2F2, _2F3, _2F4, _2F5, _2F6, _2FP1, _2FP2, _3F1, _3F2, GEN, PLC_breakersState, PLC_suppliesState,
                TR1, TR2, _1F1_currents, _1F2_currents, _1F3_currents, _1F4_currents, _1F5_currents, _1F6_currents, _1F7_currents, _1FP1_currents, _1FP2_currents, _2F1_currents, _2F2_currents,
                _2F3_currents, _2F4_currents, _2F5_currents, _2F6_currents, _2FP1_currents, _2FP2_currents, _3F1_currents, _3F2_currents, GEN_currents_voltages, TR1_currents_voltages,
                TR2_currents_voltages) => {
                let Q1State = PLC_breakersState.data[0].Q1_STATE;
                let Q2State = PLC_breakersState.data[0].Q2_STATE;
                let Q3State = PLC_breakersState.data[0].Q3_STATE;
                let Q4State = PLC_breakersState.data[0].Q4_STATE;
                let Q5State = PLC_breakersState.data[0].Q5_STATE;
                let sourcesState = DecoderSupply.convertValue(PLC_suppliesState.data[0].SUPPLY_STATE);
                let ATSEstate = DecoderATSE.convertValue(PLC_suppliesState.data[0].ATSE_STATE); 
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F1', _1F1.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F2', _1F2.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F3', _1F3.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F4', _1F4.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F5', _1F5.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F6', _1F6.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F7', _1F7.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1FP1', _1FP1.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1FP2', _1FP2.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2F1', _2F1.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2F2', _2F2.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2F3', _2F3.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2F4', _2F4.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2F5', _2F5.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2F6', _2F6.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2FP1', _2FP1.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2FP2', _2FP2.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_3F1', _3F1.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_3F2', _3F2.data[0]))
                dispatch(get3WLBreaker1MinDataFromMSDone('cb_Q1', Q1State))
                dispatch(get3WLBreaker1MinDataFromMSDone('cb_Q2', Q2State))
                dispatch(get3WLBreaker1MinDataFromMSDone('cb_Q3', Q3State))
                dispatch(get3WLBreaker1MinDataFromMSDone('cb_Q4', Q4State))
                dispatch(get3WLBreaker1MinDataFromMSDone('cb_Q5', Q5State))
                dispatch(getSource1MinDataFromMSDone('TR1', TR1.data[0], sourcesState.tr1Supply))
                dispatch(getSource1MinDataFromMSDone('TR2', TR2.data[0], sourcesState.tr2Supply))
                dispatch(getSource1MinDataFromMSDone('GEN', GEN.data[0], sourcesState.genSupply))
                dispatch(getGenReadyStartedFromMSDone(sourcesState.genReady, sourcesState.genStarted))
                dispatch(getAtseState(ATSEstate))

                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F1', _1F1_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F2', _1F2_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F3', _1F3_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F4', _1F4_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F5', _1F5_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F6', _1F6_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1F7', _1F7_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1FP1', _1FP1_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_1FP2', _1FP2_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2F1', _2F1_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2F2', _2F2_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2F3', _2F3_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2F4', _2F4_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2F5', _2F5_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2F6', _2F6_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2FP1', _2FP1_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_2FP2', _2FP2_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_3F1', _3F1_currents.data[0]))
                dispatch(get3VABreaker1MinDataFromMSDone('cb_3F2', _3F2_currents.data[0]))
                dispatch(getSource15MinDataFromMSDone('TR1', TR1_currents_voltages.data[0]))
                dispatch(getSource15MinDataFromMSDone('TR2', TR2_currents_voltages.data[0]))
                dispatch(getSource15MinDataFromMSDone('GEN', GEN_currents_voltages.data[0]))

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
            getDataFromMS('TR1_15_min', 'source', true),
            getDataFromMS('TR2_15_min', 'source', true),
            getDataFromMS('GEN_15_min', 'source', true),
            getDataFromMS('1F1_15_min', 'breaker', true),
            getDataFromMS('1F2_15_min', 'breaker', true),
            getDataFromMS('1F3_15_min', 'breaker', true),
            getDataFromMS('1F4_15_min', 'breaker', true),
            getDataFromMS('1F5_15_min', 'breaker', true),
            getDataFromMS('1F6_15_min', 'breaker', true),
            getDataFromMS('1F7_15_min', 'breaker', true),
            getDataFromMS('1FP1_15_min', 'breaker', true),
            getDataFromMS('1FP2_15_min', 'breaker', true),
            getDataFromMS('2F1_15_min', 'breaker', true),
            getDataFromMS('2F2_15_min', 'breaker', true),
            getDataFromMS('2F3_15_min', 'breaker', true),
            getDataFromMS('2F4_15_min', 'breaker', true),
            getDataFromMS('2F5_15_min', 'breaker', true),
            getDataFromMS('2F6_15_min', 'breaker', true),
            getDataFromMS('2FP1_15_min', 'breaker', true),
            getDataFromMS('2FP2_15_min', 'breaker', true),
            getDataFromMS('3F1_15_min', 'breaker', true),
            getDataFromMS('3F2_15_min', 'breaker', true),
        ])
            .then(axios.spread((TR1, TR2, GEN, _1F1, _1F2, _1F3, _1F4, _1F5, _1F6, _1F7, _1FP1, _1FP2, _2F1, _2F2, _2F3, _2F4, _2F5, _2F6, _2FP1, _2FP2, _3F1, _3F2) => {
                dispatch(get3VABreaker15MinDataFromMSDone('cb_1F1', _1F1.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_1F2', _1F2.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_1F3', _1F3.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_1F4', _1F4.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_1F5', _1F5.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_1F6', _1F6.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_1F7', _1F7.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_1FP1', _1FP1.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_1FP2', _1FP2.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_2F1', _2F1.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_2F2', _2F2.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_2F3', _2F3.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_2F4', _2F4.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_2F5', _2F5.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_2F6', _2F6.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_2FP1', _2FP1.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_2FP2', _2FP2.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_3F1', _3F1.data[0]))
                dispatch(get3VABreaker15MinDataFromMSDone('cb_3F2', _3F2.data[0]))
                dispatch(getSource15MinDataFromMSDone('TR1', TR1.data[0]))
                dispatch(getSource15MinDataFromMSDone('TR2', TR2.data[0]))
                dispatch(getSource15MinDataFromMSDone('GEN', GEN.data[0]))
            })
            )
            .catch(error => {
                // error
                dispatch(getDataIntervalSynchronizeFailed(error));
            })
    }
}