import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

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

router.afterEach((to, from) => {
  store.commit("setSelectedKeys", [to.path]);
});

export default router;
