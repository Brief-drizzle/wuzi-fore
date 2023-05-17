const state = {
  siderOpen: true,
};

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.siderOpen = !state.siderOpen;
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
