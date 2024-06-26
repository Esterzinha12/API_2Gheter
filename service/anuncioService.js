
const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function buscarAnuncios() {
  const connection = await mysql.createConnection(databaseConfig);

  const [rows] = await connection.query("SELECT * FROM anuncio");

  await connection.end();

  return rows;
}

async function criarAnuncio(
  empresa,
  funcao_vaga,
  descricao,
  quantidade_vaga,
  data_anuncio,
  valor_hora,
  usuarioId
) {
  const connection = await mysql.createConnection(databaseConfig);

  const inserirAnuncio =
    "INSERT INTO anuncio(empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora, usuarioId) VALUES(?, ?, ?, ?, ?, ?, ?)";

  await connection.query(inserirAnuncio, [
    empresa,
    funcao_vaga,
    descricao,
    quantidade_vaga,
    data_anuncio,
    valor_hora,
    usuarioId
  ]);

  await connection.end();
}

async function editarAnuncio(
  id,
  empresa,
  funcao_vaga,
  descricao,
  quantidade_vaga,
  data_anuncio,
  valor_hora,
  usuarioId
) {
  const connection = await mysql.createConnection(databaseConfig);


  const editarAnuncio =
    "UPDATE anuncio SET empresa = ?, funcao_vaga = ?, descricao = ?, quantidade_vaga = ?, data_anuncio = ?, valor_hora = ?, usuarioId = ? WHERE id = ?";

  await connection.query(editarAnuncio, [
    empresa,
    funcao_vaga,
    descricao,
    quantidade_vaga,
    data_anuncio,
    valor_hora,
    usuarioId,
    id,
  ]);

  await connection.end();
}

async function deletarAnuncio(id) {
  const connection = await mysql.createConnection(databaseConfig);

  await connection.query("DELETE FROM anuncio WHERE id = ?", [id]);

  await connection.end();
}

async function buscarAnuncioId(id) {
  const connection = await mysql.createConnection(databaseConfig);

  const [advertisement] = await connection.query(
    "SELECT * FROM anuncio WHERE id = ?",
    [id]
  );

  await connection.end();

  return advertisement;
}

module.exports = {
  buscarAnuncios,
  criarAnuncio,
  editarAnuncio,
  deletarAnuncio,
  buscarAnuncioId,
};
