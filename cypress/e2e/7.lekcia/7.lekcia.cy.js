//documentation: https://the-one-api.dev/documentation
//API key: NLoVwdA5-AO-su1Wtbn9
//BASE url: https://the-one-api.dev/v2/book

describe('Lecture: Lord of the Rings', () => {
    it('TOGETHER: return data about books', () => {
        cy.request('https://the-one-api.dev/v2/book').then(response => {
            const books = response.body.docs
            expect(books)
                .to.be.an('array')
                .and.have.length(3)

            books.forEach(book => {
                expect(book.name).not.to.be.empty
                expect(book.name).to.be.a('string')
            });
        })
    });
    it('SELF: return data about one specific book', () => {
        cy.request('https://the-one-api.dev/v2/book').then(response => {
            const book = response.body.docs[0]
            cy.request(`https://the-one-api.dev/v2/book/${book._id}`).then(response => {
                cy.log(response.body)
                expect(response.body.docs[0].name).to.eq('The Fellowship Of The Ring')
            })
        })
    })

    it('TOGETHER: returns data about characters', () => {
        cy.request({
            url: 'https://the-one-api.dev/v2/character',
            headers: {
                'Authorization': `Bearer ${Cypress.env('lotr_api_key')}`
            }
        }).then(response => {
            const character = response.body.docs[0]
            cy.visit(character.wikiUrl)
        })
    });

    it('TOGETHER: returns specific number of data based on query parameter', () => {
        cy.request({
            url: 'https://the-one-api.dev/v2/character',
            qs: {
                'limit': 10
            },
            headers: {
                'Authorization': `Bearer ${Cypress.env('lotr_api_key')}`
            }
        }).then(response => {
            expect(response.body.docs).to.have.length(10)
        })
    });
})

describe('Homework', () => {
    it('returns data about quotes', () => {
        //use auth and check the quotes endpoint
    })
    it('returns 401 when user sends wrong API key', () => {

    })
    it('returns number of pages for quote', () => {
        //TODO: check that the response contains number of pages
    })
    it('get all quotes and filter only the quotes where dialog is "Deagol!"', () => {
        //TODO: get all quotes, filter the quotes into separate array, get only the quotes where dialog = 'Deagol'
        //HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    })
})
