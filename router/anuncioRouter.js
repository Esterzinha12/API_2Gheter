const express = require("express");
const router = express.Router();
const anuncioController = require("../controller/anuncioController.js");

router.get("/anuncio", anuncioController.buscarAnuncios);
router.post("/anuncio", anuncioController.criarAnuncio);
router.put("/anuncio/:id", anuncioController.editarAnuncio);
router.delete("/anuncio/:id", anuncioController.deletarAnuncio);
router.get("/anuncio/:id", anuncioController.buscarAnuncioId);

module.exports = router;
