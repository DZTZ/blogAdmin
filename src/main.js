import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Checkbox, Dropdown, Icon, Rate } from "ant-design-vue";
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Dropdown);
Vue.use(Icon);
Vue.use(Rate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
