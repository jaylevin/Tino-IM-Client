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
    selectedTopic: {},
    contacts: [],
    messages: []
  },

  mutations: {
    handleNewContact: (state, contact) => {
      state.contacts.push(contact);
    },
    handleNewMessage: (state, message) => {
      state.messages.push(message);
    },
    handleSendMessage: (state, messageInput) => {
      var currentTopicID = state.selectedTopic.name;
      var topic = state.tinodeClient.getTopic(currentTopicID);
      var msg = topic.createMessage(messageInput, false);
      topic.publishMessage(msg).catch(err => {
        console.log("Error sending message:", err.message);
      });
    },
    renderMessages: state => {
      state.messages = [];
      var currentTopicID = state.selectedTopic.name;
      var topic = state.tinodeClient.getTopic(currentTopicID);
      if (topic) {
        topic
          .getMessagesPage(20)
          .then(() => {
            topic.messages(m => {
              var outgoing = state.tinodeClient.getCurrentUserID() == m.from;
              state.messages.push({
                from: outgoing ? "Me" : topic.public.FN,
                content: m.content,
                ts: JSON.stringify(m.ts)
                  .split("T")[0]
                  .replace(`"`, ``)
              });
            });
          })
          .catch(err => {
            console.log("Error fetching messages:", err.message);
          });
      }
    },
    selectTopic: (state, topic) => {
      state.selectedTopic = topic;
    },
    logout: state => {
      state.tinodeClient.disconnect();
      router.go();
    }
  }, // END of mutations

  actions: {
    handleNewContact: (context, contact) => {
      context.commit("handleNewContact", contact);
    },
    handleNewMessage: (context, message) => {
      context.commit("handleNewMessage", message);
    },
    handleSendMessage: (context, messageInput) => {
      context.commit("handleSendMessage", messageInput);
    },
    renderMessages: context => {
      context.commit("renderMessages");
    },
    selectTopic: (context, topic) => {
      context.commit("selectTopic", topic);
      context.commit("renderMessages");
    },
    logout: context => {
      context.commit("logout");
    }
  }, // END of actions

  getters: {
    isAuthenticated: state => {
      return state.tinodeClient._authenticated;
    },
    getContacts: state => {
      return state.contacts;
    },
    getSelectedTopic: state => {
      return state.selectedTopic;
    },
    getMessages: state => {
      return state.messages;
    }
  }
};

export default new Vuex.Store({
  modules: {
    app: appStore
  }
});
