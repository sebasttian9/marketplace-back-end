import pool from "../../../../config/db/conectionDb.js";
import format from "pg-format";

const WishlistRegister = async (idProduct, idUser) => {
  try {
    // Validar los usuarios y productos
    const wishlistValues = [idProduct, idUser];
    const wishlistQuery =
      "INSERT INTO tbl_productos_favoritos (id_prod_favorito,producto_id,usuario_id) values (DEFAULT, $1, $2) RETURNING *";
    const response = await pool.query(wishlistQuery, wishlistValues);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const byEmailInWishlist = async (email) => {
  try {
    const userWishlistQuery =
      "SELECT p.* FROM tbl_productos p INNER JOIN tbl_productos_favoritos fav ON p.id_producto = fav.producto_id INNER JOIN tbl_usuarios u ON fav.usuario_id = u.id_usuario WHERE u.email = $1;";
    const response = await pool.query(userWishlistQuery, email);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const DeleteWishlistItem = async (SKU) => {
  //Requiere una autorización previa en Controlador
  try {
    const deleteWishlistQuery =
      "DELETE FROM tbl_productos_favoritos WHERE producto_id = (SELECT id_producto FROM tbl_productos WHERE SKU = $1);";
    const response = await pool.query(deleteWishlistQuery, SKU);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export { WishlistRegister, byEmailInWishlist, DeleteWishlistItem };
