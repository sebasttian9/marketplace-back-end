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

const byIdUsuarioInWishlist = async (id_usuario) => {
  try {
    // const userWishlistQuery ="SELECT p.* FROM tbl_productos p INNER JOIN tbl_productos_favoritos fav ON p.id_producto = fav.producto_id INNER JOIN tbl_usuarios u ON fav.usuario_id = u.id_usuario WHERE u.email = $1;";
    const userWishlistQuery =`select a.*, b.id_prod_favorito from tbl_productos a 
                              INNER JOIN tbl_productos_favoritos b on a.id_producto = b.producto_id
                              INNER JOIN tbl_usuarios c on b.usuario_id = c.id_usuario
                              WHERE c.id_usuario = $1;`;
    const wishlistValues = [id_usuario];
    const response = await pool.query(userWishlistQuery, wishlistValues);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const DeleteWishlistItem = async (id) => {
  //Requiere una autorización previa en Controlador
  try {
    const deleteWishlistQuery =
      "DELETE FROM tbl_productos_favoritos WHERE id_prod_favorito = $1;";
      const wishlistValues = [id];
    const response = await pool.query(deleteWishlistQuery, wishlistValues);
    // console.log(response)
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { WishlistRegister, byIdUsuarioInWishlist, DeleteWishlistItem };
