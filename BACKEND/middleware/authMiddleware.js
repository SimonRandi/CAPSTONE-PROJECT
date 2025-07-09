const jwt = require("jsonwebtoken");
const InvalidOrMissingTokenException = require("../exceptions/auth/invalidOrMissingTokenException");

const authenticate = (request, response, next) => {
  const Identity = request.headers.authorization;

  if (!Identity) {
    throw new InvalidOrMissingTokenException();
  }

  const token = Identity.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
