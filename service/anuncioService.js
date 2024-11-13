
const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function buscarAnuncios() {
  const connection = await mysql.createConnection(databaseConfig);
  const [rows] = await connection.query("SELECT * FROM anuncio");
  await connection.end();
  return rows;
}

async function cadastrarAnuncio(titulo, estados, cidades, descricao, valorHora, usuarioId) {
  const connection = await mysql.createConnection(databaseConfig);
  const inserirAnuncio = `INSERT INTO anuncio(titulo, estados, cidades, descricao, valorHora, usuarioId, dataAnuncio) VALUES(?, ?, ?, ?, ?, ?, NOW())`;
  await connection.query(inserirAnuncio, [titulo, estados, cidades, descricao, valorHora, usuarioId]);
  await connection.end();
}

async function editarAnuncio(id, titulo, estados, cidades, descricao, valorHora) {
  const connection = await mysql.createConnection(databaseConfig);
  const editarAnuncio = "UPDATE anuncio SET titulo = ?, estados = ?, cidades = ?, descricao = ?, valorHora = ? WHERE id = ?";
  await connection.query(editarAnuncio, [titulo, estados, cidades, descricao, valorHora, id]);
  await connection.end();
}

async function deletarAnuncio(id) {
  const connection = await mysql.createConnection(databaseConfig);
  await connection.query("DELETE FROM anuncio WHERE id = ?", [id]);
  await connection.end();
}

async function buscarAnuncioId(id) {
  const connection = await mysql.createConnection(databaseConfig);
  const [advertisement] = await connection.query("SELECT * FROM anuncio WHERE id = ?", [id]);
  await connection.end();
  return advertisement;
}

module.exports = {
  buscarAnuncios,
  cadastrarAnuncio,
  editarAnuncio,
  deletarAnuncio,
  buscarAnuncioId,
};
