import store from "@/store/store.js";
import axios from "axios";
export default {
  state: {
    contacts: [],
    selectedTopic: {},
    addContactForm: {
      searchQuery: "",
      searchResults: [],
      isVisible: false
    }
  },

  mutations: {
    searchForTopic(state, query) {
      const fnd = store.state.client.tinodeClient.getFndTopic();
      fnd.subscribe().then(() => {
        fnd
          .setMeta({ desc: { public: query } })
          .then(ctrl => {
            return fnd.getMeta(
              fnd
                .startMetaQuery()
                .withSub()
                .build()
            );
          })
          .catch(err => {
            console.log(err);
          });
      });
    },

    addContact(state, topic) {
      state.contacts.push(topic);
      topic = store.getters.getTopic(topic.user);
      topic.subscribe().then(() => {});
    },

    removeContact(state, topicID) {
      // Remove contact from UI
      let contacts = state.contacts;
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].topic == topicID) {
          // found the contact to delete
          contacts.splice(i, 1);
          break;
        }
      }

      // Unsubscribe from topic on IM Server
      let topicToDel = store.getters.getTopic(topicID);
      topicToDel.leave(true).then(ctrl => {
        console.log("Left topic: ", ctrl);
      });
    },

    setSearchResults(state, results) {
      console.log("Setting results:", results);
      state.addContactForm.searchResults = results;
      state.addContactForm.searchResults = results;
    },

    toggleAddContactForm(state, status) {
      if (!status) {
        // clear form and reset the results list
        state.addContactForm.searchResults = [];
        state.addContactForm.searchQuery = "";
      }
      state.addContactForm.isVisible = status;
    },
    setContactsList(state, contacts) {
      state.contacts = contacts;
    },
    updateTopicPresence(state, payload) {
      console.log(
        "Updating topic presence:",
        payload.topicID,
        payload.presence
      );

      let contact = state.contacts.find(c => {
        return c.topic == payload.topicID;
      });
      if (contact) {
        contact.isOnline = payload.presence;
      }
    },
    selectTopic(state, topic) {
      console.log("Selecting topic", topic);
      state.selectedTopic = topic;
    }
  }, // END of mutations

  actions: {
    searchForTopic(context, query) {
      context.commit("searchForTopic", query);
    },
    addContact(context, topic) {
      context.commit("addContact", topic);
    },
    selectTopic(context, topic) {
      console.log("Selecting topic action:", topic);
      context.commit("selectTopic", topic);
    },
    removeContact(context, topicID) {
      context.commit("removeContact", topicID);
    },
    setSearchResults(context, results) {
      context.commit("setSearchResults", results);
    },
    toggleAddContactForm(context, status) {
      context.commit("toggleAddContactForm", status);
    },
    setContactsList(context, contacts) {
      context.commit("setContactsList", contacts);
    },
    updateTopicPresence(context, payload) {
      console.log("Updating topic presence:", payload);
      context.commit("updateTopicPresence", payload);
    }
  }, // END of actions

  getters: {
    contacts(state) {
      return state.contacts;
    },
    selectedTopic(state) {
      return state.selectedTopic;
    },
    addContactForm(state) {
      return state.addContactForm;
    }
  } // END of getters
};
