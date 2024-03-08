import express from "express";
import {
  getAllProductsLimits,
  postNewProduct,
  getProductBySKU,
  updateProduct,
  deleteProductBySku,
} from "../../src/api/v1/controllers/productsControllers.js";
import { isLogin } from "../../src/api/v1/middlewares/validaToken.js";
import { isTheSameAuthor } from "../../src/api/v1/middlewares/validateAuthor.js";

const router = express.Router();

router.get("/products", getAllProductsLimits);
router.get("/products/:sku", getProductBySKU);
//TO DO: Revisar si funciona con el isLogin y el otro middleware
router.post("/products", isLogin, postNewProduct);
router.put("/products/:sku", isLogin, isTheSameAuthor, updateProduct);
router.delete("/products/:sku", isLogin, isTheSameAuthor, deleteProductBySku);

export default router;
