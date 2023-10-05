/*
Zautomatizuje tieto scenáre
   - vymazanie inputov po vytvorení nového requestu
   - vytvor nový request
   - over že po vytvorení sú vstupné polia prázdne
*/

function addRyan(numOfClicks) {
  //iterujem po cislo mensie ako pocet klikov, lebo iterujem od NULY
  for (let i = 0; i < numOfClicks; i++) {
    cy.log("Click and validate adding Ryan")
    cy.get("#addRyan").click()

    //OPTIONAL
    //overujem, ze obrazok, ktory mal byt pridany je pridany
    cy.get("img").eq(i).should("be.visible")

    //overujem celu kolekciu obrazkov, ale len, ze existuju v DOM a aspon jeden je visible
    // TIP: tu mozes pridat kludne .each(img) je visible na overenie, ze vsetci Ryanovia su visible
    // v tom pripade mozeme opomenut validaciu na riadku 14
    cy.get("img")
      .should("have.length", i + 1)
      .each(($ryan) => {
        cy.wrap($ryan).should("be.visible")
      })
  }
}

describe("Homework - Function for adding Ryan", () => {
  beforeEach(() => {
    cy.visit("/gosslingator.php")
  })

  it("validate adding Ryans", () => {
    const numberOfClicks = 10

    addRyan(numberOfClicks)

    cy.log("Ryan counter should contain expected number")
    cy.get("#ryanCounter").should("have.text", numberOfClicks)
  })
})
