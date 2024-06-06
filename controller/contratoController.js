const contratoService = require("../service/contratoService.js");

async function buscarContratos(req, res) {
  try {
    const rows = await contratoService.buscarContratos();

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar contrato",
      body: error.message,
    });
  }
}

async function criarContrato(req, res) {
  const { descricao, data_contrato, valor_total, duracao, assinatura, usuarioId, anuncioId } =
    req.body;

  try {
    await contratoService.criarContrato(
      descricao,
      data_contrato,
      valor_total,
      duracao,
      assinatura,
      usuarioId, 
      anuncioId
    );

    res.status(201).json({message: "Sucesso"});
  } catch (error) {
    res.status(500).send({
      message: "Erro ao criar contrato!",
      error: error.message,
    });
  }
}

async function editarContrato(req, res) {
  try {
    const { id } = req.params;
    const { descricao, data_contrato, valor_total, duracao, assinatura, usuarioId, anuncioId } =
      req.body;

    await contratoService.editarContrato(
      id,
      descricao,
      data_contrato,
      valor_total,
      duracao,
      assinatura,
      usuarioId, 
      anuncioId
    );

    res.status(204).json({message: "Sucesso"});
  } catch (error) {
    res.status(500).send({
      message: "Erro ao editar contrato!",
      error: error.message,
    });
  }
}

async function deletarContrato(req, res) {
  try {
    const { id } = req.params;

    await contratoService.deletarContrato(id);

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

    const contrato = await contratoService.buscarContratoId(id);

    res.status(200).json(contrato);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar contrato por id",
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
