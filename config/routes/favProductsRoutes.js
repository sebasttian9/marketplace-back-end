import express from "express";
import {
  postNewFavProd,
  getFavProductsByUser,
  deleteFavProduct,
} from "../../src/api/v1/controllers/favoriteProductsControllers.js";
import { isLogin } from "../../src/api/v1/middlewares/validaToken.js";

const router = express.Router();

router.get("/user/myfavsproducts", isLogin, getFavProductsByUser);
router.post("/user/myfavsproducts", isLogin, postNewFavProd);
router.delete("/user/myfavsproducts/:id",isLogin, deleteFavProduct);

export default router;
