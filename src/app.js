const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const route = require("./routes");

const app = express();


// middlewares
app.use(cors("*"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(morgan("dev"));
app.use(route);




module.exports = app;