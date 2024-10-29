const express = require("express");
const usuarioRouter = require("./router/usuarioRouter.js");
const contratoRouter = require("./router/contratoRouter.js");
const anuncioRouter = require("./router/anuncioRouter.js");
const bodyParser = require("body-parser");

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>2Gheter!</h1>");
});

app.use(bodyParser.json());
app.use("/usuario", usuarioRouter);
app.use("/contrato", contratoRouter);
app.use("/anuncio",anuncioRouter);

app.listen(PORT, () => {
  console.log("Servidor online!");
});