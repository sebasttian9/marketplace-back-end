import pool from "../../../../config/db/conectionDb.js";
import format from "pg-format";
import bcrypt from "bcryptjs";

const UserRegister = async (email, pass, nombre, authSource, imagenAvatar) => {
  try {
    // Validar si el Usuario ya existe en la BD
    const passwordEncriptada = bcrypt.hashSync(pass);
    pass = passwordEncriptada;
    const values = [
      nombre,
      email,
      passwordEncriptada,
      authSource,
      imagenAvatar,
    ];
    const consulta =
      "INSERT INTO tbl_usuarios (id_usuario,nombre,email,password,authSource,avatar) values (DEFAULT, $1, $2, $3, $4, $5) RETURNING *";
    const response = await pool.query(consulta, values);

    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const byEmail = async (email, authSource) => {
  try {
    const SQLquery = {
      text: "SELECT * FROM tbl_usuarios WHERE email = $1 AND authSource = $2",
      values: [email, authSource],
    };
    const response = await pool.query(byEmailQuery);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export { UserRegister, byEmail };
