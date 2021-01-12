import Vue from "vue";

import { Button, Checkbox, Icon, Alert, Modal, message } from "ant-design-vue";
message.config({
  maxCount: 1,
  duration: 0
});

Vue.prototype.$message = message;

Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Icon);
Vue.use(Alert);
Vue.use(Modal);
Vue.use(message);
