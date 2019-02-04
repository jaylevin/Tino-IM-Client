<template>
  <aside class="menu contacts">
    <div class="columns is-gapless is-vcentered contacts-header">
      <div class="column">
        <p class="menu-label">
          Contacts
        </p>
      </div>
      <div class="column">
        <a @click="toggleAddContactForm" :class="{'is-active': addContactForm.isVisible}" class="button is-success add-contact">+</a>
      </div>
    </div>
    <div class="column" v-if="addContactForm.isVisible">
      <div class="form-popup" id="addContactForm">
        <form submit.prevent="" class="form-container">

          <label for="email"><b>Enter a name or email:</b></label>
          <input class="input" type="text" v-model="addContactForm.searchQuery" required>

          <!-- Search Results List -->
          <ul class="search-results" v-if="addContactForm.searchResults.length > 0">
            <h1>Search Results</h1>
            <div class="divider"></div>
            <li v-for="result in addContactForm.searchResults">
              <a class="search-result" @click="addContact(result)">
                <div>
                  <figure class="image is-32x32">
                    <img class="is-rounded" :src="result.public.photo.data">
                  </figure>
                </div>
                <div>
                  <a>{{result.public.fn}}</a>
                </div>
              </a>
            </li>
          </ul>
          <!-- End of Search Results -->

          <button @click="searchForContact" class="button is-success submit">Submit</button>
        </form>
      </div>
    </div>

    <div class="divider"></div>

    <ul v-for="contact in contacts" v-if="contacts.length > 0" class="menu-list">
      <li>
        <a>
          <div class="columns is-gapless is-vcentered">
              <div class="column is-one-fifth is-v">
                <figure class="image is-32x32">
                  <img class="is-rounded"
                  :class="{'is-online': contact.isOnline}"
                  :src="contact.public.photo.data">
                </figure>
              </div>
              <div class="column">
                  <p class="contact-name">
                    {{contact.public.fn}}
                  </p>

                  <p class="lastMessage">
                    last message
                  </p>
              </div>
          </div>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
import store from "@/store/store.js";

export default {
  name: "ContactsMenu",
  computed: {
    addContactForm() {
      return store.getters.addContactForm;
    },
    contacts() {
      return store.getters.contacts;
    }
  },
  methods: {
    toggleAddContactForm() {
      store.dispatch("toggleAddContactForm", !this.addContactForm.isVisible);
    },
    addContact(topic) {
      store.dispatch("addContact", topic);
    },
    searchForContact() {
      if (this.addContactForm.searchQuery.length) {
        console.log("Searching for contact:", this.addContactForm.searchQuery);
        store.dispatch(
          "searchForTopic",
          "basic:" + this.addContactForm.searchQuery
        );
      }
    }
  }
};
</script>

<style scoped lang="scss">
.is-rounded.is-online {
  border: 1.5px solid #7df442;
}
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
    margin-left: 3px;
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

/* Popup add-contact form */
.form-popup {
  // border: 3px solid #f1f1f1;
  label {
    color: white;
  }
  button {
    margin: 3px;
  }
}
.form-container input[type="text"]:focus {
  background-color: #fff;
  outline: none;
}

.search-result {
  align-items: center;
  justify-content: center;
  display: flex;
}

.search-results {
  h1 {
    color: $accent;
  }
  margin-top: 8px;
}
</style>
