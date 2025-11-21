//(Integration Tests) Testam a interação entre várias partes do sistema — por exemplo, entre o backend e o banco de dados, ou entre componentes diferentes no frontend.
test("GET to /api/v1/status should return 200", async () => {
  //esse response é do cliente, ele recebe a resposta.
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200); //fetch() retorna um objeto Response

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined(); //espera que tenha definido

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString(); //converse pra iso, se nao funcionar vai da erro
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt); //espera que a data seja igual a data convertida

  expect(responseBody.dependencies.database.version).toEqual("16.10");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
