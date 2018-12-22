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
    profile: {},
    selectedTopic: {},
    contacts: [],
    messages: [
      { content: "You have no messages, start a new conversation today!" }
    ]
  },

  mutations: {
    setProfile: (state, profile) => {
      state.profile = profile;
    },
    handleNewContact: (state, contact) => {
      state.contacts.push(contact);
    },
    handleNewMessage: (state, message) => {
      state.messages.push(message);
    },
    handleSendMessage: (state, messageInput) => {
      var currentTopicID = state.selectedTopic.name;
      var topic = state.tinodeClient.getTopic(currentTopicID);
      var msg = topic.createMessage(messageInput, true);
      topic.publishMessage(msg).then(() => {
        // update UI after sending message to server
        state.messages.push({
          from: state.profile.displayName,
          content: messageInput,
          ts: Date.now().toString(),
          seq: topic._maxSeq
        });
      });
    },
    renderMessages: state => {
      state.messages = [];
      var currentTopicID = state.selectedTopic.name;
      var topic = state.tinodeClient.getTopic(currentTopicID);
      if (topic) {
        topic.getMessagesPage(20).catch(err => {
          console.log("Error fetching messages:", err.message);
        });
      }
    },
    selectTopic: (state, topic) => {
      state.selectedTopic = topic;
    },
    logout: state => {
      state.tinodeClient.disconnect();
      router.go(); // refresh the page
    }
  }, // END of mutations

  actions: {
    setProfile: (context, profile) => {
      context.commit("setProfile", profile);
    },
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
    getProfile: state => {
      return state.profile;
    },
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
