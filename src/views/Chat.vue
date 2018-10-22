<template>
  <div class="chat">
    <div class="columns">
      <div class="column is-one-fifth">
        <contacts-menu></contacts-menu>
      </div>

      <div class="column">
        <messages-list-view></messages-list-view>
      </div>
    </div>

    <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
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
$accent: #00a1ff;
.chat {
  margin: 15px;
}
</style>
