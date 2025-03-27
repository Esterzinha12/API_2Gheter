const createDatabase = require("./create-database");
const createUsuarioTable = require("./create-usuario-table");
const createAnuncioTable = require("./create-anuncio-table");
const createContratoTable = require("./create-contrato-table");
const createComentarioTable = require("./create-comentario-table");

async function migration() {
  await createDatabase.createDatabase();
  await createUsuarioTable.createUsuarioTable();
  await createAnuncioTable.createAnuncioTable();
  await createContratoTable.createContratoTable();
  await createComentarioTable.createComentarioTable();
}

migration();
