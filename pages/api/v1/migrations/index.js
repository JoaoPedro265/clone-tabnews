//request: trata do que as coisas do mundo de fora ta entrado no sistema
//response:trata do que vc quer responder la pra fora
import migrationRunnner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

//(Esse response é do servidor)é a resposta que o seu servidor vai enviar para o cliente.
async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}"not allowed`,
    });
  }

  let dbClient;
  try {
    dbClient = await database.getNewClient(); //abre o servidor

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
      return response.status(200).json(pendingMigrations);
    }

    if (request.method == "POST") {
      const migratedMigrations = await migrationRunnner({
        ...defaultMigrationOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }
      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}

export default migrations;
