import pool from "../../../../config/db/conectionDb.js";
import format from "pg-format";

//Pedido mayor o general, que contiene los detalles
const ImagesRegister = async (idProduct, url) => {
  try {
    // Validar si el Producto ya existe en la BD
    const imagesValues = [idProduct, url];
    const imagesQuery =
      "INSERT INTO tbl_imagenes (id_img,producto_id,url) values (DEFAULT, $1, $2) RETURNING *";
    const response = await pool.query(imagesQuery, imagesValues);

    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const byProductIdInImages = async (idProduct) => {
  try {
    const imagesProductIdQuery =
      "SELECT * FROM tbl_imagenes WHERE producto_id = $1";
      const imagesValues = [idProduct];
    const response = await pool.query(imagesProductIdQuery, imagesValues);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const UpdateImage = async (idProduct, newUrl) => {
  try {
    const updateImageValues = [newUrl, idProduct];
    const updateImageQuery =
      "UPDATE tbl_imagenes SET url = $1 WHERE producto_id = $2";
    const response = await pool.query(updateImageQuery, updateImageValues);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};
const DeleteImage = async (idProduct) => {
  //Requiere una autorización previa en Controlador
  try {
    const deleteImageQuery = "DELETE FROM tbl_imagenes WHERE producto_id = $1";
    const imagesValues = [idProduct];
    const response = await pool.query(deleteImageQuery, imagesValues);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export { ImagesRegister, byProductIdInImages, UpdateImage, DeleteImage };
