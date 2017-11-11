/* eslint-disable */
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Redis from '../../helpers/redis/fakeRedis';

chai.use(chaiAsPromised);

describe('Redis', () => {
  describe('Constructor', () => {
    it('Should set a new database when newed up', () => {
      const redis = new Redis();

      expect(redis.database).to.deep.equal({});
    });
  });

  describe('set', () => {
    it('Should set a key and value to the database', () => {
      const redis = new Redis();

      redis.set('new-key', 'new-key-value');
      expect(redis.database['new-key']).to.equal('new-key-value');
    });

    it('Should return a promise with message ok if the process was successful', () => {
      const redis = new Redis();

      expect(redis.set('key', 'value').then).to.not.be.undefined;
      expect(redis.set('key', 'value').catch).to.not.be.undefined;
    });
  });

  describe('get', () => {
    it('Should get a key and value from the database', async () => {
      const redis = new Redis();
      
      await redis.set('new-key', 'new-key-value');
      const value = await redis.get('new-key');
      expect(value).to.equal('new-key-value');
    });

    it('Should return a promise with key value if the process was successful', async () => {
      const redis = new Redis();

      await redis.set('new-key', 'new-key-value');
      expect(redis.get('new-key').then).to.not.be.undefined;
      expect(redis.get('new-key').catch).to.not.be.undefined;
    });
  });

  describe('Sadd', () => {
    it('Should add a value to a new SET key in the database', async () => {
      const redis = new Redis();

      const result = await redis.sadd('new-key-value-set', 'new-set-value');
      const result2 = await redis.sadd('new-key-value-set', 'new-set-value-2');

      expect(result).to.equal(1);
      expect(result2).to.equal(1);
    });
  });

  describe('Smembers', () => {
    it('Should return all the values of a set', async () => {
      const redis = new Redis();
      
      await redis.sadd('new-key-value-set', 'new-set-value');
      const result = await redis.smembers('new-key-value-set');

      expect(result).to.have.members(['new-set-value']);
    });

    it('Should return an empty array if the key does not exist in the database', async () => {
      const redis = new Redis();

      const result = await redis.smembers('key-does-not-exist');
      expect(result).to.have.members([]);
    });

    it('Should reject if the value stored in key is not a set', async () => {
      const redis = new Redis();

      await redis.set('new-key', 'new-key-value');
      expect(redis.smembers('new-key')).to.be.rejectedWith(Error);
    });
  });

  describe('Srem', () => {
    it('Should remove an element from the set', async () => {
      const client = new Redis();

      await client.sadd('some-new-key', 'some new value');
      const result = await client.srem('some-new-key', 'some new value');
      expect(result).to.equal(1);
      const members = await client.smembers('some-new-key');
      expect(members).to.have.members([]);
    });
  });
});