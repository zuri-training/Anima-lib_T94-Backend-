module.exports = () => ({
  port: +process.env.PORT || 3001,
  dbUrl: process.env.MONGODB_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  sendgrid: {
    defaultFromEmail: process.env.SENDGRID_DEFAULT_FROM_EMAIL,
    defaultFromName: process.env.SENDGRID_DEFAULT_FROM_NAME,
    key: process.env.SEND_GRID_API_KEY,
  },
  uiUrl: process.env.UI_URL,
});
