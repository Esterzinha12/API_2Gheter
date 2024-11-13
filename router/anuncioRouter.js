const express = require("express");
const router = express.Router();
const anuncioController = require("../controller/anuncioController.js");

router.get("/buscar-todos", anuncioController.buscarAnuncios);
router.post("/cadastrar", anuncioController.cadastrarAnuncio);
router.put("/editar", anuncioController.editarAnuncio);
router.delete("/deletar/:id", anuncioController.deletarAnuncio);
router.get("/buscar/:id", anuncioController.buscarAnuncioId);

module.exports = router;
