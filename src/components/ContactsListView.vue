<template>
  <div class="contacts">
    <div class="contacts-header">
      <div @click="selectTopic(undefined)" class="header-text">
        Messages
      </div>
      <div class="plus-button">
        <a :class="{'is-active': addContactForm.isVisible}" @click="toggleAddContactForm" class="button is-success add-contact">+</a>
      </div>
    </div>


    <div class="addContacts" v-if="addContactForm.isVisible">
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
            <div class="divider"></div>
      </div>
    </div>

    <div class="contacts-list-view">
      <ul class="contacts-list" v-if="contacts.length > 0">
        <li v-for="topic in contacts" @click="selectTopic(topic)":class="{'is-active': selectedTopic.topic == topic.topic }">
          <a><topic :topic="topic"></topic></a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import store from "@/store/store.js";
import Topic from "@/components/Topic.vue";
export default {
  components: { Topic },
  name: "ContactsListView",
  computed: {
    addContactForm() {
      return store.getters.addContactForm;
    },
    selectedTopic() {
      return store.getters.selectedTopic;
    },
    contacts() {
      // sort by most recent topic activity
      store.getters.contacts.sort((a, b) => {
        return new Date(b.touched) - new Date(a.touched);
      });
      return store.getters.contacts;
    }
  },

  methods: {
    toggleAddContactForm() {
      store.dispatch("toggleAddContactForm", !this.addContactForm.isVisible);
    },
    addContact(topic) {
      let topicToAdd = store.state.client.tinodeClient.getTopic(topic.user);
      console.log("Topic to add:", topicToAdd);
      store.dispatch("addContact", topic.user);
    },

    // User clicks on a contact in their contacts list
    selectTopic(topic) {
      if (topic == undefined) {
        store.dispatch("selectTopic", topic);
      } else if (topic) {
        let client = store.state.client.tinodeClient;
        let newTopic = client.getTopic(topic.topic);
        let oldTopic = store.getters.getTopic(
          store.getters.selectedTopic.topic
        );
        store.dispatch("selectTopic", newTopic);
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
.divider {
  margin-top: 5px;
}
li.is-active {
  background-color: $grey-darker;
  border-radius: 5px;
  top: 3px;
  position: relative;
}

.menu-label {
  color: $accent;
}
.contacts {
  -webkit-box-shadow: 1px 0px 0px 0px $grey-dark;
  -moz-box-shadow: 1px 0px 0px 0px $grey-dark;
  box-shadow: 1px 0px 0px 0px $grey-dark;
  background: rgba(54, 54, 54, 0.5);
  min-height: 25px;
  height: 100%;
  flex-direction: column;
  padding: 8px;
  overflow-y: scroll;

  .contacts-header {
    display: flex;
    align-items: center;
    justify-content: center;

    .header-text {
      color: $accent;
      font-size: 1em;
      margin-right: auto;
    }
    .plus-button {
      align-self: center;
    }
  }
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
