import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { reduxForm, Field } from "redux-form";
import { fetchPowermonitorPowerMonthDataActionCreator } from "../../actions/powermonitorActivePowerData";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Cached from "@material-ui/icons/Cached";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Powermonitor15MinTrend from "./Powermonitor15MinTrendComponent";
import Powermonitor15MinTable from "./Powermonitor15MinTableComponent";
import { exists } from "../../utils/utilities";
import moment from "moment";

const styles = theme => ({
  root: {
    height: "100% "
  },
  trendPaper: {
    height: "100%"
  },
  eventPaper: {
    height: "100%"
  },
  listHeader: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 15
  },
  trendGridItem: {
    padding: 25
  },
  mainGrid: {
    height: "100%"
  },
  refreshButtonGrid: {
    width: 100
  },
  refreshButtonGridItem: {},
  refreshButton: {
    margin: 10
  },
  selectYearInput: {
    width: 150,
    margin: 10
  },
  selectYearInputGridItem: {},
  selectMonthInput: {
    width: 150,
    margin: 10
  },
  selectMonthInputGridItem: {},
  maxValueInput: {
    width: 250,
    margin: 10
  },
  maxValueInputGridItem: {}
});

class Powermonitor15MinComponent extends Component {
  componentDidMount = async () => {
    let currentYear = new Date(Date.now()).getFullYear();
    let currentMonth = new Date(Date.now()).getMonth();

    //initializing form with values
    this.props.initialize({
      year: currentYear,
      month: currentMonth + 1
    });
  };

  handleRefreshButtonClicked = async () => {
    if (exists(this.props.formData.year) && exists(this.props.formData.month)) {
      //Moths are always stored +1 ! - have to add -1
      this.props.fetchPowermonitorPowerMonth(
        this.props.formData.year,
        this.props.formData.month - 1
      );
    }
  };

  getPossibleMonths() {
    //Calculating all possible years

    let yearSet = exists(this.props.formData) ? this.props.formData.year : null;

    let currentYear = new Date(Date.now()).getFullYear();
    let currentMonth = new Date(Date.now()).getMonth();

    let possibleMonths = [];

    //months are calculated form 0 - so we have to add 1
    if (yearSet === currentYear) {
      for (let i = 1; i <= currentMonth + 1; i++) {
        possibleMonths.push(i);
      }
    } else {
      for (let i = 1; i <= 12; i++) {
        possibleMonths.push(i);
      }
    }

    return possibleMonths;
  }

  getPossibleYears() {
    //Calculating all possible years
    let currentYear = new Date(Date.now()).getFullYear();

    let possibleYears = [];

    for (let i = 2018; i <= currentYear; i++) {
      possibleYears.push(i);
    }

    return possibleYears;
  }

  renderYearComboBox = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => {
    return (
      <FormControl className={this.props.classes.selectYearInput}>
        <InputLabel htmlFor="year-select">{label}</InputLabel>
        <Select {...input}>
          {this.getPossibleYears().map(year => {
            return (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  renderMonthComboBox = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => {
    return (
      <FormControl className={this.props.classes.selectMonthInput}>
        <InputLabel htmlFor="month-select">{label}</InputLabel>
        <Select {...input}>
          {this.getPossibleMonths().map(month => {
            return (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  renderMaximumLabel = (t, classes, powermonitorActivePower) => {
    let maximumText = exists(powermonitorActivePower.maxValue)
      ? `${moment(new Date(powermonitorActivePower.maxTime)).format(
          "YYYY-MM-DD HH:mm"
        )} - ${powermonitorActivePower.maxValue.toFixed(2)} kW`
      : "";

    return (
      <Grid className={classes.maxValueInputGridItem} item>
        <TextField
          id="maxValueInput"
          label={t("powermonitorPower15MaxValueLabel")}
          className={classes.maxValueInput}
          value={maximumText}
          onChange={() => {}}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    );
  };

  render() {
    let { t, classes, powermonitorActivePower } = this.props;

    return (
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={8}>
          <Paper className={classes.trendPaper}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              className={classes.mainGrid}
              wrap="nowrap"
            >
              <Grid item>
                <List>
                  <ListItem className={classes.listHeader}>
                    {t("powermonitorPower15TrendTitle")}
                  </ListItem>
                  <Divider />
                </List>
              </Grid>
              <Grid item xs={12} className={classes.trendGridItem}>
                <Powermonitor15MinTrend />
              </Grid>
              <Grid item>
                <List>
                  <Divider />
                </List>
                <form>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    wrap="nowrap"
                  >
                    {this.renderMaximumLabel(
                      t,
                      classes,
                      powermonitorActivePower
                    )}
                    <Grid item xs />
                    <Grid className={classes.selectMonthInputGridItem} item>
                      <Field
                        name="month"
                        type="text"
                        component={this.renderMonthComboBox}
                        label={t("powermonitorPower15MonthLabel")}
                      />
                    </Grid>
                    <Grid className={classes.selectYearInputGridItem} item>
                      <Field
                        name="year"
                        type="text"
                        component={this.renderYearComboBox}
                        label={t("powermonitorPower15YearLabel")}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      className={classes.refreshButtonGrid}
                    >
                      <Grid item className={classes.refreshButtonGridItem}>
                        <Button
                          variant="contained"
                          size="small"
                          className={classes.refreshButton}
                          onClick={() => this.handleRefreshButtonClicked()}
                        >
                          <Cached />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Powermonitor15MinTable />
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    powermonitor: state.powermonitor,
    powermonitorActivePower: state.powermonitorPowerDataReducer,
    formData: state.form.powermonitor15Min
      ? state.form.powermonitor15Min.values
        ? state.form.powermonitor15Min.values
        : {}
      : {}
  };
}

const mapDispatchToProps = {
  fetchPowermonitorPowerMonth: fetchPowermonitorPowerMonthDataActionCreator
};

const validate = formData => {
  if (!exists(formData.month)) return { month: "month should be defined" };
  if (!exists(formData.year)) return { year: "year should be defined" };
};

const formComponent = reduxForm({
  form: "powermonitor15Min",
  validate: validate
})(Powermonitor15MinComponent);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(formComponent)));
