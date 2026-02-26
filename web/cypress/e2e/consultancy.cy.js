describe("Formulário de Consultoria", () => {
  it("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");
    cy.goTo("Formulários", "Consultoria");

    cy.get("#name").type("Fernando Papito");
    //outro alternativa com placeholder
    cy.get('input[placeholder="Digite seu nome completo"]').type(
      "Fernando Papito",
    );
    cy.get('input[placeholder="Digite seu email"]').type("papito@webdojo.com");
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("11 99999-1000")
      .should("have.value", "(11) 99999-1000");

    cy.get("#consultancyType").select("inCompany"); //selecionando pelo value
    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("Individual");

    cy.contains("label", "Pessoa Física")
      .find("input")
      .check()
      .should("be.checked");
    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("be.not.checked");

    cy.contains("label", "CPF")
      .parent()
      .find("input")
      .type("12345678900")
      .should("have.value", "123.456.789-00");

    const discoveryChannels = [
      "Instagram",
      "LinkedIn",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    discoveryChannels.forEach((channel) => {
      cy.contains("label", channel).find("input").check().should("be.checked");
    });
  });
});
