import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { fetchEnergyReportActionCreator } from "../../actions/energyReportData";
import ReportMenuComponent from "./ReportMenuComponent";
import EnergyReportComponent from "./EnergyReport/EnergyReportComponent";
import Power15Min from "./Power15Min/Power15Min";
import SupplyQualityReportComponent from "./SupplyQualityReport/SupplyQualityReportComponent";
import InfeedQualityReportComponent from "./InfeedQualityReport/InfeedQualityReportComponent";

const styles = theme => ({
  root: {},
  mainGridItem: {
    width: "100%"
  }
});

class ReportsComponent extends Component {
  renderPage = pageNumber => {
    switch (pageNumber) {
      case 0: {
        return <EnergyReportComponent />;
      }
      case 1: {
        return <Power15Min />;
      }
      case 2: {
        return <SupplyQualityReportComponent />;
      }
      case 3: {
        return <InfeedQualityReportComponent />;
      }
      default: {
        return null;
      }
    }
  };

  render() {
    let { classes, reports } = this.props;
    let { pageNumber } = reports;

    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item className={classes.mainGridItem}>
          <ReportMenuComponent />
        </Grid>
        {this.renderPage(pageNumber)}
      </Grid>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    reports: state.reports
  };
}

const mapDispatchToProps = {
  fetchEnergyReport: fetchEnergyReportActionCreator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(ReportsComponent)));
