const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createUsuarioTable() {
  try {
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS usuario (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        telefone VARCHAR(11) NOT NULL,
        cnpj VARCHAR(15) NOT NULL,
        email VARCHAR(255) NOT NULL
    )`);

    await connection.end();

    console.log("Tabela Usuario criada!");
  } catch (error) {
    console.log(`Error criar tabela Usuario: ${error}`);
  }
}

module.exports = {
  createUsuarioTable,
};
