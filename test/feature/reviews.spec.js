/* eslint-disable */
import ChaiHttp from 'chai-http';
import Chai, { expect } from 'chai';
import Application from './../../server';

Chai.use(ChaiHttp);

describe('/recipes/:id/reviews', () => {
  describe('/recipes/:id/reviews POST endpoint', () => {
    it('Should save a review for the recipe.', (done) => {
      Chai.request(Application)
        .post('/api/v1/recipes/12121/reviews')
        .send({ review: 'I absolutely hate your cooking. Its a mess.' })
        .end((error, response) => {
          expect(response).to.have.status(200);
          const res = response.body;
          
          expect(res.data.id).to.equal(12121);          
          expect(res.data.reviews).to.not.be.undefined;
          expect(Array.isArray(res.data.reviews)).to.be.true;
          expect(res.data.reviews[0]).to.equal('I absolutely hate your cooking. Its a mess.');

          done();
        });
    });

    it('Should return a 404 if the recipe is not found.', (done) => {
      Chai.request(Application)
        .post('/api/v1/recipes/1324234121/reviews')
        .send({ review: 'this is a valid review' })
        .end((error, response) => {
          expect(response).to.have.status(404);
          const res = response.body;
          expect(res.data).to.equal('The recipe was not found in the database.');
          done();
        });
    });

    it('Should return validation errors if review is not provided', (done) => {
      Chai.request(Application)
      .post('/api/v1/recipes/12121/reviews')
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(422);
        const res = response.body;

        expect(res.data).to.include.members(['The review is required.']);

        done();
      });
    });
  });

});
