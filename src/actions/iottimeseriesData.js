import axios from "axios";
import moment from "moment";
import i18n from '../i18n';
import { showBusyDialogActionCreator, hideBusyDialogActionCreator } from "./busyDialog"
//chart data
export const GET_DATA_REQUESTED = "GET_DATA_REQUESTED";
export const GET_DATA_DONE = "GET_DATA_DONE";
export const GET_DATA_FAILED = "GET_DATA_FAILED";
export const CLEAR_DATASETS = "CLEAR_DATASETS";
export const CHART_LIVE_UPDATE = "CHART_LIVE_UPDATE";
export const SLIDER_SET_TIMERANGE = "SLIDER_SET_TIMERANGE";
export const SLIDER_SET_STEP_VALUE = "SLIDER_SET_STEP_VALUE";
export const CHART_SET_MARGIN_TO_REWIND = "CHART_SET_MARGIN_TO_REWIND";
export const CHART_SET_REWIND_DIRECTION = "CHART_SET_REWIND_DIRECTION";

export const getDataRequested = () => ({ type: GET_DATA_REQUESTED });
export const getDataDone = data => ({ type: GET_DATA_DONE, data: data });
export const getDataFailed = error => ({ type: GET_DATA_FAILED, data: error });
export const clearDatasets = () => ({ type: CLEAR_DATASETS });
export const chartLiveUpdate = enabled => ({
  type: CHART_LIVE_UPDATE,
  enabled
});
export const sliderSetTimerange = timerange => ({
  type: SLIDER_SET_TIMERANGE,
  timerange
});
export const sliderSetStepValue = stepValue => ({
  type: SLIDER_SET_STEP_VALUE,
  stepValue
});
export const chartSetMarginToRewind = marginRange => ({
  type: CHART_SET_MARGIN_TO_REWIND,
  marginRange
});
export const chartSetRewindDirection = direction => ({
  type: CHART_SET_REWIND_DIRECTION,
  direction
});

export const getData = (device, tabIndex, toTime, loadingCircle = false, live = false) => {
  let from = moment().subtract(15, "minute").toISOString();
  let to = moment(toTime).startOf("minute").toISOString();
  switch (tabIndex) {
    case 'powerTab':
    case 'THDItab':
    case 'THDUtab':
      from = moment(toTime).startOf("day").subtract(10, 'minutes').toISOString();
      to = moment(toTime).endOf("day").toISOString();
      break;
    default:
      if(live)
      {
        from = moment(toTime).subtract(15, "minutes").toISOString();
        to = moment(toTime).toISOString();
      }
      else {
        from = moment(toTime).subtract(7.5, "minutes").toISOString();
        to = moment(toTime).add(7.5, "minutes").toISOString();
      }
      break;
  }

  return dispatch => {
    let datasets = [];
    let colors = [
      "#f70c0c", //red
      "#169407", //green
      "#093eb3", //blue
      "#720c9c", //violet
      "#12edfc" //orange
    ];

    let color = 0;
    let variablesToGET = null;
    switch (tabIndex) {
      case "voltageLLTab":
        variablesToGET = [
          "Voltage_L1_L2",
          "Voltage_L2_L3",
          "Voltage_L3_L1",
        ];
        break;
      case "voltageLNTab":
        variablesToGET = [
          "Voltage_L1_N",
          "Voltage_L2_N",
          "Voltage_L3_N",
        ];
        break;
      case "currentTab":
        variablesToGET = ['Current_L1', 'Current_L2', 'Current_L3'];
        break;
      case "powerTab":
        if (device === 'TR2_15_min' || device === 'TR1_15_min' || device === 'GEN_15_min') {
          variablesToGET = ['Total_active_power_import', 'Total_reactive_power_import', 'Total_apparent_power', 'Total_active_power_export', 'Total_reactive_power_export']
        }
        else {
          variablesToGET = ['Active_power_import_15_min', 'Reactive_power_import_15_min', 'Active_power_export_15_min', 'Reactive_power_export_15_min']
        }
        break;
      case "THDUtab":
        variablesToGET = ['THD_voltage_L1', 'THD_voltage_L2', 'THD_voltage_L3'];
        break;
      case "THDItab":
        if (device.indexOf('TR') !== -1) {
          variablesToGET = ['THD_current_L1', 'THD_current_L2', 'THD_current_L3'];
        }
        else {
          variablesToGET = ['THD_Current_L1', 'THD_Current_L2', 'THD_Current_L3'];
        }
        break;
      default:
        variablesToGET = ['Current_L1', 'Current_L2', 'Current_L3'];
        break;
    }

    // set state to "loading"
    if (loadingCircle === true) {
      dispatch(showBusyDialogActionCreator())
    }
    dispatch(getDataRequested());
    axios({
      url: `/api/iottimeseries/v3/timeseries/a5eebd59cd1348c5b38f8d74ab432780/${device}?select=${variablesToGET}&from=${from}&to=${to}&sort=desc&limit=2000`,
      header: "application/json",
      method: "GET",
      withCredentials: true,
      xsrfCookieName: "XSRF-TOKEN"
    })
      .then(res => {
        //success
        if (res.data.length > 0) {
          Object.keys(res.data[0]).forEach(function (key) {
            if (key.indexOf("_qc") === -1 && key.indexOf("_time") === -1) {
              let label = i18n.t(key)
              let xyData = [];
              res.data.map(singlePoint => {
                return xyData.unshift({
                  x: new Date(singlePoint._time),
                  y: tabIndex === 'powerTab' ? parseFloat((singlePoint[key] / 1000).toFixed(3)) : parseFloat(singlePoint[key].toFixed(3))
                });
              });
              //if replace whole datasets > tab changed
              datasets.push({
                label: label,
                backgroundColor:
                  color <= colors.length ? colors[color] : "#000000",
                borderColor: color <= colors.length ? colors[color] : "#000000",
                data: xyData,
                type: "line",
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2
              });
              color++;
            }
          });
        }
        if (loadingCircle === true) {
          dispatch(hideBusyDialogActionCreator())
        }
        dispatch(getDataDone(datasets));
      })
      .catch(error => {
        // error
        if (loadingCircle === true) {
          dispatch(hideBusyDialogActionCreator())
        }
        dispatch(getDataFailed(error));
      });
  };
};
