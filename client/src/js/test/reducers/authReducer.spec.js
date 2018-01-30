/* eslint-disable */
import faker from 'faker';
import { expect } from 'chai';
import authReducer from './../../store/reducers/authReducer';


describe('the authReducer', () => {
  it('Should return an empty object as initial state', () => {
    const newState = authReducer(undefined, {});

    expect(newState).to.deep.equal({});
  });
  context('authReducer.SIGN_IN_USER', () => {
    it('Should return auth user data', () => {
      const newState = authReducer(undefined, {
        type: 'SIGN_IN_USER',
        authUser: {
          user: {},
          access_token: ''
        }
      });

      expect(newState.user).to.deep.equal({});
      expect(newState.access_token).to.not.be.undefined;
    });
  });

  context('authReducer.SIGN_OUT_USER', () => {
    it('should return null when user is signed out', () => {
      const newState = authReducer({ user: {}, access_token: '' }, {
        type: 'SIGN_OUT_USER'
      });

      expect(newState).to.be.null;
    });
  });

  context('authReducer.AUTH_USER_UPDATED', () => {
    it('should update the user details', () => {
      const newName = faker.name.findName();

      const newState = authReducer({ user: {}, access_token: '' }, {
        type: 'AUTH_USER_UPDATED',
        payload: {
          name: newName
        }
      });

      expect(newState.user.name).to.equal(newName);
    });
  });
});