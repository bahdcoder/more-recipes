/* eslint-disable */
const faker = require('faker');
const config = require('../config');
const fakeUser = require('../mock/user');
const { registerUser } = require('../helpers');

const globalMock = {
  user: fakeUser()
};

module.exports = {
  '@tags': ['register'],
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