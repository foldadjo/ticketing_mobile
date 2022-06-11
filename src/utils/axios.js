import axios from 'axios';
import Cookies from 'js-cookie';

const axiosApiIntances = axios.create({
  baseURL: 'https://tiketjauhar.herokuapp.com',
  // baseURL: process.env.REACT_APP_SOURCE,
});

// Add a request interceptor
axiosApiIntances.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers = {
      Authorization: `Bearer ${Cookies.get('token')}`,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosApiIntances.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 403) {
      if (error.response.data.msg !== 'jwt expired') {
        Cookies.remove('id');
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        window.location.href = 'login';
      } else {
        const refreshToken = Cookies.get('refreshToken');
        axiosApiIntances
          .post('auth/refresh', {refreshToken})
          .then(res => {
            Cookies.set('token', res.data.data.token);
            Cookies.set('refreshToken', res.data.data.refreshToken);
            window.location.reload();
          })
          .catch(() => {
            Cookies.remove('id');
            Cookies.remove('token');
            Cookies.remove('refreshToken');
            window.location.href = '/login';
          });
      }
    }
    return Promise.reject(error);
  },
);

export default axiosApiIntances;
