import { validationResult } from "express-validator";

const validationHelper = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(403).json(error);
  }
};

export { validationHelper };
