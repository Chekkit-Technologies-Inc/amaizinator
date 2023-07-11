import axios from 'axios';
import store from './states/store';
import { apiUrl } from './config';

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

export default http;
