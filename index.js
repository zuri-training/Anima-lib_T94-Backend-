require("dotenv").config();
const connection= require("./src/db/index")
const app = require("./src/app");
const config = require("./src/shared/config");

connection();
const port = config().port;

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
