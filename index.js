const app = require("./src/app");
const config = require("./src/shared/config");

const port = config().port;

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
