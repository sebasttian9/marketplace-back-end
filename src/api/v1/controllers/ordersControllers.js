import {
  TotalOrderRegister,
  byOrderNumber,
  byUserID,
  UpdateOrderStatus,
  DeleteOrder,
} from "../models/ordersModel.js";
import { statusOrderInterpreter, getSKU } from "../utils/utils.js";

const postNewTotalOrderMiddleware = async (req, res, next) => {
  try {
    if (
      !res.locals.TotalOrder ||
      res.locals.TotalOrder["estado"] == "unavailable"
    ) {
      console.log(res.locals.TotalOrder);
      //Deberíamos tener el token presente dejado por un middleware previo
      const { id_usuario } = req.user;
      //Ocupemos ORDER para el SKU
      const orderNumber = getSKU("ORDER");
      //Obtener status
      const status = statusOrderInterpreter("unavailable", "proceed");
      const newTotalOrder = await TotalOrderRegister(
        id_usuario,
        orderNumber,
        status
      );
      res.locals.TotalOrder = newTotalOrder;
    }
    next();
    //El resto de la lógica será en los Detalles
  } catch (error) {
    throw new Error(error);
  }
};

//Este será el general, sin detalles
const getTotalOrderByUserId = async (req, res) => {
  try {
    //Deberíamos tener el token presente dejado por un middleware previo
    //Deberia ser el autor de la compra
    const { id_usuario } = req.user;
    const allUsersOrders = await byUserID(id_usuario);
    res.status(200).json({ orders: allUsersOrders });
  } catch (error) {
    console.log("error", error);
  }
};

//TO DO: Que los productos indiquen con un icono o color su estado
const updateOrderStatus = async (req, res) => {
  try {
    //Debería estar tipo /:orderNumber
    const { orderNumber } = req.params;
    const { status, action } = req.body;
    //Las opciones para status: ["unavailable", "available", "purchased", "shipped"]
    const updatedStatus = statusOrderInterpreter(status, action);
    const updatedOrder = await UpdateOrderStatus(orderNumber, updatedStatus);
    res.status(201).json(updatedOrder);
  } catch (error) {
    console.log("error", error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const postDeleted = await DeleteOrder(orderNumber);
    res.status(204).send();
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  postNewTotalOrderMiddleware,
  getTotalOrderByUserId,
  updateOrderStatus,
  deleteOrder,
};
