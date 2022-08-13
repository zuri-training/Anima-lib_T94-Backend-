const passport = require("passport");
const HttpException = require("../http-exceptions/http.exception");
const jwtStrategy = require("./jwt.strategy");
const localStrategy = require("./local.strategy");

passport.use(localStrategy);
passport.use(jwtStrategy);

const passportOptions = { session: false };

exports.LocalAuthGuard = HttpException.wrapHandler(
  passport.authenticate("local", passportOptions)
);
exports.JWTAuthGuard = passport.authenticate("jwt", passportOptions);
