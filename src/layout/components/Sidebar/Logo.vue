<template>
  <div class="sidebar-logo-container">
    <router-link class="sidebar-logo-link" to="/">
      <img :src="logo" class="sidebar-logo" />
      <h1 class="sidebar-title">
        {{ title }}
      </h1>
    </router-link>
  </div>
</template>

<script>
import logoImg from "@/assets/images/logo.png";
export default {
  name: "SidebarLogo",
  data() {
    return {
      title: "系统展示",
      logo: logoImg,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 80%;
  height: 50px;
  line-height: 50px;

  text-align: center;
  overflow: hidden;

  .sidebar-logo-link {
    height: 100%;
    width: 100%;

    .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;

      margin:0 auto;
    }
    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      padding-left:5px;
    }
  }
}
</style>
