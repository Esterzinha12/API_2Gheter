const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController.js");

router.post("/cadastrar", usuarioController.cadastrarUsuario);
router.get("/login", usuarioController.loginUsuario);
router.put("/recadastrar", usuarioController.recadastrarSenha);

module.exports = router;