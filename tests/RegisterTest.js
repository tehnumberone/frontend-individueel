module.exports = {
    'Register test': function (client) {
        client
            .url('http://localhost:4200/register')
            .waitForElementVisible('#username', 1000)
            .assert.title('frontend-individueel')
            .assert.visible('#username')
            .setValue('#username', 'TestAccount')
            .setValue('#password', 'bomb')
            .setValue('#repeatPassword', 'bomb')
            .setValue('#email','TestAccount@test.com')
            .pause(1000)
            .click('#registerButton')
            .pause(500)
            .verify.urlContains('http://localhost:4200/login')
            .pause(1000)
            .end();
    },
    'Register validation test api username taken': function (client) {
        client
            .url('http://localhost:4200/register')
            .assert.urlContains('http://localhost:4200/register')
            .waitForElementVisible('#username', 1000)
            .assert.title('frontend-individueel')
            .assert.visible('#username')
            .setValue('#username', 'TestAccount')
            .setValue('#password', 'bomb')
            .setValue('#repeatPassword', 'bomb')
            .pause(1000)
            .click('#registerButton')
            .pause(500)
            .assert.visible('.error')
            //.assert.containsText(".error", "Username is already taken.")
            .pause(1000)
            .assert.urlContains('http://localhost:4200/register')
            .end();
    },
    /*'Register validation test api email used': function (client) {
        client
            .url('http://localhost:4200/register')
            .waitForElementVisible('#username', 1000)
            .assert.title('frontend-individueel')
            .assert.visible('#username')
            .setValue('#username', 'Truck')
            .setValue('#password', 'bomb')
            .setValue('#repeatPassword', 'bomb')
            .setValue('#email','TestAccount@test.com')
            .pause(1000)
            .click('#registerButton')
            .pause(500)
            .assert.containsText(".error", "Email is already taken.")
            .pause(1000)
            .assert.urlContains('http://localhost:4200/register')
            .end();
    },*/
    'Register validation test api invalid input': function (client) {
        client
            .url('http://localhost:4200/register')
            .waitForElementVisible('#username', 1000)
            .assert.title('frontend-individueel')
            .assert.visible('#username')
            .setValue('#username', 'Batista')
            .setValue('#password', 'bomb')
            .setValue('#repeatPassword', 'bomby')
            .setValue('#email', 'bomb@bomb.nl')
            .pause(1000)
            .click('#registerButton')
            .pause(500)
            .assert.containsText(".error", "Password is not the same as repeat password.")
            .pause(1000)
            .assert.urlContains('http://localhost:4200/register')
            .end();
    },
}
