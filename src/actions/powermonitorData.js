import {
  getPowermonitorData,
  changePowermonitorSettings
} from "../services/powermonitorService";

import {
  hideBusyDialogActionCreator,
  showBusyDialogActionCreator
} from "./busyDialog";
import { exists } from "../utils/utilities";

import { enqueueSnackbar } from "./snackbar";

export const GET_POWERMONITOR_DATA = "GET_POWERMONITOR_DATA";
export const GET_POWERMONITOR_SETTINGS = "GET_POWERMONITOR_SETTINGS";
export const CHANGE_POWERMONITOR_SETTINGS = "CHANGE_POWERMONITOR_SETTINGS";
export const CHANGE_POWERMONITOR_PAGE = "CHANGE_POWERMONITOR_PAGE";

const powerScaleFactor = 0.001;

let normalizePowermonitorData = data => {
  let dataToReturn = { ...data };

  let currentStepNumber = data.currentStepNumber;
  let trafoPowerLosses = data.trafoPowerLosses;

  let trafoPowerLossesBeforeCurrentStep =
    ((currentStepNumber - 1) * trafoPowerLosses) / 60;

  dataToReturn.currentPeriodStartDateUTC =
    1000 * data.currentPeriodStartDateUTC;

  dataToReturn.currentPeriodStopDateUTC = 1000 * data.currentPeriodStopDateUTC;

  dataToReturn.currentStepStartDateUTC = 1000 * data.currentStepStartDateUTC;

  dataToReturn.currentStepStopDateUTC = 1000 * data.currentStepStopDateUTC;

  dataToReturn.activeEnergyOnBegining =
    powerScaleFactor * data.activeEnergyOnBegining;

  dataToReturn.averageActivePower = powerScaleFactor * data.averageActivePower;

  dataToReturn.predictedActivePower =
    powerScaleFactor * data.predictedActivePower;

  dataToReturn.activePowerLimitWarning =
    powerScaleFactor * data.activePowerLimitWarning;

  dataToReturn.activePowerLimitAlarm =
    powerScaleFactor * data.activePowerLimitAlarm;

  dataToReturn.currentStepActiveEnergyValueAtBegining =
    powerScaleFactor *
    (data.currentStepActiveEnergyValueAtBegining +
      trafoPowerLossesBeforeCurrentStep);

  dataToReturn.trafoPowerLosses = powerScaleFactor * data.trafoPowerLosses;

  let newSteps = {};

  for (let i = 1; i <= 15; i++) {
    let step = dataToReturn.steps[i.toString()];
    let trafoPowerLossesBeforeStep = ((i - 1) * trafoPowerLosses) / 60;

    newSteps[i.toString()] = {
      activeEnergyValue:
        step.activeEnergyValue > 0
          ? powerScaleFactor *
            (step.activeEnergyValue + trafoPowerLossesBeforeStep)
          : 0,
      averageActivePower: powerScaleFactor * step.averageActivePower,
      stepStartDateUTC: step.stepStartDateUTC * 1000,
      stepStopDateUTC: step.stepStopDateUTC * 1000
    };
  }

  dataToReturn.steps = newSteps;

  return dataToReturn;
};

let denormalizePowermonitorSettings = data => {
  let dataToReturn = { ...data };

  if (exists(data.activePowerLimitWarning))
    dataToReturn.activePowerLimitWarning = data.activePowerLimitWarning * 1000;

  if (exists(data.activePowerLimitAlarm))
    dataToReturn.activePowerLimitAlarm = data.activePowerLimitAlarm * 1000;

  if (exists(data.trafoPowerLosses))
    dataToReturn.trafoPowerLosses = data.trafoPowerLosses * 1000;

  return dataToReturn;
};

let getSettingsFromData = data => {
  return {
    activePowerLimitWarning: data.activePowerLimitWarning,
    activePowerLimitAlarm: data.activePowerLimitAlarm,
    active: data.active,
    trafoPowerLosses: data.trafoPowerLosses,
    sendingEventsEnabled: data.sendingEventsEnabled,
    sendingEmailsEnabled: data.sendingEmailsEnabled,
    recipients: data.recipients
  };
};

//Fetch data when initializing component - with showing busy dialog
export const fetchPowermonitorDataActionCreator = function() {
  return async function(dispatch, getState) {
    await dispatch(showBusyDialogActionCreator());
    await dispatch(getPowermonitorDataActionCreator());
    await dispatch(hideBusyDialogActionCreator());
  };
};

//Fetch data in background - without showing busy dialog
export const getPowermonitorDataActionCreator = function() {
  return async function(dispatch, getState) {
    try {
      let data = await getPowermonitorData();

      let normalizedData = normalizePowermonitorData(data);

      await dispatch({
        type: GET_POWERMONITOR_DATA,
        payload: {
          data: normalizedData
        }
      });
    } catch (err) {
      await dispatch(
        enqueueSnackbar({ message: err.message, options: { variant: "error" } })
      );
    }
  };
};

export const changePowermonitorPageActionCreator = function(pageNumber) {
  return {
    type: CHANGE_POWERMONITOR_PAGE,
    payload: {
      pageNumber
    }
  };
};

export const changePowermonitorSettingsActionCreator = function(newData) {
  return async function(dispatch, getState) {
    try {
      await dispatch(showBusyDialogActionCreator());

      let denormalizedNewData = denormalizePowermonitorSettings(newData);

      let data = await changePowermonitorSettings(denormalizedNewData);
      let normalizedData = normalizePowermonitorData(data);
      let settings = getSettingsFromData(normalizedData);

      //Also updating data according to response
      await dispatch({
        type: CHANGE_POWERMONITOR_SETTINGS,
        payload: {
          data: normalizedData,
          settings: settings
        }
      });

      await dispatch(hideBusyDialogActionCreator());
    } catch (err) {
      await dispatch(
        enqueueSnackbar({ message: err.message, options: { variant: "error" } })
      );
    }
  };
};

export const fetchPowermonitorSettingsActionCreator = function(pageNumber) {
  return async function(dispatch, getState) {
    try {
      dispatch(showBusyDialogActionCreator());

      let data = await getPowermonitorData();

      let normalizedData = normalizePowermonitorData(data);

      let settings = getSettingsFromData(normalizedData);

      await dispatch({
        type: GET_POWERMONITOR_SETTINGS,
        payload: {
          settings: settings
        }
      });

      dispatch(hideBusyDialogActionCreator());
    } catch (err) {
      await dispatch(
        enqueueSnackbar({ message: err.message, options: { variant: "error" } })
      );
    }
  };
};
