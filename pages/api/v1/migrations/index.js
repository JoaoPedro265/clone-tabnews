//request: trata do que as coisas do mundo de fora ta entrado no sistema
//response:trata do que vc quer responder la pra fora
import migrationRunnner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

async function migrations(request, response) {
  //(Esse response é do servidor)é a resposta que o seu servidor vai enviar para o cliente.
  const dbClient = await database.getNewClient();
  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
  if (request.method == "GET") {
    const pendingMigrations = await migrationRunnner(defaultMigrationOptions);
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }
  if (request.method == "POST") {
    const migratedMigrations = await migrationRunnner({
      ...defaultMigrationOptions,
      dryRun: false,
    });
    await dbClient.end();
    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  }
  return response.status(405).end();
}

export default migrations;
