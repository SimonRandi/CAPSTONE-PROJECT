const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
      enum: ["Cane", "Gatto"],
    },
    race: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
      enum: ["Small", "Medium", "Large", "Giant"],
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    bio: {
      type: String,
      required: true,
      maxlength: 500,
    },
    food: {
      type: String,
      enum: ["WetFood", "DryFood", "Mixed", "Other"],
      default: "DryFood",
    },
    isVaccinated: {
      type: Boolean,
      default: false,
    },
    hasPedigree: {
      type: Boolean,
      default: false,
    },
    isSterilized: {
      type: Boolean,
      default: false,
    },

    isAdopted: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
    },
    image: {
      type: [String],
      default: "https://picsum.photos/200/200",
    },
    location: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      region: { type: String, required: true },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },

  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("animal", AnimalSchema, "animals");
