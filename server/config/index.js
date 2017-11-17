let jwtSecret;
if (process.env.NODE_ENV === 'test') {
  jwtSecret = 'secret';
} else {
  jwtSecret = process.env.JWT_SECRET;
}
/**
 * Application wide configurations
 */
export default {
  JWT_SECRET: jwtSecret
};
