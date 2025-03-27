const express = require("express");
const router = express.Router();
const contratoController = require("../controller/contratoController.js");

router.get("/buscar", contratoController.buscarContratos);
router.post("/cadastrar", contratoController.criarContrato);
router.put("/editar/:id", contratoController.editarContrato);
router.delete("/deletar/:id", contratoController.deletarContrato);
router.get("/buscar/:id", contratoController.buscarContratoId);

module.exports = router;
