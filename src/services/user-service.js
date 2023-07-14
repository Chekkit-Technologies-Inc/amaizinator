import {httpAuth as http} from '../http';

export const register = async data => {
  return http().post('/create-amazinator', data);
};

export const login = async data => {
  return http().post('/app-signin', data);
};


const UserService = {
  register,
  login,
};

export default UserService;
