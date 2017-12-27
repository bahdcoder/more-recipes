/* eslint-disable */
import kue from 'kue';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import config from '../../config';
import application from '../../index';
import db from '../../database/models/index';

chai.use(chaiHttp);
const globalMock = {};

describe('/users', () => {
  beforeEach(async () => {
    await db.User.destroy({ where: {}, truncate: true });
  });
  describe('/signup', () => {
    it('Should register a new user', (done) => {
      chai.request(application)
      .post('/api/v1/users/signup')
      .send({
        name: 'brand new user',
        email: 'brand-new@user.com',
        password: 'secret'
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        const responseData = response.body.data;

        expect(responseData.user.id).to.not.be.undefined;
        expect(responseData.access_token).to.not.be.undefined;
        done();
      });
    });
    it('Should return correct validator errors if there are any', (done) => {
      chai.request(application)
      .post('/api/v1/users/signup')
      .send({
        email: 'brand-new@user.com',
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        const responseData = response.body.data;

        expect(responseData.errors).to.have.members([
          'The name is required.',
          'The password is required.'
        ]);
        done();
      });
    });
    context('User registration email sending', () => {
      beforeEach(() => {
        // fake the job create function, and replace it with sinon
        const queue = kue.createQueue();    
        globalMock.jobStub = sinon.spy(queue, 'create');
      });
      afterEach(() => {
        globalMock.jobStub.restore();
      });
      it.skip('Should dispatch a queue job to send email after registration', async () => {
        // when this function is called during tests, just assert that the data in it is the expected
        const response = chai.request(application).post('/api/v1/users/signup')
          .send({
            name: 'brand new user',
            email: 'brand-new@user.com',
            password: 'secret'
          });
        
        expect(globalMock.jobStub.called).to.be.true;
      });
    });
  });
  
  describe('/signin', () => {
    beforeEach(async () => {
  
      globalMock.user1 = await db.User.create({
        name: 'kati frantz',
        email: 'kati@frantz.com',
        password: await bcrypt.hash('secret', 1)
      });
  
    });
    it('Should return auth token for valid user credentials', (done) => {
      chai.request(application)
        .post('/api/v1/users/signin')
        .send({
          email: 'kati@frantz.com',
          password: 'secret'
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          const responseData = response.body.data;

          expect(responseData.user.id).to.equal(globalMock.user1.id);
          expect(responseData.access_token).to.not.be.undefined;
          done();
        });
    });
    it('Should return `These credentials do not match our records.` if the user with email is not found.', (done) => {
      chai.request(application)
      .post('/api/v1/users/signin')
      .send({
        email: 'fakeAndInexistent@user.com',
        password: 'secret'
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        const responseData = response.body.data;

        expect(responseData.errors).to.equal('These credentials do not match our records.');
        done();
      });
    });
    it('Should return `These credentials do not match our records.` if the user password is not correct', (done) => {
      chai.request(application)
      .post('/api/v1/users/signin')
      .send({
        email: 'kati@frantz.com',
        password: 'secret-wrong-password'
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        const responseData = response.body.data;

        expect(responseData.errors).to.equal('These credentials do not match our records.');
        done();
      });
    });
    it('Should return `The password is required.` and `The email is required.` if the user password and email were not provided', (done) => {
      chai.request(application)
      .post('/api/v1/users/signin')
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(422);
        const responseData = response.body.data;

        expect(responseData.errors).to.include('The email is required.');
        expect(responseData.errors).to.include('The password is required.');
        done();
      });
    });
    it('Should return `The email must be a valid email address.` if the user email is not valid', (done) => {
      chai.request(application)
      .post('/api/v1/users/signin')
      .send({
        email: 'SOME_INVALID_EMAIL',
        password: 'SOME_PASSWORD'
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        const responseData = response.body.data;

        expect(responseData.errors).to.include('The email must be a valid email address.');
        done();
      });
    });
  });

});
