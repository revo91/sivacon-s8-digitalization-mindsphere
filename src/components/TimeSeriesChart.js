import React from "react";
import Chart from "chart.js";
import { connect } from "react-redux";
import {
  getData,
  sliderSetTimerange,
  chartSetMarginToRewind,
  chartLiveUpdate
} from "../actions/iottimeseriesData";
import { withTranslation } from "react-i18next";
import moment from "moment";
import { withSnackbar } from "notistack";
import { getDeviceNameForApiCall } from "../utils/getDeviceNameForApiCall";

let myLineChart;
Chart.defaults.global.animation.duration = 300;

class TimeSeriesChart extends React.Component {
  chartRef = React.createRef();
  chartValues = null;
  min = null;
  max = null;
  updateInterval = null;
  tabIndex = this.props.tabIndex;

  calculateMinMaxRange = () => {
    let datasets = this.props.datasets;
    let zoomedRewindDirection = this.props.zoomedRewindDirection; // -1,0,1
    let minDate = null;
    let maxDate = null;
    if (datasets.length > 0) {
      let zoom = this.props.zoom;
      if (
        this.props.tabIndex === "THDItab" ||
        this.props.tabIndex === "THDUtab"
      ) {
        minDate = moment(this.props.timeRangeSlider).startOf("day");
        maxDate = moment(this.props.timeRangeSlider).endOf("day");
      } else if (
        this.props.tabIndex === "voltageLLTab" ||
        this.props.tabIndex === "voltageLNTab" ||
        this.props.tabIndex === "currentTab"
      ) {
        if (this.props.liveDataUpdate === true) {
          minDate = moment(this.props.timeRangeSlider).subtract(15, "minute");
          maxDate = moment(this.props.timeRangeSlider).subtract(30, "second");
        } else {
          minDate = moment(this.props.timeRangeSlider).subtract(7.5, "minute");
          maxDate = moment(this.props.timeRangeSlider).add(7.5, "minute");
        }
      } else if (this.props.tabIndex === "powerTab") {
        minDate = moment(this.props.timeRangeSlider).startOf("day");
        maxDate = moment(this.props.timeRangeSlider).endOf("day");
      } else {
        minDate = new Date(datasets[0].data[0].x).valueOf();
        maxDate = new Date(
          datasets[0].data[datasets[0].data.length - 1].x
        ).valueOf();
      }

      //Get the difference
      let range = maxDate - minDate;
      let rangeCenter = range / 2;
      let centerDate = new Date(minDate + rangeCenter).valueOf();
      let zoomedMinDate = new Date(centerDate - rangeCenter * (1 / zoom));
      let zoomedMaxDate = new Date(centerDate + rangeCenter * (1 / zoom));
      let marginToRewindInUnixTime = maxDate - zoomedMaxDate.valueOf();

      switch (zoomedRewindDirection) {
        case -1:
          this.min = zoomedMinDate.valueOf() - marginToRewindInUnixTime;
          this.max = zoomedMaxDate.valueOf() - marginToRewindInUnixTime;
          break;
        case 1:
          this.min = zoomedMinDate.valueOf() + marginToRewindInUnixTime;
          this.max = zoomedMaxDate.valueOf() + marginToRewindInUnixTime;
          break;
        default:
          this.min = zoomedMinDate.valueOf();
          this.max = zoomedMaxDate.valueOf();
          break;
      }
      //this.props.chartSetMarginToRewind(marginToRewindInUnixTime);
    }
  };

  processChartData = () => {
    const { datasets, t } = this.props;
    return {
      type: "line",
      data: {
        datasets: [...datasets]
      },
      options: {
        aspectRatio: this.updateChartAspectRatio(),
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                min: this.min,
                max: this.max,
                tooltipFormat: "YYYY-MM-DD HH:mm:ss",
                displayFormats: {
                  millisecond: "HH:mm:ss",
                  second: "HH:mm:ss",
                  minute: "HH:mm",
                  hour: "HH"
                }
              },
              distribution: "linear",
              ticks: {
                source: "auto",
                autoSkip: true
              },
              scaleLabel: {
                display: true,
                labelString: t("chartXaxis")
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: t("chartYaxis")
              }
            }
          ]
        },
        tooltips: {
          intersect: false,
          mode: "index"
        }
      }
    };
  };

  buildChart = () => {
    this.calculateMinMaxRange();
    const myChartRef = this.chartRef.current.getContext("2d");
    if (typeof myLineChart !== "undefined") {
      myLineChart.destroy();
    }
    myLineChart = new Chart(myChartRef, this.processChartData());
  };

  updateChart = () => {
    this.calculateMinMaxRange();
    // myLineChart.options.scales.xAxes[0].time.min = this.min;
    // myLineChart.options.scales.xAxes[0].time.max = this.max;
    myLineChart.options.scales.xAxes[0].time.min = this.min;
    myLineChart.options.scales.xAxes[0].time.max = this.max;
    if (
      myLineChart.data.datasets.length > 0 &&
      this.props.datasets.length > 0
    ) {
      if (myLineChart.data.datasets[0].label === this.props.datasets[0].label) {
        myLineChart.data.datasets.map(dataset => {
          return this.props.datasets.map(datasetFromStore => {
            if (datasetFromStore.label === dataset.label) {
              return (dataset.data = datasetFromStore.data);
            }
          });
        });
      }
    } else {
      myLineChart.data = {
        datasets: [...this.props.datasets]
      };
    }

    myLineChart.update();
  };

  componentDidMount() {
    this.buildChart();
    this.updateChartWithInterval();
  }

  updateChartAspectRatio = () => {
    let screenWidth = Math.max(window.innerWidth, window.innerHeight);
    if (screenWidth >= 992) {
      return 3;
    } else {
      return 1.5;
    }
  };

  componentDidUpdate(prevProps) {
    this.updateChart();
    //this.setLiveUpdate()
    if (
      prevProps.dataUpdateFailed === false &&
      this.props.dataUpdateFailed === true
    ) {
      this.props.chartLiveUpdate(false);
      this.props.enqueueSnackbar(this.props.t("snackbarsConnectionError"), {
        variant: "error"
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  updateChartWithInterval = () => {
    if (this.props.liveDataUpdate === false) {
      clearInterval(this.updateInterval);
    }
    this.props.getData(
      getDeviceNameForApiCall(
        this.props.tabIndex,
        this.props.deviceNameForApiCall
      ),
      this.tabIndex,
      this.props.timeRangeSlider,
      true,
      this.props.liveDataUpdate
    );
    this.updateInterval = setInterval(() => {
      if (this.props.liveDataUpdate === true) {
        this.props.sliderSetTimerange(new Date().toISOString());
        this.props.getData(
          getDeviceNameForApiCall(
            this.props.tabIndex,
            this.props.deviceNameForApiCall
          ),
          this.tabIndex,
          moment().toISOString(),
          false,
          true
        );
      }
    }, 60000);
  };

  render() {
    return (
      <React.Fragment>
        <canvas ref={this.chartRef} />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    timeRangeSlider: state.chartReducer.timeRangeSlider,
    liveDataUpdate: state.chartReducer.liveDataUpdate,
    datasets: state.chartReducer.datasets,
    tabIndex: state.dialogReducer.tabIndex,
    zoomedLeftRightMarginToRewind: state.chartReducer.zoomedUnixTimeMargin,
    zoomedRewindDirection: state.chartReducer.zoomedRewindDirection,
    dataUpdateFailed: state.chartReducer.isError,
    dataUpdateAwaiting: state.chartReducer.isChartDataLoading,
    zoom: state.chartReducer.zoom,
    selectedDevice: state.dialogReducer.selectedDevice,
    deviceNameForApiCall: state.dialogReducer.deviceTitle
  };
}

const mapDispatchToProps = {
  getData,
  sliderSetTimerange,
  chartSetMarginToRewind,
  chartLiveUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withSnackbar(TimeSeriesChart)));
