const express = require("express");
const cors = require("cors");
const usuarioRouter = require("./router/usuarioRouter.js");
const contratoRouter = require("./router/contratoRouter.js");
const anuncioRouter = require("./router/anuncioRouter.js");
const comentarioRouter = require("./router/comentarioRouter.js");
const bodyParser = require("body-parser");

const PORT = 3030;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <title>2Gether - Rotas Disponíveis</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 2rem;
          background-color: #f7f7f7;
          color: #333;
        }
        h1 {
          color: #4CAF50;
        }
        ul {
          list-style: none;
          padding-left: 0;
        }
        li {
          margin: 0.5rem 0;
        }
        a {
          text-decoration: none;
          color: #007BFF;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <h1>2Gether</h1>
      <ul>
        <li>/usuario</li>
        <li>/buscar/:id - EndPoint Usuario</li>
        <li>/cadastrar - EndPoint Usuario</li>
        <li>/login - EndPoint Usuario</li>
        <li>/recadastrar - EndPoint Usuario</li>
        <br>
        <li>/contrato</li>
        <li>/buscar = EndPoint Contrato</li>
        <li>/cadastrar = EndPoint Contrato</li>
        <li>/editar/:id = EndPoint Contrato</li>
        <li>/deletar/:id = EndPoint Contrato</li>
        <li>/buscar/:id = EndPoint Contrato</li>
        <br>
        <li>/anuncio</li>
        <li>/buscar-todos - EndPoint Anuncio</li>
        <li>/cadastrar - EndPoint Anuncio</li>
        <li>/editar - EndPoint Anuncio</li>
        <li>/deletar/:id - EndPoint Anuncio</li>
        <li>/buscar/:id - EndPoint Anuncio</li>
        <li>/buscarUser/:id - EndPoint Anuncio</li>
        <br>
        <li>/comentario</li>
        <li>/cadastrar - EndPoint Comentario</li>
        <li>/editar/:id - EndPoint Comentario</li>
        <li>/deletar/:id - EndPoint Comentario</li>
        <li>/buscar/:anuncioId - EndPoint Comentario</li>
      </ul>
    </body>
    </html>
  `);
});

app.use(bodyParser.json());
app.use("/usuario", usuarioRouter);
app.use("/contrato", contratoRouter);
app.use("/anuncio", anuncioRouter);
app.use("/comentario", comentarioRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});