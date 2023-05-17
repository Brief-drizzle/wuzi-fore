<template>
  <div :class="classObj">
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />
    <!-- 侧边栏右侧部分 -->
    <div class="main-container hasTagsView">
      <div class="fixed-header">
        <!-- 顶部导航栏 -->
        <navbar />
        <!-- tags栏 -->
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar.vue";
import TagsView from "./components/TagsView/index.vue";
import AppMain from "./components/AppMain.vue";
export default {
  name: "Layout",
  components: {
    Sidebar,
    Navbar,
    TagsView,
    AppMain,
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.setting.siderOpen,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar,
        openSidebar: this.sidebar,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $base-sidebar-width;
  position: relative;

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$base-sidebar-width});
    transition: width 0.28s;
  }
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
</style>