import store from "@/store/store.js";

function defaultState() {
  return {
    messagesCache: new Map()
  };
}
export default {
  state: defaultState,

  mutations: {
    storeMessage(state, message) {
      let messagesCache = state.messagesCache.get(message.topic);
      if (!messagesCache) {
        // initialize new array of messages at map location state.messagesCache[topicID]
        state.messagesCache.set(message.topic, new Array(message));
      } else {
        // append message to existing messagesCache array
        messagesCache.push(message);
      }
    },
    renderMessages(state) {
      // let selectedTopic = store.getters.selectedTopic;
      // if (selectedTopic) {
      //   var msgs = state.messagesCache.get(selectedTopic.topic);
      //   console.log(
      //     "Rendering messages for selectedTopic:",
      //     selectedTopic.public.fn
      //   );
      //   state.currentMessages = state.messagesCache.get(selectedTopic.topic);
      // }
    },
    publishMessage(state, message) {
      let selectedTopic = store.getters.selectedTopic;
      let msg = selectedTopic.createMessage(message);
      selectedTopic.publishMessage(msg).then(ctrl => {
        console.log("publish msg ctrl:", ctrl);
      });
    }
  }, // END of mutations

  actions: {
    renderMessages(context) {
      context.commit("renderMessages");
    },
    publishMessage(context, message) {
      context.commit("publishMessage", message);
    },
    storeMessage(context, message) {
      context.commit("storeMessage", message);
    }
  }, // END of actions

  getters: {
    getMessagesByTopic: state => topicID => {
      return state.messagesCache.get(topicID);
    }
  }
};
