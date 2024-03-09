import { userBySKU } from "../models/usersModel";
//TO DO: Tiene que tener un isLogin previo
const isTheSameAuthor = async (req, res, next) => {
  try {
    let bySKUQuery;
    //1. Decide if the path is right
    const path = String(req.path);
    if (path.includes("post")) {
      bySKUQuery =
        "SELECT u.* FROM tbl_usuarios u INNER JOIN tbl_publicaciones pu ON u.id_usuario = pu.usuario_id INNER JOIN tbl_productos p ON pu.producto_id = p.id_producto WHERE p.sku = $1;";
    } else if (path.includes("fav")) {
      bySKUQuery =
        "SELECT u.* FROM tbl_usuarios u INNER JOIN tbl_productos_favoritos fav ON u.id_usuario = fav.usuario_id INNER JOIN tbl_productos p ON fav.producto_id = p.id_producto WHERE p.sku = $1;";
    } else {
      throw new Error("Use a valid argument as intermediate table");
    }
    //2. Obtain the variables to compare
    const { email: currentUserEmail } = req.user;
    const { SKU } = req.params;
    //2.5. Pass through the query
    const { email: originalUserEmail } = await userBySKU(SKU, bySKUQuery);
    //3. Compare
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
