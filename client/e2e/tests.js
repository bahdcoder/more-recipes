/* eslint-disable */
// for the nightwatchjs tests, you can start your server with the npm script command, and after the tests, emit a test completed event with node, and then, have a script in your app that listens to this event, and closes the server.
const faker = require('faker');
const config = require('./config');
const fakeUser = require('./mock/user');
const { registerUser } = require('./helpers');

const globalMock = {
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
  }
};
