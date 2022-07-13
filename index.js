const express = require("express");
//cors configuracion importar
const cors = require("cors");
//Configuracion de puerto con variable de entorno
require("dotenv").config();
// Crear el servidor /aplicacion de express
const app = express();
//Directorio Publico
app.use(express.static("public"));
//middlerware de cors
app.use(cors());
//Lectura y parseo del body
app.use(express.json());
//importo rutas, El use es un middlerwhere
app.use("/api/auth", require("./routes/auth.routes"));
// () => coolback funcion que ejecuta cuando esta levantado el server
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
