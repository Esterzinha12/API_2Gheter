const advertisementService = require("./advertisementService.js");

async function getAllAdvertisement(req, res) {
  try {
    const rows = await advertisementService.getAllAdvertisement();

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "Error getting users",
      body: error.message,
    });
  }
}

async function createAdvertisement(req, res) {
  const { empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora } = req.body;

  try {
    await advertisementService.createAdvertisement(empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora);

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).send({
      message: "Error adding user!",
      error: error.message,
    });
  }
}

async function updateAdvertisement(req, res) {
  try {
    const { id } = req.params;
    const { empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora } = req.params;

    await advertisementService.updateAdvertisement(id, empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora);

    res.status(204).json("Success");
  } catch (error) {
    res.status(500).send({
      message: "Error update user!",
      error: error.message,
    });
  }
}
async function deleteAdvertisement(id) {
  const connection = await mysql.createConnection(databaseConfig);

  await connection.query("DELETE FROM advertisement WHERE id = ?", [id]);

  await connection.end();
}
async function deleteAdvertisement(req, res) {
  try {
    const { id } = req.params;

    await advertisementService.deleteAdvertisement(id);

    res.status(200).send({ message: "Deleted Advertisement!" });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting user!",
      error: error.message,
    });
  }
}
async function getAdvertisementById(id) {
  const connection = await mysql.createConnection(databaseConfig);

  const [advertisement] = await connection.query(
    "SELECT * FROM advertisement WHERE id = ?",
    [id]
  );

  await connection.end();

  return advertisement;
}
async function getAdvertisementById(req, res) {
  try {
    const { id } = req.params;

    const user = await advertisementService.getAdvertisementById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      message: "Error getting user By ID",
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
