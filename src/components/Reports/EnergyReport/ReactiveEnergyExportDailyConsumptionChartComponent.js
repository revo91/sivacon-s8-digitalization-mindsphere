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

let groupColors = {
  building01: "#ff6384dd",
  building1: "#36a2ebdd",
  building2: "#4dc240dd",
  building3: "#f7df43dd",
  parking: "#8656ffdd",
  transformers: "#ff2b2bdd",
  rest: "#f59300dd"
};

class DailyConsumptionChartComponent extends Component {
  generateOptionsForTrend() {
    let { energyReport } = this.props;
    let periodDate = new Date(energyReport.year, energyReport.month, 1);

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
          title: function(tooltipItems, data) {
            let tooltipItem = tooltipItems[0];
            if (!tooltipItem) return "";
            var dataSet =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

            if (dataSet) {
              return moment(dataSet.x).format("L");
            } else {
              return "";
            }
          },
          label: function(tooltipItem, data) {
            var dataSet =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            var label = data.datasets[tooltipItem.datasetIndex].label + ": ";

            if (dataSet) {
              label += dataSet.y.toFixed(2) + " kvarh";
            }

            return label;
          }
        }
      },
      scales: {
        yAxes: [
          {
            stacked: true
          }
        ],
        xAxes: [
          {
            stacked: true,
            categoryPercentage: 0.9,
            barPercentage: 0.9,
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

  generateDataForTrend(consumptionPerDay) {
    let { t } = this.props;
    let datasetValues = [];

    let allDays = Object.keys(consumptionPerDay);

    for (let day of allDays) {
      let dayData = consumptionPerDay[day];
      let dayDate = new Date(parseInt(day));

      let allGroups = Object.keys(dayData);

      for (let group of allGroups) {
        if (group !== "total" && group !== "rest" && group !== "transformers") {
          if (!exists(datasetValues[group])) datasetValues[group] = [];

          datasetValues[group].push({
            x: dayDate,
            y: dayData[group].reactiveEnergyExport / 1000
          });
        }
      }
    }

    let allGroups = Object.keys(datasetValues);
    let datasets = [];

    for (let i = 0; i < allGroups.length; i++) {
      let group = allGroups[i];
      let data = datasetValues[group];
      let color = groupColors[group];
      let dataSet = {
        type: "bar",
        label: t(`reportsEnergyReportGroupName_${group}`),
        borderWidth: 1,
        data: data,
        borderColor: "rgba(0, 0, 0, 0.1)",
        backgroundColor: color
      };

      datasets.push(dataSet);
    }

    return {
      datasets
    };
  }

  render() {
    let { classes, energyReport } = this.props;
    let trendOptions = this.generateOptionsForTrend();
    let trendData = this.generateDataForTrend(energyReport.consumptionPerDay);
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
    energyReport: state.energyReport
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(withSnackbar(DailyConsumptionChartComponent))
  )
);
