import { createClient } from 'then-redis';
import FakeRedis from './redis/fakeRedis';
/**
 * Create a new client redis
 * @returns {object} fake-redis client for testing and real redis-client in production
 */
const getRedisClient = () => {
  if (process.env.NODE_ENV === 'production') {
    console.log(process.env.REDIS_URL);
    return createClient(process.env.REDIS_URL);
  } else if (process.env.NODE_ENV === 'development') {
    return createClient();
  }

  return new FakeRedis();
};


export default getRedisClient();
