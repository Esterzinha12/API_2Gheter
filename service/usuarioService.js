
const mysql = require("mysql2/promise"); 
const databaseConfig = require("../config/database.js");

async function getAllUsuario() {
  const connection = await mysql.createConnection(databaseConfig);

  const [rows] = await connection.query("SELECT * FROM usuario");

  await connection.end();

  return rows;
}
async function createUsuario(name, email, password) {
  const connection = await mysql.createConnection(databaseConfig);

  const insertUsuario =
    "INSERT INTO usuario(name, email, password) VALUES(?, ?, ?)";

  await connection.query(insertUsuario, [name, email, password]);

  await connection.end();
}

async function updateUsuario(id, name, email, password) {
  const connection = await mysql.createConnection(databaseConfig);

  const updateUsuario =
    "UPDATE usuario SET name = ?, email = ?, password = ? WHERE id = ?";

  await connection.query(updateUsuario, [name, email, password, id]);

  await connection.end();
}

async function deleteUsuario(id) {
  const connection = await mysql.createConnection(databaseConfig);

  await connection.query("DELETE FROM usuario WHERE id = ?", [id]);

  await connection.end();
}

async function getUsuarioById(id) {
  const connection = await mysql.createConnection(databaseConfig);

  const [ usuario ] = await connection.query(
    "SELECT * FROM usuario WHERE id = ?",
    [id]
  );

  await connection.end();

  return usuario;
}

module.exports = {
  getAllUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuarioById,
};