import faker from 'faker';

const recipeStub = () => ({
  id: faker.random.uuid(),
  title: faker.lorem.sentence(),
  userId: faker.random.uuid(),
  description: faker.lorem.paragraph(),
  imageUrl: faker.image.imageUrl(),
  timeToCook: faker.random.number(),
  ingredients: JSON.stringify([faker.lorem.sentence(), faker.lorem.sentence()]),
  procedure: JSON.stringify([faker.lorem.sentence(), faker.lorem.sentence()]),
  User: {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    about: faker.lorem.paragraph()
  },
  upvotersIds: [faker.random.uuid(), faker.random.uuid()],
  favoritersIds: [faker.random.uuid()],
  downvotersIds: [faker.random.uuid()]
});

export default recipeStub;
