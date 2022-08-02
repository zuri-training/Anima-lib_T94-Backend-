const connection= require("./src/config/db")
const app = require("./src/app");
const config = require("./src/shared/config");

connection();
const port = config().port;

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
