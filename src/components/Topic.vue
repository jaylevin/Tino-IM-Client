<template>
    <div class="contact">
        <div class="contact-avatar">
            <figure class="image is-32x32"><img class="is-rounded"
              :src="topic.public.photo.data">
            </figure>
         </div>

        <div>
            <p class="contact-name">
              {{topic.public.fn}}
            </p>
        </div>

        <div class="contact-right">
          <div v-if="topic.online" class="contact-presence">
              <span>&#183;</span>
          </div>
          <!-- Last message time stamp -->
          <div class="last-touched">
            <p>{{ new Date(lastTouched).toLocaleTimeString() }}</p>
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
  methods: {},
  computed: {
    lastTouched() {
      return this.topic.touched;
    },
    topicOnline() {
      return this.topic.online;
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
