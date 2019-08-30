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
    width: "100%"
  }
});

class InfeedQualityTHDChartComponent extends Component {
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

    return `${label}: ${dateText} - ${value.toFixed(2)} %`;
  };

  generateOptionsForTrend() {
    let { infeedQualityReport, t } = this.props;
    let periodDate = new Date(
      infeedQualityReport.year,
      infeedQualityReport.month,
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
              labelString: t("reportsSupplyQualityInfeedChartYAxisLabel"),
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
      THDCurrentL1: [],
      THDCurrentL2: [],
      THDCurrentL3: [],
      MaxTHDCurrentL1: [],
      MaxTHDCurrentL2: [],
      MaxTHDCurrentL3: []
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
        "THDCurrentL1",
        "average",
        "THDCurrentL1"
      );
      appendDataSetIfVariableExists(
        dayData,
        dayDate,
        "THDCurrentL2",
        "average",
        "THDCurrentL2"
      );
      appendDataSetIfVariableExists(
        dayData,
        dayDate,
        "THDCurrentL3",
        "average",
        "THDCurrentL3"
      );

      appendDataSetIfVariableExists(
        dayData,
        dayDate,
        "THDCurrentL1",
        "max",
        "MaxTHDCurrentL1"
      );
      appendDataSetIfVariableExists(
        dayData,
        dayDate,
        "THDCurrentL2",
        "max",
        "MaxTHDCurrentL2"
      );
      appendDataSetIfVariableExists(
        dayData,
        dayDate,
        "THDCurrentL3",
        "max",
        "MaxTHDCurrentL3"
      );
    }

    let datasets = [
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t("reportsInfeedQualityTHDL1TrendLabelMax"),
        borderWidth: 2,
        data: datasetValues["MaxTHDCurrentL1"],
        borderColor: "#d67065dd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t("reportsInfeedQualityTHDL2TrendLabelMax"),
        borderWidth: 2,
        data: datasetValues["MaxTHDCurrentL2"],
        borderColor: "#f70000dd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t("reportsInfeedQualityTHDL3TrendLabelMax"),
        borderWidth: 2,
        data: datasetValues["MaxTHDCurrentL3"],
        borderColor: "#730909dd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t("reportsInfeedQualityTHDL1TrendLabel"),
        borderWidth: 2,
        data: datasetValues["THDCurrentL1"],
        borderColor: "#0a0880dd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t("reportsInfeedQualityTHDL2TrendLabel"),
        borderWidth: 2,
        data: datasetValues["THDCurrentL2"],
        borderColor: "#7f9be3dd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t("reportsInfeedQualityTHDL3TrendLabel"),
        borderWidth: 2,
        data: datasetValues["THDCurrentL3"],
        borderColor: "#0055ffdd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      }
    ];

    return {
      datasets
    };
  }

  render() {
    let { classes, infeedQualityReport, infeedName } = this.props;
    let trendOptions = this.generateOptionsForTrend();

    if (!exists(infeedQualityReport.data)) return null;
    if (!exists(infeedQualityReport.data[infeedName])) return null;
    if (!exists(infeedQualityReport.data[infeedName].dailyData)) return null;
    let trendData = this.generateDataForTrend(
      infeedQualityReport.data[infeedName].dailyData
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
    infeedQualityReport: state.infeedQualityReport
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(withSnackbar(InfeedQualityTHDChartComponent))
  )
);
