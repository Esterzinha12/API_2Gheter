const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createContratoTable() {
  try {
    const connection = await mysql.createConnection(databaseConfig);

await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS contrato (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      descricao VARCHAR(1000) NOT NULL,
      data_contrato TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

    console.log("Tabela contrato criada!");
  } catch (error) {
    console.log(`Erro criar tabela Contrato: ${error}`);
  }
}
module.exports={
  createContratoTable
}






