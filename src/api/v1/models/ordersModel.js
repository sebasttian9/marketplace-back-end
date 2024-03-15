import pool from "../../../../config/db/conectionDb.js";
import format from "pg-format";

//Pedido mayor o general, que contiene los detalles
const TotalOrderRegister = async (idUser, orderNumber, status) => {
  try {
    // Validar si el Producto ya existe en la BD
    const orderValues = [idUser, orderNumber, status];
    const orderQuery =
      "INSERT INTO tbl_pedidos (id_pedido,usuario_id,numero_pedido,estado) values (DEFAULT, $1, $2, $3) RETURNING *";
    const response = await pool.query(orderQuery, orderValues);

    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const byOrderNumber = async (orderNumber) => {
  try {
    const orderNumberQuery =
      "SELECT * FROM tbl_pedidos WHERE numero_pedido = $1";
    const response = await pool.query(orderNumberQuery, orderNumber);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const byUserID = async (idUser) => {
  try {
    const idUserQuery = "SELECT * FROM tbl_pedidos WHERE usuario_id = $1";
    const queryParams = [idUser];
    const response = await pool.query(idUserQuery, queryParams);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const UpdateOrderStatus = async (orderNumber, status) => {
  try {
    const updateStatusValues = [status, orderNumber];
    const updateStatusQuery =
      "UPDATE tbl_pedidos SET estado = $1 WHERE numero_pedido = $2";
    const response = await pool.query(updateStatusQuery, updateStatusValues);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const DeleteOrder = async (orderNumber) => {
  //Requiere una autorización previa en Controlador
  try {
    const deleteOrderQuery = "DELETE FROM tbl_pedidos WHERE numero_pedido = $1";
    const values = [orderNumber];
    const response = await pool.query(deleteOrderQuery, values);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export {
  TotalOrderRegister,
  byOrderNumber,
  byUserID,
  UpdateOrderStatus,
  DeleteOrder,
};
