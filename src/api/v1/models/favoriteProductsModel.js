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

const byUserInWishlist = async (idUser) => {
  try {
    const userWishlistQuery =
      "SELECT * FROM tbl_productos_favoritos WHERE usuario_id = $1";
    const response = await pool.query(userWishlistQuery, idUser);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const DeleteWishlistItem = async (idWishlist) => {
  //Requiere una autorización previa en Controlador
  try {
    const deleteWishlistQuery =
      "DELETE FROM tbl_productos_favoritos WHERE id_prod_favorito = $1";
    const response = await pool.query(deleteWishlistQuery, idWishlist);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export { WishlistRegister, byUserInWishlist, DeleteWishlistItem };
