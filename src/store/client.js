import * as tinode from "@/tinode.js";
import router from "@/router.js";
import Vue from "vue";
import store from "@/store/store.js";
// All mutations related to the user's client (account)
Vue.prototype.$tinodeClient = tClient;
const cookieCache = window.localStorage;
var tClient = tinode.NewClient();

// if (cookieCache.getItem("token")) {
//   console.log("found token:", cookieCache.getItem("token"));
// }

export default {
  state: {
    tinodeClient: tClient,
    profile: {
      displayName: "", // user.public.fn
      avatar: {} // user.public.photo
    }
    // session: cookieCache
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
          console.log("Logged in successfully:", ctrl.params);
          // state.session.setItem("token", ctrl.params.token);

          // Logged in fine, attach callbacks, subscribe to 'me'.
          var me = state.tinodeClient.getMeTopic();
          var fnd = state.tinodeClient.getFndTopic();
          me.onMeta = function(meta) {
            console.log("Received me.onMeta:", meta);
            if (meta.sub) {
              var subs = [];
              meta.sub.forEach(sub => {
                sub.isOnline = false;
                state.tinodeClient.subscribe(sub.topic).then(ctrl => {
                  subs.push(sub);
                });
              });
              store.dispatch("setContactsList", subs);
              console.log("subs:", subs);
            }
          };

          me.onMetaDesc = function(meta) {
            console.log("Received topic metadata update: ", meta);
            if (meta.name == "me") {
              if (meta.public) {
                store.dispatch("setProfile", {
                  displayName: meta.public.fn,
                  avatar: meta.public.photo
                });
              }
            }
            router.push("chat");
          };

          me.onPres = function(pres) {
            console.log("Presence msg:", pres);
            let contact = store.getters.contacts.find(c => {
              return c.topic == pres.src;
            });
            if (contact) {
              if (pres.topic == "me") {
                switch (pres.what) {
                  case "on" || "off":
                    if (contact) {
                      store.dispatch("updateTopicPresence", {
                        topicID: pres.src,
                        presence: pres.what == "on" ? true : false
                      });
                    }
                    break;

                  case "msg":
                    contact.isOnline = payload.presence;
                    break;
                }
              }
            } else {
              console.log(
                "Received a presence message from someone whom client is not subbed to"
              );
            }
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
    logout(state) {
      state.tinodeClient.disconnect();
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
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    setProfile(state, profile) {
      state.profile = profile;
    }
  }, // END of mutations

  actions: {
    authenticate(context, request) {
      context.commit("authenticate", request);
    },
    logout(context) {
      context.commit("logout");
    },
    register(context, payload) {
      context.commit("register", payload);
    },
    setProfile(context, profile) {
      context.commit("setProfile", profile);
    }
  }, // END of actions

  getters: {
    session: state => state.session,
    profile: state => state.profile,
    getTopic: state => topicID => state.tinodeClient.getTopic(topicID)
  }
};
