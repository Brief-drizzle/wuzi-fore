import request from "@/utils/request";

//获取验证码
export function getCodeImg() {
  return request({
    url: "/captcha",
    method: "get",
    timeout: 20000,
  });
}

//登录
export function login(username, password, code, uuid) {
  const data = {
    username: username,
    password: password,
    verCode: code,
    verKey: uuid,
  };
  return request({
    url: "/login",
    method: "post",
    data: data,
  });
}

//获取用户详细信息
export function getInfo() {
  return request({
    url: "/user/info",
    method: "post",
  });
}



//注册---获取所有的主管单位
export function getUnits() {
  return request({
    url: "/user/goregister",
    method: "get",
    timeout: 20000,
  });
}

// 注册方法
export function register(data) {
  return request({
    url: "/user/register",
    // headers: {
    //   isToken: false
    // },
    method: "post",
    data: data,
  });
}

//检测用户是否重名
export function isRepeatName(data) {

  return request({
    url: "/user/verifyUserName",
    method: "post",
    params: data,
  });

}
