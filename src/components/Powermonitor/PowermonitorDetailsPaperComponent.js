import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { exists } from "../../utils/utilities";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "100% "
  },
  listHeader: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 15
  },
  powerListItem: {},
  powerListItemWarning: { backgroundColor: "rgba(255,150,0,1)" },
  powerListItemAlarm: { backgroundColor: "red" },
  mainGrid: {
    height: "100%"
  },
  minutePowerDescription: {
    fontSize: 10
  },
  minutePowerValue: {
    fontSize: 10
  },
  predictedPowerDescription: {
    fontSize: 12
  },
  predictedPowerValue: {
    fontSize: 14,
    fontWeight: "bold"
  },
  limitDescription: {
    fontSize: 12
  },
  limitValue: {
    fontSize: 12
  }
});

class PowermonitorDetailsComponent extends Component {
  renderPowerListItem = (date, value, warningLimit, alarmLimit) => {
    let { classes } = this.props;

    //Determining class name for item
    let itemClassName = classes.powerListItem;
    if (value >= warningLimit) itemClassName = classes.powerListItemWarning;
    if (value >= alarmLimit) itemClassName = classes.powerListItemAlarm;

    return (
      <ListItem className={itemClassName} key={date.toString()}>
        <Grid container>
          <Grid item xs>
            <div className={classes.minutePowerDescription}>
              {moment(date).format("HH:mm:ss")}
            </div>
          </Grid>
          <Grid item>
            <div className={classes.minutePowerValue}>
              {value.toFixed(2)} kW
            </div>
          </Grid>
        </Grid>
      </ListItem>
    );
  };

  renderPowerList = powermonitorData => {
    let objectsToReturn = [];

    let {
      steps,
      activePowerLimitWarning,
      activePowerLimitAlarm
    } = powermonitorData;

    for (let i = 1; i <= 15; i++) {
      let step = steps[i.toString()];

      if (step.averageActivePower > 0)
        objectsToReturn.push(
          this.renderPowerListItem(
            new Date(step.stepStopDateUTC),
            step.averageActivePower,
            activePowerLimitWarning,
            activePowerLimitAlarm
          )
        );
    }

    return objectsToReturn;
  };

  renderWarningLimitListItem = value => {
    let { t, classes } = this.props;
    return (
      <ListItem>
        <Grid container>
          <Grid item xs>
            <div className={classes.limitDescription}>
              {`${t("powermonitorDetailsWarningLimit")}: `}
            </div>
          </Grid>
          <Grid item>
            <div className={classes.limitValue}>{value.toFixed(2)} kW</div>
          </Grid>
        </Grid>
      </ListItem>
    );
  };

  renderAlarmLimitListItem = value => {
    let { t, classes } = this.props;
    return (
      <ListItem>
        <Grid container>
          <Grid item xs>
            <div className={classes.limitDescription}>
              {`${t("powermonitorDetailsAlarmLimit")}: `}
            </div>
          </Grid>
          <Grid item>
            <div className={classes.limitValue}>{value.toFixed(2)} kW</div>
          </Grid>
        </Grid>
      </ListItem>
    );
  };

  renderPredictedPowerListItem = (value, warning, alarm) => {
    let { t, classes } = this.props;
    //Determining class name for item
    let itemClassName = classes.powerListItem;
    if (warning) itemClassName = classes.powerListItemWarning;
    if (alarm) itemClassName = classes.powerListItemAlarm;

    return (
      <ListItem className={itemClassName}>
        <Grid container>
          <Grid item xs>
            <div className={classes.predictedPowerDescription}>
              {`${t("powermonitorDetailsTotalPredictedPower")}: `}
            </div>
          </Grid>
          <Grid item>
            <div className={classes.predictedPowerValue}>
              {value.toFixed(2)} kW
            </div>
          </Grid>
        </Grid>
      </ListItem>
    );
  };

  render() {
    let { t, powermonitor, classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Grid
          container
          direction="column"
          justify="flex-end"
          alignItems="stretch"
          className={classes.mainGrid}
          wrap="nowrap"
        >
          <Grid item>
            <List>
              <ListItem className={classes.listHeader}>
                {t("powermonitorDetailsCurrentInterval")}
              </ListItem>
              <Divider />
            </List>
          </Grid>
          <Grid item xs={12}>
            <List style={{ overflow: "auto" }}>
              {exists(powermonitor.data)
                ? this.renderPowerList(powermonitor.data)
                : null}
            </List>
          </Grid>
          <Grid item>
            <List>
              <Divider />
              {exists(powermonitor.data)
                ? this.renderWarningLimitListItem(
                    powermonitor.data.activePowerLimitWarning
                  )
                : null}
              {exists(powermonitor.data)
                ? this.renderAlarmLimitListItem(
                    powermonitor.data.activePowerLimitAlarm
                  )
                : null}
              {exists(powermonitor.data)
                ? this.renderPredictedPowerListItem(
                    powermonitor.data.predictedActivePower,
                    powermonitor.data.warning,
                    powermonitor.data.alarm
                  )
                : null}
            </List>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    powermonitor: state.powermonitor
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(PowermonitorDetailsComponent)));
