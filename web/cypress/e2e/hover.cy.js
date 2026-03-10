describe("Simulando mouseover", () => {
  it("Deve mostrar texto ao passar o mouse em link do insta", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");
    cy.get('[data-cy="instagram-link"]').realHover();
    cy.contains("Isso é Mouseover!").should("exist");
  });
});
