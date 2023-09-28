describe("Check Total income flow", () => {
  /*  Co sme sa v tejto lekcii naucili
    1. interakcia so selectom
    2. ako pouzit type
    3. data-test a preco ich pouzivat
    4. moznost pouzitia cy.contains
    5. alias
    6. siblings
*/
  beforeEach(() => {
    cy.visit("savingscalculator.php")
  })

  it.skip("check everything is working - kr, clicking, typing", () => {
    //select na zaklade value alebo inner textu.
    //Pri value, nezabudnite urobit validaciu inner textu, aby ste nestratili kontrolu nad zmenami pod danym value

    cy.log("Select fund")
    cy.get("#fundSelect").select("Tom & Jerry corp")

    cy.log("Insert time and money")
    //ako inak zapisat id, nie len cez hashtag
    cy.get("[id=oneTimeInvestmentInput]").type("30000")

    cy.log("Type period in years & calculate")
    //bez uvodzoviek pastnete cislo, s uvodzovkami text
    cy.get("#yearsInput").type(6)

    //prve po com chodte je data test
    //1 z moznosti
    //cy.contains("button", "Calculate").click()

    //najlepsi mozny zapis selektoru
    cy.get("[data-test=calculate]").click()

    //cy.get("div.result").find("div").eq(0)
    cy.get("div.result div").eq(0).find("p").as("incomeMoney")

    //alias je meno pre selektor prepouzitelne skrz test
    cy.get("@incomeMoney").should("contain.text", "kr").and("be.visible")

    //pokrocile CSS selectors
    cy.get("div.result p:eq(0)").should("contain.text", "kr").and("be.visible")

    //odporucam tento zapis so siblings
    cy.contains("span", "Total income")
      .siblings("p")
      .should("contain.text", "kr")
      .and("be.visible")
  })

  it("Validate email in details", () => {
    cy.log("select the fund")
    cy.get("#fundSelect").select("Hoggwart's Fund")

    cy.log("Type amount of money")
    cy.get("[id=oneTimeInvestmentInput]").type(2000)

    cy.log("Type period in years & calculate")
    cy.get("#yearsInput").type(6)

    cy.log("Insert email and apply for savings")
    cy.get("#emailInput").type("natalFatal@hoh.com")
    cy.get("[data-test=apply-for-saving]").click()

    //nezabudnut zvalidovat, ze sa po kliku nieco stalo
    cy.get("ul.saving-list").find("li").eq(0).should("be.visible")
    //to iste, len iny zapis
    cy.get(".saving-list li:eq(0)").should("be.visible")

    cy.log("click on detail and validate")
    cy.contains("button", "detail").click()

    //nezabudnut zvalidovat, ze sa po kliku nieco stalo
    cy.get("div.modal-container").should("be.visible")

    cy.contains("p", "Contact")
      .find("span")
      .should("have.text", "natalFatal@hoh.com")

    //select vnoreneho elementu cez find/children, obe riesenia su spravne
    cy.contains("p", "Contact")
      .children("span")
      .should("have.text", "natalFatal@hoh.com")
  })
})
