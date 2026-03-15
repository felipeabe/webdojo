import { faker } from "@faker-js/faker";
describe("POST ", () => {
  it("Deve cadastrar novo uusário", () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "pwd123",
    };

    cy.request({
      method: "POST",
      url: "http://localhost:3333/api/users/register",
      body: user,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
});
