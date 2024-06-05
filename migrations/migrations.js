const createDatabase = require("./create-database");

async function migration(){
    await createDatabase.createDatabase();

}

migration();