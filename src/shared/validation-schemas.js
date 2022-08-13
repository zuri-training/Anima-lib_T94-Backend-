const Joi = require("joi");

const format = {
  email: Joi.string().trim().email(),
  password: Joi.string().min(8),
  firstName: Joi.string(),
  lastName: Joi.string(),
};

exports.LoginValidationSchema = Joi.object({
  email: format.email.required(),
  password: Joi.string().required(),
});

exports.RegisterValidationSchema = Joi.object({
  email: format.email.required(),
  password: format.password.required(),
  firstName: format.firstName.required(),
  lastName: format.lastName.required(),
});
