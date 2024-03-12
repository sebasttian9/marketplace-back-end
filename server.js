import app from "./app.js";

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api/v1/docs`);
    console.log(`Swagger production docs available at https://marketplace-back-end-4sb8.onrender.com/api/v1/docs`);
  });
