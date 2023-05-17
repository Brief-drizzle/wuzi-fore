import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout";

Vue.use(Router);

export const constantRoutes = [
  //登录路由
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
    hidden: true,
  },
  //注册
  {
    path: "/register",
    component: (resolve) => require(["@/views/register"], resolve),
    hidden: true,
  },
  {
    path: "",
    component: Layout,
    redirect: "index",
    hidden: false,
    children: [
      {
        path: "/index",
        component: () => import("../views/index.vue"),
        // component: () => import("../views/result/checkResBase/index.vue"),
        name: "首页",
        meta: { title: "首页", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/404",
    component: (resolve) => require(["../views/error/404"], resolve),
    hidden: true,
  },
  {
    path: "/401",
    component: (resolve) => require(["../views/error/401"], resolve),
    hidden: true,
  },
  //个人中心
  {
    path: "/user",
    component: Layout,
    hidden: true,
    redirect: "noredirect",
    children: [
      {
        path: "profile",
        component: (resolve) =>
          require(["@/views/system/profile/index"], resolve),
        name: "Profile",
        meta: { title: "个人中心", icon: "user" },
      },
    ],
  },
];

export default new Router({
  mode: "history", // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});
