<template>
  <aside class="menu contacts">
    <p class="menu-label">
      Conacts
    </p>
    <ul class="menu-list">
      <li v-for="contact in contacts" @click="selectedContact = contact"><a :class="{'is-active': selectedContact == contact}">{{contact}}</a></li>
    </ul>

  </aside>
</template>

<script>
export default {
  name: "ContactsMenu",
  data() {
    return {
      selectedContact: "",
      contacts: [
        "John Smith",
        "Amy Wilson",
        "Bob Smith",
        "Billy Joe",
        "Jimmy Johnson",
        "Robert Lang",
        "Sydney West"
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.contacts {
  text-align: left;
}
</style>
