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

export const messagesStore = {
  state: {
    messagesCache: new Map()
  },

  mutations: {}, // END of mutations

  actions: {}, // END of actions

  getters: {
    getMessages: state => {
      return state.messagesCache;
    }
  }
};
