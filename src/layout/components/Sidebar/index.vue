<template>
  <div>
    <!-- logo标题部分 -->
    <logo :collapse="isCollapse" />
    <!-- 菜单部分 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBackground"
        :text-color="variables.menuColor"
        active-text-color="#409EFF"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
        router
      >
        <template v-for="(group, index) in sidebarRouters">
<!--           <template v-if="group.hidden==false && group.redirect == 'index'">
            <el-menu-item  :index="group.children[0].path"  >
              <svg-icon :icon-class="group.children[0].meta.icon" />
              <span slot="title">{{ group.children[0].name }}</span>
            </el-menu-item>
          </template> -->
          <template v-if="group.hidden == false && group.redirect != 'index'">
            <el-submenu
              v-if="group.children && group.children.length > 0"
              :key="group.path + index"
              :index="group.path"
            >
              <template slot="title">
                <svg-icon :icon-class="group.meta.icon" />
                <span slot="title">{{ group.name }}</span>
              </template>
              <el-menu-item
                v-for="menu in group.children"
                :key="menu.path + index"
                :index="group.path + '/' + menu.path"
              >
                <svg-icon :icon-class="menu.meta.icon" />
                {{ menu.name }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="group.path + index" :index="group.path">
              <svg-icon :icon-class="group.meta.icon" />
              <span slot="title">{{ group.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import variables from "@/assets/styles/variables.scss";

export default {
  components: { Logo },
  computed: {
    ...mapGetters(["sidebarRouters", "siderOpen"]),
    variables() {
      return variables;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    isCollapse() {
      return !this.siderOpen;
    },
  },
  mounted() {},
};
</script>

<style>
</style>
