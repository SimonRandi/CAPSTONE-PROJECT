const HTTPSError = require("../index");

class InvalidOrMissingTokenException extends HTTPSError {
  constructor(
    message = "Invalid or missing Token",
    statusCode = 401,
    error = "Please provide a valid Token"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = InvalidOrMissingTokenException;
