import pool from "../../../../config/db/conectionDb.js";
import format from "pg-format";

//Pedido mayor o general, que contiene los detalles
const DetailOrderRegister = async (
  idOrder,
  idProduct,
  productQuantity,
  price
) => {
  try {
    // Validar si el Producto ya existe en la BD
    const singleOrderValues = [idOrder, idProduct, productQuantity, price];
    const singleOrderQuery =
      "INSERT INTO tbl_pedidos_detalle (id_detalle,pedido_id,producto_id,SKU,cantidad,precio_referencia) values (DEFAULT, $1, $2, $3, $4) RETURNING *";
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
      const detailsValues = [totalOrderNumber];
    const response = await pool.query(TotalOrderNumberQuery, detailsValues);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const byProductIdInDetail = async (productId, orderId) => {
  try {
    const detailsValues = [productId, orderId];
    const inDetailQuery =
      "SELECT * FROM tbl_pedidos_detalle WHERE producto_id = $1 AND pedido_id = $2";
    const response = await pool.query(inDetailQuery, detailsValues);
    if (response.rows.length > 0) {
      return response.rows[0];
    } else {
      // No se encontraron detalles para el producto y el pedido
      return null; // o puedes devolver un valor predeterminado, como un objeto vacío, según tus necesidades
    }
  } catch (error) {
    console.log(error);
  }
};
const byOrderDetailId = async (orderId) => {
  try {
    const inDetailQuery =
      "SELECT * FROM tbl_pedidos_detalle WHERE id_detalle = $1";
      const values = [orderId];
    const response = await pool.query(inDetailQuery, values);
    if (response.rows.length > 0) {
      return response.rows[0];
    } else {
      // No se encontraron detalles para el producto y el pedido
      return null; // o puedes devolver un valor predeterminado, como un objeto vacío, según tus necesidades
    }
  } catch (error) {
    console.log(error);
  }
};

//Think about a posible Update/Put element for this table
const UpdateOrderDetailQuantity = async (orderId, quantity) => {
  try {
    const updateProductValues = [quantity, orderId];
    const updateStockQuery =
      "UPDATE tbl_pedidos_detalle SET cantidad = $1 WHERE id_detalle = $2 RETURNING *";
    const response = await pool.query(updateStockQuery, updateProductValues);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const DeleteOrderDet = async (orderId) => {
  //Requiere una autorización previa en Controlador
  try {
    const deleteOrderDetailQuery =
      "DELETE FROM tbl_pedidos_detalle WHERE id_detalle = $1";
      const values = [orderId];
    const response = await pool.query(deleteOrderDetailQuery, values);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export {
  DetailOrderRegister,
  byProductIdInDetail,
  byTotalOrderNumberInDetail,
  byOrderDetailId,
  UpdateOrderDetailQuantity,
  DeleteOrderDet,
};
