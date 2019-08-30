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

let groupColors = {
  "1F1": "#05b4ffdd",

  "1F2": "#d67065dd",

  "1F3": "#f70000dd",

  "1F4": "#730909dd",

  "1F5": "#0a0880dd",

  "1F6": "#7f9be3dd",

  "1F7": "#0055ffdd",

  "3F1": "#3c2a5edd",

  "3F2": "#8a2deddd",
  "1FP1": "#550470dd",
  "1FP2": "#421c42dd",

  "2F1": "#05b4ffdd",

  "2F2": "#d67065dd",

  "2F3": "#f70000dd",

  "2F4": "#730909dd",

  "2F5": "#0a0880dd",

  "2F6": "#7f9be3dd",

  "2FP1": "#0055ffdd",
  "2FP2": "#421c42dd"
};

class SupplyQualityInfeedTHDChartComponent extends Component {
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

  generateDataForTrend(reportData, infeeds, phaseNumber) {
    let { t, supplyName } = this.props;
    let datasets = {};
    let allGroups = infeeds;

    for (let group of allGroups) {
      if (exists(reportData[group])) {
        let groupColor = groupColors[group];

        datasets[group] = {
          type: "line",
          showLine: true,
          fill: false,
          label: t(`reports15MinPowerReportElement_${group}`),
          borderWidth: 2,
          data: [],
          borderColor: groupColor,
          backgroundColor: "rgba(0, 0, 0, 0)"
        };

        let data = reportData[group];

        let dailyData = data.dailyData;

        if (exists(dailyData)) {
          let allDays = Object.keys(dailyData);

          for (let day of allDays) {
            let dayData = dailyData[day];
            let dayDate = new Date(parseInt(day));
            if (
              exists(reportData[supplyName]) &&
              exists(reportData[supplyName].dailyData) &&
              exists(reportData[supplyName].dailyData[day]) &&
              exists(
                reportData[supplyName].dailyData[day][`Current${phaseNumber}`]
              ) &&
              reportData[supplyName].dailyData[day][`Current${phaseNumber}`]
                .average > 0
            ) {
              let supplyAverageCurrent =
                reportData[supplyName].dailyData[day][`Current${phaseNumber}`]
                  .average;

              if (exists(dayData[`CurrentDistortion${phaseNumber}`])) {
                datasets[group].data.push({
                  x: new Date(dayDate),
                  y:
                    dayData[`CurrentDistortion${phaseNumber}`] /
                    supplyAverageCurrent
                });
              }
            }
          }
        }
      }
    }

    return {
      datasets: Object.values(datasets)
    };
  }

  render() {
    let {
      classes,
      supplyQualityReport,
      supplyName,
      phaseNumber,
      infeeds
    } = this.props;
    let trendOptions = this.generateOptionsForTrend();

    if (!exists(supplyQualityReport.data)) return null;
    if (!exists(supplyQualityReport.data[supplyName])) return null;
    if (!exists(supplyQualityReport.data[supplyName].dailyData)) return null;
    let trendData = this.generateDataForTrend(
      supplyQualityReport.data,
      infeeds,
      phaseNumber
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
    withTranslation()(withSnackbar(SupplyQualityInfeedTHDChartComponent))
  )
);
