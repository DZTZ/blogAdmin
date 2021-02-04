import axios from "axios";
import qs from "qs";
axios.defaults.baseURL = "/api";
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
    // if (error.response) {
    //     errorCodeHandle(error.response.status);
    // }
    return Promise.reject(error);
  }
);
// 上传文件
axios.upFile = axios.create({
  method: "post", // default
  headers: {
    'Content-Type': 'multipart/form-data'
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
