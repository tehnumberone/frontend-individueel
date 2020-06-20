module.exports = {
    'Login test': function (client) {
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
    },
    'session validation test': function (client) {
        client
            .waitForElementVisible('#sessionUsername', 1000)
            .assert.visible('#sessionUsername')
            .pause(500)
    },
    'session logout test': function (client) {
        client
            .waitForElementVisible('#logOut', 1000)
            .pause(500)
            .click('#logOut')
            .pause(500)
            .assert.urlContains('http://localhost:4200/login')
            .end();
    },
    'validation test no password': function (client) {
        client
            .url('http://localhost:4200/login')
            .waitForElementVisible('#username', 1000)
            .assert.title('frontend-individueel')
            .assert.visible('#username')
            .setValue('#username', 'Batista')
            .pause(1000)
            .click('#loginButton')
            .pause(500)
            .assert.containsText(".error", "Password required.")
            .pause(1000)
            .assert.urlContains('http://localhost:4200/login')
            .end();

    },
    'validation test no username': function (client) {
        client
            .url('http://localhost:4200/login')
            .waitForElementVisible('#username', 1000)
            .assert.title('frontend-individueel')
            .assert.visible('#username')
            .setValue('#password', 'bomb')
            .pause(1000)
            .click('#loginButton')
            .pause(500)
            .assert.containsText(".error", "Username required.")
            .pause(1000)
            .assert.urlContains('http://localhost:4200/login')
            .end();
    },
};
