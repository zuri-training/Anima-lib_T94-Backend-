const { HTTP_STATUS } = require("../constants");
const HttpException = require("./http.exception");

const formatJoiError = (errorDetails) => {
  const error = Array.isArray(errorDetails) ? errorDetails : [];

  return error.reduce((acc, cur) => {
    let temp = {};
    cur.path.reverse().forEach((path, i) => {
      if (i === 0) {
        temp[path] = cur.message.replace(/".*"/gi, path);
        return;
      }

      temp = { [`${path}`]: temp };
    });

    return Object.assign(acc, temp);
  }, {});
};

class ValidationException extends HttpException {
  constructor(message = "validation error", errors = {}) {
    super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY);
    this.errors = errors;
  }

  getResponse() {
    return [this.status, { message: this.message, errors: this.errors }];
  }

  static validate(schemas) {
    return (req, _res, next) => {
      const keys = Object.keys(schemas);
      const validations = keys.map(async (key) => {
        const payload = req[key];
        const schema = schemas[key];

        await schema.validateAsync(payload, { abortEarly: false });
      });

      Promise.all(validations)
        .then(() => next())
        .catch((error) => {
          next(
            new ValidationException(
              "validation error",
              formatJoiError(error.details)
            )
          );
        });
    };
  }
}

module.exports = ValidationException;
