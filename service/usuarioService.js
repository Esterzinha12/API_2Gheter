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

module.exports = {
  cadastrarUsuario,
  buscarUsuario,
  editarUsuario
};
