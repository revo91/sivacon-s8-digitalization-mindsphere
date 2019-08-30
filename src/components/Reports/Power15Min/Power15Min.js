import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { DatePicker } from "@material-ui/pickers";
import { fetch15MinPowerReportActionCreator } from "../../../actions/power15MinReportData";
import { exists, existsAndIsNotEmpty } from "../../../utils/utilities";
import Power15MinTotalPowerComponent from "./Power15MinTotalPowerComponent";
import Power15MinTransgressionsComponent from "./Power15MinTransgressionsComponent";
import Element15MinPowerComponent from "./Power15MinElementPowerComponent";

const styles = theme => ({
  appBar: {
    padding: theme.spacing(2),
    width: "100%",
    backgroundColor: "#f5f5f5"
  },
  navBarGridItem: {}
});

class Power15MinComponent extends Component {
  componentDidMount = async () => {
    let now = new Date(Date.now());
    this.props.fetchPower15MinReport(now.getFullYear(), now.getMonth());
  };

  handleDateChange = date => {
    let { fetchPower15MinReport } = this.props;

    if (exists(date))
      fetchPower15MinReport(
        date.toDate().getFullYear(),
        date.toDate().getMonth()
      );
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
    let { power15MinReport } = this.props;

    if (!existsAndIsNotEmpty(power15MinReport.data)) return null;

    return (
      <React.Fragment>
        <Grid item>
          <Power15MinTotalPowerComponent />
        </Grid>
        <Grid item>
          <Power15MinTransgressionsComponent />
        </Grid>
        <Grid item>
          <Element15MinPowerComponent />
        </Grid>
      </React.Fragment>
    );
  };

  render() {
    let { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item className={classes.navBarGridItem}>
          {this.renderNavBar()}
        </Grid>
        {this.renderReport()}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  let selectedDate = null;

  if (
    exists(state.power15MinReport.year) &&
    exists(state.power15MinReport.month)
  )
    selectedDate = new Date(
      state.power15MinReport.year,
      state.power15MinReport.month
    );
  return {
    power15MinReport: state.power15MinReport,
    selectedDate: selectedDate
  };
}

const mapDispatchToProps = {
  fetchPower15MinReport: fetch15MinPowerReportActionCreator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(withSnackbar(Power15MinComponent))));
