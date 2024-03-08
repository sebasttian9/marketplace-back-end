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

const postNewProduct = async (req, res) => {
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
    //¿Coloco acá el producto del return?, ¿hace un return?
    res.status(201).json(newProduct);
  } catch (error) {
    console.log("error", error);
  }
};

const getProductBySKU = async (req, res) => {
  try {
    //Tendría que ser onda "example.com/product/:sku" y sacamos el SKU por ahi
    const { SKU } = req.params;
    const ProductFoundByID = await bySKU(SKU);
    //¿Coloco acá el producto del return?, ¿hace un return?
    res.status(200).json(ProductFoundByID);
  } catch (error) {
    console.log("error", error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { SKU, brand, title, description, price, stock, state } = req.body;
    const updatedProduct = await UpdateEntireProduct(
      SKU,
      brand,
      title,
      description,
      price,
      stock,
      state
    );
    //¿Coloco acá el producto del return?, ¿hace un return?
    res.status(201).json(updatedProduct);
  } catch (error) {
    console.log("error", error);
  }
};

const deleteProductBySku = async (req, res) => {
  try {
    //Tendría que ser onda "example.com/product/:sku" y sacamos el SKU por ahi
    const { SKU } = req.params;
    const ProductDeleted = await DeleteProduct(SKU);
    //¿Coloco acá el producto del return?, ¿hace un return?, ¿coloco algo?
    res.status(204).send();
  } catch (error) {
    console.log("error", error);
  }
};

export {
  getAllProductsLimits,
  postNewProduct,
  getProductBySKU,
  updateProduct,
  deleteProductBySku,
};
