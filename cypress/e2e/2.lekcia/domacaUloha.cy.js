/* 
Domáca úloha:
- Overte 2 ryanov
- Overte hlavný titulok stránky
- Overte že button remove ryan má správny text
- Overte že button add ryan má správny text
- Overte, že po otvorení stránky je button remove ryan zablokovaný (disabled)
*/

describe.only("", () => {
  it("", () => {
    cy.visit("/gosslingator.php")
    //overi iba cast textu
    cy.get("#removeRyan").should("contain.text", "'Ryan out!'")
  })
})

describe("DU 1: Test stranky Gosslingator", () => {
  beforeEach(() => {
    cy.log("Navštívime stránku Gosslingator")
    cy.visit("/gosslingator.php")
  })

  it("Domaca Uloha: ", () => {
    cy.log("1. Overte 2 ryanov")
    //CY pravidlo: Cypress robi sam should be visible pred klikom na elemnt
    cy.get("#addRyan").click()
    cy.get("img").should("have.length", 1)
    cy.get("#addRyan").click()
    //toto overi, aby aspon jeden bol visible
    cy.get("img").should("have.length", 2).and("be.visible")

    //ako overit kazdy element? .each() pro tip
    cy.get("img")
      .should("have.length", 2)
      .each(($img) => {
        cy.wrap($img).should("be.visible")
      })

    cy.log("2. Overte hlavný titulok stránky")
    //cy.get(".ryan-title").should("be.visible").contains("GOSLINGATE ME")
    cy.title().should("eq", "Gosslingate me!")

    cy.log("3. Overte že button remove ryan má správny text")
    cy.get("#removeRyan").contains("Ryan out!").should("be.visible")

    cy.log("4. Overte že button add ryan má správny text")
    cy.get("#addRyan").contains("Ryan!").should("be.visible")

    //same same but different, but still the same
    cy.get("#addRyan") //ak nedate validaciu, spravi sam od seba exist validaciu
    cy.get("#addRyan").contains("Ryan!") //ak nedate validaciu, spravi sam od seba exist validaciu
    cy.get("#addRyan").should("exist")

    cy.reload()
    cy.log(
      "5. Overte, že po otvorení stránky je button remove ryan zablokovaný (disabled)"
    )
    cy.get("#removeRyan").should("be.disabled")
  })
})

describe("DU 2: Test stranky Gosslingator", () => {
  beforeEach(() => {
    cy.log("Navštívime stránku Gosslingator")
    cy.visit("/gosslingator.php")
  })
  it("Domaca Uloha: 1. Overte DU", () => {
    cy.log("Remove Ryan btn disabled by default")
    cy.get("#removeRyan").should("be.disabled")

    cy.log("Check 2 Ryan's heads")
    cy.get("#addRyan").should("be.visible").click()
    cy.get("#addRyan").should("be.visible").click()
    cy.get("img").should("have.length", 2)

    cy.log("Check header text - Gosslingate me")
    cy.get(".ryan-title").should("have.text", "Goslingate me")

    cy.log("Remove Ryan button text is Ryan out!")
    cy.get("#removeRyan").contains("Ryan out!")

    cy.log("Add Ryan button has text Ryan!")
    cy.get("#addRyan").contains("Ryan!")
  })
})
