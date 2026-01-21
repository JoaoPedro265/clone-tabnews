import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;"); //zerar o schema
}
//(Integration Tests) Testam a interação entre várias partes do sistema — por exemplo, entre o backend e o banco de dados, ou entre componentes diferentes no frontend.
test("GET to /api/v1/migrations should return 200", async () => {
  //esse response é do cliente, ele recebe a resposta.
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200); //fetch() retorna um objeto Response

  const responseBudy = await response.json();
  expect(Array.isArray(responseBudy)).toBe(true);
  expect(responseBudy.length).toBeGreaterThan(0);
});
