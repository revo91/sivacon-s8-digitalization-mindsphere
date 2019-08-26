import { getSupplyQualityMonthly } from "../services/rgPZOService";

import {
  hideBusyDialogActionCreator,
  showBusyDialogActionCreator
} from "./busyDialog";

import { exists } from "../utils/utilities";

import { enqueueSnackbar } from "./snackbar";

export const FETCH_SUPPLY_QUALITY_REPORT = "FETCH_SUPPLY_QUALITY_REPORT";

export const CHANGE_SUPPLY_SELECTION_QUALITY_REPORT =
  "CHANGE_SUPPLY_SELECTION_QUALITY_REPORT";

const calculateCurrentDistortions = qualityReportData => {
  if (!exists(qualityReportData)) return;

  let allElements = Object.keys(qualityReportData);

  let calculateAndAppendObjectCurrentDistortion = valueObject => {
    if (
      exists(valueObject["CurrentL1"]) &&
      exists(valueObject["THDCurrentL1"]) &&
      exists(valueObject["CurrentL1"].average) &&
      exists(valueObject["THDCurrentL1"].average)
    ) {
      valueObject["CurrentDistortionL1"] =
        valueObject["CurrentL1"].average * valueObject["THDCurrentL1"].average;
    }

    if (
      exists(valueObject["CurrentL2"]) &&
      exists(valueObject["THDCurrentL2"]) &&
      exists(valueObject["CurrentL2"].average) &&
      exists(valueObject["THDCurrentL2"].average)
    ) {
      valueObject["CurrentDistortionL2"] =
        valueObject["CurrentL2"].average * valueObject["THDCurrentL2"].average;
    }

    if (
      exists(valueObject["CurrentL3"]) &&
      exists(valueObject["THDCurrentL3"]) &&
      exists(valueObject["CurrentL3"].average) &&
      exists(valueObject["THDCurrentL3"].average)
    ) {
      valueObject["CurrentDistortionL3"] =
        valueObject["CurrentL3"].average * valueObject["THDCurrentL3"].average;
    }
  };

  for (let element of allElements) {
    let dailyData = qualityReportData[element].dailyData;
    let monthlyData = qualityReportData[element].monthlyData;

    if (exists(dailyData)) {
      let allValues = Object.values(dailyData);

      for (let valueObject of allValues) {
        calculateAndAppendObjectCurrentDistortion(valueObject);
      }
    }

    if (exists(monthlyData)) {
      calculateAndAppendObjectCurrentDistortion(monthlyData);
    }
  }
};

export const fetchSupplyQualityReportActionCreator = function(year, month) {
  return async function(dispatch, getState) {
    try {
      await dispatch(showBusyDialogActionCreator());

      let data = await getSupplyQualityMonthly(year, month);

      calculateCurrentDistortions(data);

      //Also updating data according to response
      await dispatch({
        type: FETCH_SUPPLY_QUALITY_REPORT,
        payload: {
          data,
          year,
          month,
          selectedSupply: "TR1"
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

export const changeSupplySelectionActionCreator = function(newSelection) {
  return {
    type: CHANGE_SUPPLY_SELECTION_QUALITY_REPORT,
    payload: {
      selectedSupply: newSelection
    }
  };
};
