describe("Testujeme Gosslingator stránku", () => {
  before(() => {
    cy.log("Pustím sa len raz")
  })

  beforeEach(() => {
    cy.log("Navštívime stránku Gosslingator")
    cy.visit("/gosslingator.php")
  })

  it("Overíme defaultné hodnoty", () => {
    cy.log("Counter container je viditeľný ")
    cy.get(".ryan-counter").should("be.visible")

    // Rôzne spôsoby ako pracovať s elementom
    /* cy.get("div.ryan-counter")
        cy.get("[class='ryan-counter']")
        cy.get("[class*='counter']") */

    cy.log("Counter je viditeľný a má hodnotu 0")
    cy.get("#ryanCounter").should("be.visible").and("have.text", "0")

    cy.log("H3 v rámci countera má text 'ryans'")
    cy.get("h3").should("be.visible").and("have.text", "ryans")
  })

  it("Pridáme jedného Ryana", () => {
    cy.log("Click na addRyan button")
    cy.get("#addRyan").click() // nemusíme overovať visibilitu, click to urobí za nás, click({ force: true }) - neoverí visibilitu

    cy.log("Counter má hodnotu 1")
    cy.get("#ryanCounter").should("be.visible").and("have.text", "1")

    cy.log("Img element je 1")
    cy.get("img").should("have.length", 1) // musí sa rovnať 1
    //cy.get("img").should("have.length.at.least", 1) -> ak potrebujeme overiť, že hodnota je ASPOŇ 1

    cy.log("H3 v rámci countera má text 'ryan'")
    cy.get("h3").should("be.visible").and("have.text", "ryan")
    cy.contains("h3", "ryan").should("be.visible") // vieme to overíť aj pomocou contains metódy
    //cy.contains("h3", "RYAn", { matchCase: false }).should("be.visible") -> v prípade, že nám nezáleží na malých/veľkých písmenách
  })
})

/* 
Dokumentácia:
- cy.visit -> https://docs.cypress.io/api/commands/visit
- cy.get -> https://docs.cypress.io/api/commands/get
- cy.click -> https://docs.cypress.io/api/commands/click
- cy.contains -> https://docs.cypress.io/api/commands/contains
- should -> https://docs.cypress.io/api/commands/should
- knižnice, ktoré Cypress používa -> https://docs.cypress.io/guides/references/bundled-libraries
- config -> https://docs.cypress.io/guides/references/configuration
*/

// CSS selektory: https://flukeout.github.io/
