//request: trata do que as coisas do mundo de fora ta entrado no sistema
//response:trata do que vc quer responder la pra fora
import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString(); //data:iso 8601

  const databaseVersionResult = await database.query("SHOW server_version;"); //consulta ao BD
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname= $1;",
    values: [databaseName],
  });

  console.log(databaseOpenedConnectionsResult);
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  //(Esse response é do servidor)é a resposta que o seu servidor vai enviar para o cliente.
  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
