/* eslint-disable */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import config from '../../config';
import application from './../../index.js';
import db from '../../database/models/index';

chai.use(chaiHttp);
const globalMock = {};

describe('/recipes/:id/reviews', () => {
  beforeEach(async () => {
        await db.User.destroy({ where: {}, truncate: true })
        await db.Recipe.destroy({ where: {}, truncate: true })
    
        globalMock.user1 = await db.User.create({
          name: 'kati frantz',
          email: 'kati@frantz.com',
          password: await bcrypt.hash('secret', 10)
        });
    
        globalMock.user2 = await db.User.create({
          name: 'Doctor strange',
          email: 'doctor@strange.com',
          password: await bcrypt.hash('secret', 10)
        });
    
        globalMock.user1.authToken = jwt.sign({ email: globalMock.user1.email }, config.JWT_SECRET);
        globalMock.user2.authToken = jwt.sign({ email: globalMock.user2.email }, config.JWT_SECRET);
    
        globalMock.recipe1 = await db.Recipe.create({
          title: 'Vegetable Salad',
          description: 'this stuff is not nice, really. am just building my api.',
          imageUrl: 'https://i.imgur.com/av7fjeA.jpg',
          timeToCook: 205,
          ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces"]),
          procedure: JSON.stringify(["Wash all the vegetables with enough water and salt."]),
          userId: globalMock.user1.id
        });

        globalMock.review1 = await db.Review.create({
          review: 'REVIEW_BODY',
          recipeId: globalMock.recipe1.id,
          userId: globalMock.user2.id
        });
    
  });

  describe('/recipes/:id/reviews POST endpoint', () => {
    it('Should save a review for the recipe.', (done) => {

      chai.request(application)
        .post(`/api/v1/recipes/${globalMock.recipe1.id}/reviews`)
        .set('x-access-token', globalMock.user2.authToken)
        .send({ review: 'I absolutely hate your cooking. Its a mess.' })
        .end((error, response) => {
          expect(response).to.have.status(200);
          const responseBody = response.body;
          
          expect(responseBody.data.review.recipeId).to.equal(globalMock.recipe1.id);
          expect(responseBody.data.review.review).to.equal('I absolutely hate your cooking. Its a mess.');

          done();
        });
    });

    it('Should return a 404 if the recipe is not found.', (done) => {
      const invalidRecipeId = '630de7cc-e5cb-413e-a3b9-809c98b6c08q';
      chai.request(application)
        .post(`/api/v1/recipes/${invalidRecipeId}/reviews`)
        .set('x-access-token', globalMock.user2.authToken)
        .send({ review: 'this is a valid review' })
        .end((error, response) => {
          expect(response).to.have.status(404);

          expect(response.body.data.message).to.equal('Recipe not found.');
          done();
        });
    });

    it('Should return validation errors if review is not provided', (done) => {
      chai.request(application)
      .post(`/api/v1/recipes/${globalMock.recipe1.id}/reviews`)
      .set('x-access-token', globalMock.user2.authToken)
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(422);
        const res = response.body;

        expect(res.data).to.include.members(['The review is required.']);

        done();
      });
    });

    it('Should only create reviews for authenticated users', (done) => {
      chai.request(application)
      .post(`/api/v1/recipes/${globalMock.recipe1.id}/reviews`)
      .send({ review: 'This is a valid review.' })
      .end((error, response) => {
        expect(response).to.have.status(401);

        expect(response.body.data.message).to.equal('Unauthenticated.');

        done();
      });
    });
  });

  describe('/recipes/:id/reviews GET endpoint', () => {
    it('Should return all the reviews for the recipe', (done) => {
      chai.request(application)
        .get(`/api/v1/recipes/${globalMock.recipe1.id}/reviews`)
        .set('x-access-token', globalMock.user2.authToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          const reviews = response.body.data.reviews;
          
          expect(reviews).to.be.an('array');
          expect(reviews[0].id).to.equal(globalMock.review1.id);

          done();
      });
    });
  });

});
