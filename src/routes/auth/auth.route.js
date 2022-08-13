const { Router } = require("express");
const authController = require("../../controllers/auth.controller");
const ValidationException = require("../../shared/http-exceptions/validation.exception");
const { LocalAuthGuard } = require("../../shared/passport/passport-setup");
const {
  LoginValidationSchema,
  RegisterValidationSchema,
} = require("../../shared/validation-schemas");

const authRoutes = Router();

authRoutes.post(
  "/login",
  ValidationException.validate({ body: LoginValidationSchema }),
  LocalAuthGuard,
  authController.login
);
authRoutes.post(
  "/register",
  ValidationException.validate({ body: RegisterValidationSchema }),
  authController.register
);

module.exports = authRoutes;
