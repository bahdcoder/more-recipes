/* eslint-disable */
import bcrypt from 'bcrypt';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import config from '../../config';
import application from '../../index';
import db from '../../database/models/index';
import client from '../../helpers/redis-client';
import { BADQUERY } from 'dns';

chai.use(chaiHttp);
const globalMock = {};

describe('/recipes', () => {
  beforeEach(async () => {

    await db.User.destroy({ where: {}, truncate: true });
    await db.Recipe.destroy({ where: {}, truncate: true });
    await client.flushall();

    globalMock.recipeStub = () => ({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      imageUrl: faker.image.imageUrl(),
      timeToCook: faker.random.number(),
      ingredients: JSON.stringify([faker.lorem.sentence(), faker.lorem.sentence()]),
      procedure: JSON.stringify([faker.lorem.sentence(), faker.lorem.sentence()])
    });

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
      ...globalMock.recipeStub(),
      userId: globalMock.user1.id
    });

  });

  describe('/recipes GET endpoint', () => {
    beforeEach(async () => {

      globalMock.user3 = await db.User.create({
        name: 'Mama miya',
        email: 'mama@miya.com',
        password: await bcrypt.hash('secret', 10)
      });
  
      globalMock.user1.authToken = jwt.sign({ email: globalMock.user1.email }, config.JWT_SECRET);

      globalMock.recipe2 = await db.Recipe.create({
        ...globalMock.recipeStub(),
        userId: globalMock.user1.id
      });

      globalMock.recipe3 = await db.Recipe.create({
        ...globalMock.recipeStub(),
        userId: globalMock.user2.id
      });

      globalMock.recipe4 = await db.Recipe.create({
        ...globalMock.recipeStub(),
        userId: globalMock.user2.id
      });
      // add user 1 to the list of favorites of recipe 2
      await client.sadd(`recipe:${globalMock.recipe2.id}:favorites`, globalMock.user1.id);
      await client.sadd(`recipe:${globalMock.recipe2.id}:favorites`, globalMock.user3.id);  
      // upvote the second recipe
      await client.sadd(`recipe:${globalMock.recipe2.id}:upvotes`, globalMock.user2.id);
      await client.sadd(`recipe:${globalMock.recipe2.id}:upvotes`, globalMock.user3.id);   
      await client.sadd(`recipe:${globalMock.recipe1.id}:upvotes`, globalMock.user2.id);          
      
      // add user 2 to the list of favorites of recipe 1   
      await client.sadd(`recipe:${globalMock.recipe1.id}:favorites`, globalMock.user1.id);
      
    });
    it('Should return a paginated list of recipes when called', (done) => {
      chai.request(application)
        .get('/api/v1/recipes?perPage=5')
        .end((error, response) => {
          expect(response).to.have.status(200);
          const res = response.body;
          const { recipes, paginationMeta } = res.data.recipes;

          expect(Array.isArray(recipes)).to.be.true;
          expect(recipes[0].id).to.equal(globalMock.recipe1.id);
          expect(recipes[0].title).to.equal(globalMock.recipe1.title);
          expect(recipes[0].User.name).to.equal(globalMock.user1.name);      
          expect(paginationMeta.currentPage).to.equal(1);
          expect(paginationMeta.recipesCount).to.equal(4);
          expect(paginationMeta.pageCount).to.equal(1);
          done();
        });
    });

    it('Should sort recipes by mostFavorited', async () => {
      const response = await chai.request(application).get('/api/v1/recipes?perPage=5&sort=mostFavorited');
      const { recipes, paginationMeta } = response.body.data.recipes;

      expect(paginationMeta.currentPage).to.equal(1);
      // only recipes that have been counted actually show up
      expect(paginationMeta.recipesCount).to.equal(2);
      expect(paginationMeta.pageCount).to.equal(1);
      expect(recipes.length).to.equal(2);

      expect(recipes[0].id).to.equal(globalMock.recipe2.id);
      expect(recipes[1].id).to.equal(globalMock.recipe1.id);      
    });

    it('Should sort recipes by mostUpvoted', async () => {
      const response = await chai.request(application).get('/api/v1/recipes?perPage=5&sort=mostUpvoted');
      const { recipes, paginationMeta } = response.body.data.recipes;

      expect(paginationMeta.recipesCount).to.equal(2);
      expect(paginationMeta.pageCount).to.equal(1);
      expect(recipes.length).to.equal(2);
      
      expect(recipes[0].id).to.equal(globalMock.recipe2.id);
      expect(recipes[1].id).to.equal(globalMock.recipe1.id);      
    });

  });

  describe('/recipes POST endpoint', () => {
    it('Should return the newly created recipe', (done) => {
      const recipeStub = globalMock.recipeStub();
      chai.request(application)
        .post('/api/v1/recipes')
        .set('x-access-token', globalMock.user1.authToken)
        .send(recipeStub)
        .end((error, response) => {
          expect(response).to.have.status(201);

          const { recipe } = response.body.data;

          expect(recipe.title).to.equal(recipeStub.title);
          expect(recipe.description).to.equal(recipeStub.description);
          expect(recipe.timeToCook).to.equal(recipeStub.timeToCook);
          expect(JSON.parse(recipe.ingredients)[0]).to.equal(JSON.parse(recipeStub.ingredients)[0]);
          expect(JSON.parse(recipe.procedure)[0]).to.equal(JSON.parse(recipeStub.procedure)[0]);

          done();
        });
    });

    it('Should return the correct validation errors if there are any', (done) => {
      chai.request(application)
        .post('/api/v1/recipes')
        .set('x-access-token', globalMock.user1.authToken)
        .send({
          imageUrl: 'SOME_INVALID_IMAGE_URL',
          ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces","1 sized Cucumber","1/2 medium sized Cabbage","1 tin sweet corn","1 big tin Heinz baked beans","1 tbsp mayonaise","1 tin green peas","2 cksp Salad cream","2 boiled eggs"]),
          procedure: JSON.stringify(["Wash all the vegetables with enough water and salt.","Slice nicely cabbage, lettuce and dice the cucumber and carrot and set aside.","Dice boiled eggs, sieve water off the sweet corn and green pea and set aside","Arrange all the vegetables in a plate.","Pour salad cream and mayonnaise in a small bowl and add a dash of black pepper if you wish for a nice zing then mix with the salad and serve"])
        })
        .end((error, response) => {
          expect(response).to.have.status(422);
          
          const res = response.body;
          expect(res.data.errors).to.have.members([ 
                'The title is required.',            
                'The description is required.',
                'The time to cook is required.',
                'The image url must be a valid web url.'
          ]);
          done();
        });
    });

    it('Should return unauthenticated if there is no valid access_token', (done) => {
      chai.request(application)
          .post('/api/v1/recipes')
          .send({})
          .end((error, response) => {
            expect(response).to.have.status(401);
            expect(response.body.data.message).to.equal('Unauthenticated.');

            done();
          });
    });

    it('Should reject creating a recipe if there the user already has a recipe with that title', async () => {
      try {
        const recipeStub = globalMock.recipeStub();

        // create a recipe for a user
        await db.Recipe.create({
          ...recipeStub,
          userId: globalMock.user2.id
        });
        //  make ajax request with same title
        await chai.request(application).post('/api/v1/recipes')
          .set({ 'x-access-token': globalMock.user2.authToken })
          .send(recipeStub);
        
        expect.fail();
      } catch (errors) {
        if (errors.message === 'expect.fail()') { throw errors; }

        expect(errors).to.have.status(409);
        expect(errors.response.body.data.errors[0]).to.equal('You already have a recipe with this title.');
      }
    });
  });

  describe('/recipes/:id PUT endpoint', () => {
    it('Should update the recipe, and return the updated recipe', (done) => {
      chai.request(application)
        .put(`/api/v1/recipes/${globalMock.recipe1.id}`)
        .set('x-access-token', globalMock.user1.authToken)
        .send({
          title: 'Vegetable Salad Updated title',
          description: 'this stuff is not nice, really. am just building my api - updated.',
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          const { recipe } = response.body.data;

          expect(recipe.id).to.equal(globalMock.recipe1.id);
          expect(recipe.title).to.equal('Vegetable Salad Updated title');
          expect(recipe.description).to.equal('this stuff is not nice, really. am just building my api - updated.');
          expect(recipe.timeToCook).to.equal(globalMock.recipe1.timeToCook);
          expect(JSON.parse(recipe.ingredients)[0]).to.equal(JSON.parse(globalMock.recipe1.ingredients)[0]);
          done();
        });
    });
    it('Should return correct validation errors if there are any', (done) => {
      chai.request(application)
        .put(`/api/v1/recipes/${globalMock.recipe1.id}`)
        .set('x-access-token', globalMock.user1.authToken)
        .send({
          description: 'this',
          ingredients: JSON.stringify([]),
          procedure: ['mix', 'fry', 'eat']
        })
        .end((error, response) => {
          expect(response).to.have.status(422);
          const resp = response.body;
          
          expect(resp.data.errors).to.have.members([ 
            'The description must be longer than 5 characters.',
            'There must be at least one ingredient.',
            'The procedure must be a json of procedural steps.'
          ]);
          done();
        });
    });
    it('Should return correct validation errors if there are any', (done) => {
      chai.request(application)
        .put(`/api/v1/recipes/${globalMock.recipe1.id}`)
        .set('x-access-token', globalMock.user1.authToken)
        .send({
          imageUrl: 'SOME_INVALID_IMAGE_URL',
          ingredients: ['eggs', 'milk'],
          procedure: JSON.stringify([])
        })
        .end((error, response) => {
          expect(response).to.have.status(422);
          const resp = response.body;
          
          expect(resp.data.errors).to.have.members([ 
            'The image url must be a valid web url.',
            'There must be at least one procedure step.',
            'The ingredients must be a json list of ingredients.'
          ]);
          done();
        });
    });
    it('Should return correct validation errors if there are any', (done) => {
      chai.request(application)
        .put(`/api/v1/recipes/${globalMock.recipe1.id}`)
        .set('x-access-token', globalMock.user1.authToken)
        .send({
          title: 'ERR',
          timeToCook: 'SOME_INVALID_TIME_TO_COOK',
          ingredients: JSON.stringify('SOME INVALID JSON INGREDIENTS'),
          procedure: JSON.stringify('SOME INVALID JSON PROCEDURE')
        })
        .end((error, response) => {
          expect(response).to.have.status(422);
          const resp = response.body;
          
          expect(resp.data.errors).to.have.members([ 
            'There must be a list of ingredients.',
            'There must be a list of procedure steps.',
            'The title must be longer than 5 characters.',
            'The time to cook must be a number in minutes.'
          ]);
          done();
        });
    });
    it('Should return a 404 if the recipe is not found', (done) => {
      const invalidRecipeId = '630de7cc-e5cb-413e-a3b9-809c98b6c08q';
      chai.request(application)
        .put(`/api/v1/recipes/${invalidRecipeId}`)
        .set('x-access-token', globalMock.user1.authToken)
        .send({})
        .end((error, response) => {
          expect(response).to.have.status(404);
          
          expect(response.body.data.message).to.equal('Recipe not found.');
          done();
        });
    });
    it('Should only update the recipe if the creator is the authenticated user trying to update it', (done) => {
      chai.request(application)
      .put(`/api/v1/recipes/${globalMock.recipe1.id}`)
      .set('x-access-token', globalMock.user2.authToken)
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(401);
        const resp = response.body;

        expect(response.body.data.message).to.equal('Unauthorized.');
        done();
      });
    });
  });

  describe('/recipes/:id DELETE endpoint', () => {
    it('Should delete the recipe with specified id', (done) => {
      chai.request(application)
        .delete(`/api/v1/recipes/${globalMock.recipe1.id}`)
        .set('x-access-token', globalMock.user1.authToken)        
        .end((error, response) => {
          expect(response).to.have.status(200);

          expect(response.body.data.message).to.equal('Recipe deleted.');
          done();
        });
    });

    it('Should only delete recipe if the creator is the authenticated user trying to delete it.', (done) => {
      chai.request(application)
      .delete(`/api/v1/recipes/${globalMock.recipe1.id}`)
      .set('x-access-token', globalMock.user2.authToken)        
      .end((error, response) => {
        expect(response).to.have.status(401);

        expect(response.body.data.message).to.equal('Unauthorized.');
        done();
      });
    });

    it('Should return a 404 if the recipe is not found', (done) => {
      const invalidRecipeId = '130de7cc-e5cb-413e-a3b9-809c98b6c08q';
      chai.request(application)
        .delete(`/api/v1/recipes/${invalidRecipeId}`)
        .set('x-access-token', globalMock.user1.authToken)    
        .end((error, response) => {
          expect(response).to.have.status(404);
          
          expect(response.body.data.message).to.equal('Recipe not found.');
          done();
        });
    });
  });

  describe('/recipes/:id/views POST endpoint', () => {
    it('can add the views of a specific recipe', async () => {
      const response = await chai.request(application).post(`/api/v1/recipes/${globalMock.recipe1.id}/views`)
        .set({ 'x-access-token': globalMock.user2.authToken });
      
      expect(response).to.have.status(200);
      const { viewers } = response.body.data;

      expect(viewers.length).to.equal(1);
      expect(viewers).to.include(globalMock.user2.id);
    });
    it('can permit only authenticated views', async () => {
      try {
        await chai.request(application).post(`/api/v1/recipes/${globalMock.recipe1.id}/views`); 
        expect.fail();     
      } catch (errors){
        if (errors.name === 'expect.fail()') { throw errors };
        expect(errors).to.have.status(401);
       }
    });
    it('cannot allow creator of recipe to view', async () => {
      try {
        await chai.request(application).post(`/api/v1/recipes/${globalMock.recipe1.id}/views`)
            .set({ 'x-access-token': globalMock.user1.authToken }); 
        expect.fail();     
      } catch (error){
        if (error.message === 'expect.fail()') { throw error; };

        expect(error).to.have.status(401);
       }
    });
  });
});
