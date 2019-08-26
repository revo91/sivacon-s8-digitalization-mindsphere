import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

import { withSnackbar } from "notistack";
import PowerFactorDailyConsumptionChartComponent from "./PowerFactorDailyConsumptionChartComponent";
import PowerFactorDailyConsumptionMUITableComponent from "./PowerFactorDailyConsumptionMUITableComponent";

const styles = theme => ({
  paper: {
    padding: theme.spacing(3)
  },
  dataGrid: {},
  chartGridItem: {}
});

class DailyConsumptionComponent extends Component {
  render() {
    let { t, classes } = this.props;

    return (
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            {t("reportsPowerFactorEnergyReportDailyConsumptionTitle")}
          </Typography>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classes.dataGrid}
            spacing={2}
          >
            <Grid item className={classes.chartGridItem}>
              <PowerFactorDailyConsumptionChartComponent />
            </Grid>
            <Grid item>
              <PowerFactorDailyConsumptionMUITableComponent />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    energyReport: state.energyReport
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(withTranslation()(withSnackbar(DailyConsumptionComponent)))
);
