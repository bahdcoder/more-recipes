/* eslint-disable */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import config from '../../config';
import application from '../../index';
import db from '../../database/models/index';

chai.use(chaiHttp);
const globalMock = {};

describe('/recipes', () => {
  beforeEach(async () => {

    await db.User.destroy({ where: {}, truncate: true });
    await db.Recipe.destroy({ where: {}, truncate: true });

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

  });

  describe('/recipes GET endpoint', () => {

    it('Should return a list of recipes when called', (done) => {
      chai.request(application)
        .get('/api/v1/recipes')
        .end((error, response) => {
          expect(response).to.have.status(200);
          const res = response.body;
          const { recipes } = res.data.recipes;

          expect(Array.isArray(recipes)).to.be.true;
          expect(recipes[0].id).to.equal(globalMock.recipe1.id);
          expect(recipes[0].title).to.equal(globalMock.recipe1.title);
          expect(recipes[0].User.name).to.equal(globalMock.user1.name);      
          done();
        });
    });

  });

  describe('/recipes POST endpoint', () => {
    it('Should return the newly created recipe', (done) => {
      
      chai.request(application)
        .post('/api/v1/recipes')
        .set('x-access-token', globalMock.user1.authToken)
        .send({
          title: 'Vegetable Salad',
          description: 'this stuff is not nice, really. am just building my api.',
          imageUrl: 'https://i.imgur.com/av7fjeA.jpg',
          timeToCook: 205,
          ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces","1 sized Cucumber","1/2 medium sized Cabbage","1 tin sweet corn"]),
          procedure: JSON.stringify(["Wash all the vegetables with enough water and salt."])
        })
        .end((error, response) => {
          expect(response).to.have.status(201);

          const { recipe } = response.body.data;

          expect(recipe.title).to.equal('Vegetable Salad');
          expect(recipe.description).to.equal('this stuff is not nice, really. am just building my api.');
          expect(recipe.timeToCook).to.equal(205);
          expect(JSON.parse(recipe.ingredients)[0]).to.equal('2 pieces Carrots');
          expect(JSON.parse(recipe.procedure)[0]).to.equal('Wash all the vegetables with enough water and salt.');

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
          const resp = response.body;

          expect(resp.data.id).to.equal(globalMock.recipe1.id);
          expect(resp.data.title).to.equal('Vegetable Salad Updated title');
          expect(resp.data.description).to.equal('this stuff is not nice, really. am just building my api - updated.');
          expect(resp.data.timeToCook).to.equal(globalMock.recipe1.timeToCook);
          expect(JSON.parse(resp.data.ingredients)[0]).to.equal(JSON.parse(globalMock.recipe1.ingredients)[0]);
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
});
