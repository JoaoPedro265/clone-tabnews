import { Client } from "pg"; //importa o client

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  }); //cria um objeto pra se conectar ao db

  try {
    await client.connect(); //conectar no db
    const result = await client.query(queryObject); //recebe qualquer query do codigo
    return result; //É o objeto que o PostgreSQL devolve depois que você executa uma query.
  } catch (error) {
    console.log(error);
    throw error; //nao usar log do erro pois engole o erro, o throw vai parar o codigo se der errado
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};

//funcao de verificacao de certificados,caso haja certificado
function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "development" ? false : true;
}
