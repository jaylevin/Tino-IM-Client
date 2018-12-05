<template>
  <aside class="menu contacts">


    <a @click="addContact" class="button">
      Add Contact
    </a>
    <p class="menu-label">
      Contacts
    </p>
    <ul class="menu-list">
      <li v-for="contact in contacts" @click="selectedContact = contact">
        <a :class="{'is-active': selectedContact == contact}">
        {{ contact.name }}
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
import store from "@/store.js";

export default {
  name: "ContactsMenu",
  data() {
    return {
      selectedContact: ""
    };
  },
  computed: {
    contacts() {
      return store.getters.getContacts;
    }
  },
  methods: {
    addContact: function() {
      var person = prompt(
        "Enter the name of the userID of the friend you would like to request",
        ""
      );

      if (person != null) {
        this.$tinodeClient.subscribe(person);
      }
    }
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
          background: rgba(0,0,0,0.5)
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
