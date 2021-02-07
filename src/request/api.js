import axios from "@/request/axios";
const api = {
  login: "/login",
  addArticle: '/addArticle',
  uploadFile: '/uploadFile',
  articleList: '/articleList',
  delectArticle: '/delectArticle',
  editArticle: '/editArticle',
  dataBackup: '/dataBackup',
};

/**
 *  登录
 */
export function login(parameters) {
  return axios.formRequest.post(api.login, parameters);
}
/**
 *  添加文章
 */
export function addArticle(parameters) {
  return axios.formRequest.post(api.addArticle, parameters);
}
/**
 *  文章列表
 */
export function articleList(parameters) {
  return axios.formRequest.post(api.articleList, parameters);
}
/**
 *  删除文章
 */
export function delectArticle(parameters) {
  return axios.formRequest.post(api.delectArticle, parameters);
}
/**
 *  编辑文章
 */
export function editArticle(parameters) {
  return axios.formRequest.post(api.editArticle, parameters);
}


/**
 *  备份数据
 */
export function dataBackup(parameters) {
  return axios.formRequest.post(api.dataBackup, parameters);
}
/**
 *  图片上传
 */
export function uploadFile(formData) {
  return axios.upFile({
    url: api.uploadFile,
    data: formData
  });
}
