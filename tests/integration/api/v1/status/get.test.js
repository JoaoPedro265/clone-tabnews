//(Integration Tests) Testam a interação entre várias partes do sistema — por exemplo, entre o backend e o banco de dados, ou entre componentes diferentes no frontend.
test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});
