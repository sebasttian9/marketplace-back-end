import pool from "../../../../config/db/conectionDb.js";
import format from "pg-format";

const PostRegister = async (idUser, idProduct, statePost = "true") => {
  try {
    // Validar si el Post ya existe en la BD
    const postValues = [idUser, idProduct, statePost];
    const postQuery =
      "INSERT INTO tbl_publicaciones (id_publicacion,usuario_id,producto_id,isOnline) values (DEFAULT, $1, $2, $3) RETURNING *";
    const response = await pool.query(postQuery, postValues);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const GetAllPostsWithFilters = async (
  order_by = "nombre__ASC",
  limits = 3,
  page = 1
) => {
  try {
    const [attribute, direction] = order_by.split("__");
    const offset = (page - 1) * limits;
    const formattedQuery = format(
      "SELECT p.*, u.nombre AS nombre_vendedor FROM tbl_productos p INNER JOIN tbl_publicaciones pu ON p.id_producto = pu.producto_id INNER JOIN tbl_usuarios u ON pu.usuario_id = u.id_usuario ORDER BY %s %s LIMIT %s OFFSET %s;",
      attribute,
      direction,
      limits,
      offset
    );

    const response = await pool.query(formattedQuery);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const PostsByUserEmail = async (email) => {
  try {
    const userQuery =
      "SELECT p.* FROM tbl_productos p INNER JOIN tbl_publicaciones pu ON p.id_producto = pu.producto_id INNER JOIN tbl_usuarios u ON pu.usuario_id = u.id_usuario WHERE u.email = $1;";
    const response = await pool.query(userQuery, email);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const UpdatePostStatus = async (SKU) => {
  try {
    // Probar si funciona el NOT
    const updatePostQuery =
      "UPDATE tbl_publicaciones SET isOnline = NOT isOnline WHERE producto_id = (SELECT id_producto FROM tbl_productos WHERE SKU = $1);";
    const response = await pool.query(updatePostQuery, SKU);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const DeletePost = async (SKU) => {
  //Requiere una autorización previa en Controlador
  try {
    const deletePostQuery =
      "DELETE FROM tbl_publicaciones WHERE producto_id = (SELECT id_producto FROM tbl_productos WHERE SKU = $1);";
    const response = await pool.query(deletePostQuery, SKU);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export {
  PostRegister,
  PostsByUserEmail,
  UpdatePostStatus,
  DeletePost,
  GetAllPostsWithFilters,
};
