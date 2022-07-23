const { Router } = require("express");
const cats = require("./cats");

const route = Router();

route.use("/cats", cats);

module.exports = route;
