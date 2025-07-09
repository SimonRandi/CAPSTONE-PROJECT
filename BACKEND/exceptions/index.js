class HTTPSError extends Error {
  constructor(message, statusCode, error) {
    super(message);

    this.error = error;
    this.statusCode = statusCode;
  }
}

module.exports = HTTPSError;
