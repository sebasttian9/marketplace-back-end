import express from "express";
import cors from "cors";
// import { logger } from "logger-express";
import swagger from "./config/swagger/swagger.js";
import usersRouter from './config/routes/usersRoutes.js';
import productsRouter from './config/routes/productsRoutes.js';


/* Acá ir+an las rutas*/

const app = express();
const PORT = process.env.PORT || 3000;


swagger(app);
app.use(express.json());
// Add cors
app.use(cors());
app.options("*", cors());

// app.use(logger());
app.get("/", (req,res)=>{
  res.send('Api MARKETPLACE en linea');
});
app.use("/api/v1", usersRouter);
app.use("/api/v1", productsRouter);


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api/v1/docs`);
  console.log(`Swagger production docs available at https://marketplace-back-end-4sb8.onrender.com/api/v1/docs`);
});

export default app;
