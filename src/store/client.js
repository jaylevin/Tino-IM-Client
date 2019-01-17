import * as tinode from "@/tinode.js";
import Vue from "vue";

// All mutations related to the user's client (account)
const tClient = tinode.NewClient();
Vue.prototype.$tinodeClient = tClient;

const clientStore = {
  state: {
    tinodeClient: tClient
  },

  mutations: {
    login(state) {}
  }, // END of mutations

  actions: {
    login(context) {
      context.commit("login");
    }
  }, // END of actions

  getters: {}
};
