import React from 'react'
import Chart from "chart.js";
import { connect } from 'react-redux';
import { getData, sliderSetTimerange, chartSetMarginToRewind, chartLiveUpdate } from '../actions/iottimeseriesData';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { withSnackbar } from 'notistack';

let myLineChart;
Chart.defaults.global.animation.duration = 300;

class TimeSeriesChart extends React.Component {
    chartRef = React.createRef();
    chartValues = null;
    min = null;
    max = null;
    updateInterval = null;
    tabIndex = this.props.tabIndex

    translatedLabels = {
        Voltage_L1_L2: this.props.t('voltageL1L2'),
        Voltage_L1_N: this.props.t('voltageL1N'),
        Voltage_L2_L3: this.props.t('voltageL2L3'),
        Voltage_L2_N: this.props.t('voltageL2N'),
        Voltage_L3_L1: this.props.t('voltageL3L1'),
        Voltage_L3_N: this.props.t('voltageL3N'),
        Current_L1: this.props.t('currentL1'),
        Current_L2: this.props.t('currentL2'),
        Current_L3: this.props.t('currentL3'),
    }

    calculateMinMaxRange = () => {
        let datasets = this.props.datasets;
        let zoomedRewindDirection = this.props.zoomedRewindDirection; // -1,0,1
        if (datasets.length > 0) {
            let zoom = this.props.zoom;
            let minDate = new Date(datasets[0].data[0].x).valueOf();
            let maxDate = new Date(datasets[0].data[datasets[0].data.length - 1].x).valueOf();

            //Get the difference
            let range = maxDate - minDate;
            let rangeCenter = range / 2;
            let centerDate = new Date(minDate + rangeCenter).valueOf();
            let zoomedMinDate = new Date(centerDate - rangeCenter * (1 / zoom));
            let zoomedMaxDate = new Date(centerDate + rangeCenter * (1 / zoom));
            let marginToRewindInUnixTime = maxDate - zoomedMaxDate.valueOf();

            switch (zoomedRewindDirection) {
                case -1:
                    this.min = zoomedMinDate.valueOf() - marginToRewindInUnixTime
                    this.max = zoomedMaxDate.valueOf() - marginToRewindInUnixTime
                    break;
                case 1:
                    this.min = zoomedMinDate.valueOf() + marginToRewindInUnixTime
                    this.max = zoomedMaxDate.valueOf() + marginToRewindInUnixTime
                    break;
                default:
                    this.min = zoomedMinDate.valueOf();
                    this.max = zoomedMaxDate.valueOf();
                    break;
            }
            //this.props.chartSetMarginToRewind(marginToRewindInUnixTime);
        }
    }

    // translateLabels = (datasets) => {
    //     let arrToReturn = []
    //     datasets.map(dataset => {
    //         dataset.label = this.translatedLabels[dataset.label]
    //         arrToReturn.push(dataset)
    //     })
    //     return arrToReturn
    // }

    processChartData = () => {
        const { datasets, t } = this.props;
        return {
            type: 'bar',
            data: {
                datasets: [...datasets]
            },
            options: {
                aspectRatio: 2.2,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            min: this.min,
                            max: this.max,
                            tooltipFormat: 'YYYY-MM-DD HH:mm:ss',
                            displayFormats: {
                                millisecond: 'HH:mm:ss',
                                second: 'HH:mm:ss',
                                minute: 'HH:mm',
                                hour: 'HH'
                            },
                        },

                        distribution: 'series',
                        ticks: {
                            source: 'data',
                            autoSkip: true,

                        },
                        scaleLabel: {
                            display: true,
                            labelString: t('chartXaxis')
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: t('chartYaxis')
                        }
                    }]
                },
                tooltips: {
                    intersect: false,
                    mode: 'index',
                }
            }
        };
    }

    buildChart = () => {
        this.calculateMinMaxRange()
        const myChartRef = this.chartRef.current.getContext("2d");
        if (typeof myLineChart !== "undefined") {
            myLineChart.destroy()
        }
        myLineChart = new Chart(myChartRef, this.processChartData());
    }

    updateChart = () => {
        this.calculateMinMaxRange()
        myLineChart.options.scales.xAxes[0].time.min = this.min;
        myLineChart.options.scales.xAxes[0].time.max = this.max;

        if (myLineChart.data.datasets.length > 0 && this.props.datasets.length > 0) {
            if (myLineChart.data.datasets[0].label === this.props.datasets[0].label) {
                myLineChart.data.datasets.map(dataset => {
                    return this.props.datasets.map(datasetFromStore => {
                        if (datasetFromStore.label === dataset.label) {
                            return dataset.data = datasetFromStore.data
                        }
                    })
                })
            }
        }
        else {
            myLineChart.data = {
                datasets: [...this.props.datasets]
            }
        }
        myLineChart.update()
    }

    componentDidMount() {
        this.buildChart()
        this.updateChartWithInterval()
    }

    componentDidUpdate(prevProps) {
        this.updateChart()
        //this.setLiveUpdate()

        if (prevProps.dataUpdateFailed === false && this.props.dataUpdateFailed === true) {
            this.props.chartLiveUpdate(false)
            this.props.enqueueSnackbar("Błąd połączenia", {
                variant: 'error',
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    updateChartWithInterval = () => {
        this.props.getData(this.tabIndex, this.props.timeRangeSlider)
        this.updateInterval = setInterval(() => {
            if (this.props.liveDataUpdate === true) {
                this.props.sliderSetTimerange(new Date().toISOString())
                this.props.getData(this.tabIndex, moment().subtract(30, 'minutes').toISOString())
            }
        }, 30000)
    }

    render() {
        return (
            <React.Fragment>
                <canvas ref={this.chartRef} />
            </React.Fragment>
        )
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
        selectedDevice: state.dialogReducer.selectedDevice
    };
}

const mapDispatchToProps = {
    getData,
    sliderSetTimerange,
    chartSetMarginToRewind,
    chartLiveUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withSnackbar(TimeSeriesChart)))