/* eslint-disable */
// for the nightwatchjs tests, you can start your server with the npm script command, and after the tests, emit a test completed event with node, and then, have a script in your app that listens to this event, and closes the server.
var faker = require('faker');
var config = require('./../config');
var fakeUser = require('./../mock/user');
var fakeRecipe = require('../mock/recipe');
var { registerUser, logoutUser, createRecipe } = require('./../helpers');

var globalMock = {
  user: fakeUser(),
  recipe: fakeRecipe()
};

module.exports = {
  // 'User registration process failed: duplicate email': function (browser) {
  //   browser.url(`${config.appUrl}/auth/register`);

  //   const registeredUser = registerUser(browser, fakeUser());

  //   browser.assert.urlEquals(`${config.appUrl}/`);

  //   logoutUser(browser);

  //   browser.url(`${config.appUrl}/auth/register`);
  //   registerUser(browser, registeredUser, false);
  //   browser.assert.containsText('small.mb-3', 'A user with this email already exists.');
  //   browser.assert.urlEquals(`${config.appUrl}/auth/register`);
  //   browser.end();
  // },
  'User logout': function (browser) {
    browser.url(`${config.appUrl}/auth/register`);
    registerUser(browser, globalMock.user);

    browser.assert.urlEquals(`${config.appUrl}/`);

    logoutUser(browser);

    browser.assert.containsText('a.btn.btn-primary.btn-lg.mr-2', 'Sign in');
    browser.end();
  },
  'Home page: (user is not authenticated)': function (browser) {
    browser.url(`${config.appUrl}/`);

    browser.expect.element('body').to.be.present.before(1000);
    browser.expect.element('#app').text.to.contain('Making everyday cooking fun !');
    browser.expect.element('.btn.btn-primary.btn-lg.mr-2').text.to.equal('Sign in');
    browser.end();
  },
  'User registration process successful': function (browser) {
    browser.url(`${config.appUrl}/auth/register`);

    registerUser(browser, fakeUser());

    browser.assert.urlEquals(`${config.appUrl}/`);

    browser.url(`${config.appUrl}/auth/login`);
    browser.assert.urlEquals(`${config.appUrl}/`);
    browser.url(`${config.appUrl}/auth/register`);
    browser.assert.urlEquals(`${config.appUrl}/`);
    browser.end();
  },
  'User create recipe successful should redirect to single recipe page': function (browser) {
    browser.url(`${config.appUrl}/auth/register`);
    registerUser(browser, fakeUser());

    browser.pause(1000);
    browser.click('a.nav-link.create-recipe-link');

    browser.setValue('input[name=title]', globalMock.recipe.title);
    browser.setValue('input[name=timeToCook]', globalMock.recipe.timeToCook);
    browser.setValue('textarea', globalMock.recipe.description);
    browser.setValue('input[name=ingredients]', globalMock.recipe.ingredients[0]);
    browser.setValue('input[name=procedure]', globalMock.recipe.procedure[0]);
    browser.click('button.btn.btn-primary.btn-lg');
    browser.pause(1000);
    browser.assert.urlContains('recipe');
    browser.end();
  },
  'User update recipe successful should redirect to single recipe page': function (browser) {
    browser.url(`${config.appUrl}/auth/register`);
    registerUser(browser, globalMock.user);

    browser.pause(1000);

    createRecipe(browser, globalMock.recipe);
    //  browser.pause(200000);
    browser.url(`${config.appUrl}/`);
    browser.pause(3000);
    browser
      .click('a#navbarDropdownMenuLink.nav-link.dropdown-toggle')
      .waitForElementVisible('a#myRecipes', 2000)
      .click('a#myRecipes');

    browser.pause(1000);
    
    browser.click('a.btn.btn-primary.btn-xs');

    browser.clearValue('#recipeTitle')  
          .setValue('input[name=title]', 'UPDATED RECIPE TITLE');
    browser.pause(1000);
    browser.click('button.btn.btn-primary.btn-lg');
    browser.pause(2000);
    browser.assert.urlContains('recipe');
    browser.pause(1000)
    browser.assert.containsText('h1.card-title.text-center.h4.mb-4', 'UPDATED RECIPE TITLE');
    browser.end();
  },

  'User sign in process successful': function (browser) {
    browser.url(`${config.appUrl}/auth/register`);
    const user = fakeUser();

    const registeredUser = registerUser(browser, user);

    browser.assert.urlEquals(`${config.appUrl}/`);

    logoutUser(browser);

    browser.pause(500);

    browser.click('a.btn.btn-primary.btn-lg.mr-2');

    browser.url('/auth/login');
    browser.pause(500);

    browser.setValue('input[name=email]', registeredUser.email);
    browser.setValue('input[name=password]', registeredUser.password);
    browser.click('img');
    browser.pause(1000);
    browser.click('button.btn.mb-3.btn-primary.form-control');
    

    browser.pause(1800);

    browser.assert.urlEquals(`${config.appUrl}/`);
    browser.url(`${config.appUrl}/auth/login`);
    browser.assert.urlEquals(`${config.appUrl}/`);
    browser.end();
  },
  'User sign in process failed': function (browser) {
    browser.url(`${config.appUrl}/auth/register`);
    const user = fakeUser();

    const registeredUser = registerUser(browser, user);

    browser.assert.urlEquals(`${config.appUrl}/`);

    logoutUser(browser);

    browser.pause(500);

    browser.click('a.btn.btn-primary.btn-lg.mr-2');

    browser.url('/auth/login');
    browser.pause(500);

    browser.setValue('input[name=email]', fakeUser().email);
    browser.setValue('input[name=password]', fakeUser().password);
    browser.click('img');
    browser.pause(1000);
    browser.click('button.btn.mb-3.btn-primary.form-control');
    

    browser.pause(1800);

    browser.assert.containsText('#loginErrorMessage', 'These credentials do not match our records.');
    browser.end();
  },
  'User delete recipe': function (browser) {
    browser.url(`${config.appUrl}/auth/register`);
    registerUser(browser, globalMock.user);

    browser.pause(1000);

    createRecipe(browser, globalMock.recipe);

    browser.url(`${config.appUrl}/`);
    browser.pause(2000);
    browser
      .click('a#navbarDropdownMenuLink.nav-link.dropdown-toggle')
      .waitForElementVisible('a#myRecipes', 2000)
      .click('a#myRecipes');

    browser.pause(1000);
    
    browser.click('button.btn.btn-danger.btn-xs');

    browser.waitForElementVisible('button.confirm', 2000);
    browser.pause(1000);
    browser.click('button.confirm');
    browser.pause(500);
    browser.assert.containsText('h3.text-center', 'No recipes yet.');
    browser.end();
  },
  'User review recipe': function (browser) {
    browser.url(`${config.appUrl}/auth/register`);
    registerUser(browser, globalMock.user);

    browser.pause(1000);

    createRecipe(browser, globalMock.recipe);

    const review = faker.lorem.sentence();

    browser.setValue('textarea', review);
    browser.pause(500);
    browser.click('button.btn.btn-primary.btn-sm.mt-3.float-right');
    browser.pause(1000);
    browser.assert.containsText('div.review-body', review);
    browser.end();
  },
  // "User can favorite a recipe": function (browser) {
  //   browser.url(`${config.appUrl}/auth/register`);

  //   const user1 = fakeUser();
  //   registerUser(browser, user1);

  //   browser.pause(1000);

  //   createRecipe(browser, globalMock.recipe);
  //   browser.url(`${config.appUrl}/`);
  //   browser.pause(500);
  //   logoutUser(browser);
  //   browser.pause(1000);

  //   browser.url(`${config.appUrl}/auth/register`);    
  //   const user2 = fakeUser();
  //   registerUser(browser, user2);

  //   browser.url(`${config.url}/`);

  //   console.log('@@@ RECIPE: ', globalMock.recipe);
  //   browser.pause(1000);
  //   browser.click('h5.card-title.h6.text-center>a');
  //   browser.pause(100000);
  // }
};
