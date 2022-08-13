const { Router } = require("express");
const authRoutes = require("./auth/auth.route");
const userRoutes = require("./user/user.route");

const routes = Router();

routes.use("/v1/auth", authRoutes);
routes.use("/v1/users", userRoutes);

module.exports = routes;
