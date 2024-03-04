
import { UserRegister, byEmail } from "../models/usersModel.js";
import { findError } from "../utils/utils.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";


const createUsers = async (req, res) => {

  try {

    const { email, password, nombre, imagen } = req.body;
    const newUser = await UserRegister(email, password, nombre,'normal', imagen);
    res.status(201).json({ user: newUser });

  } catch (error) {
    res.status(400).json(error.message);
  }

}

const getUser = async (req, res) => {

  try {
    const { email } = req.user;
    // console.log(req.user)
    const findUser = await byEmail(email,'normal');
    console.log(findUser)
    res.status(200).json({ "user": findUser });
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }

}


const login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const findUser = await byEmail(email,'normal');
    if (!findUser) {
      const errorFound = findError("auth_01");
      return res
        .status(errorFound[0].status)
        .json({ message: errorFound[0].message });
    } else {
      const isPasswordValid = bcrypt.compareSync(
        password,
        findUser.password
      );
      if (!isPasswordValid) {
        const errorFound = findError("auth_02");
        return res
          .status(errorFound[0].status)
          .json({ message: errorFound[0].message });
      } else {
        const { email, nombre, avatar } = findUser;
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({
          message: `Bienvenido, ${nombre} has iniciado sesion`,
          data: findUser,
          code: 200,
          token,
        });
      }
    }

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: error.message });
  }



}


const loginGoogle = async (req, res) => {

  const client = new OAuth2Client();

  const { credential, client_id } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const email = payload['email'];
    const nombre = payload['given_name'];
    const apellido = payload['family_name'];
    const imagen = payload['picture'];

    // Check if the user exists in your database
    let user = await byEmail(email,'google');
    if (!user) {
      // Create a user if they do not exist
        const newUser = await UserRegister(email, '1234', `${nombre} ${apellido}`, 'google',imagen);
    }

    // se crea el token de acceso
    const token = jwt.sign({email}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });


    // res.status(200).json({ payload, "token": token });
    res.status(200).cookie('token', token, { http: true }).json({ payload });
  } catch (err) {
    console.log(err)
    res.status(500).json({err});
  }


}


export { login, createUsers, getUser, loginGoogle } 