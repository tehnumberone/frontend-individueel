module.exports={
  'Login test': function (client){
      client
          .url('http://localhost:4200/login')
          .waitForElementVisible('#username',1000)
          .assert.title('frontend-individueel')
          .assert.visible('#username')
          .setValue('#username','Batista')
          .setValue('#password','bomb')
          .pause(3000)
          .click('#loginButton')
          //.assert.containsText()
          .pause(3000)
          .end();
  }
};
