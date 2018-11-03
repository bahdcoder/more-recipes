console.log('PROCESS ENV ----->', process.env)


/**
 * The different database configurations for different environments.
 */
const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  },
  test: {
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
};

module.exports = config;
