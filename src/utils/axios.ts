import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();

export const requestInterceptor = (config: AxiosRequestConfig) => config;

// axiosInstance.interceptors.request.use(requestInterceptor as any, (error) => Promise.reject(error));

export const responseIntercepter = async (res) => {
  if (res && res.status === 200) {
    switch (res.data.code) {
      case 200:
        return Promise.resolve(res);
      default:
        return Promise.reject(res);
    }
  }

  return Promise.reject(res);
};

axiosInstance.interceptors.response.use(responseIntercepter, (error) => Promise.reject(error));

export default axiosInstance;
