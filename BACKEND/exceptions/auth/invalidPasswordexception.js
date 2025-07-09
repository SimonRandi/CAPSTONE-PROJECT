const HTTPSError = require("../index");

class invalidPasswordException extends HTTPSError {
  constructor(
    message = "AInvalid password or email provided",
    statusCode = 401,
    error = "Please provide a valid credential"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = invalidPasswordException;
