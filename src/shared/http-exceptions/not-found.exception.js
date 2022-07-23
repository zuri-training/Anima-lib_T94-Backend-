const { HTTP_STATUS } = require("../constants");
const HttpException = require("./http.exception");

class NotFoundException extends HttpException {
  constructor(message = "not found") {
    super(message, HTTP_STATUS.NOT_FOUND);
  }

  static handleUnknownRoute(req, _res, next) {
    next(new NotFoundException(`cannot [${req.method}] ${req.url}`));
  }
}

module.exports = NotFoundException;
