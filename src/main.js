import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./request/axios";

// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
// Vue.use(Antd);
// import "./antd/antd";
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$formRequest = axios.formRequest.post;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
