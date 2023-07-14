import { LOGIN, UPDATE_USER, LOGOUT } from '../type';

const initialState = {};

const userReducer = (user = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return { ...payload };
    case UPDATE_USER:
      return { ...user, ...payload };
    case LOGOUT:
      localStorage.removeItem('user');
      return initialState;
    default:
      return user;
  }
};

export default userReducer;
