import * as tinode from "@/tinode.js";
import router from "@/router.js";
import Vue from "vue";
import store from "@/store/store.js";
// All mutations related to the user's client (account)
Vue.prototype.$tinodeClient = tClient;
const cookieCache = window.localStorage;
var tClient = tinode.NewClient();

if (cookieCache.getItem("token")) {
  console.log("found token:", cookieCache.getItem("token"));
}

export default {
  state: {
    tinodeClient: tClient,
    avatar: {},
    session: cookieCache
  },

  mutations: {
    // Login
    authenticate(state, request) {
      state.tinodeClient
        .connect()
        .then(() => {
          return state.tinodeClient.loginBasic(
            request.username,
            request.password
          );
        })
        .then(ctrl => {
          console.log("Logged in successfully, ", ctrl.params);
          state.session.setItem("token", ctrl.params.token);

          // Logged in fine, attach callbacks, subscribe to 'me'.
          var me = state.tinodeClient.getMeTopic();
          var fnd = state.tinodeClient.getFndTopic();
          me.onMetaDesc = function(meta) {
            console.log("me.onMetaDesc triggered:", meta);
            store.dispatch("setAvatar", meta.public.photo);
            router.push("chat");
          };

          fnd.onMeta = function(meta) {
            console.log("fnd.onMeta triggered:", meta.sub);
            store.dispatch("setSearchResults", meta.sub);
          };

          fnd.onMetaDesc = function(meta) {
            console.log("fnd.onMetaDesc triggered:", meta);
          };

          // Subscribe, fetch topic description and the list of contacts.
          me.subscribe({ what: "sub desc data" }).then(ctrl => {
            router.push("chat");
          });
        })
        .catch(err => {
          // Login or subscription failed, do something.
          console.log(err);
        });
    },

    // Register a new account
    register(state, payload) {
      state.tinodeClient.connect().then(() => {
        return state.tinodeClient
          .createAccountBasic(payload.username, payload.password, {
            public: {
              fn: payload.displayName,
              photo: {
                data: payload.avatarData,
                type: "png"
              }
            },
            tags: [payload.email, payload.username]
          })
          .then(data => {
            console.log("Account registration successful:", data);
          });
      });
    },
    setAvatar(state, avatar) {
      state.avatar = avatar;
    }
  }, // END of mutations

  actions: {
    authenticate(context, request) {
      context.commit("authenticate", request);
    },
    register(context, payload) {
      context.commit("register", payload);
    },
    setAvatar(context, avatar) {
      context.commit("setAvatar", avatar);
    }
  }, // END of actions

  getters: {
    session(state) {
      return state.session;
    },
    avatar(state) {
      return state.avatar;
    }
  }
};
