const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const userService = require("../../services/user.service");
const config = require("../config");
const UnauthorizedException = require("../http-exceptions/unauthorized.exception");

const { secret } = config().jwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const jwtStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
  userService
    .findSingleUser({ _id: payload.sub })
    .then((user) => {
      if (user) {
        done(null, user);
        return;
      }

      throw new UnauthorizedException();
    })
    .catch(done);
});

module.exports = jwtStrategy;
