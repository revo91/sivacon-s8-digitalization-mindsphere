import React, { Component } from "react";
import { changeReportPageActionCreator } from "../../actions/reportData";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import PieChart from "@material-ui/icons/PieChart";
import TrendingUp from "@material-ui/icons/TrendingUp";
import Power from "@material-ui/icons/Power";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

import { withSnackbar } from "notistack";

const styles = theme => ({
  bottomNavigation: {
    width: "100%",
    background: "#055f87"
  },
  bottomNavigationAction: {}
});

const WhiteBottomNavigationAction = withStyles({
  root: {
    color: "#90cde8",
    "&$selected": {
      color: "white"
    }
  },
  selected: {}
})(props => <BottomNavigationAction color="default" {...props} />);

class ReportMenuComponet extends Component {
  render() {
    let { t, classes, reports, changeReportPage } = this.props;
    let { pageNumber } = reports;

    return (
      <BottomNavigation
        value={pageNumber}
        showLabels
        className={classes.bottomNavigation}
        onChange={(event, newValue) => {
          changeReportPage(newValue);
        }}
      >
        <WhiteBottomNavigationAction
          className={classes.bottomNavigationAction}
          label={t("reportsMenuEnergyReport")}
          icon={<PieChart />}
        />
        <WhiteBottomNavigationAction
          className={classes.bottomNavigationAction}
          label={t("reportsMenu15MinPowerReport")}
          icon={<TrendingUp />}
        />
        <WhiteBottomNavigationAction
          className={classes.bottomNavigationAction}
          label={t("reportsMenuQualityReport")}
          icon={<Power />}
        />
        <WhiteBottomNavigationAction
          className={classes.bottomNavigationAction}
          label={t("reportsMenuInfeedQualityReport")}
          icon={<ArrowDownward />}
        />
      </BottomNavigation>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    reports: state.reports
  };
}

const mapDispatchToProps = {
  changeReportPage: changeReportPageActionCreator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(withSnackbar(ReportMenuComponet))));
