const HTTPSError = require("../index");

class UserNotFoundException extends HTTPSError {
  constructor(
    message = "User not found",
    statusCode = 404,
    error = "The requested User is not found!!"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = UserNotFoundException;
