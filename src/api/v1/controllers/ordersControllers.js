import {
  TotalOrderRegister,
  byOrderNumber,
  byUserID,
  UpdateOrderStatus,
  DeleteOrder,
} from "../models/ordersModel.js";
import { byEmail } from "../models/usersModel.js";
import { getTax, statusOrderInterpreter } from "../utils/utils.js";

const postNewTotalOrderMiddleware = async (req, res, next) => {
  try {
    const { notes, price } = req.body;
    const { priceWithoutTaxes, taxes, priceWithTaxes } = getTax(price);

    //Deberíamos tener el token presente dejado por un middleware previo
    const { email } = req.user;
    const { id_usuario } = await byEmail(email, false);
    //Ocupemos el mail para el SKU
    const orderNumber = getSKU(email);
    //Obtener status
    const status = statusActionInterpreter("unavailable", "proceed");
    const newTotalOrder = await TotalOrderRegister(
      id_usuario,
      orderNumber,
      notes,
      priceWithoutTaxes,
      taxes,
      priceWithTaxes,
      status
    );
    req.TotalOrder = newTotalOrder;
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
    const { email } = req.user;
    const { id_usuario } = await byEmail(email, false);
    const allUsersOrders = await byUserID(id_usuario);
    res.status(200).json(allUsersOrders);
  } catch (error) {
    console.log("error", error);
  }
};

//TO DO: Falta el controlador para obtener los elementos por detalle

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
