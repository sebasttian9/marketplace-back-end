import {
  ProductRegister,
  bySKU,
  UpdateEntireProduct,
  DeleteProduct,
  getProducts,
} from "../models/productsModel.js";
import { getSKU } from "../utils/utils.js";
import prepareHateoas from "../helpers/hateoas.js";

const getAllProductsLimits = async (req, res) => {
  console.log(req.query);

  try {
    const { order_by, page, limits } = req.query;
    const products = await getProducts(order_by, limits, page);
    const productsWithHateoas = await prepareHateoas("products", products);
    res.status(200).json(productsWithHateoas);
  } catch (error) {
    console.log("error", error);
  }
};

const postNewProductMiddleware = async (req, res, next) => {
  try {
    const { brand, title, description, price, stock, state } = req.body;
    const SKU = getSKU(title);
    const newProduct = await ProductRegister(
      SKU,
      brand,
      title,
      description,
      price,
      stock,
      state
    );
    // Pasar el objeto newProduct al siguiente controlador
    req.newProduct = newProduct;
    next(); // Llama al siguiente middleware o controlador
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductBySKU = async (req, res) => {
  try {
    const { sku } = req.params;
    const ProductFoundByID = await bySKU(sku);
    if(ProductFoundByID){
      res.status(200).json(ProductFoundByID);
    }

    res.status(404).json({ "message" :" No existe el Producto!" });
    
  } catch (error) {
    console.log("error", error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { SKU } = req.params;
    const { brand, title, description, price, stock, state } = req.body;
    const updatedProduct = await UpdateEntireProduct(
      SKU,
      brand,
      title,
      description,
      price,
      stock,
      state
    );
    res.status(201).json(updatedProduct);
  } catch (error) {
    console.log("error", error);
  }
};

const deleteProductBySku = async (req, res) => {
  try {
    const { sku } = req.params;
    const ProductDeleted = await DeleteProduct(sku);
    res.status(204).send();
  } catch (error) {
    console.log("error", error);
  }
};

export {
  getAllProductsLimits,
  postNewProductMiddleware,
  getProductBySKU,
  updateProduct,
  deleteProductBySku,
};
