<template>
  <div class="chat">
    <div class="contacts">
      <contacts-list-view></contacts-list-view>
    </div>

      <div class="messages">
        <div class="messages-header box-shadow" v-if="selectedTopicID">
          <p>{{selectedTopic.public.fn}}</p>
        </div>

        <div class="messages-list-view">
            <messages-list-view></messages-list-view>
        </div>
      </div>
    </div>
</template>

<script>
import store from "@/store/store.js";
import router from "@/router.js";
import ContactsListView from "@/components/ContactsListView.vue";
import MessagesListView from "@/components/MessagesListView.vue";

export default {
  name: "Chat",
  props: {},
  components: { ContactsListView, MessagesListView },
  computed: {
    selectedTopicID() {
      return store.getters.selectedTopicID;
    },
    selectedTopic() {
      return store.getters.getTopic(this.selectedTopicID);
    }
  },
  mounted() {
    var tinodeClient = store.state.client.tinodeClient;
    if (!tinodeClient.isAuthenticated()) {
      // var token = store.getters.session.getItem("token");
      // if (token) {
      //   console.log("Found token:", token);
      //
      //   tinodeClient.connect().then(() => {
      //     tinodeClient.loginToken(token);
      //   });
      // } else {
      router.push({ name: "landing" });
    }
  },
  updated() {
    console.log("Something changed!");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chat {
  margin: 2%;
  background-color: $grey-darker;
  display: flex;
  justify-content: center;
  height: 100%;

  .messages {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .messages-header {
      height: 35px;
      width: 99.33%;
      background-color: $accent;

      p {
        text-align: left;
        margin-left: 5px;
        color: white;
        margin-top: 3px;
      }
    }

    .messages-list-view {
      width: 100%;
    }
  }
  .contacts {
    width: 18em;
  }
}
.box-shadow {
  -webkit-box-shadow: 0 8px 5px -7px black;
  -moz-box-shadow: 0 8px 5px -7px black;
  box-shadow: 0 8px 6px -7px black;
}
</style>
