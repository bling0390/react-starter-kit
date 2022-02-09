import axios from 'axios';

import { getAccessToken } from './index';

const request = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
});

request.interceptors.request.use(config => {
  return {
    ...config,
    headers: {
      ...config.headers,
      'X-AUTH-TOKEN': getAccessToken()
    }
  };
});

request.interceptors.response.use(response => response);

export default request;
