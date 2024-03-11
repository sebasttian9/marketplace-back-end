import {
  DetailOrderRegister,
  bySKUInDetail,
  byTotalOrderNumberInDetail,
  DeleteOrderDetail,
} from "../models/ordersDetailsModel.js";
import { bySKU } from "../models/productsModel.js";
import { getTax } from "../utils/utils.js";

//Esta toma lo hecho por el middleware anterior
const postAllOrderDetails = async (req, res) => {
  try {
    const { id_pedido } = req.TotalOrder;
    //Necesitamos toda la información en forma de array de los productos
    const { cart } = req.body; //Acá debe estar
    //A parsear el carro item por item, TO DO: ¿necesitará un await/async?
    let totalDetail;
    let counter = 0;
    await cart.map((singleProduct) => {
      const { priceWithoutTaxes, taxes, priceWithTaxes } = getTax(
        singleProduct.price,
        singleProduct.quantity
      );
      const { id_producto } = bySKU(singleProduct.SKU);
      totalDetail.counter = DetailOrderRegister(
        id_pedido,
        id_producto,
        SKU,
        singleProduct.quantity,
        priceWithoutTaxes,
        taxes,
        priceWithTaxes
      );
      counter++;
    });
    res.status(201).json(postsWithHateoas);
  } catch (error) {
    throw new Error(error);
  }
};

//TO DO: FALTA HACER ESTO, NO ES NECESARIO EL DELETE YA QUE AL ELIMINAR EL PEDIDO SE BORRA TODO, NI EL UPDATE YA QUE ES FIJO
/* const getAllPosts = async (req, res) => {
  try {
    const { order_by, page, limits } = req.query;
    const allPosts = await GetAllPostsWithFilters(order_by, limits, page);
    const postsWithHateoas = await prepareHateoas("posts", allPosts);
    res.status(200).json(postsWithHateoas);
  } catch (error) {
    console.log("error", error);
  }
};

const getPostsByEmail = async (req, res) => {
  try {
    //Deberíamos tener el token presente dejado por un middleware previo
    const { email } = req.user;
    const postsByUser = await PostsByUserEmail(email);
    res.status(200).json(postsByUser);
  } catch (error) {
    console.log("error", error);
  }
};

//TO DO: Que los productos pausados cambien su vista en el Front End
const updatePostStatus = async (req, res) => {
  try {
    const { SKU } = req.params;
    const updatedPost = await UpdatePostStatus(SKU);
    res.status(201).json(updatedPost);
  } catch (error) {
    console.log("error", error);
  }
};

export {
  postNewPost,
  getPostsByEmail,
  updatePostStatus,
  deletePostMiddleware,
  getAllPosts,
};
 */
