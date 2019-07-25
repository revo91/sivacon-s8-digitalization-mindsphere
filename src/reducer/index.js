import { TOGGLE, SWITCH, GENERATE_RANDOM_DATA, MANAGE_ZOOM, MANAGE_DRAWER_OPEN, MANAGE_DIALOG_OPEN, 
    MANAGE_DIALOG_TAB, SET_CURRENT_DEVICE_STATUS, SET_CURRENT_DEVICE_TYPE } from '../actions/index';

const initialState = {
    //drawer
    drawerOpen: false, 

    //popup dialog with properties
    deviceProperties: {
        openDialog: false,
        selectedDevice: '',
        //circuit presentation names
        deviceTitle: '',
        deviceSection: '',
        deviceOutgoingFeeder: '',
        //device type for showing circuit type
        currentDeviceType: '',
        currentDeviceStatus: 0,
        tabIndex: 0,
        zoom: 1,
        timeRangeSlider: 1,
        datasetName: 'PAC2200',
        unit: 'V',
        xLabel: 'Czas',
        yLabel: 'Napięcie [V]',
        values:
            [{
                x:'2019-10-05T14:48:11.000Z',
                y:220.212
            },
            {
                x:'2019-10-05T14:50:12.000Z',
                y:221.532
            },
            {
                x:'2019-10-05T14:55:53.000Z',
                y:221.101
            },
            {
                x:'2019-10-05T15:12:12.000Z',
                y:223.523
            },
            {
                x:'2019-10-05T15:15:55.000Z',
                y:222.879
            },
            {
                x:'2019-10-05T15:22:43.000Z',
                y:224.271
            }],
    },
    //overview
    sources: {
        TR2: {
            state: 1,
            power: "21",
            current: "32",
            capacity: "21",

        },
        TR1: {
            state: 0,
            power: "",
            current: "",
            capacity: ""
        },
        GEN: {
            state: 0,
            power: "",
            current: "",
            capacity: ""
        }
    },
    breakers: {
        cb_2FP1: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_2FP2: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_Q2: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_Q4: {
            state: 0,
            power: "",
            current: "",
            capacity: ""
        },
        cb_2F1: {
            state: 0,
            power: "",
            current: "",
            capacity: ""
        },
        cb_2F2: {
            state: 0,
            power: "",
            current: "",
            capacity: ""
        },
        cb_2F3: {
            state: 0,
            power: "",
            current: "",
            capacity: ""
        },
        cb_2F4: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_2F5: {
            state: 0,
            power: "",
            current: "",
            capacity: ""
        },
        cb_2F6: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_1F1: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_1F2: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_1F3: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_1F4: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_1F5: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_1F6: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_1F7: {
            state: 0,
            power: "",
            current: "",
            capacity: ""
        },
        cb_3F1: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_3F2: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_Q5: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_Q1: {
            state: 0,
            power: "",
            current: "",
            capacity: ""
        },
        cb_1FP1: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_1FP2: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
        cb_Q3: {
            state: 1,
            power: "",
            current: "",
            capacity: ""
        },
    }
};


export const reducer = (state = initialState, action) => {
    let device = action.device;
    let deviceType = action.deviceType;
    
    switch (action.type) {
        case TOGGLE:
            return {
                ...state,
                [deviceType]: {
                    ...state[deviceType],
                    [device]: {
                        ...state[deviceType][device],
                        state: state[deviceType][device].state === 1 ? 0 : 1
                    }
                }
            };

        case SWITCH:
            return {
                ...state,
                elevation: {
                    ...state.elevation,
                    [device]: state.elevation[device] === 0 ? 1 : 0

                }
            }
        case GENERATE_RANDOM_DATA:
            return {
                ...state,
                deviceProperties: {
                    ...state.deviceProperties,
                    values: action.data
                }
            }
        case MANAGE_ZOOM:
            return {
                ...state,
                deviceProperties: {
                    ...state.deviceProperties,
                    zoom: action.InOut
                }
            }
        case MANAGE_DRAWER_OPEN:
            return {
                ...state,
                drawerOpen: action.open
            }
        case MANAGE_DIALOG_OPEN:
            return {
                ...state,
                deviceProperties: {
                    ...state.deviceProperties,
                    openDialog: action.open,
                    deviceTitle: action.deviceTitle,
                    deviceSection: action.deviceSection,
                    deviceOutgoingFeeder: action.deviceOutgoingFeeder,
                    selectedDevice: action.deviceName
                }
            }
        case MANAGE_DIALOG_TAB:
            return {
                ...state,
                deviceProperties: {
                    ...state.deviceProperties,
                    tabIndex: action.index
                }
            }
        case SET_CURRENT_DEVICE_STATUS:
            return {
                ...state,
                deviceProperties: {
                    ...state.deviceProperties,
                    currentDeviceStatus: action.status
                }
            }
        case SET_CURRENT_DEVICE_TYPE:
            return {
                ...state,
                deviceProperties: {
                    ...state.deviceProperties,
                    currentDeviceType: action.deviceType
                }
            }
        default:
            return state;
    }
}