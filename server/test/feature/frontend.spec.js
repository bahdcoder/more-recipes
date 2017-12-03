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


describe('/frontend', () => {
  describe('/frontend/home', () => {
    beforeEach(async () => {
      await db.User.destroy({ where: {}, truncate: true });
      await db.Recipe.destroy({ where: {}, truncate: true });
      await client.flushall();
  
  
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
  
      globalMock.user3 = await db.User.create({
        name: 'Anonymous strange',
        email: 'anonymous@strange.com',
        password: await bcrypt.hash('secret', 10)
      });
  
      globalMock.recipe1 = await db.Recipe.create({
        title: 'Vegetable Salad',
        description: 'this stuff is not nice, really. am just building my api.',
        imageUrl: 'https://i.imgur.com/av7fjeA.jpg',
        timeToCook: 205,
        ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces"]),
        procedure: JSON.stringify(["Wash all the vegetables with enough water and salt."]),
        userId: globalMock.user1.id
      });
  
      globalMock.recipe2 = await db.Recipe.create({
        title: 'Vegetable Salad',
        description: 'this stuff is not nice, really. am just building my api.',
        imageUrl: 'https://i.imgur.com/av7fjeA.jpg',
        timeToCook: 205,
        ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces"]),
        procedure: JSON.stringify(["Wash all the vegetables with enough water and salt."]),
        userId: globalMock.user2.id
      });
  
      globalMock.recipe3 = await db.Recipe.create({
        title: 'Vegetable Salad',
        description: 'this stuff is not nice, really. am just building my api.',
        imageUrl: 'https://i.imgur.com/av7fjeA.jpg',
        timeToCook: 205,
        ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces"]),
        procedure: JSON.stringify(["Wash all the vegetables with enough water and salt."]),
        userId: globalMock.user3.id
      });
  
      await client.sadd(`recipe:${globalMock.recipe1.id}:favorites`, globalMock.user2.id);
      await client.sadd(`recipe:${globalMock.recipe1.id}:favorites`, globalMock.user3.id);
  
      await client.sadd(`recipe:${globalMock.recipe2.id}:favorites`, globalMock.user1.id);
  
    });

    it('Should return mostFavoriteRecipes, and latestRecipes in correct order', async () => {
      const response = await chai.request(application).get('/api/v1/frontend/home');

      const { mostFavoritedRecipes } = response.body.data;
      const { latestRecipes } = response.body.data;

      
      expect(latestRecipes[0].id).to.equal(globalMock.recipe3.id);
      expect(latestRecipes[1].id).to.equal(globalMock.recipe2.id);
      expect(latestRecipes[2].id).to.equal(globalMock.recipe1.id);

      expect(mostFavoritedRecipes[0].id).to.equal(globalMock.recipe1.id);
      expect(mostFavoritedRecipes[1].id).to.equal(globalMock.recipe2.id);
    });
  });
});