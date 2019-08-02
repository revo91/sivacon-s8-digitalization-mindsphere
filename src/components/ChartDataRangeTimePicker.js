import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import moment from 'moment';

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
    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate>
                <TextField
                    id="date"
                    label="Data"
                    type="date"
                    defaultValue={this.getTodayDate()}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
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
    //setDataRange
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChartDataRangeTimePicker))