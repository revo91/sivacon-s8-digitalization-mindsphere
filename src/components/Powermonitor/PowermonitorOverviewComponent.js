import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PowermonitorEnergyTrend from "./PowermonitorEnergyTrendComponent";
import PowermonitorDetailsPaperComponent from "./PowermonitorDetailsPaperComponent";

const styles = theme => ({});

class PowermonitorOverviewComponent extends Component {
  render() {
    let { classes, t } = this.props;

    if (!this.props.powermonitor.data.ready)
      return <p>{t("powermonitorNotReadyLabel")}</p>;

    return (
      <Grid
        item
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        spacing={3}
        style={{
          height: "100%"
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <PowermonitorDetailsPaperComponent />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <PowermonitorEnergyTrend />
        </Grid>
      </Grid>
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
)(withStyles(styles)(withTranslation()(PowermonitorOverviewComponent)));
