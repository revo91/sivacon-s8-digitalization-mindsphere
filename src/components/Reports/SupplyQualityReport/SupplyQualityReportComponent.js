import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { DatePicker } from "@material-ui/pickers";
import {
  fetchSupplyQualityReportActionCreator,
  changeSupplySelectionActionCreator
} from "../../../actions/supplyQualityReportData";
import { exists, existsAndIsNotEmpty } from "../../../utils/utilities";

import SupplyQualityReportTransformerComponent from "./SupplyQualityReportTransformerComponent";
import SupplyQualityReportTHDComponent from "./SupplyQualityReportTHDComponent";
import SupplyQualityReportInfeedsTHDComponent from "./SupplyQualityReportInfeedsTHDComponent";
import SupplyQualityReportCurrentsComponent from "./SupplyQualityReportCurrentsComponent";

const styles = theme => ({
  appBar: {
    padding: theme.spacing(2),
    width: "100%",
    backgroundColor: "#f5f5f5"
  }
});

const infeeds = {
  TR2: ["2F1", "2F2", "2F3", "2F4", "2F5", "2F6", "2FP1", "2FP2"],
  TR1: [
    "1F1",
    "1F2",
    "1F3",
    "1F4",
    "1F5",
    "1F6",
    "1F7",
    "3F1",
    "3F2",
    "1FP1",
    "1FP2"
  ]
};

class SupplyQualityReportComponent extends Component {
  componentDidMount = async () => {
    let { fetchSupplyQualityReport } = this.props;
    let now = new Date(Date.now());
    await fetchSupplyQualityReport(now.getFullYear(), now.getMonth());
  };

  handleDateChange = date => {
    let { fetchSupplyQualityReport } = this.props;

    if (exists(date))
      fetchSupplyQualityReport(
        date.toDate().getFullYear(),
        date.toDate().getMonth()
      );
  };

  handleSupplyChange = supply => {
    let { changeSupplySelection } = this.props;
    if ((exists(supply) && supply === "TR1") || supply === "TR2")
      changeSupplySelection(supply);
  };

  renderNavBar = () => {
    let { t, classes, selectedDate, supplyQualityReport } = this.props;

    let now = new Date(Date.now());

    return (
      <Paper className={classes.appBar} color="default">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <DatePicker
              views={["year", "month"]}
              label={t("reportsEnergyReportDateTimePickerTitle")}
              minDate={new Date("2019-01-01")}
              maxDate={new Date(now.getFullYear(), now.getMonth() + 1)}
              value={selectedDate}
              onChange={date => this.handleDateChange(date)}
              animateYearScrolling
            />
          </Grid>
          <Grid item>
            <form>
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel htmlFor="selected-supply">
                  {t("reportsSupplyQualitySupplySelectionTitle")}
                </InputLabel>
                <Select
                  value={
                    supplyQualityReport.selectedSupply
                      ? supplyQualityReport.selectedSupply
                      : ""
                  }
                  onChange={event =>
                    this.handleSupplyChange(event.target.value)
                  }
                >
                  <MenuItem value={"TR1"}>
                    {t("reportsSupplyQualitySupplySelectionTR1")}
                  </MenuItem>
                  <MenuItem value={"TR2"}>
                    {t("reportsSupplyQualitySupplySelectionTR2")}
                  </MenuItem>
                </Select>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  renderReport = () => {
    let { supplyQualityReport } = this.props;

    if (!existsAndIsNotEmpty(supplyQualityReport.data)) return null;

    let selectedSupply = supplyQualityReport.selectedSupply;

    return (
      <React.Fragment>
        <Grid item>
          <SupplyQualityReportTransformerComponent
            supplyName={selectedSupply}
          />
        </Grid>
        <Grid item>
          <SupplyQualityReportCurrentsComponent supplyName={selectedSupply} />
        </Grid>
        <Grid item>
          <SupplyQualityReportTHDComponent supplyName={selectedSupply} />
        </Grid>
        <Grid item>
          <SupplyQualityReportInfeedsTHDComponent
            supplyName={selectedSupply}
            phaseNumber={"L1"}
            infeeds={infeeds[selectedSupply]}
          />
        </Grid>
        <Grid item>
          <SupplyQualityReportInfeedsTHDComponent
            supplyName={selectedSupply}
            phaseNumber={"L2"}
            infeeds={infeeds[selectedSupply]}
          />
        </Grid>
        <Grid item>
          <SupplyQualityReportInfeedsTHDComponent
            supplyName={selectedSupply}
            phaseNumber={"L3"}
            infeeds={infeeds[selectedSupply]}
          />
        </Grid>
      </React.Fragment>
    );
  };

  render() {
    let { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item className={classes.navBarGridItem}>
          {this.renderNavBar()}
        </Grid>
        {this.renderReport()}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  let selectedDate = null;

  if (
    exists(state.supplyQualityReport.year) &&
    exists(state.supplyQualityReport.month)
  )
    selectedDate = new Date(
      state.supplyQualityReport.year,
      state.supplyQualityReport.month
    );
  return {
    supplyQualityReport: state.supplyQualityReport,
    selectedDate: selectedDate
  };
}

const mapDispatchToProps = {
  fetchSupplyQualityReport: fetchSupplyQualityReportActionCreator,
  changeSupplySelection: changeSupplySelectionActionCreator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(withSnackbar(SupplyQualityReportComponent))
  )
);
