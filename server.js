import express from "express";
import cors from "cors";
import { logger } from "logger-express";
import swagger from "./config/swagger/swagger.js";
import usersRouter from './config/routes/usersRoutes.js';


/* Acá ir+an las rutas*/

const app = express();
const PORT = process.env.PORT || 3000;


swagger(app);
app.use(express.json());
app.options("*", cors());
app.use(logger());
app.use("/api/v1", usersRouter);


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api/v1/docs`);
});

export default app;
