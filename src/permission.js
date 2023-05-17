import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const whiteList = ["/login", "/register"];
const resList = ["/result/report","/result/review/form","/result/review/init","/result/moniter","/result/unitpass","/result/review/expert","/result/review/final","/result/unitpass","/result/review/expert","/result/checkbase","/result/assign/expert","/result/unitpass","/result/rejected"]
const expList = ["/system/experts","/result/assign/expert","/experts/addExpert",'/experts/manageExpert']

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === "/login") {
      next({ path: "/index" });
      NProgress.done();
      }
    else {
      /*if (resList.indexOf(to.path) !== -1 && store.getters.resSelectOption === "")
      {
        store.dispatch("GetResOptions").then(() => {
          next();
        });
      }
      if (expList.indexOf(to.path) !== -1 && store.getters.expSelectOption === "")
      {
        store.dispatch("GetExpOptions").then(() => {
        next();
      });
      }*/
      if (store.getters.name == "") {
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch("GetInfo",getToken()).then(() => {
          store.dispatch("GenerateRoutes").then((accessRoutes) => {
            // // 根据roles权限生成可访问的路由表
            router.addRoutes(accessRoutes); // 动态添加可访问路由表
            next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
          });
        });
      } else {
        next();
      }
    }
  }
  else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({ path: "/login", query: { redirect: to.fullPath } });
      NProgress.done();
    }
  }
  //
}),
  router.afterEach(() => {
    NProgress.done();
  });

//   //发送请求
//   //动态添加
//   //缓存数据
//   //跳转
