import { Client } from "pg"; //importa o client

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  }); //cria um objeto pra se conectar ao db
  await client.connect(); //conectar no db
  try {
    const result = await client.query(queryObject); //recebe qualquer query do codigo
    return result; //É o objeto que o PostgreSQL devolve depois que você executa uma query.
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
