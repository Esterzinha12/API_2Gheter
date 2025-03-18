const comentarioService = require("../service/comentarioService.js");

async function cadastrarComentario(req, res) {
  const { descricao, usuarioId, anuncioId } =
    req.body;

  try {
    await comentarioService.cadastrarComentario(
      descricao,
      usuarioId, 
      anuncioId
    );

    res.status(201).json({message: "Sucesso"});
  } catch (error) {
    res.status(500).send({
      message: "Erro ao criar comentario!",
      error: error.message,
    });
  }
}

async function editarComentario(req, res) {
  try {
    const { id } = req.params;
    const { descricao, usuarioId, anuncioId } =
      req.body;

    await comentarioService.editarComentario(
      id,
      descricao,
      usuarioId, 
      anuncioId
    );

    res.status(200).json({message: "Sucesso"});
  } catch (error) {
    res.status(500).send({
      message: "Erro ao editar comentario!",
      error: error.message,
    });
  }
}

async function deletarComentario(req, res) {
  try {
    const { id } = req.params;

    await comentarioService.deletarComentario(id);

    res.status(200).send({ message: "Comentario deletado" });
  } catch (error) {
    res.status(500).send({
      message: "Erro ao deletar comentario",
      error: error.message,
    });
  }
}

async function buscarComentarioId(req, res) {
  try {
    const { anuncioId } = req.params;

    const comentario = await comentarioService.buscarComentarioId(anuncioId);

    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar comentario por id",
      error: error.message,
    });
  }
}

module.exports = {
  cadastrarComentario,
  editarComentario,
  deletarComentario,
  buscarComentarioId,
};
