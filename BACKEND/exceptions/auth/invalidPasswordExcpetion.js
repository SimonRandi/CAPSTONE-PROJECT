const HTTPSError = require("../index");

class InvalidPasswordException extends HTTPSError {
  constructor(
    message = "Invalid or missing credenitlas",
    statusCode = 401,
    error = "Please provide a valid email or password"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = InvalidPasswordException;
