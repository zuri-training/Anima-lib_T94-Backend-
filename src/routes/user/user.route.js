const { Router } = require("express");
const userController = require("../../controllers/user.controller");
const { JWTAuthGuard } = require("../../shared/passport/passport-setup");

const userRoutes = Router();

userRoutes.get("/me", JWTAuthGuard, userController.me);

module.exports = userRoutes;
