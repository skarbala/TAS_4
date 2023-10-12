# 6 Lekcia - Intercept

Intercept slúži na sledovanie komuinikácie medzi klientom a serverom.
Celú dokumenáciu nájdete [na tomto odkaze](https://docs.cypress.io/api/commands/intercept)

## Definovanie route
Ak chceme aby cypress registroval vybranú komunikáciu medzi klientom a serverom, potrebujeme definovať URL na ktorú sa odosielajú requesty
Príklad
`cy.intercept('https://auth.skypicker.com/v1/user.exists')`

Skrátenie URL v prípade ak nám stačí definovať iba relatívnu URL
`cy.intercept('**/user.exists')`

Vieme ho využiť 3 spôsobmi

## 1. Čakanie na odpoveď zo servera
Pridaním aliasu vieme v priebehu testu počkať na odpoveď zo servera
`cy.intercept('**/user.exists').as('userExists')`

Samotné čakanie počas testu
`cy.wait('@userExists)`

[Viac o príkaze cy.wait](https://docs.cypress.io/api/commands/wait)

## 2. Nahradenie odpovede
V prípade, že potrebujeme nahradiť odpoveď zo servera, do metódy `cy.intercept()` doplníme argument, ktorý reprezentuje mockovaný stav

Príklad mockovania chyby na strane servera:
`cy.intercept('**/user.exists',{statusCode:500}).as('userExists')`

Príklad mockovania statickej odpovede, uloženej v zložke fixtures
`cy.intercept('**/user.exists',{fixtures:'fake_response.json'}).as('userExists')`

## 3. Overenie komunikácie (request a response)
Na validáciu komunikácie vieme z funkcie wait vybrať request/response a následne overiť ich hodnoty

Príklad
```
cy.wait('@userExists').then(interception => {
            expect(interception.request.body.email).to.eq(user.name)
            expect(interception.response.body.exists).to.be.true
        })
```
