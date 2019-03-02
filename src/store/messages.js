import store from "@/store/store.js";

function defaultState() {
  return {
    messagesCache: new Map(),
    currentMessages: []
  };
}
export default {
  state: defaultState,

  mutations: {
    storeMessage(state, message) {
      let messagesCache = state.messagesCache.get(message.topic);
      if (!messagesCache) {
        // initialize new array of messages at map location state.messagesCache[topicID]
        console.log("storing message in new messagesCache:", message);
        state.messagesCache.set(message.topic, new Array(message));
      } else {
        // append message to existing messagesCache array
        console.log("appending message to existing cache:", message);
        console.log("messagesCache:", messagesCache);
        messagesCache.push(message);
      }
    },
    setCurrentMessages(state) {
      state.currentMessages = state.messagesCache.get(
        store.getters.selectedTopic.topic
      );
    },
    publishMessage(state, message) {
      let selectedTopic = store.getters.selectedTopic;
      let msg = selectedTopic.createMessage(message);
      msg.from = store.state.client.tinodeClient.getCurrentUserID();
      selectedTopic.publishMessage(msg).then(ctrl => {
        console.log("publish msg ctrl:", ctrl);
      });
      // store.dispatch("storeMessage", msg);
    }
  }, // END of mutations

  actions: {
    publishMessage(context, message) {
      context.commit("publishMessage", message);
    },
    setCurrentMessages(context) {
      context.commit("setCurrentMessages");
    },
    storeMessage(context, message) {
      context.commit("storeMessage", message);
    }
  }, // END of actions

  getters: {
    messages: state => {
      return state.currentMessages;
    }
  }
};
