const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },

    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Maschio", "Femmina", "Altro"],
    },
    housingType: {
      type: String,
      enum: ["Appartamento", "Casa con giardino", "Casa senza giardino"],
      required: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    animals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "animal",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("user", UserSchema, "users");
