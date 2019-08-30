import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import Power15MinTotalPowerChartComponent from "./Power15MinTotalPowerChartComponent";

import { withSnackbar } from "notistack";
import { exists } from "../../../utils/utilities";

const styles = theme => ({
  paper: {
    padding: theme.spacing(3)
  },
  dataGrid: {},
  chartGridItem: {
    padding: theme.spacing(3)
  }
});

class Total15MinPowerComponent extends Component {
  renderMaxTypography = () => {
    let { power15MinReport, t } = this.props;
    let maxValue = power15MinReport.data["total"].maxValue;
    let maxDate = power15MinReport.data["total"].maxDate;

    if (!exists(maxValue) || !exists(maxDate)) return null;

    let maximumText = `${moment(maxDate).format(
      "YYYY-MM-DD HH:mm"
    )} - ${maxValue.toFixed(2)} kW`;

    return (
      <Typography>
        {`${t("powermonitorPower15MaxValueLabel")} : ${maximumText}`}
      </Typography>
    );
  };

  render() {
    let { t, classes } = this.props;

    return (
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            {t("reports15MinPowerReportTotalPowerTitle")}
          </Typography>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            className={classes.dataGrid}
          >
            <Grid item className={classes.chartGridItem}>
              <Power15MinTotalPowerChartComponent />
            </Grid>
            <Grid item>{this.renderMaxTypography()}</Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    power15MinReport: state.power15MinReport
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(withTranslation()(withSnackbar(Total15MinPowerComponent)))
);
