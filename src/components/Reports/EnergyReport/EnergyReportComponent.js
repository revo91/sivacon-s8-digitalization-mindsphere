import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";
import GroupConsumptionComponent from "./GroupConsumptionComponent";
import DailyConsumptionComponent from "./DailyConsumptionComponent";
import PowerFactorDailyConsumptionComponent from "./PowerFactorDailyConsumptionComponent";
import ReactiveEnergyImportDailyConsumptionComponent from "./ReactiveEnergyImportDailyConsumptionComponent";
import ReactiveEnergyExportDailyConsumptionComponent from "./ReactiveEnergyExportDailyConsumptionComponent";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { DatePicker } from "@material-ui/pickers";
import { fetchEnergyReportActionCreator } from "../../../actions/energyReportData";
import { exists, existsAndIsNotEmpty } from "../../../utils/utilities";
import moment from "moment";

const styles = theme => ({
  appBar: {
    padding: theme.spacing(2),
    width: "100%",
    backgroundColor: "#f5f5f5"
  }
});

class EnergyReportComponent extends Component {
  componentDidMount = () => {
    let now = new Date(Date.now());
    this.props.fetchEnergyReport(now.getFullYear(), now.getMonth());
  };

  handleDateChange = date => {
    let { fetchEnergyReport } = this.props;

    if (exists(date))
      fetchEnergyReport(date.toDate().getFullYear(), date.toDate().getMonth());
  };

  renderNavBar = () => {
    let { t, classes, selectedDate } = this.props;

    let now = new Date(Date.now());
    return (
      <Paper className={classes.appBar} color="default">
        <DatePicker
          views={["year", "month"]}
          label={t("reportsEnergyReportDateTimePickerTitle")}
          minDate={new Date("2019-01-01")}
          maxDate={new Date(now.getFullYear(), now.getMonth() + 1)}
          value={selectedDate}
          onChange={date => this.handleDateChange(date)}
          animateYearScrolling
        />
      </Paper>
    );
  };

  renderReport = () => {
    let { energyReport } = this.props;
    if (
      !existsAndIsNotEmpty(energyReport.data) ||
      !existsAndIsNotEmpty(energyReport.totalConsumption) ||
      !existsAndIsNotEmpty(energyReport.consumptionPerDay)
    )
      return null;

    return (
      <React.Fragment>
        <Grid item>
          <GroupConsumptionComponent />
        </Grid>
        <Grid item>
          <PowerFactorDailyConsumptionComponent />
        </Grid>
        <Grid item>
          <DailyConsumptionComponent />
        </Grid>
        <Grid item>
          <ReactiveEnergyImportDailyConsumptionComponent />
        </Grid>
        <Grid item>
          <ReactiveEnergyExportDailyConsumptionComponent />
        </Grid>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Grid item>{this.renderNavBar()}</Grid>
        {this.renderReport()}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  let selectedDate = null;

  if (exists(state.energyReport.year) && exists(state.energyReport.month))
    selectedDate = new Date(state.energyReport.year, state.energyReport.month);
  return {
    energyReport: state.energyReport,
    selectedDate: selectedDate
  };
}

const mapDispatchToProps = {
  fetchEnergyReport: fetchEnergyReportActionCreator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(withSnackbar(EnergyReportComponent))));
