it('search for an artist', () => {
    const client_id = '0a93cabf252f4c5eb4a8cf095d3214c4'
    const client_secret = '81e0940422d9410ea51387509b4c6bad'
    cy.viewport(1920, 1600)
    cy.setCookie('OptanonAlertBoxClosed', '2023-07-25T11:15:13.457Z')
    cy.request({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: true,
        body: {
            grant_type: 'client_credentials'
        },
    }).then(response => {
        cy.log(response.body.access_token)
        cy.request({
            url: 'https://api.spotify.com/v1/search',
            qs: {
                q: 'funk oddysey',
                type: 'album',
                market: 'sk'
            },
            headers: {
                Authorization: 'Bearer ' + response.body.access_token
            }
        }).then(response => cy.visit(response.body.albums.items[0].external_urls.spotify))
        cy.get('[data-testid="album-page"]').should('contain.text', 'A Funk Odyssey')
        cy.get('[data-testid="action-bar-row"]').find('[data-testid="add-button"]').click()
        cy.get('.tippy-content').should('contain.text', 'You’re logged out')
    })
})