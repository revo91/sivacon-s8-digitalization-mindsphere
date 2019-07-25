import React from 'react'
import Chart from "chart.js";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    
  });

  let myLineChart;

class TimeSeriesChart extends React.Component {
    chartRef = React.createRef();
    chartValues = null;
    min = null;
    max = null;
    
    calculateMinMaxRange = () => {
        let data = this.props.params;
        let zoom = data.zoom;
        let minDate = new Date(data.values[0].x).valueOf();
        let maxDate = new Date(data.values[data.values.length-1].x).valueOf();
        
        //Get the difference
        let range = maxDate - minDate;
        let rangeCenter = range/2;
        let centerDate = new Date(minDate+rangeCenter).valueOf();
        let zoomedMinDate = new Date(centerDate-rangeCenter*(1/zoom));
        let zoomedMaxDate = new Date(centerDate+rangeCenter*(1/zoom));

        this.min = zoomedMinDate.valueOf();
        this.max = zoomedMaxDate.valueOf();
    }

    processChartData = () => {
        let data = this.props.params;
        console.log(data.values)
        return {
			type: 'bar',
			data: {
				datasets: [{
					label: data.datasetName,
					backgroundColor: '#00979b',
					borderColor: '#00979b',
                    data: [...data.values],
					type: 'line',
					pointRadius: 0,
					fill: false,
					lineTension: 0,
					borderWidth: 2
				}]
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
                                millisecond: 'HH:mm:ss.SSS',
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
                    callbacks: {
                        label: (tooltipItem, data) => {
                                return `${tooltipItem.yLabel} ${this.props.params.unit}`;
                        }
                    }
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
        let label = this.props.params.datasetName;
        this.calculateMinMaxRange()
        myLineChart.options.scales.xAxes[0].time.min = this.min;
        myLineChart.options.scales.xAxes[0].time.max = this.max;
        myLineChart.data = {datasets: [{
            label: label,
            backgroundColor: '#00979b',
            borderColor: '#00979b',
            data: [...this.props.params.values],
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
        }]}
        
        myLineChart.update()
    }

    componentDidMount() {
        this.buildChart()
    }

    componentDidUpdate() {
        this.updateChart()
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <div className={classes.chartMarginTop}>
                   <canvas ref={this.chartRef}/>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
      params: state.deviceProperties
    };
  }

export default connect(mapStateToProps)(withStyles(styles)(TimeSeriesChart))