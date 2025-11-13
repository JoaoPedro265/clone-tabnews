//request: trata do que as coisas do mundo de fora ta entrado no sistema
//response:trata do que vc quer responder la pra fora
import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum;"); //query(queryObject)
  console.log(result.rows);
  response.status(200).json({ chave: "vc é foda cara" });
}

export default status;
