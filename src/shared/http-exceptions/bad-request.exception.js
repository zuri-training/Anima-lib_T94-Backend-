const { HTTP_STATUS } = require("../constants");
const HttpException = require("./http.exception");

class BadRequestException extends HttpException {
  constructor(message = "bad request") {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

module.exports = BadRequestException;
