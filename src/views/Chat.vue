<template>
  <div class="chat">
    <div class="columns is-full-height">
      <div class="column is-hidden-mobile is-2 is-sidebar-menu">
        <contacts-menu></contacts-menu>
      </div>
      <div class="column">
        <messages-list-view></messages-list-view>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
import ContactsMenu from "@/components/ContactsMenu.vue";
import MessagesListView from "@/components/MessagesListView.vue";

export default {
  name: "Chat",
  props: {},
  components: { ContactsMenu, MessagesListView }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chat {
  margin: 15px;
}
</style>
