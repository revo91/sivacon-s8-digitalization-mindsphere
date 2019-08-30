import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import { withSnackbar } from "notistack";

import { Scatter } from "react-chartjs-2";

const styles = theme => ({
  chart: {
    width: "100%"
  }
});

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
      scales: {
        yAxes: [{}],
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

  generateDataForTrend(consumptionPerDay) {
    let { t } = this.props;
    let datasetValues = {
      powerFactorImport: [],
      powerFactorExport: []
    };

    let allDays = Object.keys(consumptionPerDay);

    for (let day of allDays) {
      let dayData = consumptionPerDay[day];
      let dayDate = new Date(parseInt(day));

      datasetValues["powerFactorImport"].push({
        x: dayDate,
        y: dayData["total"].powerFactorImport
      });
      datasetValues["powerFactorExport"].push({
        x: dayDate,
        y: dayData["total"].powerFactorExport
      });
    }

    let datasets = [
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t(
          `reportsPowerFactorImportEnergyReportDailyConsumptionTrendLabel`
        ),
        borderWidth: 2,
        data: datasetValues["powerFactorImport"],
        borderColor: "#f70000dd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      {
        type: "line",
        showLine: true,
        fill: false,
        label: t(
          `reportsPowerFactorExportEnergyReportDailyConsumptionTrendLabel`
        ),
        borderWidth: 2,
        data: datasetValues["powerFactorExport"],
        borderColor: "#0055ffdd",
        backgroundColor: "rgba(0, 0, 0, 0)"
      }
    ];

    return {
      datasets
    };
  }

  render() {
    let { classes, energyReport } = this.props;
    let trendOptions = this.generateOptionsForTrend();
    let trendData = this.generateDataForTrend(energyReport.consumptionPerDay);
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
