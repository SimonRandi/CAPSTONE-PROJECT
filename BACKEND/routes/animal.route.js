const express = require("express");
const animals = express.Router();
const animalController = require("../controller/animal.controller");
const verifyToken = require("../middleware/authMiddleware");
const { cloudUpload } = require("../multer/index");

animals.get("/", animalController.findAllAnimals);
animals.get("/my-animals", [verifyToken], animalController.findMyAnimals);
animals.get("/:id", animalController.findById);
animals.get("/search/species", animalController.findBySpecies);
animals.get("/search/age-range", animalController.findByAgeRange);
animals.get("/search/age", animalController.findByAge);
animals.get("/search/breed", animalController.findByBreed);
animals.get("/search/race", animalController.findByRace);
animals.get("/search/vaccinated", animalController.findByVaccinationStatus);
animals.get("/search/pedigree", animalController.findByPedigreeStatus);
animals.get("/search/sterlization", animalController.findBySterilizationStatus);
animals.get("/user/:userId", animalController.findByUser);
animals.post("/create", [verifyToken], animalController.createAnimalsPost);
animals.delete("/delete/:id", [verifyToken], animalController.deletePost);
animals.put("/edit/:id", [verifyToken], animalController.editPost);
animals.patch("/edit/:id", [verifyToken], animalController.editPost);

animals.post(
  "/cloud-upload",
  cloudUpload.array("images", 10),
  animalController.uploadAnimalImage
);

module.exports = animals;
