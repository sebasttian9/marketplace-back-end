import {
  PostRegister,
  PostsByUserEmail,
  UpdatePostStatus,
  DeletePost,
} from "../models/postsModel.js";
import { byEmail } from "../models/usersModel.js";
import jwt from "jsonwebtoken";

//version Alpha, funcionaría con un middleware previo
const postNewPost = async (req, res) => {
  try {
    //TO DO: Ver si dejamos al final este elemento
    const { descriptionPost } = req.body;
    //TO DO: Acá el middleware dejaría el elemento dentro del req
    const { id_producto } = req.newProduct;
    //TO DO:Deberíamos tener el token presente dejado por un middleware previo
    const { email } = req.user;
    const { id_usuario } = await byEmail(email, false);
    const newPost = await PostRegister(
      id_usuario,
      id_producto,
      descriptionPost
    );
    res.status(201).json(newPost);
  } catch (error) {
    console.log("error", error);
  }
};
//version Alpha
//TO DO: Que los productos pausados cambien su vista en el Front End

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

//La función de este debe ser pausar el post
//TO DO: Que los productos pausados cambien su vista en el Front End
const updatePostStatus = async (req, res) => {
  try {
    //Tendría que ser onda "example.com/product/:sku" y sacamos el SKU por ahi
    const { SKU } = req.params;
    const updatedPost = await UpdatePostStatus(SKU);
    res.status(201).json(updatedPost);
  } catch (error) {
    console.log("error", error);
  }
};

//Debe estar validado que el usuario sea el creador
const deletePost = async (req, res) => {
  try {
    //Tendría que ser onda "example.com/product/:sku" y sacamos el SKU por ahi
    const { SKU } = req.params;
    const postDeleted = await DeletePost(SKU);
    //¿Coloco acá el producto del return?, ¿hace un return?, ¿coloco algo?
    res.status(204).send();
  } catch (error) {
    console.log("error", error);
  }
};

export { postNewPost, getPostsByEmail, updatePostStatus, deletePost };
