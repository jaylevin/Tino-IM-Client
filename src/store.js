import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import * as tinode from "@/tinode.js";
Vue.use(Vuex);

const tinodeStore = {
  state: {
    client: new tinode.NewClient()
  },

  mutations: {
    login(state) {
      let comp = this;
      let tinode = state.client;
      tinode
        .connect()
        .then(() => {
          // Connected. Login now.
          return tinode.loginBasic("amywilson", "lol");
        })
        .then(ctrl => {
          console.log("ctrl:", ctrl);
          // Logged in fine, attach callbacks, subscribe to 'me'.
          var me = tinode.getMeTopic();

          me.onMetaDesc = function(meta) {
            console.log("meta:", meta);
          };

          // Subscribe, fetch topic description and the list of contacts.
          me.subscribe({ get: { desc: {}, sub: {} } }).then(() => {
            if (ctrl.code == 200) {
              console.log("Subscribed and fetched list of contacts");
              router.push({ name: "chat" });
            }
          });
        })
        .catch(err => {
          console.log("error:", err);
          // Login or subscription failed, do something.
        });
    },

    logout(state) {
      let tinode = state.client;
      tinode.disconnect();
    }
  }, // END of mutations

  actions: {
    login(context) {
      context.commit("login");
    },
    logout(context) {
      context.commit("logout");
    }
  }, // END of actions

  getters: {
    isAuthenticated(state) {
      return state.client._authenticated;
    }
  }
};

export default new Vuex.Store({
  modules: {
    tinode: tinodeStore
  }
});
