import { getEnergyMonthly } from "../services/rgPZOService";

import EnergyCalculator from "../classes/EnergyCalculator";

import { getPowermonitorDataActionCreator } from "./powermonitorData";

import {
  hideBusyDialogActionCreator,
  showBusyDialogActionCreator
} from "./busyDialog";

import { enqueueSnackbar } from "./snackbar";

export const FETCH_ENERGY_REPORT = "FETCH_ENERGY_REPORT";

export const fetchEnergyReportActionCreator = function(year, month) {
  return async function(dispatch, getState) {
    try {
      await dispatch(showBusyDialogActionCreator());

      await dispatch(getPowermonitorDataActionCreator());

      let trafoLosses = getState().powermonitor.data.trafoPowerLosses;

      let data = await getEnergyMonthly(year, month);

      let energyCalculator = new EnergyCalculator();

      energyCalculator.init(data, trafoLosses);

      //Also updating data according to response
      await dispatch({
        type: FETCH_ENERGY_REPORT,
        payload: {
          data,
          year,
          month,
          totalConsumption: energyCalculator.getTotalConsumption(),
          consumptionPerDay: energyCalculator.getConsumptionsPerDay()
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
