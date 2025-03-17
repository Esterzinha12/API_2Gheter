
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

async function editarAnuncio(id, titulo, estados, cidades, descricao, valorHora ) {
  console.log(id, titulo)
  const connection = await mysql.createConnection(databaseConfig);

  const campos = [];
  const valores = [];
  if (titulo !== undefined) {
    campos.push("titulo = ?");
    valores.push(titulo);
  }
  if (estados !== undefined) {
    campos.push("estados = ?");
    valores.push(estados);
  }
  if (cidades !== undefined) {
    campos.push("cidades = ?");
    valores.push(cidades);
  }
  if (descricao !== undefined) {
    campos.push("descricao = ?");
    valores.push(descricao);
  }
  if (valorHora !== undefined) {
    campos.push("valorHora = ?");
    valores.push(valorHora);
  }
  if (campos.length === 0) {
    throw new Error("Nenhum campo para atualizar foi fornecido.");
  }

  const editarAnuncio = `UPDATE anuncio SET ${campos.join(", ")} WHERE id = ?`;
  valores.push(id);

  await connection.query(editarAnuncio, valores);
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
