import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { sliderSetTimerange, chartLiveUpdate } from '../actions/iottimeseriesData';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '100%',
    },
});
class ChartDataRangeTimePicker extends React.Component {
    getTodayDate = () => {
        return moment().format('YYYY-MM-DD')
    }

    handleChangeTime = (event) => {
        this.props.sliderSetTimerange(moment(event.target.value).toISOString())
        this.props.chartLiveUpdate(false)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.liveUpdate===false && this.props.liveUpdate===true)
        {
            this.props.sliderSetTimerange(moment().toISOString())
        }
    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate>
                <TextField
                    id="date"
                    label="Data"
                    type="date"
                    //defaultValue={this.getTodayDate()}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChangeTime}
                    value={moment(this.props.timeRange).format('YYYY-MM-DD')}
                />
            </form>
        )
    }
}



function mapStateToProps(state) {
    return {
        params: state.chartReducer,
        tabIndex: state.dialogReducer.tabIndex,
        timeRange: state.chartReducer.timeRangeSlider,
        liveUpdate: state.chartReducer.liveDataUpdate
    };
}

const mapDispatchToProps = {
    sliderSetTimerange,
    chartLiveUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChartDataRangeTimePicker))