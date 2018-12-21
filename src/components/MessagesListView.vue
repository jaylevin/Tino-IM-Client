<template>
  <div class="messages columns is-multiline">
    <div class="column is-full">
      <ul id="messages" tabindex="1" class="messages-ul unselectable">
          <message v-for="message in messages" :ts="message.ts" :from="message.from">
              {{ message.content }}
          </message>
      </ul>
    </div>

    <!-- <div style="margin-top:0.5em;" class="is-divider"></div> -->

    <!-- Send message controls -->
    <div class="column is-full sendMessageCol">
      <div class="sendMessageDiv">
        <div class="field has-addons">
          <textarea rows="1" v-model="messageInput" class="textarea" placeholder="Type something..."></textarea>
        </div>
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
    }
  },
  methods: {
    sendMessage(messageInput) {
      store.dispatch("handleSendMessage", messageInput);
      this.messageInput = "";
    }
  }
};
</script>


<style scoped lang="scss">
$accent: #00a1ff;

textarea {
  background: transparent;
  resize: none;
  border: 1px solid $accent;
  color: white;
}
.column {
  padding-bottom: 0px;
}

.sendMessageCol {
  padding-top: 0px;
}

.sendMessageDiv {
  margin-top: 15px;
  textarea {
    height: auto;
  }
}

.messages-ul {
  height: 60vh;
  overflow-x: hidden;
  overflow-y: scroll;
  &:focus {
    outline: 0 !important;
  }
}

.messages {
  padding: 5px;
  margin-right: 15px;
  .title {
    text-align: left;
  }
}
</style>
