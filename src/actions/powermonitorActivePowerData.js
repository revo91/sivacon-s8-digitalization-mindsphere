import { getTotalActivePowerMonthData } from "../services/powermonitorService";

import {
  hideBusyDialogActionCreator,
  showBusyDialogActionCreator
} from "./busyDialog";

import { exists, isEmpty } from "../utils/utilities";

import { enqueueSnackbar } from "./snackbar";

export const FETCH_POWERMONITOR_POWER_DATA = "FETCH_POWERMONITOR_POWER_DATA";

const powerScaleFactor = 0.001;

let normalizePowermonitorData = data => {
  let dataToReturn = [];
  //check timestamps to remove double timestamp in requests
  let timestamps = [];
  for (let valueObject of data) {
    let value = powerScaleFactor * valueObject.value;
    let date = valueObject.timestamp;

    //Adding only if timestamp is not already there
    if (!timestamps.includes(date)) {
      timestamps.push(date);
      dataToReturn.push({ value, date });
    }
  }
  return dataToReturn;
};

let calculatePeriodRange = (year, month) => {
  return {
    startPeriod: new Date(year, month, 1).getTime(),
    endPeriod: new Date(year, month + 1, 1).getTime()
  };
};

let calculateTransgressions = (data, warningLimit, alarmLimit) => {
  let transgressionsToReturn = [];

  for (let point of data) {
    let value = point.value;

    if (value >= alarmLimit) {
      transgressionsToReturn.push({
        date: new Date(point.date),
        value: value,
        transgression: value - alarmLimit,
        severity: "alarm"
      });
    } else if (value >= warningLimit) {
      transgressionsToReturn.push({
        date: new Date(point.date),
        value: value,
        transgression: value - warningLimit,
        severity: "warning"
      });
    }
  }

  return transgressionsToReturn;
};

let calculateMax = data => {
  if (!exists(data) || isEmpty(data)) return { maxTime: null, maxValue: null };
  let maxTime = data[0].date;
  let maxValue = data[0].value;

  for (let i = 1; i < data.length; i++) {
    if (data[i].value > maxValue) {
      maxValue = data[i].value;
      maxTime = data[i].date;
    }
  }

  return { maxValue, maxTime };
};

//Fetch data when initializing component - with showing busy dialog
export const fetchPowermonitorPowerMonthDataActionCreator = function(
  yearNumber,
  monthNumber
) {
  return async function(dispatch, getState) {
    await dispatch(showBusyDialogActionCreator());

    try {
      let data = await getTotalActivePowerMonthData(yearNumber, monthNumber);

      let normalizedData = normalizePowermonitorData(data);

      //Getting limits from powermonitorDataState
      let { powermonitor } = getState();
      let transgressions = [];

      if (exists(powermonitor.data)) {
        let {
          activePowerLimitWarning,
          activePowerLimitAlarm
        } = powermonitor.data;

        transgressions = calculateTransgressions(
          normalizedData,
          activePowerLimitWarning,
          activePowerLimitAlarm
        );
      }

      let max = calculateMax(normalizedData);

      await dispatch({
        type: FETCH_POWERMONITOR_POWER_DATA,
        payload: {
          data: normalizedData,
          transgressions: transgressions,
          range: calculatePeriodRange(yearNumber, monthNumber),
          maxValue: max.maxValue,
          maxTime: max.maxTime
        }
      });
    } catch (err) {
      await dispatch(
        enqueueSnackbar({ message: err.message, options: { variant: "error" } })
      );
    }

    await dispatch(hideBusyDialogActionCreator());
  };
};
