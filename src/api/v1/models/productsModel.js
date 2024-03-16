import pool from "../../../../config/db/conectionDb.js";
import format from "pg-format";
import { stockActionInterpreter } from "../utils/utils.js";

const ProductRegister = async (
  SKU,
  brand,
  title,
  description,
  price,
  stock,
  state,
  id_usuario
) => {
  try {
    // Validar si el Producto ya existe en la BD
    const productValues = [SKU, brand, title, description, price, stock, state,id_usuario];
    const productQuery =
      "INSERT INTO tbl_productos (id_producto,SKU,marca_producto,nombre,descripcion,precio_lista,stock,usado,usuario_id) values (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    const response = await pool.query(productQuery, productValues);

    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

// Get products

const getProducts = async (order_by = "nombre__ASC", limits = 3, page = 1) => {
  try {
    const [attribute, direction] = order_by.split("__");
    const offset = (page - 1) * limits;
    const formattedQuery = format(
      "SELECT (select count(1) from tbl_productos) total_general, * FROM tbl_productos ORDER BY %s %s LIMIT %s OFFSET %s",
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

const bySKU = async (SKU) => {
  try {
    const SKUQuery = "SELECT * FROM tbl_productos WHERE SKU = $1";
    const productValues = [SKU];
    const response = await pool.query(SKUQuery, productValues);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const getPostById = async (id) => {
  try {
    const SKUQuery = "SELECT * FROM tbl_productos WHERE usuario_id = $1";
    const productValues = [id];
    const response = await pool.query(SKUQuery, productValues);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};


const UpdateEntireProduct = async (
  SKU,
  brand,
  title,
  description,
  price,
  stock,
  state
) => {
  try {
    const updateEntireProductValues = [
      brand,
      title,
      description,
      price,
      stock,
      state,
      SKU,
    ];
    const updateEntireProductQuery =
      "UPDATE tbl_productos SET marca_producto = $1, nombre = $2, descripcion = $3, precio_lista = $4, stock = $5, usado = $6 WHERE SKU = $7 RETURNING *";
    const response = await pool.query(
      updateEntireProductQuery,
      updateEntireProductValues
    );
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const UpdateProductStock = async (SKU, stock, payload, action) => {
  try {
    const updatedStock = stockActionInterpreter(stock, payload, action);
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
  try {
    const deleteProductQuery = "DELETE FROM tbl_productos WHERE SKU = $1";
    const productValues = [SKU];
    const response = await pool.query(deleteProductQuery, productValues);
    // console.log(response)
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export {
  ProductRegister,
  bySKU,
  UpdateProductStock,
  DeleteProduct,
  getProducts,
  UpdateEntireProduct,
  getPostById
};
