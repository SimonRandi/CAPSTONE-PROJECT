const { body, validationResult } = require("express-validator");

const userBodyValidator = [
  body("firstName")
    .notEmpty()
    .isString()
    .withMessage("Il campo è obbligatorio"),

  body("lastName").notEmpty().isString().withMessage("Il campo è obbligatorio"),

  body("address").isArray({ min: 1 }).withMessage("L'indirizzo è obbligatorio"),

  body("address.*.city").notEmpty().withMessage("La città e obbligatoria"),

  body("address.*.zipCode")
    .notEmpty()
    .isInt()
    .withMessage("Lo zipCode è richiesto"),

  body("address.*.region").notEmpty().withMessage("La regione è obbligatoria"),

  body("address.*.country").notEmpty().withMessage("Il paese è obbligatorio"),

  body("address.*.street").notEmpty().withMessage("La via è obbligatoria"),

  body("address.*.streetNumber")
    .notEmpty()
    .isInt()
    .withMessage("Il campo è obbligatorio"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Il numero di telefono è obbligatorio")
    .isMobilePhone("it-IT")
    .withMessage("Numero di telefono non valido"),

  body("email")
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("L'email è obbligatoria"),

  body("password")
    .notEmpty()
    .withMessage("La password è obbligatoria")
    .isLength({ min: 6 })
    .withMessage("La password deve contenere almeno 6 caratteri"),

  body("dateOfBirth")
    .notEmpty()
    .isDate()
    .withMessage("La data di nascita è obbligatoria"),

  body("housingType")
    .notEmpty()
    .isIn(["Appartamento", "Casa con giardino", "Casa senza giardino"])
    .withMessage("Tipo di abitazione non valido"),
];

const userValidationMiddleware = async (request, response, next) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).send({
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  userBodyValidator,
  userValidationMiddleware,
};
