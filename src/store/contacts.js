import store from "@/store/store.js";
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
      store.state.client.tinodeClient.subscribe(topicID).then(ctrl => {
        console.log("subscribing to:", topicID);
        console.log("ctrl:", ctrl);
      });
    },
    setSearchResults(state, results) {
      console.log("Setting results:", results);
      state.addContactForm.searchResults = results;
    },
    toggleAddContactForm(state, status) {
      if (!status) {
        state.addContactForm.searchResults = [];
      }
      state.addContactForm.isVisible = status;
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
