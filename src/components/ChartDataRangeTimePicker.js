import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { sliderSetTimerange, chartLiveUpdate, getData } from '../actions/iottimeseriesData';
import { withTranslation } from 'react-i18next';
import { DatePicker, TimePicker } from "@material-ui/pickers";
import Grid from '@material-ui/core/Grid';
import { getDeviceNameForApiCall } from '../utils/getDeviceNameForApiCall';

class ChartDataRangeTimePicker extends React.Component {

    handleChangeTime = (value) => {
        let device = getDeviceNameForApiCall(this.props.tabIndex, this.props.deviceNameForApiCall)
        this.props.sliderSetTimerange(moment(value).toISOString())
        this.props.chartLiveUpdate(false)
        this.props.getData(device, this.props.tabIndex, moment(value).toISOString(), false);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.liveUpdate === false && this.props.liveUpdate === true) {
            this.props.sliderSetTimerange(moment().toISOString())
        }
    }

    render() {
        return (
            <React.Fragment>
                <Grid item xs={12} sm={12} md={6}>
                    <DatePicker
                        autoOk
                        orientation="landscape"
                        variant="static"
                        openTo="date"
                        value={this.props.timeRange}
                        onChange={this.handleChangeTime}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} style={{ display: this.props.tabIndex !== 'powerTab' &&
                this.props.tabIndex !== 'THDUtab' &&
                this.props.tabIndex !== 'THDItab' ?
                 'block' : 'none' }}>
                    <TimePicker
                        autoOk
                        ampm={false}
                        variant="static"
                        orientation="landscape"
                        openTo="minutes"
                        value={this.props.timeRange}
                        onChange={this.handleChangeTime}
                        views={['hours', 'minutes']}
                    />
                </Grid>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        params: state.chartReducer,
        tabIndex: state.dialogReducer.tabIndex,
        timeRange: state.chartReducer.timeRangeSlider,
        liveUpdate: state.chartReducer.liveDataUpdate,
        deviceNameForApiCall: state.dialogReducer.deviceTitle
    };
}

const mapDispatchToProps = {
    sliderSetTimerange,
    chartLiveUpdate,
    getData
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ChartDataRangeTimePicker))