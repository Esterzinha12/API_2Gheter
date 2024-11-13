const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController.js");

router.post("/cadastrar", usuarioController.cadastrarUsuario);
router.get("/logar", usuarioController.logarUsuario);
router.put("/recadastrar", usuarioController.recadastrarSenha);

module.exports = router;