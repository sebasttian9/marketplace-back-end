
import { UserRegister, byEmail } from "../models/usersModel.js";
import { findError } from "../utils/utils.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUsers = async (req, res) => {

    try {

    const { email,password,rol, lenguage } = req.body;
    const newUser = await UserRegister(email,password,rol, lenguage);
    res.status(201).json({ user: newUser });
        
    } catch (error) {
        res.status(400).json(error.message);
    }

}

const getUser = async (req, res) => {

    try {
        const { email } = req.user;
        // console.log(req.user)
        const findUser = await byEmail(email);
        console.log(findUser)
        res.status(200).json({"user": findUser});
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code);
        return res
            .status(errorFound[0]?.status)
            .json({ error: errorFound[0]?.message });
    }

}


const login = async (req,res) => {

    const { email, password } = req.body;

    try {

        const findUser = await byEmail(email);
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
                const { email, rol, lenguage } = findUser;
                const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                  expiresIn: "1h",
                });
                res.status(200).json({
                  message: `Bienvenido, ${email} ${rol} has iniciado sesion`,
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


export {login,createUsers,getUser} 