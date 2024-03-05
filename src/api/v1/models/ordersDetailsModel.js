import pool from "../../../../config/db/conectionDb.js";
import format from "pg-format";

//Pedido mayor o general, que contiene los detalles
const DetailOrderRegister = async (
  idOrder,
  idProduct,
  SKU,
  productQuantity,
  priceWithoutTaxes,
  taxes,
  priceWithTaxes
) => {
  try {
    // Validar si el Producto ya existe en la BD
    const singleOrderValues = [
      idOrder,
      idProduct,
      SKU,
      productQuantity,
      priceWithoutTaxes,
      taxes,
      priceWithTaxes,
    ];
    const singleOrderQuery =
      "INSERT INTO tbl_pedidos_detalle (id_detalle,pedido_id,producto_id,SKU,cantidad,neto,iva,total) values (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const response = await pool.query(singleOrderQuery, singleOrderValues);

    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const byTotalOrderNumberInDetail = async (totalOrderNumber) => {
  try {
    const TotalOrderNumberQuery =
      "SELECT * FROM tbl_pedidos_detalle WHERE pedido_id = $1";
    const response = await pool.query(TotalOrderNumberQuery, totalOrderNumber);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const bySKUInDetail = async (SKU) => {
  try {
    const SKUInDetailQuery = "SELECT * FROM tbl_pedidos_detalle WHERE SKU = $1";
    const response = await pool.query(SKUInDetailQuery, SKU);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

//Think about a posible Update/Put element for this table

const DeleteOrderDetail = async (SKU) => {
  //Requiere una autorización previa en Controlador
  try {
    const deleteOrderDetailQuery =
      "DELETE FROM tbl_pedidos_detalle WHERE SKU = $1";
    const response = await pool.query(deleteOrderDetailQuery, SKU);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export {
  DetailOrderRegister,
  bySKUInDetail,
  byTotalOrderNumberInDetail,
  DeleteOrderDetail,
};
