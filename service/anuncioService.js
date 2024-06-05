
const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function getAllAdvertisement() {
  const connection = await mysql.createConnection(databaseConfig);

  const [rows] = await connection.query("SELECT * FROM advertisement");

  await connection.end();

  return rows;
}

async function createAdvertisement(empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora) {
  const connection = await mysql.createConnection(databaseConfig);

  const insertAdvertisement =
    "INSERT INTO advertisement(empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora) VALUES(?, ?, ?, ?, ?, ?)";

  await connection.query(insertAdvertisement, [empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora]);

  await connection.end();
}

async function updateAdvertisement(id, empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora) {
  const connection = await mysql.createConnection(databaseConfig);

  const updateAdvertisement =
    "UPDATE advertisement SET empresa = ?, funcao_vaga = ?, descricao = ?, quantidade_vaga = ?, data_anuncio = ?, valor_hora = ? WHERE id = ?";

  await connection.query(updateAdvertisement, [empresa, funcao_vaga, descricao, quantidade_vaga, data_anuncio, valor_hora, id]);

  await connection.end();
}

async function deleteAdvertisement(id) {
  const connection = await mysql.createConnection(databaseConfig);

  await connection.query("DELETE FROM advertisement WHERE id = ?", [id]);

  await connection.end();
}

async function getAdvertisementById(id) {
  const connection = await mysql.createConnection(databaseConfig);

  const [advertisement] = await connection.query(
    "SELECT * FROM advertisement WHERE id = ?",
    [id]
  );

  await connection.end();

  return advertisement;
}

module.exports = {
  getAllAdvertisement,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  getAdvertisementById,
};
