import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import * as tinode from "@/tinode.js";
const tClient = tinode.NewClient();

Vue.prototype.$tinodeClient = tClient;
Vue.use(Vuex);
const appStore = {
  state: {
    tinodeClient: tClient,
    contacts: []
  },

  mutations: {
    addContact: (state, contact) => {
      state.contacts.push(contact);
    }
  },
  // END of mutations

  actions: {
    addContact: (context, payload) => {
      context.commit("addContact", payload);
    }
  },
  // END of actions

  getters: {
    isAuthenticated: state => state.tinodeClient._authenticated,
    getContacts: state => state.contacts
  }
};

export default new Vuex.Store({
  modules: {
    app: appStore
  }
});
