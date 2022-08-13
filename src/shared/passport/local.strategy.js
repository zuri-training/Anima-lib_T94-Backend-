const LocalStrategy = require("passport-local");
const authService = require("../../services/auth.service");

const localStrategy = new LocalStrategy({ usernameField: "email" }, function (
  email,
  password,
  done
) {
  authService
    .login({ email, password })
    .then((user) => done(null, user))
    .catch(done);
});

module.exports = localStrategy;
