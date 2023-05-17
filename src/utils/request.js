import axios from "axios";
import { Notification, MessageBox, Message } from "element-ui";
import { getToken } from "@/utils/auth";
import errorCode from "@/utils/errorCode";
import { setToken } from "@/utils/auth";
import store from "@/store";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例，将其导出去就可以利用该实例发送ajax请求
const service = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
});

//请求拦截器----发送请求前要做的事
service.interceptors.request.use(
  (config) => {

    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    
    if (getToken() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers["Content-Type"] =  'application/json';
    }
    if (config.method === "get" && config.params) {
      let url = config.url + "?";
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof value !== "undefined") {
          if (typeof value === "object") {
            for (const key of Object.keys(value)) {
              if (value[key] !== null && typeof value[key] !== "undefined") {
                let params = propName + "[" + key + "]";
                let subPart = encodeURIComponent(params) + "=";
                url += subPart + encodeURIComponent(value[key]) + "&";
              }
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }

    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);
//响应拦截器----后端返回后要处理的事
service.interceptors.response.use(
  (res) => {
    
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    //判断是否带有token值
    if (res.token) {
      setToken(res.token);
    }
    // 获取错误信息
    const msg = res.data.msg || errorCode[code] || errorCode["default"];
    if (code === 401) {
      MessageBox.confirm(
        "登录状态已过期，您可以继续留在该页面，或者重新登录",
        "系统提示",
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          store.dispatch("LogOut").then(() => {
            
            location.href = "/login";
          });
        })
        .catch(() => {});
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code === 500) {
      Message({
        message: msg,
        type: "error",
      });
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      Notification.error({
        title: msg,
      });
      return Promise.reject("error");
    } else {
      return res.data.data;
    }
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
