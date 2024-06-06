const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function buscarUsuario() {
  const connection = await mysql.createConnection(databaseConfig);

  const [rows] = await connection.query("SELECT * FROM usuario");

  await connection.end();

  return rows;
}
async function criarUsuario(nome, telefone, cnpj, email) {
  const connection = await mysql.createConnection(databaseConfig);

  const inserirUsuario =
    "INSERT INTO usuario(nome, telefone, cnpj, email) VALUES(?, ?, ?, ?)";

  await connection.query(inserirUsuario, [nome, telefone, cnpj, email]);

  await connection.end();
}

async function editarUsuario(id, nome, telefone, cnpj, email) {
  const connection = await mysql.createConnection(databaseConfig);

  const editarUsuario =
    "UPDATE usuario SET nome = ?, telefone = ?, cnpj = ?, email = ? WHERE id = ?";

  await connection.query(editarUsuario, [nome, telefone, cnpj, email, id]);

  await connection.end();
}

async function deletarUsuario(id) {
  const connection = await mysql.createConnection(databaseConfig);

  await connection.query("DELETE FROM usuario WHERE id = ?", [id]);

  await connection.end();
}

async function buscarUsuarioId(id) {
  const connection = await mysql.createConnection(databaseConfig);

  const [usuario] = await connection.query(
    "SELECT * FROM usuario WHERE id = ?",
    [id]
  );

  await connection.end();

  return usuario;
}

module.exports = {
  buscarUsuario,
  criarUsuario,
  editarUsuario,
  deletarUsuario,
  buscarUsuarioId,
};
