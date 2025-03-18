const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createComentarioTable() {
  try {
    const connection = await mysql.createConnection(databaseConfig);

await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS comentario (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      descricao VARCHAR(250) NOT NULL,
      usuarioId INT NOT NULL,
      FOREIGN KEY (usuarioId) REFERENCES usuario(id),
      anuncioId INT NOT NULL,
      FOREIGN KEY (anuncioId) REFERENCES anuncio(id)
    )`);

    await connection.end();

    console.log("Tabela comentario criada!");
  } catch (error) {
    console.log(`Erro criar tabela Comentario: ${error}`);
  }
}

module.exports={
  createComentarioTable
}