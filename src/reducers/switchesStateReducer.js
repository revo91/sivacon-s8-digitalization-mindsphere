import {
    TOGGLE
} from '../actions/index';

const initialState = {
    sources: {
        TR2: {
            state: 1,
            power: 11,
            current: 22,
            capacity: 33,
        },
        TR1: {
            state: 0,
            power: 342,
            current: 675,
            capacity: 68
        },
        GEN: {
            state: 0,
            power: 54,
            current: 34,
            capacity: 23
        }
    },
    breakers: {
        cb_2FP1: {
            state: 1,
            power: 456,
            current: 567,
            capacity: 121
        },
        cb_2FP2: {
            state: 1,
            power: 24,
            current: 8,
            capacity: 99
        },
        cb_Q2: {
            state: 1,
            power: 89,
            current: 79,
            capacity: 69
        },
        cb_Q4: {
            state: 0,
            power: 558,
            current: 7887,
            capacity: 785
        },
        cb_2F1: {
            state: 0,
            power: 38,
            current: 39,
            capacity: 32
        },
        cb_2F2: {
            state: 0,
            power: 98,
            current: 45,
            capacity: 39
        },
        cb_2F3: {
            state: 0,
            power: 39,
            current: 679,
            capacity: 679
        },
        cb_2F4: {
            state: 1,
            power: 79,
            current: 99,
            capacity: 88
        },
        cb_2F5: {
            state: 0,
            power: 77,
            current: 46,
            capacity: 48
        },
        cb_2F6: {
            state: 1,
            power: 50,
            current: 70,
            capacity: 80
        },
        cb_1F1: {
            state: 1,
            power: 21,
            current: 23,
            capacity: 24
        },
        cb_1F2: {
            state: 1,
            power: 25,
            current: 26,
            capacity: 27
        },
        cb_1F3: {
            state: 1,
            power: 776,
            current: 675,
            capacity: 475
        },
        cb_1F4: {
            state: 1,
            power: 897,
            current: 900,
            capacity: 77
        },
        cb_1F5: {
            state: 1,
            power: 421,
            current: 632,
            capacity: 512
        },
        cb_1F6: {
            state: 1,
            power: 898,
            current: 87,
            capacity: 66
        },
        cb_1F7: {
            state: 0,
            power: 885,
            current: 770,
            capacity: 547
        },
        cb_3F1: {
            state: 1,
            power: 334,
            current: 732,
            capacity: 123
        },
        cb_3F2: {
            state: 1,
            power: 145,
            current: 178,
            capacity: 190
        },
        cb_Q5: {
            state: 1,
            power: 321,
            current: 428,
            capacity: 80
        },
        cb_Q1: {
            state: 0,
            power: 432,
            current: 124,
            capacity: 155
        },
        cb_1FP1: {
            state: 1,
            power: 34,
            current: 754,
            capacity: 54
        },
        cb_1FP2: {
            state: 1,
            power: 25,
            current: 53,
            capacity: 54
        },
        cb_Q3: {
            state: 1,
            power: 666,
            current: 555,
            capacity: 444
        },
    }
};

export const switchesStateReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}