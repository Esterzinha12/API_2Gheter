const contratoService = require("../service/contrato.js");

async function getAllContract(req, res) {
  try {
    const rows = await contratoService.getAllContract();

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "Error getting contratos",
      body: error.message,
    });
  }
}

async function createContract(req, res) {
  //alterar
  const { descricao, data_contrato, valor_total, duracao, assinatura } = req.body;

  try {
    await contratoService.createContract(descricao, data_contrato, valor_total, duracao, assinatura);

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).send({
      message: "Error adding contrato!",
      error: error.message,
    });
  }
}

async function updateContract(req, res) {
  //alterar
  try {
    const { id } = req.params;
    const { descricao, data_contrato, valor_total, duracao, assinatura } = req.params;

    await contratoService.updateContract(id, descricao, data_contrato, valor_total, duracao, assinatura);

    res.status(204).json("Success");
  } catch (error) {
    res.status(500).send({
      message: "Error update contrato!",
      error: error.message,
    });
  }
}

async function deleteContract(req, res) {
  try {
    const { id } = req.params;

    await contratoService.deleteContract(id);

    res.status(200).send({ message: "Deleted Contract!" });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting contrato!",
      error: error.message,
    });
  }
}

async function getContractById(req, res) {
  try {
    const { id } = req.params;

    const contrato = await contratoService.getContractById(id);

    res.status(200).json(contrato);
  } catch (error) {
    res.status(500).send({
      message: "Error getting contrato By ID",
      error: error.message,
    });
  }
}

module.exports = {
  getAllContract,
  createContract,
  updateContract,
  deleteContract,
  getContractById,
};
