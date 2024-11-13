const anuncioService = require("../service/anuncioService.js");

async function buscarAnuncios(req, res) {
  try {
    const rows = await anuncioService.buscarAnuncios();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar anuncio",
      body: error.message,
    });
  }
}

async function cadastrarAnuncio(req, res) {
  const {titulo, estados, cidades, descricao, valorHora, usuarioId} = req.body;
  try {
    await anuncioService.cadastrarAnuncio(titulo, estados, cidades, descricao, valorHora, usuarioId);
    res.status(201).json({ message: "Sucesso" });
  } catch (error) {
    res.status(500).send({
      message: "Erro ao criar anuncio!",
      error: error.message,
    });
  }
}

async function editarAnuncio(req, res) {
  const {id, titulo, estados, cidades, descricao, valorHora} = req.body;
  try {
    await anuncioService.editarAnuncio(id, titulo, estados, cidades, descricao, valorHora);
    res.status(200).json({message: "Sucesso"});
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
    res.status(200).send({ message: "Anuncio deletado!" });
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
  cadastrarAnuncio,
  editarAnuncio,
  deletarAnuncio,
  buscarAnuncioId,
};
