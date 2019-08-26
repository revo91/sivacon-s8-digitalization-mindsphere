import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { fetchPowermonitorPowerMonthDataActionCreator } from "../../actions/powermonitorActivePowerData";
import { Bar } from "react-chartjs-2";
import { exists } from "../../utils/utilities";

const styles = theme => ({
  root: {
    height: "100% "
  }
});

class Powermonitor15MinComponent extends Component {
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

  calculatePowermonitorDataMaxValue = powermonitorPowerData => {
    return Math.max(...powermonitorPowerData.map(point => point.value));
  };

  generateOptionsForTrend(powermonitorData, powermonitorPowerData) {
    let {
      activePowerLimitAlarm,
      activePowerLimitWarning
    } = powermonitorData.data;

    let maxActivePower = this.calculatePowermonitorDataMaxValue(
      powermonitorPowerData.data
    );

    let biggestPower = Math.max(
      activePowerLimitAlarm,
      activePowerLimitWarning,
      maxActivePower
    );

    let startDate = new Date(powermonitorPowerData.startPeriod);
    let stopDate = new Date(powermonitorPowerData.endPeriod);

    let { t } = this.props;

    return {
      maintainAspectRatio: false,
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

  generateAllActivePowerPoints = (
    powermonitorData,
    powermonitorActivePowerData
  ) => {
    let pointsToReturn = [];

    for (let i = 0; i < powermonitorActivePowerData.data.length; i++) {
      let point = powermonitorActivePowerData.data[i];

      pointsToReturn.push({ x: new Date(point.date), y: point.value });
    }

    return pointsToReturn;
  };

  generateAllActivePowerPointsColors = (
    powermonitorData,
    powermonitorActivePowerData
  ) => {
    let {
      activePowerLimitAlarm,
      activePowerLimitWarning
    } = powermonitorData.data;

    let validColor = "#055f8788";
    let alertColor = "rgba(255, 0, 0, 1)";
    let warningColor = "rgba(255, 150, 0, 1)";

    let colorsToReturn = [];

    for (let i = 0; i < powermonitorActivePowerData.data.length; i++) {
      let point = powermonitorActivePowerData.data[i];

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

  generateLimitAlarmPoints = (
    powermonitorData,
    powermonitorActivePowerData
  ) => {
    let { activePowerLimitAlarm } = powermonitorData.data;

    let startDate = new Date(powermonitorActivePowerData.startPeriod);
    let stopDate = new Date(powermonitorActivePowerData.endPeriod);

    return [
      { x: startDate, y: activePowerLimitAlarm },
      { x: stopDate, y: activePowerLimitAlarm }
    ];
  };

  generateLimitWarningPoints = (
    powermonitorData,
    powermonitorActivePowerData
  ) => {
    let { activePowerLimitWarning } = powermonitorData.data;

    let startDate = new Date(powermonitorActivePowerData.startPeriod);
    let stopDate = new Date(powermonitorActivePowerData.endPeriod);

    return [
      { x: startDate, y: activePowerLimitWarning },
      { x: stopDate, y: activePowerLimitWarning }
    ];
  };

  generateDataForTrend(powermonitorData, powermonitorActivePowerData) {
    let { t } = this.props;

    let allPoints = this.generateAllActivePowerPoints(
      powermonitorData,
      powermonitorActivePowerData
    );

    let pointColors = this.generateAllActivePowerPointsColors(
      powermonitorData,
      powermonitorActivePowerData
    );

    let alertLimitPoints = this.generateLimitAlarmPoints(
      powermonitorData,
      powermonitorActivePowerData
    );

    let warningLimitPoints = this.generateLimitWarningPoints(
      powermonitorData,
      powermonitorActivePowerData
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

  componentDidMount = async () => {
    try {
      let now = new Date(Date.now());

      await this.props.fetchPowermonitorPowerMonth(
        now.getFullYear(),
        now.getMonth()
      );
    } catch (err) {
      console.log(err.message, err);
    }
  };

  render() {
    let { classes } = this.props;
    if (
      !exists(this.props.powermonitor) ||
      !exists(this.props.powermonitor.data) ||
      !exists(this.props.powermonitorActivePower) ||
      !exists(this.props.powermonitorActivePower.data) ||
      !exists(this.props.powermonitorActivePower.startPeriod) ||
      !exists(this.props.powermonitorActivePower.endPeriod)
    )
      return null;

    let powermonitorData = this.props.powermonitor;
    let powermonitorActivePowerData = this.props.powermonitorActivePower;

    let trendOptions = this.generateOptionsForTrend(
      powermonitorData,
      powermonitorActivePowerData
    );

    let trendData = this.generateDataForTrend(
      powermonitorData,
      powermonitorActivePowerData
    );

    return (
      <Bar className={classes.root} data={trendData} options={trendOptions} />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    powermonitor: state.powermonitor,
    powermonitorActivePower: state.powermonitorPowerDataReducer
  };
}

const mapDispatchToProps = {
  fetchPowermonitorPowerMonth: fetchPowermonitorPowerMonthDataActionCreator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Powermonitor15MinComponent)));
