const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController.js");

router.get("/usuario", usuarioController.buscarUsuario);
router.post("/usuario", usuarioController.criarUsuario);
router.put("/usuario/:id", usuarioController.editarUsuario);
router.delete("/usuario/:id", usuarioController.deletarUsuario);
router.get("/usuario/:id", usuarioController.buscarUsuarioId);

module.exports = router;
