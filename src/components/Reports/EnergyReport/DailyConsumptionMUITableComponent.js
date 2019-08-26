import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import MaterialTable from "material-table";

import { withSnackbar } from "notistack";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { forwardRef } from "react";

const styles = theme => ({
  dateField: {},
  valueField: { align: "right" },
  table: {}
});

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class DailyConsumptionTableComponent extends Component {
  getColumns = groupsWithoutTotal => {
    let { classes, t } = this.props;

    let columns = [];

    columns.push({
      title: t("reportsEnergyReportTableDateColumn"),
      type: "datetime",
      field: "date",
      defaultSort: "asc",
      render: rowData => (
        <span className={classes.dateField}>
          {moment(rowData.date).format("YYYY-MM-DD")}
        </span>
      )
    });

    for (let group of groupsWithoutTotal) {
      columns.push({
        title: t(`reportsEnergyReportGroupName_${group}`) + " [kWh]",
        field: `${group}.activeEnergyImport`,
        render: rowData => (
          <span className={classes.valueField}>
            {rowData[group]
              ? `${(rowData[group].activeEnergyImport / 1000).toFixed(2)}`
              : ""}
          </span>
        )
      });
    }

    columns.push({
      title: t(`reportsEnergyReportGroupName_total`) + " [kWh]",
      field: `total.activeEnergyImport`,
      render: rowData => (
        <span className={classes.valueField}>
          {rowData["total"]
            ? `${(rowData["total"].activeEnergyImport / 1000).toFixed(2)}`
            : ""}
        </span>
      )
    });

    return columns;
  };

  getAllGroups = consumptionPerDayData => {
    let groupsToReturn = [];
    let allDays = Object.keys(consumptionPerDayData);

    for (let day of allDays) {
      let groups = Object.keys(consumptionPerDayData[day]);

      for (let group of groups) {
        if (!groupsToReturn.includes(group, 0)) {
          groupsToReturn.push(group);
        }
      }
    }

    return groupsToReturn;
  };

  getData = dailyConsumption => {
    let dataToReturn = [];

    let allDays = Object.keys(dailyConsumption);

    for (let day of allDays) {
      let dayData = { ...dailyConsumption[day] };
      dayData["date"] = parseInt(day);
      dataToReturn.push(dayData);
    }

    return dataToReturn;
  };

  render() {
    let { t, classes, energyReport } = this.props;

    let { consumptionPerDay } = energyReport;

    let allGroups = this.getAllGroups(consumptionPerDay);

    let groupsWithoutTotal = allGroups.filter(x => x !== "total");

    let columns = this.getColumns(groupsWithoutTotal);

    return (
      <MaterialTable
        components={{
          Container: props => props.children
        }}
        icons={tableIcons}
        className={classes.table}
        columns={columns}
        data={this.getData(consumptionPerDay)}
        title={""}
        options={{
          pageSize: 5,
          showTitle: true,
          search: false,
          filtering: false,
          pageSizeOptions: [5, 10, 20, 31],
          padding: "dense",
          exportButton: true,
          exportFileName: "energyConsumptionDaily.csv"
        }}
        localization={{
          pagination: {
            labelDisplayedRows: `{from}-{to} ${t(
              "reportsEnergyReportTablePaginationFrom"
            )} {count}`,
            labelRowsSelect: t("reportsEnergyReportTablePaginationRows"),
            previousAriaLabel: t(
              "reportsEnergyReportTablePaginationPreviousPage"
            ),
            previousTooltip: t(
              "reportsEnergyReportTablePaginationPreviousPage"
            ),
            nextAriaLabel: t("reportsEnergyReportTablePaginationNextPage"),
            nextTooltip: t("reportsEnergyReportTablePaginationNextPage"),
            firstTooltip: t("reportsEnergyReportTablePaginationFirstPage"),
            lastTooltip: t("reportsEnergyReportTablePaginationLastPage")
          },
          toolbar: {
            exportTitle: t("reportsEnergyReportTableExportTitle"),
            exportAriaLabel: t("reportsEnergyReportTableExportAriaLabel"),
            exportName: t("reportsEnergyReportTableExportName")
          },
          body: {
            emptyDataSourceMessage: t("reportsEnergyReportTableDataEmpty")
          }
        }}
      />
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
    withTranslation()(withSnackbar(DailyConsumptionTableComponent))
  )
);
