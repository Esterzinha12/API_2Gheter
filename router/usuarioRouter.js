const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController.js");

router.post("/inserir", usuarioController.inserirUsuario);
router.get("/buscar", usuarioController.buscarUsuarios);
router.get("/buscar/:nome", usuarioController.buscarUsuario);
router.put("/editar/:nome", usuarioController.editarUsuario);
router.delete("/deletar/:nome", usuarioController.deletarUsuario);

module.exports = router;