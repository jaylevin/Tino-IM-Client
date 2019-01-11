import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import * as tinode from "@/tinode.js";

// Initialized once
const tClient = tinode.NewClient();

Vue.prototype.$tinodeClient = tClient;
Vue.use(Vuex);

const appStore = {
  state: {
    // Client
    tinodeClient: tClient,
    profile: {},

    // Contacts
    contacts: [],
    loadingContacts: true,
    selectedTopic: {},

    //Messages
    messagesCache: new Map(),
    currentMessages: new Array(),
    // Message deleting
    isDeleting: false,
    msgsToDelete: new Array()
  },

  mutations: {
    setProfile: (state, profile) => {
      state.profile = profile;
    },
    setIsDeleting: (state, deleting) => {
      state.isDeleting = deleting;
    },
    selectMsgForDel: (state, msg) => {
      if (msg.markedToDel) {
        msg.markedToDel = false;
        var msgs = state.msgsToDelete;
        msgs = msgs.filter(function(val, index, arr) {
          return val != msg;
        });
        state.msgsToDelete = filtered;
      } else {
        msg.markedToDel = true;
        state.msgsToDelete.push(msg);
      }
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
        state.profile.avatar = pub["Photo"];
      }
    },
    handleNewContact: (state, contact) => {
      state.contacts.push(contact);
    },
    handleNewMessage: (state, message) => {
      if (!state.messagesCache.get(message.topic)) {
        // Initialize new array
        state.messagesCache.set(message.topic, new Array());
      }
      state.messagesCache.get(message.topic).push(message);
    },
    handleSendMessage: (state, messageInput) => {
      var currentTopicID = state.selectedTopic.name;
      var topic = state.tinodeClient.getTopic(currentTopicID);
      var msg = topic.createMessage(messageInput, true);
      topic.publishMessage(msg).then(() => {
        // update UI after sending message to server
        msg.from = state.profile.tinodeID;
        state.currentMessages.push(msg);
        state.messagesCache.set(msg.topic, state.currentMessages);
      });
    },
    renderCachedMessages: (state, messagesCache) => {
      // This mutation is invoked once per topic when a client first logs in,
      // Description: Fetches the 20 most recent messages from server,
      // into state.messagesCache
      state.messagesCache = messagesCache;
    },
    renderMessages: state => {
      var currentTopicID = state.selectedTopic.name;
      if (state.messagesCache.get(currentTopicID)) {
        state.currentMessages = state.messagesCache.get(currentTopicID);
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
    setIsDeleting: (context, deleting) => {
      context.commit("setIsDeleting", deleting);
    },
    selectMsgForDel: (context, msg) => {
      context.commit("selectMsgForDel", msg);
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
    renderCachedMessages: (context, messagesCache) => {
      context.commit("renderCachedMessages", messagesCache);
      context.commit("setLoadingContacts", false);
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
      return state.currentMessages;
    },
    getTopic: state => topic => {
      return state.tinodeClient.getTopic(topic);
    },
    getClient: state => {
      return state.tinodeClient;
    },
    getDelRange: state => {
      return state.delRange;
    },
    isDeleting: state => {
      return state.isDeleting;
    },
    getMsgsToDelete: state => {
      return state.msgsToDelete;
    }
  }
};

export default new Vuex.Store({
  modules: {
    app: appStore
  }
});
