const contractService = require("./contractService.js");
async function getAllContract(req, res) {
  try {
    const rows = await contractService.getAllContract();

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "Error getting users",
      body: error.message,
    });
  }
}

async function createContract(req, res) {
  const { descricao, data_contrato, valor_total, duracao, assinatura } = req.body;

  try {
    await contractService.createContract(descricao, data_contrato, valor_total, duracao, assinatura);

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).send({
      message: "Error adding user!",
      error: error.message,
    });
  }
}
async function updateContract(req, res) {
  try {
    const { id } = req.params;
    const { descricao, data_contrato, valor_total, duracao, assinatura } = req.params;

    await contractService.updateContract(id, descricao, data_contrato, valor_total, duracao, assinatura);

    res.status(204).json("Success");
  } catch (error) {
    res.status(500).send({
      message: "Error update user!",
      error: error.message,
    });
  }
}
async function deleteContract(req, res) {
  try {
    const { id } = req.params;

    await contractService.deleteContract(id);

    res.status(200).send({ message: "Deleted User!" });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting user!",
      error: error.message,
    });
  }
}
async function getContractById(req, res) {
  try {
    const { id } = req.params;

    const user = await contractService.getContractById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      message: "Error getting user By ID",
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
