describe("Studio", () => {
  it("exemplo do cypress", () => {
    cy.visit("https://example.cypress.io");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".banner > .container").click();
    cy.get("h1").should("have.text", "Kitchen Sink");
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("deve logar com sucesso", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:3000");
    cy.get("#email").clear("p");
    cy.get("#email").type("papito@webdojo.com");
    cy.get("#password").clear();
    cy.get("#password").type("katana123");
    cy.contains("button", "Entrar").click();
    cy.get('[data-cy="logged-user"]').click();
    cy.get('[data-cy="user-name"]').should("have.text", "Fernando Papito");
    /* ==== End Cypress Studio ==== */
  });
});
