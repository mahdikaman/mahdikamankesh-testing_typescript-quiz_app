describe("One round of a quiz game", () => {
  it("Should show a page which starts the quiz", () => {
    cy.visit("http://localhost:3000/quiz");
    cy.get("h1").should("contain", "Generic QuizName");
    cy.get("h1").should("contain", "Welcome Sneakyguy");
    cy.get("[data-testid=Select-Difficulty]").select(0);
    cy.get("p").should("contain", "Select Category");
    cy.get("[data-testid=Category-Button]:first").click();
    cy.get("Button").should("contain", "Start Quiz");
    cy.get("[data-testid=Start-Quiz]").click();

    cy.get("p").contains(/TIME REMAINING: \d+/i);
    cy.get("p").should("contain", "Question: 1 / 9");
    cy.get("[data-testid=Answer-Button]:first").click();
    cy.get("[data-testid=NextQuestion]").click();

    cy.get("p").contains(/TIME REMAINING: \d+/i);
    cy.get("p").should("contain", "Question: 2 / 9");
    cy.get("[data-testid=Answer-Button]:first").click();
    cy.get("[data-testid=NextQuestion]").click();

    cy.get("p").contains(/TIME REMAINING: \d+/i);
    cy.get("p").should("contain", "Question: 3 / 9");
    cy.get("[data-testid=Answer-Button]:first").click();
    cy.get("[data-testid=NextQuestion]").click();

    cy.get("p").contains(/TIME REMAINING: \d+/i);
    cy.get("p").should("contain", "Question: 4 / 9");
    cy.get("[data-testid=Answer-Button]:first").click();
    cy.get("[data-testid=NextQuestion]").click();

    cy.get("p").contains(/TIME REMAINING: \d+/i);
    cy.get("p").should("contain", "Question: 5 / 9");
    cy.get("[data-testid=Answer-Button]:first").click();
    cy.get("[data-testid=NextQuestion]").click();

    cy.get("p").contains(/TIME REMAINING: \d+/i);
    cy.get("p").should("contain", "Question: 6 / 9");
    cy.get("[data-testid=Answer-Button]:first").click();
    cy.get("[data-testid=NextQuestion]").click();

    cy.get("p").contains(/TIME REMAINING: \d+/i);
    cy.get("p").should("contain", "Question: 7 / 9");
    cy.get("[data-testid=Answer-Button]:first").click();
    cy.get("[data-testid=NextQuestion]").click();

    cy.get("p").contains(/TIME REMAINING: \d+/i);
    cy.get("p").should("contain", "Question: 8 / 9");
    cy.get("[data-testid=Answer-Button]:first").click();
    cy.get("[data-testid=NextQuestion]").click();

    cy.get("p").contains(/TIME REMAINING: \d+/i);
    cy.get("p").should("contain", "Question: 9 / 9");
    cy.get("[data-testid=Answer-Button]:first").click();
    cy.get("Button").should("contain", "Start Quiz");
  });
});
