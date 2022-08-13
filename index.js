require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/db/connect-db");
const config = require("./src/shared/config");

connectDb();
const port = config().port;

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
