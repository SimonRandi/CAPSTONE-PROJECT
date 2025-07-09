const index = require("../exceptions/index");
const mongoose = require("mongoose");

const errorHandler = (error, request, response, next) => {
  if (error instanceof index) {
    return response.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
      error: error.error,
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return response.status(400).send({
      statusCode: 400,
      message: "Mongoose error: object is invalid or incorrect!",
      error: error.error,
    });
  }

  response.status(500).send({
    statusCode: 500,
    message: "Internal server error",
    error: "An error has accurred , please try again",
  });
};

module.exports = errorHandler;
