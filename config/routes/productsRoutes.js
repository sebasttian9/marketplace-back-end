import express from "express";
import {
  getAllProductsLimits,
  postNewProduct,
  getProductBySKU,
  updateProduct,
  deleteProductBySku,
} from "../../src/api/v1/controllers/productsControllers.js";

const router = express.Router();

router.get("/products", getAllProductsLimits);
router.get("/products/:sku", getProductBySKU);
router.post("/products", postNewProduct);
//TO DO: Se necesita un middleware que valide si el usuario es el creador o no
router.put("/products/:sku", updateProduct);
router.delete("/products/:sku", deleteProductBySku);

export default router;
