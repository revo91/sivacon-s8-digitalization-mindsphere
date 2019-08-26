import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { withSnackbar } from "notistack";

const styles = theme => ({
  root: {
    width: "100%",
    margin: theme.spacing(2),
    overflowX: "auto"
  },
  table: {},
  footer: {
    marginTop: theme.spacing(1),
    fontWeight: "bold"
  }
});

class GroupConsumptionTableComponent extends Component {
  render() {
    let { t, classes, energyReport } = this.props;

    let { totalConsumption } = energyReport;
    let allGroups = Object.keys(totalConsumption);
    let groupsWithoutTotal = allGroups.filter(x => x !== "total");
    let sortedGroupsWithoutTotal = groupsWithoutTotal.sort((a, b) => {
      return (
        totalConsumption[b].activeEnergyImport -
        totalConsumption[a].activeEnergyImport
      );
    });

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              {t("reportsEnergyReportTableInfeedColumnHeader")}
            </TableCell>
            <TableCell align="right">
              {t("reportsEnergyReportTableInfeedColumnActiveEnergyConsumption")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedGroupsWithoutTotal.map(group => (
            <TableRow key={group}>
              <TableCell component="th" scope="row">
                {t(`reportsEnergyReportGroupName_${group}`)}
              </TableCell>
              <TableCell align="right">
                {`${(totalConsumption[group].activeEnergyImport / 1000).toFixed(
                  2
                )} kWh`}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell component="th" scope="row" align="right">
              <Typography className={classes.footer}>{`${t(
                "reportsEnergyReportGroupName_total"
              )}: `}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography className={classes.footer}>
                {`${(
                  totalConsumption["total"].activeEnergyImport / 1000
                ).toFixed(2)} kWh`}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
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
  withStyles(styles)(
    withTranslation()(withSnackbar(GroupConsumptionTableComponent))
  )
);
