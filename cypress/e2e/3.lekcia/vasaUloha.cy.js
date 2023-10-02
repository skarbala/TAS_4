describe("Check SavingsCalculator", () => {
  beforeEach(() => {
    cy.log("Loadujem Savings Calculator")
    cy.visit("/savingscalculator.php")
  })
  it("Homework Lesson2", () => {
    /*Zautomatizuje tieto scenáre
   - Vymazanie inputov po vytvorení nového requestu
   - vytvor nový request (v tomto pripade zaciname na novej stranke)
   - over že po vytvorení sú vstupné polia prázdne
*/

    //POZOR, disabled sa pouziva v pripadoch, ak s elementom nie je mozne interagovat
    //co nie je tento pripad
    cy.get("#fundSelect").should("not.be.disabled")

    //POZOR
    //toto nie je spravne riesenie, pouziva sa na staticke texty na stranke
    cy.get("[id=oneTimeInvestmentInput]").type(2300)
    cy.get("[id=oneTimeInvestmentInput]").should("be.empty")

    cy.get("#yearsInput").should("have.value", "")
    cy.get('input[type="email"]').should("have.value", "")
  })
})
