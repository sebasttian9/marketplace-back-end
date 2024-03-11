import {
  WishlistRegister,
  byEmailInWishlist,
  DeleteWishlistItem,
} from "../models/favoriteProductsModel.js";
import { bySKU } from "../models/productsModel.js";

//version Alpha, funcionaría con un middleware previo
const postNewFavProd = async (req, res) => {
  try {
    //TO DO: Hay que tener el SKU, asumo que por params
    const { SKU } = req.params;
    const { id_producto } = bySKU(SKU);
    //TO DO:Deberíamos tener el token presente dejado por un middleware previo
    const { email } = req.user;
    const { id_usuario } = await byEmail(email, false);
    const newFavProd = await WishlistRegister(id_producto, id_usuario);
    res.status(201).json(newFavProd);
  } catch (error) {
    console.log("error", error);
  }
};

const getFavProductsByUser = async (req, res) => {
  try {
    //TO DO:Deberíamos tener el token presente dejado por un middleware previo
    const { email } = req.user;
    const favProductsByUser = await byEmailInWishlist(email);
    res.status(200).json(favProductsByUser);
  } catch (error) {
    console.log("error", error);
  }
};

//La validación depende de si la ruta contiene fav o post, en este caso debería ser 'fav'
const deleteFavProduct = async (req, res) => {
  try {
    //Tendría que ser onda "example.com/product/:sku" y sacamos el SKU por ahi
    const { SKU } = req.params;
    const postDeleted = await DeleteWishlistItem(SKU);
    res.status(204).send();
  } catch (error) {
    console.log("error", error);
  }
};

export { postNewFavProd, getFavProductsByUser, deleteFavProduct };
