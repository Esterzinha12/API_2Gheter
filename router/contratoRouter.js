const express = require("express");
const router = express.Router();
const contratoController = require("../controller/contratoController.js");

router.get("/contrato", contratoController.buscarContratos);
router.post("/contrato", contratoController.criarContrato);
router.put("/contrato/:id", contratoController.editarContrato);
router.delete("/contrato/:id", contratoController.deletarContrato);
router.get("/contrato/:id", contratoController.buscarContratoId);

module.exports = router;
