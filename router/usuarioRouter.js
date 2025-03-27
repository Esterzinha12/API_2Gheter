const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController.js");

router.get("/buscar/:id", usuarioController.buscarUsuarioId);
router.post("/cadastrar", usuarioController.cadastrarUsuario);
router.post("/login", usuarioController.loginUsuario);
router.put("/recadastrar", usuarioController.recadastrarSenha);

module.exports = router;