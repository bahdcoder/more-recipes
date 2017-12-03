require('dotenv').config();

let jwtSecret = process.env.JWT_SECRET;

if (process.env.NODE_ENV === 'test') {
  jwtSecret = 'secret';
}

/**
 * Application wide configurations
 */
export default {
  JWT_SECRET: jwtSecret,
  MAILER: {
    SERVICE: process.env.MAILER_SERVICE,
    USER: process.env.MAILER_USER,
    PASS: process.env.MAILER_PASS
  }
};
