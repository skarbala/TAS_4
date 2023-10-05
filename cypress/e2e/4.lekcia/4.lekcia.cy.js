describe("4th lesson - Kiwi.com", () => {
  it("clicking and validation through homepage", () => {
    const destination = "Tokyo"

    //odporuca sa definovat intercepty pred visitom
    cy.intercept("GET", "**featureName=UmbrellaPlacesQuery**").as(
      "placepickerResults"
    )

    cy.log("visit the page")
    cy.visit("https://www.kiwi.com/en/")

    //nezabudajte na validacie, najma po clickoch
    cy.log("accept cookies")
    cy.get("[data-test=CookiesPopup-Accept]").click()
    cy.get("[data-test=CookiesPopup]").should("not.exist")

    cy.log("Validate Explore btn")
    //overenie presneho stringu v href atribute
    cy.get("[data-test=LandingSearchButton]")
      .should("have.text", "Explore")
      .and("have.attr", "href", "/en/search/tiles/vienna-austria/anywhere")
    //ciastkove overenie v href atribute
    cy.get("[data-test=LandingSearchButton]")
      .should("have.text", "Explore")
      .and("have.attr", "href")
      .and("include", "tiles")

    //odklinete checkbox na Booking.com
    cy.log("Uncheck checkbox Booking")
    //cy.get("[data-test=bookingCheckbox]").click()
    cy.get("[data-test=bookingCheckbox] input").uncheck({ force: true })

    //moznost pouzitia * - ak ste uz odkazani na classy
    // cy.get("[class*=Checkbox] input").uncheck({ force: true })

    cy.log("type Tokyo")
    cy.get("[data-test=PlacePickerInput-destination]").type(destination)
    cy.pause()
    cy.contains("[data-test=PlacePickerRow-wrapper]", destination).click()
    //cakam na request, ktory by mal zarucit dodanie dat na vykreslenie pre pouzivatela
    cy.wait("@placepickerResults")

    //Tri druhy waitov:
    //cy.wait() - hardcoded wait - the worst practice, v ms
    //cy.wait(5000) //budem cakat 5s
    //timeout
    //cakanie na intercept

    //neuspokojte sa s elementom, ktory ma data-test, vzdy skumajte ci je jedinecny
    //nie je? chodte po strukture vyssie a snazte sa najst rodica
    cy.log("destination is one and only")
    cy.get(
      "[data-test=PlacePickerInput-destination] [data-test=PlacePickerInputPlace]"
    )
      .should("have.length", 1)
      .and("be.visible")
      .and("contain.text", destination)

    cy.log("check URL")
    //overenie ci URL obsahuje substring/ ci je sucastou vacsej URL nejaky subor znakov
    cy.url().should("include", "?destination=tokyo-japan")

    //overenie ci URL obsahuje presne tu istu URL bez vynimiek
    cy.url().should("eq", "https://www.kiwi.com/en/?destination=tokyo-japan")

    cy.log("click on Search")
    cy.get("[data-test=LandingSearchButton]").click()
  })
})
