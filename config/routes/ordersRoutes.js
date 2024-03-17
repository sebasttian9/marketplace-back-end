import express from "express";
import {
  postSingleOrderDetail,
  getAllOrderDetailsByOrderID,
  updateOrderDetail,
  deleteOrderDetail,
} from "../../src/api/v1/controllers/ordersDetailsControllers.js";
import {
  postNewTotalOrderMiddleware,
  getTotalOrderByUserId,
  updateOrderStatus,
  deleteOrder,
} from "../../src/api/v1/controllers/ordersControllers.js";
import { isLogin } from "../../src/api/v1/middlewares/validaToken.js";

const router = express.Router();
//Pedir todos los datos generales
router.get("/user/orders", isLogin, getTotalOrderByUserId);
/*Al desplegar el acordeon, enviaría una solicitud para acceder a la info de ese
El boton debe ser parseado en mente con la dirección del get con el id tipo ${id_pedido}*/
router.get("/user/orders/:orderId", isLogin, getAllOrderDetailsByOrderID);
//El Details está totalmente en Alpha, debería funcionar tanto para hacer update como crear un nuevo producto
router.post("/user/orders",isLogin,postNewTotalOrderMiddleware,postSingleOrderDetail); // guardar el id_pedido que retorna
//Cambiar el estado de la orden: está en carrito, se cancela, se paga, etc.
router.put("/user/orders/status/:orderNumber", isLogin, updateOrderStatus);
//Cambiar la cantidad del detalle

router.put("/user/orders/detail/:idDetail", isLogin, updateOrderDetail);
//Eliminar, primero el carrito o pedido, luego el detalle
router.delete("/user/orders/:orderNumber", isLogin, deleteOrder);
router.delete("/user/orders/detail/:idDetail", isLogin, deleteOrderDetail);

export default router;
