const createDatabase = require("./create-database");
const createUsuarioTable = require("./create-usuario-table");
const createAnuncioTable = require("./create-anuncio-table");
const createContratoTable = require("./create-contrato-table");

async function remigration() {
  await createDatabase.resetDatabase();
  await createUsuarioTable.createUsuarioTable();
  await createAnuncioTable.createAnuncioTable();
  await createContratoTable.createContratoTable();
}

remigration();