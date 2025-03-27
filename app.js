const express = require("express");
const cors = require("cors");
const usuarioRouter = require("./router/usuarioRouter.js");
const contratoRouter = require("./router/contratoRouter.js");
const anuncioRouter = require("./router/anuncioRouter.js");
const comentarioRouter = require("./router/comentarioRouter.js");
const bodyParser = require("body-parser");

const PORT = 3030;

const app = express();

app.use(cors({ origin: "http://localhost:3001" }));

app.get("/", (req, res) => {
  res.send("<h1>2Gheter!</h1>");
});
app.get('/api/usuarios', (req, res) => {
  res.json({ message: 'Rota de usuário funcionando!' });
});

app.use(bodyParser.json());
app.use("/usuario", usuarioRouter);
app.use("/contrato", contratoRouter);
app.use("/anuncio", anuncioRouter);
app.use("/comentario", comentarioRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});