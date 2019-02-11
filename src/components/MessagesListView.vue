<template>
    <div class="messages-view">

      <div class="list-view">
        <ul id="messages" tabindex="1" class="messages-ul">
            <message v-for="message in messages"
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
            <a @click="sendMessage(messageInput)" class="button is-info">
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
import { mapGetters } from "vuex";

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
  computed: {
    messages() {
      return store.getters.messages;
    },

    selectedTopic() {
      return store.getters.selectedTopic;
    },

    userDetailsDrawerToggled() {
      return store.getters.userDetailsDrawerToggled;
    }
  },
  watchers: {
    messages(oldMsgs, newMsgs) {
      console.log("newMsgs:", newMsgs);
    },
    selectedTopic(old, newT) {
      console.log("Selected new topic:", newT);
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
    toggleUserDetailsDrawer(status) {
      console.log("Toggling");
      store.dispatch("toggleUserDetailsDrawer", status);
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

    #messages {
      border: 1px solid $grey-darker;
    }
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

  .user-details-drawer {
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    border: 1px solid $grey-darker;
    color: white;
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

.delete-btn {
  float: left;
  margin-right: 5px;
}
</style>
