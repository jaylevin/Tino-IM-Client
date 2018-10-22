<template>
  <div class="messages">
    <ul tabindex="1" class="messages-ul">
        <h1 class="title">Messages</h1>
        <message v-for="message in messages" :ts="message.timestamp" :from="message.from">
            {{ message.content }}

        </message>
    </ul>
    <div style="margin-top:0.5em;" class="is-divider"></div>
    <div class="field has-addons">
      <textarea class="textarea" placeholder="e.g. Hello world"></textarea>
    </div>
    <div class="control">
      <a @click="sendMessage(messageInput)" class="button is-info">
        Send
      </a>
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
.messages-ul {
  height: 70vh;
  overflow-y: scroll;
}
.messages {
  .title {
    text-align: left;
  }
  margin-right: 50px;
}
</style>
