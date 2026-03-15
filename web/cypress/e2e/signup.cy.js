describe("Cadastro", () => [
  beforeEach(() => {
    cy.goToSignup();
  }),

  it("Deve criar conta", () => {
    cy.get("#name").type("Fernando Papito");
    cy.get("#email").type("papito@webdojo.com");
    cy.get("#password").type("123456");

    cy.contains("button", "Criar conta").click();
    cy.contains("Conta criada com sucesso!").should("be.visible");
  }),
]);
