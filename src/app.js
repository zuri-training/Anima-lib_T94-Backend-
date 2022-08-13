const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes/routes");

const HttpException = require("./shared/http-exceptions/http.exception");
const NotFoundException = require("./shared/http-exceptions/not-found.exception");

const app = express();

app.use(cors("*"));
app.use(helmet());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(morgan("dev"));

// Route Handlers
app.use("/api", routes);
app.use(NotFoundException.handleUnknownRoute);
app.use(HttpException.handleHttpException);

module.exports = app;
