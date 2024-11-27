import express from "express";
import { conexion } from "./src/db/conexion.js";
import dotenv from "dotenv";
import routes from "./src/routes/surveyRoutes.js";
import cors from "cors";

var app = express();
dotenv.config();
const port = process.env.port || 8002;
const host = process.env.host;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://77.37.97.40:4300",
    })
);
routes(app);

conexion()
  .then(() => {
    app.listen(port, host, () => {
      console.log(`Escuchando por el puerto ${port} `);
    });
  })
  .catch((err) => {
    console.error("Error al conectar con DB", err);
    process.exit(1);
  });
