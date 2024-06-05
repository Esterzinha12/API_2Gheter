const userService = require("../service/usuarioService.js");

async function buscarUsuario(req, res) {
  try {
    const rows = await userService.getAllUser();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "Erro buscar Usuário",
      body: error.message,
    });
  }
}

async function criarUsuario(req, res) {
  const { name, email, password } = req.body;
  try {
    await userService.createUser(name, email, password);
    res.status(201).json({ message: "sucesso" });
  } catch (error) {
    res.status(500).send({
      message: "Erro criar Usuário",
      error: error.message,
    });
  }
}

async function editarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    await userService.updateUser(id, name, email, password);
    res.status(204).json("Successo");
  } catch (error) {
    res.status(500).send({
      message: "Erro editar Usuário",
      error: error.message,
    });
  }
}

async function deletarUsuario(req, res) {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(200).send({ message: "Usuário deletado" });
  } catch (error) {
    res.status(500).send({
      message: "Erro deletar Usuário",
      error: error.message,
    });
  }
}

async function buscarUsuarioId(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      message: "Erro buscar usuário id",
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
