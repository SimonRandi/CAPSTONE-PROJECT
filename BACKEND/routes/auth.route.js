const express = require("express");
const auth = express.Router();

const authController = require("../controller/auth.controller");

auth.get("/verify-email", authController.verifyEmail);
auth.post("/login", authController.login);

module.exports = auth;
