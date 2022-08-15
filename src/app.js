const cors = require("cors");
const express = require("express");
const helmet = require('helmet');
const morgan = require("morgan");

const HttpException = require("./shared/http-exceptions/http.exception");
const NotFoundException = require("./shared/http-exceptions/not-found.exception");
const userRoutes = require('./api/routes/users');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, 'Content-Type' : 'multipart/form-data' ,* "
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use(cors("*"));
app.use(helmet());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(morgan("dev"));

// Route Handlers
app.use('/api/v1/auth', userRoutes);
app.use(NotFoundException.handleUnknownRoute);
app.use(HttpException.handleHttpException);

module.exports = app;
