<template>
    <div class="messages-view">

      <div class="list-view">
        <ul id="messages" tabindex="1" class="messages-ul">
            <message class="no-select" v-for="message in messages"
                     :from="message.from"
                     :ts="message.ts"
                     :content="message.content"
                     :seq="message.seq"
                     :markedToDel="false">
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
            <textarea rows="1" v-model="messageInput" class="textarea" placeholder="Type something..."></textarea>
          </div>
        </div>

        <div class="send-button">
          <div class="control">
            <a @click="sendMessage()" class="button is-info">
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
    }
  },
  mounted() {
    // scrolling ability
    var msgs = this.$el.querySelector("#messages");
    msgs.scrollTop = msgs.scrollHeight;
  },
  updated() {
    // scrolling ability
    var msgs = this.$el.querySelector("#messages");
    if (msgs.scrollTop != msgs.scrollHeight) {
      msgs.scrollTop = msgs.scrollHeight;
    }
  },
  methods: {
    sendMessage() {
      if (this.messageInput) {
        console.log("Storing message");
        store.dispatch("publishMessage", this.messageInput);
        this.messageInput = "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.messages-view {
  padding: 8px;
  margin: 5px;
  display: flex;

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
    margin-top: 15px;

    .message-input {
      width: 100%;
    }
    .send-button {
      margin: 5px;
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
  overflow-y: scroll;

  &:focus {
    outline: 0 !important;
  }
}
#messages::-webkit-scrollbar {
  width: 12px;
  background-color: $grey-darker;
}
#messages::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: $grey-darker;
}
#messages::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: $grey-dark;
}
.delete-btn {
  float: left;
  margin-right: 5px;
}
</style>
