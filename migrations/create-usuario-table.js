const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createUserTable() {
  try {
    const connection = await mysql.createConnection(databaseConfig);

await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS user (
        idPESSOA INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        telefone VARCHAR(11) NOT NULL,
        cnpj/cpf VARCHAR(15) NOT NULL,
        email VARCHAR(255) NOT NULL,
    )`);

    await connection.end();

    console.log("Table user created!");
  } catch (error) {
    console.log(`Error creating table User: ${error}`);
  }
}

createUserTable();