
const axios = require("axios");

export const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

instance.interceptors.request.use(
  function(config) {

    return config;
  },
  function(error) {

    return Promise.reject(error);
});

instance.interceptors.response.use(
  function (response) {
    return response;
},
  function(error) {
    const errors = Object.values(error.response.data);

    console.log(errors)

    return Promise.reject(error);
  }
);

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
