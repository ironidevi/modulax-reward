import configs from "@/configs/config";
import axios from "axios";

const axiosApi = axios.create(configs.axios);

// Add a request interceptor
axiosApi.interceptors.request.use(function (axiosConfig) {
  // const token = getUserToken();
  // if (token) {
  //   axiosConfig.headers.Authorization = `Bearer ${token}`;
  // }
  // axiosConfig.headers["x-api-key"] = configs.secret.apiKey;
  // Do something before request is sent
  return axiosConfig;
});

// Add a response interceptor
axiosApi.interceptors.response.use(
  function (response) {
    // if (response.data.code === 401) {
    //   window.location.href = "/auth";
    // }
    // Do something with response data
    return response;
  },
  function (error) {
    // if (window.location.pathname !== "/auth") {
    //   if (error.response.status === 401) {
    //     window.location.href = "/auth";
    //   }
    // }
    // Do something with response error
    return Promise.reject(error);
  }
);

export { axiosApi };
