<template>
		<div class="columns is-multiline message-view">
			<div @mousedown="start"
					 @mouseleave="stop"
					 @mouseup="stop"
					 @touchstart="start"
					 @touchend="stop"
					 @touchcancel="stop"
					 class="column msg" :class="{'incoming': !isIncoming}">
				<figure class="image is-64x64"
								:class="{'profile-left': !isIncoming,
												'profile-right': isIncoming}">
				    <img class="is-rounded" :src="avatarURI" v-model="avatarURI">
				</figure>
					<div class="message-head">
				    {{ fromFN }}
				  </div>
				  <div class="content">{{ content }}<br/><small class="timestamp">  {{ tsFormatted }} </small>
				  </div>
			</div>
		</div>
</template>


<script>
import store from "@/store/store.js";
export default {
  props: ["from", "ts", "content", "seq"],
  data() {
    return {
      interval: false,
      count: 0
    };
  },
  methods: {
    start() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          if (this.count != 25) {
            this.count++;
          } else {
            this.stop();
          }
        }, 30);
      }
    },
    stop() {
      clearInterval(this.interval);
      this.interval = false;
      this.count = 0;
    }
  },
  computed: {
    tsFormatted() {
      return new Date(this.ts).toLocaleTimeString();
    },
    isIncoming() {
      let clientID = store.getters.profile.userID;
      if (clientID == this.from) {
        return true;
      } else {
        return false;
      }
    },
    fromProfile() {
      if (this.isIncoming) {
        let profile = store.getters.profile;
        return {
          public: {
            fn: profile.displayName,
            photo: profile.avatar
          }
        };
      } else {
        return store.getters.getTopic(this.from);
      }
    },
    avatarURI() {
      return this.fromProfile.public.photo.data;
    },
    fromFN() {
      return this.fromProfile.public.fn;
    }
  }
};
</script>

<style lang="scss">
.msg {
  radius: 50px;
  padding: 5px;
  margin: 5px;
  margin-bottom: 5px;
  text-align: left;
  radius: 5px;

  .content {
    color: white;
    margin-left: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 8px;
    background-color: rgba(0, 0, 0, 0.3);
		white-space: pre-wrap;
  }
  .profile-left {
    float: left;
  }
  .profile-right {
    margin-left: 10px;
    float: right;
    margin-right: 10px;
  }
  .message-head {
    margin-left: 15px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 3px;
    color: red;
    .timestamp {
      float: right;
      font-size: 0.5em;
    }
  }
}

.incoming {
  .content {
    color: $accent;
  }
  .message-head {
    color: white;
  }
}
.delete-msg {
  float: left;
  display: inline-block;
  margin-right: 5px;
}

.image {
  position: fixed;
  margin-top: 5px;
  margin-bottom: 15px;
  margin-right: 5px;
}
.columns {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
