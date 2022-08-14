const { Router } = require("express");
const authController = require("../../controllers/auth.controller");
const ValidationException = require("../../shared/http-exceptions/validation.exception");
const { LocalAuthGuard } = require("../../shared/passport/passport-setup");
const {
  LoginValidationSchema,
  RegisterValidationSchema,
  ResetPasswordValidation,
  ForgotPasswordValidation,
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
authRoutes.post(
  "/reset-password",
  ValidationException.validate({ body: ResetPasswordValidation }),
  authController.resetPassword
);
authRoutes.post(
  "/forgot-password",
  ValidationException.validate({ body: ForgotPasswordValidation }),
  authController.forgotPassword
);

module.exports = authRoutes;
