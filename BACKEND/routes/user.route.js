const express = require("express");
const users = express.Router();
const userController = require("../controller/user.controller");
const verifyToken = require("../middleware/authMiddleware");
const { cloudUpload } = require("../multer/index");

users.get("/", userController.findAll);
users.get("/me", [verifyToken], userController.getMyProfile);
users.post(
  "/create",
  cloudUpload.single("profileImage"),
  userController.createUser
);
users.put("/edit/:id", userController.updateUser);
users.patch("/edit/:id", userController.updateUser);
users.delete("/delete/:id", userController.deleteUser);

module.exports = users;
