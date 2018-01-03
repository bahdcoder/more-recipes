import store from '../../store';
import { getStorageItems } from '../localStorage';
import { authenticationSuccess } from '../../store/actions/auth/index';

export const checkAuth = () => {
  const { accessToken, authUser } = getStorageItems(['accessToken', 'authUser']);

  if (accessToken && authUser) {
    store.dispatch(authenticationSuccess({
      access_token: accessToken,
      user: authUser
    }));
  }
};

export default checkAuth;
