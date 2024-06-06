const anuncioService = require("../service/anuncioService.js");

async function buscarAnuncios(req, res) {
  try {
    const rows = await anuncioService.getAllAnuncio();

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar anuncio",
      body: error.message,
    });
  }
}

async function criarAnuncio(req, res) {
  const {
    empresa,
    funcao_vaga,
    descricao,
    quantidade_vaga,
    data_anuncio,
    valor_hora,
    usuarioId
  } = req.body;

  try {
    await anuncioService.criarAnuncio(
      empresa,
      funcao_vaga,
      descricao,
      quantidade_vaga,
      data_anuncio,
      valor_hora,
      usuarioId
    );

    res.status(201).json({ message: "Sucesso" });
  } catch (error) {
    res.status(500).send({
      message: "Erro ao criar anuncio!",
      error: error.message,
    });
  }
}

async function editarAnuncio(req, res) {
  try {
    const { id } = req.params;
    const {
      empresa,
      funcao_vaga,
      descricao,
      quantidade_vaga,
      data_anuncio,
      valor_hora,
      usuarioId
    } = req.body;

    await anuncioService.editarAnuncio(
      id,
      empresa,
      funcao_vaga,
      descricao,
      quantidade_vaga,
      data_anuncio,
      valor_hora,
      usuarioId
    );

    res.status(204).json({message: "Sucesso"});
  } catch (error) {
    res.status(500).send({
      message: "Erro editar anuncio!",
      error: error.message,
    });
  }
}

async function deletarAnuncio(req, res) {
  try {
    const { id } = req.params;

    await anuncioService.deletarAnuncio(id);

    res.status(200).send({ message: "Deletar anuncio!" });
  } catch (error) {
    res.status(500).send({
      message: "Erro ao deletar anuncio!",
      error: error.message,
    });
  }
}

async function buscarAnuncioId(req, res) {
  try {
    const { id } = req.params;

    const anuncio = await anuncioService.buscarAnuncioId(id);

    res.status(200).json(anuncio);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar anuncio por id",
      error: error.message,
    });
  }
}

module.exports = {
  buscarAnuncios,
  criarAnuncio,
  editarAnuncio,
  deletarAnuncio,
  buscarAnuncioId,
};
