const dotevn = require("dotenv");

dotevn.config();

module.exports = () => ({
  port: +process.env.PORT || 3001,
});
