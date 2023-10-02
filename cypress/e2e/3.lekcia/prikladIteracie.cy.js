describe("Iterovanie: Test stranky Gosslingator", () => {
  beforeEach(() => {
    cy.log("Navštívime stránku Gosslingator")
    cy.visit("/gosslingator.php")
  })

  it("Klikanie na Ryana ", () => {
    // iterujeme zvacsa od cisla 1 alebo 0. Nezabudnite, v druhom kroku hovorime, kolko krat
    // sa ma iterovat. <= alebo <. E.g. pri 0 az po <= 2, iterujem 3 krat, 0, 1, 2.
    // pri pouziti 0 az po <2, iterujem 2 krat, 0, 1
    let i
    for (i = 0; i < 2; i++) {
      cy.log("iterujem cislo " + i)
      cy.get("#addRyan").click()
    }

    cy.log("celkovo som naiterovala " + i)

    //nezabudneme overit, ze kazdy jeden z nich je visible
    // TIP: skus sa pohrat a dat validaciu do for cyklu
    cy.get("img")
      .should("have.length", i)
      .each(($img) => {
        cy.wrap($img).should("be.visible")
      })
  })
})
