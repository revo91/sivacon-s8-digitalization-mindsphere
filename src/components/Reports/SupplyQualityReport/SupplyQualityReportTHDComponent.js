import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

import SupplyQualityTotalTHDChartComponent from "./SupplyQualityReportTotalTHDChartComponent";
import { withSnackbar } from "notistack";

const styles = theme => ({
  paper: {
    padding: theme.spacing(3)
  },
  dataGrid: {}
});

class SupplyQualityReportTHDComponent extends Component {
  render() {
    let { t, classes, supplyName } = this.props;

    return (
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            {`${t("reportsSupplyQualityTHDChartComponentTitle")} ${supplyName}`}
          </Typography>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classes.dataGrid}
            spacing={3}
          >
            <Grid item>
              <SupplyQualityTotalTHDChartComponent supplyName={supplyName} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    supplyQualityReport: state.supplyQualityReport
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(withSnackbar(SupplyQualityReportTHDComponent))
  )
);
