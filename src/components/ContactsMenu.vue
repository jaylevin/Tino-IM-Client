<template>
  <aside class="menu contacts">
    <p class="menu-label">
      Contacts
    </p>
    <ul class="menu-list">
      <li v-for="contact in contacts" @click="selectedContact = contact">
        <a :class="{'is-active': selectedContact == contact}">
        {{contact}}
        </a>
      </li>
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
$grey-darker:  hsl(0, 0%, 21%) !default
$grey-dark:    hsl(0, 0%, 29%) !default
$accent: #00a1ff;

.menu {
  p {
    color: $accent;
    font-size:1em;
  }
  ul {
    li {
      .is-active {
        background: $accent;
      }
      a {
        color: white;
        &:hover {
          color: black;
          background: $accent;
        }
      }
    }
  }
}
.contacts {
  background: $grey-darker;
  padding: 15px;
  height: 80vh;
  text-align: left;
}
</style>
