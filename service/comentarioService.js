const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function cadastrarComentario(descricao, anuncioId, usuarioId) {
  const connection = await mysql.createConnection(databaseConfig);
  const cadastrarComentario = "INSERT INTO comentario(descricao, usuarioId, anuncioId) VALUES(?, ?, ?);";
  await connection.query(cadastrarComentario, [descricao, usuarioId, anuncioId]);
  await connection.end();
}
async function editarComentario(id, descricao) {
  const connection = await mysql.createConnection(databaseConfig);
  const editarComentario = "UPDATE comentario SET descricao = ? WHERE id = ?;";
  await connection.query(editarComentario, [descricao, id]);
  await connection.end();
}

async function buscarComentarioId(anuncioId) {
  const connection = await mysql.createConnection(databaseConfig);
  const [advertisement] = await connection.query("SELECT * FROM comentario WHERE anuncioId = ?", [anuncioId]);
  await connection.end();
  return advertisement;
}

async function deletarComentario(id) {
    const connection = await mysql.createConnection(databaseConfig);
  
    await connection.query("DELETE FROM comentario WHERE id = ?", [id]);
  
    await connection.end();
  }

module.exports = {
  buscarComentarioId,
  cadastrarComentario,
  editarComentario,
  deletarComentario
};