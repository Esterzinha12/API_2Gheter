const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createAdvertisementTable() {
  try {
    const connection = await mysql.createConnection(databaseConfig);

await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS anuncio (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        empresa VARCHAR(45) NOT NULL,
        funcao_vaga VARCHAR()
    )`);

    await connection.end();

    console.log("Table advertisement created!");
  } catch (error) {
    console.log(`Error creating table Advertisement: ${error}`);
  }
}

createAdvertisementTable();