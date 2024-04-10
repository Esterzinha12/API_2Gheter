const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createContractTable() {
  try {
    const connection = await mysql.createConnection(databaseConfig);

await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS contract (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        description VARCHAR(100) NOT NULL,
    )`);

    await connection.end();

    console.log("Table contract created!");
  } catch (error) {
    console.log(`Error creating table Contract: ${error}`);
  }
}

createContractTable();






