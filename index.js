const express = require("express");
//cors configuracion importar
const cors = require("cors");
const path = require("path");
const { dbConnection } = require("./db/config");
//Configuracion de puerto con variable de entorno
require("dotenv").config();
// Crear el servidor /aplicacion de express
const app = express();
//base de datos
dbConnection();
//Directorio Publico
app.use(express.static("public"));
//middlerware de cors
app.use(cors());
//Lectura y parseo del body
app.use(express.json());
//importo rutas, El use es un middlerwhere
app.use("/api/auth", require("./routes/auth.routes"));
//Manejo de rutas de front
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});
// () => coolback funcion que ejecuta cuando esta levantado el server
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
