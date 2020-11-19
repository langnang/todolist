import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import oauth from "./modules/oauth";
import todo from "./modules/todo";
import token from "./modules/token";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    oauth,
    todo,
    token,
  },
  getters,
  actions,
});
