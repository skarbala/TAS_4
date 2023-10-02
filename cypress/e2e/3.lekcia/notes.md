## 1.0. Premenne

- ak nechcete duplikovat hodnoty skrz test, ako email, meno, ciselne hodnoty, mozete ich ulozit do tzv. premennych. Preco pouzit premenne? Ak sa raz rozhodnete zmenit email ci meno, nemusite ich menit na X miestach v kode, staci ich prepisat v premennej.
- v ramci premennych rozlisujeme medzi let a const.
- laicky: Predstav si, ze si v kuchyni a rozhodol si sa, ze si ides spravit vajicka.
  Potrebujes olej a vajcia. Predpokladam, ze olej nemas rozliaty na stoje a vajcia rozbite v umyvadle.
  Kazda z tychto ingrendiencii ma svoje miesto, je organizovana a ulozena: olej vo flasi, vajicka v obale. Tak je to aj s premennymi,
  nechceme ich mat roztrusene po kode, chceme ich mat organizovane, pricom nadoby na hodnoty su v nasom pripade premenne.

**const** - premenna, ktora je nemenne, jej hodnotu nemozete menit pocas behu testu. Je to ako CD-R, ktore napalite raz a uz nikdy viac. Ak by ste sa snazili hodnotu prepisat na inom mieste ako pri deklaracii, Cypress by vam spadol.
`const email = "example@gmail.com"`

**let** - premenna, ktoru mozete menit pocas behu programu. Ako CD-RW.
`let email = "example@gmail.com"`

**Nezabudnúť** - nazvy premennych by mali vzdy davat zmysel, pre premenne podstatne mena, pre funkcie slovesa

## 1.1. Funkcie

- ak nechcete duplikovat casti kodu skrz viacero testov, pouzite funkciu, ktoru prepouzijete skrz test.
- nazov funkcie obsahuje sloveso
- laicky: Predstav si funkciu ako recept - vajicka. Na zaciatku musis vediet, co ides varit, musis vediet nazov receptu, v nasom pripade, nazov funkcie.
  Do receptu potrebujes suroviny, to budu nase premenne. Potrebujes vykonat ukony na to, aby sa to spravilo, to je telom funkcie - kod.
  Na konci varenia, ked sa vsetky suroviny spoja, premiesaju, dostanes vysledok/vystup.
  To bude zavolanie funkcie, kde budeme ocakavat vystup z toho celeho vzhladom na to, co sme tam poslali.

- Zapis

```
function menoFunkcie(nazovPremennej){
    tvoj kod
}
```

- Zavolanie funkcie

```
menoFunkcie(nazovPremennejKtoruChcesPoslat)
```

## 1.2. Iteracia

- vid 3.lekcia/prikladIteracie, odporucam sa s tym pohrat, spustit to niekolko krat

## 1.3. Jednoducha podmienka

- ak chces, napr vo funkcii povedat programu, ze nema nieco vykonat, alebo naopak, ma nieco vykonat za ucitych okolnosti, pouzi if().
- != deklaracia, ze sa nieco nema rovnat, == deklaracia, ze sa nieco ma rovnat
- Zapis

```
//ak sa premenna nerovna null
  if (premenna != null) {
    //vykonaj toto
  }
```

- viac o if a if else tu: https://www.w3schools.com/js/js_if_else.asp

## 1.4. JS Object

- nakupna taska pre moje premenne
- deklaracia je podobna JSONu (vid fixtures/example.json)
- zoznam premennych mozete zapuzdrit do JSON fileov

```
const investmentInfo = {
  email: randomEmail({ domain: "kiwi.com" }),
  savings: 2000,
  years: 6,
  fundName: "Hoggwart's Fund",
}
```

Deklaracia bude vyzerat nasledovne:
`cy.get("[id=oneTimeInvestmentInput]").type(investmentInfo.savings)`
