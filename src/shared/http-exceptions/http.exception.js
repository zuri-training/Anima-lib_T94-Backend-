const { HTTP_STATUS } = require("../constants");

class HttpException extends Error {
  constructor(message, status) {
    super(message);

    this.status = status;
  }

  getResponse() {
    return [this.status, { message: this.message }];
  }

  static handleHttpException(error, _req, res, _next) {
    let status = HTTP_STATUS.SERVER_ERROR;
    let json = { message: "Something went wrong" };
    if (error instanceof HttpException) {
      [status, json] = error.getResponse();
    }

    res.status(status).json(json);
  }

  static wrapHandler(handler) {
    return async (req, res, next) => {
      try {
        await handler(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }
}

module.exports = HttpException;
