import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Slider } from "@material-ui/core";
import Power15MinElementPowerChartComponent from "./Power15MinElementPowerChartComponent";

import { withSnackbar } from "notistack";
import { changeTrendDay } from "../../../actions/power15MinReportData";

const styles = theme => ({
  paper: {
    padding: theme.spacing(3)
  },
  dataGrid: {},
  chartGridItem: {
    padding: theme.spacing(3)
  }
});

const numberOfDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

class Element15MinPowerComponent extends Component {
  handleSliderChange = value => {
    let { changeTrendDay } = this.props;
    changeTrendDay(value);
  };

  generateMarks = () => {
    let marks = [];

    let { power15MinReport } = this.props;
    let { month, year } = power15MinReport;
    let daysInMonth = numberOfDaysInMonth(month, year);

    for (let i = 1; i <= daysInMonth; i++) {
      marks.push({ value: i, label: i });
    }

    return marks;
  };

  renderSlider = () => {
    let { power15MinReport } = this.props;
    let { month, year, trendDay } = power15MinReport;
    let daysInMonth = numberOfDaysInMonth(month, year);

    return (
      <Slider
        getAriaValueText={this.valuetext}
        aria-labelledby="discrete-slider"
        step={1}
        marks={this.generateMarks()}
        valueLabelDisplay="auto"
        max={daysInMonth}
        min={1}
        valueLabelFormat={x => ``}
        onChangeCommitted={(x, value) => this.handleSliderChange(value)}
        value={trendDay}
      />
    );
  };

  render() {
    let { t, classes } = this.props;

    return (
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            {t("reports15MinPowerReportElementPowerTitle")}
          </Typography>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classes.dataGrid}
          >
            <Grid item className={classes.chartGridItem}>
              <Power15MinElementPowerChartComponent />
            </Grid>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                {t("reports15MinPowerReportElementPowerDayScaleTitle")}
              </Typography>
            </Grid>
            <Grid item>{this.renderSlider()}</Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    power15MinReport: state.power15MinReport
  };
}

const mapDispatchToProps = {
  changeTrendDay: changeTrendDay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(withSnackbar(Element15MinPowerComponent))
  )
);
