import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import { withSnackbar } from "notistack";

import { Bar } from "react-chartjs-2";
import { exists } from "../../../utils/utilities";

const styles = theme => ({
  chart: {
    width: "100%"
  }
});

class Power15MinTotalPowerChartComponent extends Component {
  generateOptionsForTrend() {
    let { power15MinReport, powermonitor, t } = this.props;

    let periodDate = new Date(power15MinReport.year, power15MinReport.month, 1);

    let startDate = moment(periodDate)
      .startOf("month")
      .toDate();
    let stopDate = moment(startDate)
      .add(1, "month")
      .toDate();

    let { activePowerLimitAlarm, activePowerLimitWarning } = powermonitor.data;

    let biggestPower = Math.max(
      activePowerLimitAlarm,
      activePowerLimitWarning,
      power15MinReport.data["total"].maxValue
    );

    return {
      maintainAspectRatio: true,
      aspectRatio: 4,
      title: {
        display: false
      },
      legend: {
        display: false
      },
      animation: { duration: 0 },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: t("powermonitorPower15TrendYAxis"),
              padding: 10,
              fontSize: 18
            },
            ticks: {
              min: 0,
              max: biggestPower * 1.2
            }
          }
        ],
        xAxes: [
          {
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            type: "time",
            time: {
              min: startDate,
              max: stopDate,
              displayFormats: {
                millisecond: "YYYY-MM-DD",
                second: "YYYY-MM-DD",
                minute: "YYYY-MM-DD",
                hour: "YYYY-MM-DD",
                day: "YYYY-MM-DD",
                week: "YYYY-MM-DD",
                month: "YYYY-MM-DD",
                quarter: "YYYY-MM-DD",
                year: "YYYY-MM-DD"
              }
            },
            ticks: {
              autoSkip: true,
              maxRotation: 0,
              minRotation: 0
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: this.renderTooltipLabel
        }
      }
    };
  }

  renderTooltipLabel = (tooltipItem, data) => {
    if (!exists(tooltipItem.datasetIndex)) return "";
    if (!exists(tooltipItem.index)) return "";
    if (!exists(data.datasets[tooltipItem.datasetIndex])) return "";
    if (
      !exists(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])
    )
      return "";

    let dataset = data.datasets[tooltipItem.datasetIndex];
    let value = dataset.data[tooltipItem.index].y;

    return `${value.toFixed(2)} kW`;
  };

  generateAllActivePowerPoints = power15MinReportData => {
    let pointsToReturn = [];

    for (let i = 0; i < power15MinReportData.data["total"].data.length; i++) {
      let point = power15MinReportData.data["total"].data[i];
      pointsToReturn.push({ x: point.date, y: point.value });
    }

    return pointsToReturn;
  };

  generateAllActivePowerPointsColors = (powermonitor, power15MinReportData) => {
    let { activePowerLimitAlarm, activePowerLimitWarning } = powermonitor.data;

    let validColor = "#055f8788";
    let alertColor = "rgba(255, 0, 0, 1)";
    let warningColor = "rgba(255, 150, 0, 1)";

    let colorsToReturn = [];

    for (let i = 0; i < power15MinReportData.data["total"].data.length; i++) {
      let point = power15MinReportData.data["total"].data[i];

      if (point.value >= activePowerLimitAlarm) {
        colorsToReturn.push(alertColor);
      } else if (point.value >= activePowerLimitWarning) {
        colorsToReturn.push(warningColor);
      } else {
        colorsToReturn.push(validColor);
      }
    }

    return colorsToReturn;
  };

  generateLimitAlarmPoints = (powermonitor, power15MinReport) => {
    let periodDate = new Date(power15MinReport.year, power15MinReport.month, 1);

    let startDate = moment(periodDate)
      .startOf("month")
      .toDate();
    let stopDate = moment(startDate)
      .add(1, "month")
      .toDate();

    let { activePowerLimitAlarm } = powermonitor.data;

    return [
      { x: startDate, y: activePowerLimitAlarm },
      { x: stopDate, y: activePowerLimitAlarm }
    ];
  };

  generateLimitWarningPoints = (powermonitor, power15MinReport) => {
    let periodDate = new Date(power15MinReport.year, power15MinReport.month, 1);

    let startDate = moment(periodDate)
      .startOf("month")
      .toDate();
    let stopDate = moment(startDate)
      .add(1, "month")
      .toDate();

    let { activePowerLimitWarning } = powermonitor.data;

    return [
      { x: startDate, y: activePowerLimitWarning },
      { x: stopDate, y: activePowerLimitWarning }
    ];
  };

  generateDataForTrend(powermonitor, power15MinReport) {
    let { t } = this.props;

    let allPoints = this.generateAllActivePowerPoints(power15MinReport);

    let pointColors = this.generateAllActivePowerPointsColors(
      powermonitor,
      power15MinReport
    );

    let alertLimitPoints = this.generateLimitAlarmPoints(
      powermonitor,
      power15MinReport
    );

    let warningLimitPoints = this.generateLimitWarningPoints(
      powermonitor,
      power15MinReport
    );

    return {
      datasets: [
        {
          type: "bar",
          label: t("powermonitorPower15ValidPointsLabel"),
          borderWidth: 1,
          borderColor: pointColors,
          data: allPoints,
          backgroundColor: pointColors
        },
        {
          type: "line",
          label: t("powermonitorPower15AlarmLineLabel"),
          fill: false,
          borderColor: "rgba(255,0,0,1)",
          backgroundColor: "rgba(255,255,255,0)",
          pointHitRadius: 0,
          pointRadius: 0,
          showLine: true,
          borderDash: [10],
          borderWidth: 3,
          data: alertLimitPoints
        },
        {
          type: "line",
          label: t("powermonitorPower15WarningLineLabel"),
          fill: false,
          borderColor: "rgba(255,150,0,1)",
          backgroundColor: "rgba(255,255,255,0)",
          pointHitRadius: 0,
          pointRadius: 0,
          showLine: true,
          borderDash: [10],
          borderWidth: 3,
          data: warningLimitPoints
        }
      ]
    };
  }

  render() {
    let { classes, power15MinReport, powermonitor } = this.props;

    let trendOptions = this.generateOptionsForTrend();
    let trendData = this.generateDataForTrend(powermonitor, power15MinReport);
    return (
      <Bar
        className={classes.chart}
        options={trendOptions}
        data={trendData}
        height={null}
        width={null}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    power15MinReport: state.power15MinReport,
    powermonitor: state.powermonitor
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(withSnackbar(Power15MinTotalPowerChartComponent))
  )
);
