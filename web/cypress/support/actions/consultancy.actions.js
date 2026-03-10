Cypress.Commands.add("fillConsultancyForm", (form) => {
  cy.get('input[placeholder="Digite seu nome completo"]').type(form.name);
  cy.get('input[placeholder="Digite seu email"]').type(form.email);
  cy.get('input[placeholder="(00) 00000-0000"]').type(form.phone);
  //.should("have.value", "(11) 99999-1000");

  cy.get("#consultancyType").select("inCompany"); //selecionando pelo value
  cy.contains("label", "Tipo de Consultoria")
    .parent()
    .find("select")
    .select(form.consultancyType);

  if (form.personType === "cpf") {
    cy.contains("label", "Pessoa Física")
      .find("input")
      .check()
      .should("be.checked");
    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("be.not.checked");
  }
  if (form.personType === "cnpj") {
    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .check()
      .should("be.checked");
    cy.contains("label", "Pessoa Física")
      .find("input")
      .should("be.not.checked");
  }

  cy.contains("label", form.personType.toUpperCase())
    .parent()
    .find("input")
    .type(form.document);
  //.should("have.value", "123.456.789-00");

  form.discoveryChannels.forEach((channel) => {
    cy.contains("label", channel).find("input").check().should("be.checked");
  });

  cy.get('input[type="file"]').selectFile(form.file, {
    force: true,
  });
  cy.get(
    'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]',
  ).type(form.description);

  form.techs.forEach((item) => {
    cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
      .type(item)
      .type("{enter}");

    cy.contains("label", "Tecnologias")
      .parent()
      .contains("span", item)
      .should("be.visible");
  });

  if (form.terms) {
    cy.contains("label", "termos de uso").find("input").check();
  }
});

Cypress.Commands.add("submitConsultancyForm", () => {
  cy.contains("button", "Enviar formulário").click();
});

Cypress.Commands.add("validateConsultancyModal", () => {
  cy.get(".modal", { timeout: 7000 })
    .should("be.visible")
    .find(".modal-content")
    .should("be.visible")
    .and(
      "have.text",
      "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
    );
});
