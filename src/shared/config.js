module.exports = () => ({
  port: +process.env.PORT || 3001,
  dbUrl: process.env.MONGODB_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
