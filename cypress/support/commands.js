// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("setCookiesContext", () => {
    cy.log("Set cookies - agreed")
    cy.setCookie("__kwc_agreed", "true")
    cy.setCookie("__kwc_settings", "%7B%22marketing%22%3Atrue%2C%22analytics%22%3Atrue%7D")
})

Cypress.Commands.add("setBookingButton", () => {
    cy.log("Uncheck booking extension button")
    localStorage.setItem("bookingcom_extension_default", "false")
})