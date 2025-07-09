const HTTPSError = require("../index");

class emailNotVerifiedException extends HTTPSError {
  constructor(
    message = "This email is not verified",
    statusCode = 403,
    error = "Please verify your email"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = emailNotVerifiedException;
