import Vue from "vue";
import Vuex from "vuex";
import messagesStore from "./modules/messages.js";
import clientStore from "./modules/client.js";
import contactsStore from "./modules/contacts.js";

Vue.use(Vuex);

let initialState = {
  messages: messagesStore.defaultState,
  client: clientStore.defaultState,
  contacts: contactsStore.defaultState
};

export default new Vuex.Store({
  modules: {
    messages: messagesStore,
    contacts: contactsStore,
    client: clientStore
  }
});
