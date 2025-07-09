const sgMail = require("@sendgrid/mail");

require("dotenv").config();

class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  }

  async send(to, subject, message) {
    try {
      const messageOption = {
        to,
        from: "info.animalranch@gmail.com",
        subject,
        html: message,
      };
      await sgMail
        .send(messageOption)
        .then(() => console.log("Mail inviata!"))
        .catch((err) => {
          if (err.response) {
            console.error("Errore SendGrid:", err.response.body);
          } else {
            console.error(err);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = EmailService;
