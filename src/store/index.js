import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import permission from './modules/permission'
import getters from './getters'
import tagsView from './modules/tagsView'
import infoView from './modules/infoView'

import proInfoView from './modules/proInfoView'
import setting from './modules/setting'
import options from './modules/options'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    permission,
    tagsView,
    infoView,
    proInfoView,
    setting,
    options
  },
  getters
});

export default store;
