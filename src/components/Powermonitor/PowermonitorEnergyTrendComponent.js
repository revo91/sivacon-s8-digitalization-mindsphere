import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { exists, roundToSpecifiedPlaces } from "../../utils/utilities";
import { Scatter } from "react-chartjs-2";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    padding: 25,
    height: "100% "
  }
});

class PowermonitorEnergyTrendComponent extends Component {
  generateOptionsForTrend(powermonitorData) {
    let {
      activePowerLimitAlarm,
      activePowerLimitWarning,
      currentPeriodStartDateUTC,
      currentPeriodStopDateUTC,
      predictedActivePower
    } = powermonitorData;

    let biggestPower = Math.max(
      activePowerLimitAlarm,
      activePowerLimitWarning,
      predictedActivePower
    );

    let biggestEnergy = biggestPower / 4;

    let startDate = new Date(currentPeriodStartDateUTC);
    let stopDate = new Date(currentPeriodStopDateUTC);

    let { t } = this.props;

    return {
      maintainAspectRatio: false,
      title: {
        display: false
      },
      legend: {
        display: true
      },
      animation: { duration: 0 },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: t("powermonitorEnergyTrendYAxisLabel"),
              padding: 10,
              fontSize: 18
            },
            ticks: {
              min: 0,
              max: biggestEnergy
            }
          }
        ],
        xAxes: [
          {
            type: "time",
            time: {
              displayFormats: {
                second: "HH:mm:ss"
              },
              min: startDate,
              max: stopDate,
              stepSize: 1
            },
            ticks: {
              autoSkip: true,
              maxRotation: 0,
              minRotation: 0
            }
          }
        ]
      }
    };
  }

  generateLimitEnergyData(powerLimit, periodStartDate, periodStopDate) {
    let limitEnergy = powerLimit / 4;

    return [
      { x: periodStartDate, y: 0 },
      { x: periodStopDate, y: limitEnergy }
    ];
  }

  generateStepsCurrentData(
    periodBeginEnergy,
    periodStartDate,
    steps,
    currentStepNumber
  ) {
    let dataToReturn = [];

    let firstPoint = {
      x: new Date(periodStartDate),
      y: 0
    };

    dataToReturn.push(firstPoint);

    for (let i = 1; i < currentStepNumber; i++) {
      let stepData = steps[i.toString()];
      let nextStepData = steps[(i + 1).toString()];
      //Adding point only if this point and second is not empty
      if (
        nextStepData.activeEnergyValue > 0 &&
        stepData.activeEnergyValue > 0
      ) {
        let stepTime = new Date(stepData.stepStopDateUTC);
        let stepEnergy = nextStepData.activeEnergyValue - periodBeginEnergy;

        dataToReturn.push({
          x: stepTime,
          y: roundToSpecifiedPlaces(stepEnergy, 2)
        });
      }
    }

    return dataToReturn;
  }

  generateStepsPredictedData(periodBeginEnergy, steps, currentStepNumber) {
    let dataToReturn = [];

    let currentStep = steps[currentStepNumber.toString()];
    let currentEnergy = currentStep.activeEnergyValue;
    let currentDate = currentStep.stepStartDateUTC;
    if (currentStepNumber > 1) {
      let stepBefore = steps[(currentStepNumber - 1).toString()];
      let lastStepEnergyDelta =
        currentStep.activeEnergyValue - stepBefore.activeEnergyValue;

      for (let i = currentStepNumber - 1; i <= 15; i++) {
        let stepEnergy =
          currentEnergy -
          periodBeginEnergy +
          (i + 1 - currentStepNumber) * lastStepEnergyDelta;
        let stepTime = new Date(
          currentDate + (i + 1 - currentStepNumber) * 60 * 1000
        );

        dataToReturn.push({
          x: stepTime,
          y: roundToSpecifiedPlaces(stepEnergy, 2)
        });
      }
      return dataToReturn;
    } else {
      return [];
    }
  }

  generateDataForTrend(powermonitorData) {
    let {
      activePowerLimitAlarm,
      activePowerLimitWarning,
      currentPeriodStartDateUTC,
      currentPeriodStopDateUTC,
      activeEnergyOnBegining,
      steps,
      currentStepNumber,
      alarm,
      warning
    } = powermonitorData;

    let { t } = this.props;

    let startDate = new Date(currentPeriodStartDateUTC);
    let stopDate = new Date(currentPeriodStopDateUTC);

    let alarmData = this.generateLimitEnergyData(
      activePowerLimitAlarm,
      startDate,
      stopDate
    );

    let warningData = this.generateLimitEnergyData(
      activePowerLimitWarning,
      startDate,
      stopDate
    );

    let stepsData = this.generateStepsCurrentData(
      activeEnergyOnBegining,
      currentPeriodStartDateUTC,
      steps,
      currentStepNumber
    );

    let predictedSteps = this.generateStepsPredictedData(
      activeEnergyOnBegining,
      steps,
      currentStepNumber
    );

    let predictedBackgroundColor = "rgba(75,192,192,0.2)";
    let predictedBorderColor = "rgba(75,192,192,1)";

    if (warning) {
      predictedBackgroundColor = "rgba(255,150,0,0.2)";
      predictedBorderColor = "rgba(255,150,0,1)";
    }

    if (alarm) {
      predictedBackgroundColor = "rgba(192,50,50,0.15)";
      predictedBorderColor = "rgba(192,50,50,1)";
    }

    return {
      datasets: [
        {
          label: t("powermonitorStepsLabel"),
          fill: true,
          borderColor: "rgba(0,0,0,1)",
          backgroundColor: "rgba(0,0,0,0.15)",
          pointBorderColor: "rgba(0,0,0,1)",
          pointBackgroundColor: "rgba(0,0,0,1)",
          pointHitRadius: 20,
          pointRadius: 3,
          showLine: true,
          borderWidth: 2,
          data: stepsData
        },
        {
          label: t("powermonitorPredictedStepsLabel"),
          fill: true,
          backgroundColor: predictedBackgroundColor,
          borderColor: predictedBorderColor,
          pointHitRadius: 20,
          pointRadius: 0,
          showLine: true,
          borderWidth: 1,
          data: predictedSteps
        },
        {
          label: t("powermonitorAlarmLabel"),
          fill: false,
          borderColor: "rgba(255,0,0,1)",
          backgroundColor: "rgba(255,255,255,0)",
          pointHitRadius: 20,
          pointRadius: 0,
          showLine: true,
          borderDash: [10],
          borderWidth: 3,
          data: alarmData
        },
        {
          label: t("powermonitorWarningLabel"),
          fill: false,
          borderColor: "rgba(255,150,0,1)",
          backgroundColor: "rgba(255,255,255,0)",
          pointHitRadius: 20,
          pointRadius: 0,
          showLine: true,
          borderDash: [10],
          borderWidth: 3,
          data: warningData
        }
      ]
    };
  }

  render() {
    if (
      !exists(this.props.powermonitor) ||
      !exists(this.props.powermonitor.data)
    )
      return null;

    let data = this.props.powermonitor.data;

    const { classes } = this.props;

    let trendOptions = this.generateOptionsForTrend(data);
    let trendData = this.generateDataForTrend(data);

    return (
      <Paper className={classes.root}>
        <Scatter
          className={classes.scatter}
          data={trendData}
          options={trendOptions}
        />
      </Paper>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    powermonitor: state.powermonitor
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(PowermonitorEnergyTrendComponent)));
