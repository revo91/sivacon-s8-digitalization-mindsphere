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
import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    padding: theme.spacing(2)
  },
  powerListItem: {},
  powerListItemWarning: { backgroundColor: "rgba(255,150,0,0.4)" },
  powerListItemAlarm: { backgroundColor: "rgba(255,0,0,0.4)" }
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
          <Grid item xs md lg>
            <Typography variant={"body2"} gutterBottom>
              {moment(date).format("HH:mm:ss")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body2"} gutterBottom>
              {value.toFixed(2)} kW
            </Typography>
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
    let { t } = this.props;
    return (
      <ListItem>
        <Grid container>
          <Grid item xs>
            <Typography gutterBottom>
              {`${t("powermonitorDetailsWarningLimit")}: `}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom>{value.toFixed(2)} kW</Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  };

  renderAlarmLimitListItem = value => {
    let { t } = this.props;
    return (
      <ListItem>
        <Grid container>
          <Grid item xs>
            <Typography gutterBottom>
              {`${t("powermonitorDetailsAlarmLimit")}: `}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom>{value.toFixed(2)} kW</Typography>
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
            <Typography variant="h6" gutterBottom>
              {`${t("powermonitorDetailsTotalPredictedPower")}: `}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {value.toFixed(2)} kW
            </Typography>
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
            <Typography variant="h5" gutterBottom>
              {t("powermonitorDetailsCurrentInterval")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {exists(powermonitor.data)
              ? this.renderPowerList(powermonitor.data)
              : null}
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
