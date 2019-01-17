<template>
  <div class="chat">
    <div class="columns is-full-height">
      <div class="column is-3 is-sidebar-menu">
        <contacts-menu></contacts-menu>
      </div>
      <div class="column">
        <h1>Messages
          <h1 v-if="selectedTopicName">with {{ selectedTopicName}}</h1>
        </h1>
        <messages-list-view></messages-list-view>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/store.js";
import ContactsMenu from "@/components/ContactsMenu.vue";
import MessagesListView from "@/components/MessagesListView.vue";

export default {
  name: "Chat",
  props: {},
  components: { ContactsMenu, MessagesListView },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chat {
  margin: 15px;
}
h1 {
  display: inline-block;
  color: white;
  font-weight: bold;
  margin: 3px;
  font-size: 1.25em;
  margin-bottom: 15px;
}
</style>
