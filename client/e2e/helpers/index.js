/* eslint-disable */
const fakeUser = require('../mock/user');

const globalMock = {
  user: fakeUser()
};

const registerUser = function (browser) {
  browser.setValue('input[name=name]', globalMock.user.name);
  browser.setValue('input[name=email]', globalMock.user.email);
  browser.setValue('input[name=password]', globalMock.user.password);
  browser.setValue('input[name=confirmPassword]', globalMock.user.password);

  browser.click('.btn.mb-3.btn-primary.btn-lg');
  browser.click('.btn.mb-3.btn-primary.btn-lg');
  browser.pause(1800);
}

module.exports = {
  registerUser
};