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
    addContact(state, topicID) {
      store.state.client.tinodeClient
        .getTopic(topicID)
        .subscribe()
        .then(ctrl => {
          if (ctrl.code == 200) {
            var requesterID = store.state.client.tinodeClient.getCurrentUserID();
            axios
              .post("http://localhost:8000/friend_requests", {
                requester_id: requesterID,
                receiver_id: topicID
              })
              .then(resp => {
                console.log(resp);
              });
          }
        });
    },
    setSearchResults(state, results) {
      console.log("Setting results:", results);
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
    addContact(context, topicID) {
      context.commit("addContact", topicID);
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
