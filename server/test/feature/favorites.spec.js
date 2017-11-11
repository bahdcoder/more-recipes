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

describe('/favorites', () => {

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

  describe('/users/favorites POST', () => {
    it('Should favorite a recipe for a user', (done) => {
      chai.request(application)
        .post(`/api/v1/users/${globalMock.recipe1.id}/favorites`)
        .set('x-access-token', globalMock.user2.authToken)
        .end((error, response) => {

          expect(response).to.have.status(200);
          expect(response.body.data.message).to.equal('Recipe favorited.');

          done();
        });
    });
    it('Should not allow the creator of a recipe to favorite it', (done) => {
      chai.request(application)
        .post(`/api/v1/users/${globalMock.recipe1.id}/favorites`)
        .set('x-access-token', globalMock.user1.authToken)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.data.message).to.equal('Unauthorized.');

          done();
      });
    });
  });

  describe('/users/favorites GET', () => {
    it('Should get all the favorite recipes for a user', (done) => {
      chai.request(application)
      .post(`/api/v1/users/${globalMock.recipe1.id}/favorites`)
      .set('x-access-token', globalMock.user2.authToken)
      .end((error, response) => {

        chai.request(application)
        .get(`/api/v1/users/favorites`)
        .set('x-access-token', globalMock.user2.authToken)
        .end((error, response) => {
          const responseBody = response.body.data;

          expect(response).to.have.status(200);
          expect(Array.isArray(responseBody.favorites)).to.be.true;
          expect(responseBody.favorites.length).to.equal(1);
          expect(responseBody.favorites[0].id).to.equal(globalMock.recipe1.id);

          done();
        });
      });
    });
  });
});
