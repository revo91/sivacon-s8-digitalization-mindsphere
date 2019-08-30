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
  fetchInfeedQualityReportActionCreator,
  changeInfeedSelectionActionCreator
} from "../../../actions/infeedQualityReportData";
import { exists, existsAndIsNotEmpty } from "../../../utils/utilities";

import InfeedQualityReportInfeedComponent from "./InfeedQualityReportInfeedComponent";
import InfeedQualityReportCurrentsComponent from "./InfeedQualityReportCurrentsComponent";
import InfeedQualityReportTHDComponent from "./InfeedQualityReportTHDComponent";

const styles = theme => ({
  appBar: {
    padding: theme.spacing(2),
    width: "100%",
    backgroundColor: "#f5f5f5"
  },
  navBarGridItem: {}
});

class InfeedQualityReportComponent extends Component {
  componentDidMount = async () => {
    let { fetchInfeedQualityReport } = this.props;
    let now = new Date(Date.now());
    await fetchInfeedQualityReport(now.getFullYear(), now.getMonth());
  };

  handleDateChange = date => {
    let { fetchInfeedQualityReport } = this.props;

    if (exists(date))
      fetchInfeedQualityReport(
        date.toDate().getFullYear(),
        date.toDate().getMonth()
      );
  };

  handleInfeedChange = infeed => {
    let { changeInfeedSelection } = this.props;
    if (
      exists(infeed) &&
      (infeed === "1F1" ||
        infeed === "1F2" ||
        infeed === "1F3" ||
        infeed === "1F4" ||
        infeed === "1F5" ||
        infeed === "1F6" ||
        infeed === "1F7" ||
        infeed === "2F1" ||
        infeed === "2F2" ||
        infeed === "2F3" ||
        infeed === "2F4" ||
        infeed === "2F5" ||
        infeed === "2F6" ||
        infeed === "3F1" ||
        infeed === "3F2" ||
        infeed === "1FP1" ||
        infeed === "1FP2" ||
        infeed === "2FP1" ||
        infeed === "2FP2")
    )
      changeInfeedSelection(infeed);
  };

  renderNavBar = () => {
    let { t, classes, selectedDate, infeedQualityReport } = this.props;

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
              <FormControl style={{ minWidth: 400 }}>
                <InputLabel htmlFor="selected-infeed">
                  {t("reportsInfeedQualityInfeedSelectionTitle")}
                </InputLabel>
                <Select
                  value={
                    infeedQualityReport.selectedInfeed
                      ? infeedQualityReport.selectedInfeed
                      : ""
                  }
                  onChange={event =>
                    this.handleInfeedChange(event.target.value)
                  }
                >
                  <MenuItem value={"1F1"}>
                    {t("reportsInfeedQualityInfeedName_1F1")}
                  </MenuItem>
                  <MenuItem value={"1F2"}>
                    {t("reportsInfeedQualityInfeedName_1F2")}
                  </MenuItem>
                  <MenuItem value={"1F3"}>
                    {t("reportsInfeedQualityInfeedName_1F3")}
                  </MenuItem>
                  <MenuItem value={"1F4"}>
                    {t("reportsInfeedQualityInfeedName_1F4")}
                  </MenuItem>
                  <MenuItem value={"1F5"}>
                    {t("reportsInfeedQualityInfeedName_1F5")}
                  </MenuItem>
                  <MenuItem value={"1F6"}>
                    {t("reportsInfeedQualityInfeedName_1F6")}
                  </MenuItem>
                  <MenuItem value={"1F7"}>
                    {t("reportsInfeedQualityInfeedName_1F7")}
                  </MenuItem>
                  <MenuItem value={"2F1"}>
                    {t("reportsInfeedQualityInfeedName_2F1")}
                  </MenuItem>
                  <MenuItem value={"2F2"}>
                    {t("reportsInfeedQualityInfeedName_2F2")}
                  </MenuItem>
                  <MenuItem value={"2F3"}>
                    {t("reportsInfeedQualityInfeedName_2F3")}
                  </MenuItem>
                  <MenuItem value={"2F4"}>
                    {t("reportsInfeedQualityInfeedName_2F4")}
                  </MenuItem>
                  <MenuItem value={"2F5"}>
                    {t("reportsInfeedQualityInfeedName_2F5")}
                  </MenuItem>
                  <MenuItem value={"2F6"}>
                    {t("reportsInfeedQualityInfeedName_2F6")}
                  </MenuItem>
                  <MenuItem value={"3F1"}>
                    {t("reportsInfeedQualityInfeedName_3F1")}
                  </MenuItem>
                  <MenuItem value={"3F2"}>
                    {t("reportsInfeedQualityInfeedName_3F2")}
                  </MenuItem>
                  <MenuItem value={"1FP1"}>
                    {t("reportsInfeedQualityInfeedName_1FP1")}
                  </MenuItem>
                  <MenuItem value={"1FP2"}>
                    {t("reportsInfeedQualityInfeedName_1FP2")}
                  </MenuItem>
                  <MenuItem value={"2FP1"}>
                    {t("reportsInfeedQualityInfeedName_2FP1")}
                  </MenuItem>
                  <MenuItem value={"2FP2"}>
                    {t("reportsInfeedQualityInfeedName_2FP2")}
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
    let { infeedQualityReport } = this.props;

    if (!existsAndIsNotEmpty(infeedQualityReport.data)) return null;

    let selectedInfeed = infeedQualityReport.selectedInfeed;

    return (
      <React.Fragment>
        <Grid item>
          <InfeedQualityReportInfeedComponent infeedName={selectedInfeed} />
        </Grid>
        <Grid item>
          <InfeedQualityReportCurrentsComponent infeedName={selectedInfeed} />
        </Grid>
        <Grid item>
          <InfeedQualityReportTHDComponent infeedName={selectedInfeed} />
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
    exists(state.infeedQualityReport.year) &&
    exists(state.infeedQualityReport.month)
  )
    selectedDate = new Date(
      state.infeedQualityReport.year,
      state.infeedQualityReport.month
    );
  return {
    infeedQualityReport: state.infeedQualityReport,
    selectedDate: selectedDate
  };
}

const mapDispatchToProps = {
  fetchInfeedQualityReport: fetchInfeedQualityReportActionCreator,
  changeInfeedSelection: changeInfeedSelectionActionCreator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(withSnackbar(InfeedQualityReportComponent))
  )
);
