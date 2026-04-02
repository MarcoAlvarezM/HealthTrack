require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo DB Conectado"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

// Routes CRUD para usuarios
app.use("/api/usuarios", require("./routes/usuarioRoutes"));
app.use("/api/pacientes", require("./routes/pacientesRoutes"));
app.use("/api/medicamentos", require("./routes/medicamentosRoutes"));
app.use("/api/tratamientos", require("./routes/tratamientosRoutes"));

app.listen(PORT, () => {
  console.log(`Servidor ejecutadonse ${PORT}`);
});
