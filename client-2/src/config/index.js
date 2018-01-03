const apiUrl = window.location.host === 'bahdcoder-more-recipes.herokuapp.com' ? 'https://bahdcoder-more-recipes.herokuapp.com/api/v1' : 'http://localhost:5678/api/v1';

const config = {
  apiUrl,
  appKey: 'bbc8ede71c396f'
};

export default config;
