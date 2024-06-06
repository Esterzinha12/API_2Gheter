const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function buscarContratos() {
  const connection = await mysql.createConnection(databaseConfig);

  const [rows] = await connection.query("SELECT * FROM contrato");

  await connection.end();

  return rows;
}
async function criarContrato(
  descricao,
  data_contrato,
  valor_total,
  duracao,
  assinatura,
  usuarioId,
  anuncioId
) {
  const connection = await mysql.createConnection(databaseConfig);

  const inserirContrato =
    "INSERT INTO contrato(descricao, data_contrato, valor_total, duracao, assinatura, usuarioId, anuncioId) VALUES(?, ?, ?, ?, ?, ?, ?)";

  await connection.query(inserirContrato, [
    descricao,
    data_contrato,
    valor_total,
    duracao,
    assinatura,
    usuarioId,
    anuncioId
  ]);

  await connection.end();
}

async function editarContrato(
  id,
  descricao,
  data_contrato,
  valor_total,
  duracao,
  assinatura,
  usuarioId,
  anuncioId
) {
  const connection = await mysql.createConnection(databaseConfig);

  const editarContrato =
    "UPDATE contrato SET descricao = ?, data_contrato = ?, valor_total = ?, duracao = ?, assinatura = ?, usuarioId = ?, anuncioId = ? WHERE id = ?";

  await connection.query(editarContrato, [
    descricao,
    data_contrato,
    valor_total,
    duracao,
    assinatura,
    usuarioId,
    anuncioId,
    id,
  ]);

  await connection.end();
}

async function deletarContrato(id) {
  const connection = await mysql.createConnection(databaseConfig);

  await connection.query("DELETE FROM contrato WHERE id = ?", [id]);

  await connection.end();
}

async function buscarContratoId(id) {
  const connection = await mysql.createConnection(databaseConfig);

  const [contrato] = await connection.query(
    "SELECT * FROM contrato WHERE id = ?",
    [id]
  );

  await connection.end();

  return contrato;
}

module.exports = {
  buscarContratos,
  criarContrato,
  editarContrato,
  deletarContrato,
  buscarContratoId,
};
