import {
    MANAGE_DIALOG_OPEN,
    MANAGE_DIALOG_TAB,
    SET_CURRENT_DEVICE_STATUS,
    SET_CURRENT_DEVICE_TYPE
} from '../actions/index';

const initialState = {
    openDialog: false,
    selectedDevice: '',
    //circuit presentation names
    deviceTitle: '',
    deviceSection: '',
    deviceOutgoingFeeder: '',
    //device type for showing circuit type
    currentDeviceType: '',
    tabIndex: 'overviewTab',
};

export const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case MANAGE_DIALOG_OPEN:
            return {
                ...state,
                openDialog: action.open,
                deviceTitle: action.deviceTitle,
                deviceSection: action.deviceSection,
                deviceOutgoingFeeder: action.deviceOutgoingFeeder,
                selectedDevice: action.deviceName
            }

        case MANAGE_DIALOG_TAB:
            return {
                ...state,
                tabIndex: action.index
            }
        case SET_CURRENT_DEVICE_STATUS:
            return {
                ...state,
                currentDeviceStatus: action.status
            }
        case SET_CURRENT_DEVICE_TYPE:
            return {
                ...state,
                currentDeviceType: action.deviceType
            }
        default:
            return state;
    }
}