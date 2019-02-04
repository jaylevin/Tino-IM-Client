import store from "@/store/store.js";
import axios from "axios";
export default {
  state: {
    contacts: [],
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
      console.log("adding topic:", topic);
      state.contacts.push(topic);
      topic = store.getters.getTopic(topic.user);

      topic.subscribe().then(() => {
        var requesterID = store.state.client.tinodeClient.getCurrentUserID();
        axios
          .post("http://localhost:8000/friend_requests", {
            requester_id: requesterID,
            receiver_id: topic.user
          })
          .then(resp => {
            console.log(resp);
          });
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
      contact.isOnline = payload.presence;
    }
  }, // END of mutations

  actions: {
    searchForTopic(context, query) {
      context.commit("searchForTopic", query);
    },
    addContact(context, topic) {
      context.commit("addContact", topic);
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
    addContactForm(state) {
      return state.addContactForm;
    }
  } // END of getters
};
