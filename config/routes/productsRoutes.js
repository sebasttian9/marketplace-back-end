import express from "express";
import {
  getAllProductsLimits,
  getProductBySKU,
  updateProduct,
} from "../../src/api/v1/controllers/productsControllers.js";
import { isLogin } from "../../src/api/v1/middlewares/validaToken.js";
import { isTheSameAuthor } from "../../src/api/v1/middlewares/validateAuthor.js";

const router = express.Router();

router.get("/products", getAllProductsLimits);
//Parece ser que estas son las verdaderamente indispensables
router.get("/products/:sku", getProductBySKU);
router.put("/products/:sku", isLogin, isTheSameAuthor, updateProduct);

export default router;