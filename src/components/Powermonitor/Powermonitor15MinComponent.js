import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { fetchPowermonitorPowerMonthDataActionCreator } from "../../actions/powermonitorActivePowerData";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Powermonitor15MinTrend from "./Powermonitor15MinTrendComponent";
import Powermonitor15MinTable from "./Powermonitor15MinTableComponent";
import { exists } from "../../utils/utilities";
import moment from "moment";
import AppBar from "@material-ui/core/AppBar";
import { DatePicker } from "@material-ui/pickers";

const styles = theme => ({
  root: {},
  appBar: {
    padding: theme.spacing(2),
    width: "100%",
    backgroundColor: "#f5f5f5"
  },
  trendGrid: {
    padding: theme.spacing(3)
  },
  tableGrid: {
    padding: theme.spacing(3)
  }
});

class Powermonitor15MinComponent extends Component {
  componentDidMount = async () => {
    //TODO
  };

  handleDateChange = date => {
    let { fetchPowermonitorPowerMonth } = this.props;

    if (exists(date))
      fetchPowermonitorPowerMonth(
        date.toDate().getFullYear(),
        date.toDate().getMonth()
      );
  };

  renderNavBar = () => {
    let { t, classes, selectedDate } = this.props;

    let now = new Date(Date.now());

    return (
      <Paper className={classes.appBar}>
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

  renderMaximumLabel = (t, classes, powermonitorActivePower) => {
    let maximumText = exists(powermonitorActivePower.maxValue)
      ? `${moment(new Date(powermonitorActivePower.maxTime)).format(
          "YYYY-MM-DD HH:mm"
        )} - ${powermonitorActivePower.maxValue.toFixed(2)} kW`
      : "";

    return (
      <Typography gutterBottom>
        {`${t("powermonitorPower15MaxValueLabel")} : ${maximumText}`}
      </Typography>
    );
  };

  render() {
    let { t, classes, powermonitorActivePower } = this.props;

    return (
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        className={classes.root}
        spacing={3}
      >
        <Grid item style={{ width: "100%" }}>
          {this.renderNavBar()}
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={12} lg={7}>
            <Paper>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="stretch"
                wrap="nowrap"
                className={classes.trendGrid}
                style={{ height: "100%" }}
              >
                <Grid item>
                  <Typography variant="h5" gutterBottom>
                    {t("powermonitorPower15TrendTitle")}
                  </Typography>
                </Grid>
                <Grid item style={{ minHeight: 475 }}>
                  <Powermonitor15MinTrend />
                </Grid>
                <Grid item style={{ paddingTop: 25 }}>
                  {this.renderMaximumLabel(t, classes, powermonitorActivePower)}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={5}>
            <Paper style={{ minHeight: 500 }}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                wrap="nowrap"
                className={classes.tableGrid}
                style={{ height: "100%" }}
              >
                <Grid item>
                  <Typography variant="h5" gutterBottom>
                    {t("powermonitorPower15TableTitle")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Powermonitor15MinTable />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    powermonitor: state.powermonitor,
    powermonitorActivePower: state.powermonitorPowerDataReducer,
    selectedDate: state.powermonitorPowerDataReducer.startPeriod
      ? new Date(state.powermonitorPowerDataReducer.startPeriod)
      : null
  };
}

const mapDispatchToProps = {
  fetchPowermonitorPowerMonth: fetchPowermonitorPowerMonthDataActionCreator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Powermonitor15MinComponent)));
