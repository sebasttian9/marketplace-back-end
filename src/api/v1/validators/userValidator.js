import { body } from "express-validator";
import { validationHelper } from "../helpers/validateHelper.js";

const validateUser = [
  body("email").exists().notEmpty().isEmail(),
  body("password").exists().notEmpty(),
  body("nombre").exists().notEmpty(),
  body("imagen").exists().notEmpty(),
  (req, res, next) => {
    validationHelper(req, res, next);
  },
];

export { validateUser };
