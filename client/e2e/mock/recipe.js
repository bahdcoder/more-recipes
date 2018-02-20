/* eslint-disable */
const faker = require('faker');
const path = require('path');

module.exports = () => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  timeToCook: faker.random.number(),
  ingredients: [faker.lorem.sentence(), faker.lorem.sentence()],
  procedure: [faker.lorem.sentence(), faker.lorem.sentence()],
  image: path.resolve(__dirname + '1.jpg')
});
