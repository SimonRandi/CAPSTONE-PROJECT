const Animal = require("../models/AnimalSchema");
const User = require("../models/UserSchema");
const AnimalsNotFoundException = require("../exceptions/Animals/animalNotFoundException");
const NotAuthorizedException = require("../exceptions/auth/notAuthorizedException");

const findAllAnimals = async (page, pageSize, field, order) => {
  const animals = await Animal.find()
    .sort({
      [field]: order === "desc" ? -1 : 1,
    })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("user", "firstName email phoneNumber");

  const totalAnimals = await Animal.countDocuments();
  const totalPages = Math.ceil(totalAnimals / pageSize);

  return {
    page,
    pageSize,
    totalAnimals,
    totalPages,
    animals,
  };
};

const findById = async (id) => {
  return Animal.findById(id).populate("user", "firstName email phoneNumber");
};

const findBySpecies = async (species) => {
  return Animal.find({
    species: {
      $regex: species,
      $options: "i",
    },
  }).populate("user", "firstName email");
};

const findByAgeRange = async (age) => {
  return Animal.find({
    age: { $gte: Number(min), $lte: Number(max) },
    species: { $regex: "cane", $options: "i" },
  }).populate("user", "name email");
};

const findByAge = async (age, species) => {
  return Animal.find({
    age: Number(age),
    species: { $regex: `^${species}$`, $options: "i" },
  }).populate("user", "name email");
};

const findByBreed = async (breed, species) => {
  const query = {};

  if (breed) {
    query.breed = { $regex: breed, $options: "i" };
  }

  if (species) {
    query.species = { $regex: species, $options: "i" };
  }

  return await Animal.find(query).populate("user", "firstName email");
};

const findByRace = async (race) => {
  return Animal.find({
    race: {
      $regex: race,
      $options: "i",
    },
  }).populate("user", "firstName email");
};

const findByVaccinationStatus = async (status) => {
  const parsedStatus = status === "true";
  return Animal.find({ isVaccinated: parsedStatus }).populate(
    "user",
    "firstName email"
  );
};

const findByPedigreeStatus = async (status) => {
  const parsedStatus = status === "true";
  return Animal.find({ hasPedigree: parsedStatus }).populate(
    "user",
    "firstName email"
  );
};

const findBySterilizationStatus = async (status) => {
  const parsedStatus = status === "true";
  return Animal.find({ isSterilized: parsedStatus }).populate(
    "user",
    "firstName email"
  );
};

const findByUser = async (userId) => {
  return Animal.find({ user: userId }).populate("user", "firstName email");
};

const createAnimalsPost = async (body, userId) => {
  const newPost = new Animal({
    ...body,
    user: userId,
  });

  const postToSave = await newPost.save();
  const populatePost = await postToSave.populate("user", "firstName email");

  await User.findByIdAndUpdate(userId, {
    $push: { animals: postToSave._id },
  });

  return populatePost;
};

const deletePost = async (id, userId) => {
  const postToDelete = await Animal.findById(id);
  if (!postToDelete) {
    throw new AnimalsNotFoundException();
  }

  if (postToDelete.user.toString() !== userId) {
    throw new NotAuthorizedException();
  }
  await Animal.findByIdAndDelete(id);
  await User.findByIdAndUpdate(userId, {
    $pull: { animals: id },
  });
  return postToDelete;
};

const editPost = async (id, userId, payload) => {
  const post = await Animal.findById(id);

  if (!post) {
    throw new AnimalsNotFoundException();
  }

  if (post.user.toString() !== userId) {
    throw new NotAuthorizedException();
  }

  const option = { new: true };
  return await Animal.findByIdAndUpdate(id, payload, option);
};

module.exports = {
  findAllAnimals,
  createAnimalsPost,
  findById,
  findBySpecies,
  findByAgeRange,
  findByAge,
  findByBreed,
  findByRace,
  findByVaccinationStatus,
  findByPedigreeStatus,
  findBySterilizationStatus,
  findByUser,
  deletePost,
  editPost,
};
