const authService = require("../services/auth.service");
const ResponseService = require("../services/response.service");
const { HTTP_STATUS } = require("../shared/constants");
const HttpException = require("../shared/http-exceptions/http.exception");

module.exports = {
  login: HttpException.wrapHandler((req, res) => {
    const { user } = req;
    const authorizedUser = authService.authorize(user);

    ResponseService.json(
      res,
      HTTP_STATUS.OK,
      "login successful",
      authorizedUser
    );
  }),

  register: HttpException.wrapHandler(async (req, res) => {
    const authorizedUser = await authService.register(req.body);

    ResponseService.json(
      res,
      HTTP_STATUS.CREATED,
      "registration successful",
      authorizedUser
    );
  }),

  resetPassword: HttpException.wrapHandler(async (req, res) => {
    await authService.resetPassword(req.body);

    ResponseService.json(res, HTTP_STATUS.OK, "password reset successful");
  }),

  forgotPassword: HttpException.wrapHandler(async (req, res) => {
    await authService.forgotPassword(req.body);

    ResponseService.json(res, HTTP_STATUS.OK, "successful");
  }),
};
