<template>
  <div>
    <div class="messages columns is-multiline">
      <div class="column">
        <ul id="messages" tabindex="1" class="messages-ul">
            <message v-for="message in messages"
                     :from="message.from"
                     :ts="message.ts"
                     :content="message.content"
                     :seq="message.seq"
                     :markedToDel="false">
            </message>
        </ul>
        <a v-if="isDeleting" @click="cancelDelMsgs()" class="button is-danger delete-btn">
          Cancel
        </a>
        <a v-if="isDeleting" @click="deleteMsgs()" class="button is-danger delete-btn">
          Delete Selected
        </a>
      </div>
    </div>

    <!-- <div style="margin-top:0.5em;" class="is-divider"></div> -->

    <!-- Send message controls -->
    <div class="columns is-gapless is-vcentered">
      <div class="column is-four-fifths message-input">
        <div class="field has-addons">
          <textarea rows="1" v-model="messageInput" class="textarea" placeholder="Type something..."></textarea>
        </div>
      </div>

      <div class="column send-button">
        <div class="control">
          <a @click="sendMessage(messageInput)" class="button is-info">
            Send
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";
import store from "@/store.js";

export default {
  name: "MessagesListView",
  components: {
    Message
  },
  data() {
    return {
      messageInput: ""
    };
  },
  mounted() {
    var msgs = this.$el.querySelector("#messages");
    msgs.scrollTop = msgs.scrollHeight;
  },
  updated() {
    var msgs = this.$el.querySelector("#messages");
    if (msgs.scrollTop != msgs.scrollHeight) {
      msgs.scrollTop = msgs.scrollHeight;
    }
  },
  computed: {
    messages() {
      return store.getters.getMessages;
    },
    isDeleting() {
      return store.getters.isDeleting;
    },
    delRange() {
      return store.getters.delRange;
    }
  },
  methods: {
    sendMessage(messageInput) {
      store.dispatch("handleSendMessage", messageInput);
      this.messageInput = "";
    },
    deleteMsgs() {
      let msgIDsToDel = store.getters.getMsgIDsToDelete;
      msgIDsToDel.sort(function(a, b) {
        return a - b;
      });

      let ranges = [];
      var temp = [];

      for (var i = 0; i < msgIDsToDel.length; ++i) {
        if (i == 0) {
          temp.push(msgIDsToDel[i]); // add the first element and continue
          continue;
        }
        if (msgIDsToDel[i - 1] != msgIDsToDel[i] - 1) {
          // if the current is not sequential
          // add the current temporary array to arrays result
          ranges.push(temp);

          // clear the temporary array and start over
          temp = [];
        }
        temp.push(msgIDsToDel[i]);
      }
      ranges.push(temp);

      let delRanges = [];
      ranges.forEach(range => {
        delRanges.push({
          low: range[0],
          high: ++range[range.length - 1] // inclusive-exclusive, eg: [low, high)
        });
      });
      store.dispatch("deleteMsgs", delRanges);
    },
    cancelDelMsgs() {
      store.dispatch("setIsDeleting", false);
    }
  }
};
</script>


<style scoped lang="scss">
textarea {
  background: transparent;
  resize: none;
  border: 1px solid $accent;
  color: white;
}

.column.is-four-fifths.message-input {
  margin-right: 5px;
}

textarea::placeholder {
  color: white;
  font-style: italic;
}

div.message-input {
  margin-right: 10px;
}

.messages-ul {
  height: 70vh;
  overflow-x: hidden;
  overflow-y: scroll;
  &:focus {
    outline: 0 !important;
  }
}
.delete-btn {
  float: left;
  margin-right: 5px;
}
.messages {
  padding: 5px;
  margin-right: 15px;
  border: 1px solid $grey-darker;
  .title {
    text-align: left;
  }
}
</style>
