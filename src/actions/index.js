export const TOGGLE = "TOGGLE";
export const GENERATE_RANDOM_DATA = "GENERATE_RANDOM_DATA";
export const MANAGE_ZOOM = "MANAGE_ZOOM";
export const MANAGE_DRAWER_OPEN = "MANAGE_DRAWER_OPEN";
export const MANAGE_DIALOG_OPEN = "MANAGE_DIALOG_OPEN";
export const MANAGE_DIALOG_TAB = "MANAGE_DIALOG_TAB";
export const SET_CURRENT_DEVICE_STATUS = "SET_CURRENT_DEVICE_STATUS";
export const SET_CURRENT_DEVICE_TYPE = "SET_CURRENT_DEVICE_TYPE";

export const overviewToggle = (deviceType, device) => ({ type: TOGGLE, deviceType: deviceType, device: device});
export const randomizeChartData = (data) => ({ type: GENERATE_RANDOM_DATA, data: data })
export const zoom = (InOut) => ({ type: MANAGE_ZOOM, InOut: InOut})
export const manageDrawerOpen = (open) => ({ type: MANAGE_DRAWER_OPEN, open: open})
export const manageDialogOpen = (open, deviceName, deviceTitle, deviceSection, deviceOutgoingFeeder) => 
({ type: MANAGE_DIALOG_OPEN, open: open, deviceName: deviceName, deviceTitle: deviceTitle, deviceSection: deviceSection, 
    deviceOutgoingFeeder: deviceOutgoingFeeder})
export const manageDialogTab = (index) => ({ type: MANAGE_DIALOG_TAB, index: index })
export const setCurrentDeviceStatus = (status) => ({ type: SET_CURRENT_DEVICE_STATUS, status: status })
export const setCurrentDeviceType = (deviceType) => ({ type: SET_CURRENT_DEVICE_TYPE, deviceType: deviceType})