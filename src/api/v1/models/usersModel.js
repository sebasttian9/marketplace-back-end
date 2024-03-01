import pool from  "../../../../config/db/connections.js";
import format from "pg-format";
import bcrypt from "bcryptjs"; 


const UserRegister = async (email,pass,rol, leng) => {

    try {

        const passwordEncriptada = bcrypt.hashSync(pass)
        pass = passwordEncriptada
        const values = [email, passwordEncriptada,rol,leng]
        const consulta = "INSERT INTO usuarios (id,email,password,rol,lenguage) values (DEFAULT, $1, $2, $3, $4) RETURNING *"
        const response = await pool.query(consulta, values)

        return response.rows[0];
        
    } catch (error) {

        console.log(error);
        
    }

}


const byEmail = async (email) => {
    const SQLquery = {
      text: "SELECT * FROM usuarios WHERE email = $1",
      values: [email],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  }

  

export {UserRegister, byEmail}