import express from "express";
import {
  getAllProductsLimits,
  postNewProduct,
  getProductBySKU,
  updateProduct,
  deleteProductBySku,
  getPostByIdUser
} from "../../src/api/v1/controllers/productsControllers.js";
import { isLogin } from "../../src/api/v1/middlewares/validaToken.js";
//import { isTheSameAuthor } from "../../src/api/v1/middlewares/validateAuthor.js";

const router = express.Router();

router.get("/products", getAllProductsLimits);
router.post("/products", isLogin, postNewProduct);
router.post("/myposts", isLogin, getPostByIdUser);
//Parece ser que estas son las verdaderamente indispensables
router.get("/products/:sku", getProductBySKU);
router.put("/products/:sku", isLogin, updateProduct);
router.delete("/products/:sku", deleteProductBySku);

export default router;
