beforeEach(() => {
    cy.setCookiesContext()
    cy.setBookingButton()
});

describe('Wait for a response: Search & Result page', () => {
    it('wait for response on search page destination modal', () => {
        cy.intercept('**/graphql?featureName=UmbrellaPlacesQuery**').as('locations')
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"]')
            .find('[data-test="SearchField-input"]')
            .type('Tokyo')
        cy.wait('@locations')
    })

    it('wait for a response on result page', () => {
        cy.intercept('**featureName=SearchReturnItinerariesQuery').as('searchResults')
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        cy.get('[data-test="PlacepickerModalOpened-destination"]')
            .contains('Tokyo')
            .click()
        cy.get('[data-test="LandingSearchButton"]')
            .click()
        cy.wait('@searchResults')
        cy.get('[data-test="ResultCardWrapper"]').should('be.visible')
    })
})

describe('Replace a response and mock the state', () => {
    it('return no results on result page', () => {
        cy.intercept('**featureName=SearchReturnItinerariesQuery', [])
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        cy.get('[data-test="PlacepickerModalOpened-destination"]')
            .contains('Tokyo')
            .click()
        cy.get('[data-test="LandingSearchButton"]')
            .click()
        //TODO: overte hlasku "Sorry we couldn't find your trip"
    });
    it('return one place based on fake fixture', () => {
        cy.intercept('**featureName=SearchReturnItinerariesQuery', { fixture: 'itineraries.json' })
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        cy.get('[data-test="PlacepickerModalOpened-destination"]')
            .contains('Tokyo')
            .click()
        cy.get('[data-test="LandingSearchButton"]')
            .click()
        //TODO: overte cenu letenky 10,700,000
    })
    it('return no places', () => {
        cy.intercept('**/graphql?featureName=UmbrellaPlacesQuery**', []).as('locations')
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        //TODO: ++doplnte overenie
    })
    it('return error', () => {
        cy.intercept('**/graphql?featureName=UmbrellaPlacesQuery**', { statusCode: 500 }).as('locations')
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        //TODO: ++doplnte overenie
    })
})

describe('Check the network communication (request + response)', () => {
    it('check outgoing request and response', () => {
        cy.intercept('https://auth.skypicker.com/v1/user.exists').as('userExists')
        const user = {
            name: 'testaccount@furbo.sk',
            password: 'starterpack4'
        }
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="TopNav-SingInButton"]').click()
        cy.get('[data-test="MagicLogin-LoginViaEmail"]').click()

        cy.get('[data-test="MagicLogin-Email"]').type(user.name)
        cy.get('[data-test="MagicLogin-Continue"]').click()
        cy.wait('@userExists').then(interception => {
            expect(interception.request.body.email).to.eq(user.name)

            expect(interception.response.body.exists).to.be.true
        })

        cy.get('[data-test="MagicLogin-PasswordInput"]').type(user.password)
        cy.contains('button', 'Sign in').click()
    });
})