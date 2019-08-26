import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

import SupplyQualityReportInfeedTHDChartComponent from "./SupplyQualityReportInfeedTHDChartComponent";
import { withSnackbar } from "notistack";

const styles = theme => ({
  paper: {
    padding: theme.spacing(3)
  },
  dataGrid: {}
});

class SupplyQualityReportInfeedsTHDComponent extends Component {
  render() {
    let { t, classes, supplyName, phaseNumber, infeeds } = this.props;

    return (
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            {`${t(
              `reportsSupplyQualityInfeedTHDChartComponentTitle${phaseNumber}`
            )} ${supplyName}`}
          </Typography>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classes.dataGrid}
          >
            <Grid item>
              <SupplyQualityReportInfeedTHDChartComponent
                supplyName={supplyName}
                phaseNumber={phaseNumber}
                infeeds={infeeds}
              />
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
    withTranslation()(withSnackbar(SupplyQualityReportInfeedsTHDComponent))
  )
);
