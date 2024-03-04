import pool from "../../../../config/db/conectionDb.js";
import format from "pg-format";

const PostRegister = async (
  idUser,
  idProduct,
  descriptionPost,
  statePost = "true"
) => {
  try {
    // Validar si el Post ya existe en la BD
    const postValues = [idUser, idProduct, descriptionPost, statePost];
    const postQuery =
      "INSERT INTO tbl_publicaciones (id_publicacion,usuario_id,producto_id,descripcion,isOnline) values (DEFAULT, $1, $2, $3, $4) RETURNING *";
    const response = await pool.query(postQuery, postValues);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const byUser = async (idUser) => {
  try {
    const userQuery = "SELECT * FROM tbl_publicaciones WHERE usuario_id = $1";
    const response = await pool.query(userQuery, idUser);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const UpdatePostStatus = async (idPost) => {
  try {
    // Probar si funciona el NOT
    const updatePostQuery =
      "UPDATE tbl_publicaciones SET isOnline = NOT isOnline  WHERE id_publicacion = $1";
    const response = await pool.query(updatePostQuery, idPost);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const DeletePost = async (idPost) => {
  //Requiere una autorización previa en Controlador
  try {
    const deletePostQuery =
      "DELETE FROM tbl_publicaciones WHERE id_publicacion = $1";
    const response = await pool.query(deletePostQuery, idPost);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export { PostRegister, byUser, DeletePost };
