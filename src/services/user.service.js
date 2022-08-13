const UserModel = require("../db/models/user.model");

module.exports = {
  findSingleUser(query) {
    return UserModel.findOne(query);
  },

  createSingleUser(params) {
    return UserModel.create(params);
  },
};
