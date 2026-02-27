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

    cy.get('input[type="file"]').selectFile("./cypress/fixtures/document.PDF", {
      force: true,
    });
    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]',
    ).type(
      "Lorem Ipsum é o texto de preenchimento padrão da indústria gráfica e de design, usado desde os anos 1500 para simular conteúdo real em layouts, maquetes e protótipos. Ele impede que o leitor se distraia com texto legível, oferecendo uma distribuição de letras quase normal.",
    );

    const techs = ["Cypress", "Selenium", "WebDriverIO", "Playwright"];

    techs.forEach((item) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(item)
        .type("{enter}");

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", item)
        .should("be.visible");
    });

    cy.contains("label", "termos de uso").find("input").check();

    cy.contains("button", "Enviar formulário").click();

    cy.contains(
      "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
    ).should("be.visible");
    cy.contains("button", "Fechar").click();
  });

  it.only("Deve verificar os campos obrigatórios", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");
    cy.goTo("Formulários", "Consultoria");

    cy.contains("button", "Enviar formulário").click();

    cy.contains("label", "Nome Completo *")
      .parent()
      .contains("p", "Campo obrigatório")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "Email *")
      .parent()
      .contains("p", "Campo obrigatório")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "termos de uso")
      .parent()
      .contains("p", "Você precisa aceitar os termos de uso")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("p", "Você precisa aceitar os termos de uso")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");
  });
});
