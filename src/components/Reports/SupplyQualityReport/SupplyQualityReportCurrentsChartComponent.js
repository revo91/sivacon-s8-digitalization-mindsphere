import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import { withSnackbar } from "notistack";

import { Scatter } from "react-chartjs-2";
import { exists } from "../../../utils/utilities";

const styles = theme => ({
  chart: {
    width: "100%",
    minHeigth: 500
  }
});

class SupplyQualityCurrentsChartComponent extends Component {
  renderTooltipLabel = (tooltipItem, data) => {
    if (!exists(tooltipItem.datasetIndex)) return "";
    if (!exists(tooltipItem.index)) return "";
    if (!exists(data.datasets[tooltipItem.datasetIndex])) return "";
    if (
      !exists(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])
    )
      return "";

    let label = exists(data.datasets[tooltipItem.datasetIndex].label)
      ? data.datasets[tooltipItem.datasetIndex].label
      : "";
    let dataset = data.datasets[tooltipItem.datasetIndex];
    let value = dataset.data[tooltipItem.index].y;
    let dateText = moment(dataset.data[tooltipItem.index].x).format(
      "YYYY-MM-DD"
    );

    return `${label}: ${dateText} - ${value.toFixed(2)} A`;
  };

  generateOptionsForTrend() {
    let { supplyQualityReport, t } = this.props;
    let periodDate = new Date(
      supplyQualityReport.year,
      supplyQualityReport.month,
      1
    );

    let startDate = moment(periodDate)
      .startOf("month")
      .toDate();
    let stopDate = moment(startDate)
      .add(1, "month")
      .toDate();

    return {
      maintainAspectRatio: true,
      aspectRatio: 4,
      title: {
        display: false
      },
      legend: {
        display: true,
        position: "top"
      },

      tooltips: {
        callbacks: {
          label: this.renderTooltipLabel
        }
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: t("reportsSupplyQualityCurrentChartYAxisLabel"),
              padding: 10,
              fontSize: 18
            }
          }
        ],
        xAxes: [
          {
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
            }
          }
        ]
      }
    };
  }

  generateDataForTrend(supplyDailyData) {
    let { t } = this.props;
    let datasetValues = {
      MaxCurrentL1: [],
      MaxCurrentL2: [],
      MaxCurrentL3: [],
      AvgCurrentL1: [],
      AvgCurrentL2: [],
      AvgCurrentL3: []
    };

    let allDays = Object.keys(supplyDailyData);

    let appendDataSetIfVariableExists = (
      dayData,
      dayDate,
      variableName,
      propertyName,
      variableNameInDatasets
    ) => {
      if (
        exists(dayData[variableName]) &&
        exists(dayData[variableName][propertyName])
      ) {
        datasetValues[variableNameInDatasets].push({
          x: dayDate,
          y: dayData[variableName][propertyName]
        });
      }
    };

    for (let day of allDays) {
      let dayData = supplyDailyData[day];
      let dayDate = new Date(parseInt(day));

      appendDataSetIfVariableExists(
        dayData,
        dayDate,
        "CurrentL1",
        "average",
        "AvgCurrentL1"
      );
      appendDataSetIfVariableExists(
        dayData,
        dayDate,
        "CurrentL2",
        "average",
        "AvgCurrentL2"
      );
      appendDataSetIfVariableExists(
        dayData,
        dayDate,
        "CurrentL3",
        "average",
        "AvgCurrentL3"
      );
      appendDataSetIfVariableExists(
        dayData,
        dayDate,
        "CurrentL1",
        "max",
        "MaxCurrentL1"
      );
      appendDataSetIfVariableExists(
        dayData,
        dayDate,
        "CurrentL2",
        "max",
        "MaxCurrentL2"
      );
      appendDataSetIfVariableExists(
        dayData,
        dayDate,
        "CurrentL3",
        "max",
        "MaxCurrentL3"
      );
    }

    let datasets = [
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t("reportsSupplyQualityCurrentChartTHDCurrentL1MaxLabel"),
        borderWidth: 2,
        data: datasetValues["MaxCurrentL1"],
        borderColor: "#d67065dd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t("reportsSupplyQualityCurrentChartTHDCurrentL2MaxLabel"),
        borderWidth: 2,
        data: datasetValues["MaxCurrentL2"],
        borderColor: "#f70000dd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t("reportsSupplyQualityCurrentChartTHDCurrentL3MaxLabel"),
        borderWidth: 2,
        data: datasetValues["MaxCurrentL3"],
        borderColor: "#730909dd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t("reportsSupplyQualityCurrentChartTHDCurrentL1AvgLabel"),
        borderWidth: 2,
        data: datasetValues["AvgCurrentL1"],
        borderColor: "#0a0880dd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t("reportsSupplyQualityCurrentChartTHDCurrentL2AvgLabel"),
        borderWidth: 2,
        data: datasetValues["AvgCurrentL2"],
        borderColor: "#7f9be3dd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t("reportsSupplyQualityCurrentChartTHDCurrentL3AvgLabel"),
        borderWidth: 2,
        data: datasetValues["AvgCurrentL3"],
        borderColor: "#0055ffdd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      }
    ];

    return {
      datasets
    };
  }

  render() {
    let { classes, supplyQualityReport, supplyName } = this.props;
    let trendOptions = this.generateOptionsForTrend();

    if (!exists(supplyQualityReport.data)) return null;
    if (!exists(supplyQualityReport.data[supplyName])) return null;
    if (!exists(supplyQualityReport.data[supplyName].dailyData)) return null;
    let trendData = this.generateDataForTrend(
      supplyQualityReport.data[supplyName].dailyData
    );
    return (
      <Scatter
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
    supplyQualityReport: state.supplyQualityReport
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(withSnackbar(SupplyQualityCurrentsChartComponent))
  )
);
