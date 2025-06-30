// axios.ts
import Axios from 'axios';

import { handleAxiosErrorInterceptor } from 'src/utils/error-handler';

const axios = Axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

axios.interceptors.response.use(
  res => res,
  error => {
    handleAxiosErrorInterceptor(error);
    return Promise.reject(error);
  }
);

export { axios };
