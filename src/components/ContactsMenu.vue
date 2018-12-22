<template>
  <aside class="menu contacts">
    <a @click="addContact" class="button">
      Add Contact
    </a>
    <p class="menu-label">
      Contacts
    </p>
    <ul class="menu-list">
      <li v-for="topic in contacts" @click="selectTopic(topic)">
        <a :class="{'is-active': selectedTopic == topic}">
        {{ topic.public.FN }}
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
    return {};
  },
  computed: {
    selectedTopic() {
      return store.getters.getSelectedTopic;
    },
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
    },
    selectTopic: function(contact) {
      if (contact.name != store.getters.getSelectedTopic.name) {
        store.dispatch("selectTopic", contact);
        console.log("Selected contact:", store.getters.getSelectedTopic);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.menu {
  p {
    color: $accent;
    font-size: 1em;
  }
  ul {
    li {
      .is-active {
        background: $accent;
      }
      a {
        color: white;
        &:hover {
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
}
.contacts {
  background: rgba(54, 54, 54, 0.5);
  padding: 15px;
  text-align: left;
}
</style>
