const mongoose = require("mongoose");
const config = require("../shared/config");

module.exports = () => {
  return mongoose
    .connect(config().dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => {
      console.log("Database Connected");

      return connection;
    })
    .catch((error) => console.log(error));
};
