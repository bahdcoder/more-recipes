/* eslint-disable */
const fakeUser = require('../mock/user');

const globalMock = {
  user: fakeUser()
};

const registerUser = function (browser, fakeUser, modify = true) {
  const user = fakeUser || fakeUser();
  user.email = modify ? `${(new Date()).getTime()}${user.email}` : user.email;
  browser.setValue('input[name=name]', user.name);
  browser.setValue('input[name=email]', user.email);
  browser.setValue('input[name=password]', user.password);
  browser.setValue('input[name=confirmPassword]', user.password);

  browser.click('img');

  browser.pause(1000);

  browser.click('.btn.mb-3.btn-primary.btn-lg');

  browser.pause(3000);
  return fakeUser;
}

const createRecipe = function (browser, recipe) {
  browser.pause(5000);
  browser.click('a.nav-link.create-recipe-link');

  browser.setValue('input[name=title]', recipe.title);
  browser.setValue('input[name=timeToCook]', recipe.timeToCook);
  browser.setValue('textarea', recipe.description);
  browser.setValue('input[name=ingredients]', recipe.ingredients[0]);
  browser.setValue('input[name=procedure]', recipe.procedure[0]);
  browser.click('button.btn.btn-primary.btn-lg');
  browser.pause(1000);
  browser.assert.urlContains('recipe');
}

const logoutUser = function (browser) {
  browser.pause(1000);
  browser.click('a#navbarDropdownMenuLink.nav-link.dropdown-toggle')
    .waitForElementVisible('#logout', 2000)
    .click('#logout');
}

module.exports = {
  registerUser,
  logoutUser,
  createRecipe
};