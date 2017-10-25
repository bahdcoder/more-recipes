import Axios from 'axios';
import { expect } from 'chai';

describe('/recipes endpoint group', () => {
  describe('/recipes GET endpoint', () => {
    it('Should return a collection of recipes', async () => {
      const recipes = await Axios.get('http://localhost:4040/api/recipes');
      const response = recipes.data;
      expect(response[0].title).to.equal('Eba and fried stew');
      expect(response[0].time_to_cook).equal(45);
      expect(response[0].description).to.equal('Eba and fried stew description');
      expect(response[0].ingredients).to.have.members([
        'garri', 'sugar', 'stew', 'salt', 'maggi', 'pepper', 'red oil'
      ]);
      expect(response[0].procedure).to.have.members([
        'mix', 'fry it'
      ]);
      expect(response[0].author.name).to.equal('Kati Frantz');
      expect(response[0].upvotes).to.equal(40);
      expect(response[0].downvotes).to.equal(54);
      expect(response[0].favorites).to.equal(2343);
    });
  });
});
