/* eslint-disable */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import config from '../../config';
import application from '../../index';
import db from '../../database/models/index';
import client from '../../helpers/redis-client';

chai.use(chaiHttp);
const globalMock = {};

describe('/votes', () => {

  beforeEach(async () => {
    await db.User.destroy({ where: {}, truncate: true });
    await db.Recipe.destroy({ where: {}, truncate: true });

    globalMock.user1 = await db.User.create({
      name: 'kati frantz',
      email: 'kati@frantz.com',
      password: await bcrypt.hash('secret', 10)
    });

    const recipe = {
      title: 'Vegetable Salad',
      description: 'this stuff is not nice, really. am just building my api.',
      imageUrl: 'https://i.imgur.com/av7fjeA.jpg',
      timeToCook: 205,
      ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces"]),
      procedure: JSON.stringify(["Wash all the vegetables with enough water and salt."]),
      userId: globalMock.user1.id
    };

    globalMock.user2 = await db.User.create({
      name: 'Doctor strange',
      email: 'doctor@strange.com',
      password: await bcrypt.hash('secret', 10)
    });

    globalMock.user3 = await db.User.create({
      name: 'Myers Duraine',
      email: 'myers@duraine.com',
      password: await bcrypt.hash('secret', 10)
    });

    globalMock.user1.authToken = jwt.sign({ email: globalMock.user1.email }, config.JWT_SECRET);
    globalMock.user2.authToken = jwt.sign({ email: globalMock.user2.email }, config.JWT_SECRET);
    globalMock.user3.authToken = jwt.sign({ email: globalMock.user3.email }, config.JWT_SECRET);

    globalMock.recipe1 = await db.Recipe.create(recipe);
    globalMock.recipe2 = await db.Recipe.create(recipe);

  });

  describe('/upvote', () => {
    it('Should upvote a recipe for a user', (done) => {
      chai.request(application)
        .post(`/api/v1/recipes/${globalMock.recipe1.id}/upvote`)
        .set('x-access-token', globalMock.user2.authToken)
        .end((error, response) => {

          expect(response).to.have.status(200);
          expect(response.body.data.message).to.equal('Recipe upvoted successfully.');

          done();
        });
    });
    it('Should only permit other users to upvote recipes and not the creator', (done) => {
      chai.request(application)
        .post(`/api/v1/recipes/${globalMock.recipe1.id}/upvote`)
        .set('x-access-token', globalMock.user1.authToken)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthorized.');

          done();
      });
    });
    it('Should toggle off upvote for a recipe', async () => {
      // upvote the recipe for the user
      await chai.request(application).post(`/api/v1/recipes/${globalMock.recipe1.id}/upvote`)
      .set('x-access-token', globalMock.user2.authToken);

      const upvotersAfterUpvote = await client.smembers(`recipe:${globalMock.recipe1.id}:upvotes`);
      expect(upvotersAfterUpvote).to.include(globalMock.user2.id);
      expect(upvotersAfterUpvote.length).to.equal(1);      

      await chai.request(application).post(`/api/v1/recipes/${globalMock.recipe1.id}/upvote`)
      .set('x-access-token', globalMock.user2.authToken);

      const upvoters = await client.smembers(`recipe:${globalMock.recipe1.id}:upvotes`);

      expect(upvoters.length).to.equal(0);
    });
  });

  describe('/downvote', () => {
    it('Should downvote a recipe for a user', (done) => {
      chai.request(application)
        .post(`/api/v1/recipes/${globalMock.recipe1.id}/downvote`)
        .set('x-access-token', globalMock.user2.authToken)
        .end((error, response) => {

          expect(response).to.have.status(200);
          expect(response.body.data.message).to.equal('Recipe downvoted successfully.');

          done();
        });
    });
    it('Should only permit other users to downvote recipes and not the creator', (done) => {
      chai.request(application)
        .post(`/api/v1/recipes/${globalMock.recipe1.id}/downvote`)
        .set('x-access-token', globalMock.user1.authToken)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthorized.');

          done();
      });
    });
    it('Should toggle off downvote for a recipe', async () => {
      // upvote the recipe for the user
      await chai.request(application).post(`/api/v1/recipes/${globalMock.recipe1.id}/downvote`)
      .set('x-access-token', globalMock.user2.authToken);

      const upvotersAfterUpvote = await client.smembers(`recipe:${globalMock.recipe1.id}:downvotes`);
      expect(upvotersAfterUpvote).to.include(globalMock.user2.id);
      expect(upvotersAfterUpvote.length).to.equal(1);      

      await chai.request(application).post(`/api/v1/recipes/${globalMock.recipe1.id}/downvote`)
      .set('x-access-token', globalMock.user2.authToken);

      const upvoters = await client.smembers(`recipe:${globalMock.recipe1.id}:downvotes`);

      expect(upvoters.length).to.equal(0);
    });
  });

  describe('/voters', () => {
    it('Should get upvoters and downvoters for a recipe', (done) => {
      chai.request(application)
        .post(`/api/v1/recipes/${globalMock.recipe1.id}/downvote`)
        .set('x-access-token', globalMock.user2.authToken)
        .end((error, response) => {

          chai.request(application)
          .post(`/api/v1/recipes/${globalMock.recipe1.id}/upvote`)
          .set('x-access-token', globalMock.user3.authToken)
          .end((error, response) => {
              chai.request(application)
              .get(`/api/v1/recipes/${globalMock.recipe1.id}/voters`)
              .set('x-access-token', globalMock.user1.authToken)
              .end((error, response) => {
                const { upvoters } = response.body.data;
                const { downvoters } = response.body.data;

                expect(Array.isArray(upvoters)).to.be.true;
                expect(Array.isArray(downvoters)).to.be.true;
                expect(upvoters[0].id).to.equal(globalMock.user3.id);
                expect(downvoters[0].id).to.equal(globalMock.user2.id);
                done();
              });
          });
      });
      
    });
    it('Should return a 404 if the recipe is not found', (done) => {
      const invalidRecipeId = '630de7cc-e5cb-413e-a3b9-809c98b6c08q';
      chai.request(application)
        .get(`/api/v1/recipes/${invalidRecipeId}/voters`)
        .set('x-access-token', globalMock.user2.authToken)
        .end((error, response) => {
          expect(response).to.have.status(404);

          expect(response.body.data.message).to.equal('Recipe not found.');
          done();
        });
    });
  });

});
