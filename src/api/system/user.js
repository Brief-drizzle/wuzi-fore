import request from "@/utils/request";
// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: "/user/personInfo",
    method: "get",
  });
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldpwd: oldPassword,
    newpwd: newPassword,
  };
  return request({
    url: "/user/changePassword",
    method: "post",
    params: data,
  });
}

//修改用户信息
export function updateUserProfile(user) {
  return request({
    url: "/user/changeInfo",
    method: "post",
    params: user,
  });
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: "/uploadImage",
    method: "post",
    data: data,
  });
}
