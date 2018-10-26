<template>
  <div class="messages columns is-multiline">
    <div class="column is-full">

      <ul tabindex="1" class="messages-ul unselectable">
          <message v-for="message in messages" :ts="message.timestamp" :from="message.from">
              {{ message.content }}
          </message>
      </ul>
    </div>

    <!-- <div style="margin-top:0.5em;" class="is-divider"></div> -->

    <!-- Send message controls -->
    <div class="column is-full sendMessageCol">
    <div class="sendMessageDiv">
      <div class="field has-addons">
        <textarea rows="1" class="textarea" placeholder="Type something..."></textarea>
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
export default {
  name: "MessagesListView",
  components: {
    Message
  },
  data() {
    return {
      messages: [
        {
          content: "Messages one",
          from: "John Smith",
          timestamp: "Mon Oct 21 2018"
        },
        {
          content: "Messages onetwothree",
          from: "Me",
          timestamp: "Mon Oct 21 2018"
        },
        {
          content: "Messages one",
          from: "Me",
          timestamp: "Mon Oct 21 2018"
        },
        {
          content: "Messages one",
          from: "Me",
          timestamp: "Mon Oct 21 2018"
        },
        {
          content: "Messages one",
          from: "Me",
          timestamp: "Mon Oct 21 2018"
        },
        {
          content: "Messages one",
          from: "Me",
          timestamp: "Mon Oct 21 2018"
        },
        {
          content: "Messages one",
          from: "Me",
          timestamp: "Mon Oct 21 2018"
        },
        {
          content: "Messages one",
          from: "Me",
          timestamp: "Mon Oct 21 2018"
        },
        {
          content: "Messages one",
          from: "Me",
          timestamp: "Mon Oct 21 2018"
        }
      ]
    };
  }
};
</script>


<style scoped lang="scss">
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
  &:focus {
    outline: 0 !important;
  }
  overflow-y: scroll;
}

.messages {
  padding: 5px;
  margin-right: 15px;
  .title {
    text-align: left;
  }
}
</style>
