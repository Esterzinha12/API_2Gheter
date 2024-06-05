const express = require("express");
const userRouter = require("./router/usuarioRouter.js");
const contractRouter = require("./router/contratoRouter.js");
const advertisementRouter = require("./router/anuncioRouter.js");
const bodyParser = require("body-parser");

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>2Gheter!</h1>");
});

app.use(bodyParser.json());
app.use("/api", userRouter);

app.use(bodyParser.json());
app.use("/api1", contractRouter);

app.use(bodyParser.json());
app.use("/api2", advertisementRouter);

app.listen(PORT, () => {
  console.log("Servidor online!");
});