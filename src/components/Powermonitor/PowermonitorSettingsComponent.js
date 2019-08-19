import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm, FieldArray } from "redux-form";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { settingsSchema } from "../../validation/Powermonitor";
import {
  fetchPowermonitorSettingsActionCreator,
  changePowermonitorSettingsActionCreator
} from "../../actions/powermonitorData";
import {
  showNewRecipientDialogActionCreator,
  hideNewRecipientDialogActionCreator
} from "../../actions/newRecipientDialog";
import {
  resetPowermonitorFormActionCreator,
  removeRecipient
} from "../../actions/powermonitorForm";
import { exists, isEmpty } from "../../utils/utilities";
import Joi from "joi-browser";
import { ListItemText } from "@material-ui/core";
import PowermonitorNewRecipientDialog from "./PowermonitorNewRecipientDialogComponent";

const BlackCheckbox = withStyles({
  root: {
    "&$checked": {
      color: "black"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const styles = theme => ({
  settingsPaper: {
    backgroundColor: theme.palette.background.paper,
    heigh: "100%",
    minWidth: 400
  },
  mainGrid: {
    height: "calc(100% - 45px)"
  },
  settingsGrid: {
    height: "100%"
  },
  parametersGrid: {
    height: "100%",
    width: "100%",
    padding: 10
  },
  footer: {
    padding: 10,
    minHeight: 55
  },
  emailListFooter: {
    padding: 10,
    minHeight: 55
  },
  listHeader: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 15
  },
  mailHeader: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 15
  },
  form: {
    width: "100%",
    height: "100%",
    display: "block"
  },
  textField: {
    margin: theme.spacing(1)
  },
  checkbox: {
    margin: theme.spacing(1)
  },
  errorLabel: {
    color: "red"
  },
  emailListPaper: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    minWidth: 400
  },
  textFieldGrid: {
    maxWidth: 300
  }
});

class PowermonitorSettingsComponent extends Component {
  initialize() {
    //initializing form with values
    if (exists(this.props.powermonitor.settings)) {
      this.props.initialize(this.props.powermonitor.settings);
    }
  }

  resetForm() {
    this.props.resetForm();
  }

  renderHeader = () => {
    let { classes, t } = this.props;

    return (
      <Grid item>
        <List>
          <ListItem className={classes.listHeader}>
            {t("powermonitorSettingsTitle")}
          </ListItem>
          <Divider />
        </List>
      </Grid>
    );
  };

  renderMailHeader = () => {
    let { classes, t } = this.props;

    return (
      <Grid item>
        <List>
          <ListItem className={classes.listHeader}>
            {t("powermonitorSettingsEmailListTitle")}
          </ListItem>
          <Divider />
        </List>
      </Grid>
    );
  };

  //Method for checking if login button should be disabled
  checkConfirmButtonDisable = () => {
    return !isEmpty(validate(this.props.formData)) || !this.props.anyTouched;
  };

  fetchSettings = async () => {
    return this.props.fetchPowermonitorSettings();
  };

  handleResetButtonClick = async () => {
    try {
      await this.fetchSettings();
      await this.resetForm();
      await this.initialize();
    } catch (err) {
      console.log(err.message, err);
    }
  };

  handleAddRecipientButtonClick = async => {
    this.props.showNewRecipientDialog();
    this.props.touch();
  };

  componentDidMount = async () => {
    try {
      await this.fetchSettings();
      await this.initialize();
    } catch (err) {
      console.log(err.message, err);
    }
  };

  onSubmit = async formValues => {
    try {
      if (exists(this.props.formData)) {
        await this.props.changePowermonitorData(this.props.formData);
        await this.fetchSettings();
        await this.resetForm();
        await this.initialize();
      }
    } catch (err) {
      console.log(err.message, err);
    }
  };

  //Method for rendering single Field of form
  renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      wrap="nowrap"
      className={this.props.classes.textFieldGrid}
    >
      <TextField
        className={this.props.classes.textField}
        {...input}
        label={label}
        type={type}
        fullWidth
      />
      {touched &&
        ((error && (
          <Typography
            className={this.props.classes.errorLabel}
            variant="caption"
          >
            {error}
          </Typography>
        )) ||
          (warning && (
            <Typography
              className={this.props.classes.errorLabel}
              variant="caption"
            >
              {warning}
            </Typography>
          )))}
    </Grid>
  );

  renderEmailElement = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => {
    return <ListItemText>{input.value}</ListItemText>;
  };

  renderEmailTable = renderObject => {
    let fields = renderObject.fields;
    if (!exists(fields)) return null;
    return (
      <List>
        {fields.map((recipient, index) => {
          return (
            <ListItem key={index}>
              <Field
                name={recipient}
                type="text"
                component={this.renderEmailElement}
                label={recipient}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  this.props.removeRecipient(index);
                  this.props.touch();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    );
  };

  //Method for rendering single Field of form
  renderCheckbox = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div>
      <FormControlLabel
        control={
          <BlackCheckbox
            className={this.props.classes.checkbox}
            {...input}
            onChange={event => {
              input.onChange(event);
              this.props.touch();
            }}
          />
        }
        label={label}
      />
    </div>
  );

  render() {
    let { t, classes } = this.props;

    return (
      <React.Fragment>
        <PowermonitorNewRecipientDialog />
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Grid
            className={classes.mainGrid}
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item>
              <Paper className={classes.settingsPaper}>
                <Grid
                  container
                  direction="column"
                  justify="flex-end"
                  alignItems="stretch"
                  className={classes.settingsGrid}
                  wrap="nowrap"
                >
                  {this.renderHeader()}
                  <Grid item xs>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="stretch"
                      spacing={1}
                      className={classes.parametersGrid}
                    >
                      <Grid item xs={12}>
                        <Field
                          name="activePowerLimitWarning"
                          type="text"
                          component={this.renderField}
                          label={t("powermonitorSettingsWarningLimit")}
                        />
                        <Field
                          name="activePowerLimitAlarm"
                          type="text"
                          component={this.renderField}
                          label={t("powermonitorSettingsAlarmLimit")}
                        />
                        <Field
                          name="trafoPowerLosses"
                          type="text"
                          component={this.renderField}
                          label={t("powermonitorSettingsTrafoLossesLimit")}
                        />
                        <Field
                          name="active"
                          type="checkbox"
                          component={this.renderCheckbox}
                          label={t("powermonitorSettingsActive")}
                        />
                        <Field
                          name="sendingEventsEnabled"
                          type="checkbox"
                          component={this.renderCheckbox}
                          label={t("powermonitorSettingsSendingEventsEnabled")}
                        />
                        <Field
                          name="sendingEmailsEnabled"
                          type="checkbox"
                          component={this.renderCheckbox}
                          label={t("powermonitorSettingsSendingEmailsEnabled")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <List>
                    <Divider />
                  </List>
                  <Grid item className={classes.footer}>
                    <Button
                      type="submit"
                      disabled={this.checkConfirmButtonDisable()}
                    >
                      {t("powermonitorSettingsConfirmButton")}
                    </Button>
                    <Button onClick={this.handleResetButtonClick}>
                      {t("powermonitorSettingsResetButton")}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.emailListPaper}>
                <Grid
                  container
                  direction="column"
                  justify="flex-end"
                  alignItems="stretch"
                  className={classes.settingsGrid}
                  wrap="nowrap"
                >
                  {this.renderMailHeader()}
                  <Grid item xs>
                    <FieldArray
                      name="recipients"
                      component={this.renderEmailTable}
                    />
                  </Grid>
                  <List>
                    <Divider />
                  </List>
                  <Grid item className={classes.emailListFooter}>
                    <Button
                      onClick={() => this.handleAddRecipientButtonClick()}
                    >
                      {t("powermonitorSettingsAddRecipientButton")}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    powermonitor: state.powermonitor,
    newRecipientDialog: state.newRecipientDialog,
    formData: state.form.powermonitorSettings
      ? state.form.powermonitorSettings.values
        ? state.form.powermonitorSettings.values
        : {}
      : {}
  };
}

const mapDispatchToProps = {
  fetchPowermonitorSettings: fetchPowermonitorSettingsActionCreator,
  resetForm: resetPowermonitorFormActionCreator,
  removeRecipient: removeRecipient,
  changePowermonitorData: changePowermonitorSettingsActionCreator,
  showNewRecipientDialog: showNewRecipientDialogActionCreator,
  hideNewRecipientDialog: hideNewRecipientDialogActionCreator
};

const validate = formData => {
  let result = Joi.validate(formData, settingsSchema, { abortEarly: false });
  if (!result.error) return {};

  let objectToReturn = {};

  for (let detail of result.error.details) {
    objectToReturn[detail.path] = detail.message;
  }

  return objectToReturn;
};

const formComponent = reduxForm({
  form: "powermonitorSettings",
  validate: validate
})(PowermonitorSettingsComponent);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(formComponent)));
