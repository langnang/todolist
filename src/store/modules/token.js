import { sign_in, set_token, delete_token } from "@/api/oauth";

export default {
  namespaced: true,
  state: {
    id: "",
    token: {},
    active: false,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    setToken(state, token) {
      state.id = token.id;
      state.token = token.token;
      state.active = !state.active;
    },
  },
  actions: {
    signIn({ commit }, { code }) {
      return sign_in({ code }).then((res) => {
        console.log(res);
        if (res.access_token) {
          commit("SET_TOKEN", res);
          set_token(res);
        } else {
          delete_token();
        }
      });
    },
    isTokenActive({ commit, dispatch }, token) {
      commit("setAppLoadingText", "isTokenActive");
      dispatch("callTokenUseable", token)
        .then(function(res) {
          // token 可用
          if (res.status == 200 && res.data.status == 200) {
            commit("setAppLoadingText", "isTokenActive_success");
            commit("setToken", token);
            dispatch("getTodoList");
            return;
          } else {
            throw Error("the token is not valid");
          }
        })
        .catch(function(err) {
          commit("setAppLoadingText", "isTokenActive_error");
          console.error(err);
          // window.localStorage.removeItem("token");
        })
        .finally(function() {});
    },
  },
};
