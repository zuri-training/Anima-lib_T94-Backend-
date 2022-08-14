const JWT = require("jsonwebtoken");
const config = require("../shared/config");
const BadRequestException = require("../shared/http-exceptions/bad-request.exception");
const ConflictException = require("../shared/http-exceptions/conflict.exception");
const UnauthorizedException = require("../shared/http-exceptions/unauthorized.exception");
const emailService = require("./email.service");
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

  async resetPassword(params) {
    const { resetCode, password } = params;
    const user = await userService.findSingleUser({
      passwordResetCode: resetCode,
    });
    if (!user) {
      throw new BadRequestException("invalid reset code");
    }

    user.password = password;

    await user.save();
    await userService.updateSingleUser(
      { _id: user.id },
      { $unset: { passwordResetCode: "" } }
    );
  },

  async forgotPassword(params) {
    const { email } = params;
    const user = await userService.findSingleUser({ email });
    if (user) {
      const { email, firstName, lastName } = user;
      const passwordResetCode = Math.random().toString(32).substring(2);

      user.passwordResetCode = passwordResetCode;
      await user.save();

      const name = `${firstName} ${lastName}`;
      const { uiUrl } = config();
      const resetLink = `${uiUrl}/reset-password?code=${passwordResetCode}`;

      await emailService.sendMail({
        to: { email, name },
        subject: "Reset Password",
        html: `<h3>Hi ${name}</h3><p>Click the link below to reset your password</p><a href="${resetLink}">Reset password</a><p>Cannot click the link above? Copy it from below and paste into your browser</p><p>${resetLink}</p>`,
      });
    }
  },
};
