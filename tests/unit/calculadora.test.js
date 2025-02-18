const calculadora = require("../../models/calculadora.js");

test("somar 2 + 2 deveria retornar 4", () => {
  const result = calculadora.somar(2, 2);
  expect(result).toBe(4);
});
