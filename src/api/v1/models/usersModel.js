import pool from "../../../../config/db/connections.js";
import format from "pg-format";
import bcrypt from "bcryptjs";

const UserRegister = async (name, email, originalPassword, rol = "false") => {
  try {
    const encryptPassword = bcrypt.hashSync(originalPassword);
    const userValues = [name, email, encryptPassword, rol];
    const userQuery =
      "INSERT INTO tbl_usuarios (nombre,email,password,rol) values (DEFAULT, $1, $2, $3, $4) RETURNING *";
    const response = await pool.query(userQuery, userValues);

    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const byEmail = async (email) => {
  try {
    const byEmailQuery = {
      text: "SELECT * FROM tbl_usuarios WHERE email = $1",
      values: [email],
    };
    const response = await pool.query(byEmailQuery);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export { UserRegister, byEmail };
