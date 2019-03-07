import * as tinode from "@/tinode.js";
import router from "@/router.js";
import Vue from "vue";
import store from "@/store/store.js";

// All mutations related to the user's client (account)

const cookieCache = window.localStorage;

export function defaultState() {
  return {
    tinodeClient: new tinode.NewClient(),
    profile: {
      // wrapper from user.public
      displayName: "", // user.public.fn
      avatar: {} // user.public.photo
    }
  };
}

export default {
  state: defaultState(),

  mutations: {
    // Login to IM server
    authenticate(state, request) {
      let client = state.tinodeClient;
      client
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
              let contactsList = [];
              meta.sub.forEach(sub => {
                let topic = state.tinodeClient.getTopic(sub.topic);
                topic.subscribe().then(() => {
                  topic.getMessagesPage(20, true).then(ctrl => {
                    console.log("get messages page ctrl obj:", ctrl);
                    contactsList.push(topic);
                  });
                });
              });

              store.dispatch("setContactsList", contactsList);
            }
          };

          client.onDataMessage = function(data) {
            console.log("{data} message received:", data);
            store.dispatch("storeMessage", data);
          };
          client.onMeta = function(meta) {
            console.log("{meta} message received:", meta);
          };
          client.onMetaDesc = function(meta) {
            console.log("{meta desc} message received:", meta);
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
          };

          me.onPres = function(pres) {
            console.log("Received Presence msg:", pres);
            let contact = store.getters.contacts.find(c => {
              return c.topic == pres.src;
            });
            if (contact) {
              if (pres.topic == "me") {
                switch (pres.what) {
                  case "on":
                    store.dispatch("updateTopicPresence", {
                      topicID: pres.src,
                      presence: true
                    });

                    break;
                  case "off":
                    store.dispatch("updateTopicPresence", {
                      topicID: pres.src,
                      presence: false
                    });
                    break;

                  case "msg":
                    // presence message for a notification
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
            console.log("fnd.onMeta triggered:", meta);
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
      router.push("/");
    },

    // Register a new account
    register(state, payload) {
      let secret = btoa(payload.username + ":" + payload.password);
      let accParams = {
        public: {
          fn: payload.displayName,
          photo: {
            data: payload.avatarData,
            type: "png"
          }
        },
        tags: [payload.email, payload.username]
      };

      state.tinodeClient.connect().then(() => {
        return state.tinodeClient
          .createAccount("basic", secret, false, accParams)
          .then(ctrl => {
            if (ctrl.code == 201) {
              console.log("Account registration successful:", ctrl);
              router.push("login");
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    setProfile(state, profile) {
      state.profile = profile;
    },
    clearClientState(state) {
      state = Object.assign(state, defaultState());
    }
  }, // END of mutations

  actions: {
    authenticate(context, request) {
      context.commit("authenticate", request);
    },
    logout(context) {
      context.commit("clearMessagesState");
      context.commit("clearContactsState");
      context.commit("clearClientState");
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
