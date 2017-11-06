/**
 * The different database configurations for different environments.
 */
const config = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'more-recipes',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  test: {
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false
  },
  production: {
    username: 'dtxgpqzl',
    password: '05bMGgYSpS3E_JQv47i8CDnwzLrCgdYQ',
    database: 'dtxgpqzl',
    host: 'elmer.db.elephantsql.com',
    dialect: 'postgres',
    logging: false
  }
};

module.exports = config;
