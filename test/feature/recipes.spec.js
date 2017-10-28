/* eslint-disable */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import application from './../../server/app.js';

chai.use(chaiHttp);

describe('/recipes', () => {
  describe('/recipes GET endpoint', () => {
    it('Should return a list of recipes when called', (done) => {
      chai.request(application)
        .get('/api/v1/recipes')
        .end((error, response) => {
          expect(response).to.have.status(200);
          const res = response.body;
          
          expect(res.data.recipes).to.not.be.undefined;
          expect(Array.isArray(res.data.recipes)).to.be.true;
          expect(res.data.recipes[0].id).to.not.be.undefined;
          expect(res.data.recipes[0].title).to.not.be.undefined;
          expect(res.data.recipes[0].description).to.not.be.undefined;
          expect(res.data.recipes[0].image_url).to.not.be.undefined;
          expect(res.data.recipes[0].time_to_cook).to.not.be.undefined;
          expect(res.data.recipes[0].procedure).to.not.be.undefined;
          expect(res.data.recipes[0].ingredients).to.not.be.undefined;
          expect(res.data.recipes[0].favorites).to.not.be.undefined;
          expect(res.data.recipes[0].downvotes).to.not.be.undefined;
          expect(res.data.recipes[0].upvotes).to.not.be.undefined;
          done();
        });
    });
    it('Should return a sorted list of recipes when called with sort and order queries', (done) => {
      chai.request(application)
        .get('/api/v1/recipes?sort=upvotes&order=desc')
        .end((error, response) => {
          expect(response).to.have.status(200);
          const res = response.body;
          
          expect(res.data.recipes).to.not.be.undefined;
          expect(Array.isArray(res.data.recipes)).to.be.true;
          done();
        });
    });
    it('Should return a sorted list of recipes when called with sort query', (done) => {
      chai.request(application)
        .get('/api/v1/recipes?sort=upvotes')
        .end((error, response) => {
          expect(response).to.have.status(200);
          const res = response.body;
          
          expect(res.data.recipes).to.not.be.undefined;
          expect(Array.isArray(res.data.recipes)).to.be.true;
          done();
        });
    });
  });

  describe('/recipes POST endpoint', () => {
    it('Should return the newly created recipe', (done) => {
      chai.request(application)
        .post('/api/v1/recipes')
        .send({
          title: 'Vegetable Salad',
          description: 'this stuff is not nice, really. am just building my api.',
          image_url: 'https://i.imgur.com/av7fjeA.jpg',
          time_to_cook: 205,
          ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces","1 sized Cucumber","1/2 medium sized Cabbage","1 tin sweet corn","1 big tin Heinz baked beans","1 tbsp mayonaise","1 tin green peas","2 cksp Salad cream","2 boiled eggs"]),
          procedure: JSON.stringify(["Wash all the vegetables with enough water and salt.","Slice nicely cabbage, lettuce and dice the cucumber and carrot and set aside.","Dice boiled eggs, sieve water off the sweet corn and green pea and set aside","Arrange all the vegetables in a plate.","Pour salad cream and mayonnaise in a small bowl and add a dash of black pepper if you wish for a nice zing then mix with the salad and serve"])
        })
        .end((error, response) => {
          expect(response).to.have.status(201);
          
          const res = response.body;

          expect(res.data.title).to.equal('Vegetable Salad');
          expect(res.data.description).to.equal('this stuff is not nice, really. am just building my api.');
          expect(res.data.time_to_cook).to.equal(205);
          expect(res.data.ingredients[0]).to.equal('2 pieces Carrots');
          expect(res.data.procedure[0]).to.equal('Wash all the vegetables with enough water and salt.');
          expect(res.data.upvotes).to.equal(0);
          expect(res.data.downvotes).to.equal(0);
          expect(res.data.favorites).to.equal(0);

          done();
        });
    });

    it('Should return the correct validation errors if there are any', (done) => {
      chai.request(application)
        .post('/api/v1/recipes')
        .send({
          ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces","1 sized Cucumber","1/2 medium sized Cabbage","1 tin sweet corn","1 big tin Heinz baked beans","1 tbsp mayonaise","1 tin green peas","2 cksp Salad cream","2 boiled eggs"]),
          procedure: JSON.stringify(["Wash all the vegetables with enough water and salt.","Slice nicely cabbage, lettuce and dice the cucumber and carrot and set aside.","Dice boiled eggs, sieve water off the sweet corn and green pea and set aside","Arrange all the vegetables in a plate.","Pour salad cream and mayonnaise in a small bowl and add a dash of black pepper if you wish for a nice zing then mix with the salad and serve"])
        })
        .end((error, response) => {
          expect(response).to.have.status(422);
          
          const res = response.body;
          expect(res.data.errors).to.have.members([ 
                'The title is required.',
                'The description is required.',
                'The time to cook is required.' 
          ]);
          done();
        });
    });
  });

  describe('/recipes/:id PUT endpoint', () => {
    it('Should update the recipe, and return the updated recipe', (done) => {
      chai.request(application)
        .put(`/api/v1/recipes/12121`)
        .send({
          title: 'Vegetable Salad Updated title',
          description: 'this stuff is not nice, really. am just building my api - updated.',
          image_url: 'https://i.imgur.com/av7fjeA.jpg',
          time_to_cook: 205,
          ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces","1 sized Cucumber","1/2 medium sized Cabbage","1 tin sweet corn","1 big tin Heinz baked beans","1 tbsp mayonaise","1 tin green peas","2 cksp Salad cream","2 boiled eggs"]),
          procedure: JSON.stringify(["Wash all the vegetables with enough water and salt.","Slice nicely cabbage, lettuce and dice the cucumber and carrot and set aside.","Dice boiled eggs, sieve water off the sweet corn and green pea and set aside","Arrange all the vegetables in a plate.","Pour salad cream and mayonnaise in a small bowl and add a dash of black pepper if you wish for a nice zing then mix with the salad and serve"])
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          const resp = response.body;

          expect(resp.data.id).to.equal(12121);
          expect(resp.data.title).to.equal('Vegetable Salad Updated title');
          expect(resp.data.description).to.equal('this stuff is not nice, really. am just building my api - updated.');

          done();
        });
    });
    it('Should return correct validation errors if there are any', (done) => {
      chai.request(application)
        .put(`/api/v1/recipes/12121`)
        .send({
          description: 'this stuff is not nice, really. am just building my api - updated.',
          ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces","1 sized Cucumber","1/2 medium sized Cabbage","1 tin sweet corn","1 big tin Heinz baked beans","1 tbsp mayonaise","1 tin green peas","2 cksp Salad cream","2 boiled eggs"]),
          procedure: JSON.stringify(["Wash all the vegetables with enough water and salt.","Slice nicely cabbage, lettuce and dice the cucumber and carrot and set aside.","Dice boiled eggs, sieve water off the sweet corn and green pea and set aside","Arrange all the vegetables in a plate.","Pour salad cream and mayonnaise in a small bowl and add a dash of black pepper if you wish for a nice zing then mix with the salad and serve"])
        })
        .end((error, response) => {
          expect(response).to.have.status(422);
          const resp = response.body;
          
          expect(resp.data.errors).to.have.members([ 'The title is required.', 'The time to cook is required.' ]);
          done();
        });
    });
    it('Should return a 404 if the recipe is not found', (done) => {
      chai.request(application)
        .put(`/api/v1/recipes/12122323341`)
        .send({
          title: 'Vegetable Salad Updated title',
          description: 'this stuff is not nice, really. am just building my api - updated.',
          image_url: 'https://i.imgur.com/av7fjeA.jpg',
          time_to_cook: 205,
          ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces","1 sized Cucumber","1/2 medium sized Cabbage","1 tin sweet corn","1 big tin Heinz baked beans","1 tbsp mayonaise","1 tin green peas","2 cksp Salad cream","2 boiled eggs"]),
          procedure: JSON.stringify(["Wash all the vegetables with enough water and salt.","Slice nicely cabbage, lettuce and dice the cucumber and carrot and set aside.","Dice boiled eggs, sieve water off the sweet corn and green pea and set aside","Arrange all the vegetables in a plate.","Pour salad cream and mayonnaise in a small bowl and add a dash of black pepper if you wish for a nice zing then mix with the salad and serve"])
        })
        .end((error, response) => {
          expect(response).to.have.status(404);
          
          expect(response.body.data).to.equal('The record could not be found in the database.');
          done();
        });
    });
  });

  describe('/recipes/:id DELETE endpoint', () => {
    it('Should delete the recipe with specified id', (done) => {
      chai.request(application)
        .delete('/api/v1/recipes/7856565')
        .end((error, response) => {
          expect(response).to.have.status(200);

          expect(response.body.data.message).to.equal('Recipe deleted.');
          done();
        });
    });

    it('Should return a 404 if the recipe is not found', (done) => {
      chai.request(application)
        .delete('/api/v1/recipes/7856565232323')
        .end((error, response) => {
          expect(response).to.have.status(404);

          expect(response.body.data).to.equal('Recipe was not found in the database.');
          done();
        });
    });
  });

  describe('/recipes/:id/upvote POST endpoint', () => {
    it('Should increase upvotes for a recipe', (done) => {
      chai.request(application)
        .post('/api/v1/recipes')
        .send({
          title: 'Vegetable Salad',
          description: 'this stuff is not nice, really. am just building my api.',
          image_url: 'https://i.imgur.com/av7fjeA.jpg',
          time_to_cook: 205,
          ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces","1 sized Cucumber","1/2 medium sized Cabbage","1 tin sweet corn","1 big tin Heinz baked beans","1 tbsp mayonaise","1 tin green peas","2 cksp Salad cream","2 boiled eggs"]),
          procedure: JSON.stringify(["Wash all the vegetables with enough water and salt.","Slice nicely cabbage, lettuce and dice the cucumber and carrot and set aside.","Dice boiled eggs, sieve water off the sweet corn and green pea and set aside","Arrange all the vegetables in a plate.","Pour salad cream and mayonnaise in a small bowl and add a dash of black pepper if you wish for a nice zing then mix with the salad and serve"])
        })
        .end((error, response) => {
          expect(response).to.have.status(201);
            chai.request(application)
              .post(`/api/v1/recipes/${response.body.data.id}/upvote`)
              .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body.data.upvotes).to.equal(1);
                done();
              });
        });
    });
    it('Should return a 404 if the recipe is not found', (done) => {
      chai.request(application)
        .post('/api/v1/recipes/1324123123/upvote')
        .end((error, response) => {
          expect(response).to.have.status(404);

          expect(response.body.data).to.equal('The recipe was not found in the database.');
          done();
        });
    });
  });

  describe('/recipes/:id/downvote POST endpoint', () => {
    it('Should increase downvotes for a recipe', (done) => {
      chai.request(application)
        .post('/api/v1/recipes')
        .send({
          title: 'Vegetable Salad',
          description: 'this stuff is not nice, really. am just building my api.',
          image_url: 'https://i.imgur.com/av7fjeA.jpg',
          time_to_cook: 205,
          ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces","1 sized Cucumber","1/2 medium sized Cabbage","1 tin sweet corn","1 big tin Heinz baked beans","1 tbsp mayonaise","1 tin green peas","2 cksp Salad cream","2 boiled eggs"]),
          procedure: JSON.stringify(["Wash all the vegetables with enough water and salt.","Slice nicely cabbage, lettuce and dice the cucumber and carrot and set aside.","Dice boiled eggs, sieve water off the sweet corn and green pea and set aside","Arrange all the vegetables in a plate.","Pour salad cream and mayonnaise in a small bowl and add a dash of black pepper if you wish for a nice zing then mix with the salad and serve"])
        })
        .end((error, response) => {
          expect(response).to.have.status(201);
            chai.request(application)
              .post(`/api/v1/recipes/${response.body.data.id}/downvote`)
              .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body.data.downvotes).to.equal(1);
                
                done();
              });
        });
    });

    it('Should return a 404 if the recipe is not found', (done) => {
      chai.request(application)
        .post('/api/v1/recipes/1324123123/downvote')
        .end((error, response) => {
          expect(response).to.have.status(404);

          expect(response.body.data).to.equal('The recipe was not found in the database.');
          done();
        });
    });
  });
});
