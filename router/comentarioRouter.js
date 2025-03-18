const express = require("express");
const router = express.Router();
const comentarioController = require("../controller/comentarioController.js");

router.post("/cadastrar", comentarioController.cadastrarComentario);
router.put("/editar/:id", comentarioController.editarComentario);
router.delete("/deletar/:id", comentarioController.deletarComentario);
router.get("/buscar/:id", comentarioController.buscarComentarioId);

module.exports = router;