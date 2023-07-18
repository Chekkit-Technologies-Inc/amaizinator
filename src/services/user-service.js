import httpNormal, {httpAuth as http} from '../http';

export const register = async data => {
  return http().post('/create-amazinator', data);
};

export const login = async data => {
  return http().post('/app-signin', data);
};

export const updateProfile = async data => {
  return http().put('/app-signin', data);
};

export const changePassword = async data => {
  return httpNormal().post('/users/change-password', data);
};

export const retrieveUserDetials = async () => {
  return httpNormal().get('/amazing-day-campaign/profile');
};


const UserService = {
  register,
  login,
  updateProfile,
  changePassword,
  retrieveUserDetials
};

export default UserService;
