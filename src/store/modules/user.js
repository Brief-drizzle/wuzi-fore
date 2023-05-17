import { login, getInfo, logout } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    // role: "",
    // permissions: [],
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLE: (state, role) => {
      state.role = role;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    },
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((res) => {
            setToken(res.token);
            commit("SET_TOKEN", res.token);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //退出系统
    LogOut({ commit, state }) {
      commit("SET_TOKEN", "");
      //commit("SET_ROLES", []);

      removeToken();
    },
    //获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            //commit("SET_ROLE", res.user.roleId);
            commit("SET_NAME", res.name);
            console.log(res)
            //commit("SET_AVATAR",   res.user.avatar);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default user;
