import express from "express";
import {
  postNewFavProd,
  getFavProductsByUser,
  deleteFavProduct,
} from "../../src/api/v1/controllers/favoriteProductsControllers.js";
import { isLogin } from "../../src/api/v1/middlewares/validaToken.js";
import { isTheSameAuthor } from "../../src/api/v1/middlewares/validateAuthor.js";

const router = express.Router();

router.get("/user/myfavproducts", isLogin, getFavProductsByUser);
router.post("/user/myfavsproducts/:sku", isLogin, postNewFavProd);
router.delete(
  "/user/myfavsproducts/:sku",
  isLogin,
  isTheSameAuthor,
  deleteFavProduct
);

export default router;
