const axios = require("axios");

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.API_BASE_URL || "",
  timeout: 10000, // 请求超时时间
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data;

    if (error.response.status === 500) {
      // message.error("连接失败，请稍后重试！", 6)
    }
    if (error.response.status === 403) {
    }
    if (
      error.response.status === 401 &&
      !(data.result && data.result.isLogin)
    ) {
    }
  } else {
    // message.error("连接失败，请稍后重试！", 30)
  }

  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use((config) => {
  return config;
}, errorHandler);

// response interceptor
service.interceptors.response.use((response) => {
  return response.data;
}, errorHandler);

const getFetch = (httpMethod = "get") => ({ url, data, queryString }) => {
  return service({
    method: httpMethod,
    url,
    data,
    params: queryString,
  });
};

const request = {
  get: getFetch("get"),
  post: getFetch("post"),
};

module.exports = request;
