import {
  DetailOrderRegister,
  byTotalOrderNumberInDetail,
  byProductIdInDetail,
  byOrderDetailId,
  UpdateOrderDetailQuantity,
  DeleteOrderDet
} from "../models/ordersDetailsModel.js";
import { stockActionInterpreter } from "../utils/utils.js";

const postSingleOrderDetail = async (req, res) => {
  try {
    const { id_pedido } = req.TotalOrder;
    //Necesitamos que venga ya el id del producto, puede ser que se haya parseado en forma de ${}
    const { id_producto, price, quantity, action, sku } = req.body;
    //Chequear si existe
    const existentDetail = await byProductIdInDetail(id_producto, id_pedido);
    //Si no existe, crear
    console.log(existentDetail)
    let status = 201;
    let respuestaFinal;
    if (!existentDetail) {
      let base = 0;
      const stock = stockActionInterpreter(base, quantity, action);
      const newDetail = await DetailOrderRegister(
        id_pedido,
        id_producto,
        stock,
        price,
        sku
      );
      respuestaFinal = newDetail;
      // console.log(newDetail)
      // res.status(201).json(newDetail);
    }else { //Si existe, hacer update al stock
      console.log('entro en update')
      const { cantidad, id_detalle } = existentDetail;
      const stock = stockActionInterpreter(cantidad, quantity, action);
      const updatedDetail = await UpdateOrderDetailQuantity(id_detalle, stock);
      status = 200;
      respuestaFinal = updatedDetail;
    }
    res.status(status).json(respuestaFinal);
  } catch (error) {
    throw new Error(error);
  }
};

const getAllOrderDetailsByOrderID = async (req, res) => {
  try {
    const { orderId } = req.params;
    const allOrderDetails = await byTotalOrderNumberInDetail(orderId);
    res.status(200).json({"detalle":allOrderDetails});
  } catch (error) {
    console.log("error", error);
  }
};

const updateOrderDetail = async (req, res) => {
  try {
    const { idDetail } = req.params;
    const { quantity, action } = req.body;
    //Buscar el producto
    const existentDetail = await byOrderDetailId(idDetail);
    const { cantidad } = existentDetail;
    const stock = stockActionInterpreter(cantidad, quantity, action);
    const updatedDetail = await UpdateOrderDetailQuantity(idDetail, stock);
    res.status(200).json(updatedDetail);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteOrderDetail = async (req, res) => {
  try {
    const { idDetail } = req.params;
    const postDeleted = await DeleteOrderDet(idDetail);
    if(postDeleted.rowCount){
      res.status(200).json({"message":"Detalle de Orden Eliminada"});
    }else{
      res.status(200).json({"message":"No se pudo eliminar el detalle de la Orden"});
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  postSingleOrderDetail,
  getAllOrderDetailsByOrderID,
  updateOrderDetail,
  deleteOrderDetail,
};
