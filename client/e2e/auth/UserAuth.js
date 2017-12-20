/* eslint-disable */
const faker = require('faker');
const config = require('../config');
const fakeUser = require('../mock/user');
const { registerUser } = require('../helpers');

const globalMock = {
  user: fakeUser()
};

module.exports = {
  '@tags': ['login', 'login-success'],
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
  'User Login Process with wrong password': function (browser) {
    browser.url(`${config.appUrl}/auth/login`);
    browser.clearValue('#staticEmail');
    browser.clearValue('#inputPassword');    

    browser.setValue('#staticEmail', faker.internet.email());
    browser.setValue('#inputPassword', faker.internet.password());
    browser.click('.btn.mb-3.btn-primary.form-control');
    browser.pause(1000);

    browser.expect.element('#loginErrorMessage').text.to.contain('These credentials do not match our records.');

    browser.end();
  }
};