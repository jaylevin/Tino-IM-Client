import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import "bulma";
import "bulma-divider";
Vue.config.productionTip = false;

new Vue({
  router,
  axios,
  VueAxios,
  store,
  render: h => h(App)
}).$mount("#app");
