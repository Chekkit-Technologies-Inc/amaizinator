import { REQUEST_OTP, AUTHENTICATE, UPDATE_USER, SIGNOUT } from '../type';
import { UserService } from '../../services';
import { notify, loading } from './response';

export const requestOtp = (campaignSlug, phoneNumber, countryCode) => async dispatch => {
  if (!campaignSlug && !phoneNumber && !countryCode) return;

  dispatch(loading({ loading: true }));

  try {
    const res = await UserService.requestOtp(campaignSlug, phoneNumber, countryCode);

    dispatch(notify({ loading: false }));

    dispatch({
      type: REQUEST_OTP,
    });
    if (res?.data?.data?.user) {
      dispatch(UserActions.updateUser(res?.data?.data?.user));
    }
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(notify({ title: "", message: err.response?.data?.message || err.message, type: 'default', loading: false }));
    return Promise.reject(err);
  }
};

export const authenticate = data => async dispatch => {
  if (!data) return;

  dispatch(loading({ loading: true }));

  try {
    const res = await UserService.authenticate(data);

    dispatch(notify({ loading: false }));

    dispatch({
      type: AUTHENTICATE,
      payload: res.data.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(notify({ title: "", message: err.response?.data?.message || err.message, type: 'default', loading: false }));
    return Promise.reject(err);
  }
};

export const updateUser = data => async dispatch => {
  dispatch({
    type: UPDATE_USER,
    payload: data,
  });
};

export const signOut = () => async dispatch => {
  dispatch({
    type: SIGNOUT,
  });
};

const UserActions = {
  requestOtp,
  authenticate,
  updateUser,
  signOut,
};

export default UserActions;
