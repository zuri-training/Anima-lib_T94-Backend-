const ResponseService = require("../services/response.service");
const { HTTP_STATUS } = require("../shared/constants");

module.exports = {
  me(req, res) {
    const { user } = req;

    ResponseService.json(res, HTTP_STATUS.OK, "current user", user);
  },
};
