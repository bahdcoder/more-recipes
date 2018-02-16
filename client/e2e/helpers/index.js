/* eslint-disable */
const fakeUser = require('../mock/user');

const globalMock = {
  user: fakeUser()
};

const registerUser = function (browser) {
  const user = fakeUser();
  browser.setValue('input[name=name]', user.name);
  browser.setValue('input[name=email]', user.email);
  browser.setValue('input[name=password]', user.password);
  browser.setValue('input[name=confirmPassword]', user.password);

  browser.click('.btn.mb-3.btn-primary.btn-lg');
  browser.click('.btn.mb-3.btn-primary.btn-lg');
  browser.pause(1800);

  return globalMock.user;
}
 
const logoutUser = function (browser) {
  browser.click('a.nav-link.dropdown-toggle');
  browser.click('a.nav-link.dropdown-toggle')
    .waitForElementVisible('a.dropdown-item.logout')
    .click('a.dropdown-item.logout');
}

module.exports = {
  registerUser,
  logoutUser
};