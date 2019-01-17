import Vue from "vue";
import Vuex from "vuex";
import { messagesStore } from "./messages.js";
import clientStore from "./client.js";
import contactsStore from "./contacts.js";

Vue.use(Vuex);
console.log("messages store:", messagesStore);
export default new Vuex.Store({
  modules: {
    messages: messagesStore
    // contacts: contactsStore,
    // client: clientStore
  }
});
