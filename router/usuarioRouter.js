const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController.js");

router.post("/cadastro", usuarioController.cadastrarUsuario);
router.get("/login", usuarioController.logarUsuario);
router.put("/recadastro", usuarioController.recadastrarSenha);

module.exports = router;