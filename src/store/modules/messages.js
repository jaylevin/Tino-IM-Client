import store from "@/store/store.js";

function defaultState() {
  return {
    messagesCache: new Map(),
    currentMessages: []
  };
}

export default {
  state: defaultState(),

  mutations: {
    storeMessage(state, message) {
      let messagesCache = state.messagesCache.get(message.topic);
      // if (typeof message.content == "object")  {
      //   if (message.content.fmt[0].tp == "BR") {
      //     var tempArr = Array.from(message.content.txt);
      //     tempArr.splice(message.content.fmt[0].at, 1, '\n');
      //     message.content = tempArr.join('');
      //     console.log(message.content);
      //   }
      // }
      if (!messagesCache) {
        // initialize new array of messages at map location state.messagesCache[topicID]
        console.log("storing message in new messagesCache:", message);
        state.messagesCache.set(message.topic, new Array(message));

        if (message.topic == store.getters.selectedTopicID) {
          state.currentMessages = state.messagesCache.get(message.topic);
        }
      } else {
        // append message to existing messagesCache array
        console.log("appending message to existing cache:", message);
        messagesCache.push(message);
      }
    },
    setCurrentMessages(state) {
      state.currentMessages = state.messagesCache.get(
        store.getters.selectedTopicID
      );
    },
    publishMessage(state, message) {
      let selectedTopicID = store.getters.selectedTopicID;
      let client = store.state.client.tinodeClient;
      let selectedTopic = client.getTopic(selectedTopicID);
      let msg = selectedTopic.createMessage(message);

      // Message is outgoing, so assign the client's ID to msg.form
      msg.from = store.getters.profile.userID;

      selectedTopic.publishMessage(msg).then(ctrl => {
        console.log("publish msg ctrl:", ctrl);
      });
    },
    clearMessagesState(state) {
      state = Object.assign(state, defaultState());
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
