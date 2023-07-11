import { AUTHENTICATE, UPDATE_USER, SIGNOUT } from '../type';

const initialState = {code: 'NG'};

const userReducer = (user = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATE:
      return { ...payload };
    case UPDATE_USER:
      return { ...user, ...payload };
    case SIGNOUT:
      localStorage.removeItem('slug');
      return initialState;
    default:
      return user;
  }
};

export default userReducer;
