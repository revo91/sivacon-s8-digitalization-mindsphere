import { combineReducers } from "redux";
import { drawerReducer } from "./drawerReducer";
import { chartReducer } from "./chartReducer";
import { eventsReducer } from "./eventsReducer";
import { switchesStateReducer } from "./switchesStateReducer";
import { dialogReducer } from "./dialogReducer";
import { languageDialogReducer } from "./languageDialogReducer";
import { powermonitorDataReducer } from "./powermonitorReducer";
import { busyDialogReducer } from "./busyDialogReducer";
import { newRecipientDialogReducer } from "./newRecipientDialogReducer";
import { powermonitorPowerDataReducer } from "./powermonitorActivePowerReducer";
import { energyDataReducer } from "./energyReportReducer";
import { reportDataReducer } from "./reportReducer";
import { power15MinReportReducer } from "./power15MinReportReducer";
import { supplyQualityReducer } from "./supplyQualityReportReducer";
import { infeedQualityReducer } from "./infeedQualityReportReducer";
import { reducer } from "redux-form";
import snackbarReducer from "./snackbarReducer";

export default combineReducers({
  drawerReducer,
  chartReducer,
  switchesStateReducer,
  dialogReducer,
  languageDialogReducer,
  eventsReducer,
  powermonitor: powermonitorDataReducer,
  busyDialog: busyDialogReducer,
  newRecipientDialog: newRecipientDialogReducer,
  form: reducer,
  powermonitorPowerDataReducer: powermonitorPowerDataReducer,
  energyReport: energyDataReducer,
  snackbar: snackbarReducer,
  reports: reportDataReducer,
  power15MinReport: power15MinReportReducer,
  supplyQualityReport: supplyQualityReducer,
  infeedQualityReport: infeedQualityReducer
});
