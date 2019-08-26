import React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { sliderSetTimerange, getData, chartLiveUpdate, sliderSetStepValue } from '../actions/iottimeseriesData';
import { getDeviceNameForApiCall } from '../utils/getDeviceNameForApiCall';
import { connect } from 'react-redux';

const styles = theme => ({
    margin: {
        height: theme.spacing(3),
    },
});

class ChartDataRangeTimeSlider extends React.Component {

    marks = [];
    minSliderValue = 0;
    maxSliderValue = 59;

    valuetext = (value) => {
        return `${value}`;
    }

    componentDidMount() {
        this.generateMarks()
    }

    generateMarks = () => {
        let marks = []
        let currentTab = this.props.tabIndex;
        let _15minWindowSliderTabs = ['currentTab', 'voltageLLTab', 'voltageLNTab'];
        if (_15minWindowSliderTabs.indexOf(currentTab) !== -1) {
            for (let i = 0; i <= 95; i++) {
                marks.push({ value: i, label: i%4===0?i/4:'' })
            }
            this.maxSliderValue = 95
        }
        return marks
    }

    setCurrentTime = () => { 
        let addSliderStep = 0;
        let minutes = moment(this.props.timeRange).minutes()
        if(minutes >= 15 && minutes < 30)
        {
            addSliderStep = 1
        }
        else if(minutes >= 30 && minutes < 45)
        {
            addSliderStep = 2
        }
        else if (minutes >= 45 && minutes < 59)
        {
            addSliderStep = 3
        }
        else {
            addSliderStep = 0
        }
        return this.props.timeRange ? moment(this.props.timeRange).hours()*4 + addSliderStep : moment().hours()*4 + addSliderStep
    }

    setTimeRange = (value, turnOnLiveUpdate = false) => {
        //turn off liveupdate on change slider
        if (turnOnLiveUpdate === false) {
            this.props.chartLiveUpdate(false);
        }
        let multiplier = 15;
        let multipliedSliderValueInMinutes = value*multiplier; //96*15min
        let timeRange = this.props.timeRange;
        let set15MinWindowEnd = moment(timeRange).startOf("day").add(multipliedSliderValueInMinutes,"minutes").toISOString()
        this.props.sliderSetTimerange(set15MinWindowEnd);
        this.props.sliderSetStepValue(value);
        let device = getDeviceNameForApiCall(this.props.tabIndex, this.props.deviceNameForApiCall)
        if (this.props.liveUpdate === false) {
            this.props.getData(device, this.props.tabIndex, set15MinWindowEnd, true);
        }
        else {
            this.props.getData(device, this.props.tabIndex, moment().toISOString(), false, true);
        }
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.liveUpdate === false && this.props.liveUpdate === true)) {
            this.setTimeRange(this.setCurrentTime(true), true)
        }
    }

    render() {
        return (
            <Slider
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider"
                step={1}
                marks={this.generateMarks()}
                valueLabelDisplay="auto"
                max={this.maxSliderValue}
                min={this.minSliderValue}
                valueLabelFormat={(x) => ``}
                onChangeCommitted={(x, value) => this.setTimeRange(value)}
                value={this.setCurrentTime()}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        timeRange: state.chartReducer.timeRangeSlider,
        sliderStepValue: state.chartReducer.timeRangeStepValue,
        tabIndex: state.dialogReducer.tabIndex,
        liveUpdate: state.chartReducer.liveDataUpdate,
        deviceNameForApiCall: state.dialogReducer.deviceTitle
    };
}

const mapDispatchToProps = {
    sliderSetTimerange,
    getData,
    chartLiveUpdate,
    sliderSetStepValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChartDataRangeTimeSlider))