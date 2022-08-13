const JWT = require("jsonwebtoken");
const config = require("../shared/config");
const ConflictException = require("../shared/http-exceptions/conflict.exception");
const UnauthorizedException = require("../shared/http-exceptions/unauthorized.exception");
const userService = require("./user.service");

module.exports = {
  async login(params) {
    const user = await userService.findSingleUser({
      email: params.email.trim().toLowerCase(),
    });
    const unauthorizedException = new UnauthorizedException(
      "invalid credentials"
    );
    if (!user) {
      throw unauthorizedException;
    }

    const passwordValid = await user.validatePassword(params.password);
    if (!passwordValid) {
      throw unauthorizedException;
    }

    return user;
  },

  authorize(user) {
    const { secret, expiresIn } = config().jwt;
    const timestamp = new Date().getTime();
    const payload = {
      sub: user._id,
      iat: timestamp,
      email: user.email,
    };
    const options = { expiresIn };
    const token = JWT.sign(payload, secret, options);

    return { user, token };
  },

  async register(params) {
    const { email } = params;
    const existingUser = await userService.findSingleUser({ email });
    if (existingUser) {
      throw new ConflictException("email already exists");
    }

    const user = await userService.createSingleUser(params);
    const authorizedUser = this.authorize(user);

    return authorizedUser;
  },
};
