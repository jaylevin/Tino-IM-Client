<template>
  <div class="contacts">
    <div class="contacts-header">
      <div class="header-text">
        Messages
      </div>
      <div class="plus-button">
        <a :class="{'is-active': addContactForm.isVisible}" @click="toggleAddContactForm" class="button is-success add-contact">+</a>
      </div>
    </div>


    <div id="scrollbar" class="contacts" v-if="addContactForm.isVisible">
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
    </div>
  </div>

</template>

<script>
import store from "@/store/store.js";

export default {
  components: {},

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
      let client = store.state.client.$tinodeClient;

      if (topicObj != store.getters.selectedTopic) {
        console.log(topicObj, "!=", store.getters.selectedTopic);
        console.log("topic obj subscribed:", topicObj.isSubscribed());
        if (topicObj.isSubscribed()) {
          store.state.client.tinodeClient
            .leave(store.getters.selectedTopic.topic)
            .then(() => {});
        }
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
#scrollbar::-webkit-scrollbar {
  width: 12px;
  background-color: $grey-darker;
}
#scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: $grey-darker;
}
#scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: $grey-dark;
}
.menu-label {
  color: $accent;
}
.contacts {
  -webkit-box-shadow: 1px 0px 0px 0px $grey-dark;
  -moz-box-shadow: 1px 0px 0px 0px $grey-dark;
  box-shadow: 1px 0px 0px 0px $grey-dark;
  min-height: 25px;
  height: 80vh;
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

.contacts {
  background: rgba(54, 54, 54, 0.5);
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
