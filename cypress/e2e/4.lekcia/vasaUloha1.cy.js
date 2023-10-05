// Domaca uloha:
// Vytvorte metódu addRyan, ktorá klikne na tlačidlo pridať Ryana
// Upravte metódu tak aby príjmala vstupný parameter, číslo.
// Vstupný paramater definuje, koľko ryanov sa pridá na stránku

//ako spustit test niekolko krat
Cypress._.times(10, () => {
  describe("DU03 - funkcia a for cyklus", () => {
    const pocetKlikov = 5
    beforeEach(() => {
      cy.log("Visit Gosslingator")
      cy.visit("/gosslingator.php")
    })

    it("Domaca Uloha: ", () => {
      cy.log("Volam funkciu addRyan")
      addRyan(pocetKlikov)
    })

    function addRyan(pocetKlikov) {
      let i
      for (i = 1; i < pocetKlikov + 1; i++) {
        cy.log("Ryan cislo:" + i)
        cy.get("#addRyan").click()
        // treba naimplementovat each, aby sa overil kazdy jeden elemnt
        cy.get("img").should("have.length", i).and("be.visible")
      }
    }
  })
})
