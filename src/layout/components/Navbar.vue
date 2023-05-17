<template>
  <div class="navbar">
    <!-- 控制侧边导航栏的图标 -->
    <hamburger
      id="hamburger-container"
      :is-active="siderOpen"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!-- 面包屑组件 -->
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <!-- 右边顶部组件 -->
    <div class="right-menu">
<!--      <div>您好： {{name}}</div>-->
<!--        <el-tooltip content="指南下载" effect="dark" placement="bottom">
        <div class="right-menu-item hover-effect">
          <svg-icon icon-class="download" style="font-size:22px"/>
        </div>
      </el-tooltip>
      <el-tooltip content="消息提醒" effect="dark" placement="bottom">
        <div class="right-menu-item hover-effect">
          <svg-icon icon-class="message" style="font-size:22px"/>
        </div>
      </el-tooltip>-->
      <!-- 下拉菜单 -->
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          您好： {{name}}
<!--          <img :src="avatar" class="user-avatar" />-->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- 路由跳转----去router/index.js中查看对应的地址 -->
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>

          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";

// import avatarImg from "@/assets/images/avator.png";
export default {
  data() {
    return {
      name:"",
      // avatar: avatarImg,
    };
  },
  components: {
    Hamburger,
    Breadcrumb,
  },
  computed: {
    ...mapGetters(["siderOpen","avatar"]),
  },
  created() {
    //获取验证码
    //this.getCode();
    //获取cookie
    this.getname();
  },
  methods: {
    getname(){
      this.$store
          .dispatch("GetInfo")
          .then((res) => {
            this.name = res.name;
          })
          .catch(() => {
            //发生异常或错误，更新验证码
            this.loading = false;
            //this.getCode();
          });
    },
    toggleSideBar() {
      this.$store.dispatch("setting/toggleSideBar");
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            location.href = "/index";
          });
        })
        .catch(() => {});
    },
  },
};
</script>


<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 58px;

    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
