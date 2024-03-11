import { body } from "express-validator";
import { validationHelper } from "../src/helpers/validateHelper.js";

const validateLogin = [
  body("email").exists().notEmpty().isEmail(),
  body("password").exists().notEmpty(),
  (req, res, next) => {
    validationHelper(req, res, next);
  },
];

export { validateLogin };
