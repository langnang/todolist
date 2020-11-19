export default {
  namespaced: true,
  state: {
    client_id: "381a344cb2b73d11f5e7",
    client_secret: "da332ec94acf7010f53ab7e9a33500f785378cc5",
    code: null,
    token: null,
  },
  mutations: {
    SET_CODE(state, code) {
      state.code = code;
    },
  },
  actions: {
    login() {
      console.log("oauth/login");
    },
    logout() {
      console.log("oauth/logout");
    },
  },
};
