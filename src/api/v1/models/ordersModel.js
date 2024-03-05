/* 

HAY QUE MODIFICAR TODO DE ACUERDO A LA LÓGICA FINAL

import pool from "../../../../config/db/conectionDb.js";
import format from "pg-format";

const TotalOrderRegister = async (
  SKU,
  marca_producto,
  nombre,
  descripcion,
  precio_lista,
  stock,
  usado
) => {
  try {
    // Validar si el Producto ya existe en la BD
    const productValues = [
      SKU,
      marca_producto,
      nombre,
      descripcion,
      precio_lista,
      stock,
      usado,
    ];
    const productQuery =
      "INSERT INTO tbl_productos (id_producto,SKU,marca_producto,nombre,descripcion,precio_lista,stock,usado) values (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const response = await pool.query(productQuery, productValues);

    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const bySKU = async (SKU) => {
  try {
    const SKUQuery = "SELECT * FROM tbl_productos WHERE SKU = $1";
    const response = await pool.query(SKUQuery, SKU);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const UpdateProductStock = async (SKU, stock, action) => {
  try {
    const updatedStock = actionInterpreter(stock, action);
    const updateProductValues = [updatedStock, SKU];
    const updateStockQuery =
      "UPDATE tbl_productos SET stock = $1 WHERE SKU = $2";
    const response = await pool.query(updateStockQuery, updateProductValues);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const DeleteProduct = async (SKU) => {
  //Requiere una autorización previa en Controlador
  try {
    const deleteProductQuery = "DELETE FROM tbl_productos WHERE SKU = $1";
    const response = await pool.query(deleteProductQuery, SKU);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export { ProductRegister, bySKU, UpdateProductStock, DeleteProduct };
 */
