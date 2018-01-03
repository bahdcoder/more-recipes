import { AUTHENTICATION_SUCCESS } from './authActions';

export const authenticationSuccess = payload => ({
  type: AUTHENTICATION_SUCCESS,
  payload
});

export default authenticationSuccess;
