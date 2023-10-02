/*
Zautomatizuje tieto scenáre
   - vymazanie inputov po vytvorení nového requestu
   - vytvor nový request
   - over že po vytvorení sú vstupné polia prázdne
*/

describe("Homework - Calculator", () => {
  beforeEach(() => {
    cy.visit("/savingscalculator.php")
  })

  it("Validate empty input fields", () => {
    /* BUG */
    //za tymto sa nachadza logika prazdneho drop downu, preto null, nie empty string.
    cy.log("Dropdown should be empty")
    //obe riesenia su spravne
    cy.get("#fundSelect").invoke("val").should("eq", null)
    cy.get("#fundSelect").should("have.value", null)

    //extra validacia, ze preselectnuta je prva option s tymto nazvom
    cy.get("#fundSelect")
      .find("option")
      .first()
      .should("have.prop", "selected", true)
      .and("have.text", "Select your fund")

    // jeden druh zapisu
    cy.get("#oneTimeInvestmentInput").should("have.value", "")

    //druhy druh zapisu
    cy.get("#yearsInput").should("have.prop", "value", "") //cekuje property

    //treti druh zapisu
    cy.get("#emailInput").invoke("val").should("eq", "")
  })
})
