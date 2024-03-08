import pool from "../../../../config/db/conectionDb.js";
import format from "pg-format";
import bcrypt from "bcryptjs";

const UserRegister = async (
  email,
  originalPassword,
  name,
  authSource,
  imageAvatar
) => {
  try {
    // Validar si el Usuario ya existe en la BD
    const encryptPassword = bcrypt.hashSync(originalPassword);
    const userRegisterValues = [
      name,
      email,
      encryptPassword,
      authSource,
      imageAvatar,
    ];
    const userRegisterQuery =
      "INSERT INTO tbl_usuarios (id_usuario,nombre,email,password,authSource,avatar) values (DEFAULT, $1, $2, $3, $4, $5) RETURNING *";
    const response = await pool.query(userRegisterQuery, userRegisterValues);

    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const UpdateUser = async (userId, name, email, password, imageAvatar) => {
  try {
    const updateUserValues = [name, email, password, imageAvatar, userId];
    const updateUserQuery =
      "UPDATE tbl_usuarios SET nombre = $1, email = $2, password = $3, avatar = $4 WHERE id_usuario = $5 RETURNING *";
    const response = await pool.query(updateUserQuery, updateUserValues);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const byEmail = async (email, authSource) => {
  try {
    if (authSource == false) {
      const byEmailQuery = "SELECT * FROM tbl_usuarios WHERE email = $1";
      const response = await pool.query(byEmailQuery, email);
      return response.rows[0];
    } else {
      const byEmailValues = [email, authSource];
      const byEmailQuery =
        "SELECT * FROM tbl_usuarios WHERE email = $1 AND authSource = $2";
      const response = await pool.query(byEmailQuery, byEmailValues);
      return response.rows[0];
    }
  } catch (error) {
    console.log(error);
  }
};

export { UserRegister, byEmail };
