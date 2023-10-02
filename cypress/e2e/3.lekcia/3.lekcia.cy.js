var randomEmail = require("random-email")

//camel case & snake
// const je pre nas ideal - teraz
// CD-R, ktore je neprepisovatelne
const savingInfo = {
  fundName: "Hoggwart's Fund",
  savings: 2000,
  investYears: 6,
  email: randomEmail({ domain: "finportal.com" }),
}

describe("Check Total income flow", () => {
  beforeEach(() => {
    cy.visit("savingscalculator.php")
  })

  it("check everything is working - kr, clicking, typing", () => {
    fillInForm(savingInfo.fundName, savingInfo.savings, savingInfo.investYears)

    cy.get("[data-test=calculate]").click()

    //cy.get("div.result").find("div").eq(0)
    cy.get("div.result div").eq(0).find("p").as("incomeMoney")

    //alias je meno pre selektor prepouzitelne skrz test
    cy.get("@incomeMoney").should("contain.text", "kr").and("be.visible")

    cy.get("div.result p:eq(0)").should("contain.text", "kr").and("be.visible")

    cy.contains("span", "Total income")
      .siblings("p")
      .should("contain.text", "kr")
      .and("be.visible")
  })

  it("Validate email in details", () => {
    //CD-RW menit po case
    let years = 2000
    cy.log("toto ma mat prvotnu hodnotu:" + years)
    years = 45000
    cy.log("toto ma mat zmenenu hodnotu:" + years)

    fillInForm(
      savingInfo.fundName,
      savingInfo.savings,
      savingInfo.investYears,
      savingInfo.email
    )

    cy.get("[data-test=apply-for-saving]").click()

    cy.get("ul.saving-list").find("li").eq(0).should("be.visible")
    cy.get(".saving-list li:eq(0)").should("be.visible")

    cy.log("click on detail and validate")
    cy.contains("button", "detail").click()

    cy.get("div.modal-container").should("be.visible")

    cy.contains("p", "Contact")
      .find("span")
      .should("have.text", savingInfo.email)
  })
})

function fillInForm(fundName, savings, investYears, email = null) {
  cy.log("select the fund")
  cy.get("#fundSelect").select(fundName)

  cy.log("Type amount of money")
  cy.get("[id=oneTimeInvestmentInput]").type(savings)

  cy.log("Type period in years & calculate")
  cy.get("#yearsInput").type(investYears)

  cy.log(email)

  //zapis pre nerovna sa
  //ak je email nezadefinovany vo volani funkcie, do vnutra podmienky ani neskoci, lebo ju nesplna
  if (email != null) {
    cy.log("Insert email and apply for savings")
    cy.log("tu sa ani nedostanem, ak nie je mail zadefinovany")
    cy.get("#emailInput").type(email)
  }
}
