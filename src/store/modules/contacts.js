import store from "@/store/store.js";
import axios from "axios";

export function defaultState() {
  return {
    contacts: [],
    selectedTopicID: "",
    addContactForm: {
      searchQuery: "",
      searchResults: [],
      isVisible: false
    }
  };
}

export default {
  state: defaultState,

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

    addContact(state, topicID) {
      let topic = store.getters.getTopic(topicID);
      if (!topic.isSubscribed()) {
        topic
          .subscribe()
          .then(ctrl => {
            console.log("sub request successful:", ctrl);
            topic.getMeta({ what: "desc" });
          })
          .then(ctrl => {
            state.contacts.push(topic);
          });
      } else {
        console.log("contact is already in contacts list.");
      }
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
      console.log("state.contacts = ", contacts);
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
        contact.online = payload.presence;
      }
    },
    selectTopic(state, topicID) {
      console.log("Selecting topic", topicID);
      state.selectedTopicID = topicID;
    }
  }, // END of mutations

  actions: {
    searchForTopic(context, query) {
      context.commit("searchForTopic", query);
    },
    addContact(context, topicID) {
      context.commit("addContact", topicID);
    },
    selectTopic(context, topic) {
      context.commit("selectTopic", topic);
      if (topic != undefined) {
        context.commit("setCurrentMessages");
      }
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
      context.commit("updateTopicPresence", payload);
    }
  }, // END of actions

  getters: {
    contacts(state) {
      return state.contacts;
    },
    selectedTopicID(state) {
      return state.selectedTopicID;
    },
    addContactForm(state) {
      return state.addContactForm;
    }
  } // END of getters
};
