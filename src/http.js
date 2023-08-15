import axios from 'axios';
import store from './states/store';
import { apiUrlAuth, apiUrl } from './config';

const http = () => {
  let token = store.getState().user?.token;

  axios.defaults.headers.common['source'] = 'web';

  if (token) {
    // axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg4MCwidXNlcm5hbWUiOiI5MDMwMzU1NjY1IiwiaWF0IjoxNjkwNzI5NzIzLCJleHAiOjE2OTE5MzkzMjN9.ue6ZV6uMS3qEW93C65buGjuOzZZM-A1seU-GIZ-U7OU`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: apiUrl,
  });
};

export const httpAuth = () => {
  let token = store.getState().user?.token;

  axios.defaults.headers.common['source'] = 'web';

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg4MCwidXNlcm5hbWUiOiI5MDMwMzU1NjY1IiwiaWF0IjoxNjkwNzI5NzIzLCJleHAiOjE2OTE5MzkzMjN9.ue6ZV6uMS3qEW93C65buGjuOzZZM-A1seU-GIZ-U7OU`;
  }

  return axios.create({
    baseURL: apiUrlAuth,
  });
};

export default http;
