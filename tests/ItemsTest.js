module.exports = {
    'Item creation test': function (client) {
        client
            .url('http://localhost:4200/login')
            .waitForElementVisible('#username', 1000)
            .assert.title('frontend-individueel')
            .assert.visible('#username')
            .setValue('#username', 'Batista')
            .setValue('#password', 'bomb')
            .click('#loginButton')
            .pause(500)
            .click('#createItem')
            .assert.urlContains('http://localhost:4200/items/create')
            .pause(500)
            .setValue('#name', 'Batista')
            .click('select[id="type"]')
            .waitForElementVisible("option[value='Food']")
            .click('option[value="Food"]')
            .keys(['\ue015','\ue015','\ue007'])
            .setValue('#itemImage', 'Bomb.jpg')
            .pause(500)
            .click('#create')
            .assert.urlEquals('http://localhost:4200/items')
            .pause(500)
    },
    'Item list test': function (client) {
        client
            .click('#refreshButton')
            .pause(2000)
            .assert.elementPresent(".itemTable")
    },
    'Item deletion test': function (client) {
        client
            .pause(500)
            .click('#delete')
            .pause(1000)
            .click('#refreshButton')
            .pause(500)
            .assert.elementNotPresent(".itemTable")
            .pause(500)
            .end();
    },
}
