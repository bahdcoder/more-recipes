import fakeredis from 'fakeredis';
import { createClient } from 'then-redis';
/**
 * Create a new client redis
 * @returns {object} fake-redis client for testing and real redis-client in production
 */
const getRedisClient = () => {
  if (process.env.NODE_ENV === 'production') {
    return createClient('redis://h:pc47f9fe9063e2c77c2c0b4620873e24b207d1bea3c07e6b25c65ec1f878feb1e@ec2-34-199-160-190.compute-1.amazonaws.com:31909');
  }

  return createClient();
};


export default getRedisClient();
