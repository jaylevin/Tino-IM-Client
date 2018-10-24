<template>
  <div class="messages">
    <ul tabindex="1" class="messages-ul">
        <h1 class="title">Messages</h1>
        <message v-for="message in messages" :ts="message.timestamp" :from="message.from">
            {{ message.content }}

        </message>
    </ul>

    <!-- Pagination controls -->
    <nav class="pagination is-rounded is-hidden-mobile" role="navigation" aria-label="pagination">
      <a class="pagination-previous">Previous</a>
      <a class="pagination-next">Next page</a>
      <ul class="pagination-list">
        <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
        <li><a class="pagination-link" aria-label="Page 46" aria-current="page">46</a></li>
        <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
      </ul>
    </nav>

    <!-- Send message controls -->
    <div style="margin-top:0.5em;" class="is-divider"></div>
    <div class="sendMessageDiv">
      <div class="field has-addons">
        <textarea class="textarea" placeholder="Type something..."></textarea>
      </div>
      <div class="control">
        <a @click="sendMessage(messageInput)" class="button is-info">
          Send
        </a>
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
.sendMessageDiv {
  margin-top: 15px;
  position: fixed;
  bottom: 5px;
  width: 80%;
}
.messages-ul {
  height: 70vh;
  overflow-y: scroll;
}

.messages {
  border: 1px solid grey;
  padding: 5px;
  .title {
    text-align: left;
  }
  margin-right: 15px;
}
</style>
