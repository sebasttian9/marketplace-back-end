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
    const { id_producto, price, quantity, action } = req.body;
    //Chequear si existe
    const existentDetail = await byProductIdInDetail(id_producto, id_pedido);
    //Si no existe, crear
    if (!existentDetail) {
      let base = 0;
      const stock = stockActionInterpreter(base, quantity, action);
      const newDetail = await DetailOrderRegister(
        id_pedido,
        id_producto,
        stock,
        price
      );
      res.status(201).json(newDetail);
    } //Si existe, hacer update al stock
    else {
      const { cantidad, id_detalle } = existentDetail;
      const stock = stockActionInterpreter(cantidad, quantity, action);
      const updatedDetail = await UpdateOrderDetailQuantity(id_detalle, stock);
      res.status(200).json(updatedDetail);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getAllOrderDetailsByOrderID = async (req, res) => {
  try {
    const { orderId } = req.params;
    const allOrderDetails = await byTotalOrderNumberInDetail(orderId);
    res.status(200).json(allOrderDetails);
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
    res.status(204).send();
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
