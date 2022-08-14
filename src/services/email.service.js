const SendGrid = require("@sendgrid/mail");
const config = require("../shared/config");

const { key, defaultFromEmail, defaultFromName } = config().sendgrid;
SendGrid.setApiKey(key);

module.exports = {
  sendMail(mail) {
    const payload = {
      ...mail,
      from: {
        name: defaultFromName,
        email: defaultFromEmail,
      },
    };

    return SendGrid.send(payload);
  },
};
