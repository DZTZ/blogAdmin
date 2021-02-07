import axios from "axios";
import qs from "qs";
import router from '../router/index';
const isProd = process.env.NODE_ENV === "production";

// 返回错误码处理
function errorCodeHandle(codeStatus) {
  switch (codeStatus) {
    case 401:
      router.push({ name: 'Login' });
  }
}

axios.defaults.baseURL = isProd ? "http://www.wjjl.cool:5050/api" : '/api';
// 表单请求
axios.formRequest = axios.create({
  // baseURL: "http://localhost:5050",
  timeout: 4000,
  withCredentials: true,
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
  method: "post", // default
  transformRequest: [
    function (data, headers) {
      // 对 data 进行任意转换处理
      return qs.stringify(data, { arrayFormat: "indices" });
    }
  ]
});
axios.formRequest.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      errorCodeHandle(error.response.status);
    }
    return Promise.reject(error);
  }
);
// 上传文件
axios.upFile = axios.create({
  method: "post", // default
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});
axios.upFile.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // if (error.response) {
    //   errorCodeHandle(error.response.status);
    // }
    return Promise.reject(error);
  }
);

export default axios;
