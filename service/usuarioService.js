const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function buscarUsuario() {
  const connection = await mysql.createConnection(databaseConfig);

  const [rows] = await connection.query("SELECT * FROM usuario");

  await connection.end();

  return rows;
}
async function criarUsuario(name, email, password) {
  const connection = await mysql.createConnection(databaseConfig);

  const insertUsuario =
    "INSERT INTO usuario(name, email, password) VALUES(?, ?, ?)";

  await connection.query(insertUsuario, [name, email, password]);

  await connection.end();
}

async function editarUsuario(id, name, email, password) {
  const connection = await mysql.createConnection(databaseConfig);

  const updateUsuario =
    "UPDATE usuario SET name = ?, email = ?, password = ? WHERE id = ?";

  await connection.query(updateUsuario, [name, email, password, id]);

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
