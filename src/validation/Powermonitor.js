import Joi from "joi-browser";

export const recipientSchema = Joi.string()
  .email()
  .label("recipient");

export const settingsSchema = Joi.object().keys({
  activePowerLimitAlarm: Joi.number()
    .min(0.001)
    .max(1000000)
    .label("Alarm limit"),
  activePowerLimitWarning: Joi.number()
    .min(0.001)
    .max(1000000)
    .label("Warning limit"),
  trafoPowerLosses: Joi.number()
    .min(0)
    .max(1000)
    .label("Trafo power losses"),
  active: Joi.boolean(),
  sendingEventsEnabled: Joi.boolean(),
  sendingEmailsEnabled: Joi.boolean(),
  recipients: Joi.array()
    .items(recipientSchema)
    .label("Recipients array")
});
