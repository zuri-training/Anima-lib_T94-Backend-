const { HTTP_STATUS } = require("../constants");
const HttpException = require("./http.exception");

class ConflictException extends HttpException {
  constructor(message = "Conflict") {
    super(message, HTTP_STATUS.CONFLICT);
  }
}

module.exports = ConflictException;
