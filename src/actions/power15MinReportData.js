import _ from "lodash";

import { getPowerMonthly } from "../services/rgPZOService";

import { getPowermonitorDataActionCreator } from "./powermonitorData";

import {
  hideBusyDialogActionCreator,
  showBusyDialogActionCreator
} from "./busyDialog";

import { exists } from "../utils/utilities";

import { enqueueSnackbar } from "./snackbar";

const normalizeData = monthlyPowerData => {
  let dataToReturn = {};

  let allElements = Object.keys(monthlyPowerData);

  for (let element of allElements) {
    let allDates = Object.keys(monthlyPowerData[element]);

    dataToReturn[element] = {
      data: [],
      maxValue: null,
      maxDate: null
    };

    if (allDates.length > 0) {
      let value = monthlyPowerData[element][allDates[0]].value / 1000;
      let date = monthlyPowerData[element][allDates[0]].date;

      dataToReturn[element].data.push({
        value,
        date
      });

      dataToReturn[element].maxValue = value;
      dataToReturn[element].maxDate = date;

      for (let i = 1; i < allDates.length; i++) {
        value = monthlyPowerData[element][allDates[i]].value / 1000;
        date = monthlyPowerData[element][allDates[i]].date;

        dataToReturn[element].data.push({
          value,
          date
        });

        if (value > dataToReturn[element].maxValue) {
          dataToReturn[element].maxValue = value;
          dataToReturn[element].maxDate = date;
        }
      }
    }
  }

  return dataToReturn;
};

let calculateTransgressions = (totalPowerData, warningLimit, alarmLimit) => {
  let transgressionsToReturn = [];

  for (let point of totalPowerData) {
    let value = point.value;

    if (value >= alarmLimit) {
      transgressionsToReturn.push({
        date: point.date,
        value: value,
        transgression: value - alarmLimit,
        severity: "alarm"
      });
    } else if (value >= warningLimit) {
      transgressionsToReturn.push({
        date: point.date,
        value: value,
        transgression: value - warningLimit,
        severity: "warning"
      });
    }
  }

  return transgressionsToReturn;
};

const getTotalPowerAndTransformersData = (
  monthlyPowerData,
  trafoPowerLosses
) => {
  let dataToReturn = {
    total: {
      data: [],
      maxValue: null,
      maxDate: null
    },

    transformers: {
      data: [],
      maxValue: null,
      maxDate: null
    },

    rest: {
      data: [],
      maxValue: null,
      maxDate: null
    }
  };

  if (!exists(monthlyPowerData["TR1"])) return dataToReturn;
  if (!exists(monthlyPowerData["TR2"])) return dataToReturn;
  if (!exists(monthlyPowerData["GEN"])) return dataToReturn;

  let allTR1Dates = Object.keys(monthlyPowerData["TR1"]);
  let allTR2Dates = Object.keys(monthlyPowerData["TR2"]);
  let allGENDates = Object.keys(monthlyPowerData["GEN"]);

  let allDates = _.union(allTR1Dates, allTR2Dates, allGENDates);
  let allGroups = Object.keys(monthlyPowerData);

  for (let date of allDates) {
    let tr1Data = monthlyPowerData["TR1"][date];
    let tr2Data = monthlyPowerData["TR2"][date];
    let genData = monthlyPowerData["GEN"][date];

    //trafo power is stable and simulated - get only first value
    if (!exists(dataToReturn["transformers"].maxValue)) {
      dataToReturn["transformers"].maxValue = trafoPowerLosses;
      dataToReturn["transformers"].maxDate = new Date(parseInt(date));
    }

    dataToReturn["transformers"].data.push({
      value: trafoPowerLosses,
      date: new Date(parseInt(date))
    });

    if (exists(tr1Data) && exists(tr2Data) && exists(genData)) {
      let totalPower =
        tr1Data.value / 1000 +
        tr2Data.value / 1000 +
        genData.value / 1000 +
        trafoPowerLosses;
      let newDate = new Date(parseInt(date));

      dataToReturn["total"].data.push({
        value: totalPower,
        date: newDate
      });

      if (exists(dataToReturn["total"].maxValue)) {
        if (totalPower > dataToReturn["total"].maxValue) {
          dataToReturn["total"].maxValue = totalPower;
          dataToReturn["total"].maxDate = newDate;
        }
      } else {
        dataToReturn["total"].maxValue = totalPower;
        dataToReturn["total"].maxDate = newDate;
      }

      //Calculating rest power
      let restPower = totalPower - trafoPowerLosses;

      for (let group of allGroups) {
        if (
          group !== "total" &&
          group !== "TR1" &&
          group !== "TR2" &&
          group !== "GEN"
        ) {
          if (
            exists(monthlyPowerData[group]) &&
            exists(monthlyPowerData[group][date])
          )
            restPower -= monthlyPowerData[group][date].value / 1000;
        }
      }

      dataToReturn["rest"].data.push({
        value: restPower,
        date: newDate
      });

      if (exists(dataToReturn["rest"].maxValue)) {
        if (restPower > dataToReturn["rest"].maxValue) {
          dataToReturn["rest"].maxValue = restPower;
          dataToReturn["rest"].maxDate = newDate;
        }
      } else {
        dataToReturn["rest"].maxValue = restPower;
        dataToReturn["rest"].maxDate = newDate;
      }
    }
  }

  return dataToReturn;
};

export const FETCH_15_MIN_POWER_REPORT = "FETCH_15_MIN_POWER_REPORT";
export const CHANGE_DAY_POWER_REPORT = "CHANGE_DAY_POWER_REPORT";

export const fetch15MinPowerReportActionCreator = function(year, month) {
  return async function(dispatch, getState) {
    try {
      await dispatch(showBusyDialogActionCreator());

      await dispatch(getPowermonitorDataActionCreator());

      let powermonitorState = getState().powermonitor;
      let trafoLosses = powermonitorState.data.trafoPowerLosses;

      let data = await getPowerMonthly(year, month);

      let normalizedData = normalizeData(data);
      let trafoAndTotalPower = getTotalPowerAndTransformersData(
        data,
        trafoLosses
      );

      let normalizedDataWithTotalAndTrafo = {
        ...normalizedData,
        ...trafoAndTotalPower
      };

      let {
        activePowerLimitAlarm,
        activePowerLimitWarning
      } = powermonitorState.data;

      let transgressions = calculateTransgressions(
        normalizedDataWithTotalAndTrafo["total"].data,
        activePowerLimitWarning,
        activePowerLimitAlarm
      );

      //Also updating data according to response
      await dispatch({
        type: FETCH_15_MIN_POWER_REPORT,
        payload: {
          data: normalizedDataWithTotalAndTrafo,
          year,
          month,
          transgressions,
          trendDay: 1
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

export const changeTrendDay = function(day) {
  return {
    type: CHANGE_DAY_POWER_REPORT,
    payload: {
      trendDay: day
    }
  };
};
