describe("Gerenciamento de perfis no github", () => {
  beforeEach(() => {
    cy.login();
    cy.goTo("Tabela", "Perfis do GitHub");
  });

  it("Deve poder cadastrar um novo perfil do github", () => {
    cy.get("#name").type("Fernando Papito");
    cy.get("#username").type("qapapito");
    cy.get("#profile").type("qa");

    cy.contains("button", "Adicionar Perfil").click();
    cy.get("#name").type("Fernando Papito");
    cy.get("#username").type("papitodev");
    cy.get("#profile").type("qa");

    cy.contains("button", "Adicionar Perfil").click();

    cy.contains("table tbody tr", "qapapito")
      .should("be.visible")
      .contains("Fernando Papito")
      .should("be.visible");
    cy.contains("table tbody tr", "qapapito")
      .should("be.visible")
      .contains("qa")
      .should("be.visible");

    cy.contains("table tbody tr", "papitodev")
      .should("be.visible")
      .as("trProfile");

    cy.get("@trProfile").contains("td", "Fernando Papito").should("be.visible");
    cy.get("@trProfile").contains("td", "qa").should("be.visible");
  });

  it("Deve validar link do github", () => {
    const profile = {
      name: "Fernando Papito",
      username: "papito123",
      desc: "qa",
    };

    cy.get("#name").type(profile.name);
    cy.get("#username").type(profile.username);
    cy.get("#profile").type(profile.desc);
    cy.contains("button", "Adicionar Perfil").click();

    cy.contains("table tbody tr", profile.username)
      .should("be.visible")
      .as("trProfile");

    cy.get("@trProfile").find('button[title="Remover perfil"]').click();

    cy.contains("table tbody", profile.username).should("not.exist");
  });

  it("Deve acessar perfil no github", () => {
    const profile = {
      name: "Fernando Papito",
      username: "papitodev",
      desc: "qa",
    };

    cy.get("#name").type(profile.name);
    cy.get("#username").type(profile.username);
    cy.get("#profile").type(profile.desc);
    cy.contains("button", "Adicionar Perfil").click();

    cy.contains("table tbody tr", profile.username)
      .should("be.visible")
      .as("trProfile");

    cy.get("@trProfile")
      .find("a[href='https://github.com/papitodev']")
      .should("have.attr", "href", "https://github.com/" + profile.username)
      .and("have.attr", "target", "_blank");
  });
});
