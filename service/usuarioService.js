const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function cadastrarUsuario(nome, cnpj, email, senha, telefone, tipo) {
  const connection = await mysql.createConnection(databaseConfig);
  const cadastrarUsuario = "INSERT INTO usuario(nome, cnpj, email, senha, telefone, tipo) VALUES(?, ?, ?, ?, ?, ?);";
  await connection.query(cadastrarUsuario, [nome, cnpj, email, senha, telefone, tipo]);
  await connection.end();
}

async function buscarUsuario(email) {
  const connection = await mysql.createConnection(databaseConfig);
  const [usuarios] = await connection.query("SELECT * FROM usuario WHERE email = ?;", [email]);
  await connection.end();
  return usuarios[0];
}

async function editarUsuario(email, novaSenha) {
  const connection = await mysql.createConnection(databaseConfig);
  const editarUsuario = "UPDATE usuario SET senha = ? WHERE email = ?;";
  await connection.query(editarUsuario, [novaSenha, email]);
  await connection.end();
}

async function buscarUsuarioId(id) {
  const connection = await mysql.createConnection(databaseConfig);
  const [advertisement] = await connection.query("SELECT * FROM usuario WHERE id = ?", [id]);
  await connection.end();
  return advertisement;
}

module.exports = {
  buscarUsuarioId,
  cadastrarUsuario,
  buscarUsuario,
  editarUsuario
};
