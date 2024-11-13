const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createAnuncioTable() {
  try {
    const connection = await mysql.createConnection(databaseConfig);

await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS anuncio (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(1000) NOT NULL,
      estados VARCHAR(1000) NOT NULL,
      cidades VARCHAR(1000) NOT NULL,
      descricao VARCHAR(1000) NOT NULL,
      valorHora DOUBLE NOT NULL,
      dataAnuncio DATE,
      usuarioId INT NOT NULL,
      FOREIGN KEY (usuarioId) REFERENCES usuario(id)
    )`);

    await connection.end();

    console.log("Tabela anuncio criada!");
  } catch (error) {
    console.log(`Erro criar tabela Anuncio: ${error}`);
  }
}

module.exports={
  createAnuncioTable
}