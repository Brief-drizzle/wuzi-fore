<template>
  <div :class="classObj">

  </div>
</template>

<script>
import Sidebar from "@/layout/components/Sidebar";
import Navbar from "@/layout/components/Navbar";
import TagsView from "@/layout/components/TagsView";
import AppMain from "@/layout/components/AppMain";
import {mapState} from "vuex";

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
}
</script>

<style>

</style>
