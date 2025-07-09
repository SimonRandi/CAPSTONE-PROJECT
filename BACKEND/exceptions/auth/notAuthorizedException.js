const HTTPSError = require("../index");

class NotAuthorizedException extends HTTPSError {
  constructor(
    message = "You are not authorized",
    statusCode = 401,
    error = "Please authorized yourself"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = NotAuthorizedException;
