import Vue from "vue";
import "./plugins/axios";
import "./plugins/element";
import "./plugins/fontawesome";
import App from "./App.vue";
import store from "./store";
import router from "./routes";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
