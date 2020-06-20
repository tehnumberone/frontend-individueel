module.exports = {
    'Character creation test': function (client) {
        client
            .url('http://localhost:4200/login')
            .waitForElementVisible('#username', 1000)
            .assert.title('frontend-individueel')
            .assert.visible('#username')
            .setValue('#username', 'Batista')
            .setValue('#password', 'bomb')
            .pause(1000)
            .click('#loginButton')
            .pause(500)
            .assert.urlEquals('http://localhost:4200/')
            .pause(500)
            .click('#characters')
            .pause(500)
            .click('#newCharacter')
            .pause(500)
            .setValue('#name', 'Batista')
            .setValue('#characterModel', 'bomb')
            .pause(500)
            .click('#create')
            .pause(500)
            .click('#characters')
            .assert.urlContains('http://localhost:4200/characters')
    },
    'Character list test': function (client) {
        client
            .click('#refreshButton')
            //.assert.elementPresent(".characterTable")
    },
    /*'Character play test': function (client) {
        client
            .click('#play')
            .pause(500)
            //.assert.elementPresent(".characterTable")
    },
    'Character deletion test': function (client) {
        client
            .pause(500)
            .click('#characters')
            .pause(500)
            .click('#delete')
            .pause(1000)
            .click('#refreshButton')
            .pause(500)
            //.assert.elementNotPresent(".characterTable")
            .pause(500)
            .end();
    },*/
}
