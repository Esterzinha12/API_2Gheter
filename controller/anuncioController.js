const anuncioService = require("../service/anuncioController.js");

async function buscarAnuncios(req, res) {
  try {
    const rows = await anuncioService.getAllanuncio();

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "Erro buscar anuncio",
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
  } = req.body;

  try {
    await anuncioService.createanuncio(
      empresa,
      funcao_vaga,
      descricao,
      quantidade_vaga,
      data_anuncio,
      valor_hora
    );

    res.status(201).json({ message: "Sucesso" });
  } catch (error) {
    res.status(500).send({
      message: "Erro criar anuncio!",
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
    } = req.params;

    await anuncioService.updateanuncio(
      id,
      empresa,
      funcao_vaga,
      descricao,
      quantidade_vaga,
      data_anuncio,
      valor_hora
    );

    res.status(204).json("Sucesso");
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

    await anuncioService.deleteanuncio(id);

    res.status(200).send({ message: "Deletar anuncio!" });
  } catch (error) {
    res.status(500).send({
      message: "Erro deletar anuncio!",
      error: error.message,
    });
  }
}

async function buscarAnuncioId(req, res) {
  try {
    const { id } = req.params;

    const anuncio = await anuncioService.getanuncioById(id);

    res.status(200).json(anuncio);
  } catch (error) {
    res.status(500).send({
      message: "Erro buscar anuncio por id",
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
