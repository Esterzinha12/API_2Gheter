const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function inserirUsuario(nome, cnpj, email, senha, telefone, tipo) {
  const connection = await mysql.createConnection(databaseConfig);
  const inserirUsuario = "INSERT INTO usuario(nome, cnpj, email, senha, telefone, tipo) VALUES(?, ?, ?, ?, ?, ?);";
  await connection.query(inserirUsuario, [nome, cnpj, email, senha, telefone, tipo]);
  await connection.end();
}

async function buscarUsuarios() {
  const connection = await mysql.createConnection(databaseConfig);
  const [rows] = await connection.query("SELECT * FROM usuario;");
  await connection.end();
  return rows;
}

async function buscarUsuario(nome) {
  const connection = await mysql.createConnection(databaseConfig);
  const [usuario] = await connection.query("SELECT * FROM usuario WHERE nome = ?;", [nome]);
  await connection.end();
  return usuario;
}

async function editarUsuario(chave, nome, cnpj, email, senha, telefone, tipo) {
  const connection = await mysql.createConnection(databaseConfig);
  const editarUsuario = "UPDATE usuario SET nome = ?, cnpj = ?, email = ?, senha = ?, telefone = ?, tipo = ? WHERE nome = ?;";
  await connection.query(editarUsuario, [nome, cnpj, email, senha, telefone, tipo, chave]);
  await connection.end();
}

async function deletarUsuario(nome) {
  const connection = await mysql.createConnection(databaseConfig);
  await connection.query("DELETE FROM usuario WHERE nome = ?;", [nome]);
  await connection.end();
}

module.exports = {
  inserirUsuario,
  buscarUsuarios,
  buscarUsuario,
  editarUsuario,
  deletarUsuario
};
