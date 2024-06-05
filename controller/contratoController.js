const contratoService = require("../service/contratoService.js");

async function buscarContratos(req, res) {
  try {
    const rows = await contratoService.getAllContract();

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "Erro buscar contrato",
      body: error.message,
    });
  }
}

async function criarContrato(req, res) {

  const { descricao, data_contrato, valor_total, duracao, assinatura } = req.body;

  try {
    await contratoService.createContract(descricao, data_contrato, valor_total, duracao, assinatura);

    res.status(201).json({ message: "Sucesso" });
  } catch (error) {
    res.status(500).send({
      message: "Erro criar contrato!",
      error: error.message,
    });
  }
}

async function editarContrato(req, res) {
  try {
    const { id } = req.params;
    const { descricao, data_contrato, valor_total, duracao, assinatura } = req.params;

    await contratoService.updateContract(id, descricao, data_contrato, valor_total, duracao, assinatura);

    res.status(204).json("Successo");
  } catch (error) {
    res.status(500).send({
      message: "Erro editar contrato!",
      error: error.message,
    });
  }
}

async function deletarContrato(req, res) {
  try {
    const { id } = req.params;

    await contratoService.deleteContract(id);

    res.status(200).send({ message: "Contrato deletado" });
  } catch (error) {
    res.status(500).send({
      message: "Erro ao deletar contrato",
      error: error.message,
    });
  }
}

async function buscarContratoId(req, res) {
  try {
    const { id } = req.params;

    const contrato = await contratoService.getContractById(id);

    res.status(200).json(contrato);
  } catch (error) {
    res.status(500).send({
      message: "Erro buscar contrato por id",
      error: error.message,
    });
  }
}

module.exports = {
  buscarContratos,
  criarContrato,
  editarContrato,
  deletarContrato,
  buscarContratoId,
};
