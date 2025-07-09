const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userNotFoundException = require("../exceptions/user/userNotFoundException");
const invalidPasswordException = require("../exceptions/auth/invalidPasswordException");
const emailNotVerifiedException = require("../exceptions/auth/emailNotVerifiedException");

const User = require("../models/UserSchema");

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new userNotFoundException();
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new invalidPasswordException();
  }

  if (!user.emailVerified) {
    throw new emailNotVerifiedException();
  }

  const token = jwt.sign(
    {
      id: user._id,
      firstName: user.firstName,
      surName: user.lastName,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return { token };
};

module.exports = { login };
