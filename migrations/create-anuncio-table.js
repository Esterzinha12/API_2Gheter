const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createAnuncioTable() {
  try {
    const connection = await mysql.createConnection(databaseConfig);

await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS anuncio (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      empresa VARCHAR(45) NOT NULL,
      funcao_vaga VARCHAR(45) NOT NULL,
      descricao VARCHAR(1000) NOT NULL,
      quantidade_vaga INT NOT NULL,
      data_anuncio DATE,
      valor_hora DOUBLE NOT NULL,
      usuarioId INT NOT NULL,
      FOREIGN KEY (usuarioId) REFERENCES usuario(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    )`);

    await connection.end();

    console.log("Tabela anuncio criada!");
  } catch (error) {
    console.log(`Erro criar tabela Anuncio: ${error}`);
  }
}

createAnuncioTable();