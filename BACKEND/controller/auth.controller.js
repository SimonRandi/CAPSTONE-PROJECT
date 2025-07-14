const AuthService = require("../service/auth.service");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(401).send({
        statusCode: 401,
        message: "Email o password non validi",
      });
    }

    if (!user.emailVerified) {
      return response.status(403).send({
        statusCode: 403,
        message: "Email non verificata. Controlla la tua casella di posta.",
      });
    }
    const { token } = await AuthService.login(email, password);

    response.header("authorization", token).status(200).send({
      statusCode: 200,
      message: "login avvenuto con successo",
      token,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({
      statusCode: 500,
      error: error.message,
    });
  }
};

const verifyEmail = async (request, response) => {
  const { token } = request.query;

  try {
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) return response.status(404).send("Utente non trovato");
    if (user.emailVerified) return response.send("Email già verificata.");

    user.emailVerified = true;
    await user.save();

    response.send("✅ Email verificata con successo!");
  } catch (error) {
    response.status(400).send("❌ Link non valido o scaduto.");
  }
};

module.exports = { login, verifyEmail };
