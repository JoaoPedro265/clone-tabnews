import migrations from "pages/api/v1/migrations";
import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;"); //zerar o schema
}
//(Integration Tests) Testam a interação entre várias partes do sistema — por exemplo, entre o backend e o banco de dados, ou entre componentes diferentes no frontend.
test("POST to /api/v1/migrations should return 200", async () => {
  //esse response é do cliente, ele recebe a resposta.
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response.status).toBe(201); //fetch() retorna um objeto Response

  const responseBudy = await response.json();

  expect(Array.isArray(responseBudy)).toBe(true);
  expect(responseBudy.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response2.status).toBe(200); //fetch() retorna um objeto Response

  const responseBudy2 = await response2.json();
  expect(Array.isArray(responseBudy2)).toBe(true);
  expect(responseBudy2.length).toBe(0);
});
