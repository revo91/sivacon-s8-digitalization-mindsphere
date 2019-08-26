import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form";
import { recipientSchema } from "../../validation/Powermonitor";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Grid
} from "@material-ui/core";

import {
  showNewRecipientDialogActionCreator,
  hideNewRecipientDialogActionCreator
} from "../../actions/newRecipientDialog";

import { resetNewRecipientFormActionCreator } from "../../actions/newRecipientForm";

import { insertNewRecipient } from "../../actions/powermonitorForm";

import { exists, isEmpty } from "../../utils/utilities";
import Joi from "joi-browser";

const styles = theme => {
  return {
    container: {
      width: 250,
      [theme.breakpoints.up("sm")]: {
        width: 300
      },
      display: "block"
    },
    form: {
      width: 250,
      [theme.breakpoints.up("sm")]: {
        width: 300
      },
      display: "block"
    },
    textField: {
      margin: theme.spacing(1)
    },
    errorLabel: {
      color: "red"
    }
  };
};

class PowermonitorNewRecipientDialogComponent extends Component {
  handleCancelButtonClick = () => {
    this.props.reset();
    this.props.hide();
  };

  onSubmit = async formValues => {
    try {
      if (exists(this.props.formData)) {
        await this.props.insertNewRecipient(this.props.formData.recipient);
      }
      this.props.reset();
      this.props.hide();
    } catch (err) {
      console.log(err.message, err);
    }
  };

  //Method for rendering single Field of form
  renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Grid item>
        <TextField
          className={this.props.classes.textField}
          {...input}
          placeholder={label}
          type={type}
          fullWidth
        />
      </Grid>
      {touched &&
        ((error && (
          <Grid item>
            <Typography
              className={this.props.classes.errorLabel}
              variant="caption"
            >
              {error}
            </Typography>
          </Grid>
        )) ||
          (warning && (
            <Grid item>
              <Typography
                className={this.props.classes.errorLabel}
                variant="caption"
              >
                {warning}
              </Typography>
            </Grid>
          )))}
    </Grid>
  );

  checkAddButtonDisable = () => {
    return (
      !isEmpty(validate(this.props.formData)) ||
      !exists(this.props.formData.recipient)
    );
  };

  render() {
    let { t, data, classes } = this.props;
    let { display } = data;

    return (
      <div>
        <Dialog
          open={display}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <form
            className={classes.form}
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <DialogTitle id="new-recipient-title">
              {t("powermonitorNewRecipientDialogTitle")}
            </DialogTitle>
            <DialogContent>
              <Field
                name="recipient"
                type="text"
                component={this.renderField}
                label={t("powermonitorNewRecipientDialogLabel")}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCancelButtonClick}>
                {t("powermonitorNewRecipientDialogCancelButton")}
              </Button>
              <Button type="submit" disabled={this.checkAddButtonDisable()}>
                {t("powermonitorNewRecipientDialogAddButton")}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    data: state.newRecipientDialog,
    formData: state.form.newRecipient
      ? state.form.newRecipient.values
        ? state.form.newRecipient.values
        : {}
      : {}
  };
}

const mapDispatchToProps = {
  show: showNewRecipientDialogActionCreator,
  hide: hideNewRecipientDialogActionCreator,
  insertNewRecipient: insertNewRecipient,
  reset: resetNewRecipientFormActionCreator
};

const validate = formData => {
  let result = Joi.validate(formData.recipient, recipientSchema, {
    abortEarly: false
  });
  if (!result.error) return {};

  let objectToReturn = {
    recipient: result.error.details[0].message
  };

  return objectToReturn;
};

const formComponent = reduxForm({
  form: "newRecipient",
  validate: validate
})(PowermonitorNewRecipientDialogComponent);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(formComponent)));
