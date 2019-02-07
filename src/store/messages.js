class Msg {
  constructor(from, content, seq, ts, isIncoming, markedToDel) {
    this.from = from;
    this.content = content;
    this.seq = seq;
    this.ts = ts;
    this.isIncoming = isIncoming;
    this.markedToDel = markedToDel;
  }
  markMessageForDel() {}
}

export default {
  state: {
    messagesCache: new Map(),
    userDetailsDrawerToggled: false
  },

  mutations: {
    toggleUserDetailsDrawer(state, status) {
      console.log("Status:", status);
      state.userDetailsDrawerToggled = status;
    }
  }, // END of mutations

  actions: {
    toggleUserDetailsDrawer(context, status) {
      console.log("Committing", status);
      context.commit("toggleUserDetailsDrawer", status);
    }
  }, // END of actions

  getters: {
    getMessages: state => {
      return state.messagesCache;
    },
    userDetailsDrawerToggled: state => {
      return state.userDetailsDrawerToggled;
    }
  }
};
