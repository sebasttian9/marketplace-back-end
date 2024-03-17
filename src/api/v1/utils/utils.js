import ERRORS from "../helpers/errors.js";

const findError = (code) => {
  return ERRORS.filter((err) => err.code == code);
};

const stockActionInterpreter = (base, payload, action) => {
  if (payload <= 0) {
    throw new Error("Invalid payload to operate with the base");
  }
  switch (action) {
    case "add":
      return base + payload;
    case "subt":
      return base - payload;
    default:
      throw new Error("Invalid action, try to use add or subt");
  }
};

const statusOrderInterpreter = (status, action) => {
  const statusArray = ["unavailable", "available", "unpaid", "purchased"];
  let actualStatusIndex;
  try {
    actualStatusIndex = statusArray.findIndex((item) => item === status);
    if (actualStatusIndex === -1) {
      throw new Error("Invalid status");
    }
  } catch (error) {
    throw new Error("Invalid status");
  }
  switch (action) {
    case "proceed":
      if (actualStatusIndex < 3) {
        return statusArray[actualStatusIndex + 1];
      } else {
        throw new Error(
          "Cannot proceed from 'purchased' status, it's the final step"
        );
      }
    case "cancel":
      return statusArray[1];
    case "stop":
      return statusArray[0];
    default:
      throw new Error("Invalid action");
  }
};

const getTax = (price, quantity = 1) => {
  return [price * quantity, price * quantity * 0.19, price * quantity * 1.19];
};

const getSKU = (title) => {
  return title.toUpperCase().slice(0, 3) + Math.random().toString().slice(2, 8);
};

export {
  findError,
  stockActionInterpreter,
  getTax,
  statusOrderInterpreter,
  getSKU,
};
