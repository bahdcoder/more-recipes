/* eslint-disable */
// for the nightwatchjs tests, you can start your server with the npm script command, and after the tests, emit a test completed event with node, and then, have a script in your app that listens to this event, and closes the server.
var config = require('./../config');
var fakeUser = require('./../mock/user');
var { registerUser, logoutUser } = require('./../helpers');

var globalMock = {
  user: fakeUser()
};

module.exports = {
  'Home page: (user is not authenticated)': function (browser) {
    browser.url(`${config.appUrl}/`);

    browser.expect.element('body').to.be.present.before(1000);
    browser.expect.element('#app').text.to.contain('Making everyday cooking fun !');
    browser.expect.element('.btn.btn-primary.btn-lg.mr-2').text.to.equal('Sign in');
    browser.end();
  },
  'User registration process successful': function (browser) {
    browser.url(`${config.appUrl}/auth/register`);

    registerUser(browser);

    browser.assert.urlEquals(`${config.appUrl}/`);

    browser.url(`${config.appUrl}/auth/login`);
    browser.assert.urlEquals(`${config.appUrl}/`);
    browser.url(`${config.appUrl}/auth/register`);
    browser.assert.urlEquals(`${config.appUrl}/`);
    browser.end();
  },
  '@tags': ['createRecipe'],
  'User create recipe successful': function() {
    browser.url(`${config.appUrl}/auth/register`);
    registerUser(browser);
  }
  // tags: ['login'],
  // 'User sign in process successful': function (browser) {
  //   browser.url(`${config.appUrl}/auth/register`);

  //   const registeredUser = registerUser(browser);
  //   console.log(registeredUser);

  //   browser.assert.urlEquals(`${config.appUrl}/`);
    
  //   logoutUser(browser);

  //   browser.url('/auth/login');

  //   browser.setValue('input[name=email]', registeredUser.email);
  //   browser.setValue('input[name=password]', registeredUser.password);

  //   browser.click('.btn.mb-3.btn-primary.btn-lg');
  //   browser.click('.btn.mb-3.btn-primary.btn-lg');
  //   browser.pause(1800);

  //   browser.assert.urlEquals(`${config.appUrl}/`);
  //   browser.url(`${config.appUrl}/auth/login`);
  //   browser.assert.urlEquals(`${config.appUrl}/`);
  // }
};
