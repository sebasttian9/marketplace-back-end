import ERRORS from "../helpers/errors.js";

const findError = (code) => {
  return ERRORS.filter((err) => err.code == code);
};

const actionInterpreter = (base, action) => {
  switch (action) {
    case "add":
      return base + 1;
    case "subt":
      return base - 1;
    default:
      throw new Error("Invalid action, try to use add or subt");
  }
};

const getTax = (price) => {
  return [price, price * 0.19, price * 1.19];
};

export { findError, actionInterpreter, getTax };
