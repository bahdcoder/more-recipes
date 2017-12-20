/* eslint-disable */
// for the nightwatchjs tests, you can start your server with the npm script command, and after the tests, emit a test completed event with node, and then, have a script in your app that listens to this event, and closes the server.

const globalMock = {
  appUrl: 'http://localhost:5678'
};

module.exports = {
  '@tags': 'home',
  'Home page: (user is not authenticated)' : function (browser) {
    browser
      .url(globalMock.appUrl);

    browser.expect.element('body').to.be.present.before(1000);
    browser.expect.element('#app').text.to.contain('Making everyday cooking fun !');
    browser.expect.element('.btn.btn-primary.btn-lg.mr-2').text.to.equal('Sign in');
    browser.end();
  }
};
