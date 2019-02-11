import store from "@/store/store.js";

export default {
  state: {
    messagesCache: new Map(),
    currentMessages: [],
    userDetailsDrawerToggled: false
  },

  mutations: {
    storeMessage(state, message) {
      let messagesCache = state.messagesCache.get(message.topic);
      if (!messagesCache) {
        // initialize new array of messages at map location state.messagesCache[topicID]
        console.log("initializing new messagesCache array:", message);
        state.messagesCache.set(message.topic, new Array(message));
      } else {
        // append message to existing messagesCache array
        console.log("appending to existing array:", messagesCache);
        messagesCache.push(message);
      }
    },
    renderMessages(state) {
      let selectedTopic = store.getters.selectedTopic;
      console.log("selectedTopic", selectedTopic);
      var msgs = state.messagesCache.get(selectedTopic.topic);
      console.log(msgs);
      state.currentMessages = state.messagesCache.get(selectedTopic.topic);
    },

    toggleUserDetailsDrawer(state, status) {
      console.log("Status:", status);
      state.userDetailsDrawerToggled = status;
    }
  }, // END of mutations

  actions: {
    toggleUserDetailsDrawer(context, status) {
      console.log("Committing", status);
      context.commit("toggleUserDetailsDrawer", status);
    },
    renderMessages(context) {
      console.log("rendering msgs");
      context.commit("renderMessages");
    },

    storeMessage(context, message) {
      context.commit("storeMessage", message);
    }
  }, // END of actions

  getters: {
    messages: state => {
      return state.currentMessages;
    },
    userDetailsDrawerToggled: state => {
      return state.userDetailsDrawerToggled;
    }
  }
};
