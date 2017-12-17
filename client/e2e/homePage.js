/* eslint-disable */
const forever = require('forever-monitor');

//  const appServer = forever.start(['npm', 'run', 'start:e2e'], { silent: false });

describe('Google demo test for Mocha', () => {
  describe('with Nightwatch', () => {
    before((client, done) => done());
    after((client, done) => client.end(()  => done()));

    it('uses BDD to run the Google simple test', (client) => {
      client
        .url('http://localhost:4080')
        .expect.element('body').to.be.present.before(1000);
    });
  });
});
