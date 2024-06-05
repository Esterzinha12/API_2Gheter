const advertisementService = require("../service/advertisement.js");

async function getAllAdvertisement(req, res) {
  try {
    const rows = await advertisementService.getAllAdvertisement();

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "Error getting advertisements",
      body: error.message,
    });
  }
}

async function createAdvertisement(req, res) {
  //alterar
  const {  empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora } = req.body;

  try {
    await advertisementService.createAdvertisement( empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora);

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).send({
      message: "Error adding advertisement!",
      error: error.message,
    });
  }
}

async function updateAdvertisement(req, res) {
  //alterar
  try {
    const { id } = req.params;
    const { empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora } = req.params;

    await advertisementService.updateAdvertisement(id, empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora);

    res.status(204).json("Success");
  } catch (error) {
    res.status(500).send({
      message: "Error update advertisement!",
      error: error.message,
    });
  }
}

async function deleteAdvertisement(req, res) {
  try {
    const { id } = req.params;

    await advertisementService.deleteAdvertisement(id);

    res.status(200).send({ message: "Deleted Advertisement!" });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting advertisement!",
      error: error.message,
    });
  }
}

async function getAdvertisementById(req, res) {
  try {
    const { id } = req.params;

    const advertisement = await advertisementService.getAdvertisementById(id);

    res.status(200).json(advertisement);
  } catch (error) {
    res.status(500).send({
      message: "Error getting advertisement By ID",
      error: error.message,
    });
  }
}

module.exports = {
  getAllAdvertisement,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  getAdvertisementById,
};
