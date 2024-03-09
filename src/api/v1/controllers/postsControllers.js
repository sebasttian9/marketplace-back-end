import {
  PostRegister,
  PostsByUserEmail,
  UpdatePostStatus,
  DeletePost,
  GetAllPostsWithFilters,
} from "../models/postsModel.js";
import { byEmail } from "../models/usersModel.js";

const postNewPost = async (req, res) => {
  try {
    //Acá el middleware dejaría el elemento dentro del req
    const { id_producto } = req.newProduct;
    //Deberíamos tener el token presente dejado por un middleware previo
    const { email } = req.user;
    const { id_usuario } = await byEmail(email, false);
    const newPost = await PostRegister(id_usuario, id_producto);
    res.status(201).json(newPost);
  } catch (error) {
    console.log("error", error);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { order_by, page, limits } = req.query;
    const allPosts = await GetAllPostsWithFilters(order_by, limits, page);
    const postsWithHateoas = await prepareHateoas("posts", allPosts);
    res.status(200).json(postsWithHateoas);
  } catch (error) {
    console.log("error", error);
  }
};

const getPostsByEmail = async (req, res) => {
  try {
    //Deberíamos tener el token presente dejado por un middleware previo
    const { email } = req.user;
    const postsByUser = await PostsByUserEmail(email);
    res.status(200).json(postsByUser);
  } catch (error) {
    console.log("error", error);
  }
};

//TO DO: Que los productos pausados cambien su vista en el Front End
const updatePostStatus = async (req, res) => {
  try {
    const { SKU } = req.params;
    const updatedPost = await UpdatePostStatus(SKU);
    res.status(201).json(updatedPost);
  } catch (error) {
    console.log("error", error);
  }
};

const deletePostMiddleware = async (req, res, next) => {
  try {
    const { SKU } = req.params;
    const postDeleted = await DeletePost(SKU);
    next();
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  postNewPost,
  getPostsByEmail,
  updatePostStatus,
  deletePostMiddleware,
  getAllPosts,
};
