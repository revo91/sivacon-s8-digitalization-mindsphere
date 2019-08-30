import React, { Component } from "react";
import {
  fetchPowermonitorDataActionCreator,
  getPowermonitorDataActionCreator,
  changePowermonitorPageActionCreator
} from "../../actions/powermonitorData";
import {
  showBusyDialogActionCreator,
  hideBusyDialogActionCreator
} from "../../actions/busyDialog";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { exists } from "../../utils/utilities";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import PowermonitorOverviewComponent from "./PowermonitorOverviewComponent";
import Powermonitor15MinComponent from "./Powermonitor15MinComponent";
import PowermonitorSettings from "./PowermonitorSettingsComponent";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import MultilineChart from "@material-ui/icons/MultilineChart";
import TrendingUp from "@material-ui/icons/TrendingUp";
import Settings from "@material-ui/icons/Settings";

import { withSnackbar } from "notistack";

const WhiteBottomNavigationAction = withStyles({
  root: {
    color: "#90cde8",
    "&$selected": {
      color: "white"
    }
  },
  selected: {}
})(props => <BottomNavigationAction color="default" {...props} />);

const styles = theme => ({
  root: {
    minWidth: 700
  },
  bottomNavigation: {
    width: "100%",
    background: "#055f87"
  },
  minDiv: {}
});

class PowermonitorComponent extends Component {
  async _startRefreshing() {
    this._refreshHandler = setInterval(async () => {
      try {
        await this._refresh();
      } catch (err) {
        this.props.enqueueSnackbar(err.message, {
          variant: "error"
        });
      }
    }, 5000);
  }

  async _stopRefreshing() {
    clearInterval(this._refreshHandler);
    delete this._refreshHandler;
  }

  get RefreshingEnabled() {
    return exists(this._refreshHandler);
  }

  async _initialize() {
    try {
      await this.props.fetchPowermonitorData();
      if (!this.RefreshingEnabled) await this._startRefreshing();
    } catch (err) {
      this.props.enqueueSnackbar(err.message, {
        variant: "error"
      });
    }
  }

  async _refresh() {
    await this.props.getPowermonitorData();
  }

  componentDidMount = () => {
    this._initialize();
  };

  componentWillUnmount = () => {
    if (this.RefreshingEnabled) this._stopRefreshing();
  };

  renderPage = pageNumber => {
    switch (pageNumber) {
      case 0: {
        return <PowermonitorOverviewComponent />;
      }
      case 1: {
        return <Powermonitor15MinComponent />;
      }
      case 2: {
        return <PowermonitorSettings />;
      }
      default: {
        return null;
      }
    }
  };

  render() {
    let { t, classes, powermonitor, changePowermonitorPage } = this.props;
    let { pageNumber } = powermonitor;

    return (
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
        wrap="nowrap"
        className={classes.root}
        spacing={3}
      >
        <Grid item>
          <Paper>
            <BottomNavigation
              value={pageNumber}
              showLabels
              className={classes.bottomNavigation}
              onChange={(event, newValue) => {
                changePowermonitorPage(newValue);
              }}
            >
              <WhiteBottomNavigationAction
                className={classes.bottomNavigationAction}
                label={t("powermonitorBottomNavigationOverview")}
                icon={<MultilineChart />}
              />
              <WhiteBottomNavigationAction
                className={classes.bottomNavigationAction}
                label={t("powermonitorBottomNavigationPowerTrend")}
                icon={<TrendingUp />}
              />
              <WhiteBottomNavigationAction
                className={classes.bottomNavigationAction}
                label={t("powermonitorBottomNavigationSettings")}
                icon={<Settings />}
              />
            </BottomNavigation>
          </Paper>
        </Grid>
        {exists(powermonitor.data) ? this.renderPage(pageNumber) : null}
      </Grid>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    powermonitor: state.powermonitor
  };
}

const mapDispatchToProps = {
  fetchPowermonitorData: fetchPowermonitorDataActionCreator,
  getPowermonitorData: getPowermonitorDataActionCreator,
  changePowermonitorPage: changePowermonitorPageActionCreator,
  hideBusyDialog: hideBusyDialogActionCreator,
  showBusyDialog: showBusyDialogActionCreator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(withSnackbar(PowermonitorComponent))));
