const initialState = {
    //drawer
    drawerOpen: false, 

    //chartPopup
    chartData: {
        openDialog: false,
        contentType: 'deviceOverview',
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

    //elevation
    elevation: {
        S2P2_1: 0,
        S2P2_2: 0,
        S2P2_3: 0,
        S2P2_4: 0,
        S2P2_5: 0,
        S2P2_10: 0,
        S1P2_1: 0,
        S1P2_2: 0,
        S1P2_3: 0,
        S1P2_4: 0,
        S1P2_5: 0,
        S1P2_6: 0,
        S1P2_10: 0,
        S1P4_3: 0,
        S1P4_4: 0,
        S2P3_1: 0,
        S2P1_1: 0,
        S0P0_1: 0,
        S1P1_1: 0,
        S1P3_1: 0,
        S1P4_3VA_1: 0,
        S1P4_3VA_2: 0,
        S2P1_3VA_1: 0,
        S2P1_3VA_2: 0,
        S1P1_3VA_1: 0,
        S1P1_3VA_2: 0
    },

    //overview
    sources: {
        TR2: {
            state: 1,
            power: "21",
            current: "32",
            capacity: "21"
        },
        TR1: {
            state: 0,
            power: "",
            current: "",
            capacity: ""
        },
        GEN: {
            state: 1,
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
            state: 0,
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
        case 'TOGGLE':
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

        case 'SWITCH':
            return {
                ...state,
                elevation: {
                    ...state.elevation,
                    [device]: state.elevation[device] === 0 ? 1 : 0

                }
            }
        case 'GENERATE_RANDOM_DATA':
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    values: action.data
                }
            }
        case 'MANAGE_ZOOM':
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    zoom: action.InOut
                }
            }
        case 'MANAGE_DRAWER_OPEN':
            return {
                ...state,
                drawerOpen: action.open
            }
        case 'MANAGE_DIALOG_OPEN':
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    openDialog: action.open,
                    datasetName: action.chartName
                }
            }
        case 'MANAGE_SHOWN_DIALOG_CONTENT_TYPE':
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    contentType: action.content
                }
            }
        default:
            return state;
        
    }
}