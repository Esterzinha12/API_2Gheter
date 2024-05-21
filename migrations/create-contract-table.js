const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createContractTable() {
  try {
    const connection = await mysql.createConnection(databaseConfig);

await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS contrato (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      descricao VARCHAR(1000) NOT NULL,
      data_contrato DATE NOT NULL,
      valor_total VARCHAR(15) NOT NULL,
      duracao VARCHAR(45) NOT NULL,
      assinatura VARCHAR(45) NOT NULL,
      USUARIO_idUSUARIO INT NOT NULL,
      ANUNCIO_idANUNCIO INT NOT NULL,
      FOREIGN KEY (USUARIO_idUSUARIO) REFERENCES usuario(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
      FOREIGN KEY (ANUNCIO_idANUNCIO) REFERENCES anuncio(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    )`);

    await connection.end();

    console.log("Table contract created!");
  } catch (error) {
    console.log(`Error creating table Contract: ${error}`);
  }
}

createContractTable();






