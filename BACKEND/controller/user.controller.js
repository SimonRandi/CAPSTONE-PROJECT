const userService = require("../service/user.service");
const emailService = require("../service/email.service");
const userNotFoundException = require("../exceptions/user/userNotFoundException");
const jwt = require("jsonwebtoken");

const email = new emailService();

const findAll = async (request, response, next) => {
  try {
    const { page = "1", pageSize = 10 } = request.query;

    const { totalPages, totalusers, users } = await userService.findAll(
      page,
      pageSize
    );

    if (!users) {
      throw new userNotFoundException();
    }

    response.status(200).send({
      statusCode: 200,
      message: "utente trovato",
      page,
      pageSize,
      totalusers,
      totalPages,
      users,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({
      statusCode: 500,
      error: error.message,
    });
  }
};

const createUser = async (request, response, next) => {
  try {
    const body = request.body;
    const imageUrl = request.file?.path;

    const userData = {
      ...body,
      image: imageUrl || null,
    };

    const { userToSave } = await userService.createUser(userData);
    const { password, ...userWithoutPassword } = await userToSave.toObject();
    if (userWithoutPassword.dateOfBirth) {
      const dob = new Date(userWithoutPassword.dateOfBirth);
      userWithoutPassword.dateOfBirth = dob.toLocaleDateString("it-IT");
    }

    const token = jwt.sign(
      { email: userToSave.email },
      process.env.EMAIL_SECRET,
      { expiresIn: "4h" }
    );

    const verificationLink = `${process.env.CLIENT_BASE_URL}/verify-email?token=${token}`;

    await email.send(
      userWithoutPassword.email,
      "Conferma la tua email - AnimalRanch",
      `Ciao ${userToSave.firstName},<br><br>
      Grazie per esserti registrato su <strong>AnimalRanch</strong>!<br><br>
      Per completare la registrazione, clicca sul link qui sotto per confermare la tua email:<br><br>
      <a href="${verificationLink}">Verifica la tua Email</a><br><br>
      Se non hai richiesto questa registrazione, ignora questa email.<br><br>
      <em>Il team di AnimalRanch</em>`
    );

    response.status(201).send({
      statusCode: 201,
      message:
        "Utente creato con successo. Verifica l'email per attivare l'account.",
      userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({
      statusCode: 500,
      error: error.message,
    });
  }
};

const getMyProfile = async (request, response, next) => {
  try {
    const userId = request.user.id;
    const user = await userService.getMyProfile(userId);

    if (!user) {
      return response.status(404).send({
        statusCode: 404,
        message: "Utente non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Utente recuperato con successo",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { body, file } = request;

    if (file) {
      body.image = file.path;
    }

    const userToUpdate = await userService.updateUser(body, id);

    if (!userToUpdate) {
      throw new userNotFoundException();
    }

    response.status(200).send({
      statusCode: 200,
      message: "Utente modificato con successo",
      userToUpdate,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (request, response, next) => {
  try {
    const { id } = request.params;
    const userToDelete = await userService.deleteUser(id);

    if (!userToDelete) {
      throw new userNotFoundException();
    }

    response.status(200).send({
      statusCode: 200,
      message: "Utente eliminato con successo",
      userToDelete,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  findAll,
  getMyProfile,
  updateUser,
  deleteUser,
};
