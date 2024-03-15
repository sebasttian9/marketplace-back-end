import {
  WishlistRegister,
  byIdUsuarioInWishlist,
  DeleteWishlistItem,
} from "../models/favoriteProductsModel.js";

//version Alpha, funcionaría con un middleware previo
const postNewFavProd = async (req, res) => {
  try {
    //TO DO: Hay que tener el SKU, asumo que por params
    const { id_producto } = req.body;
    // const { id_producto } = bySKU(SKU);
    //TO DO:Deberíamos tener el token presente dejado por un middleware previo
    const { id_usuario } = req.user;
    // const { id_usuario } = await byEmail(email, false);
    const newFavProd = await WishlistRegister(id_producto, id_usuario);
    res.status(201).json(newFavProd);
  } catch (error) {
    console.log("error", error);
  }
};

const getFavProductsByUser = async (req, res) => {
  try {
    //TO DO:Deberíamos tener el token presente dejado por un middleware previo
    const { id_usuario } = req.user;
    const favProductsByUser = await byIdUsuarioInWishlist(id_usuario);
    // console.log(favProductsByUser)
    if(favProductsByUser){
      res.status(200).json({"Products":favProductsByUser});
    }else{
      res.status(200).json({"Products":[]});
    }
    
  } catch (error) {
    console.log("error", error);
  }
};

//La validación depende de si la ruta contiene fav o post, en este caso debería ser 'fav'
const deleteFavProduct = async (req, res) => {
  try {
    //Tendría que ser onda "example.com/product/:sku" y sacamos el SKU por ahi
    const { id } = req.params;
    const postDeleted = await DeleteWishlistItem(id);
    // console.log(postDeleted.rowCount)
    if(postDeleted.rowCount){
      res.status(200).json({"message":"Producto favorito Eliminado"});
    }else{
      res.status(200).json({"message":"No se pudo eliminar el producto de favoritos"});
    }
    
  } catch (error) {
    console.log("error", error);
  }
};

export { postNewFavProd, getFavProductsByUser, deleteFavProduct };
