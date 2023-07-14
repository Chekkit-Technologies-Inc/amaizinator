import { LOGIN, UPDATE_USER, LOGOUT } from '../type';
import { UserService } from '../../services';
import { notify, loading } from './response';

export const login = (data) => async dispatch => {

  dispatch(loading({ loading: true }));

  try {
    const res = await UserService.login(data);

    dispatch(notify({ title: "", message: 'Welcome!', type: 'success', loading: false }));

    dispatch({
      type: LOGIN,
      payload: {token: res?.data?.data.token, ...res?.data?.data?.user}
    });

    return Promise.resolve(res?.data?.data);
  } catch (err) {
    dispatch(notify({ title: "", message: err.response?.data?.message || err.message, type: 'error', loading: false }));
    return Promise.reject(err);
  }
};

export const register = data => async dispatch => {

  dispatch(loading({ loading: true }));

  try {
    const res = await UserService.register(data);

    dispatch(notify({ title: "", message: 'Awesome!', type: 'success', loading: false }));

    return Promise.resolve(res?.data?.data);
  } catch (err) {
    dispatch(notify({ title: "", message: err.response?.data?.message || err.message, type: 'error', loading: false }));
    return Promise.reject(err);
  }
};

export const updateUser = data => async dispatch => {
  dispatch({
    type: UPDATE_USER,
    payload: data,
  });
};

export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT,
  });
  return Promise.resolve();
};

const UserActions = {
  login,
  register,
  updateUser,
  logout,
};

export default UserActions;
