describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid]", "Tuesday")
      .click()
      // Check if the selected element have class "day-list__item--selected"
      .should("have.class", "day-list__item--selected");
  });
});
