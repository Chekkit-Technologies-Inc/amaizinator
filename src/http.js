import axios from 'axios';
import store from './states/store';
import { apiUrlAuth, apiUrl } from './config';

const http = () => {
  let token = store.getState().user?.token;

  axios.defaults.headers.common['source'] = 'web';

  if (token) {
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
  }

  return axios.create({
    baseURL: apiUrlAuth,
  });
};

export default http;
