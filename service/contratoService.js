
const mysql = require("mysql2/promise"); 
const databaseConfig = require("../config/database.js");

async function getAllContract() {
  const connection = await mysql.createConnection(databaseConfig);

  const [rows] = await connection.query("SELECT * FROM contrato");

  await connection.end();

  return rows;
}
async function createContract(descricao, data_contrato, valor_total, duracao, assinatura) {
  const connection = await mysql.createConnection(databaseConfig);

  const insertContract =
    "INSERT INTO contrato(descricao, data_contrato, valor_total, duracao, assinatura) VALUES(?, ?, ?)";

  await connection.query(insertContract, [descricao, data_contrato, valor_total, duracao, assinatura]);

  await connection.end();
}

async function updateContract(id, descricao, data_contrato, valor_total, duracao, assinatura) {
  const connection = await mysql.createConnection(databaseConfig);

  const updateContract =
    "UPDATE contrato SET descricao = ?, data_contrato = ?, valor_total = ?, duracao = ?, assinatura = ? WHERE id = ?";

  await connection.query(updateContract, [descricao, data_contrato, valor_total, duracao, assinatura, id]);

  await connection.end();
}

async function deleteContract(id) {
  const connection = await mysql.createConnection(databaseConfig);

  await connection.query("DELETE FROM contrato WHERE id = ?", [id]);

  await connection.end();
}

async function getContractById(id) {
  const connection = await mysql.createConnection(databaseConfig);

  const [contrato] = await connection.query(
    "SELECT * FROM contrato WHERE id = ?",
    [id]
  );

  await connection.end();

  return contrato;
}

module.exports = {
  getAllContract,
  createContract,
  updateContract,
  deleteContract,
  getContractById,
};
