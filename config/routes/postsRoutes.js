import express from "express";
import {
  postNewProductMiddleware,
  deleteProductBySku,
} from "../../src/api/v1/controllers/productsControllers.js";
import {
  postNewPost,
  getPostsByEmail,
  updatePostStatus,
  deletePostMiddleware,
  getAllPosts,
} from "../../src/api/v1/controllers/postsControllers.js";
import { isLogin } from "../../src/api/v1/middlewares/validaToken.js";
import { isTheSameAuthor } from "../../src/api/v1/middlewares/validateAuthor.js";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/user/myposts", isLogin, getPostsByEmail);
router.post("/posts", isLogin, postNewProductMiddleware, postNewPost);
router.put("/products/:sku", isLogin, isTheSameAuthor, updatePostStatus);
router.delete(
  "/products/:sku",
  isLogin,
  isTheSameAuthor,
  deletePostMiddleware,
  deleteProductBySku
);

export default router;
