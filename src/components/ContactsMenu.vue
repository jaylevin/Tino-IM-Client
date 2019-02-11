<template>
  <aside class="menu contacts">
    <div class="columns is-vcentered contacts-header">
      <div class="column">
        <p class="menu-label">
          Contacts
        </p>
      </div>
      <div class="column">
        <a :class="{'is-active': addContactForm.isVisible}" @click="toggleAddContactForm" class="button is-success add-contact">+</a>
      </div>
    </div>

    <!-- Contact Context menu -->
    <context-menu
      :options="contextMenuItems"
      elementId="contactContextMenu"
      ref="contactContextMenu"
      @optionClicked="contactEllipsisItemClicked">
    </context-menu>

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

    <ul class="contacts-list" v-for="contact in contacts" v-if="contacts.length > 0">
      <li @click="selectTopic(contact)":class="{'is-active': selectedTopic.topic == contact.topic }">
        <a>

          <div class="contact">
              <div class="contact-avatar">
                  <figure class="image is-32x32"><img class="is-rounded"
                    :src="contact.public.photo.data">
                  </figure>
               </div>

              <div>
                  <p class="contact-name">
                    {{contact.public.fn}}
                  </p>
              </div>

              <div class="contact-right">
                <div v-if="contact.isOnline" class="contact-presence">
                    <span>&#183;</span>
                </div>
                <div @click.prevent.stop="contactEllipsisClicked($event, contact)" class="contact-ellipsis">
                    <span>&#8942;</span>
                </div>
            </div>

          </div>
        </a>
      </li>
    </ul>
    <div class="divider"></div>
      <ul v-for="reqs in friendRequests"
  </aside>
</template>

<script>
import store from "@/store/store.js";
import ContextMenu from "@/components/ContextMenu.vue";

export default {
  name: "ContactsMenu",
  components: { ContextMenu },
  data() {
    return {
      contextMenuItems: [
        { name: "Remove contact" },
        { name: "Turn Notifications On" }
      ]
    };
  },
  computed: {
    addContactForm() {
      return store.getters.addContactForm;
    },
    selectedTopic() {
      return store.getters.selectedTopic;
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

    // User clicks on a contact in their contacts list
    selectTopic(topic) {
      let topicObj = store.getters.getTopic(topic.topic);

      if (topicObj != store.getters.selectedTopic) {
        topicObj.subscribe().then(ctrl => {
          if (ctrl.code == 200) {
            store.dispatch("selectTopic", topicObj);

            topicObj
              .getMessagesPage(20, true)
              .then(ctrl => {
                console.log("get messages page ctrl obj:", ctrl);
              })
              .then(() => {
                store.dispatch("renderMessages");
              });
          }
        });
      } else {
        console.log("Topic already selected");
      }
    },

    searchForContact() {
      if (this.addContactForm.searchQuery.length) {
        console.log("Searching for contact:", this.addContactForm.searchQuery);
        store.dispatch(
          "searchForTopic",
          "basic:" + this.addContactForm.searchQuery
        );
      }
    },
    // Contact context menu ellipsis drop down
    contactEllipsisClicked(event, item) {
      this.$refs.contactContextMenu.showMenu(event, item);
    },
    contactEllipsisItemClicked(event) {
      switch (event.option.name) {
        case "Remove contact":
          let topicID = event.item.topic;
          store.dispatch("removeContact", topicID);
          break;

        case "Turn Notifications On":
          console.log("Turn Notifications On clicked");
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.menu-label {
  color: $accent;
}

li.is-active {
  background-color: $grey-dark;
  color: $grey-darker;
}

.contact {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #dbe7f9;
  margin-top: 6px;

  :hover {
    color: $accent;
  }

  .contact-right {
    margin-left: auto;
    display: flex;
    align-items: center;

    .contact-presence {
      color: #7df442;
      margin-right: 15px;
      font-weight: bold;
      font-size: 2em;
    }

    .contact-ellipsis {
      font-size: 1.5em;
      :hover {
        color: $grey-dark;
      }
      :active {
        color: $accent;
      }
    }
  }
  .contact-name {
    margin-left: 5px;
  }

  .contact-avatar {
    margin-left: 5px;
    margin-top: 5px;
    align-self: flex-end;
    margin-right: 3px;
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
