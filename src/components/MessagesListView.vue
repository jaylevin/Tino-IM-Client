<template>
    <div v-if="selectedTopicID" class="messages-view">

      <div  class="list-view">
        <ul id="messages" tabindex="1" class="messages-ul">
            <message v-for="message in messages"
                    :message="message">
                     <!-- :from="message.from"
                     :ts="message.ts"
                     :content="message.content"
                     :seq="message.seq"
                     :markedToDel="false"> -->
            </message>
        </ul>

      <!-- <div class="controls">
        <div>
          <a class="button is-danger delete-btn">
            Cancel
          </a>
        </div>

        <div>
          <a class="button is-danger delete-btn">
            Delete Selected
          </a>
        </div>
      </div> -->

      <!-- Send message controls -->
      <div class="send-message">
        <div class="message-input">
          <div class="field has-addons">
            <textarea rows="1" v-model="messageInput" class="textarea" placeholder="Type something..."
              @keydown.enter.exact.prevent="sendMessage"
              @keyup.enter.exact.prevent="sendMessage"
              @keydown.enter.shift.exact="newline">
            </textarea>
          </div>
        </div>

        <div class="send-button">
          <div class="control">
            <a @click="sendMessage" class="button is-info">
              Send
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- <button class="button" @click="toggleUserDetailsDrawer(!userDetailsDrawerToggled)">++</button> -->
    <!-- <transition
      name="custom-classes-transition"
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight"
    >
    <div v-if="userDetailsDrawerToggled" class="user-details-drawer">
      <p>User details drawer</p>
    </div>
  </transition> -->
  </div>
</template>

<script>
import Message from "@/components/Message.vue";
import store from "@/store/store.js";

export default {
  name: "MessagesListView",
  components: { Message },
  data() {
    return {
      messageInput: ""
    };
  },
  computed: {
    messages() {
      console.log("Computing messages:", store.getters.messages);
      return store.getters.messages;
    },
    selectedTopicID() {
      return store.getters.selectedTopicID;
    }
  },
  mounted() {
    // scrolling ability
    if (this.$el.querySelector) {
      var msgs = this.$el.querySelector("#messages");
      msgs.scrollTop = msgs.scrollHeight;
    }
  },
  updated() {
    // scrolling ability
    if (this.$el.querySelector) {
      var msgs = this.$el.querySelector("#messages");
      if (msgs) {
        if (msgs.scrollTop != msgs.scrollHeight) {
          msgs.scrollTop = msgs.scrollHeight;
        }
      }
    }
  },
  methods: {
    sendMessage() {
      if (this.messageInput) {
        console.log("Storing message", this.messageInput);
        store.dispatch("publishMessage", this.messageInput);
        this.messageInput = "";
      }
    },
    newline() {
      this.messageInput += "\n";
    }
  }
};
</script>

<style scoped lang="scss">
.messages-view {
  // padding: 8px;
  // margin: 5px;
  display: flex;
  background-color: $grey-darker;
  .list-view {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .controls {
    margin-left: 12px;
  }

  .send-message {
    display: flex;
    margin-top: 5px;
    margin-bottom: 15px;
    margin-right: 10px;
    margin-left: 10px;
    .message-input {
      width: 100%;
    }
    .send-button {
      margin: 5px;
      margin-left: 10px;
    }
  }
}

textarea {
  background: transparent;
  resize: none;
  border: 1px solid $accent;
  color: white;
}

textarea::placeholder {
  color: white;
  font-style: italic;
}

.messages-ul {
  height: 70vh;
  overflow-x: hidden;
  overflow-y: hidden;

  &:focus {
    outline: 0 !important;
  }
}
.delete-btn {
  float: left;
  margin-right: 5px;
}
</style>
