/* eslint-disable */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import config from '../../config';
import application from '../../index';
import db from '../../database/models/index';

chai.use(chaiHttp);
const globalMock = {};

describe('The /user/settings', () => {
  beforeEach(async () => {
    await db.User.destroy({ where: {}, truncate: true });
  });
  it('Should set default user settings when user registers', async () => {
    const response = await chai.request(application).post('/api/v1/users/signup').send({
      name: 'new user',
      email: 'new@gmail.com',
      password: 'password'
    });

    const newUser = response.body.data.user;

    const userSettings = JSON.parse(newUser.settings);

    expect(userSettings.reviewEmails).to.equal(1);
    expect(userSettings.favoriteModifiedEmail).to.equal(1);   
  });
  it('Should update user settings with an authenticated post request', async () => {
    const response = await chai.request(application).post('/api/v1/users/signup').send({
      name: 'new user',
      email: 'new@gmail.com',
      password: 'password'
    });

    const responseFromUpdateSettings = await chai.request(application).post('/api/v1/users/settings').set({
      'x-access-token': response.body.data.access_token
    }).send({
      reviewEmails: 0,
      favoriteModifiedEmail: 0,
      aRandomNotAcceptedSetting: 1
    });

    const newUserSettings = responseFromUpdateSettings.body.data.settings;

    expect(newUserSettings.reviewEmails).to.equal(0);
    expect(newUserSettings.favoriteModifiedEmail).to.equal(0);
    expect(newUserSettings.aRandomNotAcceptedSetting).to.be.undefined;
  });
});