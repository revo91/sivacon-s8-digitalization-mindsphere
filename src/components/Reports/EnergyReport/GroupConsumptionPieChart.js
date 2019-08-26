import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import { Pie } from "react-chartjs-2";

const styles = theme => ({
  chart: {}
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

class GroupConsumptionPieChartComponent extends Component {
  generateOptionsForTrend() {
    return {
      maintainAspectRatio: false,
      title: {
        display: false
      },
      legend: {
        display: true,
        position: "left"
      },
      cutoutPercentage: 50,
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var label = data.labels[tooltipItem.index] || "";
            var value =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] ||
              0;

            if (label) {
              label += ": ";
            }
            label += `${value.toFixed(2)} kWh`;
            return label;
          }
        }
      }
    };
  }

  generateDataForTrend(totalConsumptionData) {
    let { t } = this.props;
    let data = [];
    let labels = [];

    let allGroups = Object.keys(totalConsumptionData);

    let colors = [];

    for (let group of allGroups) {
      if (group !== "total") {
        labels.push(t(`reportsEnergyReportGroupName_${group}`));
        data.push(totalConsumptionData[group].activeEnergyImport / 1000);
        colors.push(groupColors[group]);
      }
    }

    return {
      datasets: [
        {
          data: data,
          backgroundColor: colors
        }
      ],
      labels: labels
    };
  }

  render() {
    let { energyReport } = this.props;

    let trendOptions = this.generateOptionsForTrend();
    let trendData = this.generateDataForTrend(energyReport.totalConsumption);
    return <Pie options={trendOptions} data={trendData} />;
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
    withTranslation()(withSnackbar(GroupConsumptionPieChartComponent))
  )
);
