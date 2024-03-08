import { userBySKU } from "../models/usersModel";
//TO DO: Tiene que tener un isLogin previo
const isTheSameAuthor = async (req, res, next) => {
  try {
    const { email: currentUserEmail } = req.user;
    const { SKU } = req.params;
    const { email: originalUserEmail } = userBySKU(SKU);
    if (currentUserEmail !== originalUserEmail) {
      throw new Error("This user doesn't have the privilege needed");
    }
    next();
  } catch (error) {
    //TO DO: Agregar un helper para esto
    console.log("error", error);
  }
};

export { isTheSameAuthor };
