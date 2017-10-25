import ChaiHttp from 'chai-http';
import Chai, { expect } from 'chai';
import Application from './../../server';

Chai.use(ChaiHttp);

describe('/recipes', () => {
  describe('/recipes GET endpoint', () => {
    it('Should return a list of recipes when called', (done) => {
      Chai.request('http://localhost:4044')
        .get('/api/recipes')
        .end((error, response) => {
          console.log(response.body);
          expect(response).to.have.status(200);

          done();
        });
    });
  });
});
