import express from "express";
import {
  getAllProductsLimits,
  postNewProduct,
  getProductBySKU,
  updateProduct,
  deleteProductBySku,
  getPostByIdUser
} from "../../src/api/v1/controllers/productsControllers.js";
import {
  upload,
  uploadToS3Middleware,
} from "../../src/api/v1/middlewares/uploadImage.js";
import { isLogin } from "../../src/api/v1/middlewares/validaToken.js";

const router = express.Router();

router.get("/products", getAllProductsLimits);
router.post(
  "/products",
  isLogin,
  upload.single("image"),
  uploadToS3Middleware,
  postNewProduct
);
router.post("/myposts", isLogin, getPostByIdUser);
//Parece ser que estas son las verdaderamente indispensables
router.get("/products/:sku", getProductBySKU);
router.put("/products/:sku", isLogin, updateProduct);
router.delete("/products/:sku", deleteProductBySku);

export default router;
