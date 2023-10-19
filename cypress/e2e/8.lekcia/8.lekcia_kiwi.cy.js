describe('Price alert', () => {
    beforeEach(() => {
        cy.session('login', () => {
            cy.request({
                method: 'POST',
                url: 'https://auth.skypicker.com/v1/user.login',
                body: {
                    login: "testaccount@furbo.sk",
                    password: "starterpack4",
                    brand: "kiwicom"
                },
                headers: {
                    "Authorization": "Basic NTQzM2VjY2NhZmY2Nzo="
                }
            })
                .then(response => {
                    expect(response.body.token).to.exist.and.be.a('string')
                    cy.setCookie('ua_session_token', response.body.token)

                })
        })
    })

    it.skip('UI: user with no price alert is navigated to search page', () => {
        //ARRANGE
        const user = {
            name: 'testaccount@furbo.sk',
            password: 'starterpack4'
        }
        cy.intercept('https://auth.skypicker.com/v1/user.login').as('login')
        cy.intercept('https://plexus-prod.skypicker.com/graphql').as('plexus')
        cy.setCookie('__kwc_agreed', 'true')
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="TopNav-SingInButton"]').click()
        cy.get('[data-test="MagicLogin-LoginViaEmail"]').click()
        cy.get('[data-test="MagicLogin-Email"]').type(user.name)
        cy.get('[data-test="MagicLogin-Continue"]').click()
        cy.get('[data-test="MagicLogin-PasswordInput"]').type(user.password)
        cy.contains('button', 'Sign in').click()
        cy.wait('@login').wait('@plexus')
        cy.visit('/user/?tab=price-alerts')
        cy.get('[data-test="NoPriceAlerts"]')
            .should('contain.text', "You haven't set up any price alerts")

        //ACT
        cy.get('[data-test="StartExploringButton"]').click()

        //ASSERT
        cy.url().should('eq', 'https://www.kiwi.com/en/')
    })

    it('API: user with no price alert is navigated to search page', () => {
        //ARRANGE

        cy.setCookie('__kwc_agreed', 'true')
        cy.visit('https://www.kiwi.com/en/user/?tab=price-alerts')
        cy.get('[data-test="NoPriceAlerts"]')
            .should('contain.text', "You haven't set up any price alerts")

        //ACT    
        cy.get('[data-test="StartExploringButton"]').click()

        //ASSERT
        cy.url().should('eq', 'https://www.kiwi.com/en/')

    })
    it('opens page', () => {
        cy.visit('https://www.kiwi.com')
    })
})