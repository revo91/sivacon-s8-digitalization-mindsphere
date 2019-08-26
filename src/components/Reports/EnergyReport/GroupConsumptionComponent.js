import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

import { withSnackbar } from "notistack";
import GroupConsumptionPieChart from "./GroupConsumptionPieChart";
import GroupConsumptionTable from "./GroupConsumptionTable";

const styles = theme => ({
  paper: {
    padding: theme.spacing(3)
  },
  dataGrid: {},
  chartGridItem: {}
});

class GroupConsumptionComponent extends Component {
  render() {
    let { t, classes } = this.props;

    return (
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            {t("reportsEnergyReportGroupConsumptionTitle")}
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
            className={classes.dataGrid}
            spacing={2}
          >
            <Grid item className={classes.chartGridItem} sm={12} md={5} lg={5}>
              <GroupConsumptionPieChart />
            </Grid>
            <Grid item sm={12} md={7} lg={7}>
              <GroupConsumptionTable />
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
  withStyles(styles)(withTranslation()(withSnackbar(GroupConsumptionComponent)))
);
