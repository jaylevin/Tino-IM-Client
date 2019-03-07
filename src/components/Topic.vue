<template>
    <div class="contact">
        <div class="contact-avatar">
          <p class="no-select">
            <figure v-if="topic.public" class="no-select image is-32x32"><img class="is-rounded"
              :src="topic.public.photo.data">
            </figure>
          </p>
         </div>

        <div>
            <p v-if="topic.public" class="no-select contact-name">
              {{topic.public.fn}}
            </p>
        </div>

        <div class="contact-right">
          <div v-if="topicOnline" class="contact-presence">
              <span>&#183;</span>
          </div>

          <!-- Last message time stamp -->
          <div class="last-touched">
            <p class="no-select">{{ new Date(lastTouched).toLocaleTimeString() }}</p>
          </div>

      </div>
    </div>
</template>

<script>
import store from "@/store/store.js";
export default {
  props: ["topic"],
  data() {
    return {};
  },
  created() {
    console.log(this.topic);
  },
  mounted() {
    console.log("mounteD");
  },
  methods: {},
  computed: {
    lastTouched() {
      return this.topic.touched;
    },
    topicOnline() {
      return store.state.client.tinodeClient.getTopic(this.topic.topic).online;
    }
  }
};
</script>

<style lang="scss">
.contact {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #dbe7f9;
  margin-top: 6px;
  .last-touched {
    p {
      font-size: 0.85em;
    }
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
</style>
