import React from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { forwardRef } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

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

const styles = theme => ({
  dateField: {
    fontSize: 12
  },
  valueField: {},
  transgretionField: {},
  severityField: {
    fontSize: 12
  },
  table: {}
});

let renderSeverityName = (t, severity) => {
  if (severity === "alarm") return t("powermonitorPower15TableSeverityAlert");
  if (severity === "warning")
    return t("powermonitorPower15TableSeverityWarning");
  return severity;
};

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

class Powermonitor15MinTableComponent extends React.Component {
  render() {
    const { t, powermonitorActivePower, classes } = this.props;
    const { transgressions } = powermonitorActivePower;
    return (
      <MaterialTable
        components={{
          Container: props => props.children
        }}
        title=""
        className={classes.table}
        icons={tableIcons}
        columns={[
          {
            title: t("powermonitorPower15TableDateColumn"),
            type: "datetime",
            field: "date",
            render: rowData => (
              <span className={classes.dateField}>
                {moment(rowData.date).format("YYYY-MM-DD HH:mm")}
              </span>
            )
          },
          {
            title: t("powermonitorPower15TableValueColumn"),
            field: "value",
            defaultSort: "desc",
            render: rowData => (
              <span className={classes.valueField}>
                {rowData.value.toFixed(2)}
              </span>
            )
          },
          {
            title: t("powermonitorPower15TableTransgressionColumn"),
            field: "transgression",
            render: rowData => (
              <span className={classes.transgretionField}>
                {rowData.transgression.toFixed(2)}
              </span>
            )
          },
          {
            title: t("powermonitorPower15TableSeverityColumn"),
            field: "severity",
            render: rowData => (
              <span className={classes.severityField}>
                {renderSeverityName(t, rowData.severity)}
              </span>
            )
          }
        ]}
        data={transgressions}
        options={{
          pageSize: 10,
          showTitle: true,
          search: false,
          filtering: false,
          pageSizeOptions: [10],
          padding: "dense",
          exportButton: true,
          exportFileName: "transgressions.csv"
        }}
        localization={{
          pagination: {
            labelDisplayedRows: `{from}-{to} ${t(
              "powermonitorPower15TablePaginationFrom"
            )} {count}`,
            labelRowsSelect: t("powermonitorPower15TablePaginationRows"),
            previousAriaLabel: t(
              "powermonitorPower15TablePaginationPreviousPage"
            ),
            previousTooltip: t(
              "powermonitorPower15TablePaginationPreviousPage"
            ),
            nextAriaLabel: t("powermonitorPower15TablePaginationNextPage"),
            nextTooltip: t("powermonitorPower15TablePaginationNextPage"),
            firstTooltip: t("powermonitorPower15TablePaginationFirstPage"),
            lastTooltip: t("powermonitorPower15TablePaginationLastPage")
          },
          toolbar: {
            exportTitle: t("powermonitorPower15TableExportTitle"),
            exportAriaLabel: t("powermonitorPower15TableExportAriaLabel"),
            exportName: t("powermonitorPower15TableExportName")
          },
          body: {
            emptyDataSourceMessage: t("powermonitorPower15TableDataEmpty")
          }
        }}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    powermonitorActivePower: state.powermonitorPowerDataReducer
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Powermonitor15MinTableComponent)));
