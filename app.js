import express from "express";
import cors from "cors";
// import { logger } from "logger-express";
import swagger from "./config/swagger/swagger.js";
import usersRouter from './config/routes/usersRoutes.js';
import productsRouter from './config/routes/productsRoutes.js';


/* Acá ir+an las rutas*/

const app = express();


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




export default app;