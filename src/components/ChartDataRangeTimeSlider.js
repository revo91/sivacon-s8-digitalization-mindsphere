import React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { sliderSetTimerange, getData, chartLiveUpdate, sliderSetStepValue } from '../actions/iottimeseriesData';
import { connect } from 'react-redux';

const styles = theme => ({
    margin: {
        height: theme.spacing(3),
    },
});

const marks = [
    {
        value: 0,
        label: '0:00',
    },
    {
        value: 1,
        label: '0:30',
    },
    {
        value: 2,
        label: '1:00',
    },
    {
        value: 3,
        label: '1:30',
    },
    {
        value: 4,
        label: '2:00',
    },
    {
        value: 5,
        label: '2:30',
    },
    {
        value: 6,
        label: '3:00',
    },
    {
        value: 7,
        label: '3:30',
    },
    {
        value: 8,
        label: '4:00',
    },
    {
        value: 9,
        label: '4:30',
    },
    {
        value: 10,
        label: '5:00',
    },
    {
        value: 11,
        label: '5:30',
    },
    {
        value: 12,
        label: '6:00',
    },
    {
        value: 13,
        label: '6:30',
    },
    {
        value: 14,
        label: '7:00',
    },
    {
        value: 15,
        label: '7:30',
    },
    {
        value: 16,
        label: '8:00',
    },
    {
        value: 17,
        label: '8:30',
    },
    {
        value: 18,
        label: '9:00',
    },
    {
        value: 19,
        label: '9:30',
    },
    {
        value: 20,
        label: '10:00',
    },
    {
        value: 21,
        label: '10:30',
    },
    {
        value: 22,
        label: '11:00',
    },
    {
        value: 23,
        label: '11:30',
    },
    {
        value: 24,
        label: '12:00',
    },
    {
        value: 25,
        label: '12:30',
    },
    {
        value: 26,
        label: '13:00',
    },
    {
        value: 27,
        label: '13:30',
    },
    {
        value: 28,
        label: '14:00',
    },
    {
        value: 29,
        label: '14:30',
    },
    {
        value: 30,
        label: '15:00',
    },
    {
        value: 31,
        label: '15:30',
    },
    {
        value: 32,
        label: '16:00',
    },
    {
        value: 33,
        label: '16:30',
    },
    {
        value: 34,
        label: '17:00',
    },
    {
        value: 35,
        label: '17:30',
    },
    {
        value: 36,
        label: '18:00',
    },
    {
        value: 37,
        label: '18:30',
    },
    {
        value: 38,
        label: '19:00',
    },
    {
        value: 39,
        label: '19:30',
    },
    {
        value: 40,
        label: '20:00',
    },
    {
        value: 41,
        label: '20:30',
    },
    {
        value: 42,
        label: '21:00',
    },
    {
        value: 43,
        label: '21:30',
    },
    {
        value: 44,
        label: '22:00',
    },
    {
        value: 45,
        label: '22:30',
    },
    {
        value: 46,
        label: '23:00',
    },
    {
        value: 47,
        label: '23:30',
    },
];

class ChartDataRangeTimeSlider extends React.Component {
    formattedMarks = [];
    
    valuetext = (value) => {
        return `${value}`;
    }

    componentDidMount() {
        window.addEventListener("resize", this.checkWidth);
    }

    checkWidth = () => {
        let divider = null;
        let formattedMarks = []
        if(window.innerWidth<=1023)
        {
            divider = 12
        }
        else if(window.innerWidth>1023)
        {
            divider = 2
        }
        marks.map((mark,index)=>{
            return index%divider===0? formattedMarks.push(mark) : null
        })
        return formattedMarks;
    }

    setCurrentTime = (updateCurrentTime=false) => {
        let sliderValue = 0;
        let timeRange = null;
        if(updateCurrentTime===true)
        {
            timeRange = new Date().toISOString()
        }
        else 
        {
            timeRange = this.props.timeRange
        }
        let currentTimeInHHmmFormat = moment(timeRange).format('HH:mm');
        let hours = currentTimeInHHmmFormat.substring(0,2)
        let minutes = currentTimeInHHmmFormat.substring(3,currentTimeInHHmmFormat.length)
        sliderValue = hours*2;
        if(parseInt(minutes[0])>=3)
        {
            sliderValue++
        }
        return sliderValue
    }

    setTimeRange = (value, turnOnLiveUpdate=false) => {
        let multiplier = value;
        let addMinutes = multiplier*30;
        let timeRange = this.props.timeRange;
        let startOfDay = moment(timeRange).startOf("day");
        let addedMinutes = startOfDay.add(addMinutes,"minutes").toISOString()

        this.props.sliderSetTimerange(addedMinutes);
        this.props.sliderSetStepValue(value)
        this.props.getData(this.props.tabIndex, addedMinutes);
        //turn off liveupdate on change slider
        if(turnOnLiveUpdate===false)
        {
            this.props.chartLiveUpdate(false); 
        }
    }

    componentDidUpdate(prevProps) {
        if((prevProps.liveUpdate===false && this.props.liveUpdate===true))
        {
            this.setTimeRange(this.setCurrentTime(true),true)
        }
    }

    render() {
        return (
            <Slider
                //defaultValue={this.setCurrentTime()}
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider"
                step={1}
                marks={this.checkWidth()}
                valueLabelDisplay="auto"
                max={47}
                min={0}
                valueLabelFormat={(x)=>``}
                onChangeCommitted={(x,value)=>this.setTimeRange(value)}
                value={this.props.sliderStepValue || this.setCurrentTime()}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        timeRange: state.chartReducer.timeRangeSlider,
        sliderStepValue: state.chartReducer.timeRangeStepValue,
        tabIndex: state.dialogReducer.tabIndex,
        liveUpdate: state.chartReducer.liveDataUpdate
    };
}

const mapDispatchToProps = {
    sliderSetTimerange,
    getData,
    chartLiveUpdate,
    sliderSetStepValue
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChartDataRangeTimeSlider))