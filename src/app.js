const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const route = require("./routes");
const HttpException = require("./shared/http-exceptions/http.exception");
const NotFoundException = require("./shared/http-exceptions/not-found.exception");

const app = express();

app.use(cors("*"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(morgan("dev"));
app.use(route);
app.use(NotFoundException.handleUnknownRoute);
app.use(HttpException.handleHttpException);

module.exports = app;
