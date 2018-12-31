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
    loadingContacts: true,
    messages: [
      {
        content:
          "Start a new conversation or group chat using the buttons on the left."
      }
    ]
  },

  mutations: {
    setProfile: (state, profile) => {
      state.profile = profile;
    },
    setLoadingContacts: (state, loading) => {
      state.loadingContacts = loading;
    },
    handleUpdateProfile: (state, pub) => {
      state.tinodeClient
        .getMeTopic()
        .setMeta({ desc: { public: pub } })
        .catch(err => {
          console.log("err updating account:", err);
        });
      if (pub["FN"] != state.profile.displayName) {
        state.profile.displayName = pub["FN"];
      }
      if (pub["Photo"] != state.profile.avatar) {
        console.log("old photo:", state.profile.avatar);
        console.log("new photo:");
        console.log(pub["Photo"]);
        state.profile.avatar = pub["Photo"];
      }
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
        msg.from = state.profile.tinodeID;
        console.log("msg:");
        console.log(msg);
        state.messages.push(msg);
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
    setLoadingContacts: (context, loading) => {
      context.commit("setLoadingContacts", loading);
    },
    handleUpdateProfile: (context, data) => {
      context.commit("handleUpdateProfile", data);
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
    isLoadingContacts: state => {
      return state.loadingContacts;
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
    },
    getTopic: state => topic => {
      return state.tinodeClient.getTopic(topic);
    },
    getClient: state => {
      return state.tinodeClient;
    }
  }
};

export default new Vuex.Store({
  modules: {
    app: appStore
  }
});
