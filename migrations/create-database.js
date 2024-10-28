const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: databaseConfig.host,
      user: databaseConfig.user,
      password: databaseConfig.password,
    });

    await connection.query(
       `CREATE DATABASE IF NOT EXISTS ${databaseConfig.database}`
    );

    await connection.end();

    console.log("Database criada!");
  } catch (error) {
    console.log(`Erro criar database: ${error}`);
  }
}

async function dropDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: databaseConfig.host,
      user: databaseConfig.user,
      password: databaseConfig.password,
    });

    await connection.query(`DROP DATABASE IF EXISTS ${databaseConfig.database}`);
    await connection.end();

    console.log("Database removida!");
  } catch (error) {
    console.log(`Erro ao remover database: ${error}`);
  }
}

async function resetDatabase() {
  await dropDatabase();
  await createDatabase();
}

module.exports={
  resetDatabase,
  createDatabase,
  dropDatabase
}