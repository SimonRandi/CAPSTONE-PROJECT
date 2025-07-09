const { response } = require("express");
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

const findAll = async (page, pageSize) => {
  const users = await User.find()
    .populate("animals", "name species age")
    .limit(pageSize)
    .skip((page - 1) * pageSize);

  const totalUsers = await User.countDocuments();
  const totalPages = Math.ceil(totalUsers / pageSize);

  return {
    page,
    pageSize,
    totalUsers,
    totalPages,
    users,
  };
};

const updateUser = async (payload, id) => {
  const option = { new: true, runValidators: true };
  return User.findByIdAndUpdate(id, payload, option);
};

const getMyProfile = async (id) => {
  const user = await User.findById(id).select("-password");
  return user;
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const createUser = async (body) => {
  const alreadyExistUser = await User.findOne({ email: body.email });

  if (alreadyExistUser) {
    const error = new Error("Email già utilizzata");
    error.statusCode = 409;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const newUser = new User({
    ...body,
    password: hashedPassword,
  });

  const userToSave = await newUser.save();

  return { userToSave };
};

module.exports = {
  createUser,
  findAll,
  getMyProfile,
  updateUser,
  deleteUser,
};
