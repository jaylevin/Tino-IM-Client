<template>
  <aside class="menu contacts">
    <div class="columns is-gapless is-vcentered contacts-header">
      <div class="column">
        <p class="menu-label">
          Contacts
        </p>
      </div>
      <div class="column">
        <a @click="addContact" class="button is-dark add-contact">
          +
        </a>
      </div>
    </div>

    <div class="divider"></div>

    <ul class="menu-list">
      <li v-for="contact in contacts" @click="selectTopic(contact)">
        <a :class="{'is-active': selectedTopic == contact}">
          <div class="columns is-gapless is-vcentered">
              <div class="column is-one-fifth is-v">
                <figure class="image is-32x32"><img class="is-rounded" :src="contact.public.Photo.Data"></figure>
              </div>
              <div class="column">
                  <p class="contact-name" :class="{'is-active': selectedTopic == contact}">
                    {{ contact.public.FN }}
                  </p>

                  <p class="lastMessage">
                  </p>
              </div>
          </div>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
import store from "@/store.js";

export default {
  name: "ContactsMenu",
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
      if (contact.topic != store.getters.getSelectedTopic.topic) {
        store.dispatch("selectTopic", contact);
        console.log("Selected contact:", store.getters.getSelectedTopic);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.menu {
  p.menu-label {
    color: $accent;
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

figure {
  display: inline-block;
  margin: 0px;
}

.button.add-contact {
  margin-bottom: 10px;
  float: right;
}

.contact-name {
  color: $accent;
  font-size: 1.25em;
  margin-left: 10px;
}

a.is-active {
  p.contact-name {
    color: black;
  }
  p.lastMessage {
    color: white;
    margin-left: 8px;
  }
}

.is-gapless.is-vcentered.contacts-header {
  margin-bottom: 0;
}

div.divider {
  width: 100%;
  height: 0.5px;
  border: 0.5px solid $grey-dark;
  margin-bottom: 15px;
}

.contacts {
  background: rgba(54, 54, 54, 0.5);
  padding: 15px;
  text-align: left;
}
</style>
