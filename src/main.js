import Vue from 'vue'
import './plugins/axios'
import './plugins/fontawesome'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
import 'particles.js'
import config from './../app.config'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')


window.axios
  .get(config.API_PATH + "/static/json/particles.js/index.json")
  .then(res => {
    if (res.status === 200) {
      window.particlesJS('app', res.data);
    }
  })
