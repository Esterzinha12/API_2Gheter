const userService = require("../service/usuarioService.js");

async function buscarUsuario(req, res) {
  try {
    const rows = await userService.buscarUsuario();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar Usuário",
      body: error.message,
    });
  }
}

async function criarUsuario(req, res) {
  const { nome, telefone, cnpj, email } = req.body;
  try {
    await userService.criarUsuario(nome, telefone, cnpj, email);
    res.status(201).json({ message: "sucesso" });
  } catch (error) {
    res.status(500).send({
      message: "Erro ao criar Usuário",
      error: error.message,
    });
  }
}

async function editarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nome, telefone, cnpj, email } = req.body;
    await userService.editarUsuario(id, nome, telefone, cnpj, email);
    res.status(204).json({message: "Sucesso"});
  } catch (error) {
    res.status(500).send({
      message: "Erro ao editar Usuário",
      error: error.message,
    });
  }
}

async function deletarUsuario(req, res) {
  try {
    const { id } = req.params;
    await userService.deletarUsuario(id);
    res.status(200).send({ message: "Usuário deletado" });
  } catch (error) {
    res.status(500).send({
      message: "Erro ao deletar Usuário",
      error: error.message,
    });
  }
}

async function buscarUsuarioId(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.buscarUsuarioId(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar usuário id",
      error: error.message,
    });
  }
}

module.exports = {
  buscarUsuario,
  criarUsuario,
  editarUsuario,
  deletarUsuario,
  buscarUsuarioId,
};
