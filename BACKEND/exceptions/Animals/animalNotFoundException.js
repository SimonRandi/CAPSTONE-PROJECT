const HTTPSError = require("../index");

class AnimalsNotFoundException extends HTTPSError {
  constructor(
    message = "Animals not found",
    statusCode = 404,
    error = "The requested Animal is not found!!"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = AnimalsNotFoundException;
