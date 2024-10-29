const userService = require("../service/usuarioService.js");

async function inserirUsuario(req, res) {
  const { nome, cnpj, email, senha, telefone, tipo } = req.body;
  try {
    await userService.inserirUsuario(nome, cnpj, email, senha, telefone, tipo);
    res.status(201).json({ message: "Sucesso" });
  } catch (error) {
    res.status(500).send({
      message: "Erro ao criar usuário",
      error: error.message,
    });
  }
}

async function buscarUsuarios(req, res) {
  try {
    const rows = await userService.buscarUsuarios();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar usuários",
      body: error.message,
    });
  }
}

async function buscarUsuario(req, res) {
  try {
    const { nome } = req.params;
    const user = await userService.buscarUsuario(nome);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar usuário por nome",
      error: error.message,
    });
  }
}

async function editarUsuario(req, res) {
  try {
    const { chave } = req.params;
    const { nome, cnpj, email, senha, telefone, tipo } = req.body;
    await userService.editarUsuario(chave, nome, cnpj, email, senha, telefone, tipo);
    res.status(200).json({message: "Sucesso"});
  } catch (error) {
    res.status(500).send({
      message: "Erro ao editar usuário",
      error: error.message,
    });
  }
}

async function deletarUsuario(req, res) {
  try {
    const { nome } = req.params;
    await userService.deletarUsuario(nome);
    res.status(200).send({ message: "Usuário deletado" });
  } catch (error) {
    res.status(500).send({
      message: "Erro ao deletar usuário",
      error: error.message,
    });
  }
}

module.exports = {
  inserirUsuario,
  buscarUsuarios,
  buscarUsuario,
  editarUsuario,
  deletarUsuario
};
