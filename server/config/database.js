/**
 * The different database configurations for different environments.
 */
const config = {
  development: {
    username: 'postgres',
    password: null,
    database: 'more-recipes',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'dtxgpqzl',
    password: '05bMGgYSpS3E_JQv47i8CDnwzLrCgdYQ',
    database: 'dtxgpqzl',
    host: 'stampy.db.elephantsql.com',
    dialect: 'postgres',
    logging: false
  }
};

module.exports = config;
