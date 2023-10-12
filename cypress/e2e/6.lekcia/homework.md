# Domáca úloha - Intercept

## Dokončite testy

Implementujte všetky TODO, ktoré sa nachádzajú [v tomto súbore](https://github.com/skarbala/TAS_4/blob/main/cypress/e2e/6.lekcia/6.lekcia.cy.js)

## Namockujte dáta v destination modal
Napíšte nasledovný test
```
1. otvorím stránku Kiwi.com
2. do inputu destination napíšem Tokyo
3. odpoveď zo servera nahradím súborom places.json z fixtures foldera
4. overím destináciu v modal okne
```

places.json súbor nájdete [tu](https://github.com/skarbala/TAS_4/blob/main/cypress/fixtures/places.json)

## ☠️ Oklamte login
Napíšte nasledovný test

```
1. otvorím stránku Kiwi.com
2. kliknem na prihlásenie
3. zvolím prihlásenie pomocou emailu
4. zadám username testaccount@furbo.sk
5. odpoveď zo servera nahradím statickou, v ktorej definujem exists=false
6. overím, že mi vyskočí okno: Verify your email 
```

HINT: vytvorte si vo fixtures foldri samostatný .json súbor, prípadne definujte statickú odpoveď priamo v teste. Návod nájdete [tu](https://docs.cypress.io/api/commands/intercept#With-a-StaticResponse-object)