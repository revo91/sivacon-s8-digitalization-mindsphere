import React from 'react'
import Chart from "chart.js";
import { connect } from 'react-redux';
import { getData, sliderSetTimerange } from '../actions/iottimeseriesData';
import moment from 'moment';

let myLineChart;
Chart.defaults.global.animation.duration = 300;

class TimeSeriesChart extends React.Component {
    chartRef = React.createRef();
    chartValues = null;
    min = null;
    max = null;
    updateInterval = null;
    tabIndex = this.props.tabIndex

    calculateMinMaxRange = () => {
        let data = this.props.params;
        if (data.datasets.length>0) {
            let zoom = data.zoom;
            let minDate = new Date(data.datasets[0].data[0].x).valueOf();
            let maxDate = new Date(data.datasets[0].data[data.datasets[0].data.length - 1].x).valueOf();

            //Get the difference
            let range = maxDate - minDate;
            let rangeCenter = range / 2;
            let centerDate = new Date(minDate + rangeCenter).valueOf();
            let zoomedMinDate = new Date(centerDate - rangeCenter * (1 / zoom));
            let zoomedMaxDate = new Date(centerDate + rangeCenter * (1 / zoom));

            this.min = zoomedMinDate.valueOf();
            this.max = zoomedMaxDate.valueOf();
        }
    }

    processChartData = () => {
        let data = this.props.params;
        return {
            type: 'bar',
            data: {
                datasets: [...data.datasets]
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
                            labelString: data.xLabel
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: data.yLabel
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
        
        if(myLineChart.data.datasets.length>0)
        {
            if(myLineChart.data.datasets[0].label === this.props.params.datasets[0].label)
            {
                myLineChart.data.datasets.map(dataset => {
                    this.props.params.datasets.map(datasetFromStore => {
                        if(datasetFromStore.label===dataset.label)
                        {
                            dataset.data = datasetFromStore.data
                        }
                    })
                })
            }
        }
        else {
            myLineChart.data = {
                datasets: [...this.props.params.datasets]
            }
        }
        
        myLineChart.update()
    }

    componentDidMount() {
        this.buildChart()
        this.updateChartWithInterval()
    }

    componentDidUpdate() {
        this.updateChart()
        //this.setLiveUpdate()
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    updateChartWithInterval = () => {
        this.props.getData(this.tabIndex, this.props.params.timeRangeSlider)
        
        this.updateInterval = setInterval(()=>{ 
            if(this.props.params.liveDataUpdate===true)
            {
                this.props.getData(this.tabIndex, this.props.params.timeRangeSlider)
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
        params: state.chartReducer,
        tabIndex: state.dialogReducer.tabIndex
    };
}

const mapDispatchToProps = {
    getData,
    sliderSetTimerange
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSeriesChart)