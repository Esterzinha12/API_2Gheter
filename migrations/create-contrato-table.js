const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createContratoTable() {
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
      usuarioId INT NOT NULL,
      anuncioId INT NOT NULL,
      FOREIGN KEY (usuarioId) REFERENCES usuario(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
      FOREIGN KEY (anuncioId) REFERENCES anuncio(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    )`);

    await connection.end();

    console.log("Table contract created!");
  } catch (error) {
    console.log(`Error creating table Contrato: ${error}`);
  }
}

createContratoTable();






