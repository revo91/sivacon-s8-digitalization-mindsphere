export const TOGGLE = "TOGGLE";
export const SWITCH = "SWITCH";
export const GENERATE_RANDOM_DATA = "GENERATE_RANDOM_DATA";
export const MANAGE_ZOOM = "MANAGE_ZOOM";
export const MANAGE_DRAWER_OPEN = "MANAGE_DRAWER_OPEN";
export const MANAGE_DIALOG_OPEN = "MANAGE_DIALOG_OPEN";
export const MANAGE_SHOWN_DIALOG_CONTENT_TYPE = "MANAGE_SHOWN_DIALOG_CONTENT_TYPE";

export const overviewToggle = (deviceType, device) => ({ type: TOGGLE, deviceType: deviceType, device: device});
export const elevationSwitch = (device) => ({ type: SWITCH, device: device })
export const randomizeChartData = (data) => ({ type: GENERATE_RANDOM_DATA, data: data })
export const zoom = (InOut) => ({ type: MANAGE_ZOOM, InOut: InOut})
export const manageDrawerOpen = (open) => ({ type: MANAGE_DRAWER_OPEN, open: open})
export const manageDialogOpen = (open, chartName) => ({ type: MANAGE_DIALOG_OPEN, open: open, chartName: chartName})
export const manageShownDialogContentType = (content) => ({ type: MANAGE_SHOWN_DIALOG_CONTENT_TYPE, content: content }) 