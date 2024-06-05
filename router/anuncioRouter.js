const express = require("express");
const router = express.Router();
const advertisementController = require("../controller/anuncioController.js");

router.get("/advertisement", advertisementController.getAllAdvertisement);
router.post("/advertisement", advertisementController.createAdvertisement);
router.put("/advertisement/:id", advertisementController.updateAdvertisement);
router.delete("/advertisement/:id", advertisementController.deleteAdvertisement);
router.get("/advertisement/:id", advertisementController.getAdvertisementById);

module.exports = router;
