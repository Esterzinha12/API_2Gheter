const express = require("express");
const router = express.Router();
const contractController = require("../controller/contractController.js");

router.get("/contract", contractController.getAllContract);
router.post("/contract", contractController.createContract);
router.put("/contract/:id", contractController.updateContract);
router.delete("/contract/:id", contractController.deleteContract);
router.get("/contract/:id", contractController.getContractById);

module.exports = router;
