/* eslint-disable */
import faker from 'faker';
import authReducer from './../../store/reducers/authReducer';


describe('the authReducer', () => {
  test('Should return an empty object as initial state', () => {
    const newState = authReducer(undefined, {});

    expect(newState).toEqual({});
  });
  describe('authReducer.SIGN_IN_USER', () => {
    test('Should return auth user data', () => {
      const newState = authReducer(undefined, {
        type: 'SIGN_IN_USER',
        authUser: {
          user: {},
          access_token: ''
        }
      });

      expect(newState.user).toEqual({});
      expect(newState.access_token).toBeDefined();
    });
  });

  describe('authReducer.SIGN_OUT_USER', () => {
    test('should return null when user is signed out', () => {
      const newState = authReducer({ user: {}, access_token: '' }, {
        type: 'SIGN_OUT_USER'
      });

      expect(newState).toBeNull();
    });
  });

  describe('authReducer.AUTH_USER_UPDATED', () => {
    test('should update the user details', () => {
      const newName = faker.name.findName();

      const newState = authReducer({ user: {}, access_token: '' }, {
        type: 'AUTH_USER_UPDATED',
        payload: {
          name: newName
        }
      });

      expect(newState.user.name).toBe(newName);
    });
  });
});