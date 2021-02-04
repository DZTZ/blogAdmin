import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);
// 不需要重定向白名单
let whiteList = ["/login", "/404", "/500", "/403"];

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/article-manage",
    children: [
      {
        path: "/article-manage",
        name: "ArticleManage",
        component: () =>
          import(
            /* webpackChunkName: "ArticleManage" */ "../views/basic-content/article-manage.vue"
          )
      },
      {
        path: "/picture-manage",
        name: "PictureManage",
        component: () =>
          import(
            /* webpackChunkName: "PictureManage" */ "../views/basic-content/picture-manage.vue"
          )
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (token && +token > Date.parse(new Date())) {
    next();
  } else {
    if (whiteList.indexOf(to.path) != -1) {
      next();
    } else {
      Vue.prototype.$message.warning("登录已过期，需要重新登陆！");
      next({ path: "/login" });
    }
  }
});

router.afterEach((to, from) => {
  store.commit("setSelectedKeys", [to.path]);
});

export default router;
