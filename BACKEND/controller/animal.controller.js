const animalService = require("../service/animal.service");
const AnimalsNotFoundException = require("../exceptions/Animals/animalNotFoundException");
const UserNotFoundException = require("../exceptions/user/userNotFoundException");
const Animal = require("../models/AnimalSchema");
const findAllAnimals = async (request, response, next) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      field = "name",
      order = "asc",
    } = request.query;

    const { totalPages, totalAnimals, animals } =
      await animalService.findAllAnimals(page, pageSize, field, order);

    response.status(200).send({
      statusCode: 200,
      page,
      pageSize,
      totalPages,
      totalAnimals,
      animals,
    });
  } catch (error) {
    next(error);
    message: error.message;
  }
};

const findMyAnimals = async (request, response, next) => {
  try {
    const userId = request.user.id;

    const animals = await Animal.find({ user: userId }).populate(
      "user",
      "firstName"
    );

    response.status(200).json({
      statusCode: 200,
      message: "Animali dell'utente recuperati con successo",
      animals,
    });
  } catch (error) {
    console.error("Errore nel recuperare i propri animali:", error);
    response.status(500).json({
      statusCode: 500,
      message: "Errore interno del server",
      error: error.message,
    });
  }
};

const findById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const animal = await animalService.findById(id);

    if (!animal) {
      throw new AnimalsNotFoundException();
    }

    response.status(200).send({
      statusCode: 200,
      message: "Animale trovato con successo",
      animal,
    });
  } catch (error) {
    next(error);
  }
};

const findBySpecies = async (request, response, next) => {
  try {
    const {
      species,
      page = 1,
      limit = 8,
      field = "name",
      order = "asc",
    } = request.query;

    if (!species) {
      return response.status(400).send({
        statusCode: 400,
        message: "Parametro species mancante.",
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const query = { species };

    const totalAnimals = await Animal.countDocuments(query);
    const totalPages = Math.ceil(totalAnimals / limitNum);

    const animals = await Animal.find(query)
      .populate("user", "firstName")
      .sort({ [field]: order === "asc" ? 1 : -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    return response.status(200).send({
      statusCode: 200,
      message: `Ecco tutti i Pet della specie ${species}`,
      currentPage: pageNum,
      totalPages,
      totalAnimals,
      animals,
    });
  } catch (error) {
    console.error("Errore in findBySpecies:", error);
    next(error);
  }
};

const findByRace = async (request, response, next) => {
  try {
    const {
      race,
      species,
      page = 1,
      limit = 8,
      field = "name",
      order = "asc",
    } = request.query;

    if (!race) {
      return response.status(400).send({
        statusCode: 400,
        message: "Il parametro 'race' è obbligatorio.",
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const query = {
      race: new RegExp(`^${race}$`, "i"),
      ...(species && { species: new RegExp(`^${species}$`, "i") }),
    };

    const totalAnimals = await Animal.countDocuments(query);
    const totalPages = Math.ceil(totalAnimals / limitNum);

    const animals = await Animal.find(query)
      .populate("user", "firstName")
      .sort({ [field]: order === "asc" ? 1 : -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    if (!animals || animals.length === 0) {
      throw new AnimalsNotFoundException();
    }

    response.status(200).send({
      statusCode: 200,
      message: `Ecco tutti i Pet di razza ${race}`,
      currentPage: pageNum,
      totalPages,
      totalAnimals,
      animals,
    });
  } catch (error) {
    next(error);
  }
};

const findByAgeRange = async (request, response, next) => {
  try {
    const { min, max } = request.query;

    if (!min || !max) {
      return response.status(400).send({
        statusCode: 400,
        message: "I parametri 'min' e 'max' sono obbligatori.",
      });
    }

    const animal = await animalService.findByAgeRange(min, max);
    if (!animal || animal.length === 0) {
      throw new AnimalsNotFoundException();
    }

    response.status(200).send({
      statusCode: 200,
      message: `Ecco tutti i Pet tra ${min} e ${max} anni`,
      animal,
    });
  } catch (error) {
    next(error);
  }
};
const findByAge = async (request, response, next) => {
  try {
    const { age, species, page = 1, limit = 8 } = request.query;

    if (!age || isNaN(age)) {
      return response.status(400).send({
        statusCode: 400,
        message: "Il parametro 'age' è obbligatorio e deve essere un numero.",
      });
    }

    const query = { age: Number(age) };
    if (species) {
      query.species = species;
    }

    const totalAnimals = await Animal.countDocuments(query);
    const totalPages = Math.ceil(totalAnimals / limit);

    const animals = await Animal.find(query)
      .populate("user", "firstName")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    if (!animals || animals.length === 0) {
      throw new AnimalsNotFoundException();
    }

    response.status(200).send({
      statusCode: 200,
      message: `Ecco tutti i Pet di età ${age} anni`,
      currentPage: Number(page),
      totalPages,
      totalAnimals,
      animals,
    });
  } catch (error) {
    next(error);
  }
};

const findByBreed = async (request, response, next) => {
  try {
    const {
      breed,
      species,
      page = 1,
      limit = 8,
      field = "name",
      order = "asc",
    } = request.query;

    const query = {};
    if (breed) query.breed = breed;
    if (species) query.species = species;

    const totalAnimals = await Animal.countDocuments(query);
    const totalPages = Math.ceil(totalAnimals / limit);

    const animals = await Animal.find(query)
      .populate("user", "firstName")
      .sort({ [field]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    response.status(200).send({
      statusCode: 200,
      message: `Ecco tutti i Pet di taglia ${breed}`,
      page: Number(page),
      totalPages,
      totalAnimals,
      animals,
    });
  } catch (error) {
    next(error);
  }
};

const findByVaccinationStatus = async (request, response, next) => {
  try {
    const { isVaccinated } = request.query;

    if (isVaccinated !== true || isVaccinated !== false) {
      return response.status(400).send({
        statusCode: 400,
        message: "Il paramettro deve essere o true o false",
      });
    }
    const animal = await animalService.findByVaccinationStatus(isVaccinated);
    if (!animal) {
      throw new AnimalsNotFoundException();
    }
    response.status(200).send({
      statusCode: 200,
      message: `Ecco tutti i Pet con vaccinazione ${isVaccinated}`,
      animal,
    });
  } catch (error) {
    next(error);
  }
};

const findByPedigreeStatus = async (request, response, next) => {
  try {
    const { hasPedigree } = request.query;

    if (hasPedigree !== true || hasPedigree !== false) {
      return response.status(400).send({
        statusCode: 400,
        message: "Il paramettro deve essere o true o false",
      });
    }

    const animal = await animalService.findByPedigreeStatus(hasPedigree);

    if (!animal) {
      throw new AnimalsNotFoundException();
    }
    response.status(200).send({
      statusCode: 200,
      message: `Ecco tutti i Pet con Pedigree ${hasPedigree}`,
      animal,
    });
  } catch (error) {
    next(error);
  }
};

const findBySterilizationStatus = async (request, response, next) => {
  try {
    const { isSterilized } = request.query;

    if (isSterilized !== true || isSterilized !== false) {
      return response.status(400).send({
        statusCode: 400,
        message: "Il paramettro deve essere o true o false",
      });
    }

    const animal = await animalService.findBySterilizationStatus(isSterilized);
    if (!animal) {
      throw new AnimalsNotFoundException();
    }
    response.status(200).send({
      statusCode: 200,
      message: `Ecco tutti i Pet con Sterilizzazione ${isSterilized}`,
      animal,
    });
  } catch (error) {
    next(error);
  }
};

const findByUser = async (request, response, next) => {
  try {
    const { userId } = request.params;

    if (!userId) {
      return response.status(400).send({
        statusCode: 400,
        message: "ID utente mancante",
      });
    }

    const animals = await animalService.findByUser(userId);

    if (!animals || animals.length === 0) {
      return response.status(404).send({
        statusCode: 404,
        message: "Nessun animale trovato per questo utente",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: `Trovati ${animals.length} animali per l'utente ${userId}`,
      animals,
    });
  } catch (error) {
    next(error);
  }
};

const createAnimalsPost = async (request, response, next) => {
  try {
    const { body } = request;
    const userId = request.user.id;

    if (!body || !userId) {
      return response.status(400).send({
        statusCode: 400,
        message: "Dati mancanti o utente non autenticato",
      });
    }

    const post = await animalService.createAnimalsPost(body, userId);

    response.status(201).send({
      statusCode: 201,
      message: "Annuncio creato con successo",
      post,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({
      statusCode: 500,
      error: error.message,
    });
  }
};

const deletePost = async (request, response, next) => {
  try {
    const { id } = request.params;
    const userId = request.user.id;
    const postToDelete = await animalService.deletePost(id, userId);
    if (!postToDelete) {
      return response.status(404).send({
        statusCode: 404,
        message: "post non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "post eliminato con successo",
    });
  } catch (error) {
    next(error);
  }
};

const editPost = async (request, response, next) => {
  try {
    const { id } = request.params;
    const userId = request.user.id;
    const updates = request.body;

    const updatedPost = await animalService.editPost(id, userId, updates);

    response.status(200).send({
      statusCode: 200,
      message: "Post aggiornato con successo",
      updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

const uploadAnimalImage = async (request, response, next) => {
  try {
    if (!request.files || request.files.length === 0) {
      return response
        .status(400)
        .json({ message: "Nessuna immagine caricata." });
    }

    const imageUrls = request.files.map((file) => file.path);

    return response.status(200).json({ images: imageUrls });
  } catch (error) {
    console.error("❌ Errore reale:", error);
    return response.status(500).send({
      error: error.message,
      stack: error.stack,
    });
  }
};

module.exports = {
  findAllAnimals,
  findMyAnimals,
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
  createAnimalsPost,
  deletePost,
  editPost,
  uploadAnimalImage,
};
